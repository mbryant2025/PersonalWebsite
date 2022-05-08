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
}


window.onload=function(){
    var myBtn = document.getElementById("update")
    myBtn.addEventListener("click", showData);
}