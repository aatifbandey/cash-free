import React from "react";

const Select = (props) =>{
	const { data, onChange, index } = props;
	return(
		<div className="filter">
			<label>{data.label}</label>
			<select onChange={(e)=>onChange({val: e.target.value, index, type: data.type})}  name="filters" id="filters">
				<option value={null} selected={!data.value.length}>Select</option>
				<option selected={data.value[0] === "Option 1"} value="Option 1">Option 1</option>
				<option selected={data.value[0] === "Option 2"} value="Option 2">Option 2</option>
				<option selected={data.value[0] === "Option 3"} value="Option 3">Option 3</option>
			</select>
		</div>
	)
}
export default Select;