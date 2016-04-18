

------Useful Queries----------------------

-----GET CLASS INFORMATION----
SELECT
			 LOWER( Class.Class_Start_Timestamp ) 	                      AS 'Class Start Time',
			 LOWER( Class.Class_End_Timestamp ) 	                        AS 'Class End Time',
			 LOWER( Subject.Subject_Name ) 		                            AS 'Subject Name',
			 LOWER( Room.Room_Name ) 								 	                    AS 'Room Name',
       CONCAT( Teacher.Teacher_Fname, ' ' , Teacher.Teacher_Lname)  AS 'Teacher Name'

FROM Class, Subject, Room, Teacher

WHERE Class.Subject_ID = Subject.Subject_ID
		AND Class.Room_ID = Room.Room_ID
		AND Class.Teacher_ID = Teacher.Teacher_ID

LIMIT 0 , 10;




SELECT Class.Class_ID AS 'id', Subject.Subject_Name AS 'title', CONCAT( Class.Class_Date, ' ' , Class.Class_Start_Time) AS 'start', CONCAT( Class.Class_Date, ' ' , Class.Class_End_Time) AS 'end' FROM Student, Student_has_Class, Subject, Class, Room WHERE Student_has_Class.Student_ID = Student.Student_ID AND Student_has_Class.Class_ID = Class.Class_ID AND Class.Subject_ID = Subject.Subject_ID AND Class.Room_ID = Room.Room_ID AND Student.Student_ID LIKE 1;

---ADMIN HOME PAGE

-----GET ATTENDNACE INFORMATION / ABSENT ACROSS ALL YEARS-----
SELECT LOWER(  Student.Student_Year ) AS 'Student Year', COUNT(  Attendance.Attendance_Status) AS 'Attendance_Count' FROM Student, Attendance, Class, Subject WHERE Attendance.Class_ID = Class.Class_ID AND Attendance.Student_ID = Student.Student_ID AND Class.Subject_ID = Subject.Subject_ID AND Attendance.Attendance_Status = 'absent' GROUP BY Student.Student_Year;

-----Number of Students Across All Years-----
SELECT LOWER( Student_Year ) AS 'Student_Year', COUNT( Student_ID ) AS 'Number Of Students' FROM Student GROUP BY Student_Year;

---3 most popular people how truant-----
SELECT CONCAT( Student.Student_Fname, ' ' , Student.Student_Lname)  AS 'Student_Name', COUNT(  Attendance.Attendance_Status) AS 'Attendance_Count' FROM Student, Attendance, Class WHERE Attendance.Student_ID = Student.Student_ID AND Attendance.Class_ID = Class.Class_ID AND Attendance.Attendance_Status = 'absent' GROUP BY Student_Name ORDER BY Attendance_Count DESC LIMIT 3

--GET ATTENDANCE INFORMATION ACROSS ALL SUBJECTS
SELECT LOWER(  Subject.Subject_Name ) AS 'Subject Name', COUNT(  Attendance.Attendance_Status) AS 'Attendance_Count' FROM Student, Attendance, Class, Subject WHERE Attendance.Class_ID = Class.Class_ID AND Attendance.Student_ID = Student.Student_ID AND Class.Subject_ID = Subject.Subject_ID AND Attendance.Attendance_Status = 'absent' GROUP BY Subject.Subject_Name;


---TEACHER HOME PAGE

--Gets a teachers current class and if the teacher has taken register for that class --
SELECT LOWER( Class.Class_ID ) AS 'Class_ID', LOWER(  Subject.Subject_Name ) AS 'Subject Name', LOWER(  Class.Class_Start_Timestamp ) AS 'Class Start Time', LOWER(  Class.Class_End_Timestamp ) AS 'Class End Time', LOWER(  Class.Class_Level ) AS 'Class Level', TIMEDIFF(NOW(), Class.Class_Start_Timestamp) AS 'Time Difference', CASE when Attendance.Attendance_Status is null then 'No' else 'Yes' end as 'Has_Attendance_Been_Taken' FROM Class LEFT JOIN Attendance ON(Attendance.Class_id = Class.Class_ID) INNER JOIN Teacher ON(Teacher.Teacher_ID = Class.Teacher_ID) INNER JOIN Subject ON(Subject.Subject_ID = Class.Subject_ID) INNER JOIN Room ON(Room.Room_ID = Class.Room_ID) WHERE Teacher.Teacher_ID = '1' AND NOW() between class.class_start_timestamp and class.class_end_timestamp LIMIT 1;

