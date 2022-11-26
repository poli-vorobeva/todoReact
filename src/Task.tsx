import * as React from "react";
import {tTask} from "./addTask";
import {Simulate} from "react-dom/test-utils";
import timeUpdate = Simulate.timeUpdate;
import {useRef, useState} from "react";
import './styles/task.less'
import dayjs from "dayjs";

interface ITaskProps {
	task: tTask,
	onDeleteTask:(id:number)=>void,
	onEditTask:(id:number)=>void,
	onChangeStatusP:(data:{id:number,status:string})=>void
}
const Task = ({task,onDeleteTask,onEditTask,onChangeStatusP}: ITaskProps): JSX.Element => {
	const [showTask, setShowTask] = useState(false)
	const  onChangeStatus=(status:string)=>{
		onChangeStatusP({status,id:task.id})
	}
	const bgStyle=task.status === 'open' ? 'orange':task.status=== 'missed'?'red':'green'
	const dt=dayjs(task.date).format('MMMM D, YYYY h:mm A')
	console.log(dt,'$$$$$')
	return (
		<>
			<li style={{background: bgStyle}}>
				<span>{task.title}</span>
				{
					task.date && dt!=='Invalid Date' && <span>{dt}</span>
				}
				<button onClick={()=>onEditTask(task.id)}>edit</button>
				<button onClick={()=>onDeleteTask(task.id)}>delete</button>
				<button onClick={() => setShowTask(true)}>show</button>
			</li>
			{showTask && <div className='taskWrapper'>
				<div className='taskInside'>
					<span onClick={()=>setShowTask(false)}>Х</span>
					<h6>Title: {task.title}</h6>
					<p>Date : {task.date}</p>
					<p>{task.description}</p>
					<div>
						<p>Статус: {task.status}</p>
						<button onClick={()=>onChangeStatus('open')}>Open</button>
						<button onClick={()=>onChangeStatus('completed')}>Completed</button>
						<button onClick={()=>onChangeStatus('missed')}>Missed</button>
					</div>
					<div>Files:
						<p>{
							task.files.map(f=>{
								return (
									<>
										<span>{f.title}</span>
										<span>{f.data}</span>
									</>)
							})
						}</p>
					</div>
				</div>
			</div>}
		</>
	)
}
export default Task