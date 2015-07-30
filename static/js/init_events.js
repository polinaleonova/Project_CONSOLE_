$(document).ready(function() {
    var move_down = $("#move_down"),
        move_up = $("#move_up"),
        work_space = $("#work_space"),
        tim;

    addOnWheel(work_space[0], function(e) {
        var delta = e.deltaY || e.detail || e.wheelDelta;
        if (delta > 0){
            work_space.scrollTop(work_space.scrollTop() + 50);
        }
        else {
            work_space.scrollTop(work_space.scrollTop() - 50);
        }
        activation_scrolling();
    });

//    Handling of event mouseover to scrolling inner elements of the console by putting the button up and down
    move_down.on('mouseover' ,function() {
       tim = setInterval(function () {
           activation_scrolling();
           work_space.scrollTop(work_space.scrollTop() + 1);
       }, 1);
    });
    move_down.on('mouseout', function(){clearInterval(tim)});
    move_up.on('mouseover' ,function() {

       tim = setInterval(function () {
           activation_scrolling();
           work_space.scrollTop(work_space.scrollTop() - 1);
       }, 1);
    });
    move_up.on('mouseout', function(){clearInterval(tim)});

//    Activation of the input string by the mouseclick on any place in the page
    $("#work_space, body").on("keypress", function(){
        $('#command_line').focus();
    });

});