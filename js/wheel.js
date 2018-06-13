let deltaY = 0; // to add the deltaY values of wheel event
let onAction = false; // used to detect the end of the transition
let sections = document.getElementsByClassName("section");// all the "slides"
let activeSection = 0; // the section/slide to show to the user
// To detect the wheel event and trigger the transition between sections
document.getElementById("cont").addEventListener("wheel", wheelFunction);
zIndex=2000;
[].slice.call(sections).forEach(section => {
    section.style.zIndex = (zIndex-=100);
});
// This, makes sure if it's time to trigger the transition
// forward or reverse
function wheelFunction(event) {
    if (onAction) {
        return;
    }
    deltaY += event.deltaY;
    if (deltaY >= 300) {
        onAction = true;
        scrolldown();

    } else if (deltaY <= -300) {
        onAction = true;
        scrollup();
    }

}
// the user is scrolling down the page
function scrolldown() {
    
    sections[activeSection].classList.remove("section-up-center");
    sections[activeSection].classList.remove("section-bottom-center");
    if (activeSection < sections.length - 1)
        sections[activeSection].classList.add("section-center-up");
    moveIndex(1);
    sections[activeSection].classList.remove("section-center-bottom");
    sections[activeSection].classList.add("section-bottom-center");
    animationFinished();
    deltaY = 0;
}
// the user is scrolling up the page
function scrollup() {
    
    
    sections[activeSection].classList.remove("section-bottom-center");
    sections[activeSection].classList.remove("section-up-center");
    if( activeSection>0)
        sections[activeSection].classList.add("section-center-bottom");
    if( (activeSection-1) !=-1){
        sections[activeSection-1].classList.remove("section-center-up");
        sections[activeSection-1].classList.add("section-up-center");
    }else{ onAction=false }
    animationFinished();
    moveIndex(-1);
   
    deltaY = 0;
}
// set onAction to false after 1s (the duration of the transition)
function animationFinished() {
    setTimeout(function () {
        onAction = false;
    }, 1200);
}
// used to move the index related to the active section
function moveIndex(offset) {
    activeSection += offset;
    if (activeSection >= sections.length) {
        activeSection = sections.length - 1;
    }
    if (activeSection < 0) {
        activeSection = 0;
    }

}