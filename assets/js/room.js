
$(document).ready(function(){
	$('#add_expnd').on('click',function(){
	$('#add-expnd-div').toggle();
	});


	$('#ad-expnd-form').validate({
      
       rules:{
             desc:
             {
             	required: true,
                minlength: 15
             },
             amnt:"required",
             "mems[]":
             {
             	required: true,
                minlength: 2
             },
             "pay_by":"required"
             },
       messages:{
                desc:
             {
             	required: "Enter description minimum 15 characters",
                minlength: "Enter description minimum 15 characters"
             },
             amnt:"Enter Amount",
             "mems[]":
             {
             	required: "Check the members",
                minlength: "Check atleast two members"
             },
             "pay_by":"Select who pay the amount"
               
               },
    submitHandler: function(form) {
                $.ajax({
                    type: "GET",
                    url: "http://roomexpenditures-wpapp9.rhcloud.com/server/roomexp.php",
                    data: $(form).serialize(),
                    timeout: 3000,
                    success: function(data) {
                        //alert(data);
                        
                        if(data == 't') 
                        {
                           
                            $('.exists').html('');
                            $('.exists').append('<div class="alert alert-danger"><strong>Already </strong>exists. Try another name</div>');
                            scroll(0,0);
                        } 
                        else if(data == "IS") 
                        {
                            location.href = "q-and-a-management.php?msg=addtsuc";
                        }
                        else if(data == "f") 
                        {
                            location.href = "q-and-a-management.php?msg=addtfail";
                        }
                       
                    },
                    error: function() {
                        
                    }
                });
                return false;
          }
         });
});