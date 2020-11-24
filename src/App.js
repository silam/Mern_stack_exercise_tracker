import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from "./components/NavBar.component";
import ExcercisesList from "./components/Exercise-List.component"
import EditComponent from './components/Edit-Exercise.component'
import CreateExercise from './components/Create-Exercise.component'
import CreateUser from './components/Create-User.component'


function App() {
  return (
    <Router>
      <div className="container">
      <Navbar>

      </Navbar>
      <br/>
      <Route path="/" exact component={ExcercisesList}/>
      <Route path="/edit/:id" component={EditComponent}/>
      <Route path="/create" component={CreateExercise}/>
      <Route path="/user" component={CreateUser} />

      </div>
      
    </Router>
    
  );
}

export default App;
