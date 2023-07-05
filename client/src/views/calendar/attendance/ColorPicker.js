import React from 'react';

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: '#000000'
    };

    this.handleColorChange = this.handleColorChange.bind(this);
  }

  handleColorChange(e) {
    this.setState({
      color: e.target.value
    });
  }

  render() {
    const labelStyle = {
      display: 'block',
      marginBottom: '10px'
    };

    const inputStyle = {
      width: '64px',
      height: '60px',
      borderRadius: '3px',
      border: '2px solid grey'
    };

    //const previewStyle = {
    //  width: '30px',
     // height: '30px',
     // borderRadius: '3px',
     // backgroundColor: this.state.color,
     // display: 'inline-block',
    //  marginLeft: '10px'
   // }

    return React.createElement('div', null,
      React.createElement('label', { style: labelStyle }, 'Color:'),
      React.createElement('input', {
        type: 'color',
        style: inputStyle,
        value: this.state.color,
        onChange: this.handleColorChange
      }),
     // React.createElement('div')
    );
  }
}

export default ColorPicker;
