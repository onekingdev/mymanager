import React, { useState } from 'react';

const NumPadCell = ({ children, inputValue, setInputValue, isDelete, isClear }) => {
  const [isHover, setIsHover] = useState(false);

  const handleClearClick = () => {
    setInputValue('');
  };
  return (
    <div
      className="rounded-circle"
      style={{
        backgroundColor: isHover ? '#65708b' : '#3e475e',
        fontSize: '20px',
        width: '50px',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        height: '50px',
        alignItems: 'center',
        color: 'white',
        fontWeight: '400',
        cursor: 'pointer'
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => {
        if (isDelete) {
          if (inputValue.length === 0) return;
          setInputValue(inputValue.substring(0, inputValue.length - 1));
          return;
        } else if (isClear) {
          handleClearClick();
          return;
        } else {
          setInputValue(inputValue + children);
        }
      }}
    >
      {children}
    </div>
  );
};

export default NumPadCell;
