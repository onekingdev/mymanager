// ** React Imports
import { Fragment, useContext } from 'react'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Utils
import { kFormatter } from '@utils'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

// ** Custom Components

import StatsVertical from '@components/widgets/stats/StatsVertical'

import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Icons Imports
import {
  Heart,
  Award,
  Truck,
  Activity,
  ShoppingBag,
  AlertOctagon,
  Users
} from 'react-feather'


const OverviewTab = () => {
  // ** Context
  const context = useContext(ThemeColors)

  return (
    <Fragment>
     <div className='w-100'>
     <Row>
        {/* Stats With Icons Horizontal */}

        <Col lg="6" sm="6">
          <StatsHorizontal
            icon={<Activity size={21} />}
            color="danger"
            stats="0 Days"
            statTitle="Last Contact"
          />
        </Col>
        <Col lg="6" sm="6">
          <StatsHorizontal
            icon={<Users size={21} />}
            color="primary"
            stats="0"
            statTitle="Users"
          />
        </Col>
        {/* Stats With Icons Horizontal */}
      </Row>
      <Row>
        {/* Stats With Icons */}

        <Col xl="3" md="4" sm="6">
          <StatsVertical
            icon={<ShoppingBag size={21} />}
            color="danger"
            stats="0"
            statTitle="Stores"
          />
        </Col>
        <Col xl="3" md="4" sm="6">
          <StatsVertical
            icon={<Heart size={21} />}
            color="primary"
            stats="0"
            statTitle="Ratings"
          />
        </Col>
        <Col xl="3" md="4" sm="6">
          <StatsVertical
            icon={<Award size={21} />}
            color="success"
            stats="0"
            statTitle="Certificates"
          />
        </Col>
        <Col xl="3" md="4" sm="6">
          <StatsVertical
            icon={<Truck size={21} />}
            color="danger"
            stats="0"
            statTitle="Contracts"
          />
        </Col>
        {/* Stats With Icons */}
      </Row>
      <Row>
        <Col lg="6" sm="6">
          {/* <StatsCard cols={{ md: '6', sm: '6', xs: '12' }} /> */}
        </Col>
        <Col lg="6" sm="6">
          {/* <Employeestatus cols={{ md: '6', sm: '6', xs: '12' }} /> */}
        </Col>
        <Col lg="6" sm="6" className='mt-1'>
          {/* <Others /> */}
        </Col>
      </Row>
     </div>
    </Fragment>
  )
}

export default OverviewTab
