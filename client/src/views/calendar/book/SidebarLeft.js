/* eslint-disable no-unused-vars */
// ** React Imports
import { Link, useParams } from 'react-router-dom';
// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
// ** Reactstrap Imports

import { Button, ListGroup, ListGroupItem, Badge, CardBody } from 'reactstrap'
import { useState, useEffect } from 'react';
import { weekBookingCount, monthBookingCount, nextMonthBookingCount } from './store'
import { useSelector } from 'react-redux'
import '../../../assets/scss/style.css';
import { getUserData } from '../../../auth/utils';

const SidebarLeft = (props) => {

    const {
        viewBooking,
        setViewBooking,
        handleSidebarOpen,
        toggleSidebar,
        dispatch
    } = props;

    const store = useSelector((state) => state.book)

    const user = getUserData()
    const [active, setactive] = useState('THIS MONTH');
    // ** Props
    const handleActiveItem = (value) => {
        if (active === value) {
            return true;
        } else {
            return false;
        }
    };
    const handlechange = (value) => {
        setactive(value);
    };
    useEffect(() => {
        if(user){
            dispatch(weekBookingCount(user.id))
            dispatch(monthBookingCount(user.id))
            dispatch(nextMonthBookingCount(user.id))
        }
        
    }, [dispatch,user]);
    return (
        <div className={classnames('sidebar-left')}>
            <div className="sidebar" style={{height: "73.5vh"}}>
                <div className="sidebar-content email-app-sidebar">
                    <div className="email-app-menu">

                        <CardBody className="card-body">


                            <Link to="/">
                                <Button
                                    color="primary"
                                    block
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setViewBooking(!viewBooking)
                                    }}
                                >
                                    <span className="align-middle">View Bookings</span>
                                </Button>
                            </Link>
                        </CardBody>

                        <ListGroup tag="div" className="list-group-messages contact-sidebar mt-2">
                            <ListGroupItem
                                className="cursor-pointer"
                                action
                                active={handleActiveItem('This Week')}
                                onClick={() => {
                                    handlechange('This Week');
                                }}
                            >
                                <span className="align-middle">This Week</span>
                                <Badge className="float-end" color="light-primary" pill>
                                    {store.weekBookingCount}
                                </Badge>
                            </ListGroupItem>
                            <ListGroupItem
                                className="cursor-pointer"
                                action
                                active={handleActiveItem('THIS MONTH')}
                                onClick={() => {
                                    handlechange('THIS MONTH');
                                }}
                            >
                                <span className="align-middle">This Month</span>
                                <Badge className="float-end" color="light-primary" pill>
                                    {store.monthBookingCount}
                                </Badge>
                            </ListGroupItem>
                            <ListGroupItem
                                className="cursor-pointer"
                                action
                                active={handleActiveItem('NEXT MONTH')}
                                onClick={() => {
                                    handlechange('NEXT MONTH');
                                }}
                            >
                                <span className="align-middle">Next Month</span>
                                <Badge className="float-end" color="light-primary" pill>
                                    {store.nextMonthBookingCount}
                                </Badge>
                            </ListGroupItem>
                        </ListGroup>
                        <h6 className="section-label mt-3 mb-1 px-2">Status</h6>
                        <ListGroup tag="div" className="list-group-labels contact-sidebar-types">
                            <ListGroupItem
                                className="cursor-pointer"
                                active={handleActiveItem('important')}
                                action
                                onClick={() => {
                                    handlechange('important');
                                }}
                            >
                                <span className="bullet bullet-sm bullet-success me-1"></span>
                                Completed
                            </ListGroupItem>
                            <ListGroupItem
                                className="cursor-pointer"
                                active={handleActiveItem('private')}
                                onClick={() => {
                                    handlechange('private');
                                }}
                                action
                            >
                                <span className="bullet bullet-sm bullet-danger me-1"></span>
                                Scheduled
                            </ListGroupItem>
                        </ListGroup>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default SidebarLeft;
