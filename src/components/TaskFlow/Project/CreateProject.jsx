/* eslint-disable no-multi-str */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
// Demo: https://www.tiny.cloud/docs/demo/
// Docs: https://www.tiny.cloud/docs/integrations/react/#tinymcereactintegrationquickstartguide
import { Editor } from '@tinymce/tinymce-react';
import { withFormik } from 'formik';
import * as Yup from 'yup'
import { connect, useSelector, useDispatch } from 'react-redux'
import { GET_ALL_PROJECT_CATEGORY_SAGA } from '../../../redux/constants/TaskFlowConst';

function CreateProject(props) {
    // const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory);
    const { arrProjectCategory } = props;
    const dispatch = useDispatch();

    console.log('arrProjectCategory', arrProjectCategory)
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setValues,
        setFieldValue,
    } = props;


    useEffect(() => {
        const getAllProjectCategory = () => {
            // Call Api to get data from <select>
            dispatch({ type: GET_ALL_PROJECT_CATEGORY_SAGA })
        };

        getAllProjectCategory();

        return () => { }

    }, [dispatch]);

    const handleEditorChange = (content, editor) => {
        console.log('Content was updated:', content);
        console.log('Content was updated:', editor);
        setFieldValue('description', content);
    }


    return (
        <div className="container m-5">
            <h3>Create Project</h3>
            <form className="container" onSubmit={handleSubmit} onChange={handleChange}>
                <div className="form-group">
                    <p>Name</p>
                    <input className="form-control" name="projectName" />
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
                        onEditorChange={handleEditorChange}
                    />
                </div>
                <div className="form-group">
                    <select defaultValue={'DEFAULT'} name="categoryId" className="form-control" onChange={handleChange}>
                        <option value="DEFAULT" disabled>Choose a project ...</option>
                        {arrProjectCategory.map((item, index) => {
                            return <option value={item.id} key={index}>{item.projectCategoryName}</option>
                        })}
                    </select>
                </div>
                <button className="btn btn-outline-primary" type="submit">Create project</button>
            </form>
        </div>
    )
}


const createProjectForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        console.log('propvalue', props)
        return {
            projectName: '',
            description: '',
            categoryId: props.arrProjectCategory[0]?.id
        }
    },
    validationSchema: Yup.object().shape({


    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        console.log('values', values);

        props.dispatch({
            type: 'CREATE_PROJECT_SAGA',
            newProject: values
        })


    },
    displayName: 'CreateProjectFormik',
})(CreateProject);

const mapStateToProps = (state) => ({

    arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory

})


export default connect(mapStateToProps)(createProjectForm);