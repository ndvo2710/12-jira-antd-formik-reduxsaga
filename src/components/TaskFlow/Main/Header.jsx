import React from 'react'

export default function Header() {
    return (
        <div className="header">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb" style={{ backgroundColor: 'white' }}>
                    <li className="breadcrumb-item">Project</li>
                    <li className="breadcrumb-item">JiraClone</li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Jira Clone Board
      </li>
                </ol>
            </nav>
        </div>


    )
}