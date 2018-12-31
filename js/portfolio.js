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

var discoverFlag;

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

    discoverFlag = 0;
}

$(document).ready(function() {

    initialise();

    var heading = document.getElementsByClassName("heading");
    var secContent = document.getElementsByClassName("sec-content");

    var textContent = document.getElementsByClassName("text-content");

    var discover = $(".discover");
    var discoverA = $(".discover a:eq(0)");

    var cases = document.getElementsByClassName("case");

    var dummy = document.getElementsByClassName("dummy");
    var dummyCover = document.getElementsByClassName("dummy-cover");

    var workList = document.getElementsByClassName("work-list");

    var scroll = document.getElementsByClassName("scroll");

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

    function dummy_cover() {
        discoverFlag = 2;
        dummyCover[noActionCurrentIndex].style.height = "100vh";
        workList[noActionCurrentIndex].style.display = "block";
        scroll[noActionCurrentIndex].style.display = "none";
        setTimeout(function(){ cases[noActionCurrentIndex].style.overflowX = "hidden" }, 1000);
        setTimeout(function(){ cases[noActionCurrentIndex].style.overflowY = "scroll" }, 1000);
    }

    $(".scroll").click(function() {
        dummy_cover();
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
    $("a, .scroll").hover(function() {
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

    $(".option a").hover(function() {
        var optionText = $(this).attr("data-option");
        $("#option-hovered").text(optionText);
    }, function() {
        $("#option-hovered").text("");
    });

    $(".case").scroll(function() {
        prevScroll = curScroll;
        curScroll = $(this).scrollTop();

        heading[noActionCurrentIndex].style.transform = "translate(-50%, calc(-50% + " + curScroll/2.5 + "px))";

        workList[noActionCurrentIndex].style.transform = "translate(-50%, calc(-50% + " + curScroll/12.5 + "px))";

    });

    parentContainer.addEventListener("wheel",  function(e) {
        deltaY = e.deltaY;
        if(discoverFlag == 0) {
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
        }

        else if(deltaY > 0 && discoverFlag == 1) {
            dummy_cover();
        }

        else {

        }
    });

    function url_back() {
        setTimeout(function() { discoverFlag = 0; }, 2550);

        heading[noActionCurrentIndex].style.transform = "translate(-50%, -50%)";

        textContent[noActionCurrentIndex].style.display = "none";

        dummy[noActionCurrentIndex].style.zIndex = "-1";

        dummyCover[noActionCurrentIndex].style.height = "0";
        workList[noActionCurrentIndex].style.display = "none";

        cases[noActionCurrentIndex].style.overflowX = "hidden";
        cases[noActionCurrentIndex].style.overflowY = "hidden";

        caseTop[noActionCurrentIndex].classList.remove("class-transition-top");
        caseTop[noActionCurrentIndex].classList.add("class-reverse-transition-top");

        caseRight[noActionCurrentIndex].style.left = "100%";
        caseRight[noActionCurrentIndex].classList.remove("class-transition-right");
        caseRight[noActionCurrentIndex].classList.add("class-reverse-transition-right");

        caseBottom[noActionCurrentIndex].classList.remove("class-transition-bottom");
        caseBottom[noActionCurrentIndex].classList.add("class-reverse-transition-bottom");

        $("nav, footer, #close").toggle();
        $("nav, footer").css({ "opacity": "1" });

        optionsContainer[0].style.display="block";
        setTimeout(function(){
            discoverjs[noActionCurrentIndex].style.display = "block";
            discoverjs[noActionCurrentIndex].style.opacity = "0";
        }, 1000);
        setTimeout(function(){ discoverjs[noActionCurrentIndex].style.opacity = "1" }, 2500);

        setTimeout(function(){
            line[noActionCurrentIndex].style.display = "block";
            line[noActionCurrentIndex].style.opacity = "0";
        }, 1000);
        setTimeout(function(){ line[noActionCurrentIndex].style.opacity = "1" }, 2500);

        setTimeout(function() {
            caseTop[noActionCurrentIndex].classList.remove("class-reverse-transition-top");
            caseRight[noActionCurrentIndex].classList.remove("class-reverse-transition-right");
            caseBottom[noActionCurrentIndex].classList.remove("class-reverse-transition-bottom");
            caseRight[noActionCurrentIndex].style.left = "55%";
        }, 2600);

    }

    $(".discoverA").click(function(ev) {
        ev.preventDefault();
        discoverFlag = 1;

        textContent[noActionCurrentIndex].style.display = "block";
        setTimeout(function() { scroll[noActionCurrentIndex].style.display = "block"; }, 2600);

        var url = "portfolio.html" + $(this).attr('href');
        window.history.pushState(null, null, url);

        dummy[noActionCurrentIndex].style.zIndex = "1";

        $("nav, footer").css({ "opacity": "0" });
        setTimeout(function(){ $("nav, footer, #close").toggle() }, 1500);

        optionsContainer[0].style.display="none";
        discoverjs[noActionCurrentIndex].style.opacity = "0";
        line[noActionCurrentIndex].style.opacity = "0";
        setTimeout(function(){ discoverjs[noActionCurrentIndex].style.display = "none" }, 1500);
        setTimeout(function(){ line[noActionCurrentIndex].style.display = "none" }, 1500);

        caseTop[noActionCurrentIndex].classList.add("class-transition-top");
        caseRight[noActionCurrentIndex].style.left = "55%";
        caseRight[noActionCurrentIndex].classList.add("class-transition-right");
        caseBottom[noActionCurrentIndex].classList.add("class-transition-bottom");

    });

    $("#close").click(function(ev) {
        ev.preventDefault();
        window.history.back();
    });

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

    window.onhashchange = function() {
        var hash = window.location.hash;
        switch(hash) {
            case "":
                url_back();
                break;
            case "#internships":
                var temp = 0;
                translateY = temp * (-100);
                option[temp].classList.add("active");
                option[noActionCurrentIndex].classList.remove("active");
                heading[noActionCurrentIndex].style.opacity = "0";
                setTimeout(function(){ heading[temp].style.opacity = "1" }, 1500);
                line[noActionCurrentIndex].style.opacity = "0";
                setTimeout(function(){ line[temp].style.opacity = "1" }, 1100);
                discoverjs[noActionCurrentIndex].style.opacity = "0";
                setTimeout(function(){ discoverjs[temp].style.opacity = "1" }, 1100);
                caseRight[noActionCurrentIndex].setAttribute("style", "left: 0");
                setTimeout(function(){ caseRight[temp].setAttribute("style", "left: 55%") }, 900);
                optionsContainer[0].style.opacity = "0";
                setTimeout(function(){ optionsContainer[0].style.opacity = "1" }, 1100);
                setTimeout(function(){ parentContainer.setAttribute("style", "transform: translateY(" + translateY + "vh)") }, 900);
                noActionCurrentIndex = (translateY / (-100));

                discoverFlag = 1;
                textContent[noActionCurrentIndex].style.display = "block";
                setTimeout(function() { scroll[noActionCurrentIndex].style.display = "block"; }, 2600);
                dummy[noActionCurrentIndex].style.zIndex = "1";
                $("nav, footer").css({ "opacity": "0" });
                setTimeout(function(){ $("nav, footer, #close").toggle() }, 1500);
                optionsContainer[0].style.display="none";
                discoverjs[noActionCurrentIndex].style.opacity = "0";
                line[noActionCurrentIndex].style.opacity = "0";
                setTimeout(function(){ discoverjs[noActionCurrentIndex].style.display = "none" }, 1500);
                setTimeout(function(){ line[noActionCurrentIndex].style.display = "none" }, 1500);
                caseTop[noActionCurrentIndex].classList.add("class-transition-top");
                caseRight[noActionCurrentIndex].style.left = "55%";
                caseRight[noActionCurrentIndex].classList.add("class-transition-right");
                caseBottom[noActionCurrentIndex].classList.add("class-transition-bottom");
                break;
            case "#projects":
                var temp = 1;
                translateY = temp * (-100);
                option[temp].classList.add("active");
                option[noActionCurrentIndex].classList.remove("active");
                heading[noActionCurrentIndex].style.opacity = "0";
                setTimeout(function(){ heading[temp].style.opacity = "1" }, 1500);
                line[noActionCurrentIndex].style.opacity = "0";
                setTimeout(function(){ line[temp].style.opacity = "1" }, 1100);
                discoverjs[noActionCurrentIndex].style.opacity = "0";
                setTimeout(function(){ discoverjs[temp].style.opacity = "1" }, 1100);
                caseRight[noActionCurrentIndex].setAttribute("style", "left: 0");
                setTimeout(function(){ caseRight[temp].setAttribute("style", "left: 55%") }, 900);
                optionsContainer[0].style.opacity = "0";
                setTimeout(function(){ optionsContainer[0].style.opacity = "1" }, 1100);
                setTimeout(function(){ parentContainer.setAttribute("style", "transform: translateY(" + translateY + "vh)") }, 900);
                noActionCurrentIndex = (translateY / (-100));

                discoverFlag = 1;
                textContent[noActionCurrentIndex].style.display = "block";
                setTimeout(function() { scroll[noActionCurrentIndex].style.display = "block"; }, 2600);
                dummy[noActionCurrentIndex].style.zIndex = "1";
                $("nav, footer").css({ "opacity": "0" });
                setTimeout(function(){ $("nav, footer, #close").toggle() }, 1500);
                optionsContainer[0].style.display="none";
                discoverjs[noActionCurrentIndex].style.opacity = "0";
                line[noActionCurrentIndex].style.opacity = "0";
                setTimeout(function(){ discoverjs[noActionCurrentIndex].style.display = "none" }, 1500);
                setTimeout(function(){ line[noActionCurrentIndex].style.display = "none" }, 1500);
                caseTop[noActionCurrentIndex].classList.add("class-transition-top");
                caseRight[noActionCurrentIndex].style.left = "55%";
                caseRight[noActionCurrentIndex].classList.add("class-transition-right");
                caseBottom[noActionCurrentIndex].classList.add("class-transition-bottom");
                break;
            case "#trainings":
                var temp = 2;
                translateY = temp * (-100);
                option[temp].classList.add("active");
                option[noActionCurrentIndex].classList.remove("active");
                heading[noActionCurrentIndex].style.opacity = "0";
                setTimeout(function(){ heading[temp].style.opacity = "1" }, 1500);
                line[noActionCurrentIndex].style.opacity = "0";
                setTimeout(function(){ line[temp].style.opacity = "1" }, 1100);
                discoverjs[noActionCurrentIndex].style.opacity = "0";
                setTimeout(function(){ discoverjs[temp].style.opacity = "1" }, 1100);
                caseRight[noActionCurrentIndex].setAttribute("style", "left: 0");
                setTimeout(function(){ caseRight[temp].setAttribute("style", "left: 55%") }, 900);
                optionsContainer[0].style.opacity = "0";
                setTimeout(function(){ optionsContainer[0].style.opacity = "1" }, 1100);
                setTimeout(function(){ parentContainer.setAttribute("style", "transform: translateY(" + translateY + "vh)") }, 900);
                noActionCurrentIndex = (translateY / (-100));

                discoverFlag = 1;
                textContent[noActionCurrentIndex].style.display = "block";
                setTimeout(function() { scroll[noActionCurrentIndex].style.display = "block"; }, 2600);
                dummy[noActionCurrentIndex].style.zIndex = "1";
                $("nav, footer").css({ "opacity": "0" });
                setTimeout(function(){ $("nav, footer, #close").toggle() }, 1500);
                optionsContainer[0].style.display="none";
                discoverjs[noActionCurrentIndex].style.opacity = "0";
                line[noActionCurrentIndex].style.opacity = "0";
                setTimeout(function(){ discoverjs[noActionCurrentIndex].style.display = "none" }, 1500);
                setTimeout(function(){ line[noActionCurrentIndex].style.display = "none" }, 1500);
                caseTop[noActionCurrentIndex].classList.add("class-transition-top");
                caseRight[noActionCurrentIndex].style.left = "55%";
                caseRight[noActionCurrentIndex].classList.add("class-transition-right");
                caseBottom[noActionCurrentIndex].classList.add("class-transition-bottom");
                break;
            case "#workshops":
                var temp = 3;
                translateY = temp * (-100);
                option[temp].classList.add("active");
                option[noActionCurrentIndex].classList.remove("active");
                heading[noActionCurrentIndex].style.opacity = "0";
                setTimeout(function(){ heading[temp].style.opacity = "1" }, 1500);
                line[noActionCurrentIndex].style.opacity = "0";
                setTimeout(function(){ line[temp].style.opacity = "1" }, 1100);
                discoverjs[noActionCurrentIndex].style.opacity = "0";
                setTimeout(function(){ discoverjs[temp].style.opacity = "1" }, 1100);
                caseRight[noActionCurrentIndex].setAttribute("style", "left: 0");
                setTimeout(function(){ caseRight[temp].setAttribute("style", "left: 55%") }, 900);
                optionsContainer[0].style.opacity = "0";
                setTimeout(function(){ optionsContainer[0].style.opacity = "1" }, 1100);
                setTimeout(function(){ parentContainer.setAttribute("style", "transform: translateY(" + translateY + "vh)") }, 900);
                noActionCurrentIndex = (translateY / (-100));

                discoverFlag = 1;
                textContent[noActionCurrentIndex].style.display = "block";
                setTimeout(function() { scroll[noActionCurrentIndex].style.display = "block"; }, 2600);
                dummy[noActionCurrentIndex].style.zIndex = "1";
                $("nav, footer").css({ "opacity": "0" });
                setTimeout(function(){ $("nav, footer, #close").toggle() }, 1500);
                optionsContainer[0].style.display="none";
                discoverjs[noActionCurrentIndex].style.opacity = "0";
                line[noActionCurrentIndex].style.opacity = "0";
                setTimeout(function(){ discoverjs[noActionCurrentIndex].style.display = "none" }, 1500);
                setTimeout(function(){ line[noActionCurrentIndex].style.display = "none" }, 1500);
                caseTop[noActionCurrentIndex].classList.add("class-transition-top");
                caseRight[noActionCurrentIndex].style.left = "55%";
                caseRight[noActionCurrentIndex].classList.add("class-transition-right");
                caseBottom[noActionCurrentIndex].classList.add("class-transition-bottom");
                break;
            default:
                url_back();
                break;
        }
    };

});
