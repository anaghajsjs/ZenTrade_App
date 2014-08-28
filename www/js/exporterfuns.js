// Complete Importers Listing here

function Importers()
{
    var exporterid = '1';
    var isactive = '2';
    
    var xmlhttp = new XMLHttpRequest();
    
    var urlstr = 'http://192.168.1.25:89/ZenTradeService.svc/Importer/List/'+exporterid+'/'+isactive;
    
    xmlhttp.open('GET',urlstr,true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(null);
    
    xmlhttp.onreadystatechange = function()
    {
        
        if(xmlhttp.readyState == 4)
        {
            
            var stringContent = $(xmlhttp.responseText).text();
            
            var imp_id = [];
            var imp_name = [];
            var imp_email = [];
            
            
            
            var jsonData = JSON.parse(stringContent);
            
            $.each( jsonData, function ( key, value )
            {
                imp_id.push(value.importerid);
                imp_name.push(value.name);
                imp_email.push(value.email);
            });
            
            localStorage.setItem("impid", imp_id);
            localStorage.setItem("impname", imp_name);
            localStorage.setItem("impemail", imp_email);
            
            var $ul = $( '<ul id="implist">' );
            $('#implist').empty();
            for(i=0; i < imp_id.length; i++)
            {
                $("#implist").append('<li id="menuli" name="head"><a href="orderlist.html" rel="external"><div style="float: left; width:100%;"><h1 id="menudt"> '+imp_name[i]+' </h1><p>'+imp_email[i]+'</p></div></li>' );
            }
            $('#implist').listview('refresh');
        }
    };
    
    $('#implist').delegate('li', 'tap', function ()
    {
        var index = $(this).index();
        localStorage.setItem("impindex", index);
    });
           
    //$("#list").append('<li id="menuli" name="head"><a href="products.html" rel="external"><div style="float: left; width:20%;"></div><div style="float: left; width:60%;"><h1 id="menudt"> '+category_name[0]+' </h1></div><div style="float: right; width:20%;"><img src="images/arrow.png" align="middle" style="float: right; vertical-align: middle !important; margin-top: 30px;" alt=""/></div></li>' );
           
}

// Importers Listing Ends

// Complete Orders of Selected importer Listing
    
function Orders()
{
    var or = "'s Orders"
    
    var impindex;
    impindex=localStorage.getItem("impindex");
    
    var impname = localStorage.getItem("impname");
    var namelist = new Array();
    namelist = impname.split(",");
    
    var imp_id = localStorage.getItem("impid");
    var idlist = new Array();
    idlist = imp_id.split(",");
    
    document.getElementById("hedname").innerHTML = namelist[impindex] + or;
    
    var expcdid = '1';
    var isactive = '2';
    var xmlhttp = new XMLHttpRequest();
    var urlstr = 'http://192.168.1.25:89/ZenTradeService.svc/Orders/ListAllByImporterId/'+expcdid+'/'+idlist[impindex]+'/'+isactive+'';
    
    xmlhttp.open('GET',urlstr,true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(null);
    xmlhttp.onreadystatechange = function()
    {
        if(xmlhttp.readyState == 4)
        {
            var stringContent = $(xmlhttp.responseText).text();
            
            var order_id = [];
            var order_no = [];
            var catg_id = [];
            var prod_id = [];
            var prod_name = [];
            var qty = [];
            var price = [];
            var ord_status = [];
            var currency = [];
            var curcy_code = [];
            
            var jsonData = JSON.parse(stringContent);
            
            $.each( jsonData, function ( key, value )
            {
                order_id.push(value.orderid);
                order_no.push(value.orderno);
                catg_id.push(value.cat_categoryid);
                prod_id.push(value.prod_productid);
                prod_name.push(value.productname);
                qty.push(value.quantity);
                price.push(value.price);
                ord_status.push(value.status);
                currency.push(value.currency);
                curcy_code.push(value.code);
            });
            
            localStorage.setItem("ordid", order_id);
            localStorage.setItem("ordno", order_no);
            localStorage.setItem("ordcgid", catg_id);
            localStorage.setItem("ordpdid", prod_id);
            localStorage.setItem("ordpdname", prod_name);
            localStorage.setItem("ordqty", qty);
            localStorage.setItem("ordprce", price);
            localStorage.setItem("ordsts", ord_status);
            localStorage.setItem("ordcurcy", currency);
            localStorage.setItem("ordcrcode", curcy_code);
            
            var $ul = $( '<ul id="ordlist">' );
            $('#ordlist').empty();
            for(i=0; i < order_id.length; i++)
            {
                $("#ordlist").append('<li id="menuli" name="head" ><a href="productdetails.html" rel="external"><h2>'+prod_name[i]+'</h2><p id="menudt"> Order No :'+order_no[i]+' \n Quantity : '+qty[i]+' \n Price : '+curcy_code[i]+price[i]+'" "'+currency[i]+'</p></li>');
            }
            $('#ordlist').listview('refresh');
        }
    };
    
    $('#ordlist').delegate('li', 'tap', function ()
    {
        var index = $(this).index();
        localStorage.setItem("ordrind", index);
    });
}

// Order Listing Ends