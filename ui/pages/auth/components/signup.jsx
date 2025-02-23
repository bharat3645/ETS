import React, { useState, useEffect,useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { fetchApiData } from "./helpers/http";

const sucId = "custom-id-yes";
function SignUp(props) {
  const toastId = React.useRef(null);
  const cpass = React.useRef(null);

  const [info, setInfo] = useState({
    id: "",
    phone: "",
    password: "",
    name: "",
    branch: "",
  })  
  const [error, setError] = useState("")
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
  const handleChange = (e) => {
    const {name,value} = e.target
    const _ = {...info}
    _[name] = value
    console.log(info)
    console.log(_)
    setInfo(_)
  }
  const handleCpass = ()=>{
    if((info.password != cpass.current.value)) setError("Password does not match")
    else{setError("")}
  }
  useEffect(()=>{
    handleCpass()
  },[info])

  const submit = (e)=>{
    e.preventDefault()
    fetchApiData(
        "post", "signup", {
            headers: {
                "Content-Type": "application/json"
            },
            data: info
        }
    ).then(
        (res)=>{
            notify(res.data.message)
            setTimeout(()=>{location.href = "/login"},1000)
        }
    ).catch(
        (reason)=> {
            console.log(reason.response)
            notify(reason.response.data.message,"error")
        }
    )
  }

  return (
    <div className="R-upper flex flex-col gap-6">
      <div className="absolute">
        {
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
        }
      </div>
      <span className="hidden md:block text-[27.76px] font-medium">
        Sign Up
      </span>
      <div className="input-boxes flex flex-col gap-4">
        <input
          className="w-[341px] h-[57px] pl-6 rounded-md bg-[#F0EFFF] placeholder:text-[#A7A3FF]"
          type="text"
          name="id"
          placeholder="Enrollment Id"
          onChange={handleChange}
        />
        <input
          className="w-[341px] h-[57px] pl-6 rounded-md bg-[#F0EFFF] placeholder:text-[#A7A3FF]"
          type="text"
          name="branch"
          placeholder="Branch"
          onChange={handleChange}
        />
        <input
          className="w-[341px] h-[57px] rounded-md bg-[#F0EFFF] placeholder:text-[#A7A3FF] pl-6"
          type="text"
          name="name"
          placeholder="Create User name"
          onChange={handleChange}
        />
        <input
          className="w-[341px] h-[57px] rounded-md bg-[#F0EFFF] placeholder:text-[#A7A3FF] pl-6"
          type="text"
          name="phone"
          onChange={handleChange}
          placeholder="Contact number"
        />
        <input
          className="w-[341px] h-[57px] rounded-md bg-[#F0EFFF] placeholder:text-[#A7A3FF] pl-6"
          type="text"
          name="password"
          onChange={handleChange}
          placeholder="Password"
        />
        <input
          className="w-[341px] h-[57px] rounded-md bg-[#F0EFFF] placeholder:text-[#A7A3FF] pl-6"
          type="password"
          name='cpassword'
          placeholder="Confirm Password"
          onChange={handleCpass}
          ref={cpass}
        />
      </div>
      <div className="error text-[red] font-light font-[DM_Sans]">{error}</div>
      <button onClick={submit} className="w-[341px] h-[54px] rounded-md bgl text-white">
        Register
      </button>
    </div>
  );
}

export default SignUp;
