window.onload=function(){

    var allBtn = document.getElementById("allButton");
    allBtn.addEventListener("click", showAll);

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

    loadAll()
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


function loadAll() {

    
}


function loadProgramming() {
    
        
}

function loadElectronics() {
        
        
}

function loadEquipment() {

        
}