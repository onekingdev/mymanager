import "@styles/react/apps/app-users.scss";

import { Col, Row } from "reactstrap";

import AffiliateInfoCard from "./AffiliateInfoCard";
import AffiliateTabs from "./AffiliateTabs";
import { useState } from "react";

const AffiliateViewPage = () => {
  const [activeTab, setActiveTab] = useState("1");
  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <AffiliateInfoCard />
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <AffiliateTabs active={activeTab} toggleTab={toggleTab} />
        </Col>
      </Row>
    </div>
  );
};

export default AffiliateViewPage;
