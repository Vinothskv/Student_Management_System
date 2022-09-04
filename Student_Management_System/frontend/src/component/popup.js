import { FaTrash} from "react-icons/fa";
import UserContext from "../userContext";
import { useContext,useState} from "react";
import  Axios  from "axios";
import "./popup.css"
export default function Popup({cancel}){
   
    const[checkDelete,setChecDelete]= useState()
      if(checkDelete==="Deleted"){
        cancel(false)
      window.location.reload()
      } 
    let editStudent=useContext(UserContext) 
    let deleteItem= editStudent.editItem[0].email
    const values={
      email:deleteItem
    } 
      //  fetch to backend

       const deleteData= async()=>{
       await Axios.post("http://localhost:9000/api/deleteData",values).then((res)=>{setChecDelete(res.data)}).catch((error)=>{})
       } 

    return(
        <div className="popup">
           <div className="popup_container">
            <div className="popup_div">
            <FaTrash className="delete_icon"/>
            <p className="poppup_p">Are you sure you want to Delete?</p>
            
            <button className="cancel_btn" onClick={()=>cancel(false)}>cancel</button>
            <button className="delete_btn" onClick={deleteData}>delete</button>
            </div>
             </div>
             </div>
    )

    
}