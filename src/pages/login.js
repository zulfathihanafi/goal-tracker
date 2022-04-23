import '../styles/login.css'
const Login = () => {
    return (
        <div class="login">
            <div class="login-form">
                <form>
                    <h1>Login</h1>
                    <div class="content">
                        <div class="input-field">
                            <input type="email" placeholder="Email" autocomplete="nope" />
                        </div>
                        <div class="input-field">
                            <input type="password" placeholder="Password" autocomplete="new-password" />
                        </div> Forgot Your Password? Click
                        <a href="#" class="link">Here</a>
                    </div>
                    <div class="action">
                        <button>Register</button>
                        <button>Sign in</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;