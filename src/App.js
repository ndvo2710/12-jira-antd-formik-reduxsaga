import './App.css';
import { Switch, useHistory } from 'react-router-dom';
import { UserLoginTemplate } from './templates/home/UserLoginTemplate';
import Login from './pages/JiraClone/Login/Login';
import LoadingComponent from './components/GlobalSetting/LoadingComponent/LoadingComponent';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import { HomeTemplate } from './templates/home/HomeTemplate';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { ADD_HISTORY } from './redux/constants/Login/LoginTaskFlow';
import { TaskFlowTemplate } from './templates/taskflow/TaskFlowTemplate';
import index from './pages/TaskFlow';
import CreateTask from './components/TaskFlow/Task/CreateTask';

function App() {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: ADD_HISTORY, history: history });
    }, [])
    return (
        <>
            <LoadingComponent />
            <Switch>
                <HomeTemplate exact path='/' Component={Home} />
                <HomeTemplate exact path='/home' Component={Home} />
                <HomeTemplate exact path='/about' Component={About} />
                <HomeTemplate exact path='/contact' Component={Contact} />
                <UserLoginTemplate exact path='/login' Component={Login} />
                <TaskFlowTemplate exact path='/task' Component={index}/>
                <TaskFlowTemplate exact path='/createtask' Component={CreateTask}/>
            </Switch>

        </>
    );
}

export default App;
