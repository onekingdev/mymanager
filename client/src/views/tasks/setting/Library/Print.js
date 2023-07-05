import React from 'react';

class ComponentToPrint extends React.Component {
  render() {
    return <img src={this.props.qrcodeImgURL} width="100%" />;
  }
}

export default ComponentToPrint;
