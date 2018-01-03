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
});
