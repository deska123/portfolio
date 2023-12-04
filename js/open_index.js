$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "xml/about.xml",
        dataType: "xml",
        success: function(xmlDoc){
            var about = $(xmlDoc).find('about');
            var initial = $(about).find('initial').text();
            var name = $(about).find('name').text();
            var motto = $(about).find('motto').text();
            $(".index_initial").text(initial);
            $("#index_name").text(name + "'s Works");
            $("#index_motto").text(motto);
        }
    });

    $.ajax({
        type: "GET",
        url: "xml/works.xml",
        dataType: "xml",
        success: function(xmlDoc){
            var works = $(xmlDoc).find('works');
            var works_children = $(works).children();
            var works_output = "<div class=\"columns\">";
            //works_output += "<div class=\"column is-one-third\">";
            var works_curr = works_children.last();
            var i = 1;
            while(!(works_curr.is(works_children.first()))) {
              if(i != 1 && (i - 1) % 3 == 0) {
                works_output += "</div><div class='columns'>"
              }
              var works_pictures = $(works_curr).find("pictures").children();
              var works_main = $(works_pictures).first();
              works_output += "<div class=\"column is-one-third\">";
              works_output += "<div id='detail-" + i + "' class=\"modal works_detail_modal\"><div class=\"modal-background\"></div><div class=\"modal-card\">";
              // works_output += "<header class=\"modal-card-head\"><p class=\"modal-card-title\">" + works_curr.find('name').text() + "</p><button id='close-" + i + "' class=\"delete close_works_detail\" aria-label=\"close\"></button></header>";
			        works_output += "<header class=\"modal-card-head\"><button id='close-" + i + "' class=\"delete close_works_detail\" aria-label=\"close\"></button>&nbsp;&nbsp;<p class=\"modal-card-title\">" + works_curr.find('name').text() + "</p></header>";
              works_output += "<section class=\"modal-card-body\">";
              works_output += "<p class=\"subtitle is-6 has-text-justified\" style=\"color:black\">" + works_curr.find('description').text() + "</p>";
              works_output += "<aside class=\"menu\">";
              works_output += "<p class=\"menu-label\">Role</p>";
              works_output += "<ul class=\"menu-list\">" + "<li style=\"color:black\"><a>" + works_curr.find('role').text() + "</a></li></ul>";
              works_output += "<p class=\"menu-label\">For</p>";
              works_output += "<ul class=\"menu-list\">" + "<li style=\"color:black\"><a>" + works_curr.find('purpose').text() + "</a></li></ul>";
              works_output += "<p class=\"menu-label\">Date</p>";
              works_output += "<ul class=\"menu-list\">" + "<li style=\"color:black\"><a>" + works_curr.find('date').text() + "</a></li></ul>";
              works_output += "<p class=\"menu-label\">Type</p>";
              works_output += "<ul class=\"menu-list\">" + "<li style=\"color:black\"><a>" + works_curr.find('type').text() + "</a></li></ul>";
              works_output += "<p class=\"menu-label\">Technology Used</p>";
              works_output += "<ul class=\"menu-list\">" + "<li style=\"color:black\"><a>" + works_curr.find('technology').text() + "</a></li></ul>";
              works_output += "</aside>";
              works_output += "<ul>";
              var works_details_pictures = $(works_pictures).first();
              while(!(works_details_pictures.is(works_pictures.last()))) {
                works_output += "<li>";
                works_output += "<figure style=\"border: 3px #000000 solid; padding: 4px; margin: auto;\" class=\"image is-480x480\">";
                works_output += "<img style='cursor: pointer;' src='" + works_details_pictures.text() + "' onclick='window.open(\"" + works_details_pictures.text() + "\", \"_blank\");'>";
                works_output += "</figure>";
                works_output += "</li><br>";
                works_details_pictures = works_details_pictures.next();
              }
              works_details_pictures = $(works_pictures).last();
              works_output += "<li>";
              works_output += "<figure style=\"border: 3px #000000 solid; padding: 4px; margin: auto;\" class=\"image is-480x480\">";
              works_output += "<img style='cursor: pointer;' src='" + works_details_pictures.text() + "' onclick='window.open(\"" + works_details_pictures.text() + "\", \"_blank\");'>";
              works_output += "</figure>";
              works_output += "</li>";
              works_output += "</ul>";
              works_output += "</section>";
              works_output += "<footer class=\"modal-card-foot\">";
              works_output += "</footer>";
              works_output += "</div></div>";
              works_output += "<div class=\"card\"><div class=\"card-image\"><figure class=\"image is-16by9\">";
              works_output += "<img src='" + works_main.text() + "' alt='" + works_curr.find('name').text() + "'>";
              works_output += "</figure></div>";
              works_output += "<div class=\"card-content has-text-centered\"><div class=\"content\">"
              works_output += "<p class=\"title is-4\" style=\"color:black\">" + works_curr.find('name').text() + "</p>";
              works_output += "<a id='" + i + "' class=\"view_works_detail\">View Detail</a>";
              works_output += "</div></div></div></div>";
              works_curr = works_curr.prev();
              i++;
            }
            works_curr = works_children.first();
            if(i != 1 && (i - 1) % 3 == 0) {
              works_output += "</div><div class='columns'>"
            }
            var works_pictures = $(works_curr).find("pictures").children();
            var works_main = $(works_pictures).first();
            works_output += "<div class=\"column is-one-third\">";
            works_output += "<div id='detail-" + i + "' class=\"modal\"><div class=\"modal-background\"></div><div class=\"modal-card\">";
            //works_output += "<header class=\"modal-card-head\"><p class=\"modal-card-title\">" + works_curr.find('name').text() + "</p><button id='close-" + i + "' class=\"delete close_works_detail\" aria-label=\"close\"></button></header>";
            works_output += "<header class=\"modal-card-head\"><button id='close-" + i + "' class=\"delete close_works_detail\" aria-label=\"close\"></button>&nbsp;&nbsp;<p class=\"modal-card-title\">" + works_curr.find('name').text() + "</p></header>";
			      works_output += "<section class=\"modal-card-body\">";
            works_output += "<p class=\"subtitle is-6 has-text-justified\" style=\"color:black\">" + works_curr.find('description').text() + "</p>";
            works_output += "<aside class=\"menu\">";
            works_output += "<p class=\"menu-label\">Role</p>";
            works_output += "<ul class=\"menu-list\">" + "<li style=\"color:black\"><a>" + works_curr.find('role').text() + "</a></li></ul>";
            works_output += "<p class=\"menu-label\">For</p>";
            works_output += "<ul class=\"menu-list\">" + "<li style=\"color:black\"><a>" + works_curr.find('purpose').text() + "</a></li></ul>";
            works_output += "<p class=\"menu-label\">Date</p>";
            works_output += "<ul class=\"menu-list\">" + "<li style=\"color:black\"><a>" + works_curr.find('date').text() + "</a></li></ul>";
            works_output += "<p class=\"menu-label\">Type</p>";
            works_output += "<ul class=\"menu-list\">" + "<li style=\"color:black\"><a>" + works_curr.find('type').text() + "</a></li></ul>";
            works_output += "<p class=\"menu-label\">Technology Used</p>";
            works_output += "<ul class=\"menu-list\">" + "<li style=\"color:black\"><a>" + works_curr.find('technology').text() + "</a></li></ul>";
            works_output += "</aside>";
            works_output += "<ul>";
            var works_details_pictures = $(works_pictures).first();
            while(!(works_details_pictures.is(works_pictures.last()))) {
              works_output += "<li>";
              works_output += "<figure style=\"border: 3px #000000 solid; padding: 4px; margin: auto;\" class=\"image is-480x480\">";
              works_output += "<img style='cursor: pointer;' src='" + works_details_pictures.text() + "' onclick='window.open(\"" + works_details_pictures.text() + "\", \"_blank\");'>";
              works_output += "</figure>";
              works_output += "</li><br>";
              works_details_pictures = works_details_pictures.next();
            }
            works_details_pictures = $(works_pictures).last();
            works_output += "<li>";
            works_output += "<figure style=\"border: 3px #000000 solid; padding: 4px; margin: auto;\" class=\"image is-480x480\" >";
            works_output += "<img style='cursor: pointer;' src='" + works_details_pictures.text() + "' onclick='window.open(\"" + works_details_pictures.text() + "\", \"_blank\");'>";
            works_output += "</figure>";
            works_output += "</li>";
            works_output += "</ul>"
            works_output += "</section>";
            works_output += "<footer class=\"modal-card-foot\">";
            works_output += "</footer>";
            works_output += "</div></div>";
            works_output += "<div class=\"card\"><div class=\"card-image\"><figure class=\"image is-4by3\">";
            works_output += "<img src='" + works_main.text() + "' alt='" + works_curr.find('name').text() + "'></figure></div>";
            works_output += "<div class=\"card-content has-text-centered\"><div class=\"content\">"
            works_output += "<p class=\"title is-4\" style=\"color:black\">" + works_curr.find('name').text() + "</p>";
            works_output += "<a id='" + i + "' class=\"view_works_detail\">View Detail</a>";
            works_output += "</div></div></div></div>";
            works_output += "</div>";
            $("#index_works").html(works_output);
        }
    });

    $(document).on("click", ".view_works_detail", function(){
      var id = $(this).attr('id');
      $("#detail-" + id).fadeIn();
    });

    $(document).on("click", ".close_works_detail", function(){
      var temp = $(this).attr('id').split('-');
      var id = temp[1];
      $("#detail-" + id).hide();
    });
});
