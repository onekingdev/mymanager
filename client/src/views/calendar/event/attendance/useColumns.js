// ** React Imports
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// ** Icons Imports
import { Trash, Eye } from 'react-feather';

// ** Reactstrap Imports
import {
  Badge,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledDropdown
} from 'reactstrap';
import { renderCategoryName } from '../../../../utility/Utils';

export const useColumns = ({
  row,
  setRow,
  toggle,
  toggleDeleteModal,
  handleDecisionClick,
  setIsBulk,
  eventInfo
}) => {
  const contactTypes = useSelector((state) => state?.totalContacts?.contactTypeList);
  const statusObj = {
    came: 'success',
    going: 'light-success',
    notgoing: 'light-warning',
    noreply: 'light-danger',
    maybe: 'light-info',
    'No reply': 'danger',
    notcame: 'warning'
  };

  const categoryObj = {
    client: 'primary',
    employee: 'light-success',
    lead: 'light-warning',
    relationship: 'light-danger',
    vendor: 'light-info'
  };

  // ** Handlers
  const handleTrashClick = (row) => {
    if (row) {
      setIsBulk(false);
      setRow(row);
      toggleDeleteModal();
    } else return;
  };

  const handleEyeClick = (row) => {
    if (row) {
      setRow(row);
      toggle();
    } else return;
  };

  const renderStatus = (status) => {
    if (status == 'going') {
      return 'Going';
    } else if (status == 'notgoing') {
      return 'Not Going';
    } else if (status == 'No reply' || status == 'noreply') {
      return 'No Reply';
    } else if (status == 'notcame') {
      return 'Did Not Come';
    } else return status;
  };

  const columns =
    eventInfo.checkoutType != 'none'
      ? [
          {
            name: 'Name',
            sortable: true,
            selector: (row) => row?.contact.fullName,
            minWidth: '130px',
            minWidth: '220px',
            cell: (row) => (
              <div className="d-flex justify-content-left align-items-center">
                <div className="d-flex flex-column">
                  <Link className="user_name text-truncate text-body">
                    <span className="fw-bolder">{row?.contact.fullName}</span>
                  </Link>
                  <small className="text-truncate text-muted mb-0">{row?.contact.email}</small>
                </div>
              </div>
            )
          },
          {
            name: 'Phone',
            sortable: true,
            sortField: 'phone',
            selector: (row) => row?.contact.phone,
            cell: (row) =>
              row?.contact.phone ? (
                <span className="text-capitalize">{row.contact.phone}</span>
              ) : (
                <Badge color="light-warning">Unknown</Badge>
              )
          },
          {
            name: 'Type',
            sortable: true,
            sortField: 'category',
            selector: (row) => row?.contact?.contactType,
            cell: (row) => (
              <Badge
                className="text-capitalize"
                color={
                  categoryObj[
                    renderCategoryName(contactTypes, row?.contact?.contactType).toLowerCase()
                  ]
                }
                pill
              >
                {renderCategoryName(contactTypes, row?.contact.contactType)}
              </Badge>
            )
          },
          {
            name: 'Paid',
            sortable: true,
            cell: (row) =>
              row?.invoiceId && row?.invoiceId?.payNow === 0 ? (
                <Badge color="success">Paid</Badge>
              ) : (
                <Badge color="danger">Not Paid</Badge>)
              // ) : (
              //   <Badge color="warning">Refund</Badge>
              // )
          },
          {
            name: 'Status',
            sortable: true,
            sortField: 'status',
            selector: (row) => row?.status,
            cell: (row) => {
              if (row?.status) {
                return (
                  <UncontrolledDropdown>
                    <DropdownToggle tag="span">
                      <Badge
                        color={statusObj[row?.status]}
                        className="text-capitalize cursor-pointer"
                      >
                        {renderStatus(row?.status)}
                      </Badge>
                    </DropdownToggle>
                    <DropdownMenu end>
                      <DropdownItem
                        tag={'li'}
                        onClick={(e) => handleDecisionClick({ row: row, decision: 'came' })}
                      >
                        <Badge color="light-success" className="text-capitalize">
                          Came
                        </Badge>
                      </DropdownItem>
                      <DropdownItem
                        tag={'li'}
                        onClick={(e) => handleDecisionClick({ row: row, decision: 'notcame' })}
                      >
                        <Badge color="light-warning" className="text-capitalize">
                          Did Not Come
                        </Badge>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                );
              }
            }
          },
          {
            name: 'Note',
            sortable: true,
            sortField: 'note',
            cell: (row) => (
              <>
                <Eye
                  size={20}
                  className="cursor-pointer"
                  id="detail"
                  onClick={(e) => handleEyeClick(row)}
                />
                <UncontrolledTooltip placement="left" target="detail">
                  Guest Detail
                </UncontrolledTooltip>
              </>
            )
          },
          {
            name: 'Actions',
            cell: (row) => (
              <>
                <Trash
                  size={20}
                  className="cursor-pointer me-50"
                  id="delete"
                  onClick={(e) => handleTrashClick(row)}
                />
                <UncontrolledTooltip placement="left" target="delete">
                  Remove Guest
                </UncontrolledTooltip>
              </>
            )
          }
        ]
      : [
          {
            name: 'Name',
            sortable: true,
            selector: (row) => row?.contact.fullName,
            minWidth: '130px',
            minWidth: '220px',
            cell: (row) => (
              <div className="d-flex justify-content-left align-items-center">
                <div className="d-flex flex-column">
                  <Link className="user_name text-truncate text-body">
                    <span className="fw-bolder">{row?.contact.fullName}</span>
                  </Link>
                  <small className="text-truncate text-muted mb-0">{row?.contact.email}</small>
                </div>
              </div>
            )
          },
          {
            name: 'Phone',
            sortable: true,
            sortField: 'phone',
            selector: (row) => row?.phone,
            cell: (row) =>
              row?.contact.phone ? (
                <span className="text-capitalize">{row.contact.phone}</span>
              ) : (
                <Badge color="light-warning">Unknown</Badge>
              )
          },
          {
            name: 'Type',
            sortable: true,
            sortField: 'category',
            selector: (row) => row?.contact?.contactType,
            cell: (row) => (
              <Badge
                className="text-capitalize"
                color={
                  categoryObj[
                    renderCategoryName(contactTypes, row?.contact?.contactType).toLowerCase()
                  ]
                }
                pill
              >
                {renderCategoryName(contactTypes, row?.contact.contactType)}
              </Badge>
            )
          },
          {
            name: 'Status',
            sortable: true,
            sortField: 'status',
            selector: (row) => row?.status,
            cell: (row) => {
              if (row?.status) {
                return (
                  <UncontrolledDropdown>
                    <DropdownToggle tag="span">
                      <Badge
                        color={statusObj[row?.status]}
                        className="text-capitalize cursor-pointer"
                      >
                        {renderStatus(row?.status)}
                      </Badge>
                    </DropdownToggle>
                    <DropdownMenu end>
                      <DropdownItem
                        tag={'li'}
                        onClick={(e) => handleDecisionClick({ row: row, decision: 'came' })}
                      >
                        <Badge color="light-success" className="text-capitalize">
                          Came
                        </Badge>
                      </DropdownItem>
                      <DropdownItem
                        tag={'li'}
                        onClick={(e) => handleDecisionClick({ row: row, decision: 'notcame' })}
                      >
                        <Badge color="light-warning" className="text-capitalize">
                          Did Not Come
                        </Badge>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                );
              }
            }
          },
          {
            name: 'Note',
            sortable: true,
            sortField: 'note',
            cell: (row) => (
              <>
                <Eye
                  size={20}
                  className="cursor-pointer"
                  id="detail"
                  onClick={(e) => handleEyeClick(row)}
                />
                <UncontrolledTooltip placement="left" target="detail">
                  Guest Detail
                </UncontrolledTooltip>
              </>
            )
          },
          {
            name: 'Actions',
            cell: (row) => (
              <>
                <Trash
                  size={20}
                  className="cursor-pointer me-50"
                  id="delete"
                  onClick={(e) => handleTrashClick(row)}
                />
                <UncontrolledTooltip placement="left" target="delete">
                  Remove Guest
                </UncontrolledTooltip>
              </>
            )
          }
        ];
  return {
    columns
  };
};

export default useColumns;
