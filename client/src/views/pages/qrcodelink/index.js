// ** React Imports
import { useEffect, Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';

// ** Reactstrap Imports
import { Card, CardBody } from 'reactstrap';
import { AiOutlineEye } from 'react-icons/ai';
// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
// import { getProduct, deleteWishlistItem, addToWishlist, addToCart } from '../store';

import { fetchQRCodeApi, getQRCodeByUUID } from '../../tasks/setting/store';

import '@src/assets/styles/qrcodelink/preview.scss';

const Details = () => {
  const [fetchingSuccess, setFetchingSuccess] = useState(false);
  const [fetchData, setFetchData] = useState(null);

  // ** Vars
  const uuid = useParams().id;

  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.qrcode);

  // ** ComponentDidMount : Get Code Infomation
  useEffect(() => {
    dispatch(getQRCodeByUUID(uuid)).then((res) => {
      console.log(res);
      if (res.payload.status == 200) {
        setFetchingSuccess(true);
        setFetchData(res.payload.data);
      } else {
        setFetchingSuccess(false);
      }
    });
  }, []);

  return (
    <>
      {fetchingSuccess && fetchData ? (
        <div
          style={{
            width: window.innerWidth,
            height: window.innerHeight
          }}
        >
          {console.log(fetchData)}
          <div className="smartphone-background">
            <div
              className="top-backgnd d-flex flex-column"
              style={{
                backgroundColor: fetchData.primaryColor,
                padding: '1rem 1.5rem',
                color: 'white'
              }}
            >
              <span style={{ fontWeight: '800', fontSize: '16px' }}>
                {fetchData?.contentTitle?.length
                  ? fetchData.contentTitle
                  : 'The Basic PDF Template'}
              </span>
              <span>{fetchData.contentDescription}</span>
            </div>
            <div className="bottom-backgnd" style={{ backgroundColor: 'lightgray' }}></div>
          </div>
          <div className="smartphone-img-area">
            <img
              id="smartphone-preview"
              width="90%"
              src={fetchData.contentType === '2' ? fetchData.pdfviewImgURL : fetchData.contentURL}
            />
          </div>
          <a
            className="smartphone-button-area"
            href={fetchData.contentURL}
            style={{ backgroundColor: fetchData.buttonColor }}
          >
            <div
              className="smartphone-button"
              style={{
                backgroundColor: fetchData.buttonColor,
                color: 'white',
                textAlign: 'center',
                verticalAlign: 'center'
              }}
            >
              <div>
                <AiOutlineEye size={20} style={{ marginInlineEnd: '0.5rem' }} />
                View
              </div>
            </div>
          </a>
        </div>
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%'
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              textAlign: 'center',
              fontSize: '30px',
              fontWeight: '800',
              marginTop: '20%'
            }}
          >
            Please Login First
          </div>
          <div className="d-flex align-items-center">
            <a
              href="https://mymanager.com/login"
              style={{
                width: '100%',
                height: '100%',
                textAlign: 'center',
                fontSize: '30px',
                fontWeight: '800'
              }}
            >
              Click here
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
