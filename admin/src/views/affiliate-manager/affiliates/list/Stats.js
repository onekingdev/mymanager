import "@styles/react/apps/app-users.scss";

import { Col, Row } from "reactstrap";
import { DollarSign, Send, User, UserPlus } from "react-feather";

import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

const Stats = ({ statsData }) => {
  return (
    <Row>
      <Col lg="3" sm="6">
        <StatsHorizontal
          color="primary"
          statTitle="Active Affiliates"
          icon={<User size={20} />}
          renderStats={
            <h3 className="fw-bolder mb-75">{statsData.activeAffiliates}</h3>
          }
        />
      </Col>
      <Col lg="3" sm="6">
        <StatsHorizontal
          color="success"
          statTitle="Affiliates Earnings"
          icon={<DollarSign size={20} />}
          renderStats={
            <h3 className="fw-bolder mb-75">
              ${statsData.affiliatesEarnings.toLocaleString()}
            </h3>
          }
        />
      </Col>
      <Col lg="3" sm="6">
        <StatsHorizontal
          color="danger"
          statTitle="Affiliate Requests"
          icon={<UserPlus size={20} />}
          renderStats={
            <h3 className="fw-bolder mb-75">{statsData.affiliateRequests}</h3>
          }
        />
      </Col>
      <Col lg="3" sm="6">
        <StatsHorizontal
          color="warning"
          statTitle="Total Commissions Paid"
          icon={<Send size={20} />}
          renderStats={
            <h3 className="fw-bolder mb-75">
              ${statsData.totalCommissionPaid.toLocaleString()}
            </h3>
          }
        />
      </Col>
    </Row>
  );
};

export default Stats;
