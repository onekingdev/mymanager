import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { FaWallet, FaCheck, FaPaypal, FaCreditCard, FaDollarSign } from 'react-icons/fa';
import Avatar from '@components/avatar';
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { MdOutlineManageAccounts } from 'react-icons/md';
import OneImage from '../../../../assets/images/avatars/1.png';

const data = [
  {
    amount: 75,
    title: 'Wallet',
    subtitle: 'Starbucks',
    amountDiff: 'negative',
    avatarColor: 'primary',
    avatarIcon: FaWallet
  },
  {
    amount: 480,
    subtitle: 'Add Money',
    title: 'Bank Transfer',
    avatarColor: 'success',
    avatarIcon: FaCheck
  },
  {
    amount: 268,
    title: 'PayPal',
    avatarColor: 'error',
    subtitle: 'Client Payment',
    avatarIcon: FaPaypal
  },
  {
    amount: 699,
    title: 'Master Card',
    amountDiff: 'negative',
    avatarColor: 'secondary',
    subtitle: 'Ordered iPhone 13',
    avatarIcon: FaCreditCard
  },
  {
    amount: 98,
    subtitle: 'Refund',
    avatarColor: 'info',
    title: 'Bank Transaction',
    avatarIcon: FaDollarSign
  },
  {
    amount: 126,
    title: 'PayPal',
    avatarColor: 'error',
    subtitle: 'Client Payment',
    avatarIcon: FaPaypal
  }
];

