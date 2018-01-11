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
        $("#logout_warning_modal").show();
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
