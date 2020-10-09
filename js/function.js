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
    taskListItem.setAttribute('data-id', task.id); //добавляем li атрибут, а именно дату создания
    taskList.appendChild(taskListItem);
    
    //кнопка Delete на тикетах
    const btnDelete = document.createElement('button');
    btnDelete.classList.add('btn', 'btn-danger', 'btn-xs', 'btn-delete', 'pull-right');
    btnDelete.innerHTML = '<i class="glyphicon glyphicon-trash"></i>';
    taskListItem.appendChild(btnDelete);

    //кнопка Edit на тикетах
    const btnEdit = document.createElement('button');
    btnEdit.classList.add('btn', 'btn-warning', 'btn-xs', 'btn-edit', 'pull-right');
    btnEdit.innerHTML = '<i class="glyphicon glyphicon-pencil"></i>';
    taskListItem.appendChild(btnEdit);

    showStatistic ();
};

//добавление задач на форму
function handleFormAdSubmit(event){
    event.preventDefault(); //отменяет поведение по умолчанию - чтобы форма не отправляла на сервер данные

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

//редактирование задач
function handleFormEditSubmit(event){
    event.preventDefault();

    const task = {
        title: this.querySelector('[name="title"]').value,
        status: +this.querySelector('[name="status"]').value,
        id: this.querySelector('[name="id"]').value
    };

    localStorage.setItem(task.id, JSON.stringify(task));
    document.querySelector(`[data-id="${task.id}"]`).remove();
    addTask(task);

    $('#modalEditTask').modal('hide');

    showStatistic ();
};

//удаление всех задач с доски и очищение localStorage 
function removeTasks(){
    localStorage.clear();
    document.querySelector('[data-status]').innerHTML = '';
    // как найти все элементы и поместить их в массив???
    // Array.from(document.querySelectorAll('[data-status]').querySelectorAll('li'));
    showStatistic ();
}

//клик по кнопкам/обработка событий edit и delete
function handleButtonClick(event){
    // console.log(event.target.classList.contains('btn-delete'));
    
    // const target = event.target;
    
    //деструктуризация - то же самое, что и верхнее
    const {target} = event;
    
    //обработка кнопки delete
    if (event.target.classList.contains('btn-delete')){
        console.log(target.parentNode);
        const taskId = target.parentNode.getAttribute('data-id');
        console.log(taskId);
        localStorage.removeItem(taskId);
        target.parentNode.remove();
        showStatistic ();
    }

    //обработка кнопки edit
    if (event.target.classList.contains('btn-edit')){
        $('#modalEditTask').modal('show');
        const taskId = target.parentNode.getAttribute('data-id');
        const task = JSON.parse(localStorage.getItem(taskId));
        console.log('task', task);

        console.log(formEditTask.elements);
        for (let key in task){
            console.log('key', key);
            if(!formEditTask.elements[key]) continue;

            formEditTask.elements[key].value = task[key];
        }
    }

};

//показ/вычисление статистики
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