$(document).ready(function(){
    //Initial Variable
    var deletedId = "";

    /*
        Retrieve Data of Identity Part
    */
    var initial = "";
    var name = "";
    var quote = "";
    var motto = "";
    var occupation = "";
    var location = "";
    $.ajax({
        type: "GET",
        url: "xml/about.xml",
        dataType: "xml",
        success: function(xmlDoc){
            var about = $(xmlDoc).find('about');

            //Show Last Updated
            var lastUpdate = about.attr("lastUpdate");
            $(".lastUpdated").text("(Last Updated on : " + lastUpdate + ")");

            initial = $(about).find('initial').text();
            name = $(about).find('name').text();
            quote = $(about).find('quote').text();
            motto = $(about).find('motto').text();
            occupation = $(about).find('occupation').text();
            location = $(about).find('location').text();
        }
    });

    /*
        Open and Close Modal
    */
    $("#create_new_education_trigger").click(function(){
        $("#create_new_education_modal").addClass("is-active");
        $("#create_new_education_modal").show();
    });

    $(".close_create_new_education_modal").click(function(){
        $("#create_new_education_modal").removeClass("is-active");
        $("#create_new_education_modal").hide();
    });

    $("#create_new_working_experience_trigger").click(function(){
        $("#create_new_working_experience_modal").show();
    });

    $(".close_create_new_working_experience_modal").click(function(){
        $("#create_new_working_experience_modal").hide();
    });

    $("#create_new_skill_trigger").click(function(){
        $("#create_new_skill_modal").show();
    });

    $(".close_create_new_skill_modal").click(function(){
        $("#create_new_skill_modal").hide();
    });

    $(".close_edit_name_modal").click(function(){
        $("#edit_name_modal").hide();
    });

    $(".close_edit_initial_modal").click(function(){
        $("#edit_initial_modal").hide();
    });

    $(".close_edit_occupation_modal").click(function(){
        $("#edit_occupation_modal").hide();
    });

    $(".close_edit_quote_modal").click(function(){
        $("#edit_quote_modal").hide();
    });

    $(".close_edit_motto_modal").click(function(){
        $("#edit_motto_modal").hide();
    });

    $(".close_edit_location_modal").click(function(){
        $("#edit_location_modal").hide();
    });

    $(".close_delete_education_modal").click(function(){
        $("#delete_education_modal").hide();
    });

    $(".close_delete_job_experience_modal").click(function(){
        $("#delete_job_experience_modal").hide();
    });

    $('body').on('click', '.identity_edit', function (){
        var id = $(this).attr('id').split("_");
        var field = id[0];
        if(field == "name") {
            $("#edit_name_modal").show();
            $("#name").val(name);
        } else if(field == "initial") {
            $("#edit_initial_modal").show();
            $("#initial").val(initial);
        } else if(field == "occupation") {
            $("#edit_occupation_modal").show();
            $("#occupation").val(occupation);
        } else if(field == "quote") {
            $("#edit_quote_modal").show();
            $("#quote").val(quote);
        } else if(field == "motto") {
            $("#edit_motto_modal").show();
            $("#motto").val(motto);
        } else if(field == "location") {
            $("#edit_location_modal").show();
            $("#location").val(location);
        }
    });

    $('body').on('click', '.education_delete', function (){
        var id = $(this).attr('id');
        $(".education_id_text").text("ID : " + id);
        $(".education_delete_id_confirm").attr("id", "education_delete_" + id);
        $("#delete_education_modal").show();
    });

    $('body').on('click', '.job_experience_delete', function (){
        var id = $(this).attr('id');
        $(".job_experience_id_text").text("ID : " + id);
        $(".job_experience_delete_id_confirm").attr("id", "job_experience_delete_" + id);
        $("#delete_job_experience_modal").show();
    });

    /*
        Other Functions or Triggers
    */
    function decreaseEachId(id) {
        $('.dynamicList').each(function() {
          var currTemp = $(this).attr('id').split("-");
          var currId = currTemp[1];
          if(parseInt(currId) > parseInt(id)) {
            var newId = parseInt(currId) - 1;
            $(this).attr('id', 'dynamicList-' + newId);
            $(this).find('.deleteDynamicList').attr('id', 'deleteDynamicList-' + newId);
          }
        });
        $("#dynamicList-" + id).remove();
    }

    $("#addDynamicList").click(function() {
      if($(".dynamicList").length > 0) {
        var listCount = 0;
        $(".dynamicList").each(function() {
          listCount++;
        });
        $("#dynamicListContainer").append(
          "<div id=\"dynamicList-" + (listCount + 1) + "\" class=\"field has-addons dynamicList\">" +
            "<div class=\"control is-expanded\">" +
              "<input class=\"input\" type=\"text\" placeholder=\"Find a repository\">" +
            "</div>" +
            "<div class=\"control\">" +
                "<a id=\"deleteDynamicList-" + (listCount + 1) + "\" class=\"button is-danger deleteDynamicList\">X</a>" +
            "</div>" +
         "</div>"
       );
      } else {
        $("#dynamicListContainer").append(
          "<div id=\"dynamicList-1\" class=\"field has-addons dynamicList\">" +
            "<div class=\"control is-expanded\">" +
              "<input class=\"input\" type=\"text\" placeholder=\"Find a repository\">" +
            "</div>" +
            "<div class=\"control\">" +
                "<a id=\"deleteDynamicList-1\" class=\"button is-danger deleteDynamicList\">X</a>" +
            "</div>" +
         "</div>"
       );
      }
    });

    $('body').on('click', '.deleteDynamicList', function (){
        var temp = $(this).attr('id').split("-");
        var id = temp[1];
        decreaseEachId(id);
    });

    $("#start_time").change(function(){
        var startTime = $("#start_time").val();
        if(startTime != undefined && startTime != '') {
            var startDate = new Date(startTime);
            startDate = startDate.setDate(startDate.getDate() + 1);
            var newDate = String(new Date(startDate));
            var tempDate = newDate.split(" ");
            var modifiedDate = tempDate[3] + "-" + stringToNumMonth(tempDate[1]) + "-" + tempDate[2];
            $("#end_time").attr("min", modifiedDate);
        } else {
            $("#end_time").attr("min", "");
        }
    });

    $("#end_time").change(function(){
        var endTime = $("#end_time").val();
        if(endTime != undefined && endTime != '') {
            var endDate = new Date(endTime);
            endDate = endDate.setDate(endDate.getDate() - 1);
            var newDate = String(new Date(endDate));
            var tempDate = newDate.split(" ");
            var modifiedDate = tempDate[3] + "-" + stringToNumMonth(tempDate[1]) + "-" + tempDate[2];
            $("#start_time").attr("max", modifiedDate);
        } else {
            $("#start_time").attr("max", "");
        }
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

    $("#still_working").change(function() {
        if($("#still_working").prop("checked")) {
            $('#working_end_time').val('');
            $("#working_end_time").prop("disabled", true);
        } else {
            $("#working_end_time").prop("disabled", false);
        }
    });

    $("#working_start_time").change(function(){
        var startTime = $("#working_start_time").val();
        $("#working_end_time").attr("min", startTime);
    });

    $("#working_end_time").change(function(){
        var endTime = $("#working_end_time").val();
        $("#working_start_time").attr("max", endTime);
    });

    function updateXML(typeInput, dataInput, hrefInput) {
        $.post("data_management.php",
        {
            type: typeInput,
            data: dataInput
        },
        function(data, status){
            setTimeout(function(){
                //window.location.href = hrefInput;
                window.location.reload(true);
            }, 20);
        });
    }

    function generateTimeNow() {
        var dates = new Date();
        var minute = dates.getMinutes();
        var hour = dates.getHours();
        var year = dates.getFullYear();
        var monthNum = dates.getMonth();
        var date = dates.getDate();

        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";

        var fullDates = date + " " + month[monthNum] + " " + year + " " + hour + "." + minute;
        return fullDates;
    }

    function updateLastUpdateAbout(xmlDoc) {
        var aboutNode = xmlDoc.getElementsByTagName("about")[0];
        aboutNode.setAttribute("lastUpdate", generateTimeNow());
    }

    /*
        Create New Part
    */
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

                updateLastUpdateAbout(xmlDoc);

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

                var data = new XMLSerializer().serializeToString(xmlDoc.documentElement);
                updateXML("about", data, "#manage_working_experience_title");
            }
        };
    });

    $("#create_new_working_experience_button").click(function(){
        var position = $("#position").val();
        var company_name = $("#company_name").val();
        var company_link = $("#company_link").val();
        var working_start_time = $("#working_start_time").val();
        var working_end_time = $("#working_end_time").val();

        var working_start_temp = working_start_time.split("-");
        var working_start_date = working_start_temp[2];
        var working_start_month = numToStringMonth(working_start_temp[1]);
        var working_start_year = working_start_temp[0];
        if(working_end_time != "" && working_end_time != undefined) {
            var working_end_temp = working_end_time.split("-");
            var working_end_date = working_end_temp[2];
            var working_end_month = numToStringMonth(working_end_temp[1]);
            var working_end_year = working_end_temp[0];
        } else {
            var working_end_date = "-";
            var working_end_month = "-";
            var working_end_year = "-";
        }
        var city = $("#working_city").val();
        var province = $("#working_province").val();
        var country = $("#working_country").val();
        var description = $("#working_description").val();

        var xmlhttp;
        if(window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.open("GET", "xml/job_experience.xml", true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var xmlDoc = this.responseXML;
                var temp = parseInt(sessionStorage.jobsSize);
                temp += 1;
                sessionStorage.jobsSize = temp;

                var jobExperienceNode = xmlDoc.getElementsByTagName("job_experience")[0];
                jobExperienceNode.setAttribute("lastUpdate", generateTimeNow());

                var jobNode = xmlDoc.createElement("job");
                var idAttr = xmlDoc.createAttribute("id");
                idAttr.nodeValue = sessionStorage.jobsSize;
                jobNode.setAttributeNode(idAttr);

                var positionNode = xmlDoc.createElement("position");
                var positionText = xmlDoc.createTextNode(position);
                positionNode.appendChild(positionText)
                jobNode.appendChild(positionNode);

                var companyNameNode = xmlDoc.createElement("company_name");
                var companyNameText = xmlDoc.createTextNode(company_name);
                companyNameNode.appendChild(companyNameText)
                jobNode.appendChild(companyNameNode);

                var companyLinkNode = xmlDoc.createElement("company_link");
                var companyLinkText = xmlDoc.createTextNode(company_link);
                companyLinkNode.appendChild(companyLinkText)
                jobNode.appendChild(companyLinkNode);

                var startDateNode = xmlDoc.createElement("start_date");
                var startDateText = xmlDoc.createTextNode(working_start_date);
                startDateNode.appendChild(startDateText)
                jobNode.appendChild(startDateNode);

                var startMonthNode = xmlDoc.createElement("start_month");
                var startMonthText = xmlDoc.createTextNode(working_start_month);
                startMonthNode.appendChild(startMonthText)
                jobNode.appendChild(startMonthNode);

                var startYearNode = xmlDoc.createElement("start_year");
                var startYearText = xmlDoc.createTextNode(working_start_year);
                startYearNode.appendChild(startYearText)
                jobNode.appendChild(startYearNode);

                var endDateNode = xmlDoc.createElement("end_date");
                var endDateText = xmlDoc.createTextNode(working_end_date);
                endDateNode.appendChild(endDateText)
                jobNode.appendChild(endDateNode);

                var endMonthNode = xmlDoc.createElement("end_month");
                var endMonthText = xmlDoc.createTextNode(working_end_month);
                endMonthNode.appendChild(endMonthText)
                jobNode.appendChild(endMonthNode);

                var endYearNode = xmlDoc.createElement("end_year");
                var endYearText = xmlDoc.createTextNode(working_end_year);
                endYearNode.appendChild(endYearText)
                jobNode.appendChild(endYearNode);

                var cityNode = xmlDoc.createElement("city");
                var cityText = xmlDoc.createTextNode(city);
                cityNode.appendChild(cityText)
                jobNode.appendChild(cityNode);

                var provinceNode = xmlDoc.createElement("province");
                var provinceText = xmlDoc.createTextNode(province);
                provinceNode.appendChild(provinceText)
                jobNode.appendChild(provinceNode);

                var countryNode = xmlDoc.createElement("country");
                var countryText = xmlDoc.createTextNode(country);
                countryNode.appendChild(countryText)
                jobNode.appendChild(countryNode);

                var descriptionNode = xmlDoc.createElement("description");
                var descriptionText = xmlDoc.createTextNode(description);
                descriptionNode.appendChild(descriptionText)
                jobNode.appendChild(descriptionNode);

                jobExperienceNode.appendChild(jobNode);

                var data = new XMLSerializer().serializeToString(xmlDoc.documentElement);
                updateXML("job_experience", data, "#manage_working_experience_title");
            }
        };
    });

    /*
        Edit Part
    */
    $('body').on('click', '.edit_submit', function (){
        var id = $(this).attr('id').split("_");
        var field = id[1];
        if(field == "name") {
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

                    updateLastUpdateAbout(xmlDoc);

                    var nameNode = xmlDoc.getElementsByTagName("name")[0].childNodes[0];
                    nameNode.nodeValue = $("#name").val();
                    var data = new XMLSerializer().serializeToString(xmlDoc.documentElement);
                    updateXML("about", data, "#manage_personal_identity_title");
                }
            };
        } else if(field == "initial") {
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

                    updateLastUpdateAbout(xmlDoc);

                    var initialNode = xmlDoc.getElementsByTagName("initial")[0].childNodes[0];
                    initialNode.nodeValue = $("#initial").val();
                    var data = new XMLSerializer().serializeToString(xmlDoc.documentElement);
                    updateXML("about", data, "#manage_personal_identity_title");
                }
            };
        } else if(field == "occupation") {
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

                    updateLastUpdateAbout(xmlDoc);

                    var occupationNode = xmlDoc.getElementsByTagName("occupation")[0].childNodes[0];
                    occupationNode.nodeValue = $("#occupation").val();
                    var data = new XMLSerializer().serializeToString(xmlDoc.documentElement);
                    updateXML("about", data, "#manage_personal_identity_title");
                }
            };
        } else if(field == "quote") {
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

                    updateLastUpdateAbout(xmlDoc);

                    var quoteNode = xmlDoc.getElementsByTagName("quote")[0].childNodes[0];
                    quoteNode.nodeValue = $("#quote").val();
                    var data = new XMLSerializer().serializeToString(xmlDoc.documentElement);
                    updateXML("about", data, "#manage_personal_identity_title");
                }
            };
        } else if(field == "motto") {
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

                    updateLastUpdateAbout(xmlDoc);


                    var mottoNode = xmlDoc.getElementsByTagName("motto")[0].childNodes[0];
                    mottoNode.nodeValue = $("#motto").val();
                    var data = new XMLSerializer().serializeToString(xmlDoc.documentElement);
                    updateXML("about", data, "#manage_personal_identity_title");
                }
            };
        } else if(field == "location") {
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

                    updateLastUpdateAbout(xmlDoc);

                    var locationNode = xmlDoc.getElementsByTagName("location")[0].childNodes[0];
                    locationNode.nodeValue = $("#location").val();
                    var data = new XMLSerializer().serializeToString(xmlDoc.documentElement);
                    updateXML("about", data, "#manage_personal_identity_title");
                }
            };
        }
    });

    /*
        Delete Part
    */
    $('body').on('click', '.education_delete_id_confirm', function (){
        var temp = $(this).attr('id').split("_");
        deletedId = temp[2];
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

                updateLastUpdateAbout(xmlDoc);

                var temp2 = parseInt(sessionStorage.educationsSize);
                temp2 -= 1;
                sessionStorage.educationsSize = temp2;
                var educationNode = xmlDoc.getElementsByTagName("education");
                var lastIndex = 0;
                for(var a = 0; a < educationNode.length; a++) {
                    if(educationNode[a].getAttribute('id') == deletedId) {
                        if(a == (educationNode.length - 1)) {
                            lastIndex = 1;
                        }
                        educationNode[a].parentNode.removeChild(educationNode[a]);
                        break;
                    }
                }
                //Decrement id of each node
                var educationNewNode = xmlDoc.getElementsByTagName("education");
                if(lastIndex == 0) {
                    for(var b = 0; b < educationNewNode.length; b++) {
                        var id = parseInt(educationNewNode[b].getAttribute('id'));
                        if(id != (b + 1)) {
                            var newId = id - 1;
                            educationNewNode[b].setAttribute("id", newId + "");
                        }
                    }
                }
                deletedId = "";
                var data = new XMLSerializer().serializeToString(xmlDoc.documentElement);
                updateXML("about", data, "#manage_education_title");
            }
        };
    });

    $('body').on('click', '.job_experience_delete_id_confirm', function (){
        var temp = $(this).attr('id').split("_");
        deletedId = temp[3];
        var xmlhttp;
        if(window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.open("GET", "xml/job_experience.xml", true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var xmlDoc = this.responseXML;

                var jobExperienceNode = xmlDoc.getElementsByTagName("job_experience")[0];
                jobExperienceNode.setAttribute("lastUpdate", generateTimeNow());

                var temp2 = parseInt(sessionStorage.jobsSize);
                temp2 -= 1;
                sessionStorage.jobsSize = temp2;
                var workNode = xmlDoc.getElementsByTagName("job");
                var lastIndex = 0;
                for(var a = 0; a < workNode.length; a++) {
                    if(workNode[a].getAttribute('id') == deletedId) {
                        if(a == (workNode.length - 1)) {
                            lastIndex = 1;
                        }
                        workNode[a].parentNode.removeChild(workNode[a]);
                        break;
                    }
                }
                //Decrement id of each node
                var workNewNode = xmlDoc.getElementsByTagName("job");
                if(lastIndex == 0) {
                    for(var b = 0; b < workNewNode.length; b++) {
                        var id = parseInt(workNewNode[b].getAttribute('id'));
                        if(id != (b + 1)) {
                            var newId = id - 1;
                            workNewNode[b].setAttribute("id", newId + "");
                        }
                    }
                }
                deletedId = "";
                var data = new XMLSerializer().serializeToString(xmlDoc.documentElement);
                updateXML("job_experience", data, "#manage_working_experience_title");
            }
        };
    });

    /*
        Fill Contents from about.xml
    */
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
            $("#name_action").html("<span id=\"name_edit\" style=\"cursor: pointer;\" class=\"icon identity_edit\"><i class=\"fa fa-pencil fa-2x\"></i></span>");
            $("#initial_action").html("<span id=\"initial_edit\" style=\"cursor: pointer;\" class=\"icon identity_edit\"><i class=\"fa fa-pencil fa-2x\"></i></span>");
            $("#occupation_action").html("<span id=\"occupation_edit\" style=\"cursor: pointer;\" class=\"icon identity_edit\"><i class=\"fa fa-pencil fa-2x\"></i></span>");
            $("#quote_action").html("<span id=\"quote_edit\" style=\"cursor: pointer;\" class=\"icon identity_edit\"><i class=\"fa fa-pencil fa-2x\"></i></span>");
            $("#motto_action").html("<span id=\"motto_edit\" style=\"cursor: pointer;\" class=\"icon identity_edit\"><i class=\"fa fa-pencil fa-2x\"></i></span>");
            $("#location_action").html("<span id=\"location_edit\" style=\"cursor: pointer;\" class=\"icon identity_edit\"><i class=\"fa fa-pencil fa-2x\"></i></span>");

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
                var id = $(education_curr).attr('id');
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
                education_output += "<td>" + "<span id=\"" + id + "\" style=\"cursor: pointer;\" class=\"icon education_delete\"><i class=\"fa fa-trash fa-2x\"></i></span>" + "</td>";
                education_output += "</tr>";
                education_curr = education_curr.prev();
            }
            var id = $(education_curr).attr('id');
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
            education_output += "<td>" + "<span id=\"" + id + "\" style=\"cursor: pointer;\" class=\"icon education_delete\"><i class=\"fa fa-trash fa-2x\"></i></span>" + "</td>";
            education_output += "</tr>";

            $("#education_content_manage").html(education_output);
        }
    });

    /*
        Fill Contents from job_experience.xml
    */
    $.ajax({
        type: "GET",
        url: "xml/job_experience.xml",
        dataType: "xml",
        success: function(xmlDoc){
            var job_experience_head = $(xmlDoc).find('job_experience');

            //update time
            var lastUpdate = job_experience_head.attr("lastUpdate");
            $(".workLastUpdated").text("(Last Updated on : " + lastUpdate + ")");

            var job_experience_head_children = $(job_experience_head).children();
            var working_output = "";
            var job_experience_curr = job_experience_head_children.last();
            while(!(job_experience_curr.is(job_experience_head_children.first()))) {
                var id = $(job_experience_curr).attr('id');
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
                working_output += "<td>" + "<span id=\"" + id + "\" style=\"cursor: pointer;\" class=\"icon job_experience_delete\"><i class=\"fa fa-trash fa-2x\"></i></span>" + "</td>";
                working_output += "</tr>";
                job_experience_curr = job_experience_curr.prev();
            }
            var id = $(job_experience_curr).attr('id');
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
            working_output += "<td>" + "<span id=\"" + id + "\" style=\"cursor: pointer;\" class=\"icon job_experience_delete\"><i class=\"fa fa-trash fa-2x\"></i></span>" + "</td>";
            working_output += "</tr>";

            $("#working_experience_content_manage").html(working_output);
        }
    });

    /*
        Fill Contents from skills.xml
    */
    $.ajax({
        type: "GET",
        url: "xml/skills.xml",
        dataType: "xml",
        success: function(xmlDoc){
            var skills_head = $(xmlDoc).find('skills');

            //update time
            var lastUpdate = skills_head.attr("lastUpdate");
            $(".skillsLastUpdated").text("(Last Updated on : " + lastUpdate + ")");

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
