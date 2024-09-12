import os
import cv2
import face_recognition
import pickle

def add_new_face(name):
    cam = cv2.VideoCapture("rtsp://shivaganeshdorn-21072.portmap.host:21072/h264.sdp")
    print("Press 's' to capture a photo of the new face.")

    while True:
        ret, frame = cam.read()
        cv2.imshow("Add New Face", frame)
        k = cv2.waitKey(1)

        if k == ord('s'):
            face_locations = face_recognition.face_locations(frame)
            face_encodings = face_recognition.face_encodings(frame, face_locations)

            if face_encodings:
                face_encoding = face_encodings[0]

                # Save the new face image
                face_image = frame[face_locations[0][0]:face_locations[0][2], face_locations[0][3]:face_locations[0][1]]
                face_image = cv2.resize(face_image, (250, 250))
                cv2.imwrite(f"faces/{name}.jpg", face_image)

                # Load existing data
                if os.path.exists("faces/encodings.pkl"):
                    with open("faces/encodings.pkl", "rb") as f:
                        data = pickle.load(f)
                else:
                    data = {"names": [], "encodings": []}

                # Add new face encoding
                data["names"].append(name)
                data["encodings"].append(face_encoding)

                # Save updated data
                with open("faces/encodings.pkl", "wb") as f:
                    pickle.dump(data, f)

                print(f"Added new face: {name}")
                break
            else:
                print("No face detected. Please try again.")

        elif k == ord('q'):
            break

    cam.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    new_name = input("Enter name for the new face: ")
    add_new_face(new_name)
