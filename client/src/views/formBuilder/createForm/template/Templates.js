import React, { Fragment, useEffect, useState } from 'react';
import { Plus } from 'react-feather';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';
import { getUserData } from '../../../../auth/utils';
import BlankContent from "./BlankContent";
import TemplateContent from "./TemplateContent";
import '../../../../../src/assets/styles/marketing.scss';
import { setTemplateData } from '../../../../utility/Utils';

export default function Templates({ form, setForm, store, active, checkedCategoryData, categoryData, setCategoryData }) {
  const [tableData, setTableData] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState({});

  useEffect(() => {
    if (store?.templates) {
      switch (active) {
        case '1':
          const newTableData0 = Array.from(checkedCategoryData.length ? store?.templates?.filter(x => checkedCategoryData.includes(x.subCategory) && x.status !== 'remove') : store?.templates.filter(x=> x.status !== 'remove'))
          setTableData(newTableData0);

          const newCategoryData = Array.from(categoryData);
          if(newCategoryData.length) {
            newCategoryData.map(item => {
              const count = store?.templates.filter(elem => elem.subCategory === item._id).length;
              item.count = count;
              return item;
            })
          }
          setCategoryData(newCategoryData);

          break;
        case '2':
          const newTableData = checkedCategoryData.length ? 
            store?.templates?.filter((x)=>x?.organizationId!==null && x?.organizationId!==undefined && checkedCategoryData.includes(x.subCategory) && x.status !== 'remove')
            :
            store?.templates?.filter((x)=>x?.organizationId!==null && x?.organizationId!==undefined && x.status !== 'remove');
          setTableData(Array.from(newTableData));

          const newCategoryData1 = Array.from(categoryData);
          if(newCategoryData1.length) {
            newCategoryData1.map(item => {
              const count = store?.templates?.filter((x)=>x?.organizationId!==null && x?.organizationId!==undefined).filter(elem => elem.subCategory === item._id).length;
              item.count = count;
              return item;
            })
          }
          setCategoryData(newCategoryData1);
          break;
        case '3':
          const newTableData1 = checkedCategoryData.length ? 
            store?.templates?.filter((x)=>x?.userId===getUserData().id && checkedCategoryData.includes(x.subCategory) && x.status !== 'remove')
            :
            store?.templates?.filter((x)=>x?.userId===getUserData().id && x.status !== 'remove');
          setTableData(Array.from(newTableData1));
          
          const newCategoryData2 = Array.from(categoryData);
          if(newCategoryData2.length) {
            newCategoryData2.map(item => {
              const count = store?.templates?.filter((x)=>x?.userId===getUserData().id).filter(elem => elem.subCategory === item._id).length;
              item.count = count;
              return item;
            })
          }
          setCategoryData(newCategoryData2);
          break;
        default:
          const newTableData2 = Array.from(checkedCategoryData.length ? store?.templates?.filter(x => checkedCategoryData.includes(x.subCategory) && x.status !== 'remove') : store?.templates.filter(x=> x.status !== 'remove'))
          setTableData(newTableData2);

          const newCategoryData3 = Array.from(categoryData);
          if(newCategoryData3.length) {
            newCategoryData3.map(item => {
              const count = store?.templates.filter(elem => elem.subCategory === item._id).length;
              item.count = count;
              return item;
            })
          }
          setCategoryData(newCategoryData3);
          
          break;
      }
    }
  }, [store, active, checkedCategoryData]);
  
  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setForm({ ...form, clonedFrom: template._id, formData:tableData.find(x=>x._id===template._id).formData });
  };

  const handleClickBlankTemplate = () => {
    setSelectedTemplate({_id:'blank'});
    setForm({ ...form, clonedFrom: 'blank' });
  }

  const itemAddToFavorite = templateItem => {
    const newForms = Array.from(tableData);
    const newEmailTemplates = newForms.map(item => {
      if(item._id === templateItem._id) {
        const newItem = { ...item };
        newItem.favorite = !newItem.favorite;
        return newItem;
      } else return item;
    });
    setTableData(newEmailTemplates);
  }
  
  return (
    <Fragment>
      <div className="">
        <Row spacing={2} className="p-0 m-0 mt-1">
          <Col sm={12} md={4} lg={4} className=''>
            <BlankContent handleClickBlankTemplate={handleClickBlankTemplate} selectedTemplate={selectedTemplate}/>
          </Col>
          { tableData &&
            tableData.map(item => {
              return (
                <Col key={item._id} sm={12} md={4} lg={4}>
                  <TemplateContent
                    item={item}
                    itemAddToFavorite={itemAddToFavorite}
                    handleSelectTemplate={handleSelectTemplate}
                    selectedTemplate={selectedTemplate}
                    name={item?.name}                               
                    html={item.formData[0]?.html}
                    css={item.formData[0]?.css}
                  />
                </Col>)
            })
          }
        </Row> 
      </div>
    </Fragment>
  );
}
