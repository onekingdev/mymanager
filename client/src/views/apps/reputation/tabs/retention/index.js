import { Button, Row, Col, Input, CardImg, Card, InputGroup, InputGroupText } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import { MdOutlineAddReaction } from 'react-icons/md';
import axios from 'axios';
import Moment from 'moment';

function AllReviews({ pageName, groupImage, pageAccessToken }) {
  const xxll = window.innerWidth >= 1664 ? '2' : '12';
  const image = localStorage.getItem('facebookimage');
  const [replyText, setReplyText] = useState('');
  const [pagesData, setPagesData] = useState([]);
  const [pageReload, setPageReload] = useState(false);
  useEffect(() => {
    axios
      .get(
        `https://graph.facebook.com/me/posts?access_token=${pageAccessToken}&fields=id,message,created_time,comments{from,message,created_time,comments{from,message,created_time}}`
      )
      .then((response) => {
        setPagesData(response.data.data);
        setPageReload(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [pageAccessToken, pageReload === true]);

  const handleReplySubmit = (commentId) => {
    axios
      .post(
        `https://graph.facebook.com/v16.0/${commentId}/comments?message=${replyText}&access_token=${pageAccessToken}&parent_comment_id=${commentId}`
      )
      .then((res) => {
        setReplyText('');
        setPageReload(true);
      })
      .catch((err) => {
        console.error('Error posting reply:', err);
      });
  };

  return (
    <>
      <div>
        {pagesData.map((ele) => {
          return (
            <div>
              <Card className="p-1 w-100 mb-1">
                <div className="d-flex justify-content-between align-items-center w-100">
                  <div className="d-flex align-items-center">
                    <CardImg
                      variant="rounded"
                      src={groupImage}
                      style={{
                        height: 50,
                        width: 50
                      }}
                    />
                    <div style={{ marginLeft: '15px' }}>
                      <h5 className="mb-0">{pageName}</h5>
                      <small className="mt-0">
                        Left a review on <b>Facebook</b>
                      </small>
                    </div>
                  </div>
                </div>
                <div className="m-1">
                  <h3 className="text-center text-bold">{ele?.message}</h3>
                </div>
                <div>
                  <ul className="unstyled-list list-inline">
                    <b> Comments :- </b>

                    {ele?.comments?.data?.map((comment, i) => (
                      <ul>
                        <li className="ratings-list-item me-25">
                          <b>Comment - </b> {comment?.message}
                          <br /> <b>PostBy - </b> {comment?.from?.name}{' '}
                          <b>
                            {' '}
                            <br /> Time -{' '}
                          </b>
                          {Moment(comment?.created_time).format('YYYY-MM-DD h:mm:ss')}
                        </li>
                        <hr />
                      </ul>
                    ))}
                    <li className="ratings-list-item me-25"></li>
                  </ul>
                </div>
                <div>
                  <Row>
                    <Col xxl="1" xs="2">
                      <CardImg
                        variant="rounded"
                        src={image}
                        style={{
                          height: 40,
                          width: 40
                        }}
                      />
                    </Col>
                    <Col xxl="9" xs="10">
                      {' '}
                      <Card
                        className=" d-flex align-items-center w-100"
                        style={{
                          backgroundColor: '#eaf4fe',
                          marginLeft: '8px'
                        }}
                        component="form"
                      >
                        <InputGroup>
                          <Input
                            placeholder="Reply to Suryasen"
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                          />
                          <InputGroupText>
                            <MdOutlineAddReaction />
                          </InputGroupText>
                        </InputGroup>
                      </Card>
                    </Col>

                    <Col xxl={xxll} xs="12">
                      <Button
                        className="ml-1"
                        color="primary"
                        block
                        onClick={() => handleReplySubmit(ele.id)}
                      >
                        Reply
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Card>
              <hr />
            </div>
          );
        })}
      </div>
    </>
  );
}
export default AllReviews;
