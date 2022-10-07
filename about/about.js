window.onload=function(){

    var progBtn = document.getElementById("programmingButton");
    progBtn.addEventListener("click", showProgramming);

    var electronicsBtn = document.getElementById("electronicsButton");
    electronicsBtn.addEventListener("click", showElectronics);

    var equipmentBtn = document.getElementById("equipmentButton");
    equipmentBtn.addEventListener("click", showEquipment);

    showProgramming();

}


function showProgramming() {
    
    document.getElementById("programmingButton").classList.add('activatedButton');
    document.getElementById("programmingButton").classList.remove('neutralButton');

    document.getElementById("electronicsButton").classList.add('neutralButton');
    document.getElementById("electronicsButton").classList.remove('activatedButton');

    document.getElementById("equipmentButton").classList.add('neutralButton');
    document.getElementById("equipmentButton").classList.remove('activatedButton');

    loadProgramming()
}

function showElectronics() {

    document.getElementById("programmingButton").classList.add('neutralButton');
    document.getElementById("programmingButton").classList.remove('activatedButton');

    document.getElementById("electronicsButton").classList.add('activatedButton');
    document.getElementById("electronicsButton").classList.remove('neutralButton');

    document.getElementById("equipmentButton").classList.add('neutralButton');
    document.getElementById("equipmentButton").classList.remove('activatedButton');

    loadElectronics()
}

function showEquipment() {

    document.getElementById("programmingButton").classList.add('neutralButton');
    document.getElementById("programmingButton").classList.remove('activatedButton');

    document.getElementById("electronicsButton").classList.add('neutralButton');
    document.getElementById("electronicsButton").classList.remove('activatedButton');

    document.getElementById("equipmentButton").classList.add('activatedButton');
    document.getElementById("equipmentButton").classList.remove('neutralButton');

    loadEquipment()
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


function loadProgramming() {
    
    var table = document.getElementById("table");

    for (let i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }

    readTextFile("skills.json", function(text){
        var data = JSON.parse(text);
        var programming = data.programming;

        for (let i = 0; i < programming.length; i++) {
            let row = table.insertRow(i+1);

            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);

            let skill = programming[i].skill;
            let experience = programming[i].experience;


            cell1.innerHTML = skill;
            cell2.innerHTML = experience;

        }
    });
        
}

function loadElectronics() {

    var table = document.getElementById("table");

    for (let i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }

    readTextFile("skills.json", function(text){
        var data = JSON.parse(text);
        var electronics = data.electronics;

        for (let i = 0; i < electronics.length; i++) {
            let row = table.insertRow(i+1);

            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);

            let skill = electronics[i].skill;
            let experience = electronics[i].experience;


            cell1.innerHTML = skill;
            cell2.innerHTML = experience;

        }
    });
        
        
}

function loadEquipment() {

    var table = document.getElementById("table");

    for (let i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }

    readTextFile("skills.json", function(text){
        var data = JSON.parse(text);
        var equipment = data.equipment;

        for (let i = 0; i < equipment.length; i++) {
            let row = table.insertRow(i+1);

            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);

            let skill = equipment[i].skill;
            let experience = equipment[i].experience;

            cell1.innerHTML = skill;
            cell2.innerHTML = experience;

            
        }
    });

        
}