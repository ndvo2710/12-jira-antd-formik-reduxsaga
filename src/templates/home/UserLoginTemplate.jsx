import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';
import Header from '../../components/Home/Header/Header';

const { Sider, Content } = Layout;







export const UserLoginTemplate = (props) => {
    const [{ width, height }, setSize] = useState({
        width: Math.round(window.innerWidth),
        height: Math.round(window.innerHeight)
    });

    useEffect(() => {
        window.onresize = () => {
            setSize({
                width: Math.round(window.innerWidth),
                height: Math.round(window.innerHeight)
            })
        }
    }, [])
    let { Component, ...restRoute } = props;

    return <Route {...restRoute} render={(propsRoute) => {
        return <>
            <Header />

            <Layout>
                <Sider width={width * 0.6} style={{ height: height, backgroundImage: `url(https://picsum.photos/${Math.round(width / 2)}/${height})`, backgroundSize: '100%' }}>

                </Sider>
                <Content>
                    <Component {...propsRoute} />
                </Content>
            </Layout>

        </>
    }} />

}