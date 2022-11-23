import * as React from "react";
import {tTask} from "./addTask";



const Task=({task}:{task:tTask}):JSX.Element=>{

	return(
		<li>
				<span>{task.title}</span>
				<button>edit</button>
				<button>delete</button>
				<button>show</button>
		</li>
	)
}
export default Task