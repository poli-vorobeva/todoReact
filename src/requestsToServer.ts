// export interface IResponseCanvasChart {
// 	status: string;
// 	data: typeDataForCanvasChart;
// }
import {tTask} from "./addTask";

export interface ITasksData {
	tasks: tTask[]
}
const baseurl= "https://todoserver-production.up.railway.app/"
//const baseurl= "https://localhost:5000/"
export async function requestGetTasks() {
	try {
		const response = await fetch(baseurl, {
			method: "GET",
		});
		const res = await response.text();
		return res
	} catch (e) {
		throw new Error(e);
	}
}

export async function requestEditTasks(task: tTask) {
	console.log('requestEditTasks', task)
	try {
		//console.log(JSON.stringify(task),'$$$')
		const response = await fetch(baseurl, {method: "POST", body: JSON.stringify(task)});
		//const r=await response.json()
		//console.log(response)
		const a = await response.text()
		console.log('RES', a)
		//console.log(await response.json())
		//console.log(await  response.text())
		//	const res=await response.text();
		return a
	} catch (e) {
		throw new Error(e);
	}
}

export async function requestDeleteTask(deleteTaskId: string) {
	try {
		const response = await fetch(`${baseurl}${deleteTaskId}`, {
			method: "POST",
			body: JSON.stringify({action: 'delete', data: deleteTaskId.toString()})
		});
		const res = await response.text();
		//	console.log(res,'!!!')
		return res
	} catch (e) {
		throw new Error(e);
	}
}

export async function requestChangeTaskStatus(taskNewStatus: { id: number, status: string }) {
	try {
		if (!taskNewStatus) return
		const response = await fetch(`${baseurl}${taskNewStatus.id}`,
			{method: "POST", body: JSON.stringify({action: 'change', data: taskNewStatus})});
		const res = await response.text();
		console.log(res, '!!!')
		return res
	} catch (e) {
		throw new Error(e);
	}
}