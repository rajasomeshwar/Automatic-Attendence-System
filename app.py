import os
import cv2
import face_recognition
import pickle
import numpy as np
# Load known faces and encodings from pickle file
with open("faces/encodings.pkl", "rb") as f:
    data = pickle.load(f)

names = data["names"]
encodings = data["encodings"]

cam = cv2.VideoCapture(0)
while True:
    ret, frame = cam.read()
    face_locations = face_recognition.face_locations(frame)
    face_encodings = face_recognition.face_encodings(frame, face_locations)

    for face_encoding, face_location in zip(face_encodings, face_locations):
        matches = face_recognition.compare_faces(encodings, face_encoding)
        face_distance = face_recognition.face_distance(encodings, face_encoding)
        best_match_index = np.argmin(face_distance)

        if matches[best_match_index]:
            name = names[best_match_index]
            top, right, bottom, left = face_location
            cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)
            cv2.putText(frame, name, (left + 6, top - 20), cv2.FONT_HERSHEY_PLAIN, 1.0, (255, 255, 255), 1)
        else:
            top, right, bottom, left = face_location
            cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)

    cv2.imshow("Frame", frame)
    k = cv2.waitKey(1)

    if k == ord('q'):
        break

cam.release()
cv2.destroyAllWindows()
