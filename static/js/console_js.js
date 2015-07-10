$(document).ready(function() {
    var handler_area_writing,
        list_of_possible_command,
        list_sequence_command,
        command_string,
        area_view,
        tim,
        work_space = $("#work_space"),
        move_down = $("#move_down"),
        move_up = $("#move_up"),
        activation_scrolling,
        speed_scroll = 1,
        current_dir = 'polina@polina-comp:~$',
//        all_commands = {'help': function help(){return('help')}, 'a': function a() {}, 'anynumber': function anynumber(){return('any_number')}},
        active_area;
        list_of_possible_command = ['anynumber','help', ''];
        command_string ='';

    active_area = $("#command_line");
    area_view = $("#area_view");
    $('.initial_path').html(current_dir);
    list_sequence_command = command_string.split(' ');

//  Handling of event wheel to scrolling inner elements of the console
    function addOnWheel(elem, handler) {
      if (elem.addEventListener) {
        if ('onwheel' in document.getElementById("work_space")) {
          elem.addEventListener("wheel", handler);
        }
      }
    }

    addOnWheel(document.getElementById("work_space"), function(e) {
        activation_scrolling();
      var delta = e.deltaY || e.detail || e.wheelDelta;
      if (delta > 0){
        work_space.scrollTop(work_space.scrollTop() + 50);
      }
      else {
            work_space.scrollTop(work_space.scrollTop() - 50);
      }
    });


//    Handling of event wheel to scrolling inner elements of the console
//    work_space.on('wheel',function(wheel_event){
//        var delta = wheel_event.deltaY || wheel_event.detail || wheel_event.wheelDelta;
//        if (delta>0){
//        work_space.scrollTop() = work_space.scrollTop() + 50;}
//        else{
//            work_space.scrollTop() = work_space.scrollTop() - 50;
//        }
//    });


//    Handling of event mouseover to scrolling inner elements of the console by putting the button up and down
    move_down.on('mouseover' ,function() {
       tim = setInterval(function () {
           work_space.scrollTop(work_space.scrollTop() + 1);
       }, speed_scroll);
    });
    move_down.on('mouseout', function(){clearInterval(tim)});
    move_up.on('mouseover' ,function() {
       tim = setInterval(function () {
           work_space.scrollTop(work_space.scrollTop() - 1);
       }, speed_scroll);
    });
    move_up.on('mouseout', function(){clearInterval(tim)});

//    Activation button up and down when the working place's size is more then console window's size
    activation_scrolling = function(){
        var work_space_scrollHeight = work_space[0].scrollHeight,
            work_space_clientHeight = work_space[0].clientHeight,
            work_space_scrollTop = work_space.scrollTop(),
            move_up_children = move_up.children(),
            move_down_children = move_down.children();
        
        if (work_space_scrollHeight > work_space_clientHeight
            && work_space_scrollTop == 0) {
            console.log(1);
            move_up_children.removeClass('blink');
            move_down_children.addClass('blink');
            return
        }
        if  (work_space_scrollHeight == work_space_clientHeight
            && work_space_scrollTop == 0 ){
            console.log(4);
            move_down_children.removeClass('blink');
            move_up_children.removeClass('blink');
            return
        }
        if(work_space_scrollHeight - work_space_clientHeight > work_space_scrollTop
            && work_space_scrollHeight != 0 ){
            console.log(3);
            move_down_children.addClass('blink');
            move_up_children.addClass('blink');
            return
        }
        if (work_space_scrollHeight > work_space_clientHeight
            && work_space_scrollHeight - work_space_clientHeight == work_space_scrollTop) {
            console.log(2);
            move_down_children.removeClass('blink');
            move_up_children.addClass('blink');
        }
    };


//    Activation of the input string by the mouseclick on any place in the page
     $("#work_space, body").on("click", function(){
         $('#command_line').focus();

     });

    handler_area_writing = function(e){
        if (e.keyCode == 13) {
            command_string = $('#command_line').val();
            var request = {
                url: "",
                success: function (data) {
                    area_view.append('<span></span>');
                    $('#area_view span:last').html(current_dir + command_string);
                    area_view.append('<span></span>');
                    $('#area_view span:last').addClass('in');
                    $("span[class='in']").typed({
                        strings: [data.parametr],
                        typeSpeed: -1000,
                        currentStringTyped: function () {
                            work_space.scrollTop(work_space[0].scrollHeight);
                        }
                    });
                    active_area.val('');
                }
            };

            function command_manager(command_string) {
                if (command_string == '') {
                    area_view.append('<span></span>');
                    $('#area_view span:last').html(current_dir + command_string);
                    active_area.val('');
                    return
                }
                if (list_of_possible_command.indexOf(command_string) != -1) {
                    request.url = 'http://localhost:8000/' + command_string + '/';
                    $.ajax(request);
                    return
                }
                if (list_of_possible_command.indexOf(command_string) == -1) {
                    area_view.append('<span></span>');
                    $('#area_view span:last').html(current_dir + command_string);
                    area_view.append('<span></span>');
                    $('#area_view span:last').html(String(command_string) + ':' + 'This is non-existent command');
                    active_area.val('');
                    return
                }
//                this block for work with few commands in one string. example
              if  (list_sequence_command.length>0){}

            }
            command_manager(command_string);
            work_space.scrollTop(work_space[0].scrollHeight);
        }
    };
    document.getElementById("command_line").addEventListener("keypress", handler_area_writing, false);
});



