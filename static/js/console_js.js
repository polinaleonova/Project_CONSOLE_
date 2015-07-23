$(document).ready(function() {
    var handler_area_writing,
        command_string,
        area_view,
        context,
        request,
        tim,
        template,
        work_space = $("#work_space"),
        move_down = $("#move_down"),
        move_up = $("#move_up"),
        activation_scrolling,
        speed_scroll = 1,
        current_dir = 'user@host_name:~$',
        history_list,
        current_index,
        initial_index,
        active_area;
        command_string ='';
        template = $('#console_string_templ').html();
    active_area = $("#command_line");
    area_view = $("#area_view");
    $('.initial_path').html(current_dir);
    history_list = JSON.parse($.jStorage.get('histor'));
    initial_index = history_list.length;
    current_index = initial_index;

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
        if (e.keyCode == 38){
            e.preventDefault();
            history_list = JSON.parse($.jStorage.get('histor'));
            if (current_index <= 0){
                current_index = 0
            }
            else{
                current_index -= 1;
            }
           $('#command_line').val(history_list[current_index]);
        }

        if (e.keyCode == 40){
            e.preventDefault();
            history_list = JSON.parse($.jStorage.get('histor'));
            if (current_index >= history_list.length){
                current_index = history_list.length
            }
            else{
                current_index += 1;
            }
           $('#command_line').val(history_list[current_index]);
        }

        if (e.keyCode == 13) {
            activation_scrolling();
            command_string = $.trim($('#command_line').val());
            context = current_dir + ' '+command_string;
            history_list = JSON.parse($.jStorage.get('histor'));
            initial_index = history_list.length;
            current_index = initial_index;
            if (command_string != ''){
                history_list = JSON.parse($.jStorage.get('histor'));
                history_list.push(command_string);
                $.jStorage.set('histor', JSON.stringify(history_list));
            initial_index = history_list.length;
            current_index = initial_index;
            }

            request = {
                url: "",
                error:function(){
                    $('#area_view span:last').remove();
                    area_view.append('<span></span>');
                    $('#area_view span:last').addClass('error');
                    $('#error').html('Internal Server Error')
                },
                success: function (data) {
                    $('#area_view span:last').remove();
                     area_view.append('<span></span>');
                     $('#area_view span:last').addClass('in');
                     var strings_from_server = data.parameter.split('\n');
                    console.log(strings_from_server);
                     var index_current_string = 0;
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
                },
                complete:function () {
                    $("#area_active").prop('hidden', false);
                    $("#command_line").prop('disabled', false);
                    active_area.val('');
                    $('#command_line').focus();
                }
            };

            function command_manager(command_string) {
                var sequence_command = command_string.replace(/ +/g, '/').trim();
                request.url = 'http://localhost:8000/commands/' + sequence_command ;
                area_view.append(_.template(template)({console_string : context}));
                if(!command_string) return;
                $("#command_line").prop('disabled', true);
                $("#area_active").prop('hidden', true);
                area_view.append('<span></span>');
                $('#area_view span:last').addClass('b');
                $("span[class='b']").typed({
                    strings:['...'],
                    typeSpeed: 100,
                    shuffle: false,
                    startDelay: 0,
                    // backspacing speed
                    backSpeed: 100,
                    // shuffle the strings
                    // time before backspacing
                    backDelay: 0,
                    // loop
                    loop: true,
                    // false = infinite
                    loopCount: false
                });
                $.ajax(request);
            }
            command_manager(command_string);
            work_space.scrollTop(work_space[0].scrollHeight);
        }
    };
    document.getElementById("command_line").addEventListener("keydown", handler_area_writing, false);
});

