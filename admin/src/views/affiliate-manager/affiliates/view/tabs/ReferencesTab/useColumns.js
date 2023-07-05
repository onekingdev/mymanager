import { CiCircleAlert, CiCircleCheck } from "react-icons/ci";

import Avatar from "@components/avatar";
import { Link } from "react-router-dom";
import { Progress } from "reactstrap";
import React from "react";
import { getColumnAvatarOptions } from "../../../../../../utility/Utils";
import moment from "moment";

const stateColors = [
  "light-success",
  "light-danger",
  "light-warning",
  "light-info",
  "light-primary",
  "light-secondary",
];

const useColumns = () => {
  const ReferenceAvatar = ({ row }) => {
    const color = stateColors[Math.floor(Math.random() * 6)];

    return (
      <Link to={`/user-list/view/${row.id}`} onClick={() => {}}>
        <Avatar className="me-1" {...getColumnAvatarOptions(row, color)} />
      </Link>
    );
  };

  const columns = [
    {
      name: "Dated",
      sortable: true,
      width: "130px",
      sortField: "startDate",
      selector: (row) => row.startDate,
      cell: (row) => <span>{moment(row.startDate).format("DD/MM/YYYY")}</span>,
    },
    {
      name: "Referred User",
      sortable: true,
      minWidth: "220px",
      sortField: "fullName",
      selector: (row) => row.fullName,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <ReferenceAvatar row={row} />
          <div className="d-flex flex-column">
            <Link
              to={`/user-list/view/${row.id}`}
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
      sortField: "isPaymentConfirmed",
      center: true,
      selector: (row) => row.isPaymentConfirmed,
      cell: (row) => {
        const statusIcons = row.isPaymentConfirmed ? (
            <CiCircleCheck size={16} />
          ) : (
            <CiCircleAlert size={16} />
          ),
          statusColor = row.isPaymentConfirmed
            ? "light-success"
            : "light-warning";

        return (
          <Avatar
            color={statusColor}
            icon={statusIcons}
            id={`av-tooltip-${row.id}`}
          />
        );
      },
    },
    {
      name: "Plan",
      sortable: true,
      width: "150px",
      sortField: "subscriptionPlan",
      center: true,
      selector: (row) => row.subscriptionPlan,
      cell: (row) => <span>{row.subscriptionPlan}</span>,
    },
    {
      name: "Days till Refund",
      sortable: false,
      minWidth: "250px",
      selector: (row) => row.startDate,
      cell: (row) => {
        const startDate = moment(row.startDate),
          daysRemaining = moment().diff(startDate, "days");

        return (
          <div className="d-flex align-items-center">
            <div className="user-info text-truncate ">
              <span className="d-block fw-bold text-truncate">
                {daysRemaining > 14
                  ? `Refund Days Over`
                  : `${daysRemaining} Days Left`}
              </span>
              <Progress
                value={daysRemaining}
                style={{ height: "6px", width: "230px" }}
                className={`mt-1 progress-bar-primary`}
                min={0}
                max={14}
              />
            </div>
          </div>
        );
      },
    },
  ];

  return {
    columns,
  };
};

export default useColumns;
