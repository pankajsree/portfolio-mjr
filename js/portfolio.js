/*****   Global Variables   *****/

/*** mouse location ***/
var cursorX;
var cursorY;
/*** current cursor width ***/
var cursorWidth;
var cursorInnerHeight;

var padLeft;

var cursorLeft;
var cursorTop;

var prevScroll;
var curScroll;

var deltaY;
var translateY;

var parentContainer;

var transitionFlag;

var noActionCurrentIndex;



function initialise() {
    rem = 18;
    cursorWidth = 10;
    flag = 0;
    cursorLeft = 0;
    cursorTop = 0;

    prevScroll = 0;
    curScroll = 0;

    translateY = 0;
    currentIndex = 0;

    transitionFlag = 0;

    noActionCurrentIndex = 0;
}

$(document).ready(function() {

    initialise();

    var discover = $(".discover");
    var discoverA = $(".discover a:eq(0)");
    var discoverWidth = discoverA.width();
    discover.css({"width": discoverWidth + 20, "height": discoverWidth + 20, "border": "2px solid var(--teal)"});
    discoverA.css({"width": discoverWidth});

    parentContainer = document.getElementById("parent-container");

    var caseTop = document.getElementsByClassName("case-top");
    var caseRight = document.getElementsByClassName("case-right");
    var caseBottom = document.getElementsByClassName("case-bottom");

    var heading = document.getElementsByClassName("heading");

    var line = document.getElementsByClassName("line");
    var discoverjs = document.getElementsByClassName("discover");
    var optionsContainer = document.getElementsByClassName("options-container");

    var option = document.getElementsByClassName("option-anchor");

    option[currentIndex].classList.add("active");

    setTimeout(function(){ heading[currentIndex].style.opacity = "1" }, 1000);
    setTimeout(function(){ line[currentIndex].style.opacity = "1" }, 1000);
    setTimeout(function(){ discoverjs[currentIndex].style.opacity = "1" }, 1000);
    caseRight[currentIndex].setAttribute("style", "left: 55%");

    $(".option-anchor").click(function(ev) {
        ev.preventDefault();
        var tempCurrentIndex = this.getAttribute("data-index");
        option[noActionCurrentIndex].classList.remove("active");
        option[tempCurrentIndex].classList.add("active");

        heading[noActionCurrentIndex].style.opacity = "0";
        setTimeout(function(){ heading[tempCurrentIndex].style.opacity = "1" }, 1500);

        line[noActionCurrentIndex].style.opacity = "0";
        setTimeout(function(){ line[tempCurrentIndex].style.opacity = "1" }, 1100);

        discoverjs[noActionCurrentIndex].style.opacity = "0";
        setTimeout(function(){ discoverjs[tempCurrentIndex].style.opacity = "1" }, 1100);

        caseRight[noActionCurrentIndex].setAttribute("style", "left: 0");
        setTimeout(function(){ caseRight[tempCurrentIndex].setAttribute("style", "left: 55%") }, 900);

        optionsContainer[0].style.opacity = "0";
        setTimeout(function(){ optionsContainer[0].style.opacity = "1" }, 1100);

        noActionCurrentIndex = tempCurrentIndex;
        translateY = (noActionCurrentIndex * (-100));

        setTimeout(function(){ parentContainer.setAttribute("style", "transform: translateY(" + translateY + "vh)") }, 900);
    });


    /*****   CURSOR movement   *****/
    $(document).mousemove(function(e) {
        cursorX = e.clientX;
        cursorY = e.clientY;
        if(flag == 0) {
            cursorLeft = cursorX - 5;
            cursorTop = cursorY - 5;
            $("#cursor").css("left", cursorLeft + "px");
            $("#cursor").css("top", cursorTop + "px");
        }
    });
    $("a").hover(function() {
        flag = 1;
        cursorWidth = $(this).width() + 20;
        cursorInnerHeight = $(this).innerHeight();
        padLeft = parseInt($(this).css("padding-left"));
        cursorLeft = $(this).offset().left + padLeft - 10 - $(document).scrollLeft();
        cursorTop = $(this).offset().top + ((cursorInnerHeight - cursorWidth) / 2) - $(document).scrollTop();
        $("#cursor").css({
            "width": cursorWidth + "px",
            "height": cursorWidth + "px",
            "opacity": "0.4",
            "top": cursorTop + "px",
            "left": cursorLeft + "px"
        });
    }, function() {
        flag = 0;
        cursorWidth = 10;
        cursorLeft = cursorX - 5;
        cursorTop = cursorY - 5;
        $("#cursor").css({
            "width": "10px",
            "height": "10px",
            "opacity": "1",
            "left": cursorLeft + "px",
            "top": cursorTop + "px"
        });
    });

    parentContainer.addEventListener("wheel",  function(e) {
        deltaY = e.deltaY;

        if(deltaY < 0 && transitionFlag != 1) {
            transitionFlag = 1;
            setTimeout(function(){ transitionFlag = 0 },1200);
            if(translateY != 0) {
                currentIndex = (translateY / (-100));
                translateY += 100;

                option[currentIndex - 1].classList.add("active");
                option[currentIndex].classList.remove("active");

                heading[currentIndex].style.opacity = "0";
                setTimeout(function(){ heading[currentIndex - 1].style.opacity = "1" }, 1500);

                line[currentIndex].style.opacity = "0";
                setTimeout(function(){ line[currentIndex - 1].style.opacity = "1" }, 1100);

                discoverjs[currentIndex].style.opacity = "0";
                setTimeout(function(){ discoverjs[currentIndex - 1].style.opacity = "1" }, 1100);

                caseRight[currentIndex].setAttribute("style", "left: 0");
                setTimeout(function(){ caseRight[currentIndex - 1].setAttribute("style", "left: 55%") }, 900);

                optionsContainer[0].style.opacity = "0";
                setTimeout(function(){ optionsContainer[0].style.opacity = "1" }, 1100);

                setTimeout(function(){ parentContainer.setAttribute("style", "transform: translateY(" + translateY + "vh)") }, 900);
                noActionCurrentIndex = (translateY / (-100));
            }
        }
        else if(deltaY > 0 && transitionFlag != 1) {
            transitionFlag = 1;
            setTimeout(function(){ transitionFlag = 0 },1200);
            if(translateY != -300) {
                currentIndex = (translateY / (-100));
                translateY -= 100;

                option[currentIndex + 1].classList.add("active");
                option[currentIndex].classList.remove("active");

                heading[currentIndex].style.opacity = "0";
                setTimeout(function(){ heading[currentIndex + 1].style.opacity = "1" }, 1500);

                line[currentIndex].style.opacity = "0";
                setTimeout(function(){ line[currentIndex + 1].style.opacity = "1" }, 1100);

                discoverjs[currentIndex].style.opacity = "0";
                setTimeout(function(){ discoverjs[currentIndex + 1].style.opacity = "1" }, 1100);

                caseRight[currentIndex].setAttribute("style", "left: 0");
                setTimeout(function(){ caseRight[currentIndex + 1].setAttribute("style", "left: 55%") }, 900);

                optionsContainer[0].style.opacity = "0";
                setTimeout(function(){ optionsContainer[0].style.opacity = "1" }, 1100);

                setTimeout(function(){ parentContainer.setAttribute("style", "transform: translateY(" + translateY + "vh)") }, 900);
                noActionCurrentIndex = (translateY / (-100));
            }
        }
        else {

        }
    });

    $(".option a").hover(function() {
        var optionText = $(this).attr("data-option");
        $("#option-hovered").text(optionText);
    }, function() {
        $("#option-hovered").text("");
    });

    $(".discover-contents").click(function() {

        $("nav, footer").css({ "opacity": "0" });
        setTimeout(function(){ $("nav, footer, #close").toggle() }, 1500);

        optionsContainer[0].style.display="none";
        discoverjs[noActionCurrentIndex].style.opacity = "0";
        line[noActionCurrentIndex].style.opacity = "0";
        setTimeout(function(){ discoverjs[noActionCurrentIndex].style.display = "none" }, 1500);
        setTimeout(function(){ line[noActionCurrentIndex].style.display = "none" }, 1500);

        caseTop[noActionCurrentIndex].classList.add("class-transition-top");
        caseRight[noActionCurrentIndex].classList.add("class-transition-right");
        caseBottom[noActionCurrentIndex].classList.add("class-transition-bottom");
    });

});
