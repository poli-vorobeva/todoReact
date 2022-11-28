import * as React from "react";
import './styles/app.less'
import Task from "./Task";
import {useEffect, useState} from "react";
import AddTask, {tTask} from "./addTask";
import EditTask from "./EditTask";
//link to server with commits https://github.com/poli-vorobeva/todoServer
import {
	requestChangeTaskStatus,
	requestDeleteFile,
	requestDeleteTask,
	requestEditTasks,
	requestGetTasks, requestSetMissedTasks
} from "./requestsToServer";

const App = () => {
	const [tasks, setTasks] = useState<tTask[]>([])
	const [newTask, setNewTask] = useState<FormData>(null)
	const [addTask, setAddTask] = useState(false)
	const [editTask, setEditTask] = useState(false)
	const [editTaskId, setEditTaskId] = useState(null)
	const [deleteTaskId, setDeleteTaskId] = useState(null)
	const [taskNewStatus, setTaskNewStatus] = useState(null)
	const [deleteFile, setDeleteFile] = useState(null)
	useEffect(() => {
		const t = requestDeleteFile(deleteFile)
		t.then(r => {
			if (!r) return
			setTasks(JSON.parse(r))
		})
	}, [deleteFile])

	useEffect(() => {
		const t = requestChangeTaskStatus(taskNewStatus)
		t.then(r => {
			if (!r) return
			setTasks(JSON.parse(r))
		})
	}, [taskNewStatus])

	useEffect(() => {
		if (!editTaskId) return
		setEditTask(true)
	}, [editTaskId])

	useEffect(() => {
		const rq = requestGetTasks()
		rq.then((r) => {
			const tasks: tTask[] = JSON.parse(r)
			const missedTasksArr = checkMissedTasks(tasks)
			//после получения с сервера списка тасок, проверяем, если срок прошел, а статус не мисд то меняем его
			if (!!missedTasksArr.length) {
				const t = requestSetMissedTasks(missedTasksArr)
				t.then(apdTs => {
					const apdtdTasks = JSON.parse(apdTs)
					setTasks(apdtdTasks)
				})
			} else {
				setTasks(tasks)
			}
		})
	}, [])
	const checkMissedTasks = (tasks: tTask[]): number[] => {
		return tasks.map(t => {
			if (t.status === 'open' && (+new Date(t.date) < +Date.now()) || !+new Date(t.date)) {
				return t.id
			}
		})
	}
	useEffect(() => {
		if (!newTask) return
		const r = requestEditTasks(newTask)
		r.then(d => {
			const tasks: tTask[] = JSON.parse(d)
			setTasks(tasks)
			setAddTask(false)
			setEditTask(false)
		})
	}, [newTask])

	useEffect(() => {
		if (!deleteTaskId) return
		const r = requestDeleteTask(deleteTaskId)
		r.then(d => setTasks(JSON.parse(d)))
	}, [deleteTaskId])
	return (
		<div className='main'>
			<button className='addBtn' onClick={() => setAddTask(true)}>add Task</button>
			<ul>
				{tasks.length > 0 &&
				tasks.map(task => <Task key={task.id} task={task}
																onChangeStatusP={(data) => {
																	setTaskNewStatus(data)
																}}
																onEditTask={(id) => setEditTaskId(id)}
																onDeleteTask={(id) => setDeleteTaskId(id)}
				/>)
				}
			</ul>
			{
				addTask && <AddTask
					onCloseForm={() => setAddTask(false)}
					onAddTask={(task) => setNewTask(pr => task)}/>
			}
			{
				editTask && <EditTask
					onEditedTask={(task) => setNewTask(task)}
					onDeleteFile={(f, id) => setDeleteFile({id, file: f})}
					onCloseEditTask={() => {
						setEditTask(false)
						setEditTaskId(null)
					}}
					editTaskData={tasks.find((t: tTask) => t.id === editTaskId)}/>
			}
		</div>
	)
}
export default App