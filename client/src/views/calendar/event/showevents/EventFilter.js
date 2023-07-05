import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, Input, Button } from 'reactstrap';

function EventFilter({ searchTermEvent, setSearchTermEvent, serchEventName, filterEventType }) {
  const filterByMonth = [
    { value: 'Jan', label: 'January' },
    { value: 'Feb', label: 'February' },
    { value: 'Mar', label: 'March' },
    { value: 'Apr', label: 'April' },
    { value: 'May', label: 'May' },
    { value: 'Jun', label: 'June' },
    { value: 'Jul', label: 'July' },
    { value: 'Aug', label: 'August' },
    { value: 'Sep', label: 'September' },
    { value: 'Oct', label: 'October' },
    { value: 'Nov', label: 'November' },
    { value: 'Dec', label: 'December' }
  ];

  const filterByYear = [
    { value: '2023', label: '2023' },
    { value: '2024', label: '2024' },
    { value: '2025', label: '2025' },
    { value: '2026', label: '2026' },
    { value: '2027', label: '2027' },
    { value: '2028', label: '2028' },
    { value: '2029', label: '2029' },
    { value: '2030', label: '2030' },
    { value: '2031', label: '2031' },
    { value: '2032', label: '2032' },
    { value: '2033', label: '2033' }
  ];

  const filterTypes = [
    { value: 'all', label: 'All' },
    { value: 'past', label: 'Past' },
    { value: 'active', label: 'Active' }
  ];

  return (
    <Row>
      <Col>
        <Card>
          <CardBody>
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
                <div className="me-1">
                  <Input
                    id="search-invoice"
                    placeholder="Search "
                    className="w-100"
                    type="text"
                    value={searchTermEvent}
                    onChange={(e) => setSearchTermEvent(e.target.value)}
                    onKeyPress={serchEventName}
                  />
                </div>
                <div className="me-1">
                  <Input
                    type="select"
                    name="categoryId"
                    id="categoryIdInSearch"
                    style={{ width: '10em' }}
                    onChange={filterEventType}
                  >
                    {filterByMonth?.map((item, key) => {
                      return (
                        <option key={key} value={item.value}>
                          {' '}
                          &nbsp; {item.label}
                        </option>
                      );
                    })}
                  </Input>
                </div>
                <div className="me-1">
                  <Input
                    type="select"
                    name="categoryId"
                    id="categoryIdInSearch"
                    style={{ width: '10em' }}
                    onChange={filterEventType}
                  >
                    {filterByYear?.map((item, key) => {
                      return (
                        <option key={key} value={item.value}>
                          {' '}
                          &nbsp; {item.label}
                        </option>
                      );
                    })}
                  </Input>
                </div>

                <div className="me-1">
                  <Input
                    type="select"
                    name="categoryId"
                    id="categoryIdInSearch"
                    style={{ width: '10em' }}
                    onChange={filterEventType}
                  >
                    {filterTypes?.map((item, key) => {
                      return (
                        <option key={key} value={item.value}>
                          {' '}
                          &nbsp; {item.label}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </div>
              <div>
                <Link to="/add-event">
                  <Button color="primary">Add New Event</Button>
                </Link>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default EventFilter;
