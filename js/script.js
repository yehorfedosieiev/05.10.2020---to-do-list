


formAddTask.addEventListener('submit', handleFormAdSubmit);
formEditTask.addEventListener('submit', handleFormEditSubmit);







for(let key in localStorage){
    if (!localStorage.hasOwnProperty(key)) continue;
    
    const task = JSON.parse(localStorage[key]);
    console.log(task);
    console.log('----------');
    addTask(task);
}

document.querySelector('body').addEventListener('click', HanleButtonClick);


//-----Homework 1-----


removeAllTask.addEventListener('click', removeTasks);



