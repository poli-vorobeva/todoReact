import * as React from "react";
import {tTask} from "./addTask";
import {Simulate} from "react-dom/test-utils";
import timeUpdate = Simulate.timeUpdate;
import {useState} from "react";

interface ITaskProps {
	task: tTask,onDeleteTask:(id:number)=>void,onEditTask:(id:number)=>void
}
const Task = ({task,onDeleteTask,onEditTask}: ITaskProps): JSX.Element => {
	const [showTask, setShowTask] = useState(false)
	return (
		<>
			<li>
				<span>{task.title}</span>
				<span>{task.date}-{task.time}</span>
				<button onClick={()=>onEditTask(task.id)}>edit</button>
				<button onClick={()=>onDeleteTask(task.id)}>delete</button>
				<button onClick={() => setShowTask(true)}>show</button>
			</li>
			{showTask && <div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right:0,
					bottom:0,
					background:'olive'
				}}
				onMouseLeave={() => console.log('leave')}>
				<span onClick={()=>setShowTask(false)}>Х</span>
				<h6>Title: {task.title}</h6>
				<p>Date : {task.date}</p>
				<p>Time: {task.time}</p>
				<p>{task.description}</p>
				<div>
					<p>Статус: {task.status}</p>
					<button>Open</button>
					<button>Completed</button>
					<button>Missed</button>
				</div>
				<div>Files:
					<p>{
						task.files.map(f=>{
							return <span>{f.title}</span>
						})
					}</p>
				</div>
			</div>}
		</>
	)
}
export default Task