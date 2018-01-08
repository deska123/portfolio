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
                media_output += "<li><a href='" + link + "'><span class='icon'>";
                media_output += "<i class='" + icon +"'>"
                media_output += "</i></span></a></li>";   
                media_curr = media_curr.next();
            }
            var link = $(media_curr).find('link').text();
            var icon = $(media_curr).find('icon').text();
            media_output += "<li><a href='" + link + "'><span class='icon'>";
            media_output += "<i class='" + icon +"'>"
            media_output += "</i></span></a></li>";
            media_output += "</ul>";
            $("#social_media").html(media_output);
        }
    });

    $("#sender_submit").click(function(){
        var name = $("#sender_name").val();
        var email = $("#sender_email").val();
        var message = $("#sender_message").val();
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
                        message: message
                    },
                    function(data, status){
                        alert(data);
                    });
                }
            }
        } else {
            if(message == undefined || message == '') {
                $("#sender_message").addClass("is-danger");
                $("#empty_message").show();
            } else {
                $.post("message_process.php",
                {
                    name: name,
                    email: email,
                    message: message
                },
                function(data, status){
                    alert(data);
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
});
