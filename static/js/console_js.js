$(document).ready(function() {
    var command_string,
        area_view,
        sequence_command,
        strings_from_server,
        index_current_string,
        context,
        request_opt,
        template,
        work_space = $("#work_space"),
        move_down = $("#move_down"),
        move_up = $("#move_up"),
        current_dir = 'user@host_name:~$',
        history_list,
        current_index,
        active_area;
        command_string = '';
        template = $('#console_string_templ').html();
    active_area = $("#command_line");
    area_view = $("#area_view");
    $('.initial_path').html(current_dir);
    history_list = JSON.parse($.jStorage.get('histor'));
    current_index = history_list.length;

    function command_manager(command_string) {
        sequence_command = command_string.replace(/ +/g, '/').trim();
        request_opt = {
            url: 'http://localhost:8000/commands/' + sequence_command,
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
                 strings_from_server = data.parameter.split('\n');
                 index_current_string = 0;
                 function str_print(){
                     $("span[class='in']").typed({
                         strings: [strings_from_server[index_current_string]],
                         typeSpeed: -1000,
                         shuffle: false,
                         contentType: 'string',
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
        area_view.append(_.template(template)({console_string : context}));
        if(!command_string) return;
        $("#command_line").prop('disabled', true);
        $("#area_active").prop('hidden', true);
        area_view.append('<span></span>');
        $('#area_view span:last').addClass('to-type');
        $("span[class='to-type']").typed({
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
        $.ajax(request_opt);
    }

    document.getElementById("command_line").addEventListener("keydown", function(e){
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
            context = current_dir + ' ' + command_string;
            history_list = JSON.parse($.jStorage.get('histor'));
            current_index = history_list.length;
            if (command_string != ''){
                history_list = JSON.parse($.jStorage.get('histor'));
                history_list.push(command_string);
                sequence_command = command_string.replace(/ +/g, '/').trim();
                $.ajax({url: 'http://localhost:8000/history/' + sequence_command,
                    error : function(){
                        console.log("команда не отправлена в history")
                    },
                    success : function(){
                        console.log("команда отправлена в history")
                    }
                });
                $.jStorage.set('histor', JSON.stringify(history_list));
                current_index = history_list.length;
            }

            command_manager(command_string);
            work_space.scrollTop(work_space[0].scrollHeight);
        }
    }, false);
});

