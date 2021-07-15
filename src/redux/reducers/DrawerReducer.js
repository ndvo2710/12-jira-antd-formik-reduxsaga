import React from 'react';
import { CLOSE_DRAWER, OPEN_DRAWER, OPEN_FORM_CREATE_TASK, OPEN_FORM_EDIT_PROJECT, SET_SUBMIT_CREATE_TASK, SET_SUBMIT_EDIT_PROJECT } from '../constants/TaskFlowConst';

const initialState = {
    visible: false,
    title: '',
    ComponentContentDrawer: <p>default</p>,
    callBackSubmit: (propsValue) => { alert('click demo!') }
};

const DrawerReducer = (state = initialState, action) => {
    switch (action.type) {

        case OPEN_DRAWER:
            return { ...state, visible: true }
        case CLOSE_DRAWER:
            return { ...state, visible: false }
        case OPEN_FORM_EDIT_PROJECT: {
            state.visible = true;
            state.ComponentContentDrawer = action.Component;
            state.title = action.title;
            return { ...state }

        }
        case SET_SUBMIT_EDIT_PROJECT: {
            state.callBackSubmit = action.submitFunction;
            return { ...state };
        }
        case OPEN_FORM_CREATE_TASK: {
            state.visible = true;
            state.title = action.title;
            state.ComponentContentDrawer = action.Component;
            return { ...state };
        }
        case SET_SUBMIT_CREATE_TASK: {
            return { ...state, callBackSubmit: action.submitFunction }
        }


        default:
            return state
    }
}

export default DrawerReducer;