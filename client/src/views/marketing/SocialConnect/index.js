import React, { Fragment, useState, useEffect } from 'react';
import { PlusCircle, Trash } from 'react-feather';
import { Card, CardFooter, Col, Row } from 'reactstrap';

import { Link } from 'react-router-dom';

import Moment from 'react-moment';
import '../../../assets/styles/socialconnect.scss';
import { deleteOneWorkspace, workSpaceListAll } from '../../../requests/Planable';
import Swal from 'sweetalert2';

const SocialConnectMain = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await workSpaceListAll().then((response) => {
      // if (response.facebookData.length > 0) {
      // }
      setData(response);
    });
  };
  // const handledelete = async (id) => {
  //   await deleteOneWorkspace(id).then((response) => {
  //     fetchData();
  //   });
  // };

  const handledelete = async (id) => {
    await Swal.fire({
      title: 'Delete?',
      text: 'Are you sure you want to delete this workspace?',

      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete anyway',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteOneWorkspace(id).then(() => {
          fetchData();
        });
      }
    });
  };

  return (
    <>
      <Fragment>
        <span>
          <b>Your Workspaces</b>
        </span>
        <div
          className="mt-1"
          style={{ borderTop: '1px solid #b8c2cc', borderBottom: '1px solid #b8c2cc' }}
        >
          <Row className="mt-2">
            <Col sm={3} md={3} lg={3}>
              <Link to="/createworkspace">
                <Card className="cursor-pointer" style={{ height: '200px' }}>
                  <div className="d-flex justify-content-center align-items-center h-100 w-100">
                    <div>
                      <div className="d-flex justify-content-center mb-1">
                        <PlusCircle size={30} />
                      </div>
                      <div>
                        <span>Create New WorkSpace</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </Col>

            {data &&
              data?.map((value) => (
                <Col sm={3} md={3} lg={3}>
                  <div key={value?._id}>
                    <Card className="cursor-pointer p-1" style={{ height: '200px' }}>
                      <div className="d-flex align-items-center">
                        <Link to={`/socialview/${value?._id}`}>
                          {/* <div
                            className="d-flex justify-content-center align-items-center me-1"
                            style={{
                              borderRadius: '6px',
                              width: '40px',
                              height: '40px',
                              backgroundColor: '#e52a2a',
                              color: '#fff'
                            }}
                          >
                            <span style={{ fontSize: '20px' }}>
                              <b>T</b>
                            </span>
                          </div> */}
                          <span style={{ fontSize: '20px' }}>
                            {value?.facebookData.length ? (
                              <img
                                style={{ borderRadius: '8px' }}
                                width="40px"
                                src={value?.facebookData[0].profileImg}
                                alt=""
                              />
                            ) : null}
                            {value?.googleData.length ? (
                              <img
                                style={{ borderRadius: '8px' }}
                                width="40px"
                                src={value?.googleData[0].profileImg}
                                alt=""
                              />
                            ) : null}
                          </span>
                        </Link>
                        <Link className="mx-1" to={`/socialview/${value?._id}`}>
                          <div>
                            <b> {value?.workspacename.slice(0, 15)}</b>
                            <br />
                            <span>1 Pages</span>
                          </div>
                        </Link>
                        <div className="delete_work deletespace">
                          <Trash
                            fontSize={8}
                            className="trashcutomemain"
                            color="red"
                            onClick={() => {
                              handledelete(value._id);
                            }}
                          />
                        </div>
                      </div>
                      <Link to={`/socialview/${value?._id}`}>
                        <CardFooter
                          className="mt-3"
                          onClick={() => {
                            // handleid(value?._id);
                          }}
                        >
                          <Moment format="ll">{value?.createdAt}</Moment>
                        </CardFooter>
                      </Link>
                    </Card>
                  </div>
                </Col>
              ))}
          </Row>
        </div>
      </Fragment>
    </>
  );
};
export default SocialConnectMain;
