from django.shortcuts import render
import requests
# Create your views here.
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .apps import ApisConfig
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder, StandardScaler
import joblib
import json
from sklearn.preprocessing import LabelEncoder
from rest_framework.permissions import IsAuthenticated
# Create your views here.
from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
#from .classifiers.fertilizer_prediction import get_encoders
class Prices_Model_Predict(APIView):
    def post(self, request, format=None):
        data = request.data 
        print(type(data))
        print(data)
        json_data = json.dumps(data)
        json_obj = json.loads(json_data)
        values_list = list(json_obj.values())
        data_array = [values_list]
    
        print(data_array)
    
        scaler = ApisConfig.scaler_model_price
        X = scaler.transform(data_array)
        
        loaded_model = ApisConfig.model 
        y_pred = loaded_model.predict(X)
        prediction = y_pred

        response_dict = {"Prediced Crop Price": prediction}
        return Response(response_dict, status=200)
    
class Crops_Model_Predict(APIView):
    #permission_classes = [IsAuthenticated]
    
    def post(self, request, format=None):
        data = request.data 
        print(type(data))
        print(data)
        json_data = json.dumps(data)
        json_obj = json.loads(json_data)
        values_list = list(json_obj.values())
        data_array = [values_list]
    
        print(data_array)
        scaler = ApisConfig.scaler_model_crops
        X = scaler.transform(data_array)
        
        
        loaded_classifier = ApisConfig.classifier 
        loaded_classifier.criterion = 'entropy'
        y_pred = loaded_classifier.predict(X)
        prediction = y_pred

        response_dict = {"Prediced Crop": prediction}
        return Response(response_dict, status=200)


   
class Multiple_Crops_Model_Predict(APIView):
    #permission_classes = [IsAuthenticated]
    
    def post(self, request, format=None):
        data = request.data 
        print(type(data))
        print(data)
        json_data = json.dumps(data)
        json_obj = json.loads(json_data)
        values_list = list(json_obj.values())
        data_array = [values_list]
    
        print(data_array)
        scaler = ApisConfig.scaler_model_m_crops
        X = scaler.transform(data_array)
        
        
        loaded_classifier = ApisConfig.classifier_m
        loaded_classifier.criterion = 'entropy'
        y_pred_proba = loaded_classifier.predict_proba(X)
        
        
        class_labels = loaded_classifier.classes_

        # Get the indices of the top 3 probabilities
        top3_indices = np.argsort(y_pred_proba[0])[::-1][:3]

        # Extract the top 3 probabilities and their corresponding crops
        top3_probs = y_pred_proba[0][top3_indices]
        top3_crops = class_labels[top3_indices]

        prediction = []
        for prob, crop in zip(top3_probs, top3_crops):
            prediction.append([crop,prob])
        
      
        response_dict = {"Prediced Crop": prediction}
        return Response(response_dict, status=200)

# Check : 
class Fertilizer_Model_Predict(APIView):
    # Load the saved label encoders and scaler
    label_encoders = ApisConfig.label_encoder_fertilizer
    scaler = ApisConfig.scaler_model_fertilizer
    classifier = ApisConfig.classifier_fertilizer
    

    def encode_input(self, data):
        soil_type_mapping = {
        'Sandy':1, 'Loamy':2, 'Black':3, 'Red':4,'Clayey':5
        }
        crop_type_mapping = {
        'Maize':1, 'Sugarcane':2, 'Cotton':3, 'Tobacco':4, 'Paddy':5, 'Barley':6,
        'Wheat':6, 'Millets':7, 'Oil seeds':8, 'Pulses':9, 'Ground Nuts':10
        }
        # Perform encoding for categorical variables
        # soil_encoded = self.label_encoders.transform([data['soil_type']])[0]
        # crop_encoded = self.label_encoders.transform([data['crop_type']])[0]
        data['soil_type'] = soil_type_mapping[data['soil_type']]
        data['crop_type'] = crop_type_mapping[data['crop_type']]
        return data

    def post(self, request, format=None):
        data = request.data

        # Encode input parameters
        encoded_data = self.encode_input(data)

        # Scale the input data
        X = self.scaler.transform([[
            encoded_data['temperature'],
            encoded_data['humidity'],
            encoded_data['moisture'],
            encoded_data['soil_type'],
            encoded_data['crop_type'],
            encoded_data['nitrogen'],
            encoded_data['potassium'],
            encoded_data['phosphorous']
        ]])

        # Make predictions using the loaded classifier
        y_pred = self.classifier.predict(X)

        response_dict = {"Predicted Fertilizer": y_pred[0]}
        return Response(response_dict, status=200)
    
    
