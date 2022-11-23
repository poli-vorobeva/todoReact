import * as React from "react";
import Task from "./Task";
import {useEffect, useState} from "react";
import AddTask, {tTask} from "./addTask";
import EditTask from "./EditTask";
// +создание, +просмотр,
// редактирование (изменение полей или то, что задача выполнена) и
// +удаление задачи
// + возможность прикрепления файлов к записи
// + поля в задаче: заголовок, описание, дата завершения, прикрепленные файлы
// - если дата завершения истекла или задача выполнена, это должно быть визуально отмечено

const App = () => {
	const [tasks, setTasks] = useState<tTask[]>([{
		title: 'Task one',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur culpa illum nat',
		files: [],
		time: '',
		date: '',
		status: 'open',
		id: Date.now()
	},
		{
			title: 'Task Two',
			description: 'Consectetur adipisicing elit. Consectetur culpa illum nat',
			files: [],
			time: '',
			date: '',
			status: 'open',
			id: Date.now() - 10
		}])
	const [addTask, setAddTask] = useState(false)
	const [editTask, setEditTask] = useState(false)
	const [editTaskId, setEditTaskId] = useState(null)
	//при обновлении данных edittask=null
	useEffect(() => {
		if (!editTaskId) return
		setEditTask(true)
	}, [editTaskId])
	return (
		<div>
			<button onClick={() => setAddTask(true)}>add Task</button>
			<ul>
				{
					tasks.map(task => <Task key={task.id} task={task}
																	onEditTask={(id) => setEditTaskId(id)}
																	onDeleteTask={(id) => setTasks((prev) => {
																		return [...prev].filter(e => e.id !== id)
																	})}
					/>)
				}
			</ul>
			{
				addTask && <AddTask
					onAddTask={(task) => {
						setTasks(prev => [...prev, task])
						setAddTask(false)
					}
					}/>
			}
			{
				editTask && <EditTask
					onEditedTask={(task) => {
						setTasks(prev => {
							const taskIdx = prev.findIndex(e => e.id === task.id);
							const newT = [...prev]
								newT.splice(taskIdx, 1, task)
							console.log(newT)
							return newT
						})
					}
					}
					onCloseEditTask={() => {
						setEditTask(false)
						setEditTaskId(null)
					}}
					editTaskData={tasks.find(t => t.id === editTaskId)}/>
			}
		</div>
	)
}
export default App