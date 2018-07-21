$(document).ready(function(){
    /*
         Fill Content for Initial
    */
    $.ajax({        
        type: "GET",
        url: "xml/about.xml", 
        dataType: "xml",
        success: function(xmlDoc){
            var about = $(xmlDoc).find('about');
            var initial = $(about).find('initial').text();
            $(".manage_index_initial").text(initial);
        }
    });

    /*
        Fill Contents from works.xml
    */
    $.ajax({        
        type: "GET",
        url: "xml/works.xml", 
        dataType: "xml",
        success: function(xmlDoc){
            //Show Data inside Table
            var work_head = $(xmlDoc).find('works');
            var work_head_children = $(work_head).children();
            var work_output = "";
            var work_curr = work_head_children.last();
            var i = 1;
            while(!(work_curr.is(work_head_children.first()))) {
                var id = $(work_curr).attr('id');
                var name = $(work_curr).find('name').text();
                var purpose = $(work_curr).find('purpose').text();
                var role = $(work_curr).find('role').text();
                var description = $(work_curr).find('description').text();
                var type = $(work_curr).find('type').text();
                var date = $(work_curr).find('date').text();
                work_output += "<tr>";
                work_output += "<td>" + name + "</td>";
                work_output += "<td>" + purpose + "</td>";
                work_output += "<td>" + role + "</td>";
                work_output += "<td>" + description + "</td>";
                work_output += "<td>" + type + "</td>";
                work_output += "<td>" + date + "</td>";
                work_output += "<td>" + "<a id=\"" + i + "\" class=\"view_works_images button is-dark\"><i class=\"fa fa-image\"></i></a>" + "</td>";
                work_output += "</tr>";
                work_curr = work_curr.prev();
                i++;
            }
            var id = $(work_curr).attr('id');
            var name = $(work_curr).find('name').text();
            var purpose = $(work_curr).find('purpose').text();
            var role = $(work_curr).find('role').text();
            var description = $(work_curr).find('description').text();
            var type = $(work_curr).find('type').text();
            var date = $(work_curr).find('date').text();
            work_output += "<tr>";
            work_output += "<td>" + name + "</td>";
            work_output += "<td>" + purpose + "</td>";
            work_output += "<td>" + role + "</td>";
            work_output += "<td>" + description + "</td>";
            work_output += "<td>" + type + "</td>";
            work_output += "<td>" + date + "</td>";
            work_output += "<td>" + "<a id=\"" + i + "\" class=\"view_works_images button is-dark\"><i class=\"fa fa-image\"></i></a>" + "</td>";
            work_output += "</tr>";

            $("#home_content_manage").html(work_output);
        }
    });

    $.ajax({        
        type: "GET",
        url: "xml/works.xml", 
        dataType: "xml",
        success: function(xmlDoc){
            //Show Data inside Table
            var work_head = $(xmlDoc).find('works');
            var work_head_children = $(work_head).children();
            var work_output = "";
            var work_curr = work_head_children.last();
            var i = 1;
            while(!(work_curr.is(work_head_children.first()))) {
                work_output += "<div id='images-" + i + "' class=\"modal\"><div class=\"modal-background\"></div>";
                work_output += "<div class=\"modal-card\">";
                work_output += "<header class=\"modal-card-head\" style=\"word-wrap: break-word;\">"
                work_output += "<p class=\"modal-card-title\" style=\"word-wrap: break-word;\">Images for </p><h1>" + work_curr.find('name').text() + "</h1>";
                work_output += "<button id='close-" + i + "' class=\"delete close_works_images\" aria-label=\"close\"></button>"
                work_output += "</header>";
                work_output += "<section class=\"modal-card-body\">";

                var work_pictures = $(work_curr).find("pictures").children();
                var work_first = $(work_pictures).first();
                var work_details_pictures = $(work_pictures).first();
                work_output += "<ul>";
                while(!(work_details_pictures.is(work_pictures.last()))) {
                    work_output += "<li>";
                    work_output += "<figure class=\"image is-480x480\">";
                    work_output += "<img src='" + work_details_pictures.text() + "'>";
                    work_output += "</figure>";
                    if($(work_details_pictures).attr("status") == "main") {
                        work_output += "<article class=\"message is-primary\">";
                        work_output += "<div class=\"message-header\">";
                        work_output += "<div class=\"has-text-weight-bold\">Cover Picture</div>";
                        work_output += "</div></article>";
                    }
                    work_output += "</li><br>";
                    work_details_pictures = work_details_pictures.next();
                }
                work_details_pictures = $(work_pictures).last();
                work_output += "<li>";
                work_output += "<figure class=\"image is-480x480\">";
                work_output += "<img src='" + work_details_pictures.text() + "'>";
                work_output += "</figure>";
                if($(work_details_pictures).attr("status") == "main") {
                    work_output += "<article class=\"message is-primary\">";
                    work_output += "<div class=\"message-header\">";
                    work_output += "<div class=\"has-text-weight-bold\">Cover Picture</div>";
                    work_output += "</div></article>";
                }
                work_output += "</li>";
                work_output += "</ul>";

                work_output += "</section>";
                work_output += "<footer class=\"modal-card-foot\">";
                work_output += "</footer>";
                work_output += "</div></div>";
                work_curr = work_curr.prev();
                i++;
            }    
            work_output += "<div id='images-" + i + "' class=\"modal\"><div class=\"modal-background\"></div>";
            work_output += "<div class=\"modal-card\">";
            work_output += "<header class=\"modal-card-head\">"
            work_output += "<p class=\"modal-card-title\" style=\"word-wrap: break-word;\">Images for </p><h1>" + work_curr.find('name').text() + "</h1>";
            work_output += "<button id='close-" + i + "' class=\"delete close_works_images\" aria-label=\"close\"></button>"
            work_output += "</header>";
            work_output += "<section class=\"modal-card-body\">";

            var work_pictures = $(work_curr).find("pictures").children();
            var work_first = $(work_pictures).first();
            var work_details_pictures = $(work_pictures).first();
            work_output += "<ul>";
            while(!(work_details_pictures.is(work_pictures.last()))) {
                work_output += "<li>";
                work_output += "<figure class=\"image is-480x480\">";
                work_output += "<img src='" + work_details_pictures.text() + "'>";
                work_output += "</figure>";
                if($(work_details_pictures).attr("status") == "main") {
                    work_output += "<article class=\"message is-primary\">";
                    work_output += "<div class=\"message-header\">";
                    work_output += "<div class=\"has-text-weight-bold\">Cover Picture</div>";
                    work_output += "</div></article>";
                }
                work_output += "</li><br>";
                work_details_pictures = work_details_pictures.next();
            }
            work_details_pictures = $(work_pictures).last();
            work_output += "<li>";
            work_output += "<figure class=\"image is-480x480\">";
            work_output += "<img src='" + work_details_pictures.text() + "'>";
            work_output += "</figure>";
            if($(work_details_pictures).attr("status") == "main") {
                work_output += "<article class=\"message is-primary\">";
                work_output += "<div class=\"message-header\">";
                work_output += "<div class=\"has-text-weight-bold\">Cover Picture</div>";
                work_output += "</div></article>";
            }
            work_output += "</li>";
            work_output += "</ul>";
            
            work_output += "</section>";
            work_output += "<footer class=\"modal-card-foot\">";
            work_output += "</footer>";
            work_output += "</div></div>";

            $("#images_modal_list").html(work_output);
        }
    });  

    /*
        Show images for each work
    */
    $(document).on("click", ".view_works_images", function(){
      var id = $(this).attr('id');
      $("#images-" + id).fadeIn();
    });

    $(document).on("click", ".close_works_images", function(){
      var temp = $(this).attr('id').split('-');
      var id = temp[1];
      $("#images-" + id).hide();
    });

    /*
        Trigger function for show or hide create new work
    */
    $("#create_new_work_trigger").click(function(){
        $("#create_new_work_modal").addClass("is-active");
        $("#create_new_work_modal").show();
    });
    
    $(".close_create_new_work_modal").click(function(){
        $("#create_new_work_modal").removeClass("is-active");
        $("#create_new_work_modal").hide();
    });

    /*
        Create New Work
    */
    $("#createNewWork").on('submit',(function(e) {
        e.preventDefault();
        $.ajax({
            url: "upload_work_images.php", 
            type: "POST",             
            data: new FormData(this), 
            contentType: false,       
            cache: false,            
            processData: false,        
            success: function(data) {
                switch(data) {
                    case 'wrong cover picture filetype' :
                        $("#wrong_cover_picture_file_type").show();
                        break;
                    case 'wrong other pictures filetype' :
                        $("#wrong_other_pictures_file_type").show();
                        break;
                    default :
                        /*
                        sessionStorage.loggedUser = data;
                        window.location.replace("index.html");
                        */
                        alert("sukses");
                }
            }
        });
    }));

    $('#coverPicture[type="file"]').change(function(imageFile){
        $("#wrong_cover_picture_file_type").hide();
        var fileName = imageFile.target.files[0].name;
        $("#cover_picture_file_name").text(fileName);
    });


    $('#otherPictures[type="file"]').change(function(){
        $("#wrong_other_pictures_file_type").hide();
        alert(imagesFile.length);
        var filesName = "";
        for(var a = 0; a < imagesFile.length; a++) {
            filesName += imagesFile.target.file[a].name + ", ";
        }
        $("#other_pictures_file_name").text(filesName);
    });
   
    /*
    $('#otherPictures[type="file"]').live('change', function(){
        $("#wrong_other_pictures_file_type").hide();
        var filesName = "";
        for(var a = 0; a < this.files.length; a++) {
            filesName += this.files[a].name + ", ";
        }
        $("#other_pictures_file_name").text(filesName);
    }); */
});