class Production_Model_Predict(APIView):
    classifier = ApisConfig.classifier_production
    #scaler = ApisConfig.scaler_model_
    #classifier = ApisConfig.classifier_fertilizer
    #permission_classes = [IsAuthenticated]
    def encode_input(self, data):
        state_mapping = {
    'Andaman and Nicobar Islands': 1,
    'Andhra Pradesh': 2,
    'Arunachal Pradesh': 3,
    'Assam': 4,
    'Bihar': 5,
    'Chandigarh': 6,
    'Chhattisgarh': 7,
    'Dadra and Nagar Haveli': 8,
    'Goa': 9,
    'Gujarat': 10,
    'Haryana': 11,
    'Himachal Pradesh': 12,
    'Jammu and Kashmir ': 13,
    'Jharkhand': 14,
    'Karnataka': 15,
    'Kerala': 16,
    'Madhya Pradesh': 17,
    'Maharashtra': 18,
    'Manipur': 19,
    'Meghalaya': 20,
    'Mizoram': 21,
    'Nagaland': 22,
    'Odisha': 23,
    'Puducherry': 24,
    'Punjab': 25,
    'Rajasthan': 26,
    'Sikkim': 27,
    'Tamil Nadu': 28,
    'Telangana ': 29,
    'Tripura': 30,
    'Uttar Pradesh': 31,
    'Uttarakhand': 32,
    'West Bengal': 33
                        }
        crop_mapping = {
    'maize': 1,
    'arhar/tur': 2,
    'bajra': 3,
    'gram': 4,
    'jowar': 5,
    'moong(green gram)': 6,
    'pulses total': 7,
    'ragi': 8,
    'rice': 9,
    'sugarcane': 10,
    'total foodgrain': 11,
    'urad': 12,
    'other  rabi pulses': 13,
    'wheat': 14,
    'cotton(lint)': 15,
    'castor seed': 16,
    'groundnut': 17,
    'niger seed': 18,
    'other cereals & millets': 19,
    'other kharif pulses': 20,
    'sesamum': 21,
    'soyabean': 22,
    'sunflower': 23,
    'linseed': 24,
    'safflower': 25,
    'small millets': 26,
    'rapeseed &mustard': 27,
    'other oilseeds': 28,
    'banana': 29,
    'grapes': 30,
    'mango': 31,
    'onion': 32,
    'tomato': 33,
    'tobacco': 34,
    'chickpea': 35,
    'kidneybeans': 36,
    'pigeonpeas': 37,
    'mothbeans': 38,
    'mungbean': 39,
    'blackgram': 40,
    'lentil': 41,
    'pomegranate': 42,
    'watermelon': 43,
    'muskmelon': 44,
    'apple': 45,
    'orange': 46,
    'papaya': 47,
    'coconut': 48,
    'cotton': 49,
    'jute': 50,
    'coffee': 51
                    }
        crop_season_mapping = {
    'autumn': 1,
    'kharif': 2,
    'rabi': 3,
    'summer': 4,
    'whole year': 5
                    }
        district_mapping_maharashtra = {
    'ahmednagar': 1, 'akola': 2, 'amravati': 3, 'aurangabad': 4, 'beed': 5,
    'bhandara': 6, 'buldhana': 7, 'chandrapur': 8, 'dhule': 9, 'gadchiroli': 10,
    'gondia': 11, 'hingoli': 12, 'jalgaon': 13, 'jalna': 14, 'kolhapur': 15,
    'latur': 16, 'mumbai': 17, 'nagpur': 18, 'nanded': 19, 'nandurbar': 20,
    'nashik': 21, 'osmanabad': 22, 'palghar': 23, 'parbhani': 24, 'pune': 25,
    'raigad': 26, 'ratnagiri': 27, 'sangli': 28, 'satara': 29, 'sindhudurg': 30,
    'solapur': 31, 'thane': 32, 'wardha': 33, 'washim': 34, 'yavatmal': 35
                    }        
        # Perform encoding for categorical variables
        # soil_encoded = self.label_encoders.transform([data['soil_type']])[0]
        # crop_encoded = self.label_encoders.transform([data['crop_type']])[0]
        data['state'] = state_mapping[data['state']]
        data['district'] = district_mapping_maharashtra[data['district']]
        data['crop_type'] = crop_mapping[data['crop_type']]
        data['season'] = crop_season_mapping[data['season']]
        return data
    def post(self, request, format=None):
        data = request.data
        encoded_data = self.encode_input(data)
        area=data['area']
         # Scale the input data
        X = [[
            encoded_data['state'],
            encoded_data['district'],
            encoded_data['crop_type'],
            encoded_data['season'],
            area
            
        ]]
        
        # Make predictions using the loaded classifier
        y_pred = self.classifier.predict(X)

        response_dict = {"Predicted production": y_pred[0]}
        return Response(response_dict, status=200)
        # data = request.data 
        # print(type(data))
        # print(data)
        # json_data = json.dumps(data)
        # json_obj = json.loads(json_data)
        # values_list = list(json_obj.values())
        # data_array = [values_list]
        
        # print(data_array)
        # # scaler = ApisConfig.scaler_model_fertilizer
        # #X = scaler.transform(data_array)
        
        
        
        # y_pred = loaded_classifier.predict(data_array)
        # prediction = y_pred

        # response_dict = {"Predicted Production": prediction}
        # return Response(response_dict, status=200)


