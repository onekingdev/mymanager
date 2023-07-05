// ** React Imports
import { Fragment, useState } from 'react';

// ** Email App Component Imports
import CategorySidebar from './../CategorySidebar';
import { ChevronRight, ChevronLeft, Home } from 'react-feather';

// ** Styles
import '@styles/react/apps/app-email.scss';
import {
  Button,
  Col,
  Collapse,
  Card,
  ListGroup,
  ListGroupItem,
  Label,
  Input,
  Badge,
  Row
} from 'reactstrap';

const EmailTemplates = (props) => {
    const [collapse, setCollapse] = useState(false);
    const { setComposeSelectedTemplates, composeSelectedTemplates, categoryData, checkedCategoryData, setCheckedCategoryData, forms } = props;
    const bootstrapClass = '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">';
    const handleCategoryCollapse = () => setCollapse(!collapse);

    const handleSelect = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;
        if (isChecked) {
          setCheckedCategoryData([...checkedCategoryData, value]);
        } else {
          const filteredList = checkedCategoryData.filter((item) => item !== value);
          setCheckedCategoryData(filteredList);
        }
    };

    const handleTemplateSelect = selectedTemplate => {
        if(composeSelectedTemplates.includes(selectedTemplate._id)) {
            const newArray = Array.from(composeSelectedTemplates);
            const index = newArray.indexOf(selectedTemplate._id);
            newArray.splice(index, 1);
            setComposeSelectedTemplates(newArray);
        } else {
            const newSelectedTemplates = [...composeSelectedTemplates, selectedTemplate._id];
            setComposeSelectedTemplates(newSelectedTemplates);
        }
    }

    return (
        <div style={{ display: 'flex', flex: 1 }} className='h-100'>
            <Collapse
                isOpen={!collapse}
                horizontal={true}
                delay={{ show: 200, hide: 500 }}
            >
                <div className="project-sidebar joru-side-height h-100 content-left px-1" style={{ width: '260px' }}>
                    <div className="sidebar-content task-sidebar h-100">
                        <div className="task-app-menu h-100">
                            <ListGroup
                                className={`sidebar-menu-list ${collapse ? 'd-none' : 'd-block'}`}
                                options={{ wheelPropagation: false }}
                            >
                                <div className="d-flex justify-content-between align-items-center px-1 py-2 ">
                                <Home size={20} />
                                <div style={{ fontSize: '18px', fontWeight: 700, cursor: 'pointer' }}>CATEGORIES</div>
                                <Button
                                    className="btn-icon btn-toggle-sidebar"
                                    color="flat-dark"
                                    onClick={handleCategoryCollapse}
                                >
                                    {collapse ? null : <ChevronLeft size={18} />}
                                </Button>
                                </div>

                                <div className="jrnl_wrapper_sidebar">
                                {Array.isArray(categoryData) &&
                                    categoryData.map((value, i) => (
                                    <ListGroupItem
                                        key={'email-template-category-' + value?._id}
                                        className={`ws-name list-item ps-lft`}
                                    >
                                        <div className='d-flex align-items-center'>
                                            <div className="action-left form-check flex-1">
                                                <Input
                                                    type="checkbox"
                                                    id={"email_template_"+value?._id}
                                                    value={value?._id}
                                                    onChange={handleSelect}
                                                />
                                                <Label 
                                                    className="form-check-label fw-bolder ps-25 mb-0" 
                                                    for={"email_template_"+value?._id}
                                                >
                                                    {value?.name}
                                                </Label>
                                            </div>
                                            <Badge
                                                className="jrnl-badge me-1 d-flex align-items-center"
                                                color="light-primary"
                                                style={{ float: 'right', position: 'relative', left: '20px' }}
                                                pill
                                            >
                                                {value.count}
                                            </Badge>
                                        </div>
                                    </ListGroupItem>
                                    ))}
                                </div>
                            </ListGroup>
                        </div>
                    </div>
                </div>
            </Collapse>

            <div style={{ width: '100%', overflow: 'auto' }}>
                <Fragment>
                    <div style={{ overflow: 'hidden' }}>
                        <div className="p-2 bg-white mt-0">
                            <Row spacing={2} className="p-0 m-0 mt-0">
                                <Col sm={12} md={12} lg={15}>
                                    <div className='d-flex justify-content-between align-items-center'>
                                    <div className='d-flex align-items-center'>
                                        {collapse && (
                                        <div className="btn-collapse-wrapper me-1">
                                            <Button
                                                className="btn-icon btn btn-flat-dark btn-sm btn-toggle-sidebar"
                                                color="flat-dark"
                                                onClick={handleCategoryCollapse}
                                            >
                                                <ChevronRight size={18} />
                                            </Button>
                                        </div>
                                        )}
                                        <h3 className='m-0'>MY TEMPLATE</h3>
                                    </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row spacing={2} className="p-0 m-0 mt-3">
                                { forms &&
                                    forms.map(item => {
                                    return (
                                        <Col key={'email-template-'+item._id} sm={12} md={3} lg={3}>
                                            <Card 
                                                style={{ height: "95%", cursor: 'pointer' }} 
                                                outline
                                                color={composeSelectedTemplates.includes(item._id) ? 'primary' : ''}
                                                onClick={e=>{e.preventDefault(); handleTemplateSelect(item)}}
                                            >
                                                <div className="p-1 pb-0">
                                                    <p style={{fontSize:'16px'}}>
                                                        <b>{item?.name}</b>
                                                    </p>
                                                </div>

                                                <div className="template-iframe">
                                                    <div
                                                        className="border box-shadow"
                                                        style={{ borderRadius: "12px", padding: "0.5em", margin: "0.5em" }}
                                                    >
                                                        <iframe
                                                            style={{ borderRadius: "12px", pointerEvents: "none" }}
                                                            scrolling='no'
                                                            width="100%"
                                                            height="200"
                                                            srcDoc={bootstrapClass+item.formData[0]?.html+'<style>'+item.formData[0]?.css+'</style>'}
                                                            title="Customized Form"
                                                        >
                                                        </iframe>
                                                    </div>
                                                </div>
                                            </Card>
                                        </Col>)
                                    })
                                }
                            </Row>  
                        </div>
                    </div>
                </Fragment>
            </div>
            </div>
        );
    };

export default EmailTemplates;
