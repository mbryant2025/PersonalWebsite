
window.onload=function(){
    var myBtn = document.getElementById("myBtn")
    myBtn.addEventListener("click", showRick);
}



function showRick() {

    var img = document.createElement("img");
    img.src = "rick.png";
    var src = document.getElementById("header");

    src.appendChild(img);

    var delayInMilliseconds = 1000;

    setTimeout(function() {
        src.removeChild(img);
    }, delayInMilliseconds);

}