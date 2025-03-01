# Automatic-Attendence-System
# Automatic Attendance System

## 📌 Overview
The **Automatic Attendance System** is a facial recognition-based attendance management system that automates student attendance tracking. It captures and processes real-time images to mark attendance efficiently.

## 🛠️ Technologies Used
- **Frontend**: React.js with Chakra UI
- **Backend**: Java Spring Boot
- **Database**: MySQL
- **Face Recognition**: OpenCV

## 🚀 Features
- 📷 **Face Detection & Recognition**
- 🔐 **Secure Authentication**
- 📊 **Attendance Dashboard**
- 📝 **Report Generation**
- 📡 **RESTful APIs for Data Exchange**

## 📂 Project Structure
```
📁 automatic-attendance-system
├── 📂 backend (Spring Boot)
├── 📂 frontend (React.js)
├── 📂 database (MySQL Scripts)
├── 📂 face-recognition (Python OpenCV)
└── README.md
```

## ⚙️ Setup Instructions
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/automatic-attendance-system.git
cd automatic-attendance-system
```

### 2️⃣ Backend Setup (Spring Boot)
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
Ensure MySQL is running and update `application.properties` with your DB credentials.

### 3️⃣ Frontend Setup (React.js)
```bash
cd frontend
npm install
npm start
```

### 4️⃣ Face Recognition Setup (Python & OpenCV)
```bash
cd face-recognition
pip install -r requirements.txt
python face_detection.py
```

## 📡 API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | Fetch all students |
| POST | `/api/attendance` | Mark attendance |
| GET | `/api/reports` | Get attendance reports |

## 📸 Sample Screenshot
![Attendance Dashboard](https://your-image-link.com)

## 🛠️ Future Enhancements
- ✅ **Real-time Alerts** for Attendance
- ✅ **Admin Panel for Manual Adjustments**
- ✅ **Integration with Biometric Sensors**

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first.

## 📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact
For any queries, reach out to: [your-email@example.com](mailto:your-email@example.com)

