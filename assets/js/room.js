
$(document).bind('pageinit', function() {

    var url = "http://roomexpenditures-wpapp9.rhcloud.com/";


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
                    type: "POST",
                     dataType:'json',
                    url: url+"server/roomexp.php",
                    data: $(form).serialize(),
                    timeout: 3000,
                    success: function(data) {
                       
                        if(data.success == true)
                        {
                            
                           window.location = window.location + '#page_home';
                           window.location.reload();
                        }
                       
                    },
                    error: function() {
                        
                    }
                });
                return false;
          }
         });
});
 function load_expnd_list()
 {
    $.ajax({
                    type: "POST",
                    dataType:'json',
                    url: url+"server/roomexp.php",
                    data: {action:'load_expnd_list'},
                    timeout: 3000,
                    success: function(data) {
                       $('#myTable tbody').html('');
                       if(data.success == true)
                       {
                       for(i=0;i<= data.results.length;i++)
                       {
                            $('#myTable tbody').append('<tr><td>'+data.results[i]['desc']+'</td><td>'+data.results[i]['amount']+'</td><td>'+data.results[i]['pay_by']+'</td><td>'+data.results[i]['phani_amt']+'</td><td>'+data.results[i]['rk_amt']+'</td><td>'+data.results[i]['srinu_amt']+'</td><td>'+data.results[i]['created_on']+'</td></tr>');
                       }
                    }
                    else
                    {
                        
                        $('#myTable tbody').html('<tr><td colspan="7">No Expenditures Available<td></tr>');
                    }
                       
                    },
                    error: function() {
                        
                    }
                });
 }