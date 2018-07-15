$(document).ready(function(){
    $.ajax({        
        type: "GET",
        url: "xml/about.xml", 
        dataType: "xml",
        success: function(xmlDoc){
            var about = $(xmlDoc).find('about');
            var initial = $(about).find('initial').text();
            $(".login_initial").text(initial);
        }
    });

    $("#login_submit").click(function(){
        var username = $("#username").val();
        var password = $("#password").val();
        $("#username").removeClass("is-danger");
        $("#password").removeClass("is-danger");
        $("#username_not_existed").hide();
        $("#wrong_password").hide();
        if(username == undefined || username == '') {
            $("#username").addClass("is-danger");
            $("#username_empty").show();
            if(password == undefined || password == '') {
                $("#password").addClass("is-danger");
                $("#password_empty").show();
            } 
        } else if(password == undefined || password == '') {
            $("#password").addClass("is-danger");
            $("#password_empty").show();
        } else {
            $.post("login.php",
            {
                username: username,
                password: password
            },
            function(data, status){
                $("#password").val('');
                if(data == "error username") {
                    $("#username").addClass("is-danger");
                    $("#username_not_existed").show();
                } else if(data == "error password") {
                    $("#password").addClass("is-danger");
                    $("#wrong_password").show();
                } else {
                    $("#username").val('');
                    $("#login_modal").addClass("is-active");
                    $("#login_modal").show();
                }
            });
        }
    });

    $('#key_file[type="file"]').change(function(keyFile){
        $("#file_not_matched").hide();
        $("#wrong_file_type").hide();
        var fileName = keyFile.target.files[0].name;
        $("#key_file_name").text(fileName);
    });

    $("#keyUpload").on('submit',(function(e) {
        e.preventDefault();
        $.ajax({
            url: "key_process.php", 
            type: "POST",             
            data: new FormData(this), 
            contentType: false,       
            cache: false,            
            processData: false,        
            success: function(data) {
                switch(data) {
                    case 'wrong file type' :
                        $("#wrong_file_type").show();
                        break;
                    case 'not matched' :
                        $("#file_not_matched").show();
                        break;
                    default :
                        sessionStorage.loggedUser = data;
                        window.location.replace("index.html");
                }
            }
        });
    }));

    $("#username").keypress(function(){
        $("#username").removeClass("is-danger");
        $("#username_empty").hide();
        $("#username_not_existed").hide();
    });

    $("#password").keypress(function(){
        $("#password").removeClass("is-danger");
        $("#password_empty").hide();
        $("#wrong_password").hide();
    });

    $(".close_login_modal").click(function(){
        $("#login_modal").hide();
        $("#login_modal").removeClass("is-active");
    });
});

