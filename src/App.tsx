import * as React from "react";
import Task from "./Task";
import {useEffect, useState} from "react";
import AddTask, {tTask} from "./addTask";
import EditTask from "./EditTask";
import {requestDeleteTask, requestEditTasks, requestGetTasks} from "./requestsToServer";
// +создание, +просмотр,
// редактирование (изменение полей или то, что задача выполнена) и
// +удаление задачи
// + возможность прикрепления файлов к записи
// + поля в задаче: заголовок, описание, дата завершения, прикрепленные файлы
// - если дата завершения истекла или задача выполнена, это должно быть визуально отмечено

const App = () => {
	const [tasks, setTasks] = useState<tTask[]>([])
	const [newTask, setNewTask] = useState<tTask>(null)
	const [addTask, setAddTask] = useState(false)
	const [editTask, setEditTask] = useState(false)
	const [editTaskId, setEditTaskId] = useState(null)
	const [deleteTaskId, setDeleteTaskId] = useState(null)
	//при обновлении данных edittask=null
	useEffect(() => {
		if (!editTaskId) return
		setEditTask(true)
	}, [editTaskId])

	useEffect(() => {
		const t = requestGetTasks()
		t.then(r => setTasks(JSON.parse(r)))
	}, [])

	useEffect(() => {
		if (!newTask) return
		const r = requestEditTasks(newTask)
		r.then(d => {
			setTasks(JSON.parse(d))
			setAddTask(false)
			setEditTask(false)
		})
	}, [newTask])
	useEffect(() => {
		if (!deleteTaskId) return
		const r = requestDeleteTask(deleteTaskId)
		r.then(d => {
			setTasks(JSON.parse(d))
		})
	}, [deleteTaskId])
	return (
		<div>
			<button onClick={() => setAddTask(true)}>add Task</button>
			<ul>
				{tasks.length > 0 &&
				tasks.map(task => <Task key={task.id} task={task}
																onEditTask={(id) => setEditTaskId(id)}
																onDeleteTask={(id) => setDeleteTaskId(id)}
				/>)
				}
			</ul>
			{
				addTask && <AddTask onAddTask={(task) => setNewTask(pr => task)}/>
			}
			{
				editTask && <EditTask
					onEditedTask={(task) => setNewTask(task)}
					onCloseEditTask={() => {
						setEditTask(false)
						//		setEditTaskId(null)
					}}
					editTaskData={tasks.find(t => t.id === editTaskId)}/>
			}
		</div>
	)
}
export default App