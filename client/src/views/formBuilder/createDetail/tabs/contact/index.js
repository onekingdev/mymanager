// ** React Imports
import { useHistory, useParams } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge
} from 'reactstrap';

// ** Third Party Components
import { ImAddressBook } from 'react-icons/im';
import { FiUser, FiUsers } from 'react-icons/fi';
import DataTable from 'react-data-table-component';
import { Edit, Eye, File, FileText, Menu, MoreVertical, Share, Trash, Upload } from 'react-feather';

// ** Styles
import '@styles/react/apps/app-email.scss';
import { convertDate } from '../../../../goals/helpers/converters';
import { addLeadAction, deleteFormEntryAction } from '../../../store/action';
import { toast } from 'react-toastify';
import { CSVLink } from 'react-csv';
import ContactDetails from './ContactDetails';

const labels = {
  client: 'light-primary',
  employee: 'light-secondary',
  lead: 'light-success',
  relationships: 'light-warning',
  vendor: 'light-danger',
  members: 'light-danger'
};
const CustomHeader = ({
  store,

  //handlePerPage,
  //rowsPerPage,
  //handleFilter,
  //setContactImportModal,
  formContact
}) => {
  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(store.data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  // for CSV export

  const tableData = formContact;
  

  const formatedData =
    tableData &&
    tableData.map(
      (
        {
          _id,
          userId,
          photo,
          tags,
          isFormer,
          isDelete,
          ranks,
          files,
          others,
          socialLinks,
          paymentMethods,
          address,
          billingAddress,
          __v,
          ...rest
        },
        index
      ) => {
        const sl = index + 1;
        // formatting address
        const fullAddress = `${address?.street || ''},${address?.city || ''},${
          address?.state || ''
        },${address?.country || ''}`;

        const fullBillilgAddress = `${billingAddress?.addressLineOne || ''},${
          billingAddress?.city || ''
        },${billingAddress?.state || ''},${billingAddress?.country || ''},${
          billingAddress?.zipCode || ''
        }`;

        const restData = {
          sl,
          fullAddress,
          fullBillilgAddress,
          ...rest
        };
        return restData;
      }
    );

  const csvReport = {
    filename: 'employees.csv',
    data: formatedData
  };

  // Hover on CSV

  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv === null) return;
    const filename = 'export.csv';
    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
  }

  // for PDF export
  const columns = [
    { title: 'Sl', field: 'sl' },
    { title: 'Employees', field: 'fullName' },
    { title: 'Email', field: 'email' },
    { title: 'Phone', field: 'phone', type: 'numeric' },
    { title: 'fullAddress', field: 'fullAddress' },
    { title: 'Billing Address', field: 'fullBillilgAddress' },
    { title: 'Gender', field: 'gender' },
    { title: 'Salary', field: 'salary' },
    { title: 'position', field: 'position' },
    { title: 'Note', field: 'note' },
    { title: 'Status', field: 'status' }
  ];

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text('Employee Details', 15, 10);
    doc.autoTable({
      styles: {
        fontSize: 8
      },
      theme: 'grid',
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: formatedData,
      horizontalPageBreak: true,
      headStyles: {
        halign: 'center',
        valign: 'middle',
        fontSize: 7,
        fillColor: ['#f3f2f7'],
        textColor: '#202c33',
        tableWidth: 'auto'
      },
      bodyStyles: {
        textColor: 'black'
      },
      columnStyles: {
        0: {
          cellWidth: 18
        },
        1: {
          cellWidth: 20
        }
      }
    });
    doc.save('employees.pdf');
  };

  let typingTimer; //timer identifier
  let doneTypingInterval = 500; //time in ms (500 ms)
  function doneTyping(val) {
    //handleFilter(val);
  }

  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col xl="6" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <label htmlFor="rows-per-page">Show</label>
            <Input
              className="mx-50"
              type="select"
              id="rows-per-page"
              //value={rowsPerPage}
              //onChange={handlePerPage}
              style={{ width: '5rem' }}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Input>
            <label htmlFor="rows-per-page">Entries</label>
          </div>
        </Col>
        <Col
          xl="6"
          className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
        >
          <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
            <label className="mb-0" htmlFor="search-invoice">
              Search:
            </label>

            <Input
              id="search-invoice"
              className="ms-50 w-100"
              type="text"
              // value={searchTerm}
              onChange={(e) => {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(() => doneTyping(e.target.value), doneTypingInterval);
              }}
            />
          </div>
          <div>
            <Button.Ripple
              className="btn-icon me-1"
              outline
              color="primary"
              //onClick={() => setContactImportModal((p) => !p)}
            >
              <Upload size={16} />
            </Button.Ripple>
          </div>
          <div className="d-flex align-items-center table-header-actions">
            <UncontrolledDropdown className="me-1">
              <DropdownToggle color="secondary" caret outline>
                <Share className="font-small-4 me-50" />
                <span className="align-middle">Export</span>
              </DropdownToggle>
              <DropdownMenu>
                {/* <DropdownItem className="w-100">
                                    <Printer className="font-small-4 me-50" />
                                    <span className="align-middle">Print</span>
                                </DropdownItem> */}
                <DropdownItem
                  className="w-100"
                  onClick={() => {
                    // downloadCSV(store.data)
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <FileText className="font-small-4 me-50" />
                  {tableData && (
                    <CSVLink {...csvReport}>
                      <span
                        className="align-middle"
                        style={{
                          color: isHover ? '#7367f0' : '#b4b7bd'
                        }}
                      >
                        CSV
                      </span>
                    </CSVLink>
                  )}
                </DropdownItem>
                {/* <DropdownItem className="w-100">
                                    <Grid className="font-small-4 me-50" />
                                    <span className="align-middle">Excel</span>
                                </DropdownItem> */}
                {tableData && (
                  <DropdownItem className="w-100" onClick={() => downloadPdf()}>
                    <File className="font-small-4 me-50" />
                    <span className="align-middle">PDF</span>
                  </DropdownItem>
                )}
                {/* <DropdownItem className="w-100">
                                    <Copy className="font-small-4 me-50" />
                                    <span className="align-middle">Copy</span>
                                </DropdownItem> */}
              </DropdownMenu>
            </UncontrolledDropdown>
            {/* <Button className="add-new-user" color="primary" onClick={toggleSidebar}>
              Add New Employee
            </Button> */}
          </div>
        </Col>
      </Row>
    </div>
  );
};
const Contact = ({ dispatch, store }) => {
  const [openDetails,setOpenDetails] = useState(false)
  const [row,setRow] = useState(null);

  const toggleDetails =() => setOpenDetails(!openDetails)
  

  // ** FUNCTIONS
  const handleEdit = (row) => {

  };
  const handleDisplay = (row) =>{
    ///form-funnel/form-details/:id
    
  }
  const handleRemove = (row) => {

    dispatch(deleteFormEntryAction(row.formData._id,row.formData.formId))
  };

  const handleAddToContact = (row) => {
    if (row?.formData?.fullName && (row?.formData?.phone || row?.formData?.email)) {
      dispatch(addLeadAction(store.form._id, row.formData));
    } else {
      toast.error('Name or phone or email is not available!');
    }
  };

  const columns = [
    {
      name: 'Name',
      selector: (row) => row?.formData?.fullName
    },
    // {
    //   name: 'Type',
    //   selector: (row) => row.type,
    //   sortable: true
    // },
    // {
    //   name: 'Smartlist',
    //   selector: (row) => row.smartList
    // },

    // {
    //   name: 'Subcategory',
    //   selector: (row) => row.subCategory
    // },
    {
      name: 'Email',
      selector: (row) => row?.formData?.email
    },
    {
      name: 'Phone',
      selector: (row) => row?.formData?.phone
    },
    {
      name: 'Entry Date',
      selector: (row) => row?.formData?.createdAt,
      cell: (row) => <span>{convertDate(row?.formData?.createdAt)}</span>
    },
    {
      name: 'Status',
      selector: (row) => row?.contactData?.table,
      cell: (row) =>
        row?.contactData ? (
          <Badge color={labels[row?.contactData?.table]}>{row?.contactData?.table}</Badge>
        ) : (
          <div className="column-action">
            <Button color="outline-primary" size="sm" onClick={handleAddToContact}>
              Add to Lead
            </Button>
          </div>
        )
    },
    {
      name: 'Action',
      cell: (row) => (
        <>
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
            <DropdownItem tag="span" className="w-100" onClick={()=>{
              setRow(row);
              toggleDetails();
            }}>
                <Eye size={14} className="me-50" />
                <span className="align-middle">Details</span>
              </DropdownItem>
              <DropdownItem tag="span" className="w-100" onClick={() => handleEdit(row)}>
                <Edit size={14} className="me-50" />
                <span className="align-middle">Edit</span>
              </DropdownItem>
              <DropdownItem tag="span" className="w-100" onClick={() => handleRemove(row)}>
                <Trash size={14} className="me-50" />
                <span className="align-middle">Remove</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
        
        </>
      )
    }
  ];
  return (
    <>
      {store && (
        <Row style={{ width: '100%', margin: '0px', padding: '0px' }}>
          <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }} style={{ padding: '0px' }}>
            <div className="tasks-border">
              <div className="tasks-area" style={{ maxWidth: '100%', width: '100%' }}>
                {store?.formContacts ? (
                  <div className="">
                    <div className="px-1 pt-1">
                      <Row>
                        <Col md="4">
                          <Card>
                            <CardBody>
                              <div className="d-flex justify-content-between">
                                <span>Total Contacts</span>
                                <span>
                                  <ImAddressBook size={30} />
                                </span>
                              </div>
                              <div className="d-flex justify-content-between">
                                {store?.formContacts?.length || 0}
                                <div className="d-flex justify-content-center"></div>
                              </div>
                            </CardBody>
                          </Card>
                        </Col>
                        <Col md="4">
                          <Card>
                            <CardBody>
                              <div className="d-flex justify-content-between">
                                <span>Last Month Contacts</span>
                                <span>
                                  <FiUsers size={30} />
                                </span>
                              </div>
                              <div className="d-flex justify-content-between">
                                21
                                <div className="d-flex justify-content-center"></div>
                              </div>
                            </CardBody>
                          </Card>
                        </Col>
                        <Col md="4">
                          <Card>
                            <CardBody>
                              <div className="d-flex justify-content-between">
                                <span>Last Week Contacts</span>
                                <span>
                                  <FiUser size={30} />
                                </span>
                              </div>
                              <div className="d-flex justify-content-between">
                                21
                                <div className="d-flex justify-content-center"></div>
                              </div>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </div>

                    <DataTable
                      noHeader
                      //subHeader
                      responsive
                      selectableRows
                      columns={columns}
                      data={store?.formContacts}
                      className="react-dataTable"
                      // subHeaderComponent={
                      //   <CustomHeader
                      //    // setContactImportModal={setContactImportModal}
                      //     store={store}
                      //     //searchTerm={searchTerm}
                      //     //rowsPerPage={rowsPerPage}
                      //     //handleFilter={handleFilter}
                      //     //handlePerPage={handlePerPage}

                      //     formContact={store?.formContacts}
                      //   />
                      // }
                    />
                  </div>

                ) : (
                  <div className="text-center">No contact available for this funnel</div>
                )}
              </div>
            </div>
          </Col>
        </Row>

      )}
{row && row!==null && <ContactDetails toggle={toggleDetails} open={openDetails} row={row}/>}
    </>
  );
};

export default Contact;
