from django.apps import AppConfig
import pandas as pd
import os
from joblib import load
import sklearn

class ApisConfig(AppConfig):
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    CLASSIFIER_FOLDER = os.path.join(BASE_DIR, 'apis/classifiers/')
    MODEL_FILE = os.path.join(CLASSIFIER_FOLDER, "price_prediction_model.joblib")
    model = load(MODEL_FILE)
    scaler_file_prices = os.path.join(CLASSIFIER_FOLDER, "scaler.joblib") # Replace with your filename
    scaler_model_price = load(scaler_file_prices)
    #crops loading
    CROPS_CLASSIFIER_FILE = os.path.join(CLASSIFIER_FOLDER, 'CropsDecisionTreeClassifier.joblib')
    classifier = load(CROPS_CLASSIFIER_FILE)
    scaler_file_crops = os.path.join(CLASSIFIER_FOLDER, "scaler_crops.joblib") # Replace with your filename
    scaler_model_crops = load(scaler_file_crops)
    #crops loading multiple
    M_CROPS_CLASSIFIER_FILE = os.path.join(CLASSIFIER_FOLDER, 'MultipleCropsDecisionTreeClassifier.joblib')
    classifier_m = load(M_CROPS_CLASSIFIER_FILE)
    scaler_file_m_crops = os.path.join(CLASSIFIER_FOLDER, "multiple_scaler_crops.joblib") # Replace with your filename
    scaler_model_m_crops = load(scaler_file_m_crops)
    #fertilizers loading
    FERTILIZER_CLASSIFIER_FILE = os.path.join(CLASSIFIER_FOLDER, 'fertilizer_prediction_model.joblib')
    classifier_fertilizer = load(FERTILIZER_CLASSIFIER_FILE)
    scaler_file_fertilizer = os.path.join(CLASSIFIER_FOLDER, "scaler_fertilizer.joblib") # Replace with your filename
    scaler_model_fertilizer = load(scaler_file_fertilizer)
    labelEncoder_file_fertilizer = os.path.join(CLASSIFIER_FOLDER, "scaler_fertilizer.joblib") # Replace with your filename
    label_encoder_fertilizer = load(labelEncoder_file_fertilizer)
    
    default_auto_field = 'django.db.models.BigAutoField'
    #productions loading
    PRODUCTION_CLASSIFIER_FILE = os.path.join(CLASSIFIER_FOLDER, 'production_prediction_model.joblib')
    classifier_production = load(PRODUCTION_CLASSIFIER_FILE)
    #scaler_file_fertilizer = os.path.join(CLASSIFIER_FOLDER, "scaler_fertilizer.joblib") # Replace with your filename
    # scaler_model_fertilizer = load(scaler_file_fertilizer)
    default_auto_field = 'django.db.models.BigAutoField'
    
    name = 'apis'
