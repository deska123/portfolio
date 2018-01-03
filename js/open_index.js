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
            $("#index_name").text(name);
            $("#index_motto").text(motto);
        }
    });
});
