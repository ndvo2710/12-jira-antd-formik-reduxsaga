import { Editor } from '@tinymce/tinymce-react'
import React, { useEffect, useState } from 'react'
import { Select, Radio, Slider } from 'antd';
import { connect, useDispatch, useSelector } from 'react-redux';
import { CREATE_TASK_SAGA, GET_ALL_PRIORITY_SAGA, GET_ALL_PROJECT_SAGA, GET_ALL_STATUS_SAGA, GET_ALL_TASK_TYPE_SAGA, GET_USER_API, GET_USER_BY_PROJECT_ID_SAGA, SET_SUBMIT_CREATE_TASK } from '../../redux/constants/TaskFlowConst';
import { withFormik } from 'formik';
import * as Yup from 'yup'

const { Option } = Select;


function FormCreateTask(props) {

    const { arrProject } = useSelector(state => state.ProjectManagementReducer);
    const { arrTaskType } = useSelector(state => state.TaskTypeReducer);
    const { arrPriority } = useSelector(state => state.PriorityReducer);
    const { userSearch } = useSelector(state => state.UserLogInReducer);
    const { arrStatus } = useSelector(state => state.StatusReducer);

    console.log('arrStatus', arrStatus);


    const userOptions = userSearch.map((item, index) => {
        return { value: item.userId, label: item.name }
    })

    const dispatch = useDispatch();

    // inherit from withFormik
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setValues,
        setFieldValue
    } = props;

    const [size, setSize] = useState('default');

    const [timeTracking, setTimetracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0
    })

    //hook
    useEffect(() => {
        dispatch({ type: GET_ALL_PROJECT_SAGA });
        dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
        dispatch({ type: GET_ALL_PRIORITY_SAGA });
        dispatch({ type: GET_ALL_STATUS_SAGA });
        dispatch({ type: SET_SUBMIT_CREATE_TASK, submitFunction: handleSubmit });
        dispatch({ type: GET_USER_API, keyWord: '' });
    }, [])


    return (
        <form className="container" onSubmit={handleSubmit}>
            <div className="form-group">
                <p>Project</p>
                <select name="projectId" defaultValue={'DEFAULT'} className="form-control" onChange={(e) => {

                    // dispatch value to change arrUser
                    let { value } = e.target;
                    dispatch({
                        type: GET_USER_BY_PROJECT_ID_SAGA,
                        idProject: value
                    })
                    // Update value for projectId
                    setFieldValue('projectId', e.target.value);


                }}>
                    <option value="DEFAULT" disabled>Choose Project</option>
                    {arrProject.map((project, index) => {
                        return <option key={index} value={project.id}>{project.projectName}</option>
                    })}
                </select>
            </div>
            <div className="form-group">
                <p>Task name</p>
                <input name="taskName" className="form-control" onChange={handleChange} />
            </div>
            <div className="form-group">
                <p>Status</p>
                <select name="statusId" defaultValue={'DEFAULT'} className="form-control" onChange={handleChange} >
                    <option value="DEFAULT" disabled>Choose task status</option>
                    {arrStatus.map((statusItem, index) => {
                        return <option key={index} value={statusItem.statusId}>{statusItem.statusName}</option>
                    })}
                </select>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-6">
                        <p>Priority</p>
                        <select name="priorityId" defaultValue={'DEFAULT'} className="form-control" onChange={handleChange}>
                            <option value="DEFAULT" disabled>Choose task priority</option>
                            {arrPriority.map((priority, index) => {
                                return <option key={index} value={priority.priorityId}>
                                    {priority.priority}
                                </option>
                            })}
                        </select>
                    </div>
                    <div className="col-6">
                        <p>Task type</p>
                        <select className="form-control" defaultValue={'DEFAULT'} name="typeId" onChange={handleChange}>
                            <option value="DEFAULT" disabled>Choose task type</option>
                            {arrTaskType.map((taskType, index) => {
                                return <option key={index} value={taskType.id}>{taskType.taskType}</option>
                            })}
                        </select>
                    </div>
                </div>

            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-6">
                        <p>Assignees</p>
                        <Select
                            mode="multiple"
                            size={size}
                            options={userOptions}
                            placeholder="Please select"
                            optionFilterProp="label"
                            onChange={(values) => {
                                setFieldValue('listUserAsign', values);
                            }}
                            onSelect={(value) => {

                                console.log(value)

                            }}
                            style={{ width: '100%' }}
                        />

                        <div className="row mt-3">
                            <div className="col-12">
                                <p>Original Estimate</p>
                                <input type="number" min="0" name="originalEstimate" defaultValue="0" className="form-control" height="30" onChange={handleChange} />
                            </div>
                        </div>

                    </div>

                    <div className="col-6">
                        <p>Time tracking</p>

                        <Slider defaultValue={30} value={timeTracking.timeTrackingSpent} max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)} />
                        <div className="row">
                            <div className="col-6 text-left font-weight-bold">{timeTracking.timeTrackingSpent}h logged</div>
                            <div className="col-6 text-right font-weight-bold">{timeTracking.timeTrackingRemaining}h remaining</div>
                        </div>
                        <div className="row" style={{ marginTop: 5 }}>
                            <div className="col-6">
                                <p>Time spent</p>
                                <input type="number" defaultValue="0" min="0" className="form-control" name="timeTrackingSpent" onChange={(e) => {
                                    setTimetracking({
                                        ...timeTracking,
                                        timeTrackingSpent: e.target.value
                                    });
                                    setFieldValue('timeTrackingSpent', e.target.value);
                                }} />
                            </div>
                            <div className="col-6">
                                <p>Time remaining</p>
                                <input type="number" defaultValue="0" min="0" className="form-control" name="timeTrackingRemaining" onChange={(e) => {
                                    setTimetracking({
                                        ...timeTracking,
                                        timeTrackingRemaining: e.target.value
                                    });
                                    setFieldValue('timeTrackingRemaining', e.target.value);
                                }} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="form-group">
                <p>Description</p>
                <Editor
                    name="description"
                    init={{
                        selector: 'textarea#myTextArea',
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar:
                            'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help'
                    }}
                    onEditorChange={(content, editor) => {
                        setFieldValue('description', content);
                    }}
                />
            </div>
        </form>
    )
}

