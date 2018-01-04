$(document).ready(function(){
    $.ajax({        
        type: "GET",
        url: "xml/about.xml", 
        dataType: "xml",
        success: function(xmlDoc){
            var about = $(xmlDoc).find('about');
            var initial = $(about).find('initial').text();
            var name = $(about).find('name').text(); 
            var quote = $(about).find('quote').text();
            var occupation = $(about).find('occupation').text();
            var location = $(about).find('location').text();
            $(".about_initial").text(initial);
            $("#about_name").text(name);
            $("#about_quote").text(quote);
            $("#about_occupation").text(occupation);
            $("#about_location").text(location);

            var education_head = $(about).find('educations');
            var education_head_children = $(education_head).children();
            var education_output = "";
            var education_curr = education_head_children.first();
            while(!(education_curr.is(education_head_children.last()))) {
                var degree = $(education_curr).find('degree').text();
                var major = $(education_curr).find('major').text();
                var school_link = $(education_curr).find('school_link').text();
                var school_name = $(education_curr).find('school_name').text();
                var start_month = $(education_curr).find('start_month').text();
                var start_year = $(education_curr).find('start_year').text();
                var end_month = $(education_curr).find('end_month').text();
                var end_year = $(education_curr).find('end_year').text();
                var city = $(education_curr).find('city').text();
                var province = $(education_curr).find('province').text();
                var country = $(education_curr).find('country').text();
                education_output += "<strong>" + degree + " in ";
                education_output += major + "</strong> at ";
                education_output += "<i><a href='" + school_link + "'>"; 
                education_output += school_name + "</a></i><br>";    
                education_output += "<i>" + start_month + ", ";       
                education_output += start_year + " - ";   
                education_output += end_month + ", ";       
                education_output += end_year + "  |  ";
                education_output += city + ", ";       
                education_output += province + ", ";                   
                education_output += country;
                education_output += "</i><br><br>"; 
                education_curr = education_curr.next();
            }
            var degree = $(education_curr).find('degree').text();
            var major = $(education_curr).find('major').text();
            var school_link = $(education_curr).find('school_link').text();
            var school_name = $(education_curr).find('school_name').text();
            var start_month = $(education_curr).find('start_month').text();
            var start_year = $(education_curr).find('start_year').text();
            var end_month = $(education_curr).find('end_month').text();
            var end_year = $(education_curr).find('end_year').text();
            var city = $(education_curr).find('city').text();
            var province = $(education_curr).find('province').text();
            var country = $(education_curr).find('country').text();
            education_output += "<strong>" + degree + " in ";
            education_output += major + "</strong> at ";
            education_output += "<i><a href='" + school_link + "'>"; 
            education_output += school_name + "</a></i><br>";    
            education_output += "<i>" + start_month + ", ";       
            education_output += start_year + " - ";   
            education_output += end_month + ", ";       
            education_output += end_year + "  |  ";
            education_output += city + ", ";       
            education_output += province + ", ";                   
            education_output += country;
            education_output += "</i><br><br>";  
            $("#about_education").html(education_output);
        }
    });

    $.ajax({        
        type: "GET",
        url: "xml/job_experience.xml", 
        dataType: "xml",
        success: function(xmlDoc){
            var job_experience_head = $(xmlDoc).find('job_experience');
            var job_experience_head_children = $(job_experience_head).children();
            var working_output = "";
            var job_experience_curr = job_experience_head_children.first();
            while(!(job_experience_curr.is(job_experience_head_children.last()))) {
                var position = $(job_experience_curr).find('position').text();
                var company_name = $(job_experience_curr).find('company_name').text();
                var company_link = $(job_experience_curr).find('company_link').text();
                var start_date = $(job_experience_curr).find('start_date').text();
                var start_month = $(job_experience_curr).find('start_month').text();
                var start_year = $(job_experience_curr).find('start_year').text();
                var end_date = $(job_experience_curr).find('end_date').text();
                var end_month = $(job_experience_curr).find('end_month').text();
                var end_year = $(job_experience_curr).find('end_year').text();
                var city = $(job_experience_curr).find('city').text();
                var province = $(job_experience_curr).find('province').text();
                var country = $(job_experience_curr).find('country').text();
                var description = $(job_experience_curr).find('description').text();
                working_output += "<strong>" + position + "</strong> at ";
                working_output += "<i><a href='" + company_link + "'>"; 
                working_output += company_name + "</a></i><br>";   
                working_output += "<i>" + start_month + " ";   
                working_output += start_date  + ", ";
                working_output += start_year + " - ";
                if(end_month == '-' && end_date == '-' && end_year == '-') {
                    working_output += "current  |  ";
                } else {
                    working_output += end_month + " ";
                    working_output += end_date + ", ";
                    working_output += end_year + "  |  ";    
                }
                working_output += city + ", ";
                working_output += province + ", ";
                working_output += country + " ";
                working_output += "</i><br><br>";
                working_output += "<p class='has-text-justified'>" + description + "</p><br>"; 
                job_experience_curr = job_experience_curr.next();
            }
            var position = $(job_experience_curr).find('position').text();
            var company_name = $(job_experience_curr).find('company_name').text();
            var company_link = $(job_experience_curr).find('company_link').text();
            var start_date = $(job_experience_curr).find('start_date').text();
            var start_month = $(job_experience_curr).find('start_month').text();
            var start_year = $(job_experience_curr).find('start_year').text();
            var end_date = $(job_experience_curr).find('end_date').text();
            var end_month = $(job_experience_curr).find('end_month').text();
            var end_year = $(job_experience_curr).find('end_year').text();
            var city = $(job_experience_curr).find('city').text();
            var province = $(job_experience_curr).find('province').text();
            var country = $(job_experience_curr).find('country').text();
            var description = $(job_experience_curr).find('description').text();
            working_output += "<strong>" + position + "</strong> at ";
            working_output += "<i><a href='" + company_link + "'>"; 
            working_output += company_name + "</a></i><br>";   
            working_output += "<i>" + start_month + " ";   
            working_output += start_date  + ", ";
            working_output += start_year + " - ";
            if(end_month == '-' && end_date == '-' && end_year == '-') {
                working_output += "current | ";
            } else {
                working_output += end_month + " ";
                working_output += end_date + ", ";
                working_output += end_year + "  |  ";    
            }
            working_output += city + ", ";
            working_output += province + ", ";
            working_output += country + " ";
            working_output += "</i><br><br>";
            working_output += "<p class='has-text-justified'>" + description + "</p><br>"; 
            $("#about_job_experience").html(working_output);
        }
    });

    /*
    $.ajax({url: "xml/about.xml", success: function(xmlDoc){
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
            
        }
        document.getElementById("experience").innerHTML = working_output; 
    }});
    */
});
