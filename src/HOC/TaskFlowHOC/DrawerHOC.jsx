import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import { CLOSE_DRAWER, OPEN_DRAWER } from '../../redux/constants/TaskFlowConst';

export default function DrawerHOC() {
    const { visible, ComponentContentDrawer, callBackSubmit, title } = useSelector(state => state.DrawerReducer);

    const dispatch = useDispatch();

    console.log('visible', visible)


    const showDrawer = () => {
        dispatch({ type: OPEN_DRAWER });
    };

    const onClose = () => {
        dispatch({ type: CLOSE_DRAWER });

    };
    return (
        <>
            {/* <button onClick={showDrawer}>showdrawer</button> */}
            <Drawer
                title={title}
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}

                footer={
                    <div
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={onClose} style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button onClick={callBackSubmit} type="primary">
                            Submit
                        </Button>
                    </div>
                }
            >
                {/* Changing content of DrawerHOC */}
                {ComponentContentDrawer}

            </Drawer>
        </>
    )
}
