let toggle = true;

window.onload=function(){

    var recordBtn = document.getElementById("record");
    // recordBtn.addEventListener("click", showRecords);

    checkSwitch();
    setTimeout(updateMap(), 5000);
}

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

function checkSwitch() {
    let found = false;
    Array.from(document.querySelectorAll(":hover")).forEach(function(el) {
        if (el.id == "map") {
            found = true;
        }
    });

    if (!found && toggle) {
        document.getElementById("switch").checked = true;
        toggle = false;
    }

    if (found) {
        document.getElementById("switch").checked = false;
        toggle = true;
    }

    setTimeout(checkSwitch, 500);

}

function updateMap() {

    let found = false;
    Array.from(document.querySelectorAll(":hover")).forEach(function(el) {
        if (el.id == "map") {
            found = true;
        }
    });

    if (found) {
        setTimeout(function(){
            updateMap();
        }, 500);
        return;
    }

    var container = document.getElementById('iframe-container');

    var iframe2 = document.createElement('iframe');

    iframe2.src = "map.html";
    iframe2.width = "100%";
    iframe2.id = "map";
    iframe2.frameBorder = 0;
    iframe2.height = "70%";
    iframe2.style = "position:absolute; top:50px;";


    iframe2.style.visibility = 'hidden';

    container.appendChild(iframe2);

    setTimeout(function(){  

        Array.from(document.querySelectorAll(":hover")).forEach(function(el) {
            if (el.id == "map") {
                found = true;
            }
        });
        
        if (found || !document.getElementById("switch").checked) {
            container.removeChild(iframe2);
            return;
        }

        iframe2.style.visibility = 'visible'; 

        container.removeChild(container.getElementsByTagName('iframe')[0]);
    }, 5500);


    setTimeout(updateMap, 5000);

}
