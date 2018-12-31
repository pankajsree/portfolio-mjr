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

function initialise() {
    rem = 18;
    cursorWidth = 10;
    flag = 0;
    cursorLeft = 0;
    cursorTop = 0;

    prevScroll = 0;
    curScroll = 0;
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

    var typed = new Typed("#typed", {
        strings: ["I am Curious", "I am well Organised", "I love Sports", "I am Creative", "I know some Jokes", "I love Coffee"],
        typeSpeed: 70,
        backSpeed: 70,
        smartBackspace: true,
        backDelay: 200,
        loop: true,
        showCursor: false
    });

});
