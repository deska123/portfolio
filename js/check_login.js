$(document).ready(function(){
    $("#login_link").show();
    $("#logout_warning").hide();

    var date = new Date();
    var year = date.getFullYear();
    $("#copyright_year").text(year);

    if(typeof(Storage) !== "undefined") {
        if(sessionStorage.loggedUser != undefined) {
            var pagePath = window.location.pathname;
            var temp = pagePath.split("/");
            if(temp[temp.length - 1] == 'login.html') {
                window.location.assign("index.html");
            }
            $("#login_link").hide();
            $("#logout_warning").show();

            $("#index_management").show();
            $("#about_management").show();
            $("#contact_management").show();
            
            if(sessionStorage.skillsSize == undefined && sessionStorage.worksSize == undefined && sessionStorage.jobsSize == undefined && sessionStorage.mediaSize == undefined && sessionStorage.educationsSize == undefined) {
                $.ajax({
                    type: "GET",
                    url: "xml/skills.xml", 
                    dataType: "xml",
                    success: function(xmlDoc){
                        var skills_head = $(xmlDoc).find('skills');
                        var skills_head_children = $(skills_head).children();
                        var skills_last = skills_head_children.last();
                        sessionStorage.skillsSize = $(skills_last).attr("id");
                    }
                });
                $.ajax({
                    type: "GET",
                    url: "xml/works.xml", 
                    dataType: "xml",
                    success: function(xmlDoc){
                        var works_head = $(xmlDoc).find('works');
                        var works_head_children = $(works_head).children();
                        var works_last = works_head_children.last();
                        sessionStorage.worksSize = $(works_last).attr("id");
                    }
                });
                $.ajax({
                    type: "GET",
                    url: "xml/job_experience.xml", 
                    dataType: "xml",
                    success: function(xmlDoc){
                        var job_experience_head = $(xmlDoc).find('job_experience');
                        var job_experience_head_children = $(job_experience_head).children();
                        var job_experience_last = job_experience_head_children.last();
                        sessionStorage.jobsSize = $(job_experience_last).attr("id");
                    }
                });
                $.ajax({
                    type: "GET",
                    url: "xml/contact.xml", 
                    dataType: "xml",
                    success: function(xmlDoc){
                        var contact_head = $(xmlDoc).find('contact');
                        var media_head = $(contact_head).find('social_media');
                        var media_head_children = $(media_head).children();
                        var media_last = media_head_children.last();
                        sessionStorage.mediaSize = $(media_last).attr("id");
                    }
                });
                $.ajax({
                    type: "GET",
                    url: "xml/about.xml", 
                    dataType: "xml",
                    success: function(xmlDoc){
                        var about = $(xmlDoc).find('about');
                        var education_head = $(about).find('educations');
                        var education_head_children = $(education_head).children();
                        var education_last = education_head_children.last();
                        sessionStorage.educationsSize = $(education_last).attr("id");
                    }
                });
            }
        } else {
            var pagePath = window.location.pathname;
            var temp = pagePath.split("/");
            var current = temp[temp.length - 1];
            if(current == 'manage_about.html' || current == 'manage_index.html' || current == 'manage_contact.html') {
                window.location.assign("index.html");
            }
        }
    } else {
        alert("Login is not available in this browser");
    }

    $("#logout_warning").click(function(){
        $("#logout_warning_modal").fadeIn();
    });

    $(".close_logout_warning_modal").click(function(){
      $("#logout_warning_modal").hide();
    });

    $("#logout_link").click(function(){
        sessionStorage.clear();
        $("#login_modal").show();
        $("#logout_link").hide();
        $("#index_management").hide();
        $("#about_management").hide();
        $("#contact_management").hide();
        window.location.assign("index.html");
    });
});
