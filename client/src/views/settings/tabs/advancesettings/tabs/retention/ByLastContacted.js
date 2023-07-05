import React, { useEffect, useState } from 'react';
import {
  Card,
  CardTitle,
  CardText,
  CardBody,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Row
} from 'reactstrap';
import { toast } from 'react-toastify';

import { retentionAddAction, retentionDeleteAction, retentionEditAction } from './store/actions';
import { generateOptions } from './generators';
import { Lock, Trash2 } from 'react-feather';
import Swal from 'sweetalert2';
import { getUserData } from '../../../../../../auth/utils';

function ByLastContacted({ dispatch, retentionListByLastContacted }) {
  const user = getUserData();
  const [retentionData,setRetentionData] = useState([])
  const [optionsList,setOptionsList] = useState([])
  const [addNew, setAddNew] = useState(false);
  const [payload, setPayload] = useState({});
  const [selected, setSelected] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const handleRuleInput = (e) => {
    setPayload({ ...payload, type: 'LastContacted', [e.target.name]: e.target.value });
  };
  const handleAddNew = () => {
    addNew ? toast.warning('Please Save Current Input First') : setAddNew(true);
  };
  const validator = () => {
    new list();
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (payload.upperLimit === 'Select' || payload.lowerLimit === 'Select') {
      toast.error('Please Select all Required values');
    } else {
      validator && dispatch(retentionAddAction(payload)), setAddNew(false);
      setPayload(null);
    }
  };
  const enable = (index) => {
    if (index === selected) {
      return false;
    } else {
      return true;
    }
  };
  const handleUpdate = () => {
    if (updatedData.colorCode != undefined) {
      dispatch(retentionEditAction(updatedData));
      setSelected(null);
    } else {
      toast('No Changes Observed');
    }
  };
  useEffect(()=>{
    if(retentionListByLastContacted){
      setRetentionData(retentionListByLastContacted)
    }
  },[retentionListByLastContacted])
  useEffect(()=>{
    let op = []
    for (let i = 0; i <= 999; i++) {
      op.push(i);
    }
    setOptionsList(op)
  },[])
  return (
    <>
      <Card style={{ marginLeft: '10px' }}>
        <CardBody className="rounded-none">
          <CardTitle tag="h4">
            <div className="d-flex justify-content-between">
              <div>Retention {'> '} By Last Contacted</div>
              <div>
                <div>
                  <FormGroup>
                    <Button outline color="primary" onClick={() => handleAddNew()}>
                      Add new Rule
                    </Button>
                  </FormGroup>
                </div>
              </div>
            </div>
          </CardTitle>
          <CardText>
            {retentionData.length > 0
              ? [...retentionData].sort((a, b) => a.lowerLimit - b.lowerLimit).map(
                  (rule, index) => (
                    <Row key={rule._id}>
                      <Col md={2}>
                        <FormGroup>
                          <span
                            onClick={() => {
                              setSelected(index);
                            }}
                          >
                            <Label className=""> </Label>
                            <Input
                              size="lg"
                              onChange={(e) =>
                                setUpdatedData({ [e.target.name]: e.target.value, rule: rule })
                              }
                              defaultValue={'#ea5455'}
                              value={enable(index) ? rule?.colorCode : updatedData?.colorCode}
                              type="color"
                              name="colorCode"
                              disabled={enable(index)}
                              placeholder="color placeholder"
                            />
                          </span>
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <span
                            onClick={() => {
                              setSelected(index);
                            }}
                          >
                            <Label>From</Label>
                            <Input
                              id="from1input"
                              name="from1"
                              type="select"
                              required
                              disabled={true}
                            >
                              <option>{rule?.lowerLimit}</option>
                            </Input>
                          </span>
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <span
                            onClick={() => {
                              setSelected(index);
                            }}
                          >
                            <Label>To</Label>
                            <Input id="to1input" name="to1" type="select" disabled={true}>
                              <option>
                                {rule?.upperLimit === 100000 ? '999+' : rule?.upperLimit}
                              </option>
                            </Input>
                          </span>
                        </FormGroup>
                      </Col>
                      <Col md={3} className="my-auto">
                      {user.id ===rule.userId ? 
                    (<>
                    <Button
                          className="ms-1"
                          hidden={enable(index)}
                          disabled={!updatedData}
                          onClick={handleUpdate}
                          outline
                          color="primary"
                        >
                          Save
                        </Button>
                        <Button
                          className="ms-1"
                          hidden={retentionData.length - 1 != index}
                          outline
                          color="danger "
                          onClick={() => {
                            Swal.fire({
                              title: 'Delete?',
                              text: 'Are you sure you want to delete the this last contact?',
                              // icon: 'warning',
                              showCancelButton: true,
                              confirmButtonColor: '#d33',
                              cancelButtonColor: '#3085d6',
                              confirmButtonText: 'Delete anyway',
                              customClass: {
                                confirmButton: 'btn btn-danger',
                                cancelButton: 'btn btn-outline-danger ms-1'
                              },
                              buttonsStyling: false
                            }).then((result) => {
                              if (result.isConfirmed) {
                                dispatch(retentionDeleteAction(rule));
                              }
                            });
                          }}
                        >
                          <Trash2 size={15} />
                        </Button>
                    </>):(<Lock size={14} className='text-muted'/>)  
                    }
                        
                      </Col>
                    </Row>
                  )
                )
              : !addNew && (
                  <div
                    onClick={() => handleAddNew()}
                    className="  d-flex border rounded border-4 w-100 justify-content-center  bg-light border "
                  >
                    <div className=" p-5">
                      <p>Empty! Click Here to Add New Rule</p>
                    </div>
                  </div>
                )}
            {addNew && (
              <form onSubmit={handleSubmit}>
                <Row>
                  <Col md={2}>
                    <FormGroup>
                      <Label for="exampleColor">Color</Label>
                      <Input
                        size="lg"
                        type="color"
                        onChange={handleRuleInput}
                        name="colorCode"
                        defaultValue={'#000000'}
                        id="exampleColor"
                        placeholder="color placeholder"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label>From</Label>
                      <Input
                        id="from2input"
                        onChange={handleRuleInput}
                        name="lowerLimit"
                        type="select"
                        required
                      >
                        {retentionData && retentionData.length < 1 ? (
                          <>
                            <option>Select</option>
                            {optionsList.map((value) => (
                              <>
                                <option>{value}</option>
                              </>
                            ))}
                          </>
                        ) : (
                          generateOptions(retentionData, optionsList, 'from')
                        )}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label>To</Label>
                      <Input
                        id="to2input"
                        onChange={handleRuleInput}
                        name="upperLimit"
                        type="select"
                        required
                      >
                        {retentionData && retentionData.length < 1 ? (
                          <>
                            <option>Select</option>
                            {optionsList.map((value) => (
                              <>
                                <option>{value}</option>
                              </>
                            ))}
                          </>
                        ) : (
                          generateOptions(retentionData, optionsList, 'to')
                        )}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>

                <div className="d-flex justify-content-end">
                  <Button disabled={!payload} color="primary" type="submit">
                    Save
                  </Button>
                </div>
              </form>
            )}
          </CardText>
        </CardBody>
      </Card>
    </>
  );
}

export default ByLastContacted;
