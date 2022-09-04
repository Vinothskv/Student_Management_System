import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrash } from "react-icons/fa";
import {useNavigate} from "react-router-dom" ;
import { FaPen } from "react-icons/fa";
import { useState,useEffect,useContext} from "react";
import UserContext from "../../userContext.js"; 
import Popup from "../../component/popup"
import  Axios  from "axios";
import "./StuList.css"
    
    
function StudentList(){

  let editStudent=useContext(UserContext)

// page navigation using useNavigate

     let navigate=useNavigate()
      const[showPopup,setShowPopup]=useState(false) 
      const[listOfStudents,setListOfStudents] = useState([])
     
    // fetch to backend for getAll data

    const loadData= async()=>{
     const response= await Axios.get("http://localhost:9000/api/getData")
     setListOfStudents(response.data)
    } 

    useEffect(()=>{
     loadData();
    },[])

    
   return(
        <div>
          
            <div className="p_div" >
            <p className="title_p">Student managemengt system</p>
            <input className="form-control form_input" type="search" name="firstName"  placeholder="🔍Search"></input>
            <button className="add_btn" onClick={()=>{navigate("/StudentRegister")}} type="submit">Add</button>
            </div>
            <div className="table_div">
   <table className="table table-bordered">
  <thead>

    <tr className="head_row">
      <th  className="data_d1">ID</th>
      <th  className="data_d1">First Name</th>
      <th  className="data_d1">Last Name</th>
      <th  className="data_d1">Email</th>
      <th  className="data_d1">DOB</th>
      <th  className="data_d1">Education</th>
      <th  className="data_d1">Location</th>
      <th  className="data_d1">Action</th>
      <th  className="data_d1">Delete</th>

    </tr>
  </thead>
  <tbody>
  {/* list of Studentlist using map */}
  { listOfStudents.map((item,index)=>{
    return(
    <tr className="data_row" key={index+1}>
      <td >{item.ID}</td>
      <td  >{item.firstName}</td>
      <td  >{item.lastName}</td>
      <td >{item.email}</td>
      <td >{item.DOB}</td>
      <td >{item.education.toUpperCase()}</td>
      <td >{item.location}</td>
      <td  className="action_edit" onClick={()=>{
       editStudent.editItem.push(item)
       navigate("/StudentUpdate")
     }}><FaPen className="edit_icon"/>edit</td>
      <td className="action_delete" onClick={()=>{
         editStudent.editItem.push(item)
        setShowPopup(true) }}><FaTrash  className="edit_icon"/>delete</td>
      </tr> 
      )
  })} 
  </tbody>
  </table>  
</div> 
{showPopup ? <Popup cancel={setShowPopup} />:null}
</div>
    )
}
export default StudentList;