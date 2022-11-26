import * as React from "react";
import {useEffect, useState} from "react";
import {downloadFile, downloadPromise} from "./downloadFile";
import './styles/addTask.less'
import InputDate from "./InputDate";

export type tTask = {
	title: string,
	description: string,
	//todo add files type
	//todo remove files in creation
	files: any[],
	status: string,
	date: string,
	id: number
}

interface IAddTaskProps {
	onAddTask: (task: tTask) => void,
	onCloseForm: () => void
}

export type tLoadedFile = { data: string | ArrayBuffer | null, title: string }

const AddTask = ({onAddTask, onCloseForm}: IAddTaskProps): JSX.Element => {
	const [taskData, setTaskData] = useState<{ title: string, description: string }>({title: '', description: ''})
	const [titleAlert, setTitleAlert] = useState(false)
	const [descAlert, setDescAlert] = useState(false)
	const [submitAlert, setSubmitAlert] = useState(false)
	const [loadedFiles, setLoadedFiles] = useState<tLoadedFile[]>([])
	const [date, setDate] = useState('')

	const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!taskData.title || !taskData.description || !date ) {
			setSubmitAlert(true)
			const intr = setInterval(() => {
				setSubmitAlert(false)
				clearInterval(intr)
			}, 2000)
			return
		}
		onAddTask({
			title: taskData.title,
			description: taskData.description && taskData.description,
			files: loadedFiles,
			status: 'open',
			date,
			id: Date.now()
		})
	}

	const changeInput = (e: React.ChangeEvent<HTMLInputElement>, input: string) => {
		const stringData = e.target.value.trim()
		if (stringData.length < 2) {
			input === 'title' ? setTitleAlert(true) : setDescAlert(true)
		} else {
			input === 'title' ? setTitleAlert(false) : setDescAlert(false)
			setTaskData(pr => {
				return input === 'title' ? {...pr, title: stringData} : {...pr, description: stringData}
			})
		}
	}
	const onLoadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
		downloadPromise(e).then((d: tLoadedFile) => {
			setLoadedFiles(fls => [...fls, d])
		})
	}
	return (
		<>
			<div className='addTaskFormWrapper'>
				<span className="close" onClick={() => onCloseForm()}>X</span>
				{submitAlert && <h4>Check title description and time</h4>}
				{(titleAlert || descAlert) && <h4>Your text should be longer then two</h4>}
				<form onSubmit={onSubmitForm} className='addTaskForm'>
					<input type="text"
								 placeholder='Task Title'
								 style={{background: titleAlert ? 'red' : ''}}
								 onChange={(e) => changeInput(e, 'title')}
					/>
					<input type="text"
								 placeholder='Add Task Description'
								 style={{background: descAlert ? 'red' : ''}}
								 onChange={(e) => changeInput(e, 'description')}
					/>
					<InputDate changeHandler={(value)=>setDate(value)}/>
					<div className='fileWrapper'>
						<input type="file" onChange={onLoadFile}/>
						<span>Добавьте файл...</span>
					</div>
					<button>Ready</button>
				</form>
			</div>
		</>

	)
}
export default AddTask

