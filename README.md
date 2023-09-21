# BCBSM Full Stack Developer Candidate Coding Exercise


Steps to Run Server and Client.

Start Spring boot app

create bcbs database and users table.

Run below script to create test users to start with. Registering user is not added.


CREATE TABLE `users` (
  `user_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


Run below scripts to add users

INSERT INTO bcbs.users
(user_name, password, `role`)
VALUES('sandip', '$2a$12$ayAgUvsV4OHyiBbYbbkaWOMT/2FZlrbhKZu5yzyAGwZVPOG.EsWR6', 'ROLE_ADMIN');


INSERT INTO bcbs.users
(user_name, password, `role`) 
VALUES('john', '$2a$12$ayAgUvsV4OHyiBbYbbkaWOMT/2FZlrbhKZu5yzyAGwZVPOG.EsWR6', 'ROLE_ADMIN');  // password is stored encrypted in db. 


To Start Angular user below command
ng serve

Once Angular Starts, Access login using below link
http://localhost:4200/login


Use Below Credentials to login 

user 1
sandip
testpassword

user 2
john
testpassword


## Requirements:
1.	Create a single page web application with a login screen (username, password)
2.	Demonstrate user login and authentication
3.	Upon login present member with ability to Send an email with an attachment. User must be login to access this page
4.	Create a REST service to send an email and store the email details in a database with the below structure:  
    From Email ID
    Recipient Email Id
    Attachment File Name
    Attachment File  
    UploadUser  
    UploadDate
5.	Display success message on web page and show the sent items in a list using angular data table with filters and sorting option
6.	Fork this repository and we will review your code from the fork.
7.  Mandatory to provide a code and workable pplication walk through 

## Tech Stack:  
    Springboot  
    Angular  
    MongoDB
