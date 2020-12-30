import { useState } from 'react'
import './styles.css'
import Modal from '../Modal';

import { defaultData } from "../../constants";


const Dashboard=()=> {
  console.log(defaultData)
	const[modalFlag, setModalFlag]= useState(false);

	const [filterArr, setFilterArr]= useState(defaultData);
  const [filterCount, setFilterCount]= useState(0);

  
  const updateFilterData = (data) => {
    let count = 0;
    data.map((d)=>{
      count = count + d.value.length;
    })
    setFilterCount(count);

    setFilterArr(data);
  }
	const closeModal=(target)=>{
		if(modalFlag && target.id==="parent-container") setModalFlag(false)
		
	}
  return (
    <div className="container"  onClick={(e)=>closeModal(e.target)}>
      <div className="inner-container">
      	<button className="filter-trigger" onClick={()=>setModalFlag(true)}>Filters {filterCount? `(${filterCount})`: ""}</button>
      </div>
      {modalFlag? <Modal setModalFlag={setModalFlag} filterArr={filterArr} setFilterArr={updateFilterData}/>:""}
    </div>
  );
}

export default Dashboard;
