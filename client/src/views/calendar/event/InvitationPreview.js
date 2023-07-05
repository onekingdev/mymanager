import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
// ** Reactstrap Imports
import { Card, CardHeader, CardBody, ButtonGroup, Button } from 'reactstrap';

import { useState } from 'react';
// ** Third Party Components
import SwiperCore, { Thumbs, Navigation } from 'swiper'

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import '@styles/react/libs/swiper/swiper.scss'

import img1 from '@src/assets/images/form/invitation1.jpg'
import img2 from '@src/assets/images/form/bg1.jpg'
import img3 from '@src/assets/images/form/invitation2.jpg'
import img4 from '@src/assets/images/form/bg2.jpg'

SwiperCore.use([Thumbs, Navigation]);

const InvitationPreview = (props) => {

    const { eventInfo } = props.eventInfo;
    const { eventId } = useParams();
    const [invitationTypeIndex, setInvitationTypeIndex] = useState(0);
    const [thumbsSwiper, setThumbsSwiper] = useState(null)

    const params = {
        className: 'swiper-gallery',
        spaceBetween: 10,
        navigation: true,
        slidesPerView: 1,
        thumbs: { swiper: thumbsSwiper }
    }

    return (
        <Card>
            <div className="d-flex align-items-center mt-75">
                <CardHeader className="fw-bold py-0">Select One</CardHeader>
                <Link className="ms-auto me-1 btn-sm"><Button color="primary" className="">Edit</Button></Link>
            </div>
            <CardBody>
                <div className="swiper-gallery" style={{ backgroundColor: "#22292f" }}>
                    <Swiper {...params}
                        onSlideChange={(slide) => { setInvitationTypeIndex(slide.activeIndex) }}>
                        <SwiperSlide>
                            <img
                                src={img1}
                                alt="swiper 1"
                                className="img-fluid"
                                height={192}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src={img3}
                                alt="swiper 2"
                                className="img-fluid"
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>

            </CardBody>
        </Card>
    );
};

export default InvitationPreview;
