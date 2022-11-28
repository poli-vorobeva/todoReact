// export interface IResponseCanvasChart {
// 	status: string;
// 	data: typeDataForCanvasChart;
// }
import {tTask} from "./addTask";

export interface ITasksData {
	tasks: tTask[]
}
//const baseurl= "https://todoserver-production.up.railway.app/"
const baseurl= "http://localhost:5000/"
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

export async function requestEditTasks(task: FormData) {
	try {
		//console.log(JSON.stringify(task),'$$$')
		const response = await fetch(`${baseurl}modify`, {
			method: "POST",
			body: task,
		});
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
export async function requestDeleteFile(deleteFile:{ id: number, file:string }){
	if(!deleteFile)return
	try {
		const response = await fetch(`${baseurl}file`,
			{method: "POST", body: JSON.stringify({data: deleteFile})});
		const res = await response.text();
		console.log(res, '!!!')
		return res
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
		const res = await response.text();
			console.log(res,'!!!')
		return res
	} catch (e) {
		throw new Error(e);
	}
}

export async function requestChangeTaskStatus(taskNewStatus: { id: number, status: string }) {
	try {
		if (!taskNewStatus) return
		const response = await fetch(`${baseurl}status`,
			{method: "POST", body: JSON.stringify({data: taskNewStatus})});
		const res = await response.text();
		console.log(res, '!!!')
		return res
	} catch (e) {
		throw new Error(e);
	}
}