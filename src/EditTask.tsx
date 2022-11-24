import React, {useState} from "react";
import {tLoadedFile, tTask} from "./addTask";
import {downloadPromise} from "./downloadFile";
//multi part form data on client
//formData( append or by field)
//on server side also find
interface IEditTask {
	editTaskData: tTask,
	onCloseEditTask: () => void,
	onEditedTask:(task:tTask)=>void
}
const EditTask = ({editTaskData, onCloseEditTask, onEditedTask}:IEditTask) => {
	const [title, setTitle] = useState(editTaskData.title)
	const [description, setDescription] = useState(editTaskData.description)
	const [time, setTime] = useState(editTaskData.time)
	const [date, setDate] = useState(editTaskData.date)
	const [files, setFiles] = useState(editTaskData.files)
	const taskData = [
		{
			title: title,
			titleText: "Title",
			inputType: 'text',
			handler: setTitle
		},
		{
			titleText: "Description",
			title: description,
			handler: setDescription,
			inputType: 'textArea'
		},
		{
			titleText: 'Time',
			title: time,
			handler: setTime,
			inputType: 'time'
		},
		{
			titleText: 'Date',
			title: date,
			handler: setDate,
			inputType: 'date'
		}
	]
	const onAddFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
		downloadPromise(e).then((d: tLoadedFile) => {
			setFiles(fls => [...fls, d])
		})
	}
	return (
		<div>
			<span onClick={onCloseEditTask}>X</span>
			<h6>EditTask</h6>
			{
				taskData.map(t => {
					return (
						<p>
							<span>{t.titleText}:{t.title}</span>
							{
								t.inputType !== 'textArea'
									? <input type={t.inputType} value={t.title && t.title} onChange={e => t.handler(e.target.value)}/>
									: <textarea value={t.title} onChange={e => t.handler(e.target.value)}/>
							}
						</p>
					)
				})
			}

			<p>Files:
				{files.map(f => {
					return <span>{f.title}
						<button onClick={() => setFiles(fls => [...fls].filter(e => e.title !== f.title))}>Delete File</button>
			</span>
				})}
				<input type='file' onChange={onAddFile}/>
			</p>
			<button onClick={()=>{
				onEditedTask({title,description,time,date,files,status:editTaskData.status,id:editTaskData.id})
				//console.log(title,description,time,date,files)
			}}>Ready</button>
		</div>
	)
}
export default EditTask