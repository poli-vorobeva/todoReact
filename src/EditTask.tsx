import React, {useState} from "react";
import {tLoadedFile, tTask} from "./addTask";
import {downloadPromise} from "./downloadFile";
import './styles/editTask.less'
import EditInputs from "./EditInputs";

interface IEditTask {
	editTaskData: tTask,
	onCloseEditTask: () => void,
	onEditedTask: (task: FormData) => void,
	onDeleteFile:(fileName:string,id:number)=>void
}

export type tTaskData = {
	title: string,
	titleText: string,
	inputType: string,
	handler: React.Dispatch<React.SetStateAction<string>>
}
const EditTask = ({editTaskData, onCloseEditTask,onDeleteFile, onEditedTask}: IEditTask) => {
	if(!editTaskData)return
	const [title, setTitle] = useState(editTaskData.title)
	const [description, setDescription] = useState(editTaskData.description)
	const [date, setDate] = useState(editTaskData.date)
	const [file, setFile] = useState([])
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
			titleText: 'Date',
			title: date,
			handler: setDate,
			inputType: 'datetime-local'
		}
	]
	const onAddFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
		downloadPromise(e).then((d: tLoadedFile) => {
			setFile(fls => [...fls, d])
		})
	}
	const onSubmitForm=()=>{
			const formData = new FormData()
			formData.append('title', title)
			formData.append('description', description)
			file.forEach(f => {
				f && formData.append('file', f.data, f.title)
			})
			formData.append('status', editTaskData.status)
			formData.append('date', date)
			formData.append('id', "" + editTaskData.id)
			onEditedTask(formData)
	}
	return (
		<div className='editTaskWrapper'>
			<div className='insideDiv'>
				<div>
					<h6>EditTask</h6>
					<span className='close' onClick={onCloseEditTask}>X</span>
				</div>
				{
					taskData.map(t => <EditInputs t={t} date={editTaskData.date}/>)
				}
				<p>Files:
					{
						editTaskData.files?.map(f => {
							return <span>{f}
								<button onClick={() => onDeleteFile(f,editTaskData.id)}>Delete File</button>
			</span>
						})}
					<input type='file' onChange={onAddFile}/>
				</p>
				<button onClick={() => onSubmitForm()}>Ready
				</button>
			</div>
		</div>
	)
}
export default EditTask