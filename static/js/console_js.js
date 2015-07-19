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
                        $("span[class='in']").typed({
                            strings:[data.parameter],
                            typeSpeed: -1000,
                            shuffle: false,
                            currentStringTyped: function () {
                                work_space.scrollTop(work_space[0].scrollHeight);
                            }
                        });
                    active_area.val('');
                }
            };

            function command_manager(command_string) {
                sequence_command = command_string.replace(/ +/g, '/').trim();
                request.url = 'http://localhost:8000/commands/' + sequence_command ;
                    $.ajax(request);
            }
            command_manager(command_string);
            work_space.scrollTop(work_space[0].scrollHeight);
        }
    };
    document.getElementById("command_line").addEventListener("keypress", handler_area_writing, false);
});
