//Weight Conversion Function

function WeightConvert()
{
    var xmlhttp = new XMLHttpRequest();
 
    var url = 'http://www.webservicex.net/ConvertWeight.asmx?op=ConvertWeight';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, true);
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState == 4)
        {
            alert($(xmlhttp.responseText).text());
  
            //var json = XMLObjectifier.xmlToJSON(xmlhttp.responseXML);
            //var result = json.Body[0].GetQuoteResponse[0].GetQuoteResult[0].Text;
            //
            //json = XMLObjectifier.xmlToJSON(XMLObjectifier.textToXML(result));
            //alert(symbol + ' Stock Quote: $' + json.Stock[0].Last[0].Text); 
        }
    }
    xmlhttp.setRequestHeader("SOAPAction", "http://www.webservicex.net/ConvertWeight.asmx/ConvertWeight");
    xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
    var xml = '<?xml version="1.0" encoding="utf-8"?>' +
                '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"' +
                'xmlns:xsd="http://www.w3.org/2001/XMLSchema"' +
                'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' + 
                '<soap:Body>' +
             '<ConvertWeight xmlns="http://www.webserviceX.NET/">' +
       '<Weight>1</Weight>' +
       '<FromUnit>Kilograms</FromUnit>' +
       '<ToUnit>Grams</ToUnit>' +
     '</ConvertWeight>' +
   '</soap:Body>' +
 '</soap:Envelope>';
    xmlhttp.send(xml);



    //var s = parseFloat(1);
    //var from = 'Kilograms';
    //var to = 'Grams';
    //
    //var xmlhttp = new XMLHttpRequest();
    //var wsUrl = 'http://www.webservicex.net/ConvertWeight.asmx/ConvertWeight?Weight=1&FromUnit=Kilograms&ToUnit=Grams';
    //
    //xmlhttp.open('POST',wsUrl,true);
    //xmlhttp.send(null);
    //xmlhttp.onreadystatechange = function()
    //{
    //    alert(xmlhttp.responseText);
    //};
}



function endSaveProduct(xmlHttpRequest, status)
{
    alert(status);
 //$(xmlHttpRequest.responseXML)
 //   .find('SaveProductResult')
 //   .each(function()
 //{
 //  var name = $(this).find('Name').text();
 //}
}

//Weight Conversion Function Ends

//Volume Conversion Function

function VolumeConvert()
{
    var data = document.getElementById("data").value;
    var from = $("#from").val();
    var to = $("#to").val();
    
    if(data == '' || from == 'Convert From' || to == 'Convert To')
    {
        alert("Please fill all the login fields");
    }
    else
    {
        $.ajax({
            type: "GET",
            url:"http://www.webservicex.net/convertVolume.asmx/ChangeVolumeUnit?VolumeValue=1&fromVolumeUnit=pony&toVolumeUnit=pony",
            dataType: "xml",
            //data:{myData: json_string},
            success: function(response)
            {
                alert(response);
            },
            failure: function (msg)
            {
                alert('failure');
            }
        });
    }
}

//Volume Conversion Function Ends

//$.ajax({
//    type: "GET",
//        url:wsUrl,
//        data:json_string,
//        success: processSuccess,
//        error: processError
//});
//
//function processSuccess(data, status, req)
//{
//    if (status == "success")
//    alert('something');
//}
//
//function processError(data, status, req)
//{
//    alert(JSON.stringify(data)+ " " + status);
//}  

                
    //var data = document.getElementById("data").value;
    //var from = $("#from").val();
    //var to = $("#to").val();
    
    //var soapMessage = '<?xml version="1.0" encoding="utf-8"?>\
    //                  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
    //                  <soap:Body>\
    //                  <ConvertWeight xmlns="http://www.webserviceX.NET/">\
    //                  <Weight>1</Weight>\
    //                  <FromUnit>Kilograms</FromUnit>\
    //                  <ToUnit>Grams</ToUnit>\
    //                  </ConvertWeight>\
    //                  </soap:Body>\
    //                  </soap:Envelope>';
    //
    //if(data == '' || from == '' || to == '')
    //{
    //    alert("Please fill all the login fields");
    //}
    //else
    //{
    //    
    //    $.ajax({
    //        type: "POST",
    //        url:"http://www.webservicex.net/ConvertWeight.asmx?op=ConvertWeight",
    //        contentType: "text/xml; charset=\"utf-8\"",
    //        dataType: "xml",
    //        data:soapMessage,
    //        complete: endSaveProduct
    //    });
    //}