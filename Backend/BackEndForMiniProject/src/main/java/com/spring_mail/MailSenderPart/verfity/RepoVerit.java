package com.spring_mail.MailSenderPart.verfity;


import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
@Repository
public interface RepoVerit extends JpaRepository<VerfityItem1,Integer> {
         VerfityItem1 findByEmail( String email);
}
