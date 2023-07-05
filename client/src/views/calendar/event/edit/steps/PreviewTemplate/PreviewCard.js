// ** React Imports
import { Link } from 'react-router-dom';

// ** Third Party Components
import classnames from 'classnames';
import { Star, ShoppingCart, Heart } from 'react-feather';

// ** Reactstrap Imports
import { Card, CardBody, CardText, Button, Badge } from 'reactstrap';
import { Fragment } from 'react';

const PreviewCard = ({ isSelected, item, handleChoose }) => {
  return (
    <Fragment>
      <Card
        className={classnames('ecommerce-card', {
          'border-primary border-2 ': isSelected
        })}
        key={item.name}
      >
        <div className="position-relative">
          <div
            className="preview-template-overlay"
            style={isSelected ? { display: 'none' } : { display: 'block' }}
          ></div>
          <div className="item-img text-center mx-auto">
            <img className="img-fluid card-img-top" src={item.imageUrl} alt={item.name} />
          </div>
          <CardBody>
            <div className="item-wrapper">
              <div className="item-rating">
                <ul className="unstyled-list list-inline">
                  {new Array(5).fill().map((listItem, index) => {
                    return (
                      <li key={index} className="ratings-list-item me-25">
                        <Star
                          className={classnames({
                            'filled-star': index + 1 <= item.rating,
                            'unfilled-star': index + 1 > item.rating
                          })}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="item-cost">
                <h6 className="item-price">{item.price ? '$' + item.price : 'Free'}</h6>
              </div>
            </div>
            <h6 className="item-name">
              <Link to="/apps/shop" className="text-body">
                {item.name}
              </Link>
              <CardText tag="span" className="item-company">
                By{' '}
                <a className="company-name" href="/" onClick={(e) => e.preventDefault()}>
                  {item.brand}
                </a>
              </CardText>
            </h6>
            <CardText className="item-description">{item.description}</CardText>
          </CardBody>
        </div>
        <div className="item-options text-center">
          <div className="item-wrapper">
            <div className="item-cost">
              <h4 className="item-price">${item.price}</h4>
              {item.hasFreeShipping ? (
                <CardText className="shipping">
                  <Badge color="light-success">Free Shipping</Badge>
                </CardText>
              ) : null}
            </div>
          </div>
          <Button className="btn-wishlist" color="light">
            <Heart
              className={classnames('me-50', {
                'text-danger': false
              })}
              size={14}
            />
            <span>View Detail</span>
          </Button>
          <Button
            color="primary"
            // tag={CartBtnTag}
            className={classnames('btn-cart move-cart', { 'btn-disabled': !isSelected })}
            onClick={handleChoose}
            disabled={isSelected}
          >
            <ShoppingCart className="me-50" size={14} />
            <span>{isSelected ? 'Selected' : 'Choose Template'}</span>
          </Button>
        </div>
      </Card>
    </Fragment>
  );
};

export default PreviewCard;
