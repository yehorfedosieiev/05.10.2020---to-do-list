const formAddTask = document.querySelector("#formAddTask");

formAddTask.addEventListener('submit', handleFormAdSubmit);

function handleFormAdSubmit(event){
    event.preventDefault();

    // console.log('this', this);
    // console.dir(this);

    // console.log(this.querySelector('[name="title"]'));

    // console.log("то что в input", this.querySelector('[name="title"]').value); // то что в input

    const task = {
        title: this.querySelector('[name="title"]').value,
        status: 1, // 1 - todo, 2 - inprogress, 3 - done
        id: new Date().getTime()
    };

    
    localStorage.setItem(task.id, JSON.stringify(task));
    addTask(task);

    $('#modalAddTask').modal('hide');

    this.reset();
}

function addTask(task){
    const taskList = document.querySelector(`[data-status="${task.status}"]`);
    console.log(`[data-status="${task.status}"]`)
    console.log(task)
    
    console.log(taskList);

    const taskListItem = document.createElement("li");
    taskListItem.classList.add('list-group-item');
    taskListItem.innerText = task.title;
    taskList.appendChild(taskListItem);
};

for(let key in localStorage){
    if (!localStorage.hasOwnProperty(key)) continue;
    
    const task = JSON.parse(localStorage[key]);
    addTask(task);
}