# class Fertilizer_Model_Predict(APIView):
#     #permission_classes = [IsAuthenticated]
    
#     def post(self, request, format=None):
#         data = request.data 
#         print(type(data))
#         print(data)
#         json_data = json.dumps(data)
#         json_obj = json.loads(json_data)
#         values_list = list(json_obj.values())
#         data_array = [values_list]
        
#         print(data_array)
#         scaler = ApisConfig.scaler_model_fertilizer
#         X = scaler.transform(data_array)
        
        
#         loaded_classifier = ApisConfig.classifier_fertilizer 
#         y_pred = loaded_classifier.predict(X)
#         prediction = y_pred

#         response_dict = {"Prediced Fertilizer": prediction}
#         return Response(response_dict, status=200)        

class WeatherTemperature(APIView):
    def get(self, request):
        # Get the 'location' parameter from the query string
        location = request.query_params.get('location', '')
        if not location:
            return Response({'error': 'Location parameter is required'}, status=400)

        # Make API request to WeatherAPI.com
        api_key = 'e5dffb5a629c4fd389d171307242903'
        url = f'http://api.weatherapi.com/v1/current.json?key={api_key}&q={location}'
        headers = {'Authorization': f'Bearer {api_key}'}
        response = requests.get(url,headers)
        
        # Load the CSV data
        nph_data = pd.read_csv('NPKph.csv')

        # Filter data based on city
        filtered_data = nph_data[nph_data['City/Village'] == location.capitalize()]

        # If no data found for the given city, return empty response
        if filtered_data.empty:
            pass
        
        if response.status_code == 200:
            data = response.json()
            temperature_celsius = data['current']['temp_c']
            humidity = data['current']['humidity']
            district = data['location']['name']
            region=data['location']['region']
            
            if not filtered_data.empty:
            
             return Response({'temperature_celsius': temperature_celsius,
                             'humidity':humidity,
                             'district':district,
                             'region':region,
                             "Ph": filtered_data['Ph'].tolist()[0],
                             "N": filtered_data['N'].tolist()[0],
                             "P": filtered_data['P'].tolist()[0],
                             "K": filtered_data['K'].tolist()[0],
                             "Rainfall": filtered_data['Rainfall'].tolist()[0]})
            else:
            
             return Response({'temperature_celsius': temperature_celsius,
                             'humidity':humidity,
                             'district':district,
                             'region':region,
                             "Ph": 0.0,
                             "N": 0.0,
                             "P":0.0 ,
                             "K":0.0,
                             "Rainfall": 0.0})
        else:
            return Response({'error': 'Failed to fetch weather data'}, status=500)

