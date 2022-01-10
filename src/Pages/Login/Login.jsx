import { useState } from 'react'
import { useGlobalState } from 'state-pool';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './2.png'


export default function Login({ url }){
    const [username, setUsername] = useState()
    const [pass, setPass] = useState()

    let navigate = useNavigate()

    const [user, setUser, updateUser] = useGlobalState('user')

    let handleSubmit = () =>{
        let body = {
            username: username,
            password: pass
        }
        axios.post(`${url}/api/login`, body).then(res=>{
            window.localStorage.setItem('token', res.data.accessToken)
            window.localStorage.setItem('username', res.data.username)
            updateUser(user => {
                user.username = res.data.username
                user.auth = res.data.authorize
                user.token = res.data.accessToken
                user.id = res.data.id
            })
            navigate('/dashboard')
        }).catch(err=>alert("Username and password didn't match/user doesn't exist"))
    }

    return(
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-evenly flex-wrap" style={{backgroundColor:'#40cbd3'}}>
            <div className="col-11 d-flex align-items-center justify-content-evenly flex-wrap-reverse">
                <div className="p-4 col-12 col-md-5" style={{backgroundColor:"white", borderRadius:"30px"}}>
                    <h2>login to your account</h2>
                    <div className="d-flex flex-column my-4">
                        <label htmlFor="username" style={label}>username</label>
                        <input type="text" name="username" style={input} onChange={(e)=>setUsername(e.target.value)}/>
                    </div>
                    <div className="d-flex flex-column my-4">
                        <label htmlFor="pass" style={label}>password</label>
                        <input type="password" name="pass" style={input} onChange={(e)=>setPass(e.target.value)}/>
                    </div>
                    <div className="row d-flex justify-content-end">
                        <button type="button" className="btn col-3 mx-1" style={button} onClick={handleSubmit}>Login</button>
                    </div>
                </div>
                <img src={logo} alt="logo" className="col-10 col-md-5"/>
            </div>
        </div>
    )
}

const input = {
    borderRadius: '30px',
    border: "none",
    padding: "0 15px",
    height: "30px",
    backgroundColor:"#C4C4C4",
    color:"white"
}
const label = {
    marginLeft: "20px",
    fontSize: "20px"

}
const button = {
    backgroundColor: "#40bcd3",
    borderRadius: "40px",
    border: "none",
    color: "white",
    fontSize: "18px"
}

const buttonC = {
    borderRadius: "40px",
    border: "none",
    color: "white",
    fontSize: "18px"
}