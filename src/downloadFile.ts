import {ChangeEvent} from "react";
import {tLoadedFile} from "./addTask";

export const downloadPromise=(e: ChangeEvent<HTMLInputElement>)=>{
	return new Promise(r=>{
		const fl: FileList | null = (<HTMLInputElement>e.target).files;
		if (fl) {
			const file: Blob = fl[0];
			const reader = new FileReader();
			let src: string | ArrayBuffer | null
			reader.onload =  () => {
				src =  reader.result;
				//src=file.name
				r({title:file.name,data:src})
				//const img= f.create('img').attribute('src',src as string).end();
				//parent.appendChild(img)
				//console.log('%%',src);
				//parent.innerText=''
				//********	parent.setAttribute('src', src as string);
				// console.log(parent.getAttribute('src'),'++++')
				//console.log(typeof src)
				//return src
			};
			reader.readAsDataURL(file);
		}

})
}
export async function downloadFile(e: ChangeEvent<HTMLInputElement>) {

}