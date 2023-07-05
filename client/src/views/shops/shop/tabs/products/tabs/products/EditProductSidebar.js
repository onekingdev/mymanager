import React, { useEffect, useState } from 'react';
import Sidebar from '@components/sidebar';
import { Button, Col, Input, InputGroup, Label, Row } from 'reactstrap';
import AddBrandModal from './AddBrandModal';
import Select from 'react-select';
import AddCategoryModal from './AddCategoryModal';
import { toast } from 'react-toastify';
import { useUploadSignature } from '../../../../../../../requests/documents/recipient-doc';
import { createProductAction, updateProductAction } from '../../../../../store/action';

export default function EditProductSidebar({ open, toggle, dispatch, store, product }) {
  const [form, setForm] = useState();
  const [openBrand, setOpenBrand] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [openCategory, setOpenCategory] = useState(false);
  const [invalidPath,setInvalidPath] = useState(false)


  const [avatar, setAvatar] = useState(
    require('@src/assets/images/avatars/avatar-blank.png').default
  );

  const handleImgReset = () => {
    setAvatar(require('@src/assets/images/avatars/avatar-blank.png').default);
  };

  const permissionOptions = [
    { value: 'private', label: 'Private' },
    { value: 'public', label: 'Public' }
  ];
  const toggleBrandModal = () => setOpenBrand(!openBrand);
  const toggleCategoryModal = () => setOpenCategory(!openCategory);
  const onPhotoChange = (e) => {
    const reader = new FileReader(),
      files = e.target.files;
    reader.onload = function () {
      setSelectedFile(files[0]);
      setAvatar(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  const handleInputChange = (e) => {
    if (e.target.name === 'brandId' && e.target.value === 'new-brand') {
      // open add brand modal
      toggleBrandModal();
    } else if (e.target.name === 'categoryId' && e.target.value === 'new-category') {
      toggleCategoryModal();
    } 
    else if(e.target.name==='emi'){
      setForm({ ...form, [e.target.name]: e.target.checked });
    }
    else if(e.target.name==='freeShipping'){
      setForm({ ...form, [e.target.name]: e.target.checked });
    }
    else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };
  const handleCheckPath = (e)=>{
    const exists = store.products.filter(x=>x.path===`${store.shop.shopPath}/${e.target.value.replaceAll(' ','-')}`)
    if(exists.length > 0){
      setInvalidPath(true)
    }
    else{
      setInvalidPath(false)
      setForm({...form,path:`${store.shop.shopPath}/${e.target.value.replaceAll(' ','-')}`})
    }
  }
  const handleSubmitForm = () => {
    if (form.name === undefined) {
      toast.error('product name must not be empty!');
      return;
    }
    if (form.categoryId === undefined) {
      toast.error('product category must not be empty!');
      return;
    }
    if (form.brandId === undefined) {
      toast.error('product brand must not be empty!');
      return;
    }
    if (form.description === undefined) {
      toast.error('product description must not be empty!');
      return;
    }
    if (form.path === undefined || form.path==='') {
      toast.error('product path must not be empty!');
      return;
    }
    if(selectedFile){
        let formData = new FormData();
        formData.append('file', selectedFile);
        useUploadSignature(formData).then((res) => {
          let payload = { ...form, imgUrl: res.url };
          dispatch(updateProductAction(product._id, payload));
        });
    }
    else{
        dispatch(updateProductAction(product._id, form));
    }
   
  };
  useEffect(()=>{
    if(product){
        setForm(product)
    }
  },[product])
  return (
    <Sidebar
      size="lg"
      open={open}
      title="Edit Product"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggle}
    >
      <Row>
        <Col md="6">
          <Label className="form-label">
            Name <span className="text-danger">*</span>
          </Label>
          <Input onChange={handleInputChange} name="name" value={form?.name} placeholder="Product Name" />
        </Col>
        <Col md="6">
          <Label className="form-label">
            Brand <span className="text-danger">*</span>
          </Label>
          <Input type="select" onChange={handleInputChange} name="brandId" placeholder="Brand" value={form?.brandId}>
            <option value="select">select...</option>
            <option value="new-brand">Create New</option>
            {store.productBrands.length > 0 &&
              store.productBrands?.map((x, idx) => {
                return (
                  <option value={x._id} key={idx}>
                    {x.name}
                  </option>
                );
              })}
          </Input>
        </Col>
      </Row>
      <Row>
        <Col md="12">
        <Label className="form-label">
              Path <span className="text-danger">*</span>
            </Label>
   
            <Input onChange={handleCheckPath} invalid={invalidPath} name="path" placeholder="Path that users get to" value={form?.path?.split('/')[1]}/>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <Label className="form-label">
            Price <span className="text-danger">*</span>
          </Label>
          <Input
            onChange={handleInputChange}
            name="price"
            type="number"
            placeholder="Product Price"
            value={form?.price}
          />
        </Col>
        <Col md="6">
          <Label className="form-label">
            Category <span className="text-danger">*</span>
          </Label>
          <Input type="select" onChange={handleInputChange} name="categoryId" placeholder="Category" value={form?.categoryId}>
            <option value="select">select...</option>
            <option value="new-category">Create New</option>
            {store.productCategories.length > 0 &&
              store.productCategories?.map((x, idx) => {
                return (
                  <option value={x._id} key={idx}>
                    {x.name}
                  </option>
                );
              })}
          </Input>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <Label className="form-label" for="permission">
            Select Permission
          </Label>
          <Select
            className="react-select"
            classNamePrefix="select"
            defaultValue={permissionOptions.find(x=>x.value===form?.permission)}
            options={permissionOptions}
            isClearable={false}
            onChange={(data) => setForm({ ...form, permission: data.value })}
          />
        </Col>
        <Col md="6">
          <Label className="form-label" >
            Featured Product
          </Label>
          <Input type="select" name="isSignatured" onChange={handleInputChange} value={form?.isSignatured}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </Input>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <Input type='checkbox' name='freeShipping' onChange={handleInputChange} value={form?.freeShipping}/>
          <Label className="form-label" >
            Free Shipping
          </Label>
          
        </Col>
        {/* <Col md="6">
          <Input type='checkbox' name='emi' onChange={handleInputChange}/>
          <Label className="form-label" >
            Accept EMI
          </Label>
          
        </Col> */}
      </Row>
      <Row>
      <Col md="6">
          <Label className="form-label">
            Items in stock <span className="text-danger">*</span>
          </Label>
          <Input
            onChange={handleInputChange}
            name="inStock"
            type="number"
            placeholder="Products in stock"
            value={form?.inStock}
          />
        </Col>
      </Row>
      <Row className="mt-25">
        <Col md="6">
          <div className="me-25">
            <img
              className="rounded me-50"
              src={avatar}
              alt="Generic placeholder image"
              height="100"
              width="100"
            />
          </div>
        </Col>
        <Col md="6">
          <div className="d-flex align-items-end mt-75 ms-1">
            <div>
              <Button tag={Label} className="mb-75 me-75" size="sm" color="primary">
                Upload
                <Input
                  type="file"
                  onChange={onPhotoChange}
                  hidden
                  // accept="image/*"
                />
              </Button>
              <Button
                className="mb-75"
                color="secondary"
                size="sm"
                outline
                onClick={handleImgReset}
              >
                Reset
              </Button>
              <p className="mb-0">Allowed JPG, GIF or PNG. Max size of 800kB</p>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Label className="form-label" for="balance">
            Description <span className="text-danger">*</span>
          </Label>
          <Input
            type="textarea"
            rows="5"
            id="total_price"
            placeholder=""
            name="description"
            onChange={handleInputChange}
            value={form?.description}
          />
        </Col>
      </Row>

      <div className="d-flex justify-content-end mt-1">
        <Button type="submit" onClick={handleSubmitForm} className="me-1" color="primary">
          Edit Product
        </Button>
      </div>
      <AddBrandModal open={openBrand} toggle={toggleBrandModal} dispatch={dispatch} store={store} />
      <AddCategoryModal
        open={openCategory}
        toggle={toggleCategoryModal}
        dispatch={dispatch}
        store={store}
      />
    </Sidebar>
  );
}
