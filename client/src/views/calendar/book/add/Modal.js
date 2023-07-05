// ** React Import
import React, { useEffect, useState } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Third Party Components
import Select from 'react-select'
import classnames from 'classnames'
import { useHistory  } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input, ModalHeader, ModalBody, FormGroup, ModalFooter, Modal } from 'reactstrap'

// ** Store & Actions
import { createBooking, updateBooking } from '../store'
import { useDispatch, useSelector } from 'react-redux'



const checkIsValid = data => {
    //return false
    return Object.values(data).every(field => (typeof field === 'object' ? field !== null : field.length > 0))
}

const ModalNewBooking = ({ open, toggleSidebar, duration, startDate, timezone, detailBooking }) => {
    // ** States
    const [data, setData] = useState(null)

    const history = useHistory ();
    // ** Store Vars
    const dispatch = useDispatch()
    const defaultValues = {
        name: '',
        email: '',
    }
    // ** Vars
    const {
        control,
        setValue,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues })

    const store = useSelector((state) => {

        //setBookingInfo(state.book)
        return state.book
    })
    useEffect(() => {
        setValue('name', detailBooking?detailBooking.name:'')
        setValue('email', detailBooking?detailBooking.email:'')
    }, [detailBooking])

    // ** Function to handle form submit
    const onSubmit = async(data) => {
        setData(data)
        if (checkIsValid(data)) {
            toggleSidebar()
            if(detailBooking && detailBooking._id) {
                const response = await (dispatch(
                    updateBooking({id: detailBooking._id, data: {
                        name: data.name,
                        email: data.email,
                        startDate: startDate,
                        duration: duration,
                        timezone: timezone,
                        bookingType: store.detailBookingType._id,
                        userId:store.detailBookingType.userId
                    }}))
                )
                history.push(`/book/confirm/${detailBooking._id}`)

            } else {
                dispatch(
                    createBooking({
                        name: data.name,
                        email: data.email,
                        startDate: startDate,
                        duration: duration,
                        timezone: timezone,
                        bookingType: store.detailBookingType._id,
                        userId:store.detailBookingType.userId
                    })
                ).then(response=>{
                    history.push(`/book/confirm/${response.payload.data._id}`)
                })
                

            }

        } else {
            for (const key in data) {
                if (data[key] === null) {
                    setError(key, {
                        type: 'manual'
                    })
                }
                if (data[key] !== null && data[key].length === 0) {
                    setError(key, {
                        type: 'manual'
                    })
                }
            }
        }
    }

    const handleSidebarClosed = () => {
        for (const key in defaultValues) {
            //setValue(key, '')
        }
    }

    return (

        <Modal isOpen={open} toggle={toggleSidebar} onClosed={handleSidebarClosed}>
            <ModalHeader toggle={toggleSidebar}>Schedule Booking</ModalHeader>

            <ModalBody>
                <Form >
                    <div className='mb-1'>
                        <Label className='form-label' for='name'>
                            Name <span className='text-danger'>*</span>
                        </Label>
                        <Controller
                            name='name'
                            control={control}
                            render={({ field }) => (
                                <Input id='name' placeholder='Booking Name' invalid={errors.name && true} {...field} />
                            )}
                        />
                    </div>



                    <div className='mb-1'>
                        <Label className='form-label' for='email'>
                            Email <span className='text-danger'>*</span>
                        </Label>
                        <Controller
                            name='email'
                            control={control}
                            render={({ field }) => (
                                <Input id='email' type="email" placeholder='Email' invalid={errors.email && true} {...field}/>
                            )}
                        />
                    </div>


                </Form>
            </ModalBody>
            <ModalFooter>
                <Button type='submit' className='me-1' color='primary' onClick={handleSubmit(onSubmit)}>
                    Schedule
                </Button>
                <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>

    )
}

export default ModalNewBooking
