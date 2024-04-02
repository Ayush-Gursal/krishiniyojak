from django.urls import path,include
import apis.views as views

urlpatterns = [
    path('predict_price/', views.Prices_Model_Predict.as_view(), name = 'predict_price'),
    path('predict_crop/', views.Crops_Model_Predict.as_view(), name = 'predict_crop'),
    path('predict_fertilizer/', views.Fertilizer_Model_Predict.as_view(), name = 'predict_fertilizer'),
    path('predict_production/', views.Production_Model_Predict.as_view(), name = 'predict_production'),
    path('predict_crop_multiple/', views.Multiple_Crops_Model_Predict.as_view(), name = 'predict_multiple'),
    path('weather/temperature/', views.WeatherTemperature.as_view(), name='weather_temperature'),
    path('predict_combined/', views.Combined_Model.as_view(), name='combined_pred'),
    
]