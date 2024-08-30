package com.testingImage.LearnImageStore.Image;

import org.springframework.http.HttpHeaders;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Service
public class StudentServiceDeep {
	

	    @Autowired
	    private StudentRepository studentRepository;

	    public List<byte[]> getPicturesForStudent(Long studentId) {
	        List<Student> students = studentRepository.findByStudentid(studentId);
	        return students.stream()
	                       .map(Student::getPicture)
	                       .toList();
	    }
	    public List<StudentInOutDetails> getPicturesForStudentSpeficInOutTime(LocalDate date,String option) {
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
	        
	        System.out.println("map "+map+"   "+map.size());
	       List<StudentInOutDetails> res= SolverBasic(map);
	        System.out.println("End map");
	        HttpHeaders headers = new HttpHeaders();
	        headers.set("Content-Type", "application/json"); // Set to JSON since you're returning a list
	      
	        System.out.println("return problem");
	        return res;
		}

	    private List<StudentInOutDetails> SolverBasic(TreeMap<Long, List<Student>> map) {
	    List<StudentInOutDetails> list=new ArrayList<>();
	    	
	        for (long studentId : map.keySet()) {
	            List<Student> data = map.get(studentId);
	            data.sort(Comparator.comparing(Student::getAttendanceDatetime));
	            List<LocalTime>[] inouttimes= calculateInOutTime(data);
	            List<Duration> times=new ArrayList<>();
	            for(int i=0;i<inouttimes[1].size();i++) {
	            	LocalTime time1=inouttimes[0].get(i);
	            	LocalTime time2=inouttimes[1].get(i);
	            	 Duration duration1 = Duration.between(time1, time2);
	              
               System.out.println(duration1.toHours()+" "+duration1.toMinutes()+" "+duration1.toMillis() );
	                times.add(duration1);
	            }
	            System.out.println("x "+ times);
	            // preprocess it 
	           list.add(Preprocess(data,inouttimes,times));
	        }
	        
	        return list;
	    }

		private StudentInOutDetails Preprocess(List<Student> data, List<LocalTime>[] inouttimes, List<Duration> times) {
			// TODO Auto-generated method stub
		/*
		 * Long studentId;
	String studentName;
	
	List<LocalTime> intimes;
	List<LocalTime> outtimes;
	@JsonIgnore
	List<byte[]> intimesimages;
	@JsonIgnore
	List<byte[]> outtimesimages;	
		 */
			StudentInOutDetails studentdata=new StudentInOutDetails();
			studentdata.setStudentId(data.get(0).getStudentId());
			studentdata.setIntimes(inouttimes[0]);
			studentdata.setOuttimes(inouttimes[1]);
			studentdata.setOuttimesimages(null);
			studentdata.setStudentName(data.get(0).getName());
			studentdata.setDuration(times);
		  return studentdata;
			
			
		}
		private List<LocalTime>[] calculateInOutTime(List<Student> data) {
			// TODO Auto-generated method stub 
			List<LocalTime>[] inoutlist=new ArrayList[2];
			inoutlist[0]=new ArrayList<>();
			inoutlist[1]=new ArrayList<>();
			for(int i=0;i<data.size();i++) {
				inoutlist[i%2].add(data.get(i).getAttendanceDatetime().toLocalTime());
			}
			System.out.println("Reacher her "+Arrays.toString(inoutlist));
			return inoutlist;
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


