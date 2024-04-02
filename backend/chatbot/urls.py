from django.urls import path
from .views import ChatBotView
# from .views import ChatBotVoiceView
urlpatterns = [
    path('chatbot/', ChatBotView.as_view(), name='chatbot'),
    # path('voice_chatbot/', ChatBotVoiceView.as_view(), name='voice_chatbot'),
]
