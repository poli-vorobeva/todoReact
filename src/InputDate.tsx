import React, {useState} from "react";


const getDiaposone = (dateString: string, op: string) => {
	const datesplit = dateString.split('T')
	const d = datesplit[0].split('-')
	d[0] = op === '-' ? +d[0] - 1 + "" : +d[0] + 1 + ""
	const nd = d.join('-')
	datesplit[0] = nd
	return datesplit.join('T')
}

const InputDate = ({changeHandler, taskTime}: { taskTime?: string, changeHandler: (value: string) => void }) => {
	const date = new Date()
	const now = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}`
	const defaultDate=`${date.getFullYear()}-${date.getMonth()}-${date.getDate()+2}T${date.getHours()}:${date.getMinutes()}`
	const min = getDiaposone(now, '-')
	const max = getDiaposone(now, '+')
	const [value, setValue] = useState(taskTime || defaultDate)

	return (
		<input type="datetime-local"
					 value={value}
					 min={min}
					 max={max}
					 onChange={e => {
						 setValue(e.target.value)
						 changeHandler(e.target.value)
					 }}
		/>
	)
}
export default InputDate