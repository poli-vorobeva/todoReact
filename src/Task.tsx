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
	console.log(task.title,'-',task.status)
	const bgStyle = task.status == 'open' ? '#b34d02' : task.status == 'missed' ? '#6d022f' : '#05a06b'
	const dt = dayjs(task.date).format('MMMM D, YYYY h:mm A')
	return (
		<>
			<li className='taskItem' style={{background: bgStyle}}>
				<span className={'taskTitle'}>
						<span>{task.title}</span>
					{
						task.date && dt !== 'Invalid Date' && <span>{dt}</span>
					}
				</span>
				<span className='taskButtonsWrapper'>
						<button onClick={() => onEditTask(task.id)}>edit</button>
				<button onClick={() => onDeleteTask(task.id)}>delete</button>
				<button onClick={() => setShowTask(true)}>show</button>
				</span>
			</li>
			{
				showTask &&
				<ShowTask setShowTask={setShowTask} task={task} onChangeStatus={onChangeStatus}/>
			}
		</>
	)
}
export default Task