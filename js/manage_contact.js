$(document).ready(function(){
    $.ajax({        
        type: "GET",
        url: "xml/about.xml", 
        dataType: "xml",
        success: function(xmlDoc){
            var about = $(xmlDoc).find('about');
            var initial = $(about).find('initial').text();
            $(".manage_contact_initial").text(initial);
        }
    });
    
    $.ajax({
        type: "GET",
        url: "xml/contact.xml", 
        dataType: "xml",
        success: function(xmlDoc) {
            var contact = $(xmlDoc).find('contact');
            var media_head = $(contact).find('social_media');
            var media_output = "";
            var media_head_children = $(media_head).children();
            var media_curr = media_head_children.first();
            while(!(media_curr.is(media_head_children.last()))) {
                media_output += "<tr>";
                var name = $(media_curr).find('name').text();
                var link = $(media_curr).find('link').text();
                var icon = $(media_curr).find('icon').text();
                media_output += "<td>" + name + "</td>";
                media_output += "<td>" + "<span class='icon'>" + "<i class='" + icon + "'>" + "</i></span>" + "</td>";
                media_output += "<td>" + link + "</td>";
                media_output += "</tr>";
                media_curr = media_curr.next();
            }
            media_output += "<tr>";
            var name = $(media_curr).find('name').text();
            var link = $(media_curr).find('link').text();
            var icon = $(media_curr).find('icon').text();
            media_output += "<td>" + name + "</td>";
            media_output += "<td>" + "<span class='icon'>" + "<i class='" + icon + "'>" + "</i></span>" + "</td>";
            media_output += "<td>" + link + "</td>";
            media_output += "</tr>";
            $("#social_media_content_manage").html(media_output);
        }
    });
});
