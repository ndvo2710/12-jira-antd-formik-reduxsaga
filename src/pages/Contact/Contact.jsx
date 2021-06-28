import React from 'react'
import { history } from '../../util/history'

export default function Contact() {
    return (
        <div>
            Contact Page
            <button onClick={() => {history.push('/demohocmodal')}}>123</button>
        </div>
    )
}