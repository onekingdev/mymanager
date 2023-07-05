import React, { Fragment, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Edit2, Plus, Trash } from 'react-feather'
import { Button, Col, Row } from 'reactstrap'
import NewLocationModal from '../../../../locations/NewLocationModal'


export default function LocationTab({store,dispatch,selectedOrg}) {
    const [openLocation,setOpenLocation] = useState(false)
    const toggleLocation = ()=>{
        setOpenLocation(!openLocation)
    }
    const handleEditLocation =(row)=>{

    }
    const handleDeleteLocation =(row)=>{

    }
    const columns = [
        {
            name: 'Name',
            selector: (row) => row.name,
            width: '15%'
          },
          {
            name: 'Email',
            selector: (row) => row.email,
            width: '15%'
          },
          {
            name: 'Contact',
            selector: (row) => row.contact,
            width: '15%'
          },
          {
            name: 'Address',
            selector: (row) => row.address,
            width: '25%'
          },
          {
            name: 'Actions',
            selector: (row) => row._id,
            width: '30%',
            cell:(row)=>(<>
            <Edit2 style={{cursor:"pointer"}} className="text-primary mx-50" size={18} onClick={()=>handleEditLocation(row)}/>
            <Trash style={{cursor:"pointer"}} className="text-danger" size={18} onClick={()=>handleDeleteLocation(row)}/>
            </>)
          },
    ]
  return (
    <Fragment>
    <Row style={{ width: '100%', margin: '0px', padding: '0px' }}>
      <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }} style={{ padding: '0px' }}>
        <div className="task-application">
          {selectedOrg?.locations ? (
            <div className="list-group task-task-list-wrapper">
              <div className='d-flex justify-content-end my-50'>
                <Button color="primary" onClick={toggleLocation}>
                  <Plus /> New Location
                </Button>
              </div>
              <DataTable
                noHeader
                responsive
                className="react-dataTable"
                columns={columns}
                data={selectedOrg?.locations}
              />
            </div>
          ) : (
            <div className="text-center">
              <p>You didn't create any plan yet!</p>
              <Button color="primary" onClick={toggleLocation}>
                <Plus size={12} /> New Location
              </Button>
            </div>
          )}
        </div>
      </Col>
    </Row>
   <NewLocationModal toggle={toggleLocation} open={openLocation} dispatch={dispatch} selectedOrg={selectedOrg}/>
  </Fragment>
  )
}
