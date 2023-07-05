// ** React Imports
import React, { Fragment, useState, useContext, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

// ** Reactstrap Imports
import { Row, Col, Card, CardBody, Input, Button, Label, NavLink } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import moment from 'moment'

// ** Component Imports

// ** Icons Imports
import {AiOutlineCalendar } from 'react-icons/ai'
import {FaCircle } from 'react-icons/fa'
import { TbWorld } from 'react-icons/tb'

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/apps/app-calendar.scss'
import { useDispatch, useSelector } from 'react-redux'

// ** Events Actions Import
import { getBookingDetail, getBookingType, getBookingTypeDetail } from '../store'


const MySwal = withReactContent(Swal)


const ConfirmBooking = () => {
    const  { updateLink } = useParams()


    // ** Store vars
    const dispatch = useDispatch()



    const formatLocaleTime = (date, timezone, duration) => {
        var diff = 0
        if(timezone) {
            let originDate = new Date(date.toLocaleString('en-US', {
                timeZone: timezone
            }))
            diff = originDate.getTime() - date.getTime()

        }
        let originDate = new Date(date.getTime() + diff)

        let newDate = originDate.getTime() + duration * 60000

        return moment(originDate).format('LT') + " - " + moment(new Date(newDate)).format('LT') + ", " +
            moment(originDate).format('dddd') + " " + moment(date).format('LL')
    }
    const { userData } = useSelector((state) => state.auth)

    const store = useSelector((state) => {

        //setBookingInfo(state.book)
        return state.book
    })
    useEffect(async () => {
        dispatch(getBookingDetail(updateLink))
    }, [dispatch])


    return (
        <Fragment>
            <div className='app-booking-container'>
                <div className='app-booking'>
                    <h2 className='mt-2 brand-text mb-0 text-center'>Confirmed</h2>
                    <p className='w-100 text-center p-1'>You are scheduled with {userData && userData?.fullName}</p>
                    <div className=' w-100 d-flex justify-content-center'>
                        <div className='border-top border-bottom'>
                            <div className='py-1'>

                                <div className='mt-1 d-flex'>
                                    <FaCircle className="font-medium-3 me-50 text-warning" />
                                    <h4 className='form-check-label fw-bolder'>
                                        {store.detailBooking.name}
                                    </h4>
                                </div>


                                {store.detailBooking && store.detailBooking._id? (
                                    <div>
                                        <div className='mt-1'>
                                            <AiOutlineCalendar className="font-medium-3 me-50" />
                                            <span className="fw-bold">{formatLocaleTime(new Date(store.detailBooking.startDate), store.detailBooking.timezone, store.detailBookingType.duration)}</span>
                                        </div>

                                    </div>


                                ): null}

                                <div className='mt-1'>
                                    <TbWorld className="font-medium-3 me-50" />
                                    <span className="fw-bold">{store.detailBooking.timezone? store.detailBooking.timezone: Intl.DateTimeFormat().resolvedOptions().timeZone}</span>
                                </div>


                                <h6 className='mt-1'>A calendar invitation has been sent to your email address.</h6>

                                <div className='mt-1'>

                                    <Link
                                        to={`/book/update/${updateLink}`}
                                        className='role-edit-modal'

                                    >
                                        <small className='fw-bolder me-1 link-danger'>Reschedule or cancel</small>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>




                </div>

            </div>


        </Fragment>
    )
}
export default ConfirmBooking