--Gets todays classes for an individual teacher
SELECT LOWER( Class.Class_ID ) AS 'Class_ID', LOWER(  Subject.Subject_Name ) AS 'Subject Name', LOWER(  Class.Class_Start_Timestamp ) AS 'Class Start Time', LOWER(  Class.Class_End_Timestamp ) AS 'Class End Time', LOWER(  Class.Class_Level ) AS 'Class Level' FROM Class INNER JOIN Subject ON(Subject.Subject_ID = Class.Subject_ID) INNER JOIN Teacher ON(Teacher.Teacher_ID = Class.Teacher_ID) WHERE DATE(Class_Start_Timestamp) = CURDATE() AND Teacher.Teacher_ID = '2';

---PARENT HOME PAGE


-----GET STUDENT PARENT INFORMATION-----
SELECT CONCAT( Student.Student_Fname, ' ' , Student.Student_Lname)  AS 'Student_Name', Student.Student_Email, Student.Student_Year, Student.Student_Username FROM Parent, Student, Student_has_Parent WHERE Student_has_Parent.Student_Student_ID = Student.Student_ID AND Student_has_Parent.Parent_Parent_ID = Parent.Parent_ID AND LOWER( Parent_ID ) LIKE  '1'
-----GET Parent Student INFORMATION-----
SELECT CONCAT( Parent.Parent_Fname, ' ' , Parent.Parent_Lname)  AS 'Parent_Name', Parent.Parent_Email, Parent.Parent_Username FROM Parent, Student, Student_has_Parent WHERE Student_has_Parent.Student_Student_ID = Student.Student_ID AND Student_has_Parent.Parent_Parent_ID = Parent.Parent_ID AND LOWER( Parent_ID ) LIKE  '1'


SELECT LOWER(  Subject.Subject_Name ) AS 'Subject_Name', LOWER(  Attendance.Attendance_Status )AS 'Attendance_Info', COUNT(  Attendance.Attendance_Status) AS 'Attendance_Count' FROM Student, Attendance, Class, Subject WHERE Attendance.Class_ID = Class.Class_ID AND Attendance.Student_ID = Student.Student_ID AND Class.Subject_ID = Subject.Subject_ID AND LOWER( Student.Student_ID ) = '4' AND LOWER( Subject.Subject_ID ) = '1' GROUP BY Subject.Subject_Name, Attendance.Attendance_Status;



SELECT Student_ID, CONCAT( Student.Student_Fname, ' ' , Student.Student_Lname)  AS 'Student_Name', CONCAT( Parent.Parent_Fname, ' ' , Parent.Parent_Lname)  AS 'Parent_Name', Student_Email, Student_Year, Student_Username FROM Student, Parent, Student_has_Parent WHERE Student_has_Parent.Student_Student_ID = Student.Student_ID AND Student_has_Parent.Parent_Parent_ID = Parent.Parent_ID AND LOWER( Student_ID ) LIKE  '1'


------GET ALL THE TEACHERS CLASSES------
SELECT LOWER(  Subject.Subject_Name ) AS 'Subject Name', LOWER(  Class.Class_Start_Timestamp ) AS 'Class Start Time', LOWER(  Class.Class_End_Timestamp ) AS 'Class End Time', LOWER(  Class.Class_Level ) AS 'Class Level', TIMEDIFF(NOW(), Class.Class_Start_Timestamp) AS 'Time Difference' FROM Teacher, Subject, Class, Room WHERE Class.Teacher_ID = Teacher.Teacher_ID AND Class.Subject_ID = Subject.Subject_ID AND Class.Room_ID = Room.Room_ID AND LOWER( Teacher.Teacher_ID ) LIKE  '1' AND NOW() between class.class_start_timestamp and class.class_end_timestamp;



