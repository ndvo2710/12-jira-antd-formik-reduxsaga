// get this from my other project : https://github.com/ndvo2710/11-todolist-redux-saga/commit/06d247c597a671b9d3611ca9d39fc5cc7ea68a9a

import React from 'react'
import styleLoading from './LoadingComponent.module.css';
import { useSelector } from 'react-redux';
import loadingGif from '../../../assets/imgLoading/loading.gif';

export default function LoadingComponent() {

    const { isLoading } = useSelector(state => state.LoadingReducer)

    if (isLoading) {
        return (
            <div className={styleLoading.bgLoading}>
                <img src={loadingGif} alt='loading.gif'/>
            </div>
        )
    } else {
        return ''
    }
}
