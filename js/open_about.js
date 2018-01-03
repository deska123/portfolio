$(document).ready(function(){
    $.ajax({url: "xml/about.xml", success: function(xmlDoc){
        document.getElementById("about_name").innerHTML = xmlDoc.getElementsByTagName("name")[0].childNodes[0].nodeValue;
        document.getElementById("occupation").innerHTML = xmlDoc.getElementsByTagName("occupation")[0].childNodes[0].nodeValue;
        document.getElementById("location").innerHTML = xmlDoc.getElementsByTagName("location")[0].childNodes[0].nodeValue;
        document.getElementById("quote").innerHTML = xmlDoc.getElementsByTagName("quote")[0].childNodes[0].nodeValue;
        
        var education_head = xmlDoc.getElementsByTagName("education");
        var education_output = "";
        for(var a = 0; a < education_head.length; a++) {
            education_output += "<strong>" + education_head[a].getElementsByTagName("degree")[0].childNodes[0].nodeValue + " in ";
            education_output += education_head[a].getElementsByTagName("major")[0].childNodes[0].nodeValue + "</strong> at ";
            education_output += "<i><a href='" + education_head[a].getElementsByTagName("school_link")[0].childNodes[0].nodeValue + "'>"; 
            education_output += education_head[a].getElementsByTagName("school_name")[0].childNodes[0].nodeValue + "</a></i><br>";    
            education_output += "<i>" + education_head[a].getElementsByTagName("start_month")[0].childNodes[0].nodeValue + ", ";       
            education_output += education_head[a].getElementsByTagName("start_year")[0].childNodes[0].nodeValue + " - ";   
            education_output += education_head[a].getElementsByTagName("end_month")[0].childNodes[0].nodeValue + ", ";       
            education_output += education_head[a].getElementsByTagName("end_year")[0].childNodes[0].nodeValue + " | ";
            education_output += education_head[a].getElementsByTagName("city")[0].childNodes[0].nodeValue + ", ";       
            education_output += education_head[a].getElementsByTagName("province")[0].childNodes[0].nodeValue + ", ";                   
            education_output += education_head[a].getElementsByTagName("country")[0].childNodes[0].nodeValue;
            education_output += "</i><br><br>";
        }
        document.getElementById("education").innerHTML = education_output;

        var working_experience_head = xmlDoc.getElementsByTagName("job_experience");
        var working_output = "";
        for(var b = 0; b < working_experience_head.length; b++) {
            working_output += "<strong>" + working_experience_head[b].getElementsByTagName("position")[0].childNodes[0].nodeValue + "</strong> at ";
            working_output += "<i><a href='" + working_experience_head[b].getElementsByTagName("company_link")[0].childNodes[0].nodeValue + "'>"; 
            working_output += working_experience_head[b].getElementsByTagName("company_name")[0].childNodes[0].nodeValue + "</a></i><br>";   
            working_output += "<i>" + working_experience_head[b].getElementsByTagName("start_month")[0].childNodes[0].nodeValue + " ";   
            working_output += working_experience_head[b].getElementsByTagName("start_date")[0].childNodes[0].nodeValue + ", ";
            working_output += working_experience_head[b].getElementsByTagName("start_year")[0].childNodes[0].nodeValue + " - ";
            var end_month = working_experience_head[b].getElementsByTagName("end_month")[0].childNodes[0].nodeValue;
            var end_date = working_experience_head[b].getElementsByTagName("end_date")[0].childNodes[0].nodeValue;
            var end_year = working_experience_head[b].getElementsByTagName("end_year")[0].childNodes[0].nodeValue;
            if(end_month == '-' && end_date == '-' && end_year == '-') {
                working_output += "current | ";
            } else {
                working_output += end_month + " ";
                working_output += end_date + ", ";
                working_output += end_year + " | ";    
            }
            working_output += working_experience_head[b].getElementsByTagName("city")[0].childNodes[0].nodeValue + ", ";
            working_output += working_experience_head[b].getElementsByTagName("province")[0].childNodes[0].nodeValue + ", ";
            working_output += working_experience_head[b].getElementsByTagName("country")[0].childNodes[0].nodeValue + " ";
            working_output += "</i><br>";
            working_output += "<p style='text-align: justify;'>" + working_experience_head[b].getElementsByTagName("description")[0].childNodes[0].nodeValue + "</p><br>";
        }
        document.getElementById("experience").innerHTML = working_output; 
    }});
});
