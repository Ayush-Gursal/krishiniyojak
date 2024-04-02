# -*- coding: utf-8 -*-
"""Fertilizer_Prediction.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/173bYaEG6jlTxFjd2TMk-cBDT9bs5D4c0
"""

import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

dataset = pd.read_csv('Fertilizer_Prediction.csv')
X = dataset.drop(columns=['Fertilizer Name']).values
y = dataset['Fertilizer Name'].values

categorical_cols = [3, 4]
from sklearn.preprocessing import LabelEncoder

label_encoders = {}
for col in categorical_cols:
    label_encoders[col] = LabelEncoder()
    X[:, col] = label_encoders[col].fit_transform(X[:, col])


# Convert X back to DataFrame with column names
encoded_df = pd.DataFrame(X, columns=dataset.drop(columns=['Fertilizer Name']).columns)

# Display the encoded DataFrame
print(encoded_df.head())
X

from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.25, random_state = 0)

X_train

unique_fertilizers = np.unique(y)
unique_fertilizers

print(y_train)

from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)

print(X_train)

from sklearn.naive_bayes import GaussianNB
classifier = GaussianNB()
classifier.fit(X_train, y_train)

sandy_soil_encoded = label_encoders[3].transform(['Red'])[0]
maize_crop_encoded = label_encoders[4].transform(['Tobacco'])[0]

encoded_soil = sandy_soil_encoded
encoded_crop = maize_crop_encoded
print(encoded_soil)
print(encoded_crop)

print(classifier.predict(sc.transform([[35,62, 48, encoded_soil, encoded_crop, 37, 0, 24]])))

y_pred = classifier.predict(X_test)
print(np.concatenate((y_pred.reshape(len(y_pred),1), y_test.reshape(len(y_test),1)),1))

from sklearn.metrics import confusion_matrix, accuracy_score
cm = confusion_matrix(y_test, y_pred)
print(cm)
accuracy_score(y_test, y_pred)

from joblib import dump
dump(classifier, 'fertilizer_prediction_model.joblib')
dump(sc, 'scaler_fertilizer.joblib')
dump(label_encoders, 'label_encoders_fertilizers.joblib')