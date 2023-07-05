import { useState } from 'react';
import { Badge, Input, Modal, ModalBody, ModalHeader } from 'reactstrap';
import DataTable from 'react-data-table-component';
import { ChevronDown } from 'react-feather';
import Avatar from '@components/avatar';
import ReactPaginate from 'react-paginate';

const rowsPerPage = 10;

const WinLostList = (props) => {
  const { isOpen, setIsOpen, store, selectedStage, setSelectedStage, contactTypeId } = props;

  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = store?.contactList?.list?.filter(
    (x) => x?.contactType.indexOf(contactTypeId) > -1 && x.stage == selectedStage?.stage?.value
  );
  const cancelBtnClicked = () => {
    setIsOpen(false);
    setSelectedStage(null);
  };

  // ** Renders Client Columns
  const renderClient = (row) => {
    let tmpValue = 0;
    Array.from(row?._id).forEach((x, index) => {
      tmpValue += x.codePointAt(0) * (index + 1);
    });
    const stateNum = tmpValue % 6,
      states = [
        'light-success',
        'light-danger',
        'light-warning',
        'light-info',
        'light-primary',
        'light-secondary'
      ],
      color = states[stateNum];

    if (row?.photo) {
      return <Avatar className="me-1" img={row?.photo} width="32" height="32" />;
    } else {
      return (
        <Avatar
          color={color || 'primary'}
          className="me-1"
          content={row.fullName || 'John Doe'}
          initials
        />
      );
    }
  };

  function PrintAddress({ address }) {
    let fullAddress = '';

    if (!address) {
      return <></>;
    }

    const reorderedAddress = {
      city: null,
      state: null,
      country: null,
      street: null,
      zipCode: null
    };
    const newAddressData = Object.assign(reorderedAddress, address);
    const addressValues = Object.values(newAddressData);
    const displayableAddress = addressValues.slice(0, 3);

    fullAddress = displayableAddress
      .filter((x) => typeof x === 'string' && x.length > 0)
      .join(', ');

    return <>{fullAddress}</>;
  }

  const columns = [
    {
      name: 'Full Name',
      minWidth: '240px',
      selector: (row) => row.fullName.toString(),
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          {renderClient(row)}
          <div className="d-flex flex-column">
            <span className="fw-bolder">{row.fullName}</span>
            <small className="text-truncate fw-bolder text-muted mb-0 cursor-pointer">
              {row.company}
            </small>
            <small className="text-truncate text-muted mb-0 cursor-pointer">{row.email}</small>
          </div>
        </div>
      )
    },
    {
      name: 'Phone',
      width: '130px',
      selector: (row) => row.phone,
      cell: (row) => <span>{row.phone}</span>
    },

    {
      name: 'Address',
      minWidth: '150px',
      selector: (row) => row.country,
      cell: (row) => {
        return (
          <>
            <PrintAddress address={row?.address} />
          </>
        );
      }
    },
    {
      name: 'Lead Source',
      minWidth: '140px',
      cell: (row) =>
        row?.leadSource &&
        row?.leadSource?.map((src) => (
          <Badge
            className="text-capitalize ms-50"
            color={store?.leadSource?.find((x) => x.title === src.value)?.color}
          >
            {src.value}
          </Badge>
        ))
    }
  ];

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  // ** Function in get data on page change
  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Math.ceil(filteredData?.length / rowsPerPage);

    return (
      <div className="d-flex justify-content-end">
        <div
          className="d-flex align-items-center justify-content-end"
          style={{ marginTop: '10px' }}
        >
          {/* <label htmlFor="rows-per-page">Show</label> */}
          <Input
            className="mx-50"
            type="select"
            id="rows-per-page"
            value={rowsPerPage}
            onChange={handlePerPage}
            style={{ width: '5rem' }}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </Input>
          <label htmlFor="rows-per-page" style={{ marginRight: '1rem' }}>
            Per Page
          </label>
        </div>
        <ReactPaginate
          previousLabel={''}
          nextLabel={''}
          pageCount={count || 1}
          activeClassName="active"
          forcePage={currentPage !== 0 ? currentPage - 1 : 0}
          onPageChange={(page) => handlePagination(page)}
          pageClassName={'page-item'}
          nextLinkClassName={'page-link'}
          nextClassName={'page-item next'}
          previousClassName={'page-item prev'}
          previousLinkClassName={'page-link'}
          pageLinkClassName={'page-link'}
          containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
        />
      </div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      className="modal-dialog-centered"
      toggle={() => cancelBtnClicked()}
      style={{ minWidth: '700px' }}
    >
      <ModalHeader toggle={() => cancelBtnClicked()}>
        <div className="d-flex align-items-center">
          <span>
            {selectedStage?.stage?.value} Stage List{'  '}
          </span>
          <Badge className="text-capitalize ms-50" color="light-primary" pill>
            {filteredData?.length}
          </Badge>
        </div>
      </ModalHeader>
      <ModalBody>
        <DataTable
          noHeader
          // sortServer
          pagination
          responsive
          paginationServer
          columns={columns}
          sortIcon={<ChevronDown />}
          className="react-dataTable"
          paginationComponent={CustomPagination}
          data={filteredData}
        />
      </ModalBody>
    </Modal>
  );
};

export default WinLostList;
