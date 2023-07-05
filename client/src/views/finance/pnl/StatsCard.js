// ** Third Party Components
import classnames from 'classnames';
import { TrendingUp, User, Box, DollarSign } from 'react-feather';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap';

const StatsCard = ({ lastTotal, kTotal, kPast, kOngoing }) => {
  const data = [
    {
      title: `${kTotal}k`,
      subtitle: 'This Month',
      color: 'light-primary',
      icon: <TrendingUp size={24} />
    },
    {
      title: `${kOngoing}k`,
      subtitle: 'Ongoing',
      color: 'light-info',
      icon: <User size={24} />
    },
    {
      title: `${kPast}k`,
      subtitle: 'One Time',
      color: 'light-danger',
      icon: <Box size={24} />
    },
    {
      title: `$${lastTotal}`,
      subtitle: 'Last Month',
      color: 'light-success',
      icon: <DollarSign size={24} />
    }
  ];

  const renderData = () => {
    return data.map((item, index) => {
      
      return (
        <Col
          key={index}
          xl="3" sm="6"
          className="mb-2"
        >
          <div className="d-flex align-items-center">
            <Avatar color={item.color} icon={item.icon} className="me-2" />
            <div className="my-auto">
              <h4 className="fw-bolder mb-0">{item.title}</h4>
              <CardText className="font-small-3 mb-0">{item.subtitle}</CardText>
            </div>
          </div>
        </Col>
      );
    });
  };

  return (
    <Card className="card-statistics">
      <CardHeader>
        <CardTitle tag="h4">Statistics</CardTitle>
        <CardText className="card-text font-small-2 me-25 mb-0">Updated 1 month ago</CardText>
      </CardHeader>
      <CardBody className="statistics-body">
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  );
};

export default StatsCard;
