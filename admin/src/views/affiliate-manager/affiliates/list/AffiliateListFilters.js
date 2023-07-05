import "@styles/react/apps/app-users.scss";
import "@styles/react/libs/react-select/_react-select.scss";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Label,
  Row,
} from "reactstrap";
import { Fragment, useState } from "react";

import Select from "react-select";
import { affiliateStatus } from "../../../../utility/affiliateUtils";
import { selectThemeColors } from "@utils";

const AffiliateListFilters = () => {
  const [commissionFilter, setCommissionFilter] = useState("");
  const [currentStatus, setCurrentStatus] = useState(affiliateStatus[0].value);

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Filters</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4">
              <Label for="role-select">Affiliate Commission Plan</Label>
              <Select
                isClearable={true}
                value={commissionFilter}
                options={[]}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
                onChange={(data) => {
                  setCommissionFilter(data);
                }}
              />
            </Col>
            <Col md="4">
              <Label for="status-select">Affiliate Status</Label>
              <Select
                theme={selectThemeColors}
                isClearable={true}
                className="react-select"
                classNamePrefix="select"
                options={affiliateStatus}
                value={currentStatus}
                onChange={(data) => {
                  setCurrentStatus(data);
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default AffiliateListFilters;
