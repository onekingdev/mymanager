import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { CheckCircle, MoreVertical } from "react-feather";

import Avatar from "@components/avatar";
import { Link } from "react-router-dom";
import React from "react";
import { getColumnAvatarOptions } from "../../../../utility/Utils";

const stateColors = [
  "light-success",
  "light-danger",
  "light-warning",
  "light-info",
  "light-primary",
  "light-secondary",
];

const statusObj = {
  pending: "light-warning",
  active: "light-success",
  inactive: "light-secondary",
};

const useColumns = () => {
  const AffiliateAvatar = ({ row }) => {
    const color = stateColors[Math.floor(Math.random() * 6)];

    return (
      <Link to={`/affiliate-manager/affiliate/${row.id}`} onClick={() => {}}>
        <Avatar className="me-1" {...getColumnAvatarOptions(row, color)} />
      </Link>
    );
  };

  const columns = [
    {
      name: "Affiliate",
      sortable: true,
      minWidth: "320px",
      sortField: "fullName",
      selector: (row) => row.fullName,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <AffiliateAvatar row={row} />
          <div className="d-flex flex-column">
            <Link
              to={`/affiliate-manager/affiliate/${row.id}`}
              className="user_name text-truncate text-body"
              onClick={() => {}}
            >
              <span className="fw-bolder">{row.fullName}</span>
            </Link>
            <small className="text-truncate text-muted mb-0">{row.email}</small>
          </div>
        </div>
      ),
    },
    {
      name: "Status",
      width: "120px",
      sortable: true,
      sortField: "status",
      center: true,
      selector: (row) => row.status,
      cell: (row) => (
        <Badge className="text-capitalize" color={statusObj[row.status]} pill>
          {row.status}
        </Badge>
      ),
    },
    {
      name: "Commission Plan",
      sortable: true,
      width: "200px",
      sortField: "commissionPlan",
      center: true,
      selector: (row) => row.commissionPlan,
      cell: (row) => <span>{row.commissionPlan}</span>,
    },
    {
      name: "Total Earnings",
      sortable: true,
      minWidth: "200px",
      sortField: "totalEarnings",
      right: true,
      selector: (row) => row.totalEarnings,
      cell: (row) => <span>${row.totalEarnings.toLocaleString()}</span>,
    },
    {
      name: "Total Withdrawals",
      sortable: true,
      minWidth: "220px",
      sortField: "totalWithdrawals",
      right: true,
      selector: (row) => row.totalWithdrawals,
      cell: (row) => <span>${row.totalWithdrawals.toLocaleString()}</span>,
    },
    {
      name: "Pending Payments",
      sortable: true,
      minWidth: "220px",
      sortField: "pendingPayments",
      right: true,
      selector: (row) => row.pendingPayments,
      cell: (row) => <span>${row.pendingPayments.toLocaleString()}</span>,
    },
    {
      name: "Actions",
      minWidth: "20px",
      right: true,
      cell: (row) => (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem tag="span" className="w-100">
                <CheckCircle size={14} className="me-50" />
                <span className="align-middle">Activate</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      ),
    },
  ];

  return {
    columns,
  };
};

export default useColumns;
