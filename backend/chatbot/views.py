from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views import View
import string
import nltk
import numpy as np
import random
from googletrans import Translator
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import parser_classes
from rest_framework.parsers import FormParser, MultiPartParser
from googletrans import Translator
import speech_recognition as sr
import magic

class ChatBotView(View):
    @csrf_exempt
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def __init__(self):
        self.t = Translator()
        with open('chatbot/ChatbotData.txt', 'r', errors='ignore') as f:
            self.raw_doc = f.read().lower()
        nltk.download('punkt')
        nltk.download('wordnet')
        nltk.download('omw-1.4')
        self.sentence_tokens = nltk.sent_tokenize(self.raw_doc)
        self.word_tokens = nltk.word_tokenize(self.raw_doc)
        self.lemmer = nltk.stem.WordNetLemmatizer()
        self.remove_punc_dict = dict((ord(punct), None) for punct in string.punctuation)
        self.greet_inputs = ('hello', 'hi', 'how are you?')
        self.greet_responses = ('I am good', 'Hello!', 'Nice to meet you!')

    def LemTokens(self, tokens):
        return [self.lemmer.lemmatize(token) for token in tokens]

    def LemNormalize(self, text):
        return self.LemTokens(nltk.word_tokenize(text.lower().translate(self.remove_punc_dict)))

    def greet(self, sentence):
        for word in sentence.split():
            if word.lower() in self.greet_inputs:
                return random.choice(self.greet_responses)

    def response(self, user_response, lang):
        robo1_response = ''
        TfidfVec = TfidfVectorizer(tokenizer=self.LemNormalize, stop_words='english')
        tfidf = TfidfVec.fit_transform(self.sentence_tokens)
        vals = cosine_similarity(tfidf[-1], tfidf)
        idx = vals.argsort()[0][-2]
        flat = vals.flatten()
        flat.sort()
        req_tfidf = flat[-2]
        if req_tfidf == 0:
            robo1_response = robo1_response + "I didn't understand you clearly"
            robo1_response = self.t.translate(robo1_response, src=lang.lang, dest=lang.lang).text
            return robo1_response
        else:
            robo1_response = robo1_response + self.sentence_tokens[idx]
            robo1_response = self.t.translate(robo1_response, src='en', dest=lang.lang).text
            return robo1_response

    def post(self, request, *args, **kwargs):
        user_response = request.POST.get('user_response')
        lang = self.t.detect(user_response)
        user_response = self.t.translate(user_response, src=lang.lang, dest='en').text
        user_response = user_response.lower()
        if user_response != 'bye':
            if user_response == 'thank you' or user_response == 'thanks':
                return JsonResponse({'message': 'You are welcome'})
            else:
                if self.greet(user_response) is not None:
                    return JsonResponse({'message': self.greet(user_response)})
                else:
                    self.sentence_tokens.append(user_response)
                    self.word_tokens = self.word_tokens + nltk.word_tokenize(user_response)
                    final_words = list(set(self.word_tokens))
                    response_message = self.response(user_response, lang)
                    self.sentence_tokens.remove(user_response)
                    return JsonResponse({'message': response_message})
        else:
            return JsonResponse({'message': 'see you!'})


# class ChatBotVoiceView(View):
#     @csrf_exempt
#     def dispatch(self, *args, **kwargs):
#         return super().dispatch(*args, **kwargs)

#     def speech_to_text(self, request):
#         recognizer = sr.Recognizer()

#         try:
#             audio = recognizer.record(request.FILES['audio'])
#             text = recognizer.recognize_google(audio)
#             lang = Translator().detect(text)
#             print("Detected language:", lang.lang)
#             return text, lang.lang
#         except sr.UnknownValueError:
#             print("Sorry, could not understand audio.")
#             return None, None
#         except sr.RequestError as e:
#             print("Could not request results; {0}".format(e))
#             return None, None

#     def post(self, request, *args, **kwargs):
#         user_response, detected_lang = self.speech_to_text(request)

#         if user_response and detected_lang:
#             translator = Translator()
#             translated_response = translator.translate(user_response, dest=detected_lang).text
#             print("Translated response:", translated_response)

#             # Here you can make the API call to your chatbot API endpoint
#             # Replace the placeholder URL with your actual API endpoint
#             chatbot_api_url = "http://127.0.0.1:8000/chatbot/chatbot/"
#             data = {"user_response": translated_response, "lang": detected_lang}
            
#             # Make a POST request to the chatbot API
#             response = requests.post(chatbot_api_url, data=data)

#             if response.status_code == 200:
#                 return JsonResponse(response.json())
#             else:
#                 return JsonResponse({"error": "API request failed."}, status=500)
#         else:
#             return JsonResponse({"error": "Failed to process audio."}, status=500)