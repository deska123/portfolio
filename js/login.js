$(document).ready(function(){
    $("#login_submit").click(function(){
        var username = $("#username").val();
        var password = $("#password").val();
        if(username == undefined || username == '') {
            $("#username").addClass("is-danger");
            $("#username_empty").show();
            if(password == undefined || password == '') {
                $("#password").addClass("is-danger");
                $("#password_empty").show();
            } 
        } else {
            if(password == undefined || password == '') {
                $("#password").addClass("is-danger");
                $("#password_empty").show();
            }
        }
    });

    $("#username").keypress(function(){
        $("#username").removeClass("is-danger");
        $("#username_empty").hide();
    });

    $("#password").keypress(function(){
        $("#password").removeClass("is-danger");
        $("#password_empty").hide();
    });
});