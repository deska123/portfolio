var xmlhttp;
if(window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
} else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.open("GET", "xml/contact.xml",true);
xmlhttp.send();
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var xmlDoc = xmlhttp.responseXML;
        var media_head = xmlDoc.getElementsByTagName("media");
        var media_output = "<ul>";
        for(var a = 0; a < media_head.length; a++) {
            media_output += "<li><a href='" + media_head[a].getElementsByTagName("link")[0].childNodes[0].nodeValue + "'><span class='icon'>";
            media_output += "<i class='" + media_head[a].getElementsByTagName("icon")[0].childNodes[0].nodeValue +"'>"
            media_output += "</i></span></a></li>";
        }
        media_output += "</ul>";
        document.getElementById("social_media").innerHTML = media_output;
        document.getElementById("about_name").innerHTML = xmlDoc.getElementsByTagName("name")[0].childNodes[0].nodeValue;
    }
}
