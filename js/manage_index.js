$(document).ready(function(){
    //Initial Variable
    var deletedId = "";

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
            var work_head = $(xmlDoc).find('works');

            //Show Last Updated
            var lastUpdate = work_head.attr("lastUpdate");
            $("#lastUpdated").text("(Last Updated on : " + lastUpdate + ")");

            //Show Data inside Table
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
                work_output += "<td>";
                work_output += "<span id=\"" + id + "\" style=\"cursor: pointer;\" class=\"icon work_delete\"><i class=\"fa fa-trash fa-2x\"></i></span>&nbsp;&nbsp;";
                work_output += "<span id=\"edit_" + id + "\" style=\"cursor: pointer;\" class=\"icon work_edit\"><i class=\"fa fa-pencil fa-2x\"></i></span>";
                work_output += "</td>";
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
            work_output += "<td>";
            work_output += "<span id=\"" + id + "\" style=\"cursor: pointer;\" class=\"icon work_delete\"><i class=\"fa fa-trash fa-2x\"></i></span>&nbsp;&nbsp;";
            work_output += "<span id=\"edit_" + id + "\" style=\"cursor: pointer;\" class=\"icon work_edit\"><i class=\"fa fa-pencil fa-2x\"></i></span>";
            work_output += "</td>";            work_output += "</tr>";

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
                        work_output += "<article class=\"message is-dark\">";
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
                    work_output += "<article class=\"message is-dark\">";
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
                    work_output += "<article class=\"message is-dark\">";
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
                work_output += "<article class=\"message is-dark\">";
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
        $("#create_new_work_modal").fadeIn();
    });

    $(".close_create_new_work_modal").click(function(){
        $("#create_new_work_modal").find("input[id!='submit_create_new_work']").val("");
        $("#create_new_work_modal").find("textarea").val("");
        $("#create_new_work_modal").find("#cover_picture_file_name").text("");
        $("#create_new_work_modal").find("#coverPicturePreview").prop("src", "");
        $("#create_new_work_modal").find("#wrong_cover_picture_file_type").hide();
        $("#create_new_work_modal").find("#other_pictures_count").text("");
        $("#create_new_work_modal").find("#otherPicturesPreview").html("");
        $("#create_new_work_modal").fadeOut();
    });

    $(".close_delete_work_modal").click(function(){
        $("#delete_work_modal").removeClass("is-active");
    });

    $(".close_edit_work_modal").click(function(){
        $("#edit_work_modal").removeClass("is-active");
        $("#edit_work_modal").hide();
    });

    $('body').on('click', '.work_delete', function (){
        var id = $(this).attr('id');
        $(".work_id_text").text("ID : " + id);
        $(".work_delete_id_confirm").attr("id", "work_delete_" + id);
        $("#delete_work_modal").addClass("is-active");
    });

    $('body').on('click', '.work_edit', function (){
        var temp = $(this).attr('id').split("_");
        var editedId = temp[1];
        var xmlhttp;
        if(window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.open("GET", "xml/works.xml", true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var xmlDoc = this.responseXML;

                var workNode = xmlDoc.getElementsByTagName("work");

                for(var a = 0; a < workNode.length; a++) {
                    if(workNode[a].getAttribute('id') == editedId) {
                        $("#edit_name").val(workNode[a].getElementsByTagName("name")[0].innerHTML);
                        $("#edit_purpose").val(workNode[a].getElementsByTagName("purpose")[0].innerHTML);
                        $("#edit_role").val(workNode[a].getElementsByTagName("role")[0].innerHTML);
                        $("#edit_description").val(workNode[a].getElementsByTagName("description")[0].innerHTML);
                        $("#edit_type").val(workNode[a].getElementsByTagName("type")[0].innerHTML);

                        var monthYear = workNode[a].getElementsByTagName("date")[0].innerHTML.split(" ");
                        var dummyFullDate = monthYear[1] + "-" + stringToNumMonth(monthYear[0]) + "-10";
                        $("#edit_workingDate").val(dummyFullDate);

                        $(".edit_work_button").attr("id", "edit_work_confirm_" + editedId);
                        break;
                    }
                }
            }
        };
        $("#edit_work_modal").show();
    });

    /*
        Edit Work
    */
    $('body').on('click', '.edit_work_button', function (){
        var temp = $(this).attr('id').split("_");

        var id = temp[3];
        var edited_name = $("#edit_name").val();
        var edited_purpose = $("#edit_purpose").val();
        var edited_role = $("#edit_role").val();
        var edited_description = $("#edit_description").val();
        var edited_type = $("#edit_type").val();
        var date = $("#edit_workingDate").val();
        var date_temp = date.split("-");
        var edited_month = numToStringMonth(date_temp[1]);
        var edited_year = date_temp[0];

        var xmlhttp;
        if(window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.open("GET", "xml/works.xml", true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var xmlDoc = this.responseXML;

                var worksNode = xmlDoc.getElementsByTagName("works")[0];
                worksNode.setAttribute("lastUpdate", generateTimeNow());

                var workNode = xmlDoc.getElementsByTagName("work");

                for(var a = 0; a < workNode.length; a++) {
                    if(workNode[a].getAttribute('id') == id) {
                        var nameNode = workNode[a].getElementsByTagName("name")[0].childNodes[0];
                        nameNode.nodeValue = edited_name;

                        var purposeNode = workNode[a].getElementsByTagName("purpose")[0].childNodes[0];
                        purposeNode.nodeValue = edited_purpose;

                        var roleNode = workNode[a].getElementsByTagName("role")[0].childNodes[0];
                        roleNode.nodeValue = edited_role;

                        var descriptionNode = workNode[a].getElementsByTagName("description")[0].childNodes[0];
                        descriptionNode.nodeValue = edited_description;

                        var typeNode = workNode[a].getElementsByTagName("type")[0].childNodes[0];
                        typeNode.nodeValue = edited_type;

                        var dateNode = workNode[a].getElementsByTagName("date")[0].childNodes[0];
                        dateNode.nodeValue = edited_month + " " + edited_year;

                        break;
                    }
                }

                var dataInput = new XMLSerializer().serializeToString(xmlDoc.documentElement);
                var typeInput = "works";
                $.post("data_management.php",
                {
                    type: typeInput,
                    data: dataInput
                },
                function(data, status){
                    if(status == 'success') {
                        setTimeout(function(){
                            window.location.reload(true);
                        }, 30);
                    }
                });
            }
        };
    });

    /*
        Create New Work
    */
    $("#createNewWork").on('submit',(function(e) {
        e.preventDefault();
        var temp = parseInt(sessionStorage.worksSize);
        temp += 1;
        var form_data = new FormData(this);
        form_data.append('number', temp);
        e.preventDefault();
        $.ajax({
            url: "upload_work_images.php",
            type: "POST",
            data: form_data,
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
                        var name = $("#name").val();
                        var purpose = $("#purpose").val();
                        var role = $("#role").val();
                        var description = $("#description").val();
                        var type = $("#type").val();
                        var date = $("#workingDate").val();
                        var date_temp = date.split("-");
                        var month = numToStringMonth(date_temp[1]);
                        var year = date_temp[0];
                        var pictures = data.split("|");
                        var picturesLength = pictures.length;

                        var xmlhttp;
                        if(window.XMLHttpRequest) {
                            xmlhttp = new XMLHttpRequest();
                        } else {
                            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                        }
                        xmlhttp.open("GET", "xml/works.xml", true);
                        xmlhttp.send();
                        xmlhttp.onreadystatechange = function() {
                            if (this.readyState == 4 && this.status == 200) {
                                var xmlDoc = this.responseXML;

                                var temp = parseInt(sessionStorage.worksSize);
                                temp += 1;
                                sessionStorage.worksSize = temp;

                                var worksNode = xmlDoc.getElementsByTagName("works")[0];

                                //Update time
                                worksNode.setAttribute("lastUpdate", generateTimeNow());

                                var workNode = xmlDoc.createElement("work");
                                var idAttr = xmlDoc.createAttribute("id");
                                idAttr.nodeValue = sessionStorage.worksSize;
                                workNode.setAttributeNode(idAttr);

                                var nameNode = xmlDoc.createElement("name");
                                var nameText = xmlDoc.createTextNode(name);
                                nameNode.appendChild(nameText)
                                workNode.appendChild(nameNode);

                                var purposeNode = xmlDoc.createElement("purpose");
                                var purposeText = xmlDoc.createTextNode(purpose);
                                purposeNode.appendChild(purposeText)
                                workNode.appendChild(purposeNode);

                                var roleNode = xmlDoc.createElement("role");
                                var roleText = xmlDoc.createTextNode(role);
                                roleNode.appendChild(roleText)
                                workNode.appendChild(roleNode);

                                var descriptionNode = xmlDoc.createElement("description");
                                var descriptionText = xmlDoc.createTextNode(description);
                                descriptionNode.appendChild(descriptionText)
                                workNode.appendChild(descriptionNode);

                                var picturesNode = xmlDoc.createElement("pictures");

                                for(var a = 0; a < picturesLength - 1; a++) {
                                    var pictureNode = xmlDoc.createElement("picture");
                                    var id = xmlDoc.createAttribute("id");
                                    id.nodeValue = a + 1;
                                    pictureNode.setAttributeNode(id);
                                    if(a == 0) {
                                        var status = xmlDoc.createAttribute("status");
                                        status.nodeValue = "main";
                                        pictureNode.setAttributeNode(status);
                                    }
                                    var pictureText = xmlDoc.createTextNode(pictures[a]);
                                    $(pictureNode).append(pictureText);
                                    picturesNode.appendChild(pictureNode);
                                }
                                workNode.appendChild(picturesNode);

                                var typeNode = xmlDoc.createElement("type");
                                var typeText = xmlDoc.createTextNode(type);
                                typeNode.appendChild(typeText)
                                workNode.appendChild(typeNode);

                                var dateNode = xmlDoc.createElement("date");
                                var dateText = xmlDoc.createTextNode(month + " " + year);
                                dateNode.appendChild(dateText)
                                workNode.appendChild(dateNode);

                                worksNode.appendChild(workNode);

                                var dataInput = new XMLSerializer().serializeToString(xmlDoc.documentElement);
                                var typeInput = "works";
                                $.post("data_management.php",
                                {
                                    type: typeInput,
                                    data: dataInput
                                },
                                function(data, status){
                                    if(status == 'success') {
                                        setTimeout(function(){
                                            window.location.reload(true);
                                        }, 30);
                                    }
                                });
                            }
                        };
                }
            }
        });
    }));

    /*
        Delete Work
    */
    $('body').on('click', '.work_delete_id_confirm', function (){
        var temp = $(this).attr('id').split("_");
        deletedId = temp[2];
        $.post("delete_work_images.php",
        {
            id: deletedId
        },
        function(data, status){
            if(status == 'success') {
                var xmlhttp;
                if(window.XMLHttpRequest) {
                    xmlhttp = new XMLHttpRequest();
                } else {
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }
                xmlhttp.open("GET", "xml/works.xml", true);
                xmlhttp.send();
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        var xmlDoc = this.responseXML;
                        var temp2 = parseInt(sessionStorage.worksSize);
                        temp2 -= 1;
                        sessionStorage.worksSize = temp2;
                        var workNode = xmlDoc.getElementsByTagName("work");

                        //Update time
                        var worksNode = xmlDoc.getElementsByTagName("works")[0];
                        worksNode.setAttribute("lastUpdate", generateTimeNow());

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
                        var workNewNode = xmlDoc.getElementsByTagName("work");
                        if(lastIndex == 0) {
                            for(var b = 0; b < workNewNode.length; b++) {
                                var id = parseInt(workNewNode[b].getAttribute('id'));
                                if(id != (b + 1)) {
                                    var newId = id - 1;
                                    workNewNode[b].setAttribute("id", newId + "");
                                }
                            }
                        }

                        //Decrement name of each images
                        var works = $(xmlDoc).find("works");
                        var works_children = $(works).children();
                        var works_curr = works_children.first();
                        while(!(works_curr.is(works_children.last()))) {
                            var id = works_curr.attr("id");
                            if(parseInt(id) >= parseInt(deletedId)) {
                                var works_pictures = $(works_curr).find("pictures").children();
                                var works_details_pictures = $(works_pictures).first();
                                while(!(works_details_pictures.is(works_pictures.last()))) {
                                    var currDetail = works_details_pictures.text();
                                    var arrDetail = currDetail.split("/");
                                    arrDetail[2] = id;
                                    works_details_pictures.text(arrDetail.join("/"));
                                    works_details_pictures = works_details_pictures.next();
                                }
                                works_details_pictures = $(works_pictures).last();
                                var currDetail = works_details_pictures.text();
                                var arrDetail = currDetail.split("/");
                                arrDetail[2] = id;
                                works_details_pictures.text(arrDetail.join("/"));
                            }
                            works_curr = works_curr.next();
                        }
                        works_curr = works_children.last();
                        var id = works_curr.attr("id");
                        if(parseInt(id) >= parseInt(deletedId)) {
                            var works_pictures = $(works_curr).find("pictures").children();
                            var works_details_pictures = $(works_pictures).first();
                            while(!(works_details_pictures.is(works_pictures.last()))) {
                                var currDetail = works_details_pictures.text();
                                var arrDetail = currDetail.split("/");
                                arrDetail[2] = id;
                                works_details_pictures.text(arrDetail.join("/"));
                                works_details_pictures = works_details_pictures.next();
                            }
                            works_details_pictures = $(works_pictures).last();
                            var currDetail = works_details_pictures.text();
                            var arrDetail = currDetail.split("/");
                            arrDetail[2] = id;
                            works_details_pictures.text(arrDetail.join("/"));
                        }

                        deletedId = "";

                        var dataInput = new XMLSerializer().serializeToString(xmlDoc.documentElement);
                        var typeInput = "works";
                        $.post("data_management.php",
                        {
                            type: typeInput,
                            data: dataInput
                        },
                        function(data, status){
                            window.location.reload(true);
                        });
                    }
                };
            }
        });
    });

    $('#coverPicture[type="file"]').change(function(imageFile){
        $("#wrong_cover_picture_file_type").hide();
        var fileName = imageFile.target.files[0].name;
        $("#cover_picture_file_name").text(fileName);
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#coverPicturePreview').attr('src', e.target.result);
        }
        reader.readAsDataURL(imageFile.target.files[0]);
    });


    $('#otherPictures[type="file"]').change(function(){
       var otherContents = "";
       var length = $(this).get(0).files.length;
       var pictures = [];
       for(var c = 0; c < length; c++) {
            pictures.push($(this).get(0).files[c].name);
       }
       for(var a = 0; a < length; a++) {
            var reader = new FileReader();
            reader.onload = function (e) {
                otherContents += "<li>";
                otherContents += "<br>";
                otherContents += "<article class=\"message is-warning\">";
                otherContents += "<div class=\"message-header\">";
                otherContents += "<div class=\"otherPictureClass has-text-weight-bold\"></div>";
                otherContents += "</div>";
                otherContents += "<div class=\"message-body\">";
                otherContents += "<figure class=\"image is-480x480\">";
                otherContents += "<img src=\"" + e.target.result + "\">";
                otherContents += "</figure>";
                otherContents += "</div>";
                otherContents += "</article>";
                otherContents += "</li>";
            }
            reader.readAsDataURL($(this).get(0).files[a]);
       }
       setTimeout(function(){
            $('#other_pictures_count').text(length + " files selected");
            $('#otherPicturesPreview').html(otherContents);
            for(var b = 0; b < length; b++) {
                $(".otherPictureClass").eq(b).text((b + 1) + ". " + pictures[b]);
            }
        }, 300);
    });

    /*
        Other Functions or Triggers
    */
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
        if(string == "January") {
            month = "01";
        } else if(string == "February") {
            month = "02";
        } else if(string == "March") {
            month = "03";
        } else if(string == "April") {
            month = "04";
        } else if(string == "May") {
            month = "05";
        } else if(string == "June") {
            month = "06";
        } else if(string == "July") {
            month = "07";
        } else if(string == "August") {
            month = "08";
        } else if(string == "September") {
            month = "09";
        } else if(string == "October") {
            month = "10";
        } else if(string == "November") {
            month = "11";
        } else if(string == "December") {
            month = "12";
        }
        return month;
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
});
