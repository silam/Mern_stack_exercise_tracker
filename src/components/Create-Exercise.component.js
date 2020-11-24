import React, {Component} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";


export default class CreateExercise extends Component{
    constructor(props)
    {
        super(props)
        this.userInput = React.createRef();
        this.cbRef = null;
        this.setCbRef = (domElement)=>{
            this.cbRef = domElement;
        }
        this.state = {
            username : '',
            description: '',
            duration: 0,
            date: new Date(),
            users: [

            ]
        }

        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuratiion = this.onChangeDuratiion.bind(this);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // lifecycle method
    componentDidMount() {

        // if (this.cbRef != null)
        // {
        //     this.cbRef.focus();
        // }

        // this.setState({
        //     users: ['test user'],
        //     username: 'test user'
        // })

        axios.get('http://localhost:5000/users')
        .then(res => {
            if ( res.data.length > 0)
            {
                this.setState(
                    {
                        users: res.data.map(user=> user.username) ,
                        username: res.data[0].username
                    
                    }
                )
            }
        })
    }
    onChangeUserName = function(e){
        this.setState({username: e.target.value})
    }
    
    onChangeDescription = (e) => {
        this.setState({description: e.target.value})

    }

    onChangeDuratiion = (e) => {
        this.setState({duration: e.target.value})

    }

    onChangeDate = (date) => {
        this.setState({date: date})

    }

    onSubmit = (e) => {
        e.preventDefault();
        // prevent html submit behavior from taking place
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);

        axios.post('http://localhost:5000/exercises/add', exercise)
        .then(res => console.log(res.data))
        window.location = '/';

    }

    render()
    {
        return (
            <div>
                <h2>Create Exercise Log</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>User Name:</label>
                        <select ref={this.userInput} //ref: access DOM Node directly within React
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUserName}>
                            {
                                this.state.users.map((user)=>{
                                    return <option
                                        key={user}
                                        value={user}
                                        >{user}
                                    </option>
                                })
                            }
                        </select>

                    </div>
                
                    <div class-name="form-group">
                        <label>Description</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        ></input>
                    
                    </div>


                    <div class-name="form-group">
                        <label>Duration</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuratiion}
                        ></input>
                    
                    </div>

                    <div class-name="form-group">
                        <label>Date</label>
                        <div>
                        <DatePicker 
                            className="form-control"
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                        >

                        </DatePicker>
                        </div>
                        
                    
                    </div>

                    <div className="form-group">
                            <input type="submit" value="Submit Changes" className="btn btn-primary" />
                    </div>
                </form>

            </div>
        )
    }
}