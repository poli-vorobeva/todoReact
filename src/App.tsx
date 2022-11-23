import * as React from "react";
import Task from "./Task";
import {useState} from "react";
import AddTask, {tTask} from "./addTask";
// +создание, +просмотр,
// редактирование (изменение полей или то, что задача выполнена) и
// удаление задачи
// + возможность прикрепления файлов к записи
// + поля в задаче: заголовок, описание, дата завершения, прикрепленные файлы
// - если дата завершения истекла или задача выполнена, это должно быть визуально отмечено

const App = () => {
	const [tasks, setTasks] = useState<tTask[]>([{
		title: 'Task one',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur culpa illum nat',
		files: [],
		time: '',
		date: '',
		status: 'open',
		id:Date.now()
	},
		{
			title: 'Task Two',
			description: 'Consectetur adipisicing elit. Consectetur culpa illum nat',
			files: [],
			time: '',
			date: '',
			status: 'open',
			id:Date.now()-10
		}])
	const [addTask, setAddTask] = useState(false)
	return (
		<div>
			<button onClick={() => setAddTask(true)}>add Task</button>
			<ul>
				{
					tasks.map(task => <Task key={task.id} task={task}
																	onDeleteTask={(id)=>setTasks((prev)=>{
																		return [...prev].filter(e=>e.id!==id)
																	})}/>)
				}
			</ul>
			{
				addTask && <AddTask onAddTask={(task) => {
					setTasks(prev => [...prev, task])
					setAddTask(false)
				}
				}/>
			}
		</div>
	)
}
export default App