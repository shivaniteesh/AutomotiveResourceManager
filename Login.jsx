import React,{Component} from 'react';
import './login.css';
class Login extends Component{
    constructor(props){
        super(props),
        this.state={
            role:'user',
             email: '',
             password: ''
        };
    }
    handleChange=(event)=>{
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    handleSubmit = (event) => {
        event.preventDefault(); 
        const { email, password, role } = this.state;

        console.log('Login Details:', { email, password, role });

      
        
    };

    render(){
        return(
    <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
       
        <select name="role" id="role"   value={this.state.role} onChange={this.handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
        </select>


        <input type="text" placeholder="Enter Email" name="email" value={this.state.email} onChange={this.handleChange}  required/>

      
        <input type="password" placeholder="Enter Password" name="password" value={this.state.password} onChange={this.handleChange} required/>

        <button type="submit">Login</button>

        </form>
    </div>
    )
    }
}
export default Login;