const FormCreateTaskFormik = withFormik({
    // enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { arrProject, arrTaskType, arrPriority, arrStatus } = props;
        // console.log('arrProject[0]?.id', arrProject[0]?.id);
        // console.log(arrTaskType, arrPriority, arrStatus);

        return {
            taskName: '',
            description: '',
            statusId: arrStatus[0]?.statusId,
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: arrProject[0]?.id,
            typeId: arrTaskType[0]?.id,
            priorityId: arrPriority[0]?.priorityId,
            listUserAsign: []
        }
    },
    validationSchema: Yup.object().shape({


    }),
    handleSubmit: (values, { props, setSubmitting }) => {   
        // const { arrProject, arrTaskType, arrPriority, arrStatus } = props;
        // console.log('arrProject[0]?.id', arrProject[0]?.id);
        // console.log(arrTaskType, arrPriority, arrStatus);
        console.log('values', values);

        props.dispatch({ type: CREATE_TASK_SAGA, taskObject: values })
        console.log('taskobject', values)
    },
    displayName: 'createTaskForm',
})(FormCreateTask);


const mapStateToProps = (state) => {
    return {
        arrProject: state.ProjectManagementReducer.arrProject,
        arrTaskType: state.TaskTypeReducer.arrTaskType,
        arrPriority: state.PriorityReducer.arrPriority,
        arrStatus: state.StatusReducer.arrStatus,
    }
}

export default connect(mapStateToProps)(FormCreateTaskFormik);