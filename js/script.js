text_box = document.getElementById('task_input');
add_button = document.getElementById('task_add');
error = document.getElementById('error');
text_box.focus();
input_form = document.querySelector('form');
all_clear = document.querySelector("#clear");
this_ul = document.getElementById('show_task');
warning = document.querySelector('#warning')
auto_id = 0;
document.addEventListener('DOMContentLoaded', get_data)

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
            error.style.display = 'none';
            text_box.value = ''
            text_box.focus()
            text_box.style.borderColor = "#48CDCB";

            store = new LocalStorage();
            store.task_store(task);

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
    item = document.getElementById(e);
    store = new LocalStorage();
    store.remove_task(item)
    item.remove()
}

all_clear.onclick = function(){
    if (localStorage.getItem('tasks') === null) {
        warning.style.color = 'red';
        warning.innerText="No Task To Clear"
        warning.style.display = 'block'
    }
    else {
    localStorage.clear();
    this_ul.innerHTML = '';
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

class LocalStorage{
    constructor(){
        let tasks;
        this.tasks = tasks;
    }

    task_check(){
        if (localStorage.getItem('tasks') === null){
            this.tasks = [];
        }
        else {
            this.tasks = JSON.parse(localStorage.getItem('tasks'));
        }
    }

    task_store(task){
        this.task_check();
        this.tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }
    
    get_task(){
        this.task_check()
        this.tasks.forEach(task => {

        var ul = document.getElementById("show_task");
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(task + '   '));
        let auto_id_str = auto_id.toString()
        li.id = auto_id_str
        let link = document.createElement('a');
        link.setAttribute('href', '#')
        link.innerHTML = 'x';
        link.setAttribute('onclick', `remove_li(${auto_id_str})`);
        li.appendChild(link)
        ul.appendChild(li);
        auto_id+=1;

        });
    }

    remove_task(item){
        this.task_check();
        let li = item;
        li.removeChild(li.lastChild);
        
        this.tasks.forEach((task, index) =>{
            if (li.innerText.trim()  === task) {
                if (this.tasks.length <2){
                    
                    localStorage.clear()
                }
                else{
                    this.tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(this.tasks));

                }
            }
        });
    }

}

function get_data(){
    store = new LocalStorage();
    store.get_task();

}