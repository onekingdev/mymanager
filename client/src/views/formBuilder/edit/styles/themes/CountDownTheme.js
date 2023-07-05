import React, { useState } from 'react';
import { Input, Label, Nav, NavItem, NavLink } from 'reactstrap';

export default function CountDownTheme({ getSelectedHtmlElement }) {
    const [active, setActive] = useState('1');
   
    const handleNavClicked = (tab) => {
        const element = getSelectedHtmlElement();
       
        element.removeClass('Black-White-Countdown Yellow-Black-Countdown Blue-White-Countdown Green-Black-Countdown Red-Black-Countdown RedRound-Black-Countdown GreenRound-Black-Countdown YellowRound-Black-Countdown BlackBorder-Countdown BlueBorder-Countdown RedBorder-Countdown BlackBg-Countdown  BorderShadow-Countdown ')
        element.addClass(tab);
        setActive(tab);
    };
    return (
        <>
            <div className="w-100">
                <Nav tabs vertical className="w-100">
                    <NavItem>
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
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className="justify-content-start border-bottom "
                            active={active === 'Black-White-Countdown'}
                            onClick={() => handleNavClicked('Black-White-Countdown')}
                        >
                            <div className="w-100 p-1  text-center Black-White-Countdown ">
                                <div className="circle-container text-center">
                                    <div className="circle-Countdown-BlackBG"><p className="num" /> 00</div>
                                    <div className="circle-Countdown-BlackBG"><p className="num" /> 00</div>
                                    <div className="circle-Countdown-BlackBG"><p className="num" /> 00</div>
                                </div>
                                <div className="d-flex justify-content-around">
                                    <div> Hours </div>
                                    <div> Minutes </div>
                                    <div> Seconds </div>
                                </div>
                            </div>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className="justify-content-start border-bottom "
                            active={active === 'Yellow-Black-Countdown'}
                            onClick={() => handleNavClicked('Yellow-Black-Countdown')}
                        >
                            <div className="w-100 p-1  text-center 2 Yellow-Black-Countdown">
                                <div className="circle-container text-center">
                                    <div className="circle-Countdown-YellowBG"><p className="num" /> 00</div>
                                    <div className="circle-Countdown-YellowBG"><p className="num" /> 00</div>
                                    <div className="circle-Countdown-YellowBG"><p className="num" /> 00</div>
                                </div>
                                <div className="d-flex justify-content-around">
                                    <div> Hours </div>
                                    <div> Minutes </div>
                                    <div> Seconds </div>
                                </div>
                            </div>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className="justify-content-start border-bottom "
                            active={active === 'Blue-White-Countdown'}
                            onClick={() => handleNavClicked('Blue-White-Countdown')}
                        >
                            <div className="w-100 p-1  text-center 2 Blue-White-Countdown">
                                <div className="circle-container text-center">
                                    <div className="circle-Countdown-BlueBG"><p className="num" /> 00</div>
                                    <div className="circle-Countdown-BlueBG"><p className="num" /> 00</div>
                                    <div className="circle-Countdown-BlueBG"><p className="num" /> 00</div>
                                </div>
                                <div className="d-flex justify-content-around">
                                    <div> Hours </div>
                                    <div> Minutes </div>
                                    <div> Seconds </div>
                                </div>
                            </div>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className="justify-content-start border-bottom "
                            active={active === 'Green-Black-Countdown'}
                            onClick={() => handleNavClicked('Green-Black-Countdown')}
                        >
                            <div className="w-100 p-1  text-center 2 Green-Black-Countdown">
                                <div className="circle-container text-center">
                                    <div className="circle-Countdown-GreenBG"><p className="num" /> 00</div>
                                    <div className="circle-Countdown-GreenBG"><p className="num" /> 00</div>
                                    <div className="circle-Countdown-GreenBG"><p className="num" /> 00</div>
                                </div>
                                <div className="d-flex justify-content-around">
                                    <div> Hours </div>
                                    <div> Minutes </div>
                                    <div> Seconds </div>
                                </div>
                            </div>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className="justify-content-start border-bottom "
                            active={active === 'Red-Black-Countdown'}
                            onClick={() => handleNavClicked('Red-Black-Countdown')}
                        >
                            <div className="w-100 p-1  text-center 2 Red-Black-Countdown">
                                <div className="circle-container text-center">
                                    <div className="circle-Countdown-RedBG"><p className="num" /> 00</div>
                                    <div className="circle-Countdown-RedBG"><p className="num" /> 00</div>
                                    <div className="circle-Countdown-RedBG"><p className="num" /> 00</div>
                                </div>
                                <div className="d-flex justify-content-around">
                                    <div> Hours </div>
                                    <div> Minutes </div>
                                    <div> Seconds </div>
                                </div>
                            </div>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className="justify-content-start border-bottom "
                            active={active === 'RedRound-Black-Countdown'}
                            onClick={() => handleNavClicked('RedRound-Black-Countdown')}
                        >
                            <div className="w-100 p-1  text-center 2 RedRound-Black-Countdown">
                                <div className="circle-container text-center">
                                    <div className="circle-Countdown-BgRed"><p className="num" /> 00</div>
                                    <div className="circle-Countdown-BgRed"><p className="num" /> 00</div>
                                    <div className="circle-Countdown-BgRed"><p className="num" /> 00</div>
                                </div>
                                <div className="d-flex justify-content-around">
                                    <div> Hours </div>
                                    <div> Minutes </div>
                                    <div> Seconds </div>
                                </div>
                            </div>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className="justify-content-start border-bottom "
                            active={active === 'GreenRound-Black-Countdown'}
                            onClick={() => handleNavClicked('GreenRound-Black-Countdown')}
                        >
                            <div className="w-100 p-1  text-center 2 GreenRound-Black-Countdown">
                                <div className="circle-container text-center">
                                    <div className="circle-Countdown-Green "><p className="num" /> 00</div>
                                    <div className="circle-Countdown-Green "><p className="num" /> 00</div>
                                    <div className="circle-Countdown-Green "><p className="num" /> 00</div>
                                </div>
                                <div className="d-flex justify-content-around">
                                    <div> Hours </div>
                                    <div> Minutes </div>
                                    <div> Seconds </div>
                                </div>
                            </div>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className="justify-content-start border-bottom "
                            active={active === 'YellowRound-Black-Countdown'}
                            onClick={() => handleNavClicked('YellowRound-Black-Countdown')}
                        >
                            <div className="w-100 p-1  text-center 2 YellowRound-Black-Countdown">
                                <div className="circle-container text-center">
                                    <div className="circle-Countdown-Yellow "><p className="num" /> 00</div>
                                    <div className="circle-Countdown-Yellow "><p className="num" /> 00</div>
                                    <div className="circle-Countdown-Yellow "><p className="num" /> 00</div>
                                </div>
                                <div className="d-flex justify-content-around">
                                    <div> Hours </div>
                                    <div> Minutes </div>
                                    <div> Seconds </div>
                                </div>
                            </div>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className="justify-content-start border-bottom "
                            active={active === 'BlackBorder-Countdown'}
                            onClick={() => handleNavClicked('BlackBorder-Countdown')}
                        >
                            <div className="w-100 p-1 text-center 2 BlackBorder-Countdown">
                                <div className="circle-container text-center">
                                    <div className="circle-Countdown-White"><p className="num" /> 00</div>
                                    <div className="circle-Countdown-White"><p className="num" /> 00</div>
                                    <div className="circle-Countdown-White"><p className="num" /> 00</div>
                                </div>
                                <div className="d-flex justify-content-around">
                                    <div> Hours </div>
                                    <div> Minutes </div>
                                    <div> Seconds </div>
                                </div>
                            </div>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className="justify-content-start border-bottom "
                            active={active === 'BlueBorder-Countdown'}
                            onClick={() => handleNavClicked('BlueBorder-Countdown')}
                        >
                            <div className="w-100 p-1 text-center 2 BlueBorder-Countdown">
                                <div className="circle-container text-center">
                                    <div className="circle-Countdown-Blue"><p className="num" /> 00</div>
                                    <div className="circle-Countdown-Blue"><p className="num" /> 00</div>
                                    <div className="circle-Countdown-Blue"><p className="num" /> 00</div>
                                </div>
                                <div className="d-flex justify-content-around">
                                    <div> Hours </div>
                                    <div> Minutes </div>
                                    <div> Seconds </div>
                                </div>
                            </div>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className="justify-content-start border-bottom "
                            active={active === 'RedBorder-Countdown'}
                            onClick={() => handleNavClicked('RedBorder-Countdown')}
                        >
                            <div className="w-100 p-1 text-center 2 RedBorder-Countdown">
                                <div className="circle-container text-center">
                                    <div className="circle-Countdown-Red"><p className="num" /> 00</div>
                                    <div className="circle-Countdown-Red"><p className="num" /> 00</div>
                                    <div className="circle-Countdown-Red"><p className="num" /> 00</div>
                                </div>
                                <div className="d-flex justify-content-around">
                                    <div> Hours </div>
                                    <div> Minutes </div>
                                    <div> Seconds </div>
                                </div>
                            </div>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className="justify-content-start border-bottom "
                            active={active === 'BorderShadow-Countdown'}
                            onClick={() => handleNavClicked('BorderShadow-Countdown')}
                        >
                            <div className="w-100 p-1 text-center 2 BorderShadow-Countdown">
                                <div className="circle-container text-center">
                                    <div className="circle-Countdown-Shadow"><p className="num" /> 00</div>
                                    <div className="circle-Countdown-Shadow"><p className="num" /> 00</div>
                                    <div className="circle-Countdown-Shadow"><p className="num" /> 00</div>
                                </div>
                                <div className="d-flex justify-content-around">
                                    <div> Hours </div>
                                    <div> Minutes </div>
                                    <div> Seconds </div>
                                </div>
                            </div>
                        </NavLink>
                    </NavItem>
                </Nav>
            </div>
        </>
    );
}
