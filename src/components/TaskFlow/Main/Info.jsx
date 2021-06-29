import React from 'react';
import { avatar_1, avatar_2, avatar_3 } from '../../../assets/';


export default function Info() {
    return (
        <>
            <h3>Jira Clone Board</h3>
            <div className="info" style={{ display: 'flex' }}>
                <div className="search-block">
                    <input className="search" />
                    <i className="fa fa-search" />
                </div>
                <div className="avatar-group" style={{ display: 'flex' }}>
                    <div className="avatar">
                        <img src={avatar_1} alt='1' />
                    </div>
                    <div className="avatar">
                        <img src={avatar_2} alt='2' />
                    </div>
                    <div className="avatar">
                        <img src={avatar_3} alt='3' />
                    </div>
                </div>
                <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
                <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
            </div>
        </>

    )
}