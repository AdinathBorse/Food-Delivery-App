
import './LoginPopup.css'
import { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from "axios"


const LoginPopup = ({setShowLogin}) => {

    const {url,setToken} = useContext(StoreContext) 

    const [crntSrate, setCrntSrate] = useState('Login');
    const [data,setData] = useState({
      name:"",
      email:"",
      password:""
    })

    const onChangeHandler = (event )=>{
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}))
    }

    const onLogin = async (event)=>{
      event.preventDefault();

      let newUrl = url;
      if (crntSrate==="Login") {
        newUrl += "/api/user/login"
      }
      else{
         newUrl += "/api/user/register"
      }

      const response = await axios.post(newUrl,data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token)
        setShowLogin(false);
      }
      else{
        alert(response.data.message)
      }
    }


  return (
    <div className='login-popup'>
      <form  onSubmit={onLogin} action="" className="l-p-c"> { /* l-p-c = login-popup-container*/}
        <div className="l-p-title">
            <h2>{crntSrate}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" className="" />
        </div>
        <div className="i-p-input">
            {crntSrate==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Enter your Name' required />}

           
            <input name='email' onChange={onChangeHandler} value={data.email} type="text" placeholder='Enter your Email' required/>
            <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password'required/>
        </div>
        <button type='submit' >{crntSrate==="Sign up"?"Create Account":"Login"}</button>
        <div className="l-p-cond">
            <input type="checkbox" required/>
            <p>I agree to the Terms of Service and Privacy Policy</p>
        </div>
        {crntSrate==="Login"?<p>Create a new account? <span onClick={()=>setCrntSrate("Sign up")}>Click here</span></p>:
        <p>Already have an account?<span onClick={()=>setCrntSrate("Login")}>Login here</span></p>}
        
        
      </form>
    </div>
  )
}

export default LoginPopup
