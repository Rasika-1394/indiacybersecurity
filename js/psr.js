function mailsend(event){
			
			if(validate('enquire_now')){
			

				$.ajax({
					method: "POST",
					url: "psrsend.php",
					data: { name: $('#name').val(), email: $('#email').val() ,phone: $('#phone').val() ,designation: $('#designation').val(),company: $('#company').val(),message:$('#message').val()}
				})
				.done(function( msg ) {
					if(msg==1){
						$('#emessage_green').html("Your request has been sent successfully");
						setInterval(function(){ window.location="/brochure.html" }, 2000);
					}else{
						$('#emessage').html("Something went wrong please try again later");
					}
				}); 
			}else{
			event.preventDefault();			
				
			
			}
		
	}
