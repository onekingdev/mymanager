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
import IncomeChart from './../../../../../business/statistics/chart/IncomeProgramChart';
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
import { convertDate } from '../../../../../goals/helpers/converters'


const OverviewTab = ({selectedOrg}) => {
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
            stats={`${selectedOrg?.locations.length} `}
            statTitle="Locations"
          />
        </Col>
        <Col lg="6" sm="6">
          <StatsHorizontal
            icon={<Users size={21} />}
            color="primary"
            stats={selectedOrg?.users?.length}
            statTitle="Users"
          />
        </Col>
        {/* Stats With Icons Horizontal */}
      </Row>
      
      <div>
        <IncomeChart/>
      </div>
     </div>
    </Fragment>
  )
}

export default OverviewTab