SELECT Class.Class_ID, Subject.Subject_Name, Class.Class_Start_Time, Class.Class_End_Time, Class.Class_Date, Class.Class_Level FROM Teacher, Subject, Class, Room WHERE Class.Teacher_ID = Teacher.Teacher_ID AND Class.Subject_ID = Subject.Subject_ID AND Class.Room_ID = Room.Room_ID AND Teacher.Teacher_ID LIKE  '3';




SELECT Class.Class_ID AS 'id', Subject.Subject_Name AS 'title', CONCAT( Class.Class_Date, ' ' , Class.Class_Start_Time) AS 'start', CONCAT( Class.Class_Date, ' ' , Class.Class_End_Time) AS 'end' FROM Teacher, Subject, Class, Room WHERE Class.Teacher_ID = Teacher.Teacher_ID AND Class.Subject_ID = Subject.Subject_ID AND Class.Room_ID = Room.Room_ID AND Teacher.Teacher_ID LIKE  '3';




--Get All Students in a class based on a Student ID
SELECT Student.Student_ID AS 'Student ID', Class.Class_ID AS 'Class ID', CONCAT( Class.Class_Date, ' ' , Class.Class_Start_Time) AS 'start', CONCAT( Class.Class_Date, ' ' , Class.Class_End_Time) AS 'end' FROM Student, Class, Student_Has_Class WHERE Student_Has_Class.Student_ID = Student.Student_ID AND Student_Has_Class.Class_ID = Class.Class_ID AND Student.Student_ID LIKE  '1';




SELECT Class.Class_Date, Class.Class_Start_Time, Class.Class_End_Time, Subject.Subject_Name, Room.Room_Name, Teacher.Teacher_Title, Teacher.Teacher_Fname, Teacher.Teacher_Lname FROM Class, Subject, Room, Teacher WHERE Class.Subject_ID = Subject.Subject_ID AND Class.Room_ID = Room.Room_ID AND Class.Teacher_ID = Teacher.Teacher_ID;






--Get all Classes Based on Teacher Information --
SELECT Class.Class_ID AS 'id', Subject.Subject_Name AS 'title', CONCAT( Class.Class_Date, ' ' , Class.Class_Start_Time) AS 'start', CONCAT( Class.Class_Date, ' ' , Class.Class_End_Time) AS 'end', Room.Room_Name AS 'room', CONCAT( Teacher.Teacher_Fname, ' ' , Teacher.Teacher_Lname) AS 'teacher' FROM Teacher, Subject, Class, Room WHERE Class.Teacher_ID = Teacher.Teacher_ID AND Class.Subject_ID = Subject.Subject_ID AND Class.Room_ID = Room.Room_ID AND Teacher.Teacher_ID LIKE ${userID}




----------------------------- RUN THIS QUERY AS A BUNCH

-- Run This Query to get the current Class ID and Student ID that the Student is supposed to be in--
SELECT Class.Class_ID AS 'Class_ID', Student.Student_ID AS 'Student_ID' FROM Student, Student_has_Class, Subject, Class, Room, Teacher WHERE Student_has_Class.Student_ID = Student.Student_ID AND Student_has_Class.Class_ID = Class.Class_ID AND Class.Subject_ID = Subject.Subject_ID AND Class.Teacher_ID = Teacher.Teacher_ID AND Class.Room_ID = Room.Room_ID AND NOW() BETWEEN Class.Class_Start_Timestamp AND Class.Class_End_Timestamp AND Student.Student_ID LIKE '1'

-- If the above query is empty then the student isn't supposed to be in a class?

-- If there is data then run the below query

