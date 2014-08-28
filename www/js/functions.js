function LoginType(value)
{
    if (value == "expLogin")
    {
        document.location.href = "explogin.html";
    }
    else if (value == "impLogin")
    {
        document.location.href = "implogin.html";
    }
}





//Importer Login Function

function ImpLogin()
{
    var cmpid = document.getElementById("cmpid").value;
    var cstrid=document.getElementById("cstmrid").value;
    var pwd=document.getElementById("pwd").value;
    var item = [];
    
    if(cmpid == '' || cstrid == '' || pwd == '')
    {
        alert("Please fill all the login fields");
    }
    else
    {
        // Php Service to check the Exporter is Valid or not
    
        var json_string =''+cmpid+'';
        
        $.ajax({
            type: "GET",
            url:"http://192.168.1.200/zentrade/service/importer_login.php?code=",
            data:{code: json_string},
            success: function(response,status)
            {
                var data=JSON.stringify(response);
            
                if (data == 0)
                {
                    alert("Your Exporter Not Existing");
                }
                else
                {
                    if(jQuery.parseJSON(response.ec_active) == 1)
                    {
                        // .Net service to do the importer login
                        
                        var xmlhttp = new XMLHttpRequest();
                        
                        var urlstr = 'http://192.168.1.25:89/ZenTradeService.svc/Importer/Login/'+cmpid+'/'+cstrid+'/'+pwd+'';
                        
                        xmlhttp.open('GET',urlstr,true);
                        xmlhttp.setRequestHeader("Content-Type", "application/json");
                        xmlhttp.send(null);
                        
                        xmlhttp.onreadystatechange = function()
                        {
                            var stringContent = $(xmlhttp.responseText).text();
                            var jsonData = JSON.parse(stringContent);
            
                            $.each( jsonData, function ( key, value )
                            {
                                localStorage.setItem("Nimptrid", value.importerid);
                                localStorage.setItem("Nexpcdid", value.expcd_exportercdid);
                                localStorage.setItem("Ncomcode", value.exp_companycode);
                                
                                item.push(value.importerid);
                            });
                            
                            if (item.length == 0)
                            {
                                alert("Login Failed");
                            }
                            else
                            {
                                document.location.href = "mainmenu.html";
                            }
                        };
                        
                        // End of .Net service call
                    }
                    else
                    {
                        alert("Your Exporter Not Existing");
                    }
                }
            },
            error: function(request, status, error)
            {
                alert("error occured..plz check");
            }
        });
    }

    // End of php service call
}

//Importer Login Function Ends








// Exporter Login Function

function ExpLogin()
{
    var cdid = document.getElementById("cdid").value;
    var username = document.getElementById("usrname").value;
    var pwd = document.getElementById("pwd").value;
    
    if(cdid == '' || username == '' || pwd == '')
    {
        alert("Please fill all the login fields");
    }
    else
    {
        // Php Service to check the Exporter is Valid or not
        
        var strurl = 'http://192.168.1.200/zentrade/service/exporter_login.php?code='+cdid+'&cusername='+username+'&cpassword='+pwd+'';
        
        $.ajax({
            type: "GET",
            url:strurl,
            data:{},
            success: function(response,status)
            {
                var data=JSON.stringify(response);
                
                if (jQuery.parseJSON(response.status) == 0 || jQuery.parseJSON(response.status) == -1)
                {
                    alert("Exporter Not Existing");
                }
                else
                {
                    document.location.href = "expmenu.html";
                }
            },
            error: function(request, status, error)
            {
                alert("error occured..plz check");
            }
        });
    }

    // End of php service call
}

//Exporter Login Function Ends










//Change Password Function

function ChangePassword()
{
    var oldpwd = document.getElementById("oldpwd").value;
    var newpwd=document.getElementById("newpwd").value;
    var cnfmpwd=document.getElementById("cnfmpwd").value;
    
    var exporterid = localStorage.getItem("Nexpcdid");
    var importerid = localStorage.getItem("Nimptrid");
    var cmpcode = localStorage.getItem("Ncomcode");
    
    if(oldpwd == '' || newpwd == '' || cnfmpwd == '')
    {
        alert("Please fill all the fields");
    }
    else
    {
        if(newpwd == cnfmpwd)
        {
            var urlstr = 'http://192.168.1.25:89/ZenTradeService.svc/Importer/ImporterChangePassword/'+exporterid+'/'+importerid+'/'+cmpcode+'/'+oldpwd+'/'+newpwd;
            
            $.ajax({
                url: urlstr,
                success: function(data)
                {
                    var result = $(data).text();
                    
                    if (result == 1)
                    {
                        alert("Password Changed Successfully");
                    }
                    else
                    {
                        alert("Password can't Change");
                    }
                },
                dataType: "text"
            });
        }
        else
        {
            alert("password and confirm password should match..Plz check");
        }
    }
}

//Change Password Function Ends










//Clear Textfield Function here
            
function clearText(thefield)
{
    thefield.value = "";
}

//Clear Textfield Function Ends