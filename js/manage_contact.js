$(document).ready(function(){
    /*
        Show Messages List
    */
    $.post("message_process.php",
    {
        goal: "show"
    },
    function(data, status){
        $("#message_content_manage").html(data);
    });
    
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
            $(".manage_contact_initial").text(initial);
        }
    });
 
    /*
        Fill Contents from contact.xml
    */  
    $.ajax({
        type: "GET",
        url: "xml/contact.xml", 
        dataType: "xml",
        success: function(xmlDoc) {
            var contact = $(xmlDoc).find('contact');

            //Show Last Updated
            var lastUpdate = contact.attr("lastUpdate");
            $("#lastUpdated").text("(Last Updated on : " + lastUpdate + ")");

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
