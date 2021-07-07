import React, { useEffect, useState } from 'react'
import { Table, Tag, Space, Button, Popconfirm, Avatar, AutoComplete, Popover } from 'antd';
import ReactHtmlParser from "react-html-parser";
import { FormOutlined, DeleteOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { ADD_USER_PROJECT_API, DELETE_PROJECT_SAGA, EDIT_PROJECT, GET_LIST_PROJECT_SAGA, GET_USER_API, OPEN_FORM_EDIT_PROJECT, REMOVE_USER_PROJECT_API } from '../../../redux/constants/TaskFlowConst';
import FormEditProject from './FormEditProject';


export default function ProjectManagement(props) {
    const projectList = useSelector(state => state.ProjectManagementReducer.projectList);
    const { userSearch } = useSelector(state => state.UserLogInReducer);

    const dispatch = useDispatch();

    const [value, setValue] = useState('');
    const [state, setState] = useState({
        filteredInfo: null,
        sortedInfo: null,
    });

    useEffect(() => {
        dispatch({ type: GET_LIST_PROJECT_SAGA })
    }, [])

    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    const clearFilters = () => {
        setState({ filteredInfo: null });
    };

    const clearAll = () => {
        setState({
            filteredInfo: null,
            sortedInfo: null,
        });
    };

    const setAgeSort = () => {
        setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'age',
            },
        });
    };

    let { sortedInfo, filteredInfo } = state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    // columns docs : https://ant.design/components/table/#Column
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,

        },
        {
            title: 'projectName',
            dataIndex: 'projectName',
            key: 'projectName',
            sorter: (item2, item1) => {
                let projectName1 = item1.projectName?.trim().toLowerCase();
                let projectName2 = item2.projectName?.trim().toLowerCase();
                if (projectName2 < projectName1) {
                    return -1;
                }
                return 1;
            },

        },
        {
            title: 'description',
            dataIndex: 'description',
            key: 'description',
            render: (text, record, index) => {
                let contentJSX = ReactHtmlParser(text);

                return <div>
                    {contentJSX}
                </div>
            }
        },

        {
            title: 'category',
            dataIndex: 'categoryName',
            key: 'categoryName',
            sorter: (item2, item1) => {
                let categoryName1 = item1.categoryName?.trim().toLowerCase();
                let categoryName2 = item2.categoryName?.trim().toLowerCase();
                if (categoryName2 < categoryName1) {
                    return -1;
                }
                return 1;
            },
        },
        {
            title: 'creator',
            // dataIndex: 'creator',
            key: 'creator',
            render: (text, record, index) => {
                return <Tag color="green">{record.creator?.name}</Tag>
            },
            sorter: (item2, item1) => {
                let creator1 = item1.creator?.name.trim().toLowerCase();
                let creator2 = item2.creator?.name.trim().toLowerCase();
                if (creator2 < creator1) {
                    return -1;
                }
                return 1;
            },
        },
        {
            title: 'members',
            key: 'members',
            render: (text, record, index) => {
                return <div>
                    {record.members?.slice(0, 3).map((member, index) => {
                        return (
                            <Popover key={index} placement="top" title="members" content={() => {
                                return <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>avatar</th>
                                            <th>name</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {record.members?.map((item, index) => {
                                            return <tr key={index}>
                                                <td>{item.userId}</td>
                                                <td><img src={item.avatar} alt={item.avatar} width="30" height="30" style={{ borderRadius: '15px' }} /></td>
                                                <td>{item.name}</td>
                                                <td>
                                                    <button onClick={() => {
                                                        dispatch({
                                                            type: REMOVE_USER_PROJECT_API,
                                                            userProject: {
                                                                userId: item.userId,
                                                                projectId: record.id
                                                            }
                                                        })

                                                    }} className="btn btn-danger" style={{ borderRadius: '50%' }}>X</button>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            }}>
                                <Avatar key={index} src={member.avatar} />
                            </Popover>
                        )
                    })}

                    {record.members?.length > 3 ? <Avatar>...</Avatar> : ''}

                    <Popover placement="rightTop" title={"Add user"} content={() => {
                        return <AutoComplete

                            options={userSearch?.map((user, index) => {
                                return { label: user.name, value: user.userId.toString() }
                            })}
                            value={value}

                            onChange={(text) => {
                                setValue(text);
                            }}

                            onSelect={(valueSelect, option) => {
                                setValue(option.label);
                                // Call Api via dispatch
                                dispatch({
                                    type: ADD_USER_PROJECT_API,
                                    userProject: {
                                        "projectId": record.id,
                                        "userId": valueSelect
                                    }
                                })
                            }}
                            style={{ width: '100%' }} onSearch={(value) => {
                                dispatch({
                                    type: GET_USER_API,
                                    keyWord: value
                                })

                            }} />
                    }} trigger="click">
                        <Button style={{ borderRadius: '50%' }}>+</Button>
                    </Popover>
                </div>
            }

        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text, record, index) => {
                return <div>
                    <button className="btn mr-2 btn-primary" onClick={() => {
                        // dispatch FormEditProject component to reducer
                        const action = {
                            type: OPEN_FORM_EDIT_PROJECT,
                            Component: <FormEditProject />,
                        }
                        dispatch(action);

                        // Dispatch edit data to reducer
                        const actionEditProject = {
                            type: EDIT_PROJECT,
                            projectEditModel: record
                        }
                        dispatch(actionEditProject);
                    }}>
                        <FormOutlined style={{ fontSize: 17 }} />
                    </button>
                    <Popconfirm
                        title="Are you sure to delete this project?"
                        onConfirm={() => {
                            dispatch({ type: DELETE_PROJECT_SAGA, idProject: record.id })
                        }}

                        okText="Yes"
                        cancelText="No"
                    >
                        <button className="btn btn-danger">
                            <DeleteOutlined style={{ fontSize: 17 }} />
                        </button>
                    </Popconfirm>,
                </div>
            },
        }

    ];
    return (
        <div className="container-fluid m-5">
            <h3>Project management</h3>
            <Space style={{ marginBottom: 16 }}>
                <Button onClick={setAgeSort}>Sort age</Button>
                <Button onClick={clearFilters}>Clear filters</Button>
                <Button onClick={clearAll}>Clear filters and sorters</Button>
            </Space>
            <Table columns={columns} rowKey={"id"} dataSource={projectList} onChange={handleChange} />
        </div>
    )
}