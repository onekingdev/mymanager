import React, { useState, useEffect } from 'react';
import Flatpickr from 'react-flatpickr';

import {
  Button,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Badge,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card
} from 'reactstrap';
// import Select, { components } from 'react-select'; //eslint-disable-line
import { Trash, Plus, Dribbble, Check, Settings } from 'react-feather';

import Upload from './../components/Upload';
import Select, { components } from 'react-select'; //eslint-disable-line

import classnames from 'classnames';

// ** Store & Actions
import { IncomeAddAction } from '../store/actions';

// ** Styles
import '@src/assets/styles/label-management.scss';

// ** Utils
import { selectThemeColors } from '@utils';
import moment from 'moment';
import AddFinanceCategory from './AddFinanceCategory';
import { useUploadDocument } from '../../../requests/documents/create-doc';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


const AddIncome = ({type,categories,dispatch}) => {
  const [open, setOpen] = useState(false);
  const[form,setForm] = useState({date: new Date(),
    time: new Date()})
  
  const [contactOptions,setContactOptions] = useState([])
  
  const [labelManagementFlag, setLabelManagementFlag] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const contactStore = useSelector(state=>state.totalContacts)

  const addIncome = () => {
    let payload = {...form}
    
    payload = {...form,date: moment(moment(payload.date).format('MM/DD/yyyy')+" "+ moment(payload.time).format("HH:MM")).toDate()}
    if(type==='expense'){
      payload ={...payload,amount: -1 * payload.amount}
    }
    if(payload.categoryId===undefined){
      toast.error("Please select a Category")
      return
    }
    if(payload.clientId===undefined){
      toast.error("Please select a Client")
      return
    }

    if(form.attachment){
      const formData = new FormData();
      formData.append('file', form?.attachment);
      formData.append('type', type);
      useUploadDocument(formData).then(res=>{
        payload = {...payload,documentId:res.uploadedDocuments.id}
        dispatch(IncomeAddAction(payload));
      })
    }
    else{
      dispatch(IncomeAddAction(payload));
    }
    setOpen(false)
  };

  const toggleAddNewContact =()=>{

  }
  useEffect(()=>{
    if(contactStore && contactStore?.contactList?.list){
      let contacts=[]
      for (const item of contactStore?.contactList?.list) {
        let o = {label:item.fullName,value:item._id,contact:item}
        contacts.push(o)
      }
      setContactOptions(contacts)
    }
  },[contactStore])

  const LabelOptions = ({ data, ...props }) => {
    const labelColor = categories.filter((cat) => cat._id === data.value)[0].labelColor
    return (
      <components.Option {...props}>
        <Badge color={labelColor}>{data.label}</Badge>
      </components.Option>
    );
  };

  return (
    <>
      <AddFinanceCategory modalFlag={labelManagementFlag} setModalFlag={setLabelManagementFlag} store={categories} />
      <Button color="primary" onClick={handleOpen} style={{ marginLeft: '5px' }}>
       {type==='expense' ? 'Add Expense' : ' Add Income'}
      </Button>
      <Modal
        centered
        isOpen={open}
        toggle={handleOpen}
        className="modal-dialog-label-management"
        style={{}}
      >
        <ModalHeader toggle={handleOpen}>{type==='expense' ? 'Add Expense' : ' Add Income'}</ModalHeader>
        <ModalBody>
          <div>
          <div>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                placeholder="Income name.."
                value={form?.name}
                onChange={(e)=>setForm({...form,name:e.target.value})}
              />
            </div>
            <div>
              <div className='d-flex justify-content-between'>
              <Label>Client</Label>
              <Settings size={14} style={{cursor:'pointer'}} className='my-auto' onClick={toggleAddNewContact}/>
              </div>
              <Select options={contactOptions} onChange={(val)=>setForm({...form,clientId:val.value})}
              />
            </div>
            <div>
              <Label>Date</Label>
              <Flatpickr
                onChange={([e])=>{
              
                  setForm({...form,date:e})
                }}
                value={form?.date}
                options={{
                  dateFormat: 'm-d-Y'
                }}
                className="form-control invoice-edit-input date-picker"
              />
            </div>
            <div>
              <Label>Time</Label>
              <Flatpickr
                value={form?.time}
                options={{
                  enableTime: true,
                  noCalendar: true,
                  dateFormat: 'h:i K'
                }}
                onChange={([e])=>setForm({...form,time:e})}
                className="form-control invoice-edit-input date-picker bg-white"
              />
            </div>
            <div>
              <div className="d-flex justify-content-between">
                <Label>Category</Label>
                <div style={{ marginRight: '10px' }}>
                  <Settings className="font-medium-3" onClick={() => setLabelManagementFlag(true)} />

                </div>
              </div>
              <Select
               
                id="task-labels"
                isClearable={false}
                options={categories.map((cat) => ({
                  value: cat._id,
                  label: cat.title
                }))}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
                components={{ Option: LabelOptions }}
                onChange={(data)=>{setForm({...form,categoryId:data.value})}}
              />
            </div>
            <div>
              <Label>Amount</Label>
              <Input
                type="number"
                name="amount"
                placeholder="Amount"
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
              />
            </div>
            <div>
              <Label>Note</Label>
              <Input
                name="Note"
                placeholder="Note"
                type="text"
                onChange={(e) => setForm({ ...form, note: e.target.value })}
              />
            </div>
            <div>
              <Upload
                onChange={(e) => setForm({ ...form, attachment: e.target.files[0] })}
              />
            </div>
            <div className="d-flex justify-content-end">
              <Button onClick={() => setOpen(false)} className="m-1" outline color="primary">
                Cancel
              </Button>
              <Button onClick={addIncome} className="m-1" color="primary">
                Save
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AddIncome;
