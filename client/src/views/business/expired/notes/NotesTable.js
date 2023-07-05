import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { ChevronDown, } from 'react-feather'
import { basicColumns } from './data'
import Select from "react-select"
import { selectThemeColors } from "@utils"
import { Card } from 'reactstrap'

const data = [
    {
        "id": 1,
        "formId": "167-161211",
        "name": "New Jersey",
        "type": "none",
        "created": "JAN 27 2021"
    },
    {
        "id": 2,
        "formId": "167-161211",
        "name": "New Jersey",
        "type": "none",
        "created": "JAN 27 2021"
    },
    {
        "id": 3,
        "formId": "167-112071",
        "name": "New York NJ-W4",
        "type": "none",
        "created": "JAN 27 2021"
    },
    {
        "id": 4,
        "formId": "167-178071",
        "name": "Taxes NJ-W4",
        "type": "none",
        "created": "JAN 27 2021"
    },
    {
        "id": 5,
        "formId": "167-878071",
        "name": "New Jersey NJ-W4",
        "type": "none",
        "created": "JAN 27 2021"
    },
    {
        "id": 6,
        "formId": "167-168071",
        "name": "New export NJ-W4",
        "type": "none",
        "created": "JAN 27 2021"
    },
    {
        "id": 7,
        "formId": "167-65671",
        "name": "New Jersey NJ-W4",
        "type": "none",
        "created": "FEB 27 2022"
    },
    {
        "id": 8,
        "formId": "167-433071",
        "name": "New Jersey NJ-W4",
        "type": "none",
        "created": "FEB 27 2024"
    },
    {
        "id": 9,
        "formId": "167-433071",
        "name": "New Jersey NJ-W4",
        "type": "none",
        "created": "FEB 27 2024"
    },
    {
        "id": 10,
        "formId": "167-433071",
        "name": "New Jersey NJ-W4",
        "type": "none",
        "created": "FEB 27 2024"
    },
    {
        "id": 11,
        "formId": "167-433071",
        "name": "New Jersey NJ-W4",
        "type": "none",
        "created": "FEB 27 2024"
    },
    {
        "id": 12,
        "formId": "167-433071",
        "name": "New Jersey NJ-W4",
        "created": "FEB 27 2024"
    },
    {
        "id": 13,
        "formId": "167-433071",
        "name": "New Jersey NJ-W4",
        "type": "none",
        "created": "FEB 27 2024"
    },
    {
        "id": 14,
        "formId": "167-433071",
        "name": "New Jersey NJ-W4",
        "type": "none",
        "created": "FEB 27 2024"
    },
    {
        "id": 15,
        "formId": "167-433071",
        "name": "New Jersey NJ-W4",
        "type": "none",
        "created": "FEB 27 2024"
    },
    {
        "id": 16,
        "formId": "167-433071",
        "name": "New Jersey NJ-W4",
        "type": "none",
        "created": "FEB 27 2024"
    }]
const roleOptions = [
    { value: "This Month", label: "This Month" },
    { value: "Today", label: "Today" },
    { value: "Yesterday", label: "Yesterday" },
    { value: "Week", label: "Week" },
    { value: "Last Month", label: "Last Month" },
]
const NotesTable = () => {
    const [filterdata, setfilterdata] = useState({})

    return (
        <div className='email-user-list'>
            <div className="d-flex align-content-center justify-content-between w-100">
                <Select
                    theme={selectThemeColors}
                    isClearable={false}
                    className="react-select"
                    classNamePrefix="select"
                    options={roleOptions}
                    value={filterdata?.filterdata}
                    onChange={(data) => {
                        setfilterdata((p) => ({ ...p, filterdata: data }))
                    }}
                />
            </div>
            <Card className="overflow-hidden">
            <div className="react-dataTable" style={{ height: 'auto', maxHeight: "100%"}}>
                    <DataTable
                        className="react-dataTable"
                        noHeader
                        pagination
                        selectableRows
                        columns={basicColumns}
                        paginationPerPage={7}
                        sortIcon={<ChevronDown size={10} />}
                        data={data}
                    />
                </div>
            </Card>
        </div>
    )
}

export default NotesTable