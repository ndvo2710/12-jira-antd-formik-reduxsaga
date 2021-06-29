import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Menu from '../../components/TaskFlow/Menu';
import Modal from '../../components/TaskFlow/Modal';
import SideBar from '../../components/TaskFlow/SideBar';

import '../../index.css';



export const TaskFlowTemplate = (props) => {

    const { Component, ...restParam } = props;
    return <Route {...restParam} render={(propsRoute) => {
        return <>
            <div className="jira">
                <SideBar />
                <Menu />
                    <Component {...propsRoute} />
                <Modal />
            </div>
        </>
    }} />

} 