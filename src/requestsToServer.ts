// export interface IResponseCanvasChart {
// 	status: string;
// 	data: typeDataForCanvasChart;
// }
import {tTask} from "./addTask";

export interface ITasksData {
	tasks:tTask[]
}
export async function requestGetTasks()
	{
	try {
		const response = await fetch("http://localhost:3000/",{	method: "GET"	});
		const res=await response.text();
		return res
	} catch (e) {
		throw new Error(e);
	}
}
export async function requestEditTasks(task:tTask){
	console.log('requestEditTasks',task)
	try {
		//console.log(JSON.stringify(task),'$$$')
		const response = await fetch("http://localhost:3000/",{method: "POST",body:JSON.stringify(task)});
		//const r=await response.json()
		//console.log(response)
		const a=await response.text()
		console.log('RES',a)
		//console.log(await response.json())
		//console.log(await  response.text())
	//	const res=await response.text();
		return a
	} catch (e) {
		throw new Error(e);
	}
}
export async function requestDeleteTask(deleteTaskId:string){
	try {
		const response = await fetch(`http://localhost:3000/${deleteTaskId}`,{	method: "POST", body:deleteTaskId.toString()});
		const res=await response.text();
		console.log(res,'!!!')
		return res
	} catch (e) {
		throw new Error(e);
	}
}