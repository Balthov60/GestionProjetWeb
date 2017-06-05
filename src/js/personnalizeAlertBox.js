 window.alert=function( alertMessage )
{
    var alertBox = "";
            alertBox +="<div style=\"width:350px;height:70px;border: 1px solid black;z-index: 9999;\" class=\"alertBoxIn alertPosition\" >";
                     alertBox  +="<img src=\"images/logos/logo.png\" style=\"position: relative; top: 1%; left: 2%; \" /></td>";
                     alertBox +="<SPAN style=\"position: relative; top:-30%; left: 12%\">"+alertMessage+"</SPAN>";
                     alertBox  +="<input style=\"position: relative; top:20%; left:10%\" type=\"button\" value=\"    Ok      \" onclick=\"closeAlert();\" />";
            alertBox+="</div>";
    document.getElementById("alertPanel").innerHTML = alertBox;
    document.getElementById("alertPanel").focus();
 }
 
function closeAlert()
{
    var alertBox =  document.getElementById("alertPanel");
    alertBox.innerHTML ="";
}