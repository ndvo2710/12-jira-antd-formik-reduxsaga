import './App.css';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import { UserLoginTemplate } from './templates/home/UserLoginTemplate';
import Login from './pages/JiraClone/Login/Login';
import LoadingComponent from './components/GlobalSetting/LoadingComponent/LoadingComponent';
import Header from './components/Home/Header/Header';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import { HomeTemplate } from './templates/home/HomeTemplate';

function App() {
    return (
        <BrowserRouter>
            <LoadingComponent />
            <Switch>
                <HomeTemplate exact path='/home' Component={Home} />
                <HomeTemplate exact path='/about' Component={About} />
                <HomeTemplate exact path='/contact' Component={Contact} />
                <UserLoginTemplate exact path='/login' Component={Login} />
            </Switch>

        </BrowserRouter>
    );
}

export default App;
