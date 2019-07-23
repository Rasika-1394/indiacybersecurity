// custom js

$function(){
	$(window).scroll(function(){
		if($(this).scrollTop()>5){
			$(".headerlogo").attr("src","images/Final-Logo.jpg");
		}
		else{
			$(".headerlogo").attr("src","images/Final Logo-01.png");
		}
	})
}