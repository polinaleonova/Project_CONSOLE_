$(document).ready(function() {
    var handler_area_writing,
        list_of_possible_command,
        list_sequence_command,
        command_string,
        area_view,
        tim,
        template,
        work_space = $("#work_space"),
        move_down = $("#move_down"),
        move_up = $("#move_up"),
        activation_scrolling,
        speed_scroll = 1,
        func_name,func_arguments,
        current_dir = 'polina@polina-comp:~$',
//        all_commands = {'help': function help(){return('help')}, 'a': function a() {}, 'anynumber': function anynumber(){return('any_number')}},
        active_area;
        list_of_possible_command = ['anynumber','help', '', 'sum','find_max_palindrome', 'find_sum_digits_factorial'];
        command_string ='';
        template = $('#console_string_templ').html();
//        func_name = list_sequence_command[0];
//        func_arguments = list_sequence_command.slice(1);

    active_area = $("#command_line");
    area_view = $("#area_view");
    $('.initial_path').html(current_dir);
//    list_sequence_command = command_string.split(' ');

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
            work_space_scrollTop = work_space.scrollTop();
        if (work_space_scrollHeight > work_space_clientHeight
            && work_space_scrollTop == 0) {
//            console.log(1);
              move_down.html('&#8609');
             move_up.html('');
            return
        }
        if  (work_space_scrollHeight == work_space_clientHeight
            && work_space_scrollTop == 0 ){
//            console.log(4);
            move_down.html('');
            move_up.html('');
            return
        }
        if(work_space_scrollHeight - work_space_clientHeight > work_space_scrollTop
            && work_space_scrollHeight != 0 ){
//            console.log(3);
            move_up.html('&#8607');
              move_down.html('&#8609');
            return

        }
        if (work_space_scrollHeight > work_space_clientHeight
            && work_space_scrollHeight - work_space_clientHeight == work_space_scrollTop) {
//            console.log(2);
            move_up.html('&#8607');
              move_down.html('');
        }
    };


//    Activation of the input string by the mouseclick on any place in the page
     $("#work_space, body").on("click", function(){
         $('#command_line').focus();
     });

    handler_area_writing = function(e){
        if (e.keyCode == 13) {
            activation_scrolling();
            command_string = $('#command_line').val();
            var context = current_dir + command_string;
            var request = {
                url: "",
                success: function (data) {
                    area_view.append(_.template(template)({console_string : context}));
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
                list_sequence_command = command_string.trim().split(' ');
                func_name = list_sequence_command[0];
                func_arguments = list_sequence_command.slice(1);
                if (command_string == '') {
                    area_view.append(_.template(template)({console_string : context}));

                    active_area.val('');
                    return
                }
                if (list_of_possible_command.indexOf(command_string) != -1) {
                    request.url = 'http://localhost:8000/' + command_string + '/';
                    $.ajax(request);
                    return
                }
                if (list_of_possible_command.indexOf(command_string) == -1 && list_sequence_command.length == 1) {
                    area_view.append(_.template(template)({console_string : context}));
                    area_view.append(_.template(template)({console_string : String(command_string) + ':' + 'This is non-existent command'}));
//
                    active_area.val('');
                    return
                }
//                this block for work with few commands in one string. example
              if  (list_sequence_command.length > 1 && list_of_possible_command.indexOf(func_name)!=1 ){
                  var args = '';
                  for ( var arg = 1; arg<list_sequence_command.length;arg++) {
                      if (arg !=' '){
                      args += list_sequence_command[arg]+'/';
                  }
                  }

                  request.url = 'http://localhost:8000/' + func_name + '/'+args;
                  alert(request.url);
                    $.ajax(request);
              }

            }
            command_manager(command_string);
            work_space.scrollTop(work_space[0].scrollHeight);
        }
    };
    document.getElementById("command_line").addEventListener("keypress", handler_area_writing, false);
});



