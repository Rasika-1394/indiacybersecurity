<?php
 include( './dbFunction/functions.php');
if($_REQUEST['name']=='' || $_REQUEST['phone']=='' || $_REQUEST['email']==''){
echo 3;

}else{

   
    $obj = new dbfunctiones();
        $sql="insert into cybersecurity_message (name,mobile,email,company,designation,interest,message,created_at) "
                . "values('{$_REQUEST['name']}','{$_REQUEST['phone']}',"
                . "'{$_REQUEST['email']}','{$_REQUEST['company']}','{$_REQUEST['designation']}','{$_REQUEST['radios']}','{$_REQUEST['message']}','".date('Y-m-d')."')";
              
 
               // Admin Email id 
             $admin_email="steffi.misquitta@ubm.com";

    $user_email=$_REQUEST['email'];
    
    $Email_from = $user_email;
    $Email_to = $admin_email;
    $Email_subject_user = "Thank you for Contacting Us!";
    $Email_subject_admin = " Details From India Cyber Security Dialogue 2019 Contact Form ";

    $Email_message_user= "Dear {$_REQUEST['name']},<br/><br/>
    Thank you for Contacting Us. We will get back to you shortly. <br/><br/>
    
    Thanks & Regards,<br/>
    Team India Cyber Security Dialogue";


    $Email_message_admin =  '<style>td,th{border-top:1px solid #CCC;border-right:1px solid #CCC;}th{background-color:#EEE;}</style>
            Dear Admin,
            <br/><br/>
            <table cellpadding="5" cellspacing="0" style="text-align:left;border-top:1px solid #CCC;border-left:1px solid #CCC;" border="0" width="700">
            <tr><th colspan="2">Details of Person </th></tr>
            <tr>
              <td>Name </td><td> '. $_REQUEST['name'] .'</td>
            </tr>
            
                        <tr>
                          <td>Mobile No </td><td>'.$_REQUEST['phone'].'</td>
                        </tr>
            <tr>  
              <td>Email </td><td> '. $_REQUEST['email'] .'</td> 
            </tr>
            <tr>  
              <td>Company Name </td><td> '. $_REQUEST['company'] .'</td> 
            </tr>
            <tr>  
                            <td>Designation </td><td> '. $_REQUEST['designation'] .'</td> 
                        </tr>
            <tr>  
              <td>Message </td><td> '. $_REQUEST['message'] .'</td> 
            </tr>
                                                
         </table> <br/><br/>';

         
         
    
$headers = array("From: $user_email",
    "Reply-To: $user_email",
    //"Cc: ",
  "Content-Type: text/html; charset=ISO-8859-1\r\n",
         
);
$headers = implode("\r\n", $headers);


           
$admin_mail=mail( $admin_email, $Email_subject_admin,$Email_message_admin, $headers );  
    
    //if($admin_mail)//echo "Admin Sent";
    //else //echo "Admin Fail";



   // $headers2 = 'MIME-Version: 1.0' . "\r\n";
    //$headers2 .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

    // Additional headers
   // $headers2 .= 'From:India Cyber Security' . "\r\n";


  $headers2 = "From: " . strip_tags($admin_email) . "\r\n";
$headers2 .= "Reply-To: ". strip_tags($admin_email) . "\r\n";

$headers2 .= "MIME-Version: 1.0\r\n";
$headers2 .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
  
           
            $user_mail=mail($user_email, $Email_subject_user,$Email_message_user,$headers2 );  
            $obj->exeQuery($sql);
    
    if($user_mail){
                                //echo "UserSent";
                        echo 1;

                  }else {    //echo "User Fail";
                        echo 2;

                }

}
?>      




       