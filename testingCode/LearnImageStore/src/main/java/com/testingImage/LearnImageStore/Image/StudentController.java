package com.testingImage.LearnImageStore.Image;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Base64;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/students")
@CrossOrigin("*")
public class StudentController {

    @Autowired
    private StudentService studentService;
    @Autowired
    private StudentServiceDeep studentServiceDeep;
    
    
    @GetMapping("/s/{date}/{option}")
    public ResponseEntity<List<StudentDTo>> getStudentPictures(@PathVariable LocalDate date,@PathVariable String option) {
//        List<byte[]> images = studentService.getPicturesForStudentSpefic(date,option);
List<StudentDTo> images = studentService.getPicturesForStudentSpefic(date,option);
        
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");  // Set to JSON since you're returning a list

        return new ResponseEntity<>(images, headers, HttpStatus.OK);
    }
    @GetMapping("/{id}/pictures")
    public ResponseEntity<List<StudentDTo>> getStudentPictures(@PathVariable Long id) {
        List<byte[]> images = studentService.getPicturesForStudent(id);
        List<StudentDTo> list=new ArrayList<>();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");  // Set to JSON since you're returning a list
        for(int i=0;i<images.size();i++) {
        	System.out.println(images.get(i));
        	list.add(new StudentDTo(i,"c03","Rajsom","present",images.get(i), "itc"));
        	
        }
        return new ResponseEntity<>(list, headers, HttpStatus.OK);
    }

    @GetMapping("/picturesAll")
    public ResponseEntity<List<StudentDTo>> getStudentPicturesAll() {
    	List<StudentDTo> images = studentService.getPicturesForStudentAll();
        
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");  // Set to JSON since you're returning a list

        return new ResponseEntity<>(images, headers, HttpStatus.OK);
    }
//
//    @GetMapping("/{id}/pictures")
//    public ResponseEntity<List<byte[]>> getStudentPictures(@PathVariable Long id) {
//        List<byte[]> images = studentService.getPicturesForStudent(id);
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.set("Content-Type", "application/json");  // Set to JSON since you're returning a list
//        
//        return new ResponseEntity<>(images, headers, HttpStatus.OK);
//    }
//    @GetMapping("/picturesAll")
//    public ResponseEntity<List<byte[]>> getStudentPicturesAll(@PathVariable Long id) {
//        List<byte[]> images = studentService.getPicturesForStudent(id);
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.set("Content-Type", "application/json");  // Set to JSON since you're returning a list
//
//        return new ResponseEntity<>(images, headers, HttpStatus.OK);
//    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    /************************** Deepth*******************/
    
    @GetMapping("/d/{date}/{option}")
    public ResponseEntity<List<StudentInOutDetails>> getStudentPicturesDepth(@PathVariable LocalDate date,@PathVariable String option) {
//        List<byte[]> images = studentService.getPicturesForStudentSpefic(date,option);
List<StudentInOutDetails> images = studentServiceDeep.getPicturesForStudentSpeficInOutTime(date,option);
        
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");  // Set to JSON since you're returning a list

        return new ResponseEntity<>(images, headers, HttpStatus.OK);
    }
}
