$(document).ready(function(){
    $("#login_link").show();
    $("#logout_link").hide();

    if(typeof(Storage) !== "undefined") {
        if(sessionStorage.loggedUser != undefined) {
            var pagePath = window.location.pathname;
            var temp = pagePath.split("/"); 
            if(temp[temp.length - 1] == 'login.html') {
                window.location.assign("index.html");
            }
            $("#login_link").hide();
            $("#logout_link").show();

            //TODO after a user is logged on
        } 
    } else {
        alert("Login is not available in this browser");
    }

    $("#logout_link").click(function(){
        sessionStorage.clear();
        $("#login_modal").show();
        $("#logout_link").hide();
        window.location.assign("index.html");
    });
});