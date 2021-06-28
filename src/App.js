import './App.css';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import { UserLoginTemplate } from './templates/home/UserLoginTemplate';
import Login from './pages/JiraClone/Login/Login';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <UserLoginTemplate exact path='/login' Component={Login} />
            </Switch>

        </BrowserRouter>
    );
}

export default App;