const EcommerceTransactions = () => {
  return (
    <Card style={{ height: '60vh'}}>
      <h4 className="p-1">Upcoming Events</h4>

      {/* {data.map((item, index) => {
          const AvatarIcon = item.avatarIcon; // Store the icon component in a variable

          return (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: index !== data.length - 1 ? '1.5rem' : undefined
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginRight: '1rem',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: item.avatarColor,
                  justifyContent: 'center',
                  color: '#fff'
                }}
              >
                <Avatar
                  className="rounded"
                  color={item.avatarColor}
                  icon={<AvatarIcon size={18} />}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  flex: 1
                }}
              >
                <h6>{item.title}</h6>
                <small style={{ color: '#6c757d' }}>{item.subtitle}</small>
              </div>
              <div
                style={{
                  fontWeight: 500,
                  color: item.amountDiff === 'negative' ? '#dc3545' : '#28a745'
                }}
              >
                {`${item.amountDiff === 'negative' ? '-' : '+'}$${item.amount}`}
              </div>
            </div>
          );
        })} */}
      <div className='upcoming-event'>
        <Card className="m-1 p-1 border mb-0">
          <div style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
            <div className="d-flex align-items-center">
              <img alt={'image'} src={OneImage} width={32} style={{ borderRadius: '25px' }} />
              <div style={{ marginLeft: '20px' }}>
                <h5 style={{ fontWeight: 'bolder', color: '#000' }} className="mb-50">
                  Sohan Singh Lal
                  <Badge className="text-capitalize ms-50" color="light-success">
                    General
                  </Badge>
                  <Badge className="text-capitalize ms-1" color="light-warning">
                    type
                  </Badge>
                </h5>
                <span>05/20/2023 1:39 AM - 05/20/2023 1:39 AM</span>
              </div>
            </div>
            <UncontrolledDropdown>
              <DropdownToggle tag="div" className="btn btn-sm">
                <Icon.MoreVertical size={18} className="cursor-pointer" />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem tag="span" className="w-100">
                  <MdOutlineManageAccounts size={14} className="me-50" />
                  <span className="align-middle">View</span>
                </DropdownItem>
                <DropdownItem tag="span" className="w-100">
                  <MdOutlineManageAccounts size={14} className="me-50" />
                  <span className="align-middle">Manage</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </Card>
        <Card className="m-1 p-1 border mb-0">
          <div style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
            <div className="d-flex align-items-center">
              <img alt={'image'} src={OneImage} width={32} style={{ borderRadius: '25px' }} />
              <div style={{ marginLeft: '20px' }}>
                <h5 style={{ fontWeight: 'bolder', color: '#000' }} className="mb-50">
                  Sohan Singh Lal
                  <Badge className="text-capitalize ms-50" color="light-success">
                    General
                  </Badge>
                  <Badge className="text-capitalize ms-1" color="light-warning">
                    type
                  </Badge>
                </h5>
                <span>05/20/2023 1:39 AM - 05/20/2023 1:39 AM</span>
              </div>
            </div>
            <UncontrolledDropdown>
              <DropdownToggle tag="div" className="btn btn-sm">
                <Icon.MoreVertical size={18} className="cursor-pointer" />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem tag="span" className="w-100">
                  <MdOutlineManageAccounts size={14} className="me-50" />
                  <span className="align-middle">View</span>
                </DropdownItem>
                <DropdownItem tag="span" className="w-100">
                  <MdOutlineManageAccounts size={14} className="me-50" />
                  <span className="align-middle">Manage</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </Card>
        <Card className="m-1 p-1 border mb-0">
          <div style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
            <div className="d-flex align-items-center">
              <img alt={'image'} src={OneImage} width={32} style={{ borderRadius: '25px' }} />
              <div style={{ marginLeft: '20px' }}>
                <h5 style={{ fontWeight: 'bolder', color: '#000' }} className="mb-50">
                  Sohan Singh Lal
                  <Badge className="text-capitalize ms-50" color="light-success">
                    General
                  </Badge>
                  <Badge className="text-capitalize ms-1" color="light-warning">
                    type
                  </Badge>
                </h5>
                <span>05/20/2023 1:39 AM - 05/20/2023 1:39 AM</span>
              </div>
            </div>
            <UncontrolledDropdown>
              <DropdownToggle tag="div" className="btn btn-sm">
                <Icon.MoreVertical size={18} className="cursor-pointer" />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem tag="span" className="w-100">
                  <MdOutlineManageAccounts size={14} className="me-50" />
                  <span className="align-middle">View</span>
                </DropdownItem>
                <DropdownItem tag="span" className="w-100">
                  <MdOutlineManageAccounts size={14} className="me-50" />
                  <span className="align-middle">Manage</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </Card>
        <Card className="m-1 p-1 border mb-0">
          <div style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
            <div className="d-flex align-items-center">
              <img alt={'image'} src={OneImage} width={32} style={{ borderRadius: '25px' }} />
              <div style={{ marginLeft: '20px' }}>
                <h5 style={{ fontWeight: 'bolder', color: '#000' }} className="mb-50">
                  Sohan Singh Lal
                  <Badge className="text-capitalize ms-50" color="light-success">
                    General
                  </Badge>
                  <Badge className="text-capitalize ms-1" color="light-warning">
                    type
                  </Badge>
                </h5>
                <span>05/20/2023 1:39 AM - 05/20/2023 1:39 AM</span>
              </div>
            </div>
            <UncontrolledDropdown>
              <DropdownToggle tag="div" className="btn btn-sm">
                <Icon.MoreVertical size={18} className="cursor-pointer" />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem tag="span" className="w-100">
                  <MdOutlineManageAccounts size={14} className="me-50" />
                  <span className="align-middle">View</span>
                </DropdownItem>
                <DropdownItem tag="span" className="w-100">
                  <MdOutlineManageAccounts size={14} className="me-50" />
                  <span className="align-middle">Manage</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </Card>
        <Card className="m-1 p-1 border mb-0">
          <div style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
            <div className="d-flex align-items-center">
              <img alt={'image'} src={OneImage} width={32} style={{ borderRadius: '25px' }} />
              <div style={{ marginLeft: '20px' }}>
                <h5 style={{ fontWeight: 'bolder', color: '#000' }} className="mb-50">
                  Sohan Singh Lal
                  <Badge className="text-capitalize ms-50" color="light-success">
                    General
                  </Badge>
                  <Badge className="text-capitalize ms-1" color="light-warning">
                    type
                  </Badge>
                </h5>
                <span>05/20/2023 1:39 AM - 05/20/2023 1:39 AM</span>
              </div>
            </div>
            <UncontrolledDropdown>
              <DropdownToggle tag="div" className="btn btn-sm">
                <Icon.MoreVertical size={18} className="cursor-pointer" />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem tag="span" className="w-100">
                  <MdOutlineManageAccounts size={14} className="me-50" />
                  <span className="align-middle">View</span>
                </DropdownItem>
                <DropdownItem tag="span" className="w-100">
                  <MdOutlineManageAccounts size={14} className="me-50" />
                  <span className="align-middle">Manage</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </Card>
        <Card className="m-1 p-1 border mb-0">
          <div style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
            <div className="d-flex align-items-center">
              <img alt={'image'} src={OneImage} width={32} style={{ borderRadius: '25px' }} />
              <div style={{ marginLeft: '20px' }}>
                <h5 style={{ fontWeight: 'bolder', color: '#000' }} className="mb-50">
                  Sohan Singh Lal
                  <Badge className="text-capitalize ms-50" color="light-success">
                    General
                  </Badge>
                  <Badge className="text-capitalize ms-1" color="light-warning">
                    type
                  </Badge>
                </h5>
                <span>05/20/2023 1:39 AM - 05/20/2023 1:39 AM</span>
              </div>
            </div>
            <UncontrolledDropdown>
              <DropdownToggle tag="div" className="btn btn-sm">
                <Icon.MoreVertical size={18} className="cursor-pointer" />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem tag="span" className="w-100">
                  <MdOutlineManageAccounts size={14} className="me-50" />
                  <span className="align-middle">View</span>
                </DropdownItem>
                <DropdownItem tag="span" className="w-100">
                  <MdOutlineManageAccounts size={14} className="me-50" />
                  <span className="align-middle">Manage</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </Card>
        <Card className="m-1 p-1 border mb-0">
          <div style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
            <div className="d-flex align-items-center">
              <img alt={'image'} src={OneImage} width={32} style={{ borderRadius: '25px' }} />
              <div style={{ marginLeft: '20px' }}>
                <h5 style={{ fontWeight: 'bolder', color: '#000' }} className="mb-50">
                  Sohan Singh Lal
                  <Badge className="text-capitalize ms-50" color="light-success">
                    General
                  </Badge>
                  <Badge className="text-capitalize ms-1" color="light-warning">
                    type
                  </Badge>
                </h5>
                <span>05/20/2023 1:39 AM - 05/20/2023 1:39 AM</span>
              </div>
            </div>
            <UncontrolledDropdown>
              <DropdownToggle tag="div" className="btn btn-sm">
                <Icon.MoreVertical size={18} className="cursor-pointer" />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem tag="span" className="w-100">
                  <MdOutlineManageAccounts size={14} className="me-50" />
                  <span className="align-middle">View</span>
                </DropdownItem>
                <DropdownItem tag="span" className="w-100">
                  <MdOutlineManageAccounts size={14} className="me-50" />
                  <span className="align-middle">Manage</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </Card>
      </div>
    </Card>
  );
};

export default EcommerceTransactions;
