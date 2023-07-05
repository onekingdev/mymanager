import React, { useEffect, useState } from 'react';
import {
  Button,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';

import { checkShopPathAction, createShopAction } from '../store/action';
import { useUploadSignature } from '../../../requests/documents/recipient-doc';

export default function AddShop({ open, toggle, dispatch }) {
  const [shop, setShop] = useState({});
  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);
  const [isValid,setIsValid] = useState(false);

  const createShop = () => {
    let payload = shop;
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
                dispatch(createShopAction(payload));
                toggle();
              }
            });
          }
        }
      });
    }
  };
  const handleChange = (e) => {
    if (e.target.name === 'bannerUrl') {
      setBanner(e.target.files[0]);
    } else if (e.target.name === 'logoUrl') {
      setLogo(e.target.files[0]);
    } 
    else if(e.target.name === 'shopPath'){
      setShop({ ...shop, [e.target.name]: e.target.value.replaceAll(" ","-") });
    }
    else {
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
    <>
      <Modal isOpen={open} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create Your Shop</ModalHeader>
        <ModalBody>
          <div>
            <Label>Name Your Shop</Label>
            <Input type="text" name="name" onChange={handleChange} />
          </div>
          <div>
            <Label>Give a Short Description</Label>
            <Input type="text" name="description" onChange={handleChange} />
          </div>
          <div>
            <Label>Give a Path for Your Shop</Label>
            {/* <Input type="text" name="shopPath" onChange={handleChange} /> */}
            <InputGroup>
              <InputGroupText>www.mymanager.com/shop/</InputGroupText>
              <Input type="text" placeholder="Shop Path" name="shopPath" valid={isValid} onChange={handleChange} />
            </InputGroup>
            <FormFeedback valid={isValid} >Sweet! That path is available.</FormFeedback>
          </div>
          <div>
            <Label>Shop Banner</Label>
            <Input type="file" name="bannerUrl" onChange={handleChange} />
          </div>
          <div>
            <Label>Shop Logo</Label>
            <Input type="file" name="logoUrl" onChange={handleChange} />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={createShop}>
            Create Shop
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
