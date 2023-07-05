import React, { useEffect, useState } from 'react';
// import { getData } from '../props.filtered_list/actions';
import { useDispatch, useSelector } from 'react-redux';

import ReactPaginate from 'react-paginate';

import { ChevronDown, ChevronsDown } from 'react-feather';

import DataTable from 'react-data-table-component';
import DocModal from './DocModal';

import { Link, useLocation } from 'react-router-dom';

import {
  Button,
  Input,
  Row,
  Col,
  Card,
  FormGroup,
  Label,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  UncontrolledTooltip,
} from 'reactstrap';

import {
  Eye,
  Send,
  Edit,
  Copy,
  Save,
  Info,
  Trash,
  PieChart,
  Download,
  TrendingUp,
  CheckCircle,
  MoreVertical,
  ArrowDownCircle,
  BookOpen
} from 'react-feather';

const months = [
  'January','February','March','April','May','June','July','August','September','October','November','December'
]

const ListIncome = ({type,incomeList,month,year}) => {

  const [value, setValue] = useState('');
  const [sort, setSort] = useState('desc');
  const [sortColumn, setSortColumn] = useState('id');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusValue, setStatusValue] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState('1');
  const [filterList, setFilterList] = useState([]);
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const dispatch = useDispatch();
  const handlePagination = (page) => {
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        status: statusValue,
        perPage: rowsPerPage,
        page: page.selected + 1
      })
    );
    setCurrentPage(page.selected + 1);
  };

  const dataToRender = (filtered_list) => {
    const filters = {
      q: value,
      status: statusValue
    };

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0;
    });
    if (filtered_list.length > 0) {
    
      return filtered_list;
    } else if (filtered_list.length === 0 && isFiltered) {
      return [];
    }
  };
  
  const compareDate = (row_first, row_second) => {
    const dateFirst = new Date(row_first.date)
    var firstTime = new Date(dateFirst.getFullYear(), dateFirst.getMonth(), dateFirst.getDate());

    const dateSecond = new Date(row_second.date)
    var secondTime = new Date(dateSecond.getFullYear(), dateSecond.getMonth(), dateSecond.getDate());
    return firstTime.getTime() - secondTime.getTime()
  }
  useEffect(() => {
   if(incomeList){
    let totalFilter = incomeList;
    totalFilter?.sort(compareDate)
    var dailyList = [];
    var list = [];
    for(var i = 0; i < totalFilter?.length; i ++) {
      if(list.length == 0) {
        list.push(totalFilter[i])
      } else {
        if(compareDate(totalFilter[i], totalFilter[i - 1]) == 0) {
          list.push(totalFilter[i]);
        } else {
          dailyList.push({
            date: new Date(list[0].date),
            list: list
          });
          list = [];
          list.push(totalFilter[i]);
        }
      }
    }
    if(list.length > 0) {
      dailyList.push({
        date: new Date(list[0].date),
        list: list
      });
    }
    setFilterList(dailyList)
   }
  }, [incomeList]);

  const renderClient = (row) => {
    const stateNum = Math.floor(Math.random() * 6),
      states = [
        'light-success',
        'light-danger',
        'light-warning',
        'light-info',
        'light-primary',
        'light-secondary'
      ],
      color = states[stateNum];
  
    if (row.avatar.length) {
      return <Avatar className="me-50" img={row.avatar} width="32" height="32" />;
    } else {
      return (
        <Avatar
          color={color}
          className="me-50"
          content={row.client ? row.client.name : 'John Doe'}
          initials
        />
      );
    }
  };
  
  
  // ** Table columns
  const columns = [
    {
      sortable: true,
      name: 'Date',
      sortField: 'date',
      cell: ((row) => {
          const date = new Date(row.date)
          var noTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());
          return noTime.toDateString()
        }
      )
      // selector: row => row.dueDate
    },
    
    {
      name: 'Name',
      sortable: true,
      sortField: 'name',
      // selector: row => row.client.name,
      cell: (row) => {
        return <span>{row?.clientId?.fullName}</span>;
      }
    },
    {
      name: 'Type',
      sortable: true,
      sortField: 'name',
      cell: (row) => <span>{row?.categoryId?.title}</span>
    },
    {
      name: 'Total',
      sortable: true,
      sortField: 'amount',
      // selector: row => row.total,
      cell: (row) => <span>${row?.amount || 0}</span>
    },
    
    {
      name: 'Proof',
      cell: (row) => {
        const [modal, setModal] = useState(false);
        const toggle = () => setModal(!modal);
        if(row?.invoiceId){
          return <Button color='primary' outline size='sm' tag={Link} to={`/invoice-preview/${row?.invoiceId?._id}`} target="_blank">View</Button>
        }
        else{
          return <DocModal modal={modal} toggle={toggle} data={row} type={type} dispatch={dispatch}/>
        }
        
      }
    },
   
  ];

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <Accordion open={open} toggle={toggle}>
          {filterList?.map((filterData, index) => (
              <AccordionItem className="border">
                <AccordionHeader targetId={index}>
                  <div className="d-flex">
                    <Label style={{fontSize: '18px'}}>{months[filterData.date.getMonth()]} {filterData.date.getDate()}, {filterData.date.getFullYear()}</Label>
                    <Badge
                        color="primary"
                        style={{
                          position: 'absolute',
                          right: '50px'
                        }}
                    >
                      {filterData.list.length}
                    </Badge>{' '}
                  </div>
                </AccordionHeader>
                <AccordionBody accordionId={index}>
                  <div className="invoice-list-dataTable react-dataTable">
                    <DataTable
                        noHeader
                        pagination
                        sortServer
                        paginationServer
                        subHeader={false}
                        columns={columns}
                        responsive={true}
                        //onSort={handleSort}
                        data={dataToRender(filterData.list)}
                        //sortIcon={<ChevronDown />}
                        className="react-dataTable"
                        defaultSortField="invoiceId"
                        type={type}
                        
                    />
                  </div>
                </AccordionBody>
              </AccordionItem>
          ))}


        </Accordion>
      </Card>
    </div>
  );
};

export default ListIncome;
