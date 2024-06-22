document.addEventListener('DOMContentLoaded', function() {
            const taskForm = document.getElementById('task-form');
            const taskList = document.getElementById('task-list');
            const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

            // Function to fetch and display tasks from the API
            function fetchTasks() {
                fetch(apiUrl)
                    .then(response => response.json())
                    .then(tasks => {
                        taskList.innerHTML = '';
                        tasks.forEach(task => {
                            addTaskToDOM(task);
                        });
                    });
            }

            // Function to add a task to the DOM
            function addTaskToDOM(task) {
                const taskDiv = document.createElement('div');
                taskDiv.classList.add('task');
                taskDiv.innerHTML = `
                    <h3>Nom: ${task.name}</h3>
                    <p>Description:${task.description}</p>
                    <p>Date limite:${task.deadline}</p>
                    <button class="delete-task">Supprimer</button>
                `;

                // Add event listener for the delete button
                taskDiv.querySelector('.delete-task').addEventListener('click', function() {
                    deleteTask(task.id, taskDiv);
                });

                taskList.appendChild(taskDiv);
            }

            // Function to add a task via the API
            taskForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const taskName = document.getElementById('task-name').value;
                const taskDesc = document.getElementById('task-desc').value;
                const taskDeadline = document.getElementById('task-deadline').value;

                const newTask = {
                    name: taskName,
                    description: taskDesc,
                    deadline: taskDeadline,
                    
                };

                fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newTask)
                })
                .then(response => response.json())
                .then(task => {
                    addTaskToDOM(task);
                    taskForm.reset();
                });
            });

            // Function to delete a task via the API
            function deleteTask(id, taskElement) {
                fetch(`${apiUrl}/${id}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (response.ok) {
                        taskElement.remove();
                    } else {
                        console.error('Failed to delete task');
                    }
                });
            }

            // Fetch and display tasks on page load
            fetchTasks();
        });