import React, { useState } from 'react';
import { Button, Card, CardBody } from 'reactstrap';
import img from './../../../assets/images/illustration/personalization.svg';
import AddShop from './AddShop';
export default function NoShop({dispatch}) {
  const [openCreate, setOpenCreate] = useState(false);

  const toggleCreate = () => setOpenCreate(!openCreate);
  return (
    <>
      <Card>
        <CardBody>
          <div style={{ minHeight: '65vh' }}>
            <div>
              <h2 className="my-auto">Welcome to My Shop</h2>
              <p>Here you can create your shop and start selling your products</p>
            </div>
            <div className="d-flex justify-content-center my-auto">
              <div>
                <img src={img} style={{ width: '45vw' }} />
              </div>
              <div className="text-center my-auto">
                <p className="mt-5">Looks Like You Have No shop yet!</p>
                <h5>Let's Create One</h5>
                <Button color="primary" className="mt-2" onClick={toggleCreate}>
                  Setup your shop
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      <AddShop open={openCreate} toggle={toggleCreate} dispatch={dispatch}/>
    </>
  );
}
