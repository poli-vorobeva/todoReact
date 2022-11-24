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
	[Date.now()-10]: {
		title: 'Task one',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur culpa illum nat',
		files: [],
		time: '',
		date: '',
		status: 'open',
		id: Date.now()-10
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
const requestHandler: RequestListener = (request, response) => {
	const {method} = request
	response.setHeader("Access-Control-Allow-Origin", "*");
	response.setHeader("Access-Control-Allow-Credentials", "true");
	response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
	response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

	if (method === 'GET') {
		response.write(JSON.stringify(Object.values(data)))
	}
	if (method === 'POST') {
		let body = [];
		request.on('data', (chunk) => {
			body.push(chunk);
		}).on('end', () => {
			// @ts-ignore
			body = Buffer.concat(body).toString();
			const bodyObj = JSON.parse(body)
			data[bodyObj?.id]=bodyObj
		})
		response.write(JSON.stringify(Object.values(data)))
	}
	response.end();
};

const server = http.createServer(requestHandler);
server.listen(port, () => {
	console.log(`server is listening on ${port}`);
});

