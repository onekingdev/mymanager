import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
  UncontrolledButtonDropdown
} from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Check, Copy } from 'react-feather';

export default function ShopSearch({ store, type, items, setItems }) {
  const [isCopied, setIsCopied] = useState(false);
  const [url, setUrl] = useState(null);
  const [sort, setSort] = useState('Featured');

  const onCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };
  const handleSearch = (e) => {
    switch (type) {
      case 'product':
        setItems(store.products.filter((x) => x?.name?.includes(e.target.value)));
        break;
      case 'membership':
        setItems(store.memberships.filter((x) => x?.name?.includes(e.target.value)));
        break;
      default:
        break;
    }
  };
  const handleSort = (sortType) => {
    switch (sortType) {
      case 'featured':
        setSort('Featured');
        items.sort((a, b) => a.isSignatured > b.isSignatured);
        break;
      case 'price-asc':
        setSort('Lowest');
        items.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        setSort('Highest');
        items.sort((a, b) => b.price - a.price);
        break;

      default:
        setSort('Featured');
        items.sort((a, b) => a.isSignatured > b.isSignatured);
        break;
    }
  };
  useEffect(() => {
    if (store.shop._id) {
      const link = new URL(location.href);
      setUrl(link.origin + '/shop/' + store.shop.shopPath);
    }
  }, [store.shop]);
  return (
    <>
      <div className="d-flex justify-content-between">
        <div>
          <h5>Results found</h5>
        </div>
        <div>
          <div className="d-flex">
            <Button color="primary" outline className="me-50">
              <CopyToClipboard onCopy={onCopy} text={url}>
                {isCopied ? <Check size={18} /> : <Copy size={18} />}
              </CopyToClipboard>
            </Button>
            <UncontrolledButtonDropdown className="dropdown-sort">
              <DropdownToggle className="text-capitalize me-1" color="primary" outline caret>
                {sort}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className="w-100" onClick={() => handleSort('featured')}>
                  Featured
                </DropdownItem>
                <DropdownItem className="w-100" onClick={() => handleSort('price-asc')}>
                  Lowest
                </DropdownItem>
                <DropdownItem className="w-100" onClick={() => handleSort('price-desc')}>
                  Highest
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </div>
        </div>
      </div>
      <Card className="mt-1">
        <CardBody>
          <Input type="text" placeholder="Search" onChange={handleSearch} />
        </CardBody>
      </Card>
    </>
  );
}
