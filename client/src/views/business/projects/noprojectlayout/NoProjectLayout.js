/*    eslint-disable */

// ** React Imports
import React, { Fragment } from 'react';

const NoProjectLayout = ({ message }) => {
  return (
    <Fragment>
      <div className="mb-2 d-flex justify-content-between align-items-center">
        <div
          style={{
            width: '100%',
            height: '60vh',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <img style={{ width: '100px', height: '100px' }} src="/empty.svg" alt="" />
          <br />
          <span style={{ paddingLeft: 20 }}> {message} </span>
        </div>
      </div>
    </Fragment>
  );
};

export default NoProjectLayout;
