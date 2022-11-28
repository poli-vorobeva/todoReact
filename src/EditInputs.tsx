import InputDate from "./InputDate";
import React from "react";
import {tTaskData} from "./EditTask";

const EditInputs=({t,date}:{t: tTaskData, date: string})=>{
	return(
			<p>
				<span>{t.titleText}</span>
				{t.inputType === 'datetime-local'
					? <InputDate taskTime={date} changeHandler={value => t.handler(value)}/>
					: t.inputType !== 'textArea'
						? <input type={t.inputType} value={t.title && t.title} onChange={e => t.handler(e.target.value)}/>
						: <textarea value={t.title} onChange={e => t.handler(e.target.value)}/>
				}
			</p>
	)
}
export default EditInputs