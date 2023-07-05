import React, { useState } from 'react';
import { Button, Nav, NavItem, NavLink } from 'reactstrap';

export default function ImageTheme({ getSelectedHtmlElement }) {
    const [active, setActive] = useState('1');
    const handleNavClicked = (tab) => {
        const element = getSelectedHtmlElement();
        element.removeClass('PillImg Grey-Border-image Border-White-image Simple-select-image Light-Grey-Image Black-Border-Image  Gray-Border-Image GraySpace-Border-Image ')
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
                            active={active === 'PillImg'}
                            onClick={() => handleNavClicked('PillImg')}
                        >
                            <div className="w-100 p-4  text-center PillImg ">Pill Image</div>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className="justify-content-start border-bottom"
                            active={active === 'Grey-Border-image'}
                            onClick={() => handleNavClicked('Grey-Border-image')}
                        >
                            <div className="w-100 p-4 text-center Grey-Border-image">Demo Image </div>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className="justify-content-start border-bottom"
                            active={active === 'Border-White-image'}
                            onClick={() => handleNavClicked('Border-White-image')}
                        >
                            <div className="w-100 p-4  text-center Border-White-image">Demo image </div>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className="justify-content-start border-bottom"
                            active={active === 'Simple-select-image'}
                            onClick={() => handleNavClicked('Simple-select-image')}
                        >
                            <div className="w-100 p-4 text-center Simple-select-image">Demo image </div>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className="justify-content-start border-bottom"
                            active={active === 'Light-Grey-Image'}
                            onClick={() => handleNavClicked('Light-Grey-Image')}
                        >
                            <div className="w-100 p-4 text-center Light-Grey-Image {" >Demo image </div>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className="justify-content-start border-bottom"
                            active={active === 'Black-Border-Image'}
                            onClick={() => handleNavClicked('Black-Border-Image')}>
                            <div className="w-100 p-4 text-center Black-Border-Image" >Demo image </div>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className="justify-content-start border-bottom"
                            active={active === 'Gray-Border-Image'}
                            onClick={() => handleNavClicked('Gray-Border-Image')}
                        >
                            <div className="w-100 p-4 text-center Gray-Border-Image">Demo image </div>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className="justify-content-start border-bottom"
                            active={active === 'GraySpace-Border-Image'}
                            onClick={() => handleNavClicked('GraySpace-Border-Image')}
                        >
                            <div className="w-100 p-4 text-center GraySpace-Border-Image">Demo image </div>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className="justify-content-start border-bottom"
                            active={active === 'Rounded-Dark-Image'}
                            onClick={() => handleNavClicked('Rounded-Dark-Image')}
                        >
                            <div className="w-100 p-4  text-center Rounded-Dark-Image">Demo image </div>
                        </NavLink>
                    </NavItem>
                </Nav>
            </div>
        </>
    );
}
