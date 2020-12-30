import { useEffect, useState } from 'react'
import { cloneDeep } from "lodash";
import './styles.css'
import { defaultData } from "../../constants";
import CheckboxGroup from "../CheckboxGroup/";
import Select from "../Select";
import Button from "../Button";
const Modal=(props)=> {
	const { setModalFlag, filterArr, setFilterArr }= props

	const [filterData, setNewFilterData] = useState(filterArr);


	const[inputData, setInput]= useState('')
	const[textData, setText]= useState('')
	const[radioData, setRadio]= useState('')
	
	const[selectData, setSelect]= useState(null)


	const saveFilters=()=>{
	
		setFilterArr(filterData);
		setModalFlag(false);
	}
	const clearFilters=()=>{

		setNewFilterData(defaultData);
	}
	const onChange = ({val, index, type}) => {
		const filterDataTemp = cloneDeep(filterData);


		if(type === 'checkboxGrp') {
			console.log("index", index)
			let removeVal = false;
			let arrIndex = 0;
			for (let k = 0; k < filterDataTemp[index].value.length; k++) {
				const d = filterDataTemp[index].value[k];
				if(val === d) {
					removeVal = true;
					arrIndex = k;
					break;
				}
			}
			console.log(removeVal);
			if(removeVal) {
				filterDataTemp[index].value.splice(arrIndex, 1);
			} else {
				filterDataTemp[index].value.push(val)
			}
		} else {
			filterDataTemp[index].value = [val]; 
		} 
		setNewFilterData(filterDataTemp);

	}

	const handleAllChecked = ({index}) => {
		const filterDataTemp = cloneDeep(filterData);
		let allChecked = filterDataTemp[index].value.length == 3 ? true:false;

		filterDataTemp[index].value = [];
		if(!allChecked) {
		
			filterDataTemp[index].value.push("Option 1", "Option 2", "Option 3");
		}
	
		setNewFilterData(filterDataTemp);
	}
	
	
	const renderFilters = () =>{
		const html = [];
		console.log(filterData);

		filterData.map((d,index)=>{
			const label = (<label>{d.label}</label>);
		
			if(d.type === 'select') {
				html.push(
					<Select  data={d} onChange={onChange} index={index} />
				);
				
			} else if(d.type === 'textarea') {
				html.push(<div className="filter">{label}<textarea  onChange={(e)=>onChange({val: e.target.value, index, type: d.type})} 
				 value={d.value.length ? d.value[0] : ''} 
					placeholder="Enter choice" className="inputType"/></div>)
			} else if (d.type === 'checkboxGrp') {
				
				html.push(
					<CheckboxGroup data={d} index={index} handleAllChecked={handleAllChecked} onChange={onChange}  />
					)
			} else{
				html.push(<div className="filter">{label}<input onChange={(e)=>onChange({val: e.target.value, index, type: d.type})} 
				
					value={d.value.length ? d.value[0] : ''}  placeholder="Enter choice" 
					type={d.type} className="inputType"/></div>
				)
			}
		})
		return html;
	}
  return (
    <div className="modal-container" id="parent-container">
      <div className="modal-inner-container">
      	<div>
      		<p className="close-icon" onClick={()=>setModalFlag(false)}>X</p>
      	</div>
      	<div className="filter-container">
      		{renderFilters()}
      	</div>

				<div className="button-wrap">
					<Button onClick={saveFilters} label="Apply"/>
					<Button onClick={clearFilters} label="Clear"/>
	      </div>
    	</div>
    </div>
  );
}


export default Modal;