//  Handling of event wheel to scrolling inner elements of the console
function addOnWheel(elem, handler) {
  if (elem.addEventListener) {
    if ('onwheel' in document.getElementById("work_space")) {
      elem.addEventListener("wheel", handler);
    }
  }
}

//  Activation button up and down when the working place's size is more then console window's size
function activation_scrolling(){
    var work_space = $("#work_space"),
        move_down = $("#move_down"),
        move_up = $("#move_up"),
        work_space_scrollHeight = work_space[0].scrollHeight,
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
}
