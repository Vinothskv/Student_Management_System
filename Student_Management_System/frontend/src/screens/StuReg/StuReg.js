import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import {useFormik} from "formik"
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as yup from "yup";
import "./forms.css"
import Axios from "axios";

function StudentRegister(){

  const [checkMail,setCheckMail] = useState() 
      let navigate=useNavigate();
        if(checkMail==="Success"){
              navigate("/")
         }

// form validation using formik and yup

    const formik = useFormik({
       initialValues: {
          firstName:'',
          lastName:'',    
          email: '',
          DOB: '',
          education: '',
          location:'',
          about:''
        },
        validationSchema:yup.object({
            firstName:yup.string().max(10,"Maximum 15 Characters").required("*First Name is required"),
            lastName:yup.string().max(10,"Maximum 15 Characters").required("*Last Name is required(Can Using Initial Letter)"),
            email:yup.string().email("Email is Invalid").required("*Email is required"),
            DOB:yup.string().required("*Date of Birth required"),
            education:yup.string().uppercase().required("*Education is required(Uppercase)"),
            location:yup.string().required("*Location is required (City)"),
            about:yup.string().min(10,"*Details length minimum charactrs").required("*Details is required")
        }),
        onSubmit:values=>{ Axios.post("http://localhost:9000/api/Register",values).then((res)=>{setCheckMail(res.data)}).catch((error)=>{console.log(error)})}
      });

    return(
 <div className="f_div">
    <div className="arrow_icon" >
    <FaArrowLeft onClick={()=>{navigate("/")}} />
    </div>
      <div className="form_div">
           <p className="stu-title">Add Student Details</p>
           <form >
        <div className="row g-3 ">
           <label className="col-sm-2 col-form-label col-form-label-sm" >First Name&emsp;&ensp;:</label>
          <div className="col">
           <input type="text" name="firstName" className="form-control" id="inputEmail4" onChange={formik.handleChange} value={formik.values.firstName} placeholder="Enter your first name"/>
          { formik.errors.firstName ? <p className="error_text">{formik.errors.firstName}</p>:null}
           </div>
           <label  className="col-sm-2 col-form-label col-form-label-sm" >Last  Name&emsp;&emsp;:</label>
          <div className="col">
           <input type="text" name="lastName" className="form-control" id="inputEmail4" onChange={formik.handleChange} value={formik.values.lastName} placeholder="Enter your last name"/>
           { formik.errors.lastName ? <p className="error_text">{formik.errors.lastName}</p>:null}
          </div>
        </div>
        <div className="row g-3">
           <label  className="col-sm-2 col-form-label col-form-label-sm">Email&emsp;&emsp;&emsp;&ensp;&ensp;:</label>
          <div className="col">
          <input type="email" name="email" className="form-control" id="inputEmail4" onChange={formik.handleChange} value={formik.values.email} placeholder="Enter your email "/>
          { formik.errors.email ? <p className="error_text">{formik.errors.email}</p>:null}
          { (checkMail==="Error") ? <p className="error_text">*Email is Not Available</p>:null}
          </div>
           <label  className="col-sm-2 col-form-label col-form-label-sm">DOB&emsp;&emsp;&emsp;&emsp;&ensp;:</label>
          <div className="col">
           <input type="date" name="DOB" className="form-control" id="inputEmail4" onChange={formik.handleChange} value={formik.values.DOB} placeholder="dd/mm/yyyy"/>
           { formik.errors.DOB ? <p className="error_text">{formik.errors.DOB}</p>:null}
          </div>
        </div>
        <div className="row g-3">
            <label className="col-sm-2 col-form-label col-form-label-sm" >Education&emsp;&emsp;:</label>
          <div className="col">
            <input type="text" name="education" className="form-control" id="inputEmail4" onChange={formik.handleChange} value={formik.values.education} placeholder="Enter your education"/>
            { formik.errors.education ? <p className="error_text">{formik.errors.education}</p>:null}
           </div>
            <label  className="col-sm-2 col-form-label col-form-label-sm"  >Location&emsp;&emsp;&emsp;:</label>
          <div className="col">
            <input type="text" name="location" className="form-control" id="inputEmail4" onChange={formik.handleChange} value={formik.values.location} placeholder="Enter your location"/>
            { formik.errors.location ? <p className="error_text" >{formik.errors.location}</p>:null}
          </div>
        </div>
        <div className="row g-3">
            <label className="col-sm-2 col-form-label col-form-label-sm" >About&emsp;&emsp;&emsp;:</label>
          <div className="col">
          <textarea className="form-control text_area"  id="exampleFormControlTextarea1" rows="4" cols="50"  name="about" onChange={formik.handleChange} value={formik.values.about} placeholder="Enter your details" />
          { formik.errors.about ? <p className="error_text" >{formik.errors.about}</p>:null}
           </div>
        </div>
       
        <button className="sumbit_btn" type="submit" onClick={formik.handleSubmit} >sumbit</button>
        </form>
    </div>
  </div>
    )
}
export default StudentRegister;
