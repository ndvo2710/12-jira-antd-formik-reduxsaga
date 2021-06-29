import React from 'react'
import { main_avatar } from '../../assets/';

export default function Menu() {
    return (
        <div className="menu">
            <div className="account">
                <div className="avatar">
                    <img src={main_avatar} alt='main_avatar' />
                </div>
                <div className="account-info">
                    <p>Task Flow App</p>
                    <p>Report bugs</p>
                </div>
            </div>
            <div className="control">
                <div>
                    <i className="fa fa-credit-card" />
                    <span>Dashboard</span>
                </div>
                <div>
                    <i className="fa fa-cog" />
                    <span>Project Settings</span>
                </div>
            </div>
            <div className="feature">
                <div>
                    <i className="fa fa-truck" />
                    <span>Releases</span>
                </div>
                <div>
                    <i className="fa fa-equals" />
                    <span>Issues and filters</span>
                </div>
                <div>
                    <i className="fa fa-paste" />
                    <span>Pages</span>
                </div>
                <div>
                    <i className="fa fa-location-arrow" />
                    <span>Reports</span>
                </div>
                <div>
                    <i className="fa fa-box" />
                    <span>Components</span>
                </div>
            </div>
        </div>


    )
}