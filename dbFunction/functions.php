<?php
    //include_once './connection.php';
    class dbfunctiones {
        protected $conn='';

        function __construct() {
            $host='50.62.209.51:3306';
            $username='excel';
            $password='3N*bd14s';
            $db_name='excelformat';
            $this->conn= new mysqli($host,$username,$password,$db_name);
        }
        function __destruct() {
            $this->conn->close();
        }
        
        function selectData($sql){
            $result=  $this->conn->query($sql) or die("Error in select Query");
            if($result->num_rows==0){
                echo 'Record Not Found';
            }else{
                while($row=$result->fetch_array(MYSQLI_ASSOC)){
                    $data[]=$row;
                }
                return $data;
                
            }
            
        }
        
        function exeQuery($sql){
            $result=  $this->conn->query($sql) or die($this->conn->error);
              return $result;  
        }
    }
?>




