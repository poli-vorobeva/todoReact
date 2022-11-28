// export interface IResponseCanvasChart {
// 	status: string;
// 	data: typeDataForCanvasChart;
// }
import {tTask} from "./addTask";

export interface ITasksData {
	tasks: tTask[]
}
const baseurl= "https://todoserver-production.up.railway.app/"
//const baseurl= "http://localhost:5000/"
export async function requestGetTasks() {
	try {
		const response = await fetch(baseurl, {
			method: "GET",
		});
		return await response.text();

	} catch (e) {
		throw new Error(e);
	}
}

export async function requestEditTasks(task: FormData) {
	try {
		const response = await fetch(`${baseurl}modify`, {
			method: "POST",
			body: task,
		});
		return await response.text()
	} catch (e) {
		throw new Error(e);
	}
}
export async function requestSetMissedTasks(missedTasks:number[]){
	try {
		const response = await fetch(`${baseurl}missed`, {
			method: "POST",
			body: JSON.stringify(missedTasks)
		});
		return await response.text();
	} catch (e) {
		throw new Error(e);
	}
}
export async function requestDeleteFile(deleteFile:{ id: number, file:string }){
	if(!deleteFile)return
	try {
		const response = await fetch(`${baseurl}file`,
			{method: "POST", body: JSON.stringify({data: deleteFile})});
		return await response.text();
	} catch (e) {
		throw new Error(e);
	}
}
export async function requestDeleteTask(deleteTaskId: string) {
	try {
		const response = await fetch(`${baseurl}delete`, {
			method: "POST",
			body: JSON.stringify({ data: deleteTaskId.toString()})
		});
	return await response.text();
	} catch (e) {
		throw new Error(e);
	}
}
export async function requestChangeTaskStatus(taskNewStatus: { id: number, status: string }) {
	try {
		if (!taskNewStatus) return
		const response = await fetch(`${baseurl}status`,
			{method: "POST", body: JSON.stringify({data: taskNewStatus})});
		return await response.text();
	} catch (e) {
		throw new Error(e);
	}
}