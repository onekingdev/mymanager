import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Collapse } from 'reactstrap';

// ** CUSTOME COMPONENTS
import FunnelTable from './list/FunnelTable';
import Sidebar from './list/Sidebar';
import { getFormCategories } from '../../requests/formCategory/formCategory';
import CategorySidebar from './CategorySidebar';

export default function Funnels({active,setActive,dispatch}) {
  const store = useSelector(state=>state.formEditor);
  const [collapse, setCollapse] = useState(false);
  const [categoryUpdate, setCategoryUpdate] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [checkedCategoryData, setCheckedCategoryData] = useState([]);
  const [tableData, setTableData] = useState([]);
  
  const handleCategoryCollapse = () => setCollapse(!collapse);

  const fetchData = async () => {
    const response = await getFormCategories();
    const categoryList = response.data;
    setCategoryData(categoryList);
  };

  useEffect(() => {
    fetchData();
  }, [categoryUpdate])

  
  // ** Load initial Data
  useEffect(() => {
    if (store?.funnels) {
      switch (active) {
        case '1':
          const tabledata = checkedCategoryData.length ? store?.funnels?.filter(x => x.status !== 'remove'  && x?.isTemplate === false && checkedCategoryData.includes(x.subCategory)) : store?.funnels?.filter((x) => x?.status !== 'remove' && x?.isTemplate === false);
          setTableData(tabledata);
          break;
        case '2':
          const tabledata1 = checkedCategoryData.length ? store?.funnels?.filter(x => x.status !== 'remove' && x?.isTemplate === true && checkedCategoryData.includes(x.subCategory)) : store?.funnels?.filter((x) => x?.status !== 'remove' && x?.isTemplate === true)
          setTableData(tabledata1);
          break;
        case '4':
          setTableData(checkedCategoryData.length ? store?.funnels?.filter(x => x.status === 'remove' && checkedCategoryData.includes(x.subCategory)) : store?.funnels?.filter((x) => x?.status === 'remove'));
          break;

        default:
          setTableData(store?.funnels);
          break;
      }
    }
  }, [checkedCategoryData]);

  useEffect(() => {
    if (store?.funnels) {
      switch (active) {
        case '1':
          const tabledata = checkedCategoryData.length ? store?.funnels?.filter(x => x.status !== 'remove'  && x?.isTemplate === false && checkedCategoryData.includes(x.subCategory)) : store?.funnels?.filter((x) => x?.status !== 'remove' && x?.isTemplate === false);
          setTableData(tabledata);

          const newCategoryData = Array.from(categoryData);
          if(newCategoryData.length) {
            newCategoryData.map(item => {
              const count = tabledata.filter(elem => elem.subCategory === item._id).length;
              item.count = count;
              return item;
            })
          }
          setCategoryData(newCategoryData);
          break;
        case '2':
          const tabledata1 = checkedCategoryData.length ? store?.funnels?.filter(x => x.status !== 'remove' && x?.isTemplate === true && checkedCategoryData.includes(x.subCategory)) : store?.funnels?.filter((x) => x?.status !== 'remove' && x?.isTemplate === true)
          setTableData(tabledata1);

          const newCategoryData1 = Array.from(categoryData);
          if(newCategoryData1.length) {
            newCategoryData1.map(item => {
              const count = tabledata1.filter(elem => elem.subCategory === item._id).length;
              item.count = count;
              return item;
            })
          }
          setCategoryData(newCategoryData1);
          break;
        case '4':
          
          const tabledata2 = checkedCategoryData.length ? store?.funnels?.filter(x => x.status === 'remove' && checkedCategoryData.includes(x.subCategory)) : store?.funnels?.filter((x) => x?.status === 'remove');
          setTableData(tabledata2);

          const newCategoryData2 = Array.from(categoryData);
          if(newCategoryData2.length) {
            newCategoryData2.map(item => {
              const count = tabledata2.filter(elem => elem.subCategory === item._id).length;
              item.count = count;
              return item;
            })
          }
          setCategoryData(newCategoryData2);
          break;

        default:
          setTableData(store?.funnels);
          break;
      }
    }
  }, [active, store]);

  return (
    <div className="tasks-border" style={{minHeight:'75vh'}}>
      <Sidebar active={active} setActive={setActive} dispatch={dispatch}/>
      <div className="d-flex flex-row flex-1 bg-white">
        {active === '2' &&
          <Collapse
            isOpen={!collapse}
            horizontal={true}
            delay={{ show: 200, hide: 500 }}
          >
            <CategorySidebar
              collapse={collapse}
              handleCategoryCollapse={handleCategoryCollapse}
              categoryUpdate={categoryUpdate}
              setCategoryUpdate={setCategoryUpdate}
              categoryData={categoryData}
              checkedCategoryData={checkedCategoryData}
              setCheckedCategoryData={setCheckedCategoryData}
            />
          </Collapse>
        }
        <FunnelTable tableData={tableData} active={active} dispatch={dispatch} handleCategoryCollapse={handleCategoryCollapse} collapse={collapse}/>
      </div>
    </div>
  );
}
