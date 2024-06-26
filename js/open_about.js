$(document).ready(function(){
    const monthName = {
        "January": "01",
        "February": "02",
        "March": "03",
        "April": "04",
        "May": "05",
        "June": "06",
        "July": "07",
        "August": "08",
        "September": "09",
        "October": "10",
        "November": "11",
        "December": "12"
    };

    $.ajax({ 
        type: "GET",
        url: "xml/skills.xml", 
        dataType: "xml",
        success: function(xmlDoc){
            var skills_head = $(xmlDoc).find('skills');
            var skills_head_children = $(skills_head).children();
            var skills_output = "";
            var skills_curr = skills_head_children.first();

            while(!(skills_curr.is(skills_head_children.last()))) {
                var name = skills_curr.find('name').text();
                var description = skills_curr.find('description').text();
                skills_output += "<p><strong>" + name + "</p></strong>";
                skills_output += "<p>" + description + "</p>";
                var lists_head = $(skills_curr).find('lists');
                var lists_head_children = $(lists_head).children();
                var lists_curr = lists_head_children.first();
                while(!(lists_curr.is(lists_head_children.last()))) {
                    skills_output += "<span class=\"tag is-dark\">" + lists_curr.text() + "</span>&nbsp;";
                    lists_curr = lists_curr.next();
                }
                skills_output += "<span class=\"tag is-dark\">" + lists_curr.text() + "</span>&nbsp;";
                lists_curr = lists_curr.next();
                skills_output += "<br><br>";
                skills_curr = skills_curr.next();
            }
            var name = skills_curr.find('name').text();
            var description = skills_curr.find('description').text();
            skills_output += "<p><strong>" + name + "</p></strong>";
            skills_output += "<p>" + description + "</p>";
            var lists_head = $(skills_curr).find('lists');
            var lists_head_children = $(lists_head).children();
            var lists_curr = lists_head_children.first();
            while(!(lists_curr.is(lists_head_children.last()))) {
                skills_output += "<span class=\"tag is-dark\">" + lists_curr.text() + "</span>&nbsp;";
                lists_curr = lists_curr.next();
            }
            skills_output += "<span class=\"tag is-dark\">" + lists_curr.text() + "</span>&nbsp;";
            lists_curr = lists_curr.next();
            $("#about_skills").html(skills_output);
        }
    });
    
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
            var education_curr = education_head_children.last();
            while(!(education_curr.is(education_head_children.first()))) {
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
                education_output += "<i><a href='" + school_link + "' target='_blank'>"; 
                education_output += school_name + "</a></i><br>";    
                education_output += "<i>" + start_month + ", ";       
                education_output += start_year + " - ";   
                education_output += end_month + ", ";       
                education_output += end_year + "  |  ";
                education_output += city + ", ";       
                education_output += province + ", ";                   
                education_output += country;
                education_output += "</i><br><br>"; 
                education_curr = education_curr.prev();
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
            education_output += "<i><a href='" + school_link + "' target='_blank'>"; 
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
            var job_experience_curr = job_experience_head_children.last();
            while(!(job_experience_curr.is(job_experience_head_children.first()))) {
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
                working_output += "<i><a href='" + company_link + "' target='_blank'>"; 
                working_output += company_name + "</a></i><br>";   
                working_output += "<i>" + start_month + " ";   
                working_output += start_date  + ", ";
                working_output += start_year + " - ";
                if(end_month == '-' && end_date == '-' && end_year == '-') {
                    working_output += "current";
                } else {
                    working_output += end_month + " ";
                    working_output += end_date + ", ";
                    working_output += end_year + " ("; 
                    let momentStart = moment(start_year + '-' + monthName[start_month] + '-' + start_date.padStart(2, '0') + ' 00:00:00','YYYY-MM-DD HH:mm:ss');
                    let momentEnd = moment(end_year + '-' + monthName[end_month] + '-' + end_date.padStart(2, '0') + ' 00:00:00','YYYY-MM-DD HH:mm:ss');
                    let diff = moment.preciseDiff(momentStart, momentEnd, true); 
                    working_output += diff.years + " year(s) " + diff.months + " month(s))";
                }
                working_output += "<br>";
                working_output += city + ", ";
                working_output += province + ", ";
                working_output += country + " ";
                working_output += "</i><br>";
                working_output += "<p class='has-text-justified' style='color:#8B4513'>" + description + "</p><br>"; 
                job_experience_curr = job_experience_curr.prev();
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
            working_output += "<i><a href='" + company_link + "' target='_blank'>"; 
            working_output += company_name + "</a></i><br>";   
            working_output += "<i>" + start_month + " ";   
            working_output += start_date  + ", ";
            if(end_month == '-' && end_date == '-' && end_year == '-') {
                working_output += "current";
            } else {
                working_output += end_month + " ";
                working_output += end_date + ", ";
                working_output += end_year + " ("; 
                let momentStart = moment(start_year + '-' + monthName[start_month] + '-' + start_date.padStart(2, '0') + ' 00:00:00','YYYY-MM-DD HH:mm:ss');
                let momentEnd = moment(end_year + '-' + monthName[end_month] + '-' + end_date.padStart(2, '0') + ' 00:00:00','YYYY-MM-DD HH:mm:ss');
                let diff = moment.preciseDiff(momentStart, momentEnd, true); 
                working_output += diff.years + " year(s) " + diff.months + " month(s))";
            }
            working_output += "<br>";
            working_output += city + ", ";
            working_output += province + ", ";
            working_output += country + " ";
            working_output += "</i><br>";
            working_output += "<p class='has-text-justified' style='color:#8B4513'>" + description + "</p><br>"; 
            $("#about_job_experience").html(working_output);
        }
    });
});