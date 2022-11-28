import * as React from "react";
import {tTask} from "./addTask";
import dayjs from "dayjs";
import {useState} from "react";

interface IShowTask {
	task:tTask,
	onChangeStatus:(status:string)=>void,
	setShowTask:(val:boolean)=>void,
}
const ShowTask=({task,onChangeStatus,setShowTask}:IShowTask)=>{
	console.log(task.status)
	const dt = dayjs(task.date).format('MMMM D, YYYY h:mm A')
	const [status,setStatus]=useState(task.status)
	const buttonsObj= [
		{status:'open',title:"Open"},
		{status:'completed',title:"Completed"},
		{status:'missed',title:"Missed"}
	]
	console.log(task)
	console.log("STATUS",task.status)
	return(
		<div className='taskWrapper'>
			<div className='taskInside'>
				<span onClick={() => setShowTask(false)}>Х</span>
				<h6>Title: {task.title}</h6>
				{task.date && dt !== 'Invalid Date' && <p>Date : {dt}</p>}
				<p>{task.description}</p>
				<div>
					<p>Статус:
						{
							buttonsObj.map(b=><button className={b.status===task.status && 'activeButtonStatus'}
																				onClick={() => {
																					setStatus(b.status)
																					onChangeStatus(b.status)
																				}}
							>{b.title}</button>)
						}
					</p>
				</div>
				<div>Files:
					<p>{
						task.files.map(f => {
							return (<span>{f}</span>	)
						})
					}</p>
				</div>
			</div>
		</div>
	)
}

export default ShowTask