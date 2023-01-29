import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./home";
import MyNotes from './mynotes'
import Favorites from "./favorites";

export default Pages = () =>{
    return(
        <Router>
            <Route exact path="/" component={Home}/>
            <Route path="/mynotes" component={MyNotes}/>
            <Route path="/favorites" component={Favorites}/>
        </Router>
    )
}