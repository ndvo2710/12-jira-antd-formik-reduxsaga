import React from 'react';
import ReactHtmlParser from "react-html-parser";
import { avatar_1, avatar_2, avatar_3 } from '../../../assets/';


export default function Info(props) {
    const { projectDetail } = props;

    const renderAvatar = () => {
        return projectDetail.members?.map((user, index) => {
            return <div key={index} className="avatar">
                <img src={user.avatar} alt={user.avatar} />
            </div>
        })
    }


    return (
        <>
            <h3>{projectDetail.projectName}</h3>
            <section>
                {ReactHtmlParser(projectDetail.description)}
            </section>
            <div className="info" style={{ display: 'flex' }}>
                <div className="search-block">
                    <input className="search" />
                    <i className="fa fa-search" />
                </div>
                <div className="avatar-group" style={{ display: 'flex' }}>
                    {renderAvatar()}
                </div>
                <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
                <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
            </div>
        </>

    )
}