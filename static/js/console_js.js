$(document).ready(function() {
    var handler_move_up,
        handler_move_down,
        handler_area_activate,
        handler_area_writing,
        list_of_possible_command,
        content,
        command_string,
        area_view,
        tim,
        speed_scroll = 1,
        current_dir = 'polina@polina-comp:~$',
        active_area;
    list_of_possible_command =['anynumber','help',''];
    command_string ='';
    active_area = $("#active_area");
    area_view = $("#area_view");

//

//
    handler_move_down = function(click_down) {
        document.getElementById("area_view").scrollTop = document.getElementById("area_view").scrollTop-100;
    };

    $("#move_down").on('mouseover' ,function() {
       tim = setInterval(function () {
           document.getElementById("area_view").scrollTop = document.getElementById("area_view").scrollTop + 1
       }, speed_scroll);
    });
    $("#move_down").on('mouseout', function(){clearInterval(tim)});
    $("#move_up").on('mouseover' ,function() {
       tim = setInterval(function () {
           document.getElementById("area_view").scrollTop = document.getElementById("area_view").scrollTop - 1
       }, speed_scroll);
    });
    $("#move_up").on('mouseout', function(){clearInterval(tim)});


    if (document.getElementById("area_view").scrollHeight >document.getElementById("area_view").clientHeight
        && document.getElementById("area_view").scrollTop == 0) {
        $("#move_down").addClass('ready_to_act');
    }
    if (document.getElementById("area_view").scrollTop != 0){
        $("#move_up").addClass('ready_to_act');
    }
    else {
        $("#move_up","#move_down").removeClass('ready_to_act')
    }


    handler_area_activate = function(event){
        $('#cursor').addClass('blinki');
        content = '&#10074';
        $('#cursor').html(content);
    };

        $('.initial').html(current_dir);

    handler_area_writing = function(e){
        if (e.keyCode == 13){

            command_string = $('.working_area').val();
            if (command_string == 'anynumber'){
                $.ajax({
                url:"http://localhost:8000/any_number/",
                success:function(data){
                    if ($("#area_view span:last").hasClass('initial')){
                        $('#area_view span:last').html(current_dir+command_string);
                    }
                    else{
                    $("#area_view").append('<span></span>');
                    $('#area_view span:last').html(current_dir+command_string);}
                    $("#area_view").append('<span></span>');
                    $('#area_view span:last').addClass('in');
                    $("span[class='in']").typed({
                        strings: [data.parametr],
                        typeSpeed: -1000,
                        currentStringTyped: function(){
                            $("#area_view").scrollTop($("#area_view")[0].scrollHeight);
                        }
                    });
                    active_area.val('');
                }
                });
            }
            if (command_string == ''){
                $("#area_view").append('<span></span>');
                active_area.val('');
            }
            if (list_of_possible_command.indexOf(command_string)==-1){
               $("#area_view").append('<span></span>');
                $('#area_view span:last').html(command_string);
                $("#area_view").append('<span></span>');
                $('#area_view span:last').html(String(command_string)+':'+'This is non-existent command');
                active_area.val('');
            }
            $("#area_view").scrollTop($("#area_view")[0].scrollHeight);
        }

    };



    document.getElementById("active_area").addEventListener("keypress", handler_area_writing, false);
    document.getElementById("active_area").addEventListener("mousedown", handler_area_activate, false);
});



