import axios from 'axios'
import React, { useState } from 'react'
import { Edit, MoreVertical, Trash2 } from 'react-feather'
// import { putClientPositionRQ, useGetClientPosition } from '../../../../requests/contacts/client-contacts'
import {
    DropdownToggle,
    UncontrolledDropdown,
    DropdownItem,
    DropdownMenu,
    Input
} from 'reactstrap'
import { toast } from 'react-toastify'


const PositionTableRow = ({ positionId, position, i, setDeleteModal, refetch }) => {

    // get client position data from db
    const { data: positions } = useGetClientPosition()

    // Edit position Data

    // toggle client position input field and client position title
    const [editPosition, setEditPosition] = useState(false)


    // handle edit client position
    const handleEditPosition = (e) => {
        e.preventDefault()

        const positionName = e.target.position.value
        const payload = { position: positionName }

        const isPositionExist = positions.find((p) => p.position.toLowerCase() === positionName.toLowerCase())

        if (isPositionExist) {
            // toggle client position input field
            setEditPosition(!editPosition)
            return toast.error("This position already exists")
        }

        else if (positionName.toLowerCase() === "owner" || positionName.toLowerCase() === "assistant" || positionName.toLowerCase() === "billing") {
            setEditPosition(!editPosition)
            return toast.error('This position already exists')
        }

        else if (!positionId) {
            setEditPosition(!editPosition)
            return toast.warning("It's a default position. You can't edit this")
        }

        else {
            setEditPosition(!editPosition)

            // pass id and edited value to db
            putClientPositionRQ(positionId, payload)

            // refetch data
            setTimeout(() => {
                refetch()
            }, 100)
        }
    }

    return (
        <tr>
            <th scope="row">
                {i + 1}
            </th>
            <td>
                {
                    editPosition ?
                        <form onSubmit={handleEditPosition}>
                            <Input
                                bsSize="sm"
                                id="position"
                                name="position"
                                placeholder={position}
                            />
                        </form>
                        :
                        <span>{position}</span>
                }

            </td>
            <td className='d-flex gap-2'>

                <UncontrolledDropdown>
                    <DropdownToggle tag="div" className="btn btn-sm">
                        <MoreVertical
                            size={14}
                            className="cursor-pointer"
                        />
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem
                            onClick={() => setEditPosition(!editPosition)}
                            className="w-100"
                        >
                            <Edit size={14} className="me-50" />
                            <span
                                className="align-middle">Edit</span>
                        </DropdownItem>

                        <DropdownItem
                            className="w-100"
                            onClick={(e) => {
                                setDeleteModal({
                                    id: positionId,
                                    show: true
                                })
                            }}
                        >
                            <Trash2 size={14} className="me-50" />
                            <span className="align-middle">Delete</span>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </td>
        </tr>
    )
}

export default PositionTableRow