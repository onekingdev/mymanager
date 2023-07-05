import React, { useEffect, useState } from 'react';
import { Badge, Card, CardBody, Input, Label } from 'reactstrap';

export default function ShopSidebar({ type, setType, store, dispatch, items, setItems }) {
  const [brands, setBrands] = useState([]);
  const [brandTitle, setBrandTitle] = useState('Brands');
  const [priceRange, setPriceRange] = useState('all');
  const [selectedBrands, setSelectedBrands] = useState([]);

  const handlePriceRange = (range) => {
    switch (type) {
      case 'product':
        switch (range) {
          case 'all':
            setItems(store.products);
            setPriceRange('all');
            break;
          case 'lt10':
            setItems(store.products.filter((x) => x.price <= 10));
            setPriceRange('lt10');
            break;
          case 'lt100':
            setItems(store.products.filter((x) => x.price <= 100 && x.price >= 10));
            setPriceRange('lt100');
            break;
          case 'lt500':
            setItems(store.products.filter((x) => x.price <= 500 && x.price >= 100));
            setPriceRange('lt500');
            break;
          case 'gt500':
            setItems(store.products.filter((x) => x.price >= 500));
            setPriceRange('gt500');
            break;

          default:
            setItems(store.products);
            setPriceRange('all');
            break;
        }
        break;
      case 'membership':
        switch (range) {
          case 'all':
            setItems(store.memberships);
            setPriceRange('all');
            break;
          case 'lt10':
            setItems(store.memberships.filter((x) => x.amount <= 10));
            setPriceRange('lt10');
            break;
          case 'lt100':
            setItems(store.memberships.filter((x) => x.amount <= 100 && x.amount >= 10));
            setPriceRange('lt100');
            break;
          case 'lt500':
            setItems(store.memberships.filter((x) => x.amount <= 500 && x.amount >= 100));
            setPriceRange('lt500');
            break;
          case 'gt500':
            setItems(store.memberships.filter((x) => x.amount >= 500));
            setPriceRange('gt500');
            break;

          default:
            setItems(store.memberships);
            setPriceRange('all');
            break;
        }
        break;
        case 'course':
          switch (range) {
            case 'all':
              setItems(store.courses);
              setPriceRange('all');
              break;
            case 'lt10':
              setItems(store.courses.filter((x) => x.coursePrice <= 10));
              setPriceRange('lt10');
              break;
            case 'lt100':
              setItems(store.courses.filter((x) => x.coursePrice <= 100 && x.coursePrice >= 10));
              setPriceRange('lt100');
              break;
            case 'lt500':
              setItems(store.courses.filter((x) => x.coursePrice <= 500 && x.coursePrice >= 100));
              setPriceRange('lt500');
              break;
            case 'gt500':
              setItems(store.courses.filter((x) => x.coursePrice >= 500));
              setPriceRange('gt500');
              break;
  
            default:
              setItems(store.courses);
              setPriceRange('all');
              break;
          }
          break;
      default:
        break;
    }
  };
  const handleBrandChange = (e) => {
    switch (type) {
      case 'product':
        if (e.target.checked === true) {
          setSelectedBrands([...selectedBrands, e.target.value]);
        } else {
          setSelectedBrands(selectedBrands.filter((x) => x !== e.target.value));
        }

        break;
      case 'membership':
        if (e.target.checked === true) {
          setSelectedBrands([...selectedBrands, e.target.value]);
        } else {
          setSelectedBrands(selectedBrands.filter((x) => x !== e.target.value));
        }
        break;

      default:
        break;
    }
  };
  useEffect(() => {
    switch (type) {
      case 'product':
        setBrands(store.productBrands || []);
        setBrandTitle('Brands');
        
        break;
      case 'membership':
        setBrands(store.membershipTypes || []);
        setBrandTitle('Types');
        break;
      case 'course':
        break;

      default:
        break;
    }
    
  }, [type, store.productBrands]);
  console.log(brands)
  useEffect(() => {
    switch (type) {
      case 'product':
        setItems(store.products.filter((x) => selectedBrands.includes(x.brandId)));
        break;
      case 'membership':
        setItems(store.memberships.filter((x) => selectedBrands.includes(x.type)));
        break;
      default:
        break;
    }
  }, [selectedBrands]);
  return (
    <>
      <Card>
        <CardBody>
          {/* categories */}
          <h5>Categories</h5>
          <div>
            <div>
              <Input
                type="radio"
                name="category"
                value="product"
                onClick={() => setType('product')}
                checked={type === 'product'}
              />{' '}
              <Label>Products</Label>
            </div>
            <div>
              <Input
                type="radio"
                name="category"
                value="membership"
                onClick={() => setType('membership')}
                checked={type === 'membership'}
              />{' '}
              <Label>Memberships</Label>
            </div>
            <div>
              <Input
                type="radio"
                name="category"
                value="course"
                onClick={() => setType('course')}
                checked={type === 'course'}
              />{' '}
              <Label>Courses</Label>
            </div>
          </div>
          {/* Brands | Types */}
          {brands?.length > 0 && (
            <div className="mt-1">
              <h5>{brandTitle}</h5>
              {brands.map((x, idx) => {
                return (
                  <div key={idx}>
                    <div className="d-flex justify-content-between">
                      <div>
                        <Input type="checkbox" value={x._id} onChange={handleBrandChange} />{' '}
                        <Label>{x?.name || x?.type}</Label>
                      </div>
                      <div>
                        <Badge color="light-secondary">{type==='product' ? store?.products?.filter(y=>y.brandId===x._id).length:store?.memberships?.filter(y=>y.membershipType._id===x._id).length}</Badge>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {/* Price range */}
          <div className="mt-1">
            <h5>Price Range</h5>
            <div>
              <Input
                type="radio"
                name="priceRange"
                value="all"
                onChange={() => handlePriceRange('all')}
                checked={priceRange === 'all'}
              />
              <Label>All</Label>
            </div>
            <div>
              <Input
                type="radio"
                name="priceRange"
                value="lt10"
                onChange={() => handlePriceRange('lt10')}
                checked={priceRange === 'lt10'}
              />
              <Label>{'<=$10'}</Label>
            </div>
            <div>
              <Input
                type="radio"
                name="priceRange"
                value="lt100"
                onChange={() => handlePriceRange('lt100')}
                checked={priceRange === 'lt100'}
              />
              <Label>{'$10-$100'}</Label>
            </div>
            <div>
              <Input
                type="radio"
                name="priceRange"
                value="lt500"
                onChange={() => handlePriceRange('lt500')}
                checked={priceRange === 'lt500'}
              />
              <Label>{'$100-$500'}</Label>
            </div>
            <div>
              <Input
                type="radio"
                name="priceRange"
                value="gt500"
                onChange={() => handlePriceRange('gt500')}
                checked={priceRange === 'gt500'}
              />
              <Label>{'>=$500'}</Label>
            </div>
          </div>

          {/* Rating */}
          <div></div>
        </CardBody>
      </Card>
    </>
  );
}
