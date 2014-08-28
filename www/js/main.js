// Complete Category Listing here

function Categories()
{
    var exporterid = localStorage.getItem("Nexpcdid");
    var isactive = '1';
    var xmlhttp = new XMLHttpRequest();
    
    var urlstr = 'http://192.168.1.25:89/ZenTradeService.svc/Category/List/'+exporterid+'/'+isactive+'';
    
    xmlhttp.open('GET',urlstr,true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(null);
    xmlhttp.onreadystatechange = function()
    {
        if(xmlhttp.readyState == 4)
        {
            var stringContent = $(xmlhttp.responseText).text();
            var category_id = [];
            var category_name = [];
            var category_desc = [];
            var jsonData = JSON.parse(stringContent);
            
            $.each( jsonData, function ( key, value )
            {
                category_id.push(value.categoryid);
                category_name.push(value.categoryname);
                category_desc.push(value.catdescription);
            });
            
            localStorage.setItem("catgid", category_id);
            localStorage.setItem("catgname", category_name);
            localStorage.setItem("catgdesc", category_desc);
            
            var $ul = $( '<ul id="list">' );
            $('#list').empty();
            for(i=0; i < category_id.length; i++)
            {
                $("#list").append('<li id="menuli" name="head"><a href="products.html" rel="external"><div style="float: left; width:20%;"></div><div style="float: left; width:60%;"><h1 id="menudt"> '+category_name[i]+' </h1></div><div style="float: right; width:20%;"><img src="images/arrow.png" align="middle" style="float: right; vertical-align: middle !important; margin-top: 30px;" alt=""/></div></li>' );
            }
            $('#list').listview('refresh');
        }
    };
    
    $('#list').delegate('li', 'tap', function ()
    {
        var index = $(this).index();
        localStorage.setItem("cindex", index);
       
    });
}

// Category Listing Ends



// Complete Products Listing
    
function Products()
{
    var cgindex;
    cgindex=localStorage.getItem("cindex");
    var catgname = localStorage.getItem("catgname");
    var namelist = new Array();
    namelist = catgname.split(",");
    var cgtry_id = localStorage.getItem("catgid");
    var idlist = new Array();
    idlist = cgtry_id.split(",");
    
    document.getElementById("menudt").innerHTML = namelist[cgindex];
    
    var exporterid = localStorage.getItem("Nexpcdid");
    var categoryid = idlist[cgindex];
    var xmlhttp = new XMLHttpRequest();
    
    var urlstr = 'http://192.168.1.25:89/ZenTradeService.svc/Products/LoadByCategory/'+exporterid+'/'+idlist[cgindex]+'';
    
    xmlhttp.open('GET',urlstr,true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(null);
    xmlhttp.onreadystatechange = function()
    {
        if(xmlhttp.readyState == 4)
        {
            var stringContent = $(xmlhttp.responseText).text(); 
            var Product_id = [];
            var Product_name = [];
            var Product_desc = [];
            var Product_img = [];
            var jsonData = JSON.parse(stringContent);
            
            $.each( jsonData, function ( key, value )
            {
                Product_id.push(value.productid);
                Product_name.push(value.productname);
                Product_desc.push(value.description);
                Product_img.push(value.productlogo);
            });
            
            localStorage.setItem("prid", Product_id);
            localStorage.setItem("prname", Product_name);
            localStorage.setItem("prdesc", Product_desc);
            localStorage.setItem("primg", Product_img);
            
            var $ul = $( '<ul id="sublist">' );
            $('#sublist').empty();
            for(i=0; i < Product_id.length; i++)
            {
                $("#sublist").append('<li id="menuli" name="head" ><a href="#" rel="external"><div style="float: left; width:20%;"><img src="'+"http://192.168.1.25:90/ZenTrade/ProductLogo/"+ Product_img[i] + '" height="100%" width="100%"/></div><div style="float: left; width:60%;"><h2>'+Product_name[i]+'</h2><p id="menudt"> '+Product_desc[i]+' </p></div></li>' );
            }
            $('#sublist').listview('refresh');
        }
    };
    
    $('#sublist').delegate('li', 'tap', function ()
    {
        var index = $(this).index();
        localStorage.setItem("pdindex", index);
    });
}

// Products Listing Ends





// Complete Price Listing here

function PriceList()
{
    var Product_id = [];
    var Product_name = [];
    var pricelistid = [];
    var categoryid = [];
    var currency = [];
    var amount = [];
    var cursymbol = [];
    var logos = [];
    var avqts =[];
    var sldqts = [];
    var ordqts = [];     
    var exporterid = localStorage.getItem("Nexpcdid");
    var importerid = localStorage.getItem("Nimptrid");
    var isactive = '1';
    var xmlhttp = new XMLHttpRequest();
    
    var urlstr = 'http://192.168.1.25:89/ZenTradeService.svc/ImporterPriceList/ListAll/'+exporterid+'/'+importerid+'/'+isactive+'';
    
    xmlhttp.open('GET',urlstr,true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(null);
    xmlhttp.onreadystatechange = function()
    {
        if(xmlhttp.readyState == 4)
        {
            var stringContent = $(xmlhttp.responseText).text();
            var jsonData = JSON.parse(stringContent);
            
            $.each( jsonData, function ( key, value )
            {
                Product_id.push(value.prod_productid);
                Product_name.push(value.productname);
                pricelistid.push(value.pricelistid);
                categoryid.push(value.cat_categoryid);
                currency.push(value.currency);
                amount.push(value.amount);
                cursymbol.push(value.symbol);
                logos.push(value.productlogo);
                avqts.push(value.availablequantity)
                sldqts.push(value.soldquantity)
                ordqts.push(value.orderedquantity)
            });
            
            localStorage.setItem("Product_id", Product_id);
            localStorage.setItem("Product_name", Product_name);
            localStorage.setItem("pricelistid", pricelistid);
            localStorage.setItem("categoryid", categoryid);
            localStorage.setItem("currency", currency);
            localStorage.setItem("amount", amount);
            localStorage.setItem("cursymbol", cursymbol);
            localStorage.setItem("prclogos", logos);
            localStorage.setItem("avqt", avqts);
            localStorage.setItem("sldqt", sldqts);
            localStorage.setItem("ordqt", ordqts);
            
            var $ul = $( '<ul id="prclist">' );
            $('#prclist').empty();
            for(i=0; i < Product_id.length; i++)
            {
                $("#prclist").append('<li id="menuli" name="head" ><a href="#" rel="external"><div style="float: left; width:60%;"><h2>'+Product_name[i]+'</h2><p id="menudt"> '+cursymbol[i]+amount[i]+' '+currency[i]+' </p></div><div style="float: right; width:20%;"><button type="button" style = "color: #fff !important;" class="btn-archive btn-black" onclick="ordermove()">Order Now</button></div></li>' );
            }
            $('#prclist').listview('refresh');
        }
    };
    
    $('#prclist').delegate('li', 'tap', function ()
    {
        var index = $(this).index();
        localStorage.setItem("prindex", index);
    });
}

// Price Listing Ends





function Orderpge()
{
    document.location.href = "orderitem.html";
}




// PriceList Details here
    
function PriceDetails()
{
    var str;
    str=localStorage.getItem("Product_name");
    var i=localStorage.getItem("prindex");
    var temp = new Array();
    temp = str.split(",");
    document.getElementById("pricedet").innerHTML = temp[i];
    
    var strlg;
    strlg=localStorage.getItem("prclogos");
    var templg = new Array();
    templg = strlg.split(",");
    document.getElementById("logos").src="http://192.168.1.25:90/ZenTrade/ProductLogo/" + templg[i];
    
    var strav;
    strav=localStorage.getItem("avqt");
    var tempav = new Array();
    tempav = strav.split(",");
    document.getElementById("avqts").innerHTML = "Available Quantity is:" + tempav[i];
    
    var strsld;
    strsld=localStorage.getItem("sldqt");
    var tempsld = new Array();
    tempsld = strsld.split(",");
    document.getElementById("sldqts").innerHTML = "Sold Quantity is:" + tempsld[i];
    
    var strord;
    strord=localStorage.getItem("ordqt");
    var tempord = new Array();
    strord = strord.split(",");
    document.getElementById("ordqts").innerHTML = "Ordered Quantity is:" + strord[i];
    
    var stramt;
    stramt=localStorage.getItem("amount");
    var tempamt = new Array();
    tempamt = stramt.split(",");
    document.getElementById("prcs").innerHTML = "Price is:" + tempamt[i];
}

// PriceList Details Ends





function uploadfile()
{
    var fileSelect = document.getElementById('BankDet').value;
    var xhr = new XMLHttpRequest();
    
    xhr.open('POST', 'http://192.168.1.25:91/Fileupload.aspx?type=8', true);
    
    xhr.onload = function ()
    {
        if (xhr.status == 200 || xhr.status == 4)
        {
            alert('Uploaded');
        }
        else
        {
            alert('An error occurred!');
        }
    };
    
    xhr.send(fileSelect);
}





function PaySave()
{
    uploadfile();
    Docexistcheck();
    
    var i=localStorage.getItem("invindex");
    var paydocid = 0;
    var paymentid = localStorage.getItem("payid");
    var str;
    str=localStorage.getItem("invord_nos");
    var temp = new Array();
    temp = str.split(",");
    var ExporterCDId = localStorage.getItem("Nexpcdid");
    var importerid = localStorage.getItem("Nimptrid");
    var OrderNo = temp[i];
    var modesave = localStorage.getItem("Modeupload");
    var descr = document.getElementById("Descr").value;
    var payimage = document.getElementById("BankDet").value;
    var filename = payimage.replace(/^.*[\\\/]/, '')
    var paymstatus = 'On Process';
    
    var strurl = 'http://192.168.1.25:89/ZenTradeService.svc/PaymentDetails/Create/'+paydocid+'/'+paymentid+'/'+ExporterCDId+'/'+importerid+'/'+OrderNo+'/'+descr+'/'+filename+'/'+paymstatus+'/'+modesave;
    
    $.ajax({
        url: strurl,   
        success: function(msg)
        {  
            var result = $(msg).text();
         
            if (result == -2)
            {
                alert("Error occured");
            }
            else if(result > 0)
            {
                alert("Payment details Successfully uploaded");
            }
        },
        dataType: "text"
    });  
}

// Complete Invoice Listing here
    
    
    
    
   
function Invoice()
{
    var ord_num = [];
    var sts = [];
    var str1 = "Order no  :";
    var str2 = "Status    :";
    var exportercdid = localStorage.getItem("Nexpcdid");
    var impid = localStorage.getItem("Nimptrid");
    var xmlhttp = new XMLHttpRequest();
    
    var urlstr = 'http://192.168.1.25:89/ZenTradeService.svc/Orders/Load/'+exportercdid+'/'+impid;
    
    xmlhttp.open('GET',urlstr,true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(null);
    xmlhttp.onreadystatechange = function()
    {
        if(xmlhttp.readyState == 4)
        {
            var stringContent = $(xmlhttp.responseText).text();
            var jsonData = JSON.parse(stringContent);
            
            $.each( jsonData, function ( key, value )
            {
                ord_num.push(value.orderno);
                sts.push(value.status);
            });
            
            localStorage.setItem("invord_nos", ord_num);
            localStorage.setItem("inv_sts", sts);
        
            var $ul = $( '<ul id="invlist">' );
            $('#invlist').empty();
            for(i=0; i < ord_num.length; i++)
            {
                $("#invlist").append('<li id="menuli" name="head" ><a href="#" rel="external"><div style="float: left; width:40%;"><h2>'+str1+ord_num[i]+'</h2><p id="menudt"> '+str2+sts[i]+' </p></div><div style="float: right; width:20%; height: 200px;"><button type="button" style = "color: #fff !important;" class="btn-archive btn-black" onclick="Paynowclick()">Pay Now</button></div><div style="float: right; width:20%; height: 200px;"><button type="button" style = "color: #fff !important;" class="btn-archive btn-black" onclick="Viewclick()">View</button></div><div style="float: right; width:20%; height: 200px;"><button type="button" style = "color: #fff !important;" class="btn-archive btn-black" onclick="Paysaveclick()">Upload</button></div></li>' );
            }
            $('#invlist').listview('refresh');
        }
    };

    $('#invlist').delegate('li', 'tap', function ()
    {
        var index = $(this).index();
        localStorage.setItem("invindex", index);
        //   $.mobile.changePage( "menusub.html");
    });
}

// Invoice Listing Ends





function Viewclick()
{
    var i=localStorage.getItem("invindex");
    var str;
    str=localStorage.getItem("invord_nos");
    var temp = new Array();
    temp = str.split(",");
    var ExporterCDId = localStorage.getItem("Nexpcdid");
    var importerid = localStorage.getItem("Nimptrid");
    var OrderNo = temp[i];
    var imgcnt = [];
    var doctype = [];
    
    var strurl = 'http://192.168.1.25:89/ZenTradeService.svc/DocumentImages/GetImages/'+ExporterCDId+'/'+importerid+'/'+OrderNo;
    
    $.ajax({
        url: strurl,   
        success: function(msg)
        {
            var result = $(msg).text();
            var jsonData = JSON.parse(result);
            
            $.each( jsonData, function ( key, value )
            {
                imgcnt.push(value.imagecount);
                doctype.push(value.dt_documenttypeid);
            });

            localStorage.setItem("imgcnt", imgcnt);
            localStorage.setItem("doctype", doctype);
            
            if (imgcnt.length == 0)
            {
                alert("No Invoice to show");
            }
            else
            {
                document.location.href = "invoice.html";
            }
        },
        dataType: "text"
    });
}





// Paynowclick starts

function Paynowclick()
{
    var i=localStorage.getItem("invindex");
    var str;
    str=localStorage.getItem("invord_nos");
    var temp = new Array();
    temp = str.split(",");
    var ExporterCDId = localStorage.getItem("Nexpcdid");
    var importerid = localStorage.getItem("Nimptrid");
    var OrderNo = temp[i];
    
    var strurl = 'http://192.168.1.25:89/ZenTradeService.svc/Payments/CheckPayment/'+ExporterCDId+'/'+importerid+'/'+OrderNo;
    
    $.ajax({
        url: strurl,   
        success: function(msg)
        {  
            var result = $(msg).text();
            
            if (result == -2)
            {
                alert("Error Occured");
            }
            else if(result == 0)
            {
                document.location.href = "bankpay.html";
            }
            else if(result > 0)
            {
                alert("You Already Paid");
            }
        },
        dataType: "text"
    });  
}

// Paynowclick ends




var checks = '';


function validate()
{
    if (document.getElementById('IsLC').checked)
    {
        checks = 1;
    }
    else
    {
        checks = 0;    
    }
}





function Loadinvotype()
{
    var typearray = [];
    var typeid = [];
    var str;
    str=localStorage.getItem("doctype");
    var temp = new Array();
    temp = str.split(",");
    
    for(i = 0; i < temp.length; i++)
    {
        if (temp[i] == 1)
        {
            typearray.push('Perfoma Invoice');
            typeid.push(1);
        }
        else if (temp[i] == 2)
        {
            typearray.push('Invoice');
            typeid.push(2);
        }
        else if (temp[i] == 3)
        {
            typearray.push('Package List');
            typeid.push(3);
        }
        else if (temp[i] == 4)
        {
            typearray.push('Bill of Ladding');
            typeid.push(4);
        }
        else if (temp[i] == 5)
        {
            typearray.push('Country of Origin');
            typeid.push(5);
        }
        else if (temp[i] == 6)
        {
            typearray.push('Inspection');
            typeid.push(6);
        }
        else if (temp[i] == 7)
        {
            typearray.push('Certificate');
            typeid.push(7);
        }
        else if (temp[i] == 8)
        {
            typearray.push('Others');
            typeid.push(8);
        }
        else
        {  
        }
    }
    
    localStorage.setItem("typearray", typearray);
    localStorage.setItem("typeid", typeid);
    
    var $ul = $( '<ul id="invctypelist">' );
    $('#invctypelist').empty();
    for(i=0; i < typearray.length; i++)
    {
        $("#invctypelist").append('<li id="menuli" name="head" ><a href="invoicelist.html" rel="external"><div style="float: left; width:20%;"><img src="images/invoics.jpeg" align="middle" width="100%" style="float: left;" alt=""/></div><div style="float: left; width:40%;"><h2>'+typearray[i]+'</h2></div></li>' );
    }
    $('#invctypelist').listview('refresh');
    
    $('#invctypelist').delegate('li', 'tap', function ()
    {
        var index = $(this).index();
        localStorage.setItem("typeindex", index);
    });
}





function Loadinvolist()
{
    var i=localStorage.getItem("invindex");
    var str;
    str=localStorage.getItem("invord_nos");
    var temp = new Array();
    temp = str.split(",");
    var j=localStorage.getItem("typeindex");
    var strtype;
    strtype=localStorage.getItem("typeid");
    var temps = new Array();
    temps = strtype.split(",");
    var imgs = [];
    var ExporterCDId = localStorage.getItem("Nexpcdid");
    var importerid =  localStorage.getItem("Nimptrid");
    var OrderNo = temp[i];
    var doctype = temps[j];
    
    var strurl = 'http://192.168.1.25:89/ZenTradeService.svc/DocumentImages/GetAllImages/'+ExporterCDId+'/'+importerid+'/'+OrderNo+'/'+doctype;
    
    $.ajax({
        url: strurl,   
        success: function(msg)
        {  
            var result = $(msg).text();
            var jsonData = JSON.parse(result);
            
            $.each( jsonData, function ( key, value )
            {
                imgs.push(value.imagename);
            });

            localStorage.setItem("imgslist", imgs);
            
            var $ul = $( '<ul id="involist">' );
            
            $('#involist').empty();
            
            for(i=0; i < imgs.length; i++)
            {
                $("#involist").append('<li id="menuli" name="head" ><a href="#" rel="external"><div style="float: left; width:50%;"><img src='+"http://192.168.1.25:90/ZenTrade/ProductLogo/"+ imgs[i] + ' align="middle" width="100%" style="float: left;" alt=""/></div><div style="float: left; width:50%;"><button type="button" style = "color: #fff !important;" class="btn-archive btn-black" onclick="Viewimgs()">View</button></div></li>' );
            }
            $('#involist').listview('refresh');
        },
        dataType: "text"
    });
    
    $('#involist').delegate('li', 'tap', function ()
    {
        var index = $(this).index();
        localStorage.setItem("invoindex", index);
    });
}





function Viewimgs()
{
    document.location.href = "invoicedetails.html";
}





function Viewimg()
{
    var j=localStorage.getItem("typeindex");
    var strtype;
    strtype=localStorage.getItem("typearray");
    var temps = new Array();
    temps = strtype.split(",");
    
    document.getElementById("invtype").innerHTML = temps[j];
    
    var i=localStorage.getItem("invoindex");
    var str;
    str=localStorage.getItem("imgslist");
    var temp = new Array();
    temp = str.split(",");
    
    document.Mainpic.src = "http://192.168.1.25:90/ZenTrade/ProductLogo/"+temp[i];
}





function Lbankdet()
{
    var i=localStorage.getItem("invindex");
    var str;
    str=localStorage.getItem("invord_nos");
    var temp = new Array();
    temp = str.split(",");
    var ordnos = document.getElementById("OrderNo")
    ordnos.value = temp[i];
    var ExporterCDId = localStorage.getItem("Nexpcdid");
    var importerid = localStorage.getItem("Nimptrid");
    
    var strurl = 'http://192.168.1.25:89/ZenTradeService.svc/Payments/GetPayment/'+ExporterCDId+'/'+importerid+'/'+temp[i];
    
    $.ajax({
        url: strurl,   
        success: function(msg)
        {
            var result = $(msg).text();
            
            if (result > 0)
            {
                localStorage.setItem("payid", result);
            }
            else
            {
                alert("Error occured");
            }
        },
        dataType: "text"
    });  
}






function Docexistcheck()
{
    var i=localStorage.getItem("invindex");
    var str;
    str=localStorage.getItem("invord_nos");
    var temp = new Array();
    temp = str.split(",");
    var ExporterCDId = localStorage.getItem("Nexpcdid");
    var importerid = localStorage.getItem("Nimptrid");
    
    var strurl = 'http://192.168.1.25:89/ZenTradeService.svc/PaymentDetails/CheckPaymentDetails/'+ExporterCDId+'/'+importerid+'/'+temp[i];
    
    $.ajax({
        url: strurl,   
        success: function(msg)
        {
            var result = $(msg).text();
            
            if (result == 0)
            {
                localStorage.setItem("Modeupload", 1);
              
            }
            else if (result > 0) 
            {
                localStorage.setItem("Modeupload", 2);
               
            }
        },
        dataType: "text"
    });
}




function Loadbankdet()
{
    var i=localStorage.getItem("invindex");
    var str;
    str=localStorage.getItem("invord_nos");
    var temp = new Array();
    temp = str.split(",");
    var ordnos = document.getElementById("OrderNo")
    ordnos.value = temp[i];
}




// Image loading

function Getimgcount()
{
    var i=localStorage.getItem("invindex");
    var str;
    str=localStorage.getItem("invord_nos");
    var temp = new Array();
    temp = str.split(",");
    var ExporterCDId = localStorage.getItem("Nexpcdid");
    var importerid = localStorage.getItem("Nimptrid");
    var OrderNo = temp[i];
    
    var strurl = 'http://192.168.1.25:89/ZenTradeService.svc/DocumentImages/GetImages/'+ExporterCDId+'/'+importerid+'/'+OrderNo;
    
    $.ajax({
        url: strurl,   
        success: function(msg)
        {  
      
        },
        dataType: "text"
    });
}






function LoadImages()
{
    var i=localStorage.getItem("invindex");
    var str;
    str=localStorage.getItem("invord_nos");
    var temp = new Array();
    temp = str.split(",");
    var ExporterCDId = localStorage.getItem("Nexpcdid");
    var importerid = localStorage.getItem("Nimptrid");
    var OrderNo = temp[i];
    var doctype = '';
    
    var strurl = 'http://192.168.1.25:89/ZenTradeService.svc/DocumentImages/GetAllImages/'+ExporterCDId+'/'+importerid+'/'+OrderNo+'/'+doctype;
    
    $.ajax({
        url: strurl,   
        success: function(msg)
        {  
            
        },
        dataType: "text"
    });
}

// Image loading ends





function Paysaveclick()
{
    var i=localStorage.getItem("invindex");
    var str;
    str=localStorage.getItem("invord_nos");
    var temp = new Array();
    temp = str.split(",");
    var ExporterCDId = localStorage.getItem("Nexpcdid");
    var importerid = localStorage.getItem("Nimptrid");
    var OrderNo = temp[i];
    
    var strurl = 'http://192.168.1.25:89/ZenTradeService.svc/Payments/CheckPayment/'+ExporterCDId+'/'+importerid+'/'+OrderNo;
    
    $.ajax({
        url: strurl,   
        success: function(msg)
        {  
            var result = $(msg).text();
            
            if (result == -2)
            {
                alert("Error Occured");
            }
            else if(result == 0)
            {
                alert("You need to pay first to upload the bank invoice");
            }
            else if(result > 0)
            {
                document.location.href = "paysave.html";
            }
        },
        dataType: "text"
    });  
    
}






function Payclick()
{
    var OrderNo = document.getElementById("OrderNo").value;
    var BankDet=document.getElementById("BankDet").value;
    var Branch=document.getElementById("Branch").value;
    var Refer = document.getElementById("Refer").value;
    var LCTT=document.getElementById("LCTT").value;
    var Date=document.getElementById("Date").value;
    var Amount = document.getElementById("Amount").value;
    var ExporterCDId = localStorage.getItem("Nexpcdid");
    var importerid = localStorage.getItem("Nimptrid");
    var payid = 0;
    var sts = 'On Process';
    var modes = 1;

    var strurl = 'http://192.168.1.25:89/ZenTradeService.svc/Payments/Create/'+payid+'/'+ExporterCDId+'/'+importerid+'/'+payid+'/'+OrderNo+'/'+BankDet+'/'+Branch+'/'+Refer+'/'+checks+'/'+LCTT+'/'+Date+'/'+Amount+'/'+sts+'/'+modes;
    
    $.ajax({
        url: strurl,   
        success: function(msg)
        {  
            var result = $(msg).text();
           
            if (result > 0)
            {
                alert("Successfully added the payment details");
            }
            else
            {
                alert("failed adding payment details");
            }
        },
        dataType: "text"
    });  
}







// Invoice Details here
    
function InvoiceDetails()
{
    var str;
    str=localStorage.getItem("item");
    var i=localStorage.getItem("invindex");
    var temp = new Array();
    temp = str.split(",");
    
    document.getElementById("invheading").innerHTML = temp[i];
}

// Invoice Details Ends






// CompanyInfo here

function CompanyInfo()
{
    var exporterid = localStorage.getItem("Ncomcode");
    
    var urlstr = 'http://192.168.1.200/zentrade/service/exporter_data.php?code='+exporterid+'';
    
    var json_string =''+exporterid+'';
        
    $.ajax({
        type: "GET",
        url:urlstr,
        data:{},
        success: function(response,status)
        {
            var data=JSON.stringify(response);
            
            if (jQuery.parseJSON(data).status == 1)
            {
                $.each( jQuery.parseJSON(data).message, function ( key, value )
                {
                    document.getElementById("headname").innerHTML = value.name;
                    document.getElementById("names").innerHTML = value.name;
                    document.getElementById("adres").innerHTML = value.address;
                    document.getElementById("adres1").innerHTML = value.postcode;
                    document.getElementById("adres2").innerHTML = value.phone;
                    document.getElementById("adres3").innerHTML = value.email;
                    document.getElementById("adres4").innerHTML = value.website;
                    document.getElementById("adres5").innerHTML = value.blog;
                });
            }
            else
            {
                alert("Your Exporter Not Existing");
            }
        },
        error: function(request, status, error)
        {
            alert("error occured..plz check");
        }
    });
}

// CompanyInfo Ends







// Complete Order Listing here

function Orders()
{
    var order_id = [];
    var ord_num = [];
    var prod_name = [];
    var prod_logo = [];
    var type_name = [];
    var qty = [];
    var price = [];
    var sts = []; 
    var str1 = "Order no  :";
    var str2 = "Product   :";
    var str3 = "Quntity   :";
    var str4 = "Price     :";
    var str5 = "Status    :";
    var exportercdid = localStorage.getItem("Nexpcdid");
    var impid = localStorage.getItem("Nimptrid");
    var isactive = '2';
    var xmlhttp = new XMLHttpRequest();
    
    var urlstr = 'http://192.168.1.25:89/ZenTradeService.svc/Orders/ListAllByImporterId/'+exportercdid+'/'+impid+'/'+isactive;
    
    xmlhttp.open('GET',urlstr,true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(null);
    
    xmlhttp.onreadystatechange = function()
    {
        if(xmlhttp.readyState == 4)
        {
            var stringContent = $(xmlhttp.responseText).text();
            var jsonData = JSON.parse(stringContent);
            
            $.each( jsonData, function ( key, value )
            {
                order_id.push(value.orderid);
                ord_num.push(value.orderno);
                prod_name.push(value.productname);
                prod_logo.push(value.productlogo);
                type_name.push(value.typename);
                qty.push(value.quantity);
                price.push(value.price);
                sts.push(value.status);
            });
            
            localStorage.setItem("order_ids", order_id);
            localStorage.setItem("ordprod", prod_name);
            localStorage.setItem("ordlogos", prod_logo);
            localStorage.setItem("ordtypes", type_name);
            localStorage.setItem("ordqtys", qty);
            localStorage.setItem("ordprices", price);
            localStorage.setItem("ordnums", ord_num);
            
            var $ul = $( '<ul id="ordlist">' );
            $('#ordlist').empty();
            for(i=0; i < order_id.length; i++)
            {
                if (sts[i] == 'Cancelled' || sts[i] == 'Completed')
                {
                    $("#ordlist").append('<li id="menuli" name="head"><a href="#" rel="external"><div style="float: left; width:20%;"><img src="'+"http://192.168.1.25:90/ZenTrade/ProductLogo/"+ prod_logo[i] + '" height="100%" width="100%"/></div><div style="float: left; width:60%;"><h1 id="menudt"> '+str1+ord_num[i] +' </h1><p>'+str2+prod_name[i]+'</p><p>'+str3+qty[i]+'</p><p>'+str4+price[i]+'</p><p>'+str5+sts[i]+'</p></div></li>' );
                }
                else
                {
                    $("#ordlist").append('<li id="menuli" name="head"><a href="#" rel="external"><div style="float: left; width:20%;"><img src="'+"http://192.168.1.25:90/ZenTrade/ProductLogo/"+ prod_logo[i] + '" height="100%" width="100%"/></div><div style="float: left; width:60%;"><h1 id="menudt"> '+str1+ord_num[i] +' </h1><p>'+str2+prod_name[i]+'</p><p>'+str3+qty[i]+'</p><p>'+str4+price[i]+'</p><p>'+str5+sts[i]+'</p></div><div style="float: right; width:20%;"><button type="button" style = "color: #ffffff !important;" class="btn-archive btn-black" onclick="Ordercancel()">Cancel</button></div></li>' );
                }
            }
            $('#ordlist').listview('refresh');
        }
    };
    
    $('#ordlist').delegate('li', 'tap', function ()
    {
        var index = $(this).index();
        localStorage.setItem("ordindex", index);
    });
}

// Order Listing Ends










// Shipping Details here
    
function Trackingorder()
{
    var trackid = [];
    var shipdet = [];
    var berths = [];
    var vessal = [];
    var isdispatch = [];
    var dodispath = [];
    var carier = [];
    var doship = [];
    var sailtime = [];
    var isdelverd = [];
    var dodel = [];
    var sts = [];
    var expcdid = localStorage.getItem("Nexpcdid");
    var impid = localStorage.getItem("Nimptrid");
    var ordno = document.getElementById("ordno").value;
    var xmlhttp = new XMLHttpRequest();
    
    var urlstr = 'http://192.168.1.25:89/ZenTradeService.svc/TrackingDetails/GeDetails/'+expcdid+'/'+impid+'/'+ordno+'';
    
    xmlhttp.open('GET',urlstr,true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(null);
    
    xmlhttp.onreadystatechange = function()
    {
        if(xmlhttp.readyState == 4)
        {
            var stringContent = $(xmlhttp.responseText).text();
            var jsonData = JSON.parse(stringContent);
            
            $.each( jsonData, function ( key, value )
            {
                trackid.push(value.trackingid);
                shipdet.push(value.shipdetails);
                berths.push(value.berth);
                vessal.push(value.vessals);
                isdispatch.push(value.isdispached);
                dodispath.push(value.dateofdispath);
                carier.push(value.carrier);
                doship.push(value.dateofshipping);
                sailtime.push(value.sailingtime);
                isdelverd.push(value.isdelivered);
                dodel.push(value.dateofdelevery);
                sts.push(value.status);
                
            });
            
            localStorage.setItem("trackid", trackid);
            localStorage.setItem("shipdet", shipdet);
            localStorage.setItem("berth", berths);
            localStorage.setItem("vessals", vessal);
            localStorage.setItem("isdispached", isdispatch);
            localStorage.setItem("dodispath", dodispath);
            localStorage.setItem("carrier", carier);
            localStorage.setItem("doship", doship);
            localStorage.setItem("sailtime", sailtime);
            localStorage.setItem("isdelverd", isdelverd);
            localStorage.setItem("dodel", dodel);
            localStorage.setItem("trksts", sts);
            
            if (trackid.length > 0)
            {
                document.getElementById("shpdid").innerHTML = 'ShipDetails : ' +shipdet;
                document.getElementById("vesl").innerHTML = 'Vessel : ' +vessal;
                document.getElementById("berth").innerHTML = 'Berth : ' +berths;
                document.getElementById("carier").innerHTML = 'Loading : ' +carier;
                document.getElementById("sail").innerHTML = 'Sailing Time : ' +sailtime;
                document.getElementById("dodel").innerHTML = 'Estimated Time Of Arriaval: ' +dodel;
                
                $("#mydiv").show();
            }
        }
    };
}

// Shipping Details Ends







// All offers listing

function AllOffers()
{
    var ImportersOfferId = [];
    var OfferId = [];
    var OfferTitle = [];
    var Description = [];
    var ValidFrom = [];
    var ValidUpto = [];
    var IsRead = [];
    var exporterid = localStorage.getItem("Nexpcdid");
    var importerid = localStorage.getItem("Nimptrid");
    var isactive = '2';
    var xmlhttp = new XMLHttpRequest();
    
    var urlstr = 'http://192.168.1.25:89/ZenTradeService.svc/ImportersOffers/ListAllByImporterId/'+exporterid+'/'+importerid+'/'+isactive+'';
    
    xmlhttp.open('GET',urlstr,true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(null);
    
    xmlhttp.onreadystatechange = function()
    {
        if(xmlhttp.readyState == 4)
        {
            var stringContent = $(xmlhttp.responseText).text(); 
            var jsonData = JSON.parse(stringContent);
            
            $.each( jsonData, function ( key, value )
            {
                ImportersOfferId.push(value.ImportersOfferId);
                OfferId.push(value.OfferId);
                OfferTitle.push(value.OfferTitle);
                Description.push(value.Description);
                ValidFrom.push(value.ValidFrom);
                ValidUpto.push(value.ValidUpto);
                IsRead.push(value.IsRead);
            });
            
            localStorage.setItem("impofrid", ImportersOfferId);
            localStorage.setItem("ofrid", OfferId);
            localStorage.setItem("ofrtitle", OfferTitle);
            localStorage.setItem("ofrdesc", Description);
            localStorage.setItem("ofrfrom", ValidFrom);
            localStorage.setItem("ofrupto", ValidUpto);
            localStorage.setItem("ofrread", IsRead);
            
            var $ul = $( '<ul id="alllist">' );
            $('#alllist').empty();
            for(i=0; i < ImportersOfferId.length; i++)
            {
                $("#alllist").append('<li id="menuli" name="head" ><a href="allofferdetails.html?'+ImportersOfferId[i]+'" rel="external"><h2>'+OfferTitle[i]+'</h2><p id="menudt"> '+Description[i]+' </p></li>' );
            }
            $('#alllist').listview('refresh');
        }
    };
    
    $('#alllist').delegate('li', 'tap', function ()
    {
        var index = $(this).index();
        localStorage.setItem("alofrindex", index);
    });
}

// All offers list ends






// Complete Current Offers here
    
function CurrentOffers()
{
    var ImportersOfferId = [];
    var OfferId = [];
    var OfferTitle = [];
    var Description = [];
    var ValidFrom = [];
    var ValidUpto = [];
    var IsRead = [];
    var str1 = "Valid From:";
    var str2 = "Valid UpTo  :"; 
    var exporterid = localStorage.getItem("Nexpcdid");
    var importerid = localStorage.getItem("Nimptrid");
    var isactive = '1';
    var xmlhttp = new XMLHttpRequest();
    
    var urlstr = 'http://192.168.1.25:89/ZenTradeService.svc/ImportersOffers/ListAllByImporterId/'+exporterid+'/'+importerid+'/'+isactive+'';
    
    xmlhttp.open('GET',urlstr,true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(null);
    
    xmlhttp.onreadystatechange = function()
    {
        if(xmlhttp.readyState == 4)
        {
            var stringContent = $(xmlhttp.responseText).text(); 
            var jsonData = JSON.parse(stringContent);
            
            $.each( jsonData, function ( key, value )
            {
                ImportersOfferId.push(value.ImportersOfferId);
                OfferId.push(value.OfferId);
                OfferTitle.push(value.OfferTitle);
                Description.push(value.Description);
                ValidFrom.push(value.ValidFrom);
                ValidUpto.push(value.ValidUpto);
                IsRead.push(value.IsRead);
            });
            
            localStorage.setItem("impofrid", ImportersOfferId);
            localStorage.setItem("ofrid", OfferId);
            localStorage.setItem("ofrtitle", OfferTitle);
            localStorage.setItem("ofrdesc", Description);
            localStorage.setItem("ofrfrom", ValidFrom);
            localStorage.setItem("ofrupto", ValidUpto);
            localStorage.setItem("ofrread", IsRead);
            
            var $ul = $( '<ul id="clist">' );
            $('#clist').empty();
            for(i=0; i < ImportersOfferId.length; i++)
            {
                $("#clist").append('<li id="menuli" name="head" ><a href="cofferdetails.html" rel="external"><div style="float: left; width:100%;"><h1>'+OfferTitle[i]+'</h1><p id="menudt"> '+Description[i]+' </p><p id="fromdt"> '+str1+ValidFrom[i]+' </p><p id="todt"> '+str2+ValidUpto[i]+' </p></div></li>' );
            }
            $('#clist').listview('refresh');
        }
    };
    
    $('#clist').delegate('li', 'tap', function ()
    {
        var index = $(this).index();
        localStorage.setItem("cofrindex", index);
    });
}

// Current Offers Ends





// COffer Details here
    
function COfferDetails()
{
    var str;
    str=localStorage.getItem("ofrtitle");
    var i=localStorage.getItem("cofrindex");
    var temp = new Array();
    temp = str.split(",");
    document.getElementById("cheading").innerHTML = temp[i];
}

// COffer Details Ends






// Complete Expired Offers here
    
function ExpiredOffers()
{
    var ImportersOfferId = [];
    var OfferId = [];
    var OfferTitle = [];
    var Description = [];
    var ValidFrom = [];
    var ValidUpto = [];
    var IsRead = [];
    var str1 = "Valid From:";
    var str2 = "Valid UpTo  :"; 
    var exporterid = localStorage.getItem("Nexpcdid");
    var importerid = localStorage.getItem("Nimptrid");
    var isactive = '0';
    var xmlhttp = new XMLHttpRequest();
    
    var urlstr = 'http://192.168.1.25:89/ZenTradeService.svc/ImportersOffers/ListAllByImporterId/'+exporterid+'/'+importerid+'/'+isactive+'';
    
    xmlhttp.open('GET',urlstr,true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(null);
    
    xmlhttp.onreadystatechange = function()
    {
        if(xmlhttp.readyState == 4)
        {
            var stringContent = $(xmlhttp.responseText).text(); 
            var jsonData = JSON.parse(stringContent);
            
            $.each( jsonData, function ( key, value )
            {
                ImportersOfferId.push(value.ImportersOfferId);
                OfferId.push(value.OfferId);
                OfferTitle.push(value.OfferTitle);
                Description.push(value.Description);
                ValidFrom.push(value.ValidFrom);
                ValidUpto.push(value.ValidUpto);
                IsRead.push(value.IsRead);
            });
            
            localStorage.setItem("impofrid", ImportersOfferId);
            localStorage.setItem("ofrid", OfferId);
            localStorage.setItem("ofrtitle", OfferTitle);
            localStorage.setItem("ofrdesc", Description);
            localStorage.setItem("ofrfrom", ValidFrom);
            localStorage.setItem("ofrupto", ValidUpto);
            localStorage.setItem("ofrread", IsRead);
            
            var $ul = $( '<ul id="elist">' );
            $('#elist').empty();
            for(i=0; i < ImportersOfferId.length; i++)
            {
                $("#elist").append('<li id="menuli" name="head" ><a href="cofferdetails.html" rel="external"><div style="float: left; width:20%;"></div><div style="float: left; width:60%;"><h1>'+OfferTitle[i]+'</h1><p id="menudt"> '+Description[i]+' </p><p id="fromdt"> '+str1+ValidFrom[i]+' </p><p id="todt"> '+str2+ValidUpto[i]+' </p></div></li>' );
            }
            $('#elist').listview('refresh');
        }
    };
    
    $('#elist').delegate('li', 'tap', function ()
    {
        var index = $(this).index();
        localStorage.setItem("eindex", index);
    });
}

// Expired Offers Ends





// Expired Offer Details here
    
function EOfferDetails()
{
    var str;
    str=localStorage.getItem("item");
    var i=localStorage.getItem("eindex");
    var temp = new Array();
    temp = str.split(",");
    document.getElementById("eheading").innerHTML = temp[i];
}

// Expired Offer Details Ends









// Random String

function randomString (strLength, charSet)
{
    var result = [];
    
    while (strLength--)
    {
        result.push(charSet.charAt(Math.floor(Math.random() * charSet.length)));
    }

    return result.join('');
}

// Random string ends







//Load ordering page

function LoadOrderPage()
{
    var i=localStorage.getItem("prindex");
    var str3;
    str3=localStorage.getItem("Product_name");
    var temp3 = new Array();
    temp3 = str3.split(",");
    
    var prod = document.getElementById("ordprod")
    prod.value = temp3[i];
}

// Load ordering page ends









//Get price

function getprice()
{
    var newprce;
    var elem = '';
    var ordqty=document.getElementById("ordqty").value;
    var i=localStorage.getItem("prindex");
    var str2;
    str2=localStorage.getItem("amount");
    var temp2 = new Array();
    temp2 = str2.split(",");
    var str4;
    str4=localStorage.getItem("avqt");
    var temp4 = new Array();
    temp4 = str4.split(",");
    
    if(isNaN(ordqty))
    {
        alert("Invalid data format.\n\nOnly numbers are allowed.");
        
        document.getElementById("ordqty").focus();
    }
    else
    {
        if (ordqty > temp4[i])
        {
            alert("That much Quantity not available.");
            
            document.getElementById("ordqty").focus();
        }
        else
        {
            newprce=temp2[i]*ordqty;
            elem = document.getElementById("ordprce");
            elem.value = newprce;
        }
    }
}

//Get Price Ends







function clearText(thefield)
{
    thefield.value = "";
}







// Order Item

function OrderItem()
{
    
    var exporterid = localStorage.getItem("Nexpcdid");
    var importerid = localStorage.getItem("Nimptrid");
    var ordid = 0;
    var ordno = randomString(8, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');  
    var i=localStorage.getItem("prindex");
    var str;
    str=localStorage.getItem("Product_id");
    var temp = new Array();
    temp = str.split(",");
    var str1;
    str1=localStorage.getItem("categoryid");
    var temp1 = new Array();
    temp1 = str1.split(",");
    var sts = 'New';
    var isact = 1;
    var mode = 1;
    var ordprod = document.getElementById("ordprod").value;
    var ordqty=document.getElementById("ordqty").value;
    var ordprce=document.getElementById("ordprce").value;
    
    if(ordprod == '' || ordqty == '' || ordprce == '')
    {
        alert("Please fill all the fields");
    }
    else
    {
        var strurl = 'http://192.168.1.25:89/ZenTradeService.svc/Orders/Create/'+exporterid+'/'+importerid+'/'+ordid+'/'+ordno+'/'+temp1[i]+'/'+temp[i]+'/'+ordqty+'/'+ordprce+'/'+sts+'/'+isact+'/'+mode+'';
        $.ajax({
            url: strurl,   
            success: function(msg)
            {  
                var result = $(msg).text();
                if (result > 0)
                {
                    alert("Successfully Ordered the Product");
                    document.getElementById("ordqty").focus();
                    document.getElementById("ordprce").focus();
                }
                else
                {
                    alert("Ordering failed");
                } 
            },
            dataType: "text"  
        });
    }
}

//Order item ends











// Order Cancel

function Ordercancel()
{
    var str;
    str=localStorage.getItem("order_ids");
    var i=localStorage.getItem("ordindex");
    var temp = new Array();
    temp = str.split(",");
    var exporterid = localStorage.getItem("Nexpcdid");
    var importerid = localStorage.getItem("Nimptrid");
    var ordid = temp[i];
    var isact = 1;
    
    var strurl = 'http://192.168.1.25:89/ZenTradeService.svc/Orders/CancelOrder/'+exporterid+'/'+importerid+'/'+ordid+'/'+isact+'';
    
    $.ajax({
        url: strurl,   
        success: function(msg)
        {  
            var result = $(msg).text();
            
            if (result == 1)
            {
                alert("Order Cancelled");
            }
            else
            {
                alert("Order not Existing Or cancelled already");
            }
        },
        dataType: "text"
    });   
}






function cancels()
{
}

//Order Cancel ends







function ordermove()
{
    document.location.href = "orderitem.html";
}