$(document).ready(function()
{
    $("#convert").on('submit', function()
    {
        var from = $("#from").val();
	var to = $("#to").val();
	var amount = $("#amount").val();
	
	
        if(amount == '')
        { 
	    $('#result').html('<span class="red">Enter amount</span>');
	    $("#amount").focus();
	}
        else if(from == '')
        { 
	    $('#result').html('<span class="red">Select currency</span>');
	    $("#from").focus();
	}
        else if(to == '')
        { 
	    $('#result').html('<span class="red">Select currency</span>');
	    $("#to").focus();
	}
        if(amount != '' && from != '' && to != '')
        {
            $("#submit").attr('disabled', 'disabled');
            $('#result').html('<i>please wait..</i>');
            var url = 'http://rate-exchange.appspot.com/currency?from='+from+'&to='+to+'&q='+amount;
            $.ajax({
                dataType: "jsonp",
		url: url,
                crossDomain: true,
		data: '',
		success: function(response)
                {
		    var ramt = response.rate * amount;
		    ramt = Math.round(ramt * 100) / 100;
		    ramt = (ramt + "0").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
		    alert(ramt);
		    $("#result").html(ramt);
		    $("#submit").removeAttr('disabled');
		}
	    });
	}
	return false;
    });
});