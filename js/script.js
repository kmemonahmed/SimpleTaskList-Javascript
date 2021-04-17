let task_arr = [];
text_box = document.getElementById('task_input');
add_button = document.getElementById('task_add');
error = document.getElementById('error');
text_box.focus();
input_form = document.querySelector('form');
all_clear = document.querySelector("#clear");
this_ul = document.getElementById('show_task');
warning = document.querySelector('#warning')
auto_id = 0;

input_form.addEventListener('submit', get_task)

function get_task (e) {
        task = text_box.value
        if (task.length < 1) {
            error.style.color = 'red';
            error.innerText="Task can't be empty"
            error.style.display = 'block'
            text_box.focus()
            text_box.style.borderColor = "red";
        }
        else {
        task_arr.push(task);
        error.style.display = 'none';
        text_box.value = ''
        text_box.focus()
        text_box.style.borderColor = "#48CDCB";

        var ul = document.getElementById("show_task");
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(task + '   '));
        auto_id_str = auto_id.toString()
        li.id = auto_id_str
        link = document.createElement('a');
        link.setAttribute('href', '#')
        link.innerHTML = 'x';
        link.setAttribute('onclick', `remove_li(${auto_id_str})`);
        li.appendChild(link)
        ul.appendChild(li);
        auto_id+=1;
        }
    e.preventDefault()
    warning.innerHTML = ''
}


function remove_li(e) {
    item = document.getElementById(e)
    item.remove()
}

all_clear.onclick = function(){
    if (task_arr.length < 1) {
        warning.style.color = 'red';
        warning.innerText="No Task To Clear"
        warning.style.display = 'block'
    }
    else {
    this_ul.innerHTML = '';
    task_arr = []
    }
}

function filter() {
    filter_input = document.getElementById('filter_task');
    filter_text = filter_input.value.toUpperCase();
    ul = document.getElementById('show_task');
    li = ul.getElementsByTagName('li');
    i = 0;

    for (i = 0; i<li.length; i++) {
        text_val = li[i].innerText;
        if (text_val.toUpperCase().indexOf(filter_text) > -1) {
            li[i].style.display = "";
        }
        else{
            li[i].style.display = "none"
        }
    }
}

