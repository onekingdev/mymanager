import '@styles/react/apps/app-email.scss';
import {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row
} from 'reactstrap';
import TemplateContent from './TemplateContent';
import { getFormsAction, getTemplatesAction } from '../../../formBuilder/store/action';
import PerfectScrollbar from 'react-perfect-scrollbar';



const TemplatesList =({selectedTemplate,onSelectedTemplate, testFunction})=> {
    const [forms, setForms] = useState([]);
    
    const formStore = useSelector((state) => state.formEditor);
    const dispatch = useDispatch();
    const store = useSelector((state) => state.email);

    useEffect(() => {
        dispatch(getFormsAction());
        setForms(formStore.funnels.filter(item => item.memberType?.includes('email')));
    },[]);

    
    return (

        <div className="p-1 bg-white mt-0">
            <PerfectScrollbar>
            <Row container spacing={2} className="p-0 m-0 mt-1">
                <Col item sm={12} md={12} lg={15}>        
                    <h4>MY TEMPLATES</h4>            
                </Col>
                {/* <Col item sm={12} md={4} lg={4}>
                <Content
                    hedding={'ACTIVATE YOUR FIRST EMAIL'}
                    content={
                    (`Learn how to activate your first smartlist email. This email will`,
                    `"Send Immediately" upon the smartlist criteria being met.`)
                    }
                    link={'https://www.youtube.com/embed/bidOMaCs3vM'}
                />
                </Col>
                <Col item sm={12} md={4} lg={4}>
                <Content
                    hedding={'AUTOMATE ADDITIONAL EMAILS'}
                    content={
                    'Learn how to create additional emails to send after the first email is sent out. This set it and forget it feature will increase conversions and allow leads to be nurtured prior to them becoming a paid client.'
                    }
                    link={'https://www.youtube.com/embed/5RfLIC-3dzY'}
                />
                </Col>
                <Col item sm={12} md={4} lg={4}>
                <Content
                    hedding={'MANAGE YOUR CAMPAIGN'}
                    content={
                    'Learn how to edit, delete, and use our powerful drag and drop feature to change template sequences with ease.'
                    }
                    link={'https://www.youtube.com/embed/0NFRvVdmmE4'}
                />
                </Col>                           */}
            </Row>
            <Row container spacing={2} className="p-0 m-0 mt-3" >
                { forms &&
                    forms.map(item => {
                    return (
                    <Col item sm={12} md={4} lg={4} 
                        onClick={() => onSelectedTemplate(item)}
                        className={selectedTemplate?._id === item._id ? "border border-primary border-3 rounded" : ""}
                    >
                        <TemplateContent
                            name={item.name}                                    
                            html={item.formData[0].html}
                            css={item.formData[0].css}
                            testFunction = {testFunction}
                        />
                    </Col>)
                })
                }
            </Row>
        </PerfectScrollbar>
        </div>)
}
export default TemplatesList;