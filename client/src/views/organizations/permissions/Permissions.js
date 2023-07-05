import React from 'react'
import DataTable from 'react-data-table-component'
import { ChevronDown, Eye, EyeOff, FileText, MoreVertical, Plus, Trash, UserPlus } from 'react-feather'
import { Badge, Button, Card, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'


const data=[
    {
        name:'org1',
        email:'abc@gmail.com',
        contact:'09876543',
        address:'123 New York,',
        url:'https://mymanager.com/orgs/org1',
        status:'verified',
        userCount:10
    }
]

const columns = [
    {
        name:"Organizations",
        selector:(row)=>row?.name
    },
    {
        name:"Email",
        selector:(row)=>row?.email
    },
    {
        name:"Contact",
        selector:(row)=>row?.contact
    },
    {
        name:"Address",
        selector:(row)=>row?.address
    },
    {
        name:"Link",
        selector:(row)=>row?.url
    },
    {
        name:"Status",
        selector:(row)=>row?.status,
        cell:(row) =>(<Badge color='primary'>{row.status}</Badge>)
    },
    {
        name:"Users",
        selector:(row)=>row?.userCount,
        
    },

    {
        name:"Actions",
        selector:(row)=>row?._id,
        cell:(row)=>(
            <div className='justify-content-between'>
                <Eye className='mx-50' size={18}/>
                <UserPlus className='mx-50' size={18}/>
                <Trash className='mx-50' size={18}/>
            </div>
        )
    },
]


export default function Organizations() {
  return (
    <Card className="overflow-hidden">
       <div className='m-1 d-flex justify-content-between'>
       <h2 className='my-auto'>My Organizations</h2>
       <div>
        <Button color='primary'>
            <Plus/> Add new Organization
        </Button>
       </div>
       </div>
        <div className="react-dataTable employee-list-table" style={{ height: '80vh' }}>
          <DataTable
            noHeader
            pagination
            responsive
            paginationServer
            columns={columns}
            
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            
            data={data}
            
          />
        </div>
      </Card>
  )
}
