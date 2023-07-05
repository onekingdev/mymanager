// Third party library Imports
import classNames from 'classnames';
import InputNumber from 'rc-input-number';
import { useEffect, useMemo, useState } from 'react';
import { Minus, Plus } from 'react-feather';
import { formatFullDate } from '../../../../../../utility/Utils';

const TicketComponent = ({ ticket, orders, setOrders }) => {
  const count = useMemo(() => {
    const order = orders.find((order) => order.id === ticket.id);
    return order?.count ? order.count : 1;
  }, [orders]);

  const handleChange = (value) => {
    if (value < 0) return;
    const newOrders = orders.map((order) => {
      if (order.id === ticket.id) {
        return {
          ...order,
          count: value
        };
      }
      return order;
    });
    setOrders(newOrders);
  };

  return (
    <div className={classNames('ticket-component', { selected: count > 0 })}>
      <div className={`ticket-component-header d-flex flex-row justify-content-between`}>
        <h5>{ticket.ticketName}</h5>
        <InputNumber
          value={count}
          onChange={(value) => handleChange(value)}
          id="basic-number-input input-lg"
          defaultValue={10}
          upHandler={<Plus />}
          downHandler={<Minus />}
        />
      </div>
      <div className="ticket-component-body">
        <div style={{ fontSize: '16px' }}>
          <b>${ticket.price}</b>
        </div>
        <div>Sales end on {formatFullDate(ticket.end)}</div>
      </div>
    </div>
  );
};

export default TicketComponent;
