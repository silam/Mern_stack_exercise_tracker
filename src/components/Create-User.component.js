import React, {Component} from "react";
import axios from "axios"

export default class CreateUser extends Component{
    
    constructor(props)
    {
        super(props)
        
        this.state = {
            username : '',
            
        }

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeUserName = function(e){
        this.setState({username: e.target.value})
    }

    onSubmit = (e)=>
    {
        e.preventDefault();

        const user = {
            username : this.state.username
        }

        axios.post('http://localhost:5000/users/add', user)
        .then((res) => {
            console.log(res.data);
        })
        .catch(err => console.log(err))
        console.log(user);
        this.setState({username: ""})
    }
    render(){
        return (
            <div>
                <h3> Create User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">

                    
                        <label>User Name</label>
                        <input type="text"
                            className="form-control"
                            required
                            value={this.state.username}
                            onChange={this.onChangeUserName}/>
                    </div>

                    <div className="form-group">
                        <input type="submit" className="btn btn-primary" value="Submit User"/>
                    </div>
                </form>
            </div>
        )
    }
}