class Combined_Model(APIView):
    #permission_classes = [IsAuthenticated]
    classifier_production = ApisConfig.classifier_production
    #scaler = ApisConfig.scaler_model_
    #classifier = ApisConfig.classifier_fertilizer
    #permission_classes = [IsAuthenticated]
    def decode_data(self,crops):
        print(crops[0][0])
        reverse_crop_mapping = {
    1: 'maize',
    2: 'arhar/tur',
    3: 'bajra',
    4: 'gram',
    5: 'jowar',
    6: 'moong(green gram)',
    7: 'pulses total',
    8: 'ragi',
    9: 'rice',
    10: 'sugarcane',
    11: 'total foodgrain',
    12: 'urad',
    13: 'other  rabi pulses',
    14: 'wheat',
    15: 'cotton(lint)',
    16: 'castor seed',
    17: 'groundnut',
    18: 'niger seed',
    19: 'other cereals & millets',
    20: 'other kharif pulses',
    21: 'sesamum',
    22: 'soyabean',
    23: 'sunflower',
    24: 'linseed',
    25: 'safflower',
    26: 'small millets',
    27: 'rapeseed &mustard',
    28: 'other oilseeds',
    29: 'banana',
    30: 'grapes',
    31: 'mango',
    32: 'onion',
    33: 'tomato',
    34: 'tobacco',
    35: 'chickpea',
    36: 'kidneybeans',
    37: 'pigeonpeas',
    38: 'mothbeans',
    39: 'mungbean',
    40: 'blackgram',
    41: 'lentil',
    42: 'pomegranate',
    43: 'watermelon',
    44: 'muskmelon',
    45: 'apple',
    46: 'orange',
    47: 'papaya',
    48: 'coconut',
    49: 'cotton',
    50: 'jute',
    51: 'coffee'
}
        crops[0][0] = reverse_crop_mapping[crops[0][0]]
        crops[1][0] = reverse_crop_mapping[crops[1][0]]
        crops[2][0] = reverse_crop_mapping[crops[2][0]]
        return crops
   
    def encode_input(self, data):
        state_mapping = {
    'Andaman and Nicobar Islands': 1,
    'Andhra Pradesh': 2,
    'Arunachal Pradesh': 3,
    'Assam': 4,
    'Bihar': 5,
    'Chandigarh': 6,
    'Chhattisgarh': 7,
    'Dadra and Nagar Haveli': 8,
    'Goa': 9,
    'Gujarat': 10,
    'Haryana': 11,
    'Himachal Pradesh': 12,
    'Jammu and Kashmir ': 13,
    'Jharkhand': 14,
    'Karnataka': 15,
    'Kerala': 16,
    'Madhya Pradesh': 17,
    'Maharashtra': 18,
    'Manipur': 19,
    'Meghalaya': 20,
    'Mizoram': 21,
    'Nagaland': 22,
    'Odisha': 23,
    'Puducherry': 24,
    'Punjab': 25,
    'Rajasthan': 26,
    'Sikkim': 27,
    'Tamil Nadu': 28,
    'Telangana ': 29,
    'Tripura': 30,
    'Uttar Pradesh': 31,
    'Uttarakhand': 32,
    'West Bengal': 33
                        }
        crop_mapping = {
    'maize': 1,
    'arhar/tur': 2,
    'bajra': 3,
    'gram': 4,
    'jowar': 5,
    'moong(green gram)': 6,
    'pulses total': 7,
    'ragi': 8,
    'rice': 9,
    'sugarcane': 10,
    'total foodgrain': 11,
    'urad': 12,
    'other  rabi pulses': 13,
    'wheat': 14,
    'cotton(lint)': 15,
    'castor seed': 16,
    'groundnut': 17,
    'niger seed': 18,
    'other cereals & millets': 19,
    'other kharif pulses': 20,
    'sesamum': 21,
    'soyabean': 22,
    'sunflower': 23,
    'linseed': 24,
    'safflower': 25,
    'small millets': 26,
    'rapeseed &mustard': 27,
    'other oilseeds': 28,
    'banana': 29,
    'grapes': 30,
    'mango': 31,
    'onion': 32,
    'tomato': 33,
    'tobacco': 34,
    'chickpea': 35,
    'kidneybeans': 36,
    'pigeonpeas': 37,
    'mothbeans': 38,
    'mungbean': 39,
    'blackgram': 40,
    'lentil': 41,
    'pomegranate': 42,
    'watermelon': 43,
    'muskmelon': 44,
    'apple': 45,
    'orange': 46,
    'papaya': 47,
    'coconut': 48,
    'cotton': 49,
    'jute': 50,
    'coffee': 51
                    }
        crop_season_mapping = {
    'autumn': 1,
    'kharif': 2,
    'rabi': 3,
    'summer': 4,
    'whole year': 5
                    }
        district_mapping_maharashtra = {
    'ahmednagar': 1, 'akola': 2, 'amravati': 3, 'aurangabad': 4, 'beed': 5,
    'bhandara': 6, 'buldhana': 7, 'chandrapur': 8, 'dhule': 9, 'gadchiroli': 10,
    'gondia': 11, 'hingoli': 12, 'jalgaon': 13, 'jalna': 14, 'kolhapur': 15,
    'latur': 16, 'mumbai': 17, 'nagpur': 18, 'nanded': 19, 'nandurbar': 20,
    'nashik': 21, 'osmanabad': 22, 'palghar': 23, 'parbhani': 24, 'pune': 25,
    'raigad': 26, 'ratnagiri': 27, 'sangli': 28, 'satara': 29, 'sindhudurg': 30,
    'solapur': 31, 'thane': 32, 'wardha': 33, 'washim': 34, 'yavatmal': 35
                    }        
        # Perform encoding for categorical variables
        # soil_encoded = self.label_encoders.transform([data['soil_type']])[0]
        # crop_encoded = self.label_encoders.transform([data['crop_type']])[0]
        data['state'] = state_mapping[data['state']]
        data['district'] = district_mapping_maharashtra[data['district']]
        data['crop_type'][0][0] = crop_mapping[data['crop_type'][0][0]]
        data['crop_type'][1][0] = crop_mapping[data['crop_type'][1][0]]
        data['crop_type'][2][0] = crop_mapping[data['crop_type'][2][0]]
        
        data['season'] = crop_season_mapping[data['season']]
        return data
    
    def predicted_crop(self,data):
        json_data = json.dumps(data)
        json_obj = json.loads(json_data)
        values_list = list(json_obj.values())
        data_array = [values_list]
        scaler = ApisConfig.scaler_model_m_crops
        X = scaler.transform(data_array)
        
        
        loaded_classifier = ApisConfig.classifier_m
        loaded_classifier.criterion = 'entropy'
        y_pred_proba = loaded_classifier.predict_proba(X)
        
        
        class_labels = loaded_classifier.classes_

        # Get the indices of the top 3 probabilities
        top3_indices = np.argsort(y_pred_proba[0])[::-1][:3]

        # Extract the top 3 probabilities and their corresponding crops
        top3_probs = y_pred_proba[0][top3_indices]
        top3_crops = class_labels[top3_indices]

        prediction = []
        for prob, crop in zip(top3_probs, top3_crops):
            
            prediction.append([crop,prob])
            
        #response_dict = {"Prediced Crop": prediction}
    
        return prediction
        
        
    def predicted_production(self,data,commodities):
        print(commodities[0][0])
        encoded_data = self.encode_input(data)
        area=data['area']
        
         # Scale the input data
        prod_pred=[]
        print(commodities[0][0])
        
        for i in range(0,3):
            X = [[
            encoded_data['state'],
            encoded_data['district'],
            encoded_data['crop_type'][i][0],
            encoded_data['season'],
            area     
         ]]
            y_pred = self.classifier_production.predict(X)
            
            prod_pred.append([commodities[i][0],y_pred[0]])
        
        return prod_pred
    
    
    classifier_prices = ApisConfig.classifier_prices
    
    def encode_input_prices(self,data):
        commodity_mapping = {
    'Cauliflower': 1,
    'Potato': 2,
    'Bamboo': 3,
    'Paddy(dhan)(common)': 4,
    'Lak(teora)': 5,
    'Wheat': 6,
    'Apple': 7,
    'Brinjal': 8,
    'Orange': 9,
    'Arecanut(betelnut/supari)': 10,
    'Bottle gourd': 11,
    'Cucumbar(kheera)': 12,
    'Tomato': 13,
    'Cotton': 14,
    'Jowar(sorghum)': 15,
    'Ginger(green)': 16,
    'Green chilli': 17,
    'Lemon': 18,
    'Guar': 19,
    'Bajra(pearl millet/cumbu)': 20,
    'Corriander seed': 21,
    'Onion': 22,
    'Cabbage': 23,
    'Cluster beans': 24,
    'Banana - green': 25,
    'Beetroot': 26,
    'Bitter gourd': 27,
    'Pegeon pea (arhar fali)': 28,
    'Pointed gourd (parval)': 29,
    'Ridgeguard(tori)': 30,
    'Drumstick': 31,
    'Papaya (raw)': 32,
    'Tinda': 33,
    'Coriander(leaves)': 34,
    'Bhindi(ladies finger)': 35,
    'Guava': 36,
    'Spinach': 37,
    'Grapes': 38,
    'Kinnow': 39,
    'Mousambi(sweet lime)': 40,
    'Methi(leaves)': 41,
    'Raddish': 42,
    'Carrot': 43,
    'Chikoos(sapota)': 44,
    'Mango': 45,
    'Mashrooms': 46,
    'Banana': 47,
    'Garlic': 48,
    'Pomegranate': 49,
    'Capsicum': 50,
    'Peas wet': 51,
    'Pumpkin': 52,
    'Papaya': 53,
    'French beans (frasbean)': 54,
    'Water melon': 55,
    'Knool khol': 56,
    'Dry chillies': 57,
    'Ground nut seed': 58,
    'Gur(jaggery)': 59,
    'Maize': 60,
    'Methi seeds': 61,
    'Seemebadnekai': 62,
    'Sweet pumpkin': 63,
    'Beans': 64,
    'Green avare (w)': 65,
    'Soapnut(antawala/retha)': 66,
    'Groundnut': 67,
    'Safflower': 68,
    'Chapparad avare': 69,
    'Neem seed': 70,
    'Copra': 71,
    'Amphophalus': 72,
    'Coconut': 73,
    'Ashgourd': 74,
    'Mango (raw-ripe)': 75,
    'Amaranthus': 76,
    'Little gourd (kundru)': 77,
    'Pineapple': 78,
    'Tapioca': 79,
    'Colacasia': 80,
    'Snakeguard': 81,
    'Coconut oil': 82,
    'Rubber': 83,
    'Black pepper': 84,
    'Elephant yam (suran)': 85,
    'Cowpea(veg)': 86,
    'Lime': 87,
    'Nutmeg': 88,
    'Coffee': 89,
    'Mustard': 90,
    'Soyabean': 91,
    'Arhar (tur/red gram)(whole)': 92,
    'Lentil (masur)(whole)': 93,
    'Kabuli chana(chickpeas-white)': 94,
    'Bengal gram(gram)(whole)': 95,
    'Chilly capsicum': 96,
    'Green peas': 97,
    'Tamarind fruit': 98,
    'Bengal gram dal (chana dal)': 99,
    'Sweet potato': 100,
    'Onion green': 101,
    'Chili red': 102,
    'Green gram (moong)(whole)': 103,
    'Rice': 104,
    'Arhar dal(tur dal)': 105,
    'Black gram dal (urd dal)': 106,
    'Green gram dal (moong dal)': 107,
    'Betal leaves': 108,
    'Ginger(dry)': 109,
    'Leafy vegetable': 110,
    'Peas cod': 111,
    'Taramira': 112,
    'Barley (jau)': 113,
    'Tender coconut': 114,
    'Sponge gourd': 115,
    'Karbuja(musk melon)': 116,
    'Mint(pudina)': 117,
    'Cummin seed(jeera)': 118,
    'Amla(nelli kai)': 119,
    'Marigold(loose)': 120,
    'Sesamum(sesame,gingelly,til)': 121,
    'Turmeric': 122,
    'Black gram (urd beans)(whole)': 123,
    'Ragi (finger millet)': 124,
    'T.v. cumbu': 125,
    'Yam (ratalu)': 126,
    'Indian beans (seam)': 127,
    'Cock': 128,
    'Fish': 129,
    'Mustard oil': 130,
    'White peas': 131,
    'Field pea': 132,
    'Firewood': 133,
    'Cowpea (lobia/karamani)': 134,
    'Sunflower': 135,
    'Coconut seed': 136,
    'Pepper ungarbled': 137,
    'Peas(dry)': 138,
    'Jute': 139,
    'Squash(chappal kadoo)': 140,
    'Rajgir': 141,
    'Turnip': 142,
    'Paddy(dhan)(basmati)': 143,
    'Tamarind seed': 144,
    'Season leaves': 145,
    'Wood': 146,
    'Soanf': 147,
    'Round gourd': 148,
    'Castor seed':149

        } 
        market_mapping = {
    'rahata': 1,
    'shrirampur': 2,
    'amarawati': 3,
    'aurangabad': 4,
    'paithan': 5,
    'deoulgaon raja': 6,
    'gandchiroli': 7,
    'hingoli(kanegoan naka)': 8,
    'kalamnuri': 9,
    'vashi new mumbai': 10,
    'kalmeshwar': 11,
    'kamthi': 12,
    'umared': 13,
    'lasalgaon(vinchur)': 14,
    'khed(chakan)': 15,
    'pune': 16,
    'pune(khadiki)': 17,
    'pune(pimpri)': 18,
    'tasgaon': 19,
    'karad': 20,
    'patan': 21,
    'satara': 22,
    'vai': 23,
    'akluj': 24,
    'mangal wedha': 25,
    'solapur': 26,
    'palghar': 27,
    'digras': 28,
    'umarkhed': 29,
    'kolhapur': 30,
    'junnar(alephata)': 31,
    'pune(moshi)': 32,
    'mangaon': 33,
    'vita': 34,
    'varora': 35,
    'bhusaval': 36,
    'karjat(raigad)': 37,
    'pen': 38,
    'murud': 39,
    'alibagh': 40,
    'parner': 41
    }
        district_mapping = {
    'Ahmednagar': 1,
    'Amarawati': 2,
    'Aurangabad': 3,
    'Buldhana': 4,
    'Gadchiroli': 5,
    'Hingoli': 6,
    'Mumbai': 7,
    'Nagpur': 8,
    'Nashik': 9,
    'Pune': 10,
    'Sangli': 11,
    'Satara': 12,
    'Sholapur': 13,
    'Thane': 14,
    'Yavatmal': 15,
    'Kolhapur': 16,
    'Raigad': 17,
    'Chandrapur': 18,
    'Jalgaon':19

}
       
        data['district'] = district_mapping[data['district'].capitalize()]
        data['Commodity'][0][0] = commodity_mapping[data['Commodity'][0][0]]
        data['Commodity'][1][0] = commodity_mapping[data['Commodity'][1][0]]
        data['Commodity'][2][0] = commodity_mapping[data['Commodity'][2][0]]
        data['Market'] = market_mapping[data['Market']]
        return data
        
    
    def predicted_prices(self,data,commodities):
        print(commodities)
        print(data)
        encoded_data = self.encode_input_prices(data)
        print(encoded_data)
        # Scale the input data
        prices_pred=[]
        for i in range(0,3):
            X = [[
            encoded_data['district'],
            encoded_data['Commodity'][i][0],
            encoded_data['Market'],
         ]]
            y_pred =self.classifier_prices.predict(X)
            
            prices_pred.append([commodities[i][0],y_pred[0]])
        
        return prices_pred
        
          
    
    def post(self, request, format=None):
        data = request.data 
        print(type(data))
        print(data)
        temp=data["temperature_celsius"]
        humidity=data["humidity"]
        state=data["region"]
        district=data["district"]
        Ph=data["Ph"]
        N=data["N"]
        P=data["P"]
        K=data["K"]
        rainfall=data["Rainfall"]
        season=data["season"]
        market=data["market_place"]
        area=data["area"]
        print([[temp,humidity,Ph,N,K,P,rainfall,season,market,area]])
        
        crops=self.predicted_crop({"N":N,"P":P,"K":K,"temperature":temp,"humidity":humidity,
                               "ph":Ph, "rainfall":rainfall})
        # crops.capitalize()
        commodities = crops
        
        production_pred=self.predicted_production({"state":state,"district":district,"season":season,"crop_type":crops,"area":area},crops)
        # prices_pred=self.predicted_prices({"district":district,"Market":market,"Commodity":commodities},commodities)
        # print(prices_pred)
        decoded_prod=self.decode_data(production_pred)   
        response_dict = {"Prediced Crop":decoded_prod }
        return Response(response_dict, status=200)