import { Col, Row } from "reactstrap";
import { Fragment, useEffect, useState } from "react";

import PlanCard from "./PlanCard";
import ReferralPerMonthChart from "./RPMChart";
import StatsCard from "./StatsCard";
import StatsVertical from "@components/widgets/stats/StatsVertical";
import { Users } from "react-feather";
import { subscriptionPackageColors } from "../../../../../../utility/affiliateUtils";
import { subscriptionPackagesData } from "./data";

const OverviewTab = () => {
  const [subscriptionPackages, setSubscriptionPackages] = useState([]);

  useEffect(() => {
    setSubscriptionPackages(subscriptionPackagesData);
  }, []);

  return (
    <Fragment>
      <Row>
        <Col lg="12" sm="12">
          <StatsCard cols={{ md: "3", sm: "6", xs: "12" }} />
        </Col>
      </Row>
      <Row>
        {subscriptionPackages.map((pkg) => {
          return (
            <Col xl="4" md="6" sm="12">
              <StatsVertical
                icon={<Users size={21} />}
                color={subscriptionPackageColors[pkg.name]}
                stats={pkg.references}
                statTitle={pkg.name}
              />
            </Col>
          );
        })}
      </Row>
      <Row className="justify-content-md-center">
        <Col lg="8" sm="12">
          <PlanCard />
        </Col>
      </Row>
      <Row>
        <Col sm="12">
          <ReferralPerMonthChart />
        </Col>
      </Row>
    </Fragment>
  );
};

export default OverviewTab;
