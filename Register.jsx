import React ,{Component} from 'react';
import './register.css';
class Register extends Component{
    constructor(props){
        super(props),
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        };
    }
        handleChange=(event)=>{
            const { name, value } = event.target;
        this.setState({ [name]: value });
        };
        handleSubmit = (event) => {
            event.preventDefault();
            // Access state values here for form submission
            const { name, email, password, confirmPassword } = this.state;
            console.log('Form Submitted:', { name, email, password, confirmPassword });
    
            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }
        };
        
    render(){
        return(
             <div className="register-container">
       
        <h2>Register</h2>
        <form action="/register" method="POST" onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange} required/>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={this.state.email} onChange={this.handleChange} required/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange} required/>
            </div>
            <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} required/>
            </div>
            <div className="form-group">
                <button type="submit">Register</button>
            </div>
        </form>
        <div className="login-link">
            <p>Already have an account? <a href="/login">Login here</a></p>
        </div>
    </div>
        );
    }
}

export default Register;
