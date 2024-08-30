package com.testingImage.LearnImageStore.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    // Find all pictures for a specific studentId
    List<Student> findByStudentid(Long studentId);
   

    @Query("SELECT s FROM Student s WHERE s.attendanceDatetime BETWEEN :startDate AND :endDate")
    List<Student> findByAttendanceDate(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);


       

    
//
//        // Find all records for a specific student on a specific date
//        @Query("SELECT s FROM StudentReal s WHERE s.studentId = :studentId AND DATE(s.attendanceDateTime) = :date")
//        List<Student> findByStudentIdAndDate(@Param("studentId") Long studentId, @Param("date") LocalDate date);
//
//        // Find all records for a specific student between two dates
//        @Query("SELECT s FROM StudentReal s WHERE s.studentId = :studentId AND s.attendanceDateTime BETWEEN :startDate AND :endDate")
//        List<Student> findByStudentIdBetweenDates(@Param("studentId") Long studentId, @Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
//
//        // Find all records between two dates
//        @Query("SELECT s FROM StudentReal s WHERE s.attendanceDateTime BETWEEN :startDate AND :endDate")
//        List<Student> indByDateRange(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
//    

}
