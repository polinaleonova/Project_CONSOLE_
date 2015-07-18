$(document).ready(function() {
    var handler_area_writing,
        list_sequence_command,
        command_string,
        area_view,
        strings_from_server,
        index_current_string,
        context,
        request,
        tim,
        template,
        work_space = $("#work_space"),
        move_down = $("#move_down"),
        move_up = $("#move_up"),
        activation_scrolling,
        speed_scroll = 1,
        func_name,func_arguments,
        current_dir = 'polina@polina-comp:~$',
        active_area;
        command_string ='';
        template = $('#console_string_templ').html();

//    **second method for getting list_of_possible_command
//    in this case list_of_possible_command - is not a global variable:

//    $.get('http://localhost:8000/list_commands/').done(
//        function(data){
//         list_of_possible_command = data.commands
//        }
//    );

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


//    Handling of event mouseover to scrolling inner elements of the console by putting the button up and down
    move_down.on('mouseover' ,function() {

       tim = setInterval(function () {
           activation_scrolling();
           work_space.scrollTop(work_space.scrollTop() + 1);
       }, speed_scroll);
    });
    move_down.on('mouseout', function(){clearInterval(tim)});
    move_up.on('mouseover' ,function() {

       tim = setInterval(function () {
           activation_scrolling();
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
              move_down.html('&#8609');
             move_up.html('');
            return
        }
        if  (work_space_scrollHeight == work_space_clientHeight
            && work_space_scrollTop == 0 ){
            move_down.html('');
            move_up.html('');
            return
        }
        if(work_space_scrollHeight - work_space_clientHeight > work_space_scrollTop
            && work_space_scrollHeight != 0 ){
            move_up.html('&#8607');
              move_down.html('&#8609');
            return

        }
        if (work_space_scrollHeight > work_space_clientHeight
            && work_space_scrollHeight - work_space_clientHeight == work_space_scrollTop) {
            move_up.html('&#8607');
              move_down.html('');
        }
    };


//    Activation of the input string by the mouseclick on any place in the page
     $("#work_space, body").on("keypress", function(){
         $('#command_line').focus();
     });

    handler_area_writing = function(e){
        if (e.keyCode == 13) {
            activation_scrolling();
            command_string = $('#command_line').val();
            context = current_dir + command_string;
            request = {
                url: "",
                success: function (data) {
                    area_view.append(_.template(template)({console_string : context}));
                    area_view.append('<span></span>');
                    $('#area_view span:last').addClass('in');

                    strings_from_server = data.parameter.split('\n');
                    index_current_string = 0;
                    function str_print(){
                        $("span[class='in']").typed({
                            strings: [strings_from_server[index_current_string]],
                            typeSpeed: -1000,
                            shuffle: false,
                            currentStringTyped: function () {
                                work_space.scrollTop(work_space[0].scrollHeight);
                            },
                            onStringTyped: function() {
                                index_current_string++;
                                if(index_current_string !== strings_from_server.length){
                                    area_view.append('<span></span>');
                                    $('#area_view span:last').addClass('in');
                                    str_print();
                                }
                            }
                        });
                    }
                    str_print();
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
                    active_area.val('');
                    return
                }

//                this block for work with few commands in one string. example
//                 $sum 3 4 2
//                 =>9
                  if  (list_sequence_command.length > 1 && list_of_possible_command.indexOf(func_name)!= -1 ){
                      var args = '';
                      for ( var arg = 1; arg<list_sequence_command.length;arg++) {
                          if (arg !=' '){
                            args += list_sequence_command[arg]+'/';
                          }
                      }
                      request.url = 'http://localhost:8000/' + func_name + '/'+args.slice(0, -1);
//                      request.success = function(data){console.log(data)};
                        $.ajax(request);
                  }
            }
            command_manager(command_string);
            work_space.scrollTop(work_space[0].scrollHeight);
        }
    };
    document.getElementById("command_line").addEventListener("keypress", handler_area_writing, false);
});



