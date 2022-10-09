window.onload=function(){

    var allButton = document.getElementById("allButton");
    allButton.addEventListener("click", showAll);

    var progBtn = document.getElementById("programmingButton");
    progBtn.addEventListener("click", showProgramming);

    var electronicsBtn = document.getElementById("electronicsButton");
    electronicsBtn.addEventListener("click", showElectronics);

    var equipmentBtn = document.getElementById("equipmentButton");
    equipmentBtn.addEventListener("click", showEquipment);

    showAll();

}

function showAll() {

    document.getElementById("allButton").classList.add('activatedButton');
    document.getElementById("allButton").classList.remove('neutralButton');

    document.getElementById("programmingButton").classList.add('neutralButton');
    document.getElementById("programmingButton").classList.remove('activatedButton');

    document.getElementById("electronicsButton").classList.add('neutralButton');
    document.getElementById("electronicsButton").classList.remove('activatedButton');

    document.getElementById("equipmentButton").classList.add('neutralButton');
    document.getElementById("equipmentButton").classList.remove('activatedButton');

    loadAll();

}


function showProgramming() {

    document.getElementById("allButton").classList.add('neutralButton');
    document.getElementById("allButton").classList.remove('activatedButton');
    
    document.getElementById("programmingButton").classList.add('activatedButton');
    document.getElementById("programmingButton").classList.remove('neutralButton');

    document.getElementById("electronicsButton").classList.add('neutralButton');
    document.getElementById("electronicsButton").classList.remove('activatedButton');

    document.getElementById("equipmentButton").classList.add('neutralButton');
    document.getElementById("equipmentButton").classList.remove('activatedButton');

    loadProgramming()
}

function showElectronics() {

    document.getElementById("allButton").classList.add('neutralButton');
    document.getElementById("allButton").classList.remove('activatedButton');

    document.getElementById("programmingButton").classList.add('neutralButton');
    document.getElementById("programmingButton").classList.remove('activatedButton');

    document.getElementById("electronicsButton").classList.add('activatedButton');
    document.getElementById("electronicsButton").classList.remove('neutralButton');

    document.getElementById("equipmentButton").classList.add('neutralButton');
    document.getElementById("equipmentButton").classList.remove('activatedButton');

    loadElectronics()
}

function showEquipment() {

    document.getElementById("allButton").classList.add('neutralButton');
    document.getElementById("allButton").classList.remove('activatedButton');

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

function loadAll() {

    var table = document.getElementById("table");

    for (let i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }

    readTextFile("skills.json", function(text){
        var data = JSON.parse(text);
        var allSkills = data.skills;

        for (let i = 0; i < allSkills.length; i++) {

            let row = table.insertRow(i+1);

            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);

            let skill = allSkills[i].skill;
            let experience = allSkills[i].experience;

            cell1.innerHTML = skill;
            cell2.innerHTML = experience;


        }
    });

}

function loadProgramming() {
    
    var table = document.getElementById("table");

    for (let i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }

    readTextFile("skills.json", function(text){
        var data = JSON.parse(text);
        var allSkills = data.skills;

        let addedRows = 0;

        for (let i = 0; i < allSkills.length; i++) {

            if(allSkills[i].category == "programming") {

                let row = table.insertRow(addedRows+1);

                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);

                let skill = allSkills[i].skill;
                let experience = allSkills[i].experience;

                cell1.innerHTML = skill;
                cell2.innerHTML = experience;

                addedRows++;
            }

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
        var allSkills = data.skills;

        let addedRows = 0;

        for (let i = 0; i < allSkills.length; i++) {

            if(allSkills[i].category == "electronics") {

                let row = table.insertRow(addedRows+1);

                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);

                let skill = allSkills[i].skill;
                let experience = allSkills[i].experience;

                cell1.innerHTML = skill;
                cell2.innerHTML = experience;

                addedRows++;
            }

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
        var allSkills = data.skills;

        let addedRows = 0;

        for (let i = 0; i < allSkills.length; i++) {

            if(allSkills[i].category == "equipment") {

                let row = table.insertRow(addedRows+1);

                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);

                let skill = allSkills[i].skill;
                let experience = allSkills[i].experience;

                cell1.innerHTML = skill;
                cell2.innerHTML = experience;

                addedRows++;
            }

        }
    });
      
}