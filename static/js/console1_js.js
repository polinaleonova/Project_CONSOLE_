$(document).ready(function() {
    var handler_area_writing,
        list_of_possible_command,
        command_string,
        area_view,
        tim,
        time_blink,
        activation_scrolling,
        speed_scroll = 1,
        current_dir = 'polina@polina-comp:~$',
        active_area;
        list_of_possible_command =['anynumber','help',''];
        command_string ='';
        active_area = $("#command_line");
        area_view = $("#area_view");
        $('.initial_path').html(current_dir);

//  Handling of event wheel to scrolling inner elements of the console
    function addOnWheel(elem, handler) {
      if (elem.addEventListener) {
        if ('onwheel' in document.getElementById("work_space")) {
          elem.addEventListener("wheel", handler);
        }
      }
    }

    addOnWheel(work_space, function(e) {
        activation_scrolling();
      var delta = e.deltaY || e.detail || e.wheelDelta;
      if (delta > 0){
        document.getElementById("work_space").scrollTop = document.getElementById("work_space").scrollTop + 50;
      }
      else {
            document.getElementById("work_space").scrollTop = document.getElementById("work_space").scrollTop - 50;
      }
    });
//


//    Handling of event wheel to scrolling inner elements of the console
//    $("#work_space").on('wheel',function(wheel_event){
//        var delta = wheel_event.deltaY || wheel_event.detail || wheel_event.wheelDelta;
//        if (delta>0){
//        document.getElementById("work_space").scrollTop = document.getElementById("work_space").scrollTop + 50;}
//        else{
//            document.getElementById("work_space").scrollTop = document.getElementById("work_space").scrollTop - 50;
//        }
//    });


//    Handling of event mouseover to scrolling inner elements of the console by putting the button up and down
    $("#move_down").on('mouseover' ,function() {
       tim = setInterval(function () {
           document.getElementById("work_space").scrollTop = document.getElementById("work_space").scrollTop + 1
       }, speed_scroll);
    });
    $("#move_down").on('mouseout', function(){clearInterval(tim)});
    $("#move_up").on('mouseover' ,function() {
       tim = setInterval(function () {
           document.getElementById("work_space").scrollTop = document.getElementById("work_space").scrollTop - 1
       }, speed_scroll);
    });
    $("#move_up").on('mouseout', function(){clearInterval(tim)});

//    Activation button up and down when the working place's size is more then console window's size
    activation_scrolling = function(){

    if (document.getElementById("work_space").scrollHeight >document.getElementById("work_space").clientHeight
        && document.getElementById("work_space").scrollTop == 0) {
        console.log(1);
        $("#move_up").children().removeClass('blink');
        $("#move_down").children().addClass('blink');
    }
    if  (document.getElementById("work_space").scrollHeight == document.getElementById("work_space").clientHeight
        && document.getElementById("work_space").scrollTop == 0 ){
        console.log(4);
        $("#move_down").children().removeClass('blink');
        $("#move_up").children().removeClass('blink');
    }
    if(document.getElementById("work_space").scrollHeight - document.getElementById("work_space").clientHeight > document.getElementById("work_space").scrollTop
        && document.getElementById("work_space").scrollHeight != 0 ){
        console.log(3);
        $("#move_down").children().addClass('blink');
        $("#move_up").children().addClass('blink');
    }
    if (document.getElementById("work_space").scrollHeight >document.getElementById("work_space").clientHeight
        && document.getElementById("work_space").scrollHeight - document.getElementById("work_space").clientHeight == document.getElementById("work_space").scrollTop) {
        console.log(2);
       $("#move_down").children().removeClass('blink');
        $("#move_up").children().addClass('blink');
    }
    };


//    Activation of the input string by the mouseclick on any place in the page
     $("#work_space, body").on("click", function(){
         $('#command_line').focus();

     });
//    activation_scrolling();
    handler_area_writing = function(e){
//        activation_scrolling();
        if (e.keyCode == 13){

            command_string = $('#command_line').val();
            if (command_string == 'anynumber'){
                $.ajax({
                url:"http://localhost:8000/any_number/",
                success:function(data){
                    $("#area_view").append('<span></span>');
                    $('#area_view span:last').html(current_dir+command_string);
                    $("#area_view").append('<span></span>');
                    $('#area_view span:last').addClass('in');
                    $("span[class='in']").typed({
                        strings: [data.parametr],
                        typeSpeed: -1000,
                        currentStringTyped: function(){
//                            activation_scrolling();
                            $("#work_space").scrollTop($("#work_space")[0].scrollHeight);
                        }
                    });
                    active_area.val('');
                }
                });
            }
            if (command_string == ''){
                $("#area_view").append('<span></span>');
                $('#area_view span:last').html(current_dir+command_string);
                active_area.val('');
            }
            if (list_of_possible_command.indexOf(command_string)==-1){
                    $("#area_view").append('<span></span>');
                    $('#area_view span:last').html(current_dir+command_string);

                $("#area_view").append('<span></span>');
                $('#area_view span:last').html(String(command_string)+':'+'This is non-existent command');
                active_area.val('');
            }
            $("#work_space").scrollTop($("#work_space")[0].scrollHeight);
        }
    };

    document.getElementById("command_line").addEventListener("keypress", handler_area_writing, false);

});



