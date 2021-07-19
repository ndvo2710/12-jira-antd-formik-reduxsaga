import React from 'react';
import { avatar_1, avatar_2 } from '../../../assets/index';

export default function Content(props) {
    const { projectDetail } = props;
    const renderCardTaskList = () => {
        return projectDetail.lstTask?.map((taskListDetail, index) => {
            return <div key={index} className="card pb-2" style={{ width: '17rem', height: 'auto' }}>
                <div className="card-header">
                    {taskListDetail.statusName}
                </div>
                <ul className="list-group list-group-flush">
                    {taskListDetail.lstTaskDeTail.map((task, index) => {
                        return <li key={index} className="list-group-item" data-toggle="modal" data-target="#infoModal" style={{ cursor: 'pointer' }}>
                            <p className="font-weight-300">
                                {task.taskName}
                            </p>
                            <div className="block" style={{ display: 'flex' }}>
                                <div className="block-left">
                                    <p className="text-danger">{task.priorityTask.priority}</p>
                                </div>
                                <div className="block-right">
                                    <div className="avatar-group" style={{ display: 'flex' }}>
                                        {task.assigness.map((mem, index) => {
                                            return <div className="avatar" key={index}>
                                                <img src={mem.avatar} alt={mem.avatar} />
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </div>
                        </li>
                    })}
                </ul>
            </div>
        })
    }

    return (
        <div className="content" style={{ display: 'flex' }}>
            {renderCardTaskList()}

        </div>


    )
}