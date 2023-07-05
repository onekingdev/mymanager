import React, { Fragment } from "react"

// ** React Imports
import { useState, useRef } from 'react';

//** Redux Imports
import { useSelector } from 'react-redux';

// ** Icons Imports
import { ArrowLeft, ArrowRight } from "react-feather"

// ** Reactstrap Imports
import { Button, Modal, ModalBody, ModalHeader, Form, FormGroup, Card, CardBody, CardText, CardTitle } from "reactstrap"

// ** Custom Components
import Wizard from '@components/wizard';

// ** Third Party Components
import Select from 'react-select'; //eslint-disable-line
import styled from 'styled-components';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Styles
import '@styles/base/pages/page-projects.scss';

const ColumnsModal = ({
    toggle,
    modal,
    onClick,
    multipleColumnTypes,
    setMultipleColumnTypes,
    projectID
}) => {
    const [rSelected, setRSelected] = useState(null);
    const [stepper, setStepper] = useState(null);

    // ** Ref
    const ref = useRef(null);

    const projectData = useSelector((state) => [state.projectManagement.getProjects?.tables]);

    const flattenedData = projectData?.flat();
    const disabledData = flattenedData.find(node => node?._id === projectID);

    const fixedcolumnOptions = [
        { columnName: 'Task', columnType: 'Task', category: 'fixed', isdisabled: disabledData?.rowData[0]?.hasOwnProperty('task') },
        { columnName: 'Manager', columnType: 'Manager', category: 'fixed', isdisabled: disabledData?.rowData[0]?.hasOwnProperty('manager') },
        { columnName: 'Status', columnType: 'Status', category: 'fixed', isdisabled: disabledData?.rowData[0]?.hasOwnProperty('status') },
        { columnName: 'Assignee', columnType: 'Assignee', category: 'fixed', isdisabled: disabledData?.mapOrder?.some(node => node.column === 'Assignee') },
        { columnName: 'Due', columnType: 'Due', category: 'fixed', isdisabled: disabledData?.mapOrder?.some(node => node.column === 'Due') },
    ];

    const editableColumnOptions = [,
        { columnName: 'Date', columnType: 'date', category: 'dynamic' },
        { columnName: 'Text', columnType: 'text', category: 'dynamic' },
    ];

    const ReactSelect = styled(Select)`
    .Select-control {
      height: 26px;
      font-size: small;

      .Select-placeholder {
        line-height: 26px;
        font-size: small;
      }

      .Select-value {
        line-height: 26px;
      }

      .Select-input {
        height: 26px;
        font-size: small;
      }
    }
  `;

    const colourStyles = {
        control: (styles) => ({ ...styles }),
        option: (styles, { isDisabled, isFocused }) => {
            return {
                ...styles,
                cursor: isDisabled ? 'not-allowed !important;' : 'pointer',
                backgroundColor: !isDisabled
                    ? undefined
                    : isFocused
                        ? 'white !important;'
                        : undefined,
                color: isDisabled
                    ? 'lightgray !important'
                    : isFocused
                        ? 'inherit;'
                        : 'inherit;',
            };
        },
    };

    const steps = [
        {
            id: 'action',
            title: 'Action',
            subtitle: 'Choose and Action',
            content: (
                <Fragment>
                    <div className="columns-modal-select-card-wrapper d-flex mt-2 gap-2 bg-transparent">
                        <div>
                            <Card className="mb-3">
                                <CardBody>
                                    <CardTitle tag="h4">Fixed Column</CardTitle>
                                    <CardText>
                                        <small className="text-muted">
                                            Select below if you want to add Fixed Columns.
                                        </small>
                                    </CardText>
                                    <Button
                                        onClick={() => {
                                            setRSelected(1)
                                            setMultipleColumnTypes([])
                                        }
                                        }
                                        active={rSelected === 1}
                                        color="primary"
                                        block
                                        outline
                                    >
                                        Select
                                    </Button>
                                </CardBody>
                            </Card>
                        </div>
                        <div>
                            <Card className="mb-3">
                                <CardBody>
                                    <CardTitle tag="h4">Editable Column</CardTitle>
                                    <CardText>
                                        <small className="text-muted">
                                            Select below if you want to add Editable Columns.
                                        </small>
                                    </CardText>
                                    <Button
                                        onClick={() => {
                                            setRSelected(3)
                                            setMultipleColumnTypes([])
                                        }}
                                        active={rSelected === 3}
                                        color="primary"
                                        block
                                        outline
                                    >
                                        Select
                                    </Button>
                                </CardBody>
                            </Card>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between">
                        <Button
                            color="primary"
                            className="btn-next"
                            onClick={() => stepper.next()}
                            disabled={!rSelected}
                            style={{ marginLeft: 'auto' }}
                        >
                            <span className="align-middle d-sm-inline-block d-none">
                                Next
                            </span>
                            <ArrowRight
                                size={14}
                                className="align-middle ms-sm-25 ms-0"
                            ></ArrowRight>
                        </Button>
                    </div>
                </Fragment>
            )
        },
        {
            id: 'next',
            title: 'Next Step',
            subtitle: 'Select the column type',
            content:
                <Fragment>
                    <div className="d-flex mt-2 bg-transparent">
                        {rSelected === 1 ? 
                    <Form className="w-100" style={{height: '221px'}}>
                    <FormGroup>
                        <ReactSelect
                            isMulti
                            value={multipleColumnTypes}
                            getOptionLabel={(fixedColumnOptions) => fixedColumnOptions.columnName =="Due" ? fixedColumnOptions.columnName + " Date" : fixedColumnOptions.columnName }
                            getOptionValue={(fixedColumnOptions) => fixedColumnOptions.columnType}
                            isClearable={false}
                            className="react-select"
                            classNamePrefix="select"
                            options={fixedcolumnOptions}
                            theme={selectThemeColors}
                            isOptionDisabled={(option) => option.isdisabled}
                            onChange={(fixedColumns) => {
                                let columns = [...fixedColumns];
                                setMultipleColumnTypes(columns)
                            }}
                            styles={colourStyles}
                        />
                    </FormGroup>
                </Form>
                :
                <Form className="w-100" style={{height: '221px'}}>
                            <FormGroup>
                                <ReactSelect
                                    isMulti
                                    value={multipleColumnTypes}
                                    getOptionLabel={(fixedColumnOptions) => fixedColumnOptions.columnName}
                                    getOptionValue={(fixedColumnOptions) => fixedColumnOptions.columnType}
                                    isClearable={false}
                                    className="react-select"
                                    classNamePrefix="select"
                                    options={editableColumnOptions}
                                    theme={selectThemeColors}
                                    isOptionDisabled={(option) => option.isdisabled}
                                    onChange={(fixedColumns) => {
                                        let columns = [...fixedColumns];
                                        setMultipleColumnTypes(columns)
                                    }}
                                    styles={colourStyles}
                                />
                            </FormGroup>
                        </Form>    
                    }
                    </div>
                    <div className="d-flex justify-content-between">
                        <Button color="primary" className="btn-prev" onClick={() => stepper.previous()}>
                            <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
                            <span className="align-middle d-sm-inline-block d-none">Previous</span>
                        </Button>
                        <Button color="primary" className="btn-next" disabled={!rSelected || multipleColumnTypes.length === 0} onClick={onClick}>
                            <span className="align-middle d-sm-inline-block d-none">Submit</span>
                            <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
                        </Button>
                    </div>
                </Fragment>
        }
    ];

    return (
        <Modal
            isOpen={modal} 
            toggle={toggle}
            className="modal-dialog-centered"
            size="lg"
            style={{ maxWidth: '700px', width: '100%' }}
        >
            <ModalHeader toggle={toggle}>Project Manager Columns</ModalHeader>
            <ModalBody>
                <div className="modern-horizontal-wizard">
                    <Wizard
                        type="modern-horizontal"
                        ref={ref}
                        steps={steps}
                        options={{
                            linear: false
                        }}
                        instance={(el) => setStepper(el)}
                    />
                </div>
            </ModalBody>
        </Modal>
    );
};
export default ColumnsModal;
