$(document).ready(function()
{	
	hide		= function(id){ $("#"+id).hide(); return false; }			//Hide
	show		= function(id){ $("#"+id).show(); return false; }			//Show
	getVal		= function(id){ return $("#"+id).val(); }					//Get Value Of Tag
	redirectTo  = function(url){ return window.location.href=url;}
	/*Ajax function */
	callAjax = function(url,data){
		response = $.ajax({ url  : url,data : data,type : "POST",async:false}).responseText;
		return response;
	}

	
	
	/* From Validation :: Start ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
	$(".required").focus(function ()
	{
		$(this).next('span.error').remove();
		$(this).removeAttr('style');
		$(this).css({'border':'1px solid #4E78EA',"box-shadow":"0 0 5px #4E78EA"});
	});
	
	$(".required").blur(function ()
	{
		
		$(this).next('span.error').remove();
		$(this).removeAttr('style');
		var cur = $(this);
			cur.next('span').remove();
			if ($.trim(cur.val()) == '' ||	$.trim(cur.val()) == 0)					//Blank 
			{
				//cur.after('<span class="error">* This field is required</span>');
				$(this).css({'border':'1px solid #D45252',"box-shadow":"0 0 5px #D45252"});
				
				//$(this).focus();
				//$(this).select();				
				dataValid = false;
			}
				//Focus Event On Blur
			//elementFocus($(this).attr("id"));
			id = $(this).attr("id");
			if($.trim(cur.val())!="")
			{
				if($(this).hasClass('mobile')){	validateFormNumbers(id,10); }		//Mobile						
			    if($(this).hasClass('pincode')){	validateFormNumbers(id,6); }	//Pincode			
				if($(this).hasClass('email')){	validateEmail(id); }				//Email
				if($(this).hasClass('captcha')){	validatecaptcha(id); }			//Captcha
				if($(this).hasClass('pwd')){	validateCpassword(id,8); }			//Password Length	
				if($(this).hasClass('cpwd')){	validateCpassword(id,8); }			//Confirm Password Length	
				if($(this).hasClass('unique')){	checkUnique_Value(id); }			//Check Unique Value
				if($(this).hasClass('oldpwd')){	 check_oldpwd(id);}					//Old Pwd Match
			}	
	});
	validate = function(form_id)
	{
    		//alert("Herererere");
		dataValid = true;
		$('#'+form_id + ' .required').each(function()
		{
			var cur = $(this);
			cur.next('span').remove();
			id = $(this).attr("id");
						
			if (!isNaN($.trim(cur.val())) && ($.trim(cur.val()) != '' ||	$.trim(cur.val()) != 0) && id=="name")
			{
				//cur.after('<span class="error">* This field must be character</span>');
				$(this).css({'border':'1px solid #D45252',"box-shadow":"0 0 5px #D45252"});
				dataValid = false;

			}
			else if ($.trim(cur.val()) == '' ||	$.trim(cur.val()) == 0)					    //Blank 
			{
				//cur.after('<span class="error">* This field is required</span>');
				$(this).css({'border':'1px solid #D45252',"box-shadow":"0 0 5px #D45252"});
				dataValid = false;
			}
			if($(this).hasClass('terms'))
			{
				if(document.getElementById(id).checked==false)
				{
					//cur.after('<span class="error">* This field is required</span>');
					$(this).css({'border':'1px solid #D45252',"box-shadow":"0 0 5px #D45252"});
					dataValid = false;
				}
			}
			
	if($.trim(cur.val())!="")
	{
	if($(this).hasClass('mobile')){ dataValid  = validateFormNumbers(id,10,dataValid); } //Mobile				
	if($(this).hasClass('pincode')){dataValid = validateFormNumbers(id,6,dataValid); }	//Pincode
	if($(this).hasClass('email1')){	dataValid = validateEmail(id,dataValid); }			//Email
	if($(this).hasClass('captcha')){dataValid = validatecaptcha(id,dataValid); }		//Captcha
	if($(this).hasClass('pwd')){	dataValid  = validateCpassword(id,8,dataValid); }	//Password Length	
	if($(this).hasClass('cpwd')){dataValid  = validateCpassword(id,8,dataValid); }		//Confirm Password Length
	if($(this).hasClass('unique')){dataValid  = checkUnique_Value(id,dataValid); }		//Check Unique Value
	if($(this).hasClass('oldpwd')){dataValid = check_oldpwd(id,dataValid);}				//Old Pwd Match
	}	
	

		});
		return dataValid;
	}
	validateFormNumbers = function(id,maxlen,dValid)
	{
		if($("#"+id).val()!= "" && $("#"+id).val()!= 0 && $("#"+id).val().length < maxlen)
		{	
			//$("#"+id).after('<span class="error">This field must be atleast '+maxlen+' digits</span>');				
			$(this).css({'border':'1px solid #D45252',"box-shadow":"0 0 5px #D45252"});
			return false;
		}
		if($("#"+id).val()!= "" && $("#"+id).val()!= 0 && isNaN($("#"+id).val()))
		{	
			//$("#"+id).after('<span class="error">This field must be only in digits</span>');				
			$(this).css({'border':'1px solid #D45252',"box-shadow":"0 0 5px #D45252"});
			return false;
		}
		if(dValid==undefined){ return true;}else{return dValid;}
	}
	validateEmail	=function(id,dValid)
	{
		var filter 	= /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var v = getVal(id);
		if (!filter.test(v) && v!="") 
		{
			//$("#"+id).after("<span class='error'>Invalid email address</span>");	
			$("#"+id).css({'border':'1px solid #D45252',"box-shadow":"0 0 5px #D45252"});			
			return false;
		}
		if(dValid==undefined){ return true;}else{return dValid;}
	}
	validatecaptcha	=function(id,dValid)
	{
		var captcha = getVal(id);
		var captcha_value = getVal("captcha_value");
		if(captcha != captcha_value && captcha != '')
		{
			//$("#"+id).after("<span class='error'>Invalid verification code</span>");	
			ChangeCaptcha("pr_form");			
			return false;
		}
		if(dValid==undefined){ return true;}else{return dValid;}
	}	
	validateCpassword = function(id,maxlen,dValid)
	{	
		if($("#"+id).val()!= "" && $("#"+id).val()!= 0 && $("#"+id).val().length < maxlen)
		{	
			//$("#"+id).after('<span class="error">This field must be atleast '+maxlen+' digits</span>');				
			$(this).css({'border':'1px solid #D45252',"box-shadow":"0 0 5px #D45252"});
			return false;
		}
		else
		{
			var cpwd 	 = $(".cpwd").val();
			var password = $(".pwd").val();
			
			if(cpwd != password && cpwd != '' && password!="" && (id=="confirm_password" || id == "cpwd") ) 
			{
				//$("#"+id).after("<span class='error'>Confirm Password does not match with password!</span>");		
				return false;
			}
		}
		if(dValid==undefined){ return true;}else{return dValid;}
	}
	checkUnique_Value = function(id,dValid)
	{
		value = $("#"+id).val();if(value=="")return false;
		url    =  $("#"+id).attr("alt")+"&fieldval="+value;
		result = callAjax(url);			//Ajax Call
		if(result==0){
			//$("#"+id).after('<span class="error">Already exists.Please try another value</span>');
			$("#"+id).css({'border':'1px solid #D45252',"box-shadow":"0 0 5px #D45252"});	
			return false;
		}
		if(dValid==undefined){ return true;}else{return dValid;}
	}
	function check_oldpwd(id,dValid)
	{
		value 		= $("#"+id).val();if(value=="")return false;
		dbpassword	= $("#dbpassword").val();
		if(value!=dbpassword){
			//$("#"+id).after('<span class="error">Your Old Password Does Not Match</span>');
			$("#"+id).css({'border':'1px solid #D45252',"box-shadow":"0 0 5px #D45252"});	
			return false;
		}
		if(dValid==undefined){ return true;}else{return dValid;}
	}
	/* From Validation :: End ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
	
	/* Number Validation */
	numValidation = function(e)
	{
		
		var key = e.charCode? e.charCode : e.keyCode; 
		//alert(key);
		if(key == 8 || key == 9 || key == 0 || key == 32 || (key >= 48 && key <=57) || (key>=35 && key<=40))
			return true;
		else
			return false;
	}
	/* Char Validation */
	charValidation = function (e)
	{
		var key 	= e.charCode? e.charCode : e.keyCode; 
		if((key >= 65 && key <=90) || (key >= 97 && key <=122) || key == 39 || key == 32 || key == 9 || key == 46 || key == 8  || key == 37 || key == 38 ||  key == 40 || key == 35 || key == 36 || key == 13)
			return true;
		else        
			return false; 
	}
	/* SpecialChar Validation */
	specialcharValidation = function (e)
	{
		var key 	= e.charCode? e.charCode : e.keyCode; 

		if((key >= 65 && key <=90) || (key >= 97 && key <=122) || (key >= 48 && key <=57) || key == 39 || key == 32 || key == 9 || key == 46 || key == 8 || key == 37 || key == 38 || key == 40 || key == 35 || key == 36 || key == 13)
			return true;
		else        
			return false; 
	}
	//Capital first Word
	String.prototype.capitalize = function() 
	{
    	return this.charAt(0).toUpperCase() + this.slice(1);
	}		
});
	