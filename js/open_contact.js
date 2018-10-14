$(document).ready(function(){
    $.ajax({        
        type: "GET",
        url: "xml/about.xml", 
        dataType: "xml",
        success: function(xmlDoc){
            var about = $(xmlDoc).find('about');
            var initial = $(about).find('initial').text();
            var name = $(about).find('name').text(); 
            $(".contact_initial").text(initial);
            $("#contact_name").text(name);
        }
    });
 
    $.ajax({
        type: "GET",
        url: "xml/contact.xml", 
        dataType: "xml",
        success: function(xmlDoc) {
            var contact = $(xmlDoc).find('contact');
            var media_head = $(contact).find('social_media');
            var media_head_children = $(media_head).children();
            var media_output = "<ul>";
            var media_curr = media_head_children.first();
            while(!(media_curr.is(media_head_children.last()))) {
                var link = $(media_curr).find('link').text();
                var icon = $(media_curr).find('icon').text();
                media_output += "<li><a href='" + link + "' target='_blank'><span class='icon'>";
                media_output += "<i class='" + icon +"'>"
                media_output += "</i></span></a></li>";   
                media_curr = media_curr.next();
            }
            var link = $(media_curr).find('link').text();
            var icon = $(media_curr).find('icon').text();
            media_output += "<li><a href='" + link + "' target='_blank'><span class='icon'>";
            media_output += "<i class='" + icon +"'>"
            media_output += "</i></span></a></li>";
            media_output += "</ul>";
            $("#social_media").html(media_output);
        }
    });

    $("#sender_submit").click(function(){
        //TODO temporary situation because of no SMTP installed
            var name = $("#sender_name").val();
            var email = $("#sender_email").val();
            var message = $("#sender_message").val();
            var timeLog = generateTimeNow();
            if(email != undefined && email != '') {
                //Taken from https://www.w3schools.com/js/tryit.asp?filename=tryjs_form_validate_email
                var atpos = email.indexOf("@");
                var dotpos = email.lastIndexOf(".");
                if (atpos < 1 || dotpos < (atpos + 2) || dotpos + 2 >= email.length) {
                    $("#sender_email").addClass("is-danger");
                    $("#wrong_email_format").show();
                } else {
                    if(message == undefined || message == '') {
                        $("#sender_message").addClass("is-danger");
                        $("#empty_message").show();
                    } else {
                        $.post("message_process.php",
                        {
                            name: name,
                            email: email,
                            message: message,
                            timeLog: timeLog
                        },
                        function(data, status){
                            if(data == "success") {
                                
                            } else {
                                
                            }
                        });
                    }
                }
            } else {
                email = '-';
                if(message == undefined || message == '') {
                    $("#sender_message").addClass("is-danger");
                    $("#empty_message").show();
                } else {
                    $.post("message_process.php",
                    {
                        name: name,
                        email: email,
                        message: message,
                        timeLog: timeLog
                    },
                    function(data, status){
                        if(data == "success") {
                           
                        } else {
                            
                        }
                    });
                }
            }  
    });

    $("#sender_message").keypress(function(){
        $("#sender_message").removeClass("is-danger");
        $("#empty_message").hide();
    });

    $("#sender_email").keypress(function(){
        $("#sender_email").removeClass("is-danger");
        $("#wrong_email_format").hide();
    });

    function generateTimeNow() {
        var dates = new Date();
        var datesString = dates.toString();
        var tempDates = datesString.split(" ");
        var time = tempDates[4];
        var tempTimeZone = tempDates.slice(5);
        var timeZone = tempTimeZone.join(" ");

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
        
        var fullDates = date + " " + month[monthNum] + " " + year + " " + time + " " + timeZone;
        return fullDates;
    }
});
