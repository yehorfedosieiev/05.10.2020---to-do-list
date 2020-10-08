const formAddTask = document.querySelector("#formAddTask");

formAddTask.addEventListener('submit', handleFormAdSubmit);

function handleFormAdSubmit(event){
    event.preventDefault();

    console.log('----------');
    console.log('this =', this);
    // console.dir(this);
    console.log('----------');
    console.log(this.querySelector('[name="title"]'));
    console.log('----------');
    console.log("то что в input =", this.querySelector('[name="title"]').value); // то что в input
    console.log('----------');

    const task = {
        title: this.querySelector('[name="title"]').value,
        status: 1, // 1 - todo, 2 - inprogress, 3 - done
        id: new Date().getTime()
    };

    
    localStorage.setItem(task.id, JSON.stringify(task));
    addTask(task);

    $('#modalAddTask').modal('hide');

    this.reset(); //метод у формы, чтобы сбросить все значения полей по умолчанию
}

function addTask(task){
    const taskList = document.querySelector(`[data-status="${task.status}"]`);
    console.log(`[data-status="${task.status}"]`);
    console.log('----------');
    console.log(task);
    console.log('----------');
    console.log(taskList);
    console.log('----------');

    const taskListItem = document.createElement("li");
    taskListItem.classList.add('list-group-item');
    taskListItem.innerText = task.title;
    taskList.appendChild(taskListItem);
    showStatistic ();
};

for(let key in localStorage){
    if (!localStorage.hasOwnProperty(key)) continue;
    
    const task = JSON.parse(localStorage[key]);
    console.log(task);
    console.log('----------');
    addTask(task);
}
//-----Homework-----

const removeAllTask = document.querySelector('#removeAllTask');

removeAllTask.addEventListener('click', removeTasks);

function removeTasks(){
    localStorage.clear();
    document.querySelector('[data-status]').innerHTML = '';
    // как найти все элементы и поместить их в массив???
    // Array.from(document.querySelectorAll('[data-status]').querySelectorAll('li'));
    showStatistic ();
}

function showStatistic (){
    let tasksCount={
        1: 0,
        2: 0,
        3: 0
    };

    for(let key in localStorage){
        if (!localStorage.hasOwnProperty(key)) continue;
        const task = JSON.parse(localStorage[key]);
        tasksCount[task.status]++;
    }

    for(let key in tasksCount){
        document.querySelector(`[data-status-count="${key}"]`).innerText = tasksCount[key];
    }
};