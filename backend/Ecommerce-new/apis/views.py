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
    
    def post(self, request, format=None):
        data = request.data 
        print(type(data))
        print(data)
        temp=data["temperature_celsius"]
        humidity=data["humidity"]
        Ph=data["Ph"]
        N=data["N"]
        P=data["P"]
        K=data["K"]
        rainfall=data["Rainfall"]
        print([[temp,humidity,Ph,N,K,P,rainfall]])
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
            
        
      
        
 