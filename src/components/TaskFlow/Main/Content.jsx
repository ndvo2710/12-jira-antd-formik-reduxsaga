import React from 'react';
import { avatar_1, avatar_2 } from '../../../assets/index';

export default function Content(props) {
    const { projectDetail } = props;
    const renderCardTaskList = () => {
        return projectDetail.lstTask?.map((taskListDetail, index) => {
            return <div key={index} className="card" style={{ width: '17rem', height: '25rem' }}>
                <div className="card-header">
                    {taskListDetail.statusName}
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item" data-toggle="modal" data-target="#infoModal" style={{ cursor: 'pointer' }}>
                        <p>
                            Each issue has a single reporter but can have multiple
                            assignees
                        </p>
                        <div className="block" style={{ display: 'flex' }}>
                            <div className="block-left">
                                <i className="fa fa-bookmark" />
                                <i className="fa fa-arrow-up" />
                            </div>
                            <div className="block-right">
                                <div className="avatar-group" style={{ display: 'flex' }}>
                                    <div className="avatar">
                                        <img src={avatar_1} alt={avatar_1} />
                                    </div>
                                    <div className="avatar">
                                        <img src={avatar_2} alt={avatar_2} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>

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