--Gets Start & End Time for all classes and returns the attendnace status for each class. Based on a Student ID
SELECT Student.Student_ID AS 'Student ID', Class.Class_ID AS 'Class ID', Class.Class_Start_Timestamp AS 'start', Class.Class_End_Timestamp AS 'end', Subject.Subject_Name as 'Subject_Name', Attendance.Attendance_Status AS 'Attendance_Status' FROM Student, Class, Student_Has_Class, Subject, Attendance WHERE Student_Has_Class.Student_ID = Student.Student_ID AND Student_Has_Class.Class_ID = Class.Class_ID AND Class.Subject_ID = Subject.Subject_ID AND Attendance.Class_ID = Class.Class_ID AND Attendance.Student_ID = Student.Student_ID AND Class.Class_ID LIKE  '11' AND Student.Student_ID LIKE '1';

--Get the Attendance Remarks, if none then teachr hasn't taken class yet



--Gets Attendnace Information based on the last day, week or month. (Change variable at end). Need Student ID.
SELECT Class.Class_ID AS 'Class ID', Subject.Subject_Name as 'Subject_Name', Class.Class_Start_Timestamp AS 'start',  CONCAT( Teacher.Teacher_Fname, ' ' , Teacher.Teacher_Lname) AS 'Teacher_Name', Attendance.Attendance_Status AS 'Attendance_Status' FROM Student, Class, Student_Has_Class, Subject, Teacher, Attendance WHERE Student_Has_Class.Student_ID = Student.Student_ID AND Student_Has_Class.Class_ID = Class.Class_ID AND Class.Teacher_ID = Teacher.Teacher_ID AND Class.Subject_ID = Subject.Subject_ID AND Attendance.Class_ID = Class.Class_ID AND Attendance.Student_ID = Student.Student_ID AND Class.Class_Start_Timestamp > DATE_SUB(NOW(), INTERVAL 1 MONTH) AND Student.Student_ID LIKE '1' ORDER BY start ASC;


SELECT Class.Class_ID AS 'Class_ID',
          Student.Student_ID AS 'Student_ID',
          IFNULL(Attendance.Attendance_Status, 0) AS 'Attendance'

FROM Student, Student_has_Class, Subject, Class, Room, Teacher, Attendance

WHERE Student_has_Class.Student_ID = Student.Student_ID
  AND Student_has_Class.Class_ID = Class.Class_ID
    AND Class.Subject_ID = Subject.Subject_ID
      AND Attendance.Class_ID = Class.Class_ID
        AND Attendance.Student_ID = Student.Student_ID
          AND Class.Teacher_ID = Teacher.Teacher_ID
            AND Class.Room_ID = Room.Room_ID AND NOW() BETWEEN Class.Class_Start_Timestamp
              AND Class.Class_End_Timestamp AND Student.Student_ID LIKE '1';


SELECT Class.Class_ID AS 'Class_ID',
          Student.Student_ID AS 'Student_ID',
          IFNULL(Attendance.Attendance_Status, 0) AS 'Attendance'
FROM Class
  INNER JOIN Student
    ON Subject.Subject_ID=Class.Subject_ID
  INNER JOIN Student_has_Class
    ON Student.Student_ID=Student_has_Class.Student_ID AND Class.Class_ID=Student_has_Class.Class_ID
  INNER JOIN Attendance
    ON Class.Class_ID=Attendance.Class_ID;








SELECT Class.Class_ID AS 'Class_ID',
          Student.Student_ID AS 'Student_ID',
          Attendance.Attendance_Status AS 'Attendance'

FROM Student, Student_has_Class, Subject, Class, Attendance

