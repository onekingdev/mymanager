import axios from 'axios'
import React, { useState } from 'react'
import { Edit, MoreVertical, Trash2 } from 'react-feather'
import {
    DropdownToggle,
    UncontrolledDropdown,
    DropdownItem,
    DropdownMenu,
    Input
} from 'reactstrap'
import { toast } from 'react-toastify'
import { putMemberTagRQ, useGetMemberTag } from '../../../../requests/contacts/member-contacts'


const TagTableRow = ({ tagId, tag, i, setDeleteModal, refetch }) => {

    // get member tag data from db
    const { data: tags } = useGetMemberTag()

    // Edit tag Data

    // toggle member tag input field and member tag title
    const [editTag, setEditTag] = useState(false)


    // handle edit member tag
    const handleEditTag = (e) => {
        e.preventDefault()

        const tagName = e.target.tag.value
        const payload = { tag: tagName }

        const isTagExist = tags.find((p) => p.tag.toLowerCase() === tagName.toLowerCase())

        if (isTagExist) {
            // toggle member tag input field
            setEditTag(!editTag)
            return toast.error("This tag already exists")
        }

        else if (tagName.toLowerCase() === "owner" || tagName.toLowerCase() === "assistant" || tagName.toLowerCase() === "billing") {
            setEditTag(!editTag)
            return toast.error('This tag already exists')
        }

        else if (!tagId) {
            setEditTag(!editTag)
            return toast.warning("It's a default tag. You can't edit this")
        }

        else {
            setEditTag(!editTag)

            // pass id and edited value to db
            putMemberTagRQ(tagId, payload)

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
                    editTag ?
                        <form onSubmit={handleEditTag}>
                            <Input
                                bsSize="sm"
                                id="tag"
                                name="tag"
                                placeholder={tag}
                            />
                        </form>
                        :
                        <span>{tag}</span>
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
                            onClick={() => setEditTag(!editTag)}
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
                                    id: tagId,
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

export default TagTableRow