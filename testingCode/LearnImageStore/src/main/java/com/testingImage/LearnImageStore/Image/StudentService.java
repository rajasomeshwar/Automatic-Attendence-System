package com.testingImage.LearnImageStore.Image;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;

import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.TreeMap;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public List<byte[]> getPicturesForStudent(Long studentId) {
        List<Student> students = studentRepository.findByStudentid(studentId);
        return students.stream()
                       .map(Student::getPicture)
                       .toList();
    }
    public List<StudentDTo> getPicturesForStudentSpeficInOutTime(LocalDate date,String option) {
    	LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.atTime(LocalTime.MAX);
		List<Student> students = studentRepository.findByAttendanceDate(startOfDay,endOfDay);
      System.out.println(date+" "+option);
        List<StudentDTo> list=new ArrayList<>();
        TreeMap<Long,List<Student>> map=new TreeMap<>();
        for(int i=0;i<students.size();i++) {
        	//System.out.println(students.get(i));
        	
        var temp=	map.getOrDefault(students.get(i).getStudentId(),new ArrayList<>());
        	temp.add(students.get(i));
        map.put(students.get(i).getStudentId(),temp);	
        }
        
        
        SolverBasic(map);
        
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");  // Set to JSON since you're returning a list
        for(int i=0;i<students.size();i++) {
        	//System.out.println(students.get(i));
        	list.add(new StudentDTo(i,""+students.get(i).getStudentId(),students.get(i).getName(),"present",students.get(i).getPicture(), "it-c"));
        	
        }
        return list;
	}

    private void SolverBasic(TreeMap<Long, List<Student>> map) {
    
        for (long studentId : map.keySet()) {
            List<Student> data = map.get(studentId);
            data.sort(Comparator.comparing(Student::getAttendanceDatetime));
            calculateInOutTime(data);
        }
        
    }

	private void calculateInOutTime(List<Student> data) {
		// TODO Auto-generated method stub 
		//List<LocalTime>
		
	}
	public List<StudentDTo> getPicturesForStudentSpefic(LocalDate date,String option) {
    	LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.atTime(LocalTime.MAX);
		List<Student> students = studentRepository.findByAttendanceDate(startOfDay,endOfDay);
      System.out.println(date+" "+option);
        List<StudentDTo> list=new ArrayList<>();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");  // Set to JSON since you're returning a list
        for(int i=0;i<students.size();i++) {
        	//System.out.println(students.get(i));
        	list.add(new StudentDTo(i,""+students.get(i).getStudentId(),students.get(i).getName(),"present",students.get(i).getPicture(), "it-c"));
        	
        }
        return list;
	}
	public List<StudentDTo> getPicturesForStudentAll() {
		List<Student> students = studentRepository.findAll();
      
        List<StudentDTo> list=new ArrayList<>();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");  // Set to JSON since you're returning a list
        for(int i=0;i<students.size();i++) {
        	//System.out.println(students.get(i));
        	list.add(new StudentDTo(i,""+students.get(i).getStudentId(),students.get(i).getName(),"present",students.get(i).getPicture(), "it-c"));
        	
        }
        return list;
	}
}
