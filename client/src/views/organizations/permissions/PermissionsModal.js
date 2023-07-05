import React from 'react';

// ** THIRD PARTY
import DataTable from 'react-data-table-component';
import { ReactSortable } from 'react-sortablejs';
import { Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';


// ** SAMPLE DATA
const data = [
  {
    module: 'contacts',
    read: true,
    write: false,
    create: false,
    delete: false
  },
  {
    module: 'tasks & goals',
    read: false,
    write: true,
    create: false,
    delete: false
  },
  {
    module: 'calendar',
    read: true,
    write: false,
    create: true,
    delete: false
  },
  {
    module: 'document',
    read: true,
    write: false,
    create: true,
    delete: false
  },
  {
    module: 'marketing',
    read: false,
    write: false,
    create: false,
    delete: true
  },
  {
    module: 'my business',
    read: false,
    write: false,
    create: false,
    delete: true
  }
];

export default function PermisionsModal({ open, toggle }) {
  const columns = [
    {
      name: 'MODULE',
      selector: (row) => row.module,
      width:'30%'
    },
    {
      name: 'READ',
      selector: (row) => row.read,
      width:'20%',
      cell: (row) => <Input type="checkbox" checked={row.read} />
    },
    {
      name: 'WRITE',
      selector: (row) => row.write,
      width:'20%',
      cell: (row) => <Input type="checkbox" checked={row.write} />
    },
    {
      name: 'CREATE',
      selector: (row) => row.create,
      width:'20%',
      cell: (row) => <Input type="checkbox" checked={row.create} />
    },
    {
      name: 'DELETE',
      selector: (row) => row.delete,
      width:'20%',
      cell: (row) => <Input type="checkbox" checked={row.delete} />
    }
  ];
  return (
    <Modal isOpen={open} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Manage Permissions</ModalHeader>
      <ModalBody>
        <Row style={{ width: '100%', margin: '0px', padding: '0px' }}>
          <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }} style={{ padding: '0px' }}>
            <div className="task-application">
            <div className='list-group task-task-list-wrapper'>
            <DataTable
            striped
                    noHeader
                    responsive
                    className="react-dataTable"
                    columns={columns}
                    data={data}
                  />
            </div>
            </div>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <div className="d-flex justofy-conten-end">
          <Button color="primary">Accept</Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}
