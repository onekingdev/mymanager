import React, { Fragment, useEffect, useState } from 'react';
import { checkShopPathAction, updateShopAction } from '../../../store/action';

import CardActions from '../../../../../@core/components/card-actions';
import {
  Button,
  Card,
  CardBody,
  Col,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row
} from 'reactstrap';
import { useUploadSignature } from '../../../../../requests/documents/recipient-doc';

export default function Setting({ store, dispatch }) {
  const [shop, setShop] = useState(store.shop);
  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [feature1, setFeature1] = useState({});
  const [feature2, setFeature2] = useState({});
  const [feature3, setFeature3] = useState({});

  const editShop = () => {
    let payload = shop;
    let info = [];
    info.push(feature1, feature2, feature3);
    console.log(info)
    payload = { ...payload, info: info };
    if (isValid === false) {
      payload = { ...payload, shopPath: store.shop.shopPath };
    }
    if (logo !== null) {
      const formData = new FormData();
      formData.append('file', logo);
      useUploadSignature(formData).then((res) => {
        if (res?.success === true) {
          payload = { ...payload, logoUrl: res.url };
          if (banner !== null) {
            const formData = new FormData();
            formData.append('file', banner);
            useUploadSignature(formData).then((res) => {
              if (res?.success === true) {
                payload = { ...payload, bannerUrl: res.url };
                //dispatch(createShopAction(payload))
                dispatch(updateShopAction(shop._id, payload));
              }
            });
          }
        }
      });
    } else {
      if (banner !== null) {
        const formData = new FormData();
        formData.append('file', banner);
        useUploadSignature(formData).then((res) => {
          if (res?.success === true) {
            payload = { ...payload, bannerUrl: res.url };
            //dispatch(createShopAction(payload))
            dispatch(updateShopAction(shop._id, payload));
          }
        });
      } else {
        dispatch(updateShopAction(shop._id, payload));
      }
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'bannerUrl') {
      setBanner(e.target.files[0]);
    } else if (e.target.name === 'logoUrl') {
      setLogo(e.target.files[0]);
    } else if (e.target.name === 'shopPath') {
      setShop({ ...shop, [e.target.name]: e.target.value.replaceAll(' ', '-') });
    } else {
      setShop({ ...shop, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(checkShopPathAction(shop.shopPath)).then((res) => {
        if (res.isAvailable === true) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      });
    }, 2000);

    return () => clearTimeout(timeout);
  }, [shop?.shopPath]);

  return (
    <Fragment>
      <CardActions title="Settings" actions="collapse">
        <CardBody>
          <div>
            <Label>Shop Logo</Label>
            <br />
            <div className="d-flex justify-content-between">
              <div>
                <Input type="file" name="logoUrl" onChange={handleChange} />
                <div>
                  <Label>Name Your Shop</Label>
                  <Input type="text" name="name" onChange={handleChange} value={shop?.name} />
                </div>
                <div>
                  <Label>Give a Path for Your Shop</Label>
                  <InputGroup>
                    <InputGroupText>www.mymanager.com/shop/</InputGroupText>
                    <Input
                      type="text"
                      value={shop?.shopPath}
                      placeholder="Shop Path"
                      name="shopPath"
                      valid={isValid}
                      onChange={handleChange}
                    />
                    <FormFeedback valid={isValid}>Sweet! That path is available.</FormFeedback>
                  </InputGroup>
                </div>
              </div>
              <div>
                {shop?.logoUrl && (
                  <img src={shop?.logoUrl} className=" text-center" style={{ width: '100px' }} />
                )}
              </div>
            </div>
          </div>

          <div>
            <Label>Give a Short Description</Label>
            <Input
              type="text"
              name="description"
              onChange={handleChange}
              value={shop?.description}
            />
          </div>

          <div>
            <Label>Shop Banner</Label>
            {shop?.bannerUrl && (
              <img src={shop?.bannerUrl} className="w-100" style={{ height: '300px' }} />
            )}
            <Input type="file" name="bannerUrl" onChange={handleChange} />
          </div>
          <div>
            <Label>Shop Features</Label>
            <br />
            <Label>Give 3 features to your shop to show to customers</Label>
            <Row>
              <Col md="4">
                <Card>
                  <Input
                    type="text"
                    placeholder="title"
                    className="mb-50"
                    name="title"
                    onChange={(e) => setFeature1({ ...feature1, title: e.target.value })}
                    value={shop?.info && shop?.info[0]?.title}
                  />
                  <Input
                    type="text"
                    placeholder="description"
                    name="description"
                    onChange={(e) => setFeature1({ ...feature1, description: e.target.value })}
                    value={shop?.info && shop?.info[0]?.description}
                  />
                </Card>
              </Col>
              <Col md="4">
                <Card>
                  <Input
                    type="text"
                    placeholder="title"
                    className="mb-50"
                    name="title"
                    onChange={(e) => setFeature2({ ...feature2, title: e.target.value })}
                    value={shop?.info && shop?.info[1]?.title}
                  />
                  <Input
                    type="text"
                    placeholder="description"
                    name="description"
                    onChange={(e) => setFeature2({ ...feature2, description: e.target.value })}
                    value={shop?.info && shop?.info[1]?.description}
                  />
                </Card>
              </Col>
              <Col md="4">
                <Card>
                  <Input
                    type="text"
                    placeholder="title"
                    className="mb-50"
                    name="title"
                    onChange={(e) => setFeature3({ ...feature3, title: e.target.value })}
                    value={shop?.info && shop?.info[2]?.title}
                  />
                  <Input
                    type="text"
                    placeholder="description"
                    name="description"
                    onChange={(e) => setFeature3({ ...feature3, description: e.target.value })}
                    value={shop?.info && shop?.info[2]?.description}
                  />
                </Card>
              </Col>
            </Row>
          </div>
          <Button color="primary" onClick={editShop}>
            Edit Shop
          </Button>
        </CardBody>
      </CardActions>
    </Fragment>
  );
}
