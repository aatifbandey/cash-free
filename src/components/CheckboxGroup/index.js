import React from "react";
import  CheckBox  from '../Checkbox'

const CheckBoxGroup = (props) =>{
	const { index, data, onChange, handleAllChecked } = props;

	const checkForChecked = () => {
					
		let first = false,
			second = false,
			third = false;
		data.value.map((d)=>{
			if(d === 'Option 1') {
				first = true;
			} else if(d === 'Option 2') {
				second = true;
			} else if(d === 'Option 3') {
				third = true;
			}  

		})
		return {
			first, second, third
		}
	};

	const { first, second, third } = checkForChecked();

	return(
		<div className="filter checkbox-filter">
			<div className="check-uncheck">
				<input type="checkbox" onChange={()=>handleAllChecked({index})}  value="checkedall" className="check-all" checked={first && second && third } /> 
				<p>Check / Uncheck All</p>
			</div>
			<ul>
				<CheckBox handleCheckChildElement={(e)=>onChange({val: 'Option 1', index, type: data.type})} value={"Option 1"} id={1} isChecked={first}/>
				<CheckBox handleCheckChildElement={(e)=>onChange({val: 'Option 2', index, type: data.type})} value={"Option 2"} id={2} isChecked={second} />
				<CheckBox handleCheckChildElement={(e)=>onChange({val: 'Option 3', index, type: data.type})} value={"Option 3"} id={3} isChecked={third}/>
				</ul>
		</div>
	)
}

export default CheckBoxGroup;