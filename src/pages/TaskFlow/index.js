import React from 'react'
import Content from '../../components/TaskFlow/Main/Content'
import Header from '../../components/TaskFlow/Main/Header'
import Info from '../../components/TaskFlow/Main/Info'

export default function index() {
    return (
        <div className="main">
            <Header />

            <Info />

            <Content />
        </div>

    )
}