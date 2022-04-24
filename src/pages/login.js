import { useState } from 'react';
import '../styles/login.css'


const Login = ({user}) => {
    const [loginUser,setLoginUser] = useState({email:'',password:''})
    function login(){
        let currentUser = loginUser
        setLoginUser(currentUser)
        if(loginUser.email == "k@gmail.com" && loginUser.password=="123456"){
            user[1](loginUser)
        }else{
            alert("No profile found ! Please register first")
        }

    }
    return (
        <div className="loginbody">
            <header className="welcome">
                <h1>Welcome Back!</h1>
            </header>
            <div className="login">

                <div className="login-form">
                    <h1>Login</h1>
                    <form>
                        <label>Email</label>
                        <input type="email" placeholder="Email" autocomplete="nope" onChange={e => loginUser.email = e.target.value} />
                        <label>Password</label>
                        <input type="password" placeholder="Password" autocomplete="new-password" onChange={e => loginUser.password = e.target.value} />
                        <p>Forgot Your Password? Click <a href="#" class="link">Here</a> </p>
                        <div>
                            <button class="btn">Register</button>
                            <input type="button" value="Log In" onClick={e => login()} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;