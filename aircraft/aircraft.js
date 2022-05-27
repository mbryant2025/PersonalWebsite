function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}


function showData() {
    readTextFile("aircraft.json", function(text){
        var data = JSON.parse(text);
        document.getElementById("data").innerHTML = JSON.stringify(data);
        console.log(JSON.stringify(data));
    });

    //python here
    $.ajax({
        type: "POST",
        url: "map.py",
        data: { param: text}
      }).done(function( o ) {
         // do something
      });

}


window.onload=function(){
    var myBtn = document.getElementById("update")
    myBtn.addEventListener("click", showData);
    var myBtn = document.getElementById("updatemap")
    myBtn.addEventListener("click", updateMap);

    updateMap();
}

function updateMap() {

    var container = document.getElementById('iframe-container');

    var iframe2 = document.createElement('iframe');

    iframe2.src = 'map.html';
    iframe2.width = '100%';
    iframe2.height = 450;
    iframe2.id = 'map';
    iframe2.style = "border:0"

    iframe2.style.visibility = 'hidden';
    container.appendChild(iframe2);

    setTimeout(function(){  
        iframe2.style.visibility = 'visible'; 
        container.removeChild(container.getElementsByTagName('iframe')[0]);
    }, 4500);

    setTimeout(updateMap, 500);
}



