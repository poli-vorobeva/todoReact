import * as React from "react";
import {tTask} from "./addTask";
import {useState} from "react";
import './styles/task.less'
import dayjs from "dayjs";
import ShowTask from "./ShowTask";

interface ITaskProps {
	task: tTask,
	onDeleteTask: (id: number) => void,
	onEditTask: (id: number) => void,
	onChangeStatusP: (data: { id: number, status: string }) => void
}

const Task = ({task, onDeleteTask, onEditTask, onChangeStatusP}: ITaskProps): JSX.Element => {
	const [showTask, setShowTask] = useState(false)
	const onChangeStatus = (status: string) => {
		onChangeStatusP({status, id: task.id})
	}
	const bgStyle = task.status === 'open' ? 'orange' : task.status === 'missed' ? 'red' : 'green'
	const dt = dayjs(task.date).format('MMMM D, YYYY h:mm A')
	return (
		<>
			<li style={{background: bgStyle}}>
				<span>{task.title}</span>
				{
					task.date && dt !== 'Invalid Date' && <span>{dt}</span>
				}
				<button onClick={() => onEditTask(task.id)}>edit</button>
				<button onClick={() => onDeleteTask(task.id)}>delete</button>
				<button onClick={() => setShowTask(true)}>show</button>
			</li>
			{
				showTask &&
				<ShowTask setShowTask={setShowTask} task={task} onChangeStatus={onChangeStatus}/>
			}
		</>
	)
}
export default Task