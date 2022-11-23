import * as React from "react";
import {useEffect, useState} from "react";
import {downloadFile, downloadPromise} from "./downloadFile";

export type tTask={
	title:string,
	description:string,
	//todo add files type
	//todo remove files in creation
	files:any[],
	status:string,
	date:string,
	time:string,
	id:number
}
export type tLoadedFile={ data:string | ArrayBuffer | null,title: string}
const AddTask = ({onAddTask}: { onAddTask: (task: tTask) => void }): JSX.Element => {
	const [taskData, setTaskData] = useState<{title:string,description:string}>({title:'',description:''})
	const [titleAlert,setTitleAlert]=useState(false)
	const [descAlert,setDescAlert]=useState(false)
	const [loadedFiles,setLoadedFiles]=useState<tLoadedFile[]>([])
	const [time,setTime]=useState(null)
	const [date,setDate]=useState(null)
	const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
		//todo clean inputs
		e.preventDefault()
		onAddTask({
			title: taskData.title,
			description: taskData.description,
			files: loadedFiles,
			status: 'open',
			date,	time,
			id:Date.now()
		})
	}

	const changeInput = (e: React.ChangeEvent<HTMLInputElement>, input: string) => {
		const stringData=e.target.value.trim()
		if(stringData.length<2){
			input==='title' ? setTitleAlert(true):setDescAlert(true)
		}else{
			input==='title' ? setTitleAlert(false):setDescAlert(false)
			setTaskData(pr => {
				return input === 'title' ? {...pr, title: stringData} : {...pr, description: stringData}
			})
		}
	}
	const onLoadFile=async (e: React.ChangeEvent<HTMLInputElement>)=>{
		downloadPromise(e).then((d:tLoadedFile)=> {
			setLoadedFiles(fls=>[...fls, d])
		})
	}
	return (
		<>
			{(titleAlert||descAlert) && <h4>Your text should be longer then two</h4>}
			<form onSubmit={onSubmitForm}>
				<input type="text"
							 placeholder='Task Title'
							 style={{background:titleAlert?'red':''}}
							 onChange={(e) => changeInput(e, 'title')}
				/>
				<input type="text"
							 placeholder='Add Task Description'
							 style={{background:descAlert?'red':''}}
							 onChange={(e) => changeInput(e, 'description')}
				/>
				<input type="time" onChange={(e) => setTime(e.target.value)}
				/>
				<input type="date" onChange={(e) => setDate(e.target.value)}
				/>
				<input type="file" onChange={onLoadFile}/><span>Load File...</span>
				<button>Ready</button>
			</form>
		</>

	)
}
export default AddTask

