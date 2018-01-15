$(document).ready(function(){
    $("#create_new_education_trigger").click(function(){
        $("#create_new_education_modal").addClass("is-active");
        $("#create_new_education_modal").show();
    });
    
    $(".close_create_new_education_modal").click(function(){
        $("#create_new_education_modal").removeClass("is-active");
        $("#create_new_education_modal").hide();
    });

    function numToStringMonth(num) {
        var month = "";
        if(num == "01") {
            month = "January";
        } else if(num == "02") {
            month = "February";
        } else if(num == "03") {
            month = "March";
        } else if(num == "04") {
            month = "April";
        } else if(num == "05") {
            month = "May";
        } else if(num == "06") {
            month = "June";
        } else if(num == "07") {
            month = "July";
        } else if(num == "08") {
            month = "August";
        } else if(num == "09") {
            month = "September";
        } else if(num == "10") {
            month = "October";
        } else if(num == "11") {
            month = "November";
        } else if(num == "12") {
            month = "December";
        } 
        return month;
    }

    function stringToNumMonth(string) {
        var month = "";
        if(string == "Jan") {
            month = "01";
        } else if(num == "Feb") {
            month = "02";
        } else if(num == "Mar") {
            month = "03";
        } else if(num == "Apr") {
            month = "04";
        } else if(num == "May") {
            month = "05";
        } else if(num == "Jun") {
            month = "06";
        } else if(num == "Jul") {
            month = "07";
        } else if(num == "Aug") {
            month = "08";
        } else if(num == "Sep") {
            month = "09";
        } else if(num == "Oct") {
            month = "10";
        } else if(num == "Nov") {
            month = "11";
        } else if(num == "Dec") {
            month = "12";
        } 
        return month;
    }

    $("#create_new_education_button").click(function(){
        var school_name = $("#school_name").val();
        var school_link = $("#school_link").val();
        var degree = $("#degree").val();
        var major = $("#major").val();
        var start_time = $("#start_time").val();
        var end_time = $("#end_time").val();
        var start_temp = start_time.split("-");
        var start_month = numToStringMonth(start_temp[1]);
        var start_year = start_temp[0];
        var end_temp = end_time.split("-");
        var end_month = numToStringMonth(end_temp[1]);
        var end_year = end_temp[0];
        var city = $("#city").val();
        var province = $("#province").val();
        var country = $("#country").val();
        
        var xmlhttp;
        if(window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.open("GET", "xml/about.xml", true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var xmlDoc = this.responseXML;
                var temp = parseInt(sessionStorage.educationsSize);
                temp += 1;
                sessionStorage.educationsSize = temp;
                
                var educationsNode = xmlDoc.getElementsByTagName("educations")[0];

                var educationNode = xmlDoc.createElement("education");
                var idAttr = xmlDoc.createAttribute("id");
                idAttr.nodeValue = sessionStorage.educationsSize;
                educationNode.setAttributeNode(idAttr);
                
                var schoolNameNode = xmlDoc.createElement("school_name");
                var schoolNameText = xmlDoc.createTextNode(school_name);
                schoolNameNode.appendChild(schoolNameText)
                educationNode.appendChild(schoolNameNode);

                var schoolLinkNode = xmlDoc.createElement("school_link");
                var schoolLinkText = xmlDoc.createTextNode(school_link);
                schoolLinkNode.appendChild(schoolLinkText)
                educationNode.appendChild(schoolLinkNode);

                var degreeNode = xmlDoc.createElement("degree");
                var degreeText = xmlDoc.createTextNode(degree);
                degreeNode.appendChild(degreeText)
                educationNode.appendChild(degreeNode);

                var majorNode = xmlDoc.createElement("major");
                var majorText = xmlDoc.createTextNode(major);
                majorNode.appendChild(majorText)
                educationNode.appendChild(majorNode);

                var startMonthNode = xmlDoc.createElement("start_month");
                var startMonthText = xmlDoc.createTextNode(start_month);
                startMonthNode.appendChild(startMonthText)
                educationNode.appendChild(startMonthNode);

                var startYearNode = xmlDoc.createElement("start_year");
                var startYearText = xmlDoc.createTextNode(start_year);
                startYearNode.appendChild(startYearText)
                educationNode.appendChild(startYearNode);

                var endMonthNode = xmlDoc.createElement("end_month");
                var endMonthText = xmlDoc.createTextNode(end_month);
                endMonthNode.appendChild(endMonthText)
                educationNode.appendChild(endMonthNode);

                var endYearNode = xmlDoc.createElement("end_year");
                var endYearText = xmlDoc.createTextNode(end_year);
                endYearNode.appendChild(endYearText)
                educationNode.appendChild(endYearNode);

                var cityNode = xmlDoc.createElement("city");
                var cityText = xmlDoc.createTextNode(city);
                cityNode.appendChild(cityText)
                educationNode.appendChild(cityNode);

                var provinceNode = xmlDoc.createElement("province");
                var provinceText = xmlDoc.createTextNode(province);
                provinceNode.appendChild(provinceText)
                educationNode.appendChild(provinceNode);

                var countryNode = xmlDoc.createElement("country");
                var countryText = xmlDoc.createTextNode(country);
                countryNode.appendChild(countryText)
                educationNode.appendChild(countryNode);

                educationsNode.appendChild(educationNode);

                //alert(xmlDoc.getElementsByTagName("education")[1].getElementsByTagName("school_name")[0].childNodes[0].nodeValue);
                var data = new XMLSerializer().serializeToString(xmlDoc.documentElement);
                $.post("data_management.php",
                {
                    type: "education",
                    data: data
                },
                function(data, status){
                    location.reload(true);
                });
            }
        };
    });

    $("#start_time").change(function(){
        if($("#start_time").val() == undefined || $("#start_time").val() == '') {
            alert("kosong");
        }
        var startTime = $("#start_time").val();
        var startDate = new Date(startTime);
        startDate = startDate.setDate(startDate.getDate() + 1);
        var newDate = String(new Date(startDate));
        var tempDate = newDate.split(" ");
        var modifiedDate = tempDate[3] + "-" + stringToNumMonth(tempDate[1]) + "-" + tempDate[2];
        $("#end_time").attr("min", modifiedDate);
    }); 

    $("#end_time").change(function(){
        var endTime = $("#end_time").val();
        var endDate = new Date(endTime);
        endDate = endDate.setDate(endDate.getDate() - 1);
        var endDate = String(new Date(endDate));
        var tempDate = endDate.split(" ");
        var modifiedDate = tempDate[3] + "-" + stringToNumMonth(tempDate[1]) + "-" + tempDate[2];
        $("#start_time").attr("max", modifiedDate);
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
            var motto = $(about).find('motto').text();
            var occupation = $(about).find('occupation').text();
            var location = $(about).find('location').text();
            $("#name_manage").text(name);
            $("#initial_manage").text(initial);
            $(".manage_about_initial").text(initial);
            $("#quote_manage").text(quote);
            $("#motto_manage").text(motto);
            $("#occupation_manage").text(occupation);
            $("#location_manage").text(location);
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
                education_output += "<tr>";
                education_output += "<td>" + school_name + "</td>";
                education_output += "<td>" + school_link + "</td>";
                education_output += "<td>" + degree + "</td>";
                education_output += "<td>" + major + "</td>";
                education_output += "<td>" + start_month + "</td>";
                education_output += "<td>" + start_year + "</td>";
                education_output += "<td>" + end_month + "</td>";
                education_output += "<td>" + end_year + "</td>";
                education_output += "<td>" + city + "</td>";
                education_output += "<td>" + province + "</td>";
                education_output += "<td>" + country + "</td>";
                education_output += "</tr>";
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
            education_output += "<tr>";
            education_output += "<td>" + school_name + "</td>";
            education_output += "<td>" + school_link + "</td>";
            education_output += "<td>" + degree + "</td>";
            education_output += "<td>" + major + "</td>";
            education_output += "<td>" + start_month + "</td>";
            education_output += "<td>" + start_year + "</td>";
            education_output += "<td>" + end_month + "</td>";
            education_output += "<td>" + end_year + "</td>";
            education_output += "<td>" + city + "</td>";
            education_output += "<td>" + province + "</td>";
            education_output += "<td>" + country + "</td>";
            education_output += "</tr>"; 

            $("#education_content_manage").html(education_output);
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
                working_output += "<tr>";
                working_output += "<td>" + position + "</td>";
                working_output += "<td>" + description + "</td>";
                working_output += "<td>" + company_name + "</td>";
                working_output += "<td>" + company_link + "</td>";
                working_output += "<td>" + start_date + "</td>";
                working_output += "<td>" + start_month + "</td>";
                working_output += "<td>" + start_year + "</td>";
                working_output += "<td>" + end_date + "</td>";
                working_output += "<td>" + end_month + "</td>";
                working_output += "<td>" + end_year + "</td>";
                working_output += "<td>" + city + "</td>";
                working_output += "<td>" + province + "</td>";
                working_output += "<td>" + country + "</td>";
                working_output += "</tr>";
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
            working_output += "<tr>";
            working_output += "<td>" + position + "</td>";
            working_output += "<td>" + description + "</td>";
            working_output += "<td>" + company_name + "</td>";
            working_output += "<td>" + company_link + "</td>";
            working_output += "<td>" + start_date + "</td>";
            working_output += "<td>" + start_month + "</td>";
            working_output += "<td>" + start_year + "</td>";
            working_output += "<td>" + end_date + "</td>";
            working_output += "<td>" + end_month + "</td>";
            working_output += "<td>" + end_year + "</td>";
            working_output += "<td>" + city + "</td>";
            working_output += "<td>" + province + "</td>";
            working_output += "<td>" + country + "</td>";
            working_output += "</tr>";

            $("#working_experience_content_manage").html(working_output);
        }
    });

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
                var lists_head = $(skills_curr).find('lists');
                var lists_head_children = $(lists_head).children();
                var lists_first = lists_head_children.first();
                var lists_curr = lists_first;
                var span = 0;
                while(!(lists_curr.is(lists_head_children.last()))) {
                    lists_curr = lists_curr.next();
                    span++;
                }
                span += 1;

                var i = 0;
                var lists_curr_2 = lists_first;
                while(!(lists_curr_2.is(lists_head_children.last()))) {
                    skills_output += "<tr>";
                    if(i == 0) {
                        skills_output += "<td rowspan='" + span + "'>" + name + "</td>";
                        skills_output += "<td rowspan='" + span + "'>" + description + "</td>";
                    }
                    skills_output += "<td>" + lists_curr_2.text() + "</td>";
                    skills_output += "</tr>";
                    i++;
                    lists_curr_2 = lists_curr_2.next();
                }
                skills_output += "<tr>";
                skills_output += "<td>" + lists_curr_2.text() + "</td>";
                skills_output += "</tr>";
                skills_curr = skills_curr.next();
            }
            var name = skills_curr.find('name').text();
            var description = skills_curr.find('description').text();
            var lists_head = $(skills_curr).find('lists');
            var lists_head_children = $(lists_head).children();
            var lists_first = lists_head_children.first();
            var lists_curr = lists_first;
            var span = 0;
            while(!(lists_curr.is(lists_head_children.last()))) {
                lists_curr = lists_curr.next();
                span++;
            }
            span += 1;

            var i = 0;
            var lists_curr_2 = lists_first;
            while(!(lists_curr_2.is(lists_head_children.last()))) {
                skills_output += "<tr>";
                if(i == 0) {
                    skills_output += "<td rowspan='" + span + "'>" + name + "</td>";
                    skills_output += "<td rowspan='" + span + "'>" + description + "</td>";
                }
                skills_output += "<td>" + lists_curr_2.text() + "</td>";
                skills_output += "</tr>";
                i++;
                lists_curr_2 = lists_curr_2.next();
            }
            skills_output += "<tr>";
            skills_output += "<td>" + lists_curr_2.text() + "</td>";
            skills_output += "</tr>";
            $("#skills_content_manage").html(skills_output);
        }
    });
});
