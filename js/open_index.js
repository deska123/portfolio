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
              works_output += "<div class=\"column is-one-third\">";
              works_output += "<div class=\"card\"><div class=\"card-image\"><figure class=\"image is-16by9\">";
              var works_pictures = $(works_curr).find("pictures").children();
              var works_main = $(works_pictures).first();
              works_output += "<img src='" + works_main.text() + "' alt='" + works_curr.find('name').text() + "'>";
              works_output += "</figure></div>";
              works_output += "<div class=\"card-content has-text-centered\"><div class=\"content\">"
              works_output += "<p class=\"title is-4\" style=\"color:black\">" + works_curr.find('name').text() + "</p>";
              works_output += "<a>View Detail</a>";
              works_output += "</div></div></div></div>";
              works_curr = works_curr.prev();
              i++;
            }
            works_curr = works_children.first();
            if(i != 1 && (i - 1) % 3 == 0) {
              works_output += "</div><div class='columns'>"
            }
            works_output += "<div class=\"column is-one-third\">";
            works_output += "<div class=\"card\"><div class=\"card-image\"><figure class=\"image is-4by3\">";
            var works_pictures = $(works_curr).find("pictures").children();
            var works_main = $(works_pictures).first();
            works_output += "<img src='" + works_main.text() + "' alt='" + works_curr.find('name').text() + "'></figure></div>";
            works_output += "<div class=\"card-content has-text-centered\"><div class=\"content\">"
            works_output += "<p class=\"title is-4\" style=\"color:black\">" + works_curr.find('name').text() + "</p>";
            works_output += "<a>View Detail</a>";
            works_output += "</div></div></div></div>";
            works_output += "</div>";
            $("#index_works").html(works_output);
        }
    });
});
