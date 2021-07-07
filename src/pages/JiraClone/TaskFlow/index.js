import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Content from '../../../components/TaskFlow/Main/Content'
import Header from '../../../components/TaskFlow/Main/Header'
import Info from '../../../components/TaskFlow/Main/Info'
import { GET_PROJECT_DETAIL } from '../../../redux/constants/TaskFlowConst'

export default function IndexTaskFlow(props) {

    const { projectDetail } = useSelector(state => state.ProjectReducer)
    const dispatch = useDispatch();

    console.log('projectDetail', projectDetail)

    useEffect(() => {
        const { projectId } = props.match.params;
        dispatch({
            type: GET_PROJECT_DETAIL,
            projectId
        });

    }, [])

    return (
        <div className="main">
            <Header projectDetail={projectDetail}/>

            <Info projectDetail={projectDetail}/>

            <Content projectDetail={projectDetail}/>
        </div>

    )
}