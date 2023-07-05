// ** React Imports
import { useState, Fragment, useRef } from 'react'

// ** Reactstrap Imports
import {
    Row,
    Col,
    Card,
    Form,
    CardBody,
    Button,
    Badge,
    Modal,
    Input,
    Label,
    ModalBody,
    ModalHeader
} from 'reactstrap'

// ** moment
import moment from 'moment'

// ** Icons
import { FiEdit2, FiEye } from 'react-icons/fi'

// ** Custom Components
import Avatar from '@components/avatar'


// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { formatDateToMonthShort } from '../../../../../utility/Utils'
import { convertDate } from '../../../../goals/helpers/converters'
import { Copy } from 'react-feather'
import { toast } from 'react-toastify'


// const MySwal = withReactContent(Swal)

const OrgInfoCard = ({ selectedOrg }) => {
    // ** State
   
    // const [picker, setPicker] = useState(new Date())

    // ** Hook


    const photoRef = useRef()
    function onChoosePhoto() {
        photoRef?.current?.click()
    }

    const handleCopyPath =()=>{
        navigator.clipboard.writeText(`https://${selectedOrg?.path}.mymanager.com/register`);
        toast.success("Copied!")
    }

    // ** render user img
    const renderUserImg = () => {
        const stateNum = Math.floor(Math.random() * 6),
        states = [
            'light-success',
            'light-danger',
            'light-warning',
            'light-info',
            'light-primary',
            'light-secondary'
        ],
        color = states[stateNum]
    return (
        <>
        {selectedOrg?.logoLink ? <>
        <img src={selectedOrg?.logoLink} style={{width:"100px"}}/>
        </>:(<Avatar
            onClick={onChoosePhoto}
            initials
            color={color}
            className="rounded mt-3 mb-2 cursor-pointer"
            content={selectedOrg?.name}
            contentStyles={{
                borderRadius: 0,
                fontSize: 'calc(48px)',
                width: '100%',
                height: '100%'
            }}
            style={{
                height: '110px',
                width: '110px'
            }}
        />)}
        </>
    )
    }
    


    return (
        <Fragment>
            {/* upload photo */}
            <input
                type="file"
                // onChange={(e) => {
                //     uploadPhoto({
                //         file: e.target.files[0],
                //         id: selectedOrg?._id
                //     })
                // }}
                hidden
                ref={photoRef}
            />

            <Card>
                <CardBody>
                    <div className="user-avatar-section">
                        <div className="d-flex align-items-center flex-column">
                            {renderUserImg()}
                            <div className="d-flex flex-column align-items-center text-center">
                                <div className="user-info">
                                    <h4 className="text-center">
                                        {selectedOrg !== null
                                            ? selectedOrg.name
                                            : 'Eleanor Aguilar'}
                                    </h4>
                                    <div>
                                        {/* <span className="fw-bolder me-25">Status :</span> */}
                                        {selectedOrg !== null ? (
                                            <>
                                                <Badge
                                                   color={selectedOrg?.isVerified?'light-success':'light-danger'}
                                                    className="text-capitalize me-1"
                                                >
                                                    {selectedOrg?.isVerified?'Verified':'Not Verified'}
                                                </Badge>
                                                {
                                                    selectedOrg?.isDeleted && <Badge
                                                    className="text-capitalize"
                                                    color='light-secondary'
                                                >
                                                    Archived
                                                </Badge>
                                                }
                                            </>
                                        ) : null}
                                    </div>
                                    <div className='d-flex justify-content-center mt-50'>
                                            <Badge color='primary' style={{cursor:"pointer"}} onClick={handleCopyPath}>
                                            <span>
                                        {selectedOrg?.path && (
                                            <>
                                               
                                                /{selectedOrg?.path}/signup
                                            </>
                                        )}
                                    </span>
                                    <Copy className='ms-50' />
                                            </Badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-2"></div>
                    <h4 className="fw-bolder border-bottom pb-50 mb-1">
                        Organization Info
                    </h4>
                    <div className="info-container mb-3">
                        {selectedOrg !== null ? (
                            <ul className="list-unstyled">
                                <li className="mb-75">
                                    <span className="fw-bolder me-25">
                                        Contact:
                                    </span>
                                    <span>{selectedOrg?.contact}</span>
                                </li>
                                <li className="mb-75">
                                    <span className="fw-bolder me-25">
                                        Email:
                                    </span>
                                    <span>{selectedOrg?.email}</span>
                                </li>
                                <li className="mb-75">
                                    <span className="fw-bolder me-25">
                                        Address:
                                    </span>
                                    <span>
                                        {selectedOrg?.address && (
                                            <>
                                               
                                                {selectedOrg?.address}
                                            </>
                                        )}
                                    </span>
                                </li>
                               
                                <li className="mb-75">
                                    <span className="fw-bolder me-25">
                                        Start Date:
                                    </span>
                                    <span>
                       {convertDate(selectedOrg.createdAt)} {formatDateToMonthShort(selectedOrg.createdAt)}
                                    </span>
                                </li>
                            </ul>
                        ) : null}
                    </div>

                    {/* <div className="d-flex justify-content-center pt-2">
                        <Button color="primary" >
                            Edit
                        </Button>
                        <Button
                            className="ms-1"
                            color="primary"
                            outline
                            
                        >
                            Details
                        </Button>
                    </div> */}
                </CardBody>
            </Card>

           
        </Fragment>
    )
}

export default OrgInfoCard
