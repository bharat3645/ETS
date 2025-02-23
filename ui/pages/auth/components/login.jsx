import { Button, LinearProgress,TextField} from '@mui/material'
import { fetchApiData } from "./helpers/http";
import React from 'react';
import "./css/login.css"
import { ToastContainer, toast } from "react-toastify";

import { useFormik } from 'formik';
import * as yup from 'yup';
const validationSchema = yup.object({
    id: yup
      .string('Enter your email')
      .required('Id is requred'),
    password: yup
      .string('Enter your password')
      .min(4, 'Password should be of minimum 4 characters length')
      .required('Password is required'),
  });
  
const SignupForm = () => {
   const toastId = React.useRef(null);
   const notify = (msg,type)=>{
      if(! toast.isActive(toastId.current)) {
          switch(type){
              case "error":{
                toastId.current = toast.error(msg);
                  break
              }
              case "warn":{
                   toastId.current = toast.warn(msg);
                  break
              }
              default:{
              toastId.current = toast.info(msg);
              }
          }
        }
    }
   const formik = useFormik({
     initialValues: {
       id: '',
       password: '',
     },
     validationSchema: validationSchema,

     onSubmit: values => {
       submit(values);
     },
   });

    const submit = (info)=>{
       fetchApiData(
           "post", "login", {
               headers: {
                   "Content-Type": "application/json"
               },
               data: info
           }
       ).then(
           (res)=>{
                 console.log(res.data)

               localStorage.setItem("token", res.data.jwtToken)
               location.href = "/home" 
              }
       ).catch(
           (reason)=> {
               console.log(reason.response)
               notify(reason.response.data.message,"error")
           }
       )
     }
   return (
     <form onSubmit={formik.handleSubmit}>
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={true}
                  newestOnTop={true}
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
       <TextField
          fullWidth
          id="id"
          name="id"
          label="Id"
          value={formik.values.id}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.id && Boolean(formik.errors.id)}
          helperText={formik.touched.id && formik.errors.id}
          color="black"
          style={{color: "black", "margin-bottom": "5%"}}
          sx={{
            // Root class for the input field
            "& .MuiOutlinedInput-root": {
                color: "var(--body)",
            },
            // Class for the label of the input field
            "& .MuiInputLabel-outlined": {
               color: "var(--body)",
            },
            "& .MuiInputLabel-outlined": {
            "&.Mui-focused": {
             outline: "none"
            },
          },
          }}
        />
       <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          color="black"
          style={{color: "black","margin-bottom": "10%"}}
          sx={{
            // Root class for the input field
            "& .MuiOutlinedInput-root": {
                color: "var(--body)",
            },
            // Class for the label of the input field
            "& .MuiInputLabel-outlined": {
               color: "var(--body)",
            },
            "& .MuiInputLabel-outlined": {
            "&.Mui-focused": {
             outline: "none"
            },
          },
          }}
        />
       <Button variant="contained"  style={{"background-image": "var(--bg-h)","margin-bottom": "10%" ,"padding": "10px","font-size":"150%","font-family":"DM Sans"}}
       fullWidth type="submit"
       >
        Login
        </Button>
     </form>
   );
 };
export default SignupForm