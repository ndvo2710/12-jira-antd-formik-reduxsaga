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
import index from './pages/JiraClone/TaskFlow';
import CreateProject from './components/TaskFlow/Project/CreateProject';
import ProjectManagement from './components/TaskFlow/Project/ProjectManagement';

function App() {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: ADD_HISTORY, history: history });
        return () => {}

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
                <TaskFlowTemplate exact path='/taskflow' Component={index}/>
                <TaskFlowTemplate exact path='/createproject' Component={CreateProject}/>
                <TaskFlowTemplate exact path='/projectmanagement' Component={ProjectManagement}/>
            </Switch>

        </>
    );
}

export default App;
