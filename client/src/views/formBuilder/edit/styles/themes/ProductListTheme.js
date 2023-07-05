import React, { useState } from 'react';
import { CardBody, CardText, Badge, CardTitle, CardSubtitle, Button, Card, Nav, NavItem, NavLink } from 'reactstrap';
import { Star, ShoppingCart, Heart } from 'react-feather';

import courseImage from "../../../../../assets/img/card-img-overlay.jpg"


export default function ProductListTheme({ getSelectedHtmlElement }) {
    const [active, setActive] = useState('1');
    //console.log(getSelectedHtmlElement(), "kflds")
    const handleNavClicked = (tab) => {
        const element = getSelectedHtmlElement();
        //console.log(element, "kflds")
        element.removeClass('Black-White-Countdown  ')
        element.addClass(tab);
        setActive(tab);
    };
    return (
        <>
            <div className="w-100">
                <Nav tabs vertical className="w-100">
                    {/* <NavItem>
                        <NavLink
                            className="justify-content-start border-bottom "
                            active={active === '.BlackBg-Countdown'}
                            onClick={() => handleNavClicked('.BlackBg-Countdown')}
                        >
                            <div className="w-100 p-1 text-center 2 BlackBg-Countdown">
                                <div className="circle-container text-center">
                                    <div className="circle-Countdown-BlackBGfull"><p className="num" /> 00</div>
                                    <div className="circle-Countdown-BlackBGfull"><p className="num" /> 00</div>
                                    <div className="circle-Countdown-BlackBGfull"><p className="num" /> 00</div>
                                </div>
                                <div className="d-flex justify-content-around">
                                    <div> Hours </div>
                                    <div> Minutes </div>
                                    <div> Seconds </div>
                                </div>
                            </div>
                        </NavLink>
                    </NavItem> */}

                    {/* <NavItem>
                        <NavLink
                            className="justify-content-start border-bottom "
                            active={active === '.BlackBg-Countdown'}
                            onClick={() => handleNavClicked('.BlackBg-Countdown')}
                        >
                            <div className="w-100 p-1 ">
                                <Card
                                    style={{
                                        width: '18rem'
                                    }}
                                >
                                    <img
                                        alt="Sample"
                                        src="https://picsum.photos/300/200"
                                    />
                                    <CardBody>
                                        <CardTitle tag="h5">
                                            Card title
                                        </CardTitle>
                                        <CardSubtitle
                                            className="mb-2 text-muted"
                                            tag="h6"
                                        >
                                            Card subtitle
                                        </CardSubtitle>
                                        <CardText>
                                            Some quick example text to build on the card title and make up the bulk of the card‘s content.
                                        </CardText>
                                        <Button>
                                            Button
                                        </Button>
                                    </CardBody>
                                </Card>
                            </div>
                        </NavLink>
                    </NavItem> */}

                    <NavItem>
                        <NavLink
                            className="justify-content-start border-bottom "
                            active={active === '   '}
                            onClick={() => handleNavClicked('   ')}
                        >
                            <div className="w-100 p-1 ">

                                <Card className="ecommerce-card" >
                                    <div className="item-img text-center mx-auto">
                                        <img width="300" height="200" className="card-img-top" src={courseImage} />
                                    </div>
                                    <CardBody>
                                        <div className="d-flex justify-content-between text-center">
                                            <div> <Star size={18} />
                                                <Star size={18} />
                                                <Star size={18} /></div>
                                            <h4 className="item-price">$500</h4>
                                        </div>
                                        <h6 className="item-name">
                                        </h6>
                                        <CardText className="item-description">Macbook Pro</CardText>
                                    </CardBody>
                                    <div className="d-flex justify-content-evenly text-center mb-2">
                                        <Button
                                            className="btn-wishlist"
                                            color="light"
                                        >
                                            <Heart
                                                size={14}
                                            />
                                            <span>Favorite</span>
                                        </Button>

                                        <Button
                                            color="primary"
                                            className="btn-cart move-cart"
                                        >
                                            <ShoppingCart className="me-50" size={14} />
                                            <span>
                                                'Buy Now'
                                            </span>
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                        </NavLink>
                    </NavItem>


                    <NavItem>
                        <NavLink
                            className="justify-content-start border-bottom "
                            active={active === '   '}
                            onClick={() => handleNavClicked('   ')}
                        >
                            <div className="w-100 p-1 ">

                                <Card className="ecommerce-card bg-dark text-light" >
                                    <div className="item-img text-center mx-auto">
                                        <img width="300" height="200" className="card-img-top" src={courseImage} />
                                    </div>
                                    <CardBody>
                                        <div className="d-flex justify-content-between text-center">
                                            <div> <Star size={18} />
                                                <Star size={18} />
                                                <Star size={18} /></div>
                                            <h4 className="text-light">$500</h4>
                                        </div>
                                        <h6 className="item-name">
                                        </h6>
                                        <CardText className="item-description">Macbook Pro</CardText>
                                    </CardBody>
                                    <div className="d-flex justify-content-evenly text-center mb-2">
                                        <Button
                                            className="btn-wishlist"
                                            color="light"
                                        >
                                            <Heart
                                                size={14}
                                            />
                                            <span>Favorite</span>
                                        </Button>

                                        <Button
                                            color="primary"
                                            className="btn-cart move-cart"
                                        >
                                            <ShoppingCart className="me-50" size={14} />
                                            <span>
                                                'Buy Now'
                                            </span>
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                        </NavLink>
                    </NavItem>


                    <NavItem>
                        <NavLink
                            className="justify-content-start border-bottom "
                            active={active === '   '}
                            onClick={() => handleNavClicked('   ')}
                        >
                            <div className="w-100 p-1 ">

                                <Card className="ecommerce-card bg-secondary text-white" >
                                    <div className="item-img text-center mx-auto">
                                        <img width="300" height="200" className="card-img-top" src={courseImage} />
                                    </div>
                                    <CardBody>
                                        <div className="d-flex justify-content-between text-center">
                                            <div> <Star size={18} />
                                                <Star size={18} />
                                                <Star size={18} /></div>
                                            <h4 className="text-white">$500</h4>
                                        </div>
                                        <h6 className="item-name">
                                        </h6>
                                        <CardText className="item-description">Macbook Pro</CardText>
                                    </CardBody>
                                    <div className="d-flex justify-content-evenly text-center mb-2">
                                        <Button
                                            className="btn-wishlist"
                                            color="light"
                                        >
                                            <Heart
                                                size={14} style={{ color: "red" }}
                                            />
                                            <span>Favorite</span>
                                        </Button>

                                        <Button
                                            color="primary"
                                            className="btn-cart move-cart"
                                        >
                                            <ShoppingCart className="me-50" size={14} />
                                            <span>
                                                'Buy Now'
                                            </span>
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className="justify-content-start border-bottom "
                            active={active === '   '}
                            onClick={() => handleNavClicked('   ')}
                        >
                            <div className="w-100 p-1 ">

                                <Card className="ecommerce-card bg-light card border-primary p-1" >
                                    <div className="item-img text-center mx-auto ">
                                        <img width="300" height="200" className="card-img-top rounded-circle" src={courseImage} />
                                    </div>
                                    <CardBody>
                                        <div className="d-flex justify-content-between text-center">
                                            <div> <Star size={18} />
                                                <Star size={18} />
                                                <Star size={18} /></div>
                                            <h4 className="text-secondary">$500</h4>
                                        </div>
                                        <h6 className="item-name">
                                        </h6>
                                        <CardText className="item-description">Macbook Pro</CardText>
                                    </CardBody>
                                    <div className="d-flex  justify-content-evenly text-center mb-2">
                                        <Button
                                            className="btn-wishlist"
                                            color="light"
                                        >
                                            <Heart
                                                size={14} style={{ color: "red" }}
                                            />
                                            <span>Favorite</span>
                                        </Button>

                                        <Button
                                            color="primary"
                                            className="btn-cart move-cart"
                                        >
                                            <ShoppingCart className="me-50" size={14} />
                                            <span>
                                                'Buy Now'
                                            </span>
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                        </NavLink>
                    </NavItem>



                </Nav>
            </div>
        </>
    );
}
