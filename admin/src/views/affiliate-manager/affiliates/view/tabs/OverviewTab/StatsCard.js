import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import { useEffect, useState } from "react";

import Avatar from "@components/avatar";
import classnames from "classnames";
import { statsCardData } from "./data";
import { statsTiles } from "../../../../../../utility/affiliateUtils";

const StatsCard = ({ cols }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(statsCardData);
  }, []);

  return (
    <Card className="card-statistics">
      <CardHeader>
        <CardTitle tag="h4">Statistics</CardTitle>
        <CardText className="card-text font-small-2 me-25 mb-0">
          Updated 1 Sec ago
        </CardText>
      </CardHeader>
      <CardBody className="statistics-body">
        <Row>
          {statsTiles.map((tile, index) => {
            const colMargin = Object.keys(cols);
            const margin = index === 2 ? "sm" : colMargin[0];
            return (
              <Col
                key={index}
                {...cols}
                className={classnames({
                  [`mb-2 mb-${margin}-0`]: index !== data.length - 1,
                })}
              >
                <div className="d-flex align-items-center">
                  <Avatar
                    color={tile.color}
                    icon={tile.icon}
                    className="me-2"
                  />
                  <div className="my-auto">
                    <h4 className="fw-bolder mb-0">
                      {(tile.prefix || "") + statsCardData[index] ?? tile.title}
                    </h4>
                    <CardText className="font-small-3 mb-0">
                      {tile.subtitle}
                    </CardText>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </CardBody>
    </Card>
  );
};

export default StatsCard;
