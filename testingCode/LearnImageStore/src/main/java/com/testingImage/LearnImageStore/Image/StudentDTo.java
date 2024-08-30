package com.testingImage.LearnImageStore.Image;

public class StudentDTo {
   long id;
   String studentID;
   String name;
   String status;
   byte[] photoUrl;
   String classN;
   public long getId() {
	return id;
}
public void setId(int id) {
	this.id = id;
}
public String getStudentId() {
	return studentID;
}
public void setStudentID(String studentId) {
	this.studentID = studentId;
}
public String getName() {
	return name;
}
public void setName(String name) {
	this.name = name;
}
public String getStatus() {
	return status;
}
public void setStatus(String status) {
	this.status = status;
}
public byte[] getPhotoUrl() {
	return photoUrl;
}
public void setPhotoUrl(byte[] photoUrl) {
	this.photoUrl = photoUrl;
}
public String getClassN() {
	return classN;
}
public void setClassN(String classN) {
	this.classN = classN;
}

public StudentDTo() {}

public StudentDTo(long id, String studentId, String name, String status, byte[] photoUrl, String classN) {
	super();
	this.id = id;
	this.studentID = studentId;
	this.name = name;
	this.status = status;
	this.photoUrl = photoUrl;
	this.classN = classN;
}

}
