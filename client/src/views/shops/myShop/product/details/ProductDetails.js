import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductAction, getProductListAction } from '../../../store/action';
import BreadCrumbs from '@components/breadcrumbs';

import '@styles/base/pages/app-ecommerce-details.scss';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import ProductInfo from './components/ProductInfo';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function ProductDetails() {
  const [product, setProduct] = useState();
  const { shopPath, productPath } = useParams();
  const dispatch = useDispatch();
  const store = useSelector((state) => state.shops);

  useEffect(() => {
    dispatch(getProductAction(shopPath, productPath)).then((res) => {
      //console.log("result",res);
      setProduct(res.data);
    });
  }, [dispatch]);
  useEffect(() => {
    if (product) {
      dispatch(getProductListAction({ shopId: product.shopId, permission: 'all' }));
    }
  }, [product]);

  const history = useHistory();
  const handleBackButtonClick = () => {
    history.goBack(); // Go back to the previous page
  };

  return (
    <Fragment>
      <Row>
        <Col md={11} className="invoice-child-header-wrapper">
          <BreadCrumbs
            breadCrumbTitle="Product Details"
            breadCrumbParent="eCommerce"
            breadCrumbActive="Details"
          />
        </Col>
        <Col md={1}>
          <Button onClick={handleBackButtonClick} className="btn-sm" outline color="primary">
            Back
          </Button>
        </Col>
      </Row>

      <div className="app-ecommerce-details">
        <Card>
          <CardBody>
            {product ? (
              <>
                <ProductInfo product={product} store={store} dispatch={dispatch} />
              </>
            ) : (
              <></>
            )}
          </CardBody>
          {/* <ItemFeatures />
          <CardBody>
            <RelatedProducts />
          </CardBody> */}
        </Card>
      </div>
    </Fragment>
  );
}
