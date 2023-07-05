import React from 'react';
import { convertDate } from './../../../../goals/helpers/converters';

export default function MembershipStartDate({ item,membership }) {
  return (
    <div
      style={{
        position: 'absolute',
        width: '100px',
        left: `${item.left}px`,
        top: `${item.top}px`,
      }}
    >
      <div
        className="text-center"
        style={{
          color: item.fontColor,
          font: item.font,
          fontSize: `${item.fontSize}px`,
          fontStyle: item.italic ? 'italic' : 'normal',
          fontWeight: item.bold ? 'bold' : 'normal',
          textDecoration: item.underline ? 'underline' : 'normal',
          transform: `scale(${item.formatting / 100})`
        }}
      >
        {membership!==null ? convertDate(membership?.startDate):'Start Date'}
      </div>
    </div>
  );
}
