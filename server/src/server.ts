import {RequestListener} from "http";
import * as http from "http";
//const http = require('http');
const port = 3000;
const data = {
	[Date.now()]: {
		title: 'Task one',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur culpa illum nat',
		files: [],
		time: '',
		date: '',
		status: 'open',
		id: Date.now()
	},
	[Date.now() - 10]: {
		title: 'Task one',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur culpa illum nat',
		files: [],
		time: '',
		date: '',
		status: 'open',
		id: Date.now() - 10
	}
}
// const data = [{
// 	title: 'Task one',
// 	description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur culpa illum nat',
// 	files: [],
// 	time: '',
// 	date: '',
// 	status: 'open',
// 	id: Date.now()
// },
// 	{
// 		title: 'Task Two',
// 		description: 'Consectetur adipisicing elit. Consectetur culpa illum nat',
// 		files: [],
// 		time: '',
// 		date: '',
// 		status: 'open',
// 		id: Date.now() - 10
// 	}
// ]
function doRequest(request) {
	let body = ''
	return new Promise((res, rej) => {
		request.on('data', (chunk) => {
			body += chunk;
		});
		request.on('end', () => {
			res((body));
		});
		request.on('error', (err) => {
			rej(err);
		});
	});
}

const requestHandler: RequestListener = (request, response) => {
	const {method,url} = request
	response.setHeader("Access-Control-Allow-Origin", "*");
	response.setHeader("Access-Control-Allow-Credentials", "true");
	response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
	response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

	if (method === 'GET') {
//res.setEncoding('utf8');
		response.write(JSON.stringify(Object.values(data)))
		response.end()
	}
	if (method === 'POST') {
		doRequest(request).then((r: string) => {
			const task = JSON.parse(r)
			console.log(data[url.slice(1)],'%%')
			if(url.slice(1)){
				console.log("DELETEEE")
				delete data[url.slice(1)]
				console.log(data,'!!!!!!')
			}else{
				console.log("ADDDD")
				data[task.id] = task
			}
			response.write(JSON.stringify(Object.values(data)))
			response.end()
		})
	}
};

const server = http.createServer(requestHandler);
server.listen(port, () => {
	console.log(`server is listening on ${port}`);
});

export type tTask = {
	title: string,
	description: string,
	//todo add files type
	//todo remove files in creation
	files: any[],
	status: string,
	date: string,
	time: string,
	id: number
}