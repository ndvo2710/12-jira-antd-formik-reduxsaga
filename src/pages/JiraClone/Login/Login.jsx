import React from 'react'
import { Button, Input } from 'antd';
import { UserOutlined, LockOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons';


export default function Login(props) {


    return (
        <form className="container">
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: window.innerHeight }} >
                <h3 className="text-center" style={{ fontWeight: 300, fontSize: 35 }}>Login CyberBugs</h3>

                <div className="d-flex mt-3" >
                    <Input style={{ width: '100%', minWidth: 300 }} name="email" size="large" placeholder="email" prefix={<UserOutlined />} />
                </div>
                <div className="d-flex mt-3">
                    <Input style={{ width: '100%', minWidth: 300 }} type="password" name="email" size="large" placeholder="password" prefix={<LockOutlined />} />
                </div>

                <Button size="large" style={{ minWidth: 300, backgroundColor: 'rgb(102,117,223)', color: '#fff' }} className="mt-5">Login</Button>


                <div className="social mt-3 d-flex">
                    <Button type="primary" className="ml-3" shape="circle" icon={<FacebookOutlined />} size={"large"} />
                    <Button type="primary" className="ml-3" shape="circle" icon={<TwitterOutlined />} size={"large"} />
                </div>
            </div>

        </form>
    )
}