WHERE Student_has_Class.Student_ID = Student.Student_ID
  AND Student_has_Class.Class_ID = Class.Class_ID
    AND Class.Subject_ID = Subject.Subject_ID
      AND Attendance.Class_ID = Class.Class_ID
        AND Attendance.Student_ID = Student.Student_ID
            AND NOW() BETWEEN Class.Class_Start_Timestamp AND Class.Class_End_Timestamp
              AND Student.Student_ID LIKE '1';


              SELECT  student.Student_ID as 'Student_ID',
                      case when class.class_id is null then 'No Class ATM' else class.class_id end as 'Class_ID',
                      case when Attendance.Attendance_Status is null then 'Not Present' else Attendance.Attendance_Status end as 'attendence_status'
              FROM Student
              LEFT OUTER JOIN Student_Has_Class ON(student_has_class.student_id = student.student_id
                                                    AND Student.student_id like '1')
              LEFT OUTER JOIN class ON(class.class_id = student_has_class.class_id)
              INNER JOIN Subject ON(class.subject_id = subject.subject_id)
              LEFT JOIN Attendance on(Attendance.class_id = class.class_ID
                                      AND Attendance.student_id = student.student_id)
              WHERE NOW() between class.class_start_timestamp and class.class_end_timestamp;




              SELECT  student.Student_ID as 'Student_ID',
                      case when class.class_id is null then 'No Class ATM' else class.class_id end as 'Class_ID',
                      case when Attendance.Attendance_Status is null then 'Not Present' else Attendance.Attendance_Status end as 'attendence_status'
              FROM Student
              INNER JOIN Student_Has_Class ON(student_has_class.student_id = student.student_id)
              INNER JOIN class ON(class.class_id = student_has_class.class_id)
              INNER JOIN Subject ON(class.subject_id = subject.subject_id)
              LEFT JOIN Attendance on(Attendance.class_id = class.class_ID
                                      AND Attendance.student_id = student.student_id)
              WHERE NOW() between class.class_start_timestamp and class.class_end_timestamp
              AND Student.student_id like '1'



                      --WORKING QUERY - NEEDS CHANGING THOUGH
                        SELECT DISTINCT student.Student_ID as 'Student_ID',
                                CONCAT( Student.Student_Fname, ' ' , Student.Student_Lname)  AS 'Student_Name',
                                 Student.Student_Email AS 'Student_Email',
                                 Student.Student_Year AS 'Student_Year',
                                 Student.Student_Username AS 'Student_Username',
                                 CONCAT ((CASE when Subject.Subject_Name is null then 'No Class ATM' else Subject.Subject_Name end), ' ',  (CASE when Attendance.Attendance_Status is null then 'No attendance taken' else Attendance.Attendance_Status end)) AS 'Attendance_Info'
                        FROM Student
                          LEFT JOIN Student_Has_Class ON(student_has_class.student_id = student.student_id)
                          LEFT JOIN class ON class.class_id = student_has_class.class_id
                              AND NOW() between class.class_start_timestamp and class.class_end_timestamp
                          LEFT JOIN Subject ON(class.subject_id = subject.subject_id)
                          LEFT JOIN Attendance on(Attendance.class_id = class.class_ID
                              AND Attendance.student_id = student.student_id)
                        WHERE Student.student_id = 4
                          ORDER BY class.class_id DESC
                            LIMIT 1;

                            CONCAT (Subject.Subject_Name AS 'Subject_Name', ' ',  CASE when Attendance.Attendance_Status is null then 'No attendance taken' else Attendance.Attendance_Status end as 'Attendance_Status')

                                    SELECT  DISTINCT student.Student_ID as 'Student_ID',
                                    IFNULL (class.class_id, 0) as 'Class_ID',
                                    IFNULL (Attendance.Attendance_Status, 0) as 'Class_ID'
                                    FROM Student
                                      LEFT JOIN Student_Has_Class ON(student_has_class.student_id = student.student_id)
                                        LEFT JOIN class ON class.class_id = student_has_class.class_id
                                            AND NOW() between class.class_start_timestamp and class.class_end_timestamp
                                          LEFT JOIN Subject ON(class.subject_id = subject.subject_id)
                                            LEFT JOIN Attendance on(Attendance.class_id = class.class_ID
                                              AND Attendance.student_id = student.student_id)
                                                WHERE Student.student_id = 1;


SELECT Student.Student_ID,
        CONCAT( Student.Student_Fname, ' ' , Student.Student_Lname)  AS 'Student_Name'

