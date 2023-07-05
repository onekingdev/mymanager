import { Link, useParams } from 'react-router-dom';

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardBody,
  ButtonGroup,
  Button,
  Input,
  Row,
  Col,
  Label
} from 'reactstrap';

// ** Icons Import
import { Facebook, Twitter, Instagram, Mail } from 'react-feather';
import { useState, useEffect } from 'react';
import { FaRegCopy } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const CardInvite = (props) => {
  const { eventInfo } = props;
  const { eventId } = useParams();
  // const history = useHistory();

  const [url, setUrl] = useState('');

  const copyUrlClickHandler = (e) => {
    document.clear();
    var tmpEl = document.createElement('input');
    setUrl(e.target.closest('.card').querySelector('input').getAttribute('value'));
    e.target.closest('.card-body').querySelector('#copyUrlTooltip').style.display = 'block';
    document.body.appendChild(tmpEl);
    tmpEl.value = url;
    tmpEl.select();
    document.execCommand('copy');
    tmpEl.addEventListener('focusout', (e) => {
      document.querySelector('#copyUrlTooltip').style.display = 'none';
      document.body.removeChild(tmpEl);
    });
  };

  const handlePreviewClick = () => {
    // if (guestEmail) {
    //   history.push(`/event/${url}`);
    // } else {
    //   toast.error('Please fill out contact email');
    //   return;
    // }
    window.open(`/event-view/${eventId}`);
  };

  return (
    <Card>
      <CardHeader>Invitation Details</CardHeader>
      <CardBody>
        <Row>
          <Col sm="6">
            <img
              src={
                eventInfo.eventBanner
                  ? eventInfo.eventBanner
                  : 'https://mymanager.com/assets/images/photo.png'
              }
              height="85"
              alt="Event Banner"
              style={{ minHeight: '100px' }}
            />
          </Col>
          <Col sm="6">
            <div className="d-block w-100">
              <Button
                color="primary"
                className="w-100 btn-sm"
                onClick={(e) => handlePreviewClick()}
              >
                <span className="d-block text-center">Preview</span>
              </Button>
            </div>
            <div className="d-flex mt-75">
              <Input
                type="text"
                value={`https://mymanager.com/event-view/${eventId}`}
                disabled="true"
                className="p-25"
              />
              <Button
                outline
                color="primary"
                className="p-25"
                onClick={(e) => {
                  copyUrlClickHandler(e);
                }}
                onFocusOut={(e) => {
                  focusOutClickHandler(e);
                }}
              >
                <FaRegCopy size={13} />
              </Button>
            </div>
            <p
              id="copyUrlTooltip"
              className="mt-25 mb-0"
              style={{ fontSize: 'smaller', display: 'none' }}
            >
              Copied to clipboard!
            </p>
          </Col>
        </Row>
        {eventInfo.type == 'Public' && (
          <div>
            <div className="h4 mt-2">Share Your Event</div>
            <ButtonGroup className="mb-1">
              <Button outline color="primary">
                <Facebook size={15} />
              </Button>
              <Button outline color="primary">
                <Twitter size={15} />
              </Button>
              <Button outline color="primary">
                <Instagram size={15} />
              </Button>
              <Button outline color="primary" style={{ borderLeft: 'none!important' }}>
                <Mail size={15} />
              </Button>
            </ButtonGroup>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default CardInvite;
