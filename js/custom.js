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

var wWidth;
var homeHeight;
var branchHeight;
var homeInnerHeight;
var branchInnerHeight;
var theta;
var thetaBranch;

var introContainerLeft;
var branchContainerLeft;

function initialise() {
    rem = 18;
    cursorWidth = 10;
    flag = 0;
    cursorLeft = 0;
    cursorTop = 0;

    prevScroll = 0;
    curScroll = 0;

    wWidth = $(window).width();
    homeHeight = $("#home").height();
    branchHeight = $("#branch").height();
    homeInnerHeight = $("#home").innerHeight();
    branchInnerHeight = $("#branch").innerHeight();

    theta = Math.atan(homeHeight / wWidth);
    theta = Math.floor(theta * (180 / Math.PI) * 100) / 100;
    $("#blade-home").css("transform",  "skewY(-" + theta + "deg)");

    thetaBranch = Math.atan(branchHeight / wWidth);
    thetaBranch = Math.floor(thetaBranch * (180 / Math.PI) * 100) / 100;
    $("#blade-branch").css("transform",  "skewY(-" + thetaBranch + "deg)");

    introContainerLeft = $("#container-intro").offset().left + 15;
    branchContainerLeft = $("#container-branch").offset().left + 15;
    var gap = 7.25 * rem;

    $("#home-razor-content").css({
        "left": introContainerLeft,
        "top": homeInnerHeight - gap
    });

    var gap2 = 8.5 * rem;

    $("#branch-razor-content").css({
        "left": branchContainerLeft,
        "top": branchInnerHeight - gap2
    });
}

$(document).ready(function() {

    initialise();



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

    /*****   Scroll Events   *****/
    $(window).scroll(function() {
        curScroll = $(window).scrollTop();
        if(curScroll >= prevScroll) {
            $("nav").css("transform", "translateY(-100%)");
        }
        else {
            $("nav").css("transform", "translateY(0)");
        }
        prevScroll = curScroll;
    });

    setTimeout(function() {
        $("#cover-1").width(0);
    }, 200);

    setTimeout(function() {
        $("#cover-2").width(0);
    }, 1200);

    setTimeout(function() {
        $("#cover-3").width(0);
    }, 2200);

    setTimeout(function() {
        $("#underline-3").width("100%");
    }, 3200);

    setTimeout(function() {
        $("#home-razor-content, #img-home-top").css({
            "opacity": "1"
        });
    }, 4200);

    var typed4 = new Typed("#typed-4", {
        strings: ["Bio Engineering", "Chemical Engineering", "Civil Engineering", "Computer Science and Engineering", "Electrical Engineering", "Electronics and Communication Engineering", "Electronics and Instrumentation Engineering", "Production Engineering"],
        typeSpeed: 70,
        backSpeed: 70,
        smartBackspace: false,
        backDelay: 200,
        loop: true,
        showCursor: false
    });

    var typed5 = new Typed("#typed-5", {
        strings: ["Tripura Sundari", "Neermahal", "Jampui Hills", "Sepahijala", "Unakoti", "Ujjayanta Palace", "Dumboor"],
        typeSpeed: 70,
        backSpeed: 70,
        smartBackspace: false,
        backDelay: 200,
        loop: true,
        showCursor: false
    });

});
