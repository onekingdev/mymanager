import { Fragment, useState } from 'react';

import { Card, CardBody, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';

import { Columns, UserPlus, FileText } from 'react-feather';

import StatsHorizontal from '@components/widgets/stats/StatsHorizontal';

import '@src/assets/styles/workspace-about.scss';

const About = (props) => {
  const { store, selectedWorkspace, isOpen, setIsOpen } = props;

  const cancleBtnClicked = () => {
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} toggle={() => cancleBtnClicked()} className="modal-dialog-centered">
      <ModalHeader toggle={() => cancleBtnClicked()}>About this workspace</ModalHeader>
      <ModalBody>
        <Fragment>
          <Row>
            <Col xs="12">
              <Card>
                <CardBody className="total-info">
                  <div className="title">{selectedWorkspace.title}</div>
                  <div className="created-at">
                    {`${new Date(selectedWorkspace.createdAt)
                      .toLocaleDateString()
                      .replace(/\//g, '.')} - ${new Date()
                      .toLocaleDateString()
                      .replace(/\//g, '.')}`}
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Row>
                <Col>
                  <StatsHorizontal
                    color="primary"
                    statTitle="Boards"
                    icon={<Columns size={20} />}
                    renderStats={<h3 className="fw-bolder mb-75">{store.boards.length}</h3>}
                  />
                  {/* <Card>
                    <CardBody className="other-info">
                      <div className="info">
                        <div className="count-num">{store.boards.length}</div>
                        <div className="info-title">Boards</div>
                      </div>
                      <div className="own-icon">
                        <Columns size={'20px'} />
                      </div>
                    </CardBody>
                  </Card> */}
                </Col>
                <Col>
                  <StatsHorizontal
                    color="danger"
                    statTitle="Tasks"
                    icon={<FileText size={20} />}
                    renderStats={<h3 className="fw-bolder mb-75">{store.tasks.length}</h3>}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <StatsHorizontal
                    color="warning"
                    statTitle="Assignees"
                    icon={<UserPlus size={20} />}
                    renderStats={
                      <h3 className="fw-bolder mb-75">
                        {selectedWorkspace.collaborators?.length || 0}
                      </h3>
                    }
                  />
                </Col>
                <Col>
                  {/* <StatsHorizontal
                    color="info"
                    statTitle="Boards"
                    icon={<Columns size={20} />}
                    renderStats={<h3 className="fw-bolder mb-75">{store.boards.length}</h3>}
                  /> */}
                </Col>
              </Row>
            </Col>
          </Row>
        </Fragment>
      </ModalBody>
    </Modal>
  );
};

export default About;
