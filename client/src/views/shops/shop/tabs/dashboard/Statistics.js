// ** React Imports
import { Fragment, useContext } from 'react';

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors';

// ** Reactstrap Imports
import { Row, Col, Card, CardImg } from 'reactstrap';

// ** Demo Components
import Earnings from '@src/views/ui-elements/cards/analytics/Earnings';
import CardMedal from '@src/views/ui-elements/cards/advance/CardMedal';
import StatsCard from '@src/views/ui-elements/cards/statistics/StatsCard';
import RevenueReport from '@src/views/ui-elements/cards/analytics/RevenueReport';
import OrdersBarChart from '@src/views/ui-elements/cards/statistics/OrdersBarChart';
import ProfitLineChart from '@src/views/ui-elements/cards/statistics/ProfitLineChart';

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss';
import '@styles/base/pages/dashboard-ecommerce.scss';
import { Link } from 'react-router-dom';
import { Eye } from 'react-feather';

const Statistics = ({ dispatch, store }) => {
  // ** Context
  const { colors } = useContext(ThemeColors);

  return (
    <Fragment>
      <div id="user-profile">
        {/* <Card className="profile-header ">
          <CardImg src={store?.shop?.bannerUrl} alt="User Profile Image" top />
          <div className="position-absolute" style={{ bottom: '50px' }}>
            <div className="profile-img-container d-flex align-items-center">
              <div className="profile-img">
                <img className="rounded img-fluid" src={store?.shop?.logoUrl} alt="Card image" />
              </div>
              <div className="profile-title ms-3">
                <div className="d-flex justify-content-start">
                  <h2 className="text-white">{store?.shop?.name}</h2>
                  <Link to="/shop/backyard-burgers" className="my-auto">
                    <Eye size={20} className="ms-1" />
                  </Link>
                </div>
                <p className="text-white">{store?.shop?.description}</p>
              </div>
            </div>
          </div>
        </Card> */}
        <div id="dashboard-ecommerce">
          <Row className="match-height">
            <Col xl="4" md="6" xs="12">
              <CardMedal />
            </Col>
            <Col xl="8" md="6" xs="12">
              <StatsCard cols={{ xl: '3', sm: '6' }} />
            </Col>
          </Row>
          <Row className="match-height">
            <Col lg="4" md="12">
              <Row className="match-height">
                <Col lg="6" md="3" xs="6">
                  <OrdersBarChart warning={colors.warning.main} />
                </Col>
                <Col lg="6" md="3" xs="6">
                  <ProfitLineChart info={colors.info.main} />
                </Col>
                <Col lg="12" md="6" xs="12">
                  <Earnings success={colors.success.main} />
                </Col>
              </Row>
            </Col>
            <Col lg="8" md="12">
              <RevenueReport primary={colors.primary.main} warning={colors.warning.main} />
            </Col>
          </Row>
        </div>
      </div>
    </Fragment>
  );
};

export default Statistics;
