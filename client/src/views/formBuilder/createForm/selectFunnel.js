// React component
import { React, useState, Fragment, useEffect } from 'react';
import {
  Button,
  Row,
  Col,
  Collapse,
  NavLink,
  Nav,
  NavItem
} from 'reactstrap';
import { useHistory } from 'react-router-dom';

import { ChevronRight } from 'react-feather';
// custom import
import Templates from './template/Templates';
import CategorySidebar from '../CategorySidebar';

import { getFormCategories } from '../../../requests/formCategory/formCategory';
import { createFormAction } from '../store/action';
import PerfectScrollbar from 'react-perfect-scrollbar';

const SelectFunnel = ({ store, dispatch, form, setForm, stepper }) => {
  const [active, setActive] = useState('1');
  const [collapse, setCollapse] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [checkedCategoryData, setCheckedCategoryData] = useState([]);
  const [categoryUpdate, setCategoryUpdate] = useState(0);

  const history = useHistory();

  useEffect(() => {
    if (store && store.form._id) {
      history.push(`/form-funnel/form-setting/${store.form._id}`);
    }
  }, [store.form]);

  const fetchData = async () => {
    const response = await getFormCategories();
    const categoryList = response.data;
    setCategoryData(()=> {return categoryList});
    console.log(categoryList)
  };

  useEffect(() => {
    fetchData();
  }, [categoryUpdate])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(store?.form.isTemplate === true){
      dispatch(createFormAction({...form, isTemplate:true}));
    }
    else{
      dispatch(createFormAction({...form, isTemplate:false}));
    }
    
    //toggleEditor();project-sidebar select-funnel
  };

  const handleCategoryCollapse = () => setCollapse(!collapse);

  return (
    <Fragment>
      <div className="d-flex flex-row select-funnel" style={{height: '74vh', overflowY: 'hidden'}}>
        <PerfectScrollbar className='flex-1' options={{ wheelPropagation: false }}>
          <Collapse
            isOpen={!collapse}
            horizontal={true}
            className=''
            delay={{ show: 50, hide: 50 }}
          >
            <CategorySidebar
              collapse={collapse}
              handleCategoryCollapse={handleCategoryCollapse}
              categoryData={categoryData}
              categoryUpdate={categoryUpdate}
              setCategoryUpdate={setCategoryUpdate}
              checkedCategoryData={checkedCategoryData}
              setCheckedCategoryData={setCheckedCategoryData}
              noAction={true}
            />
          </Collapse>
          <Row className={`flex-1 border-start ${collapse?'w-100':''}`} style={{minHeight: '100%'}}>
            <Col md="12" className="mb-1 p-0">
              <div className='d-flex align-items-end ms-1'>
                {collapse && (
                  <div className="btn-collapse-wrapper pe-1 mb-1">
                    <Button
                      className="btn-icon btn btn-flat-dark btn-sm btn-toggle-sidebar"
                      color="flat-dark"
                      onClick={handleCategoryCollapse}
                    >
                      <ChevronRight size={18} />
                    </Button>
                  </div>
                )}
                <Nav tabs>
                  <NavItem>
                    <NavLink onClick={()=>setActive('1')} active ={active==='1'}>
                    <span>All Templates</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={()=>setActive('2')} active ={active==='2'}>
                    <span>My Organization</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={()=>setActive('3')}
                    active ={active==='3'}>
                    <span>My Templates</span>
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
              <div className="w-100 d-flex justify-content-between border-top">
                <div className="tasks-area" style={{ maxWidth: '100%', width: '100%' }}>
                  <div className="content-header p-1 mb-0">
                    <h5 className="mb-0">Select a template </h5>
                    <small>Select a template for your funnel or start from blank</small>
                  </div>
                  <Templates 
                    form={form} 
                    setForm={setForm} 
                    store={store} 
                    active={active} 
                    checkedCategoryData={checkedCategoryData}
                    categoryData={categoryData}
                    setCategoryData={setCategoryData}
                  />
                  <Row className='m-1 '>
                      <Col className="d-flex flex-row-reverse">
                        <Button color="primary" onClick={handleSubmit} disabled={form.clonedFrom && form.name && form.subCategory ? false : true}>
                          NEXT
                        </Button>
                        <Button className="px-1 me-1" onClick={() => stepper.previous()}>
                          BACK
                        </Button>
                      </Col>
                    </Row>
                </div>
              </div>
            </Col>
          </Row>
        </PerfectScrollbar>
      </div>
    </Fragment>
  );
};

export default SelectFunnel;
