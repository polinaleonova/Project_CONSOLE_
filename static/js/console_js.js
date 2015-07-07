$(document).ready(function(){
    var handler_move_up,
        handler_area_activate,
        handler_area_writing,
        list_of_possible_command,
        content,
        command_string,
        active_area;

    handler_move_up = function(event1){
    //    $('#move_up').addClass('up');
        $('#move_up').animate({'background':'red'}, 4000, 'linear')
    };
    handler_area_activate = function(event){
        $('#cursor').addClass('blinki');
        content = '&#10074';
        $('#cursor').html(content);
    };
    list_of_possible_command =['anynumber','help',''];
    command_string ='';
    active_area = $("#active_area");
    handler_area_writing = function(e){
        if (e.keyCode == 13){
            command_string = $('.working_area').val();
            if (command_string == 'anynumber'){
                alert(4)
                $.ajax({
                url:"http://localhost:8000/any_number/",
                success:function(data){
                    active_area.parent().before('<span></span>');
                    $('span:empty').addClass('js-command');
                    $('.js-command').html(command_string).removeClass('js-command');
                    active_area.parent().before('<span></span>');
                    $('span:empty').addClass('element');
//                    active_area.before('<br>');
                    $("span[class='element']").typed({
                        strings: [data.parametr],
                        onStringTyped: function(){
                            $("span[class='element']").scrollTop($("span[class='element']")[0].scrollHeight);
                        }
                    });
                    active_area.val('');
                }
                });
            }
            if (command_string == ''){
                $("#active_area").parent().before('<span></span>');
                active_area.val('');
            }
            if (list_of_possible_command.indexOf(command_string)==-1){
                active_area.parent().before('<span></span>');
                $('span:empty').addClass('js-command');
                $("span[class='js-command']").scrollTop($("span[class='js-command']")[0].scrollHeight);
                $('.js-command').html(command_string).removeClass('js-command');
                active_area.parent().before('<span></span>');
                $('span:empty').addClass('error');
                $('.error').html('This is non-existent command');
                active_area.val('');
            }

            if (document.getElementById('o').offsetHeight>360) {
//            alert (4);
                $("#o").css({'overflow-y':'scroll','height':'360px'});
//           $("span[class='js-command']").scrollTop($("span[class='js-command']")[0].scrollHeight);
        }
        }

    };


    document.getElementById("active_area").addEventListener("keypress", handler_area_writing, false);
    document.getElementById("active_area").addEventListener("mousedown", handler_area_activate, false);
    document.getElementById("move_up").addEventListener("mouseover", handler_move_up, false);
});
