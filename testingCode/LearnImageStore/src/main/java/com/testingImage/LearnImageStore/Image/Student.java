package com.testingImage.LearnImageStore.Image;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.Arrays;

@Entity
@Table(name = "studentreal")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentid;

    private String name;

    @Lob
    private byte[] picture;

    private LocalDateTime attendanceDatetime;

    public Student() {
        // Default constructor
    }

    public Student(Long studentId, String name, byte[] picture, LocalDateTime attendanceDatetime) {
        this.studentid = studentId;
        this.name = name;
        this.picture = picture;
        this.attendanceDatetime = attendanceDatetime;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getStudentId() {
        return studentid;
    }

    public void setStudentId(Long studentId) {
        this.studentid = studentId;
    }

    public String getName() {
        return name;
    }

    @Override
	public String toString() {
		return "Student [id=" + id + ", studentId=" + studentid + ", name=" + name + ", picture="
				+ Arrays.toString(picture) + ", attendanceDatetime=" + attendanceDatetime + "]";
	}

	public void setName(String name) {
        this.name = name;
    }

    public byte[] getPicture() {
        return picture;
    }

    public void setPicture(byte[] picture) {
        this.picture = picture;
    }

    public LocalDateTime getAttendanceDatetime() {
        return attendanceDatetime;
    }

    public void setAttendanceDatetime(LocalDateTime attendanceDatetime) {
        this.attendanceDatetime = attendanceDatetime;
    }
}
