package com.testingImage.LearnImageStore.Image;

import java.time.Duration;
import java.time.LocalTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class StudentInOutDetails {
	
	Long studentId;
	@JsonProperty("name")
	String studentName;
	@JsonProperty("entryCount")
	List<LocalTime> intimes;
	@JsonProperty("exitCount")
	List<LocalTime> outtimes;
	@JsonProperty("Total stay time")
	List<Duration> duration;
	public List<Duration> getDuration() {
		return duration;
	}
	public void setDuration(List<Duration> duration) {
		this.duration = duration;
	}

	@JsonIgnore
	List<byte[]> intimesimages;
	@JsonIgnore
	List<byte[]> outtimesimages;
	public StudentInOutDetails() {
		
	}
	public StudentInOutDetails(Long studentId, String studentName, List<LocalTime> intimes, List<LocalTime> outtimes,
			List<byte[]> intimesimages, List<byte[]> outtimesimages) {
		super();
		this.studentId = studentId;
		this.studentName = studentName;
		this.intimes = intimes;
		this.outtimes = outtimes;
		this.intimesimages = intimesimages;
		this.outtimesimages = outtimesimages;
	}
	public Long getStudentId() {
		return studentId;
	}
	public void setStudentId(Long studentId) {
		this.studentId = studentId;
	}
	public String getStudentName() {
		return studentName;
	}
	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}
	public List<LocalTime> getIntimes() {
		return intimes;
	}
	public void setIntimes(List<LocalTime> intimes) {
		this.intimes = intimes;
	}
	public List<LocalTime> getOuttimes() {
		return outtimes;
	}
	public void setOuttimes(List<LocalTime> outtimes) {
		this.outtimes = outtimes;
	}
	public List<byte[]> getIntimesimages() {
		return intimesimages;
	}
	public void setIntimesimages(List<byte[]> intimesimages) {
		this.intimesimages = intimesimages;
	}
	public List<byte[]> getOuttimesimages() {
		return outtimesimages;
	}
	public void setOuttimesimages(List<byte[]> outtimesimages) {
		this.outtimesimages = outtimesimages;
	}
	
	@Override
	public String toString() {
		return "StudentInOutDetails [studentId=" + studentId + ", studentName=" + studentName + ", intimes=" + intimes
				+ ", outtimes=" + outtimes + ", intimesimages=" + intimesimages + ", outtimesimages=" + outtimesimages
				+ "]";
	}
	
	
	
	

}
