import "../styles/register.css"

const Register = () => {
    return (

        <div className="registerContainer">
            <div className='signupbox'>
                <strong>
                    <h1>Register</h1>
                    <h4>It's free and only takes a minute</h4>
                </strong>
                <form>
                    <label>First Name</label>
                    <input type="text" placeholder="" />
                    <label>Last Name</label>
                    <input type="text" placeholder="" />
                    <label>Email</label>
                    <input type="email" placeholder="" />
                    <label>Password</label>
                    <input type="password" placeholder="" />
                    <label>Confirm Password</label>
                    <input type="password" placeholder="" />
                    <input type="button" value="Submit" />
                </form>
                <div className='para-2'>
                    Already have an account? <a href="login.html">Login here</a>
                </div>
            

            </div>
            
        </div>


    );
}

export default Register;