FROM Student, Parent, Student_has_Parent

WHERE Student_has_Parent.Student_Student_ID = Student.Student_ID
  AND Student_has_Parent.Parent_Parent_ID = Parent.Parent_ID
    AND LOWER( Parent_ID ) = 1;



/*
              SELECT class.class_id as 'Class_ID',
                      student.Student_ID as 'Student_ID',
                      case when attendence.attendence_status is null then 'Not Present' else attendence.attendence_status end as 'attendence_status'
              FROM Student
              INNER JOIN Student_Has_Class ON(student_has_class.student_id = student.student_id)
              INNER JOIN class ON(class.class_id = student_has_class.class_id)
              INNER JOIN Subject ON(class.subject_id = subject.subject_id)
              LEFT JOIN Attendence on(attendence.class_id = class.class_ID
                                      AND attendence.student_id = student.student_id)
              WHERE NOW() between class.class_start_timestamp and class.class_end_timestamp
              AND Student.student_id like '1'
*/


--WORKING QUERY - NEEDS CHANGING THOUGH
  SELECT DISTINCT student.Student_ID as 'Student_ID',
    CONCAT( Student.Student_Fname, ' ' , Student.Student_Lname)  AS 'Student_Name',
      Student.Student_Email AS 'Student_Email', Student.Student_Year AS 'Student_Year',
        Student.Student_Username AS 'Student_Username',
          CASE when Subject.Subject_Name is null then 'Student Has No Class' else Subject.Subject_Name end as 'Subject_Name',
            CASE when Attendance.Attendance_Status is null then 'No Attendance Taken Yet' else Attendance.Attendance_Status end as 'Attendance_Status'
  FROM Student
    LEFT JOIN Student_Has_Class ON(student_has_class.student_id = student.student_id)
      LEFT JOIN class ON class.class_id = student_has_class.class_id
        AND NOW() between class.class_start_timestamp AND class.class_end_timestamp
    LEFT JOIN Subject ON(class.subject_id = subject.subject_id)
    LEFT JOIN Attendance ON(Attendance.class_id = class.class_ID
        AND Attendance.student_id = student.student_id)
    WHERE Student.student_id = 1;
      ORDER BY class.class_id
    DESC LIMIT 1

    SELECT DISTINCT student.Student_ID as 'Student_ID', CONCAT( Student.Student_Fname, ' ' , Student.Student_Lname)  AS 'Student_Name', Student.Student_Email AS 'Student_Email', Student.Student_Year AS 'Student_Year', Student.Student_Username AS 'Student_Username', CASE when Subject.Subject_Name is null then 'Student Has No Class' else Subject.Subject_Name end as 'Subject_Name', CASE when Attendance.Attendance_Status is null then 'No Attendance Taken Yet' else Attendance.Attendance_Status end as 'Attendance_Status' FROM Student LEFT JOIN Student_Has_Class ON(student_has_class.student_id = student.student_id) LEFT JOIN class ON class.class_id = student_has_class.class_id AND NOW() between class.class_start_timestamp AND class.class_end_timestamp LEFT JOIN Subject ON(class.subject_id = subject.subject_id) LEFT JOIN Attendance ON(Attendance.class_id = class.class_ID AND Attendance.student_id = student.student_id) LEFT JOIN Student_has_Parent ON (Student_has_Parent.Student_Student_ID = Student.Student_ID) LEFT JOIN Parent ON (Parent.Parent_ID = Student_has_Parent.Parent_Parent_ID) WHERE Parent.Parent_ID = '${parentID}' ORDER BY class.class_id DESC LIMIT 2;





SELECT Student_ID, Student_Title, Student_Fname, Student_Lname, Student_Email, Student_Year, Student_Username FROM Student INNER JOIN Student_has_Parent ON(Student_has_Parent.Student_Student_ID = student.student_id) INNER JOIN Parent ON(parent.parent_ID = Student_has_Parent.Parent_Parent_ID) WHERE Parent.Parent_ID = 1 AND Student.Active='true';
