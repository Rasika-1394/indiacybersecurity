function validateContact() {
    var valid = true;	
    $(".required form-control input-md").css('background-color','');
    $(".info").html('');
    if(!$("#name").val()) {
        $("#name").html("(required)");
       
        valid = false;
    }
    if(!$("#email").val()) {
        $("#email").html("(required)");
     
        valid = false;
    }
    
	
    if(!$("#designation").val()) {
        $("#designation").html("(required)");
      
        valid = false;
    }
    if(!$("#phone").val()) {
        $("#phone").html("(required)");
        
        valid = false;
    }
    return valid;
}