// ** Custom Components & Plugins
import classnames from 'classnames';
import { Paperclip } from 'react-feather';

// ** Custom Component Import
import Avatar from '@components/avatar';

// ** Utils
import { formatTime, formatDateToMonthShort } from '@utils';
import defaultAvatar from '@src/assets/images/avatars/avatar-blank.png';
// ** Reactstrap Imports
import { Input, Label, Badge } from 'reactstrap';

const MailCard = (props) => {
  // ** Props
  const {
    ticket,
    dispatch,
    selectMail,
    selectTicket,
    labelColors,
    updateMails,
    selectedMails,
    handleMailClick,
    selectedTickets,
    handleMailReadUpdate,
    formatDateToMonthShort
  } = props;
  // ** Function to render labels

  const renderLabels = (arr) => {
    if (arr && arr.length) {
      return arr.map((label) => (
        <span key={label} className={`bullet bullet-${labelColors[label]} bullet-sm mx-50`}></span>
      ));
    }
  };
  // ** Function to handle read & mail click
  const onMailClick = () => {
    handleMailClick(ticket._id);
    // handleMailReadUpdate([mail.id], true)
  };

  return (
    <li
      onClick={() => onMailClick(ticket._id)}
      className={classnames('d-flex user-mail', {
        'mail-read': ticket.isRead
      })}
    >
      <div className="mail-left pe-50">
        {ticket.photo ? (
          <Avatar img={ticket.photo} className="box-shadow-1 avatar-border" size="xl" />
        ) : (
          <Avatar
            color={'primary'}
            img={defaultAvatar}
            className="box-shadow-1 avatar-border"
            size="lg"
            initials
          />
        )}
        <div className="user-action justify-content-end pe-25">
          {/* <Input
            label=''
            type='checkbox'
            checked={selectedMails.includes(mail.id)}
            id={`${mail.from.name}-${mail.id}`}
            onChange={e => e.stopPropagation()}
            onClick={e => {
              dispatch(selectMail(mail.id))
              e.stopPropagation()
            }}
          /> */}
          <div className="form-check">
            <Input
              type="checkbox"
              id={`${ticket.reqName}-${ticket._id}`}
              checked={selectedTickets.includes(ticket._id)}
              onClick={(e) => {
                dispatch(selectTicket(ticket._id));
                e.stopPropagation();
              }}
            />
            <Label
              onClick={(e) => e.stopPropagation()}
              for={`${ticket.reqName}-${ticket._id}`}
            ></Label>
          </div>
          <div
            className="email-favorite"
            // onClick={(e) => {
            //     e.stopPropagation()
            //     dispatch(
            //         updateMails({
            //             emailIds: [ticket._id],
            //             dataToUpdate: { isStarred: !ticket.isStarred }
            //         })
            //     )
            // }}
          ></div>
        </div>
      </div>
      <div className="mail-body">
        <div className="mail-details">
          <div className="mail-items">
            <h5 className="mb-25 d-flex align-items-center">
              {ticket.reqName}
              <Badge
                key={ticket.status}
                color={`light-${labelColors[ticket.status]}`}
                className="ms-1 text-capitalize"
                pill
              >
                {ticket.status}
              </Badge>
            </h5>
            <span className="text-truncate lh-1">{ticket.ticketName}</span>
          </div>
          <div className="mail-meta-item">
            {ticket.attachments && ticket.attachments.length ? <Paperclip size={14} /> : null}
            {renderLabels(ticket.labels)}
            <span className="mail-date">
              {formatTime(new Date(ticket.updatedAt)) +
                ' ' +
                formatDateToMonthShort(ticket.updatedAt.toString())}
            </span>
          </div>
        </div>
        <div className="mail-message">
          <p className="text-truncate mb-0">{ticket.messages[ticket.messages.length - 1].msg}</p>
        </div>
      </div>
    </li>
  );
};

export default MailCard;
