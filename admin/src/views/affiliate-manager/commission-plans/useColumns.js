import { Edit, Trash } from "react-feather";

import { Popconfirm } from "antd";

export const useColumns = ({ openEditModal, deletePlan }) => {
  const columns = [
    {
      name: "Name",
      minWidth: "200px",
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <div className="d-flex flex-column">
            <span className="user_name text-truncate text-body">
              {row.name}
            </span>
          </div>
        </div>
      ),
    },
    {
      name: "Commission Rate",
      minWidth: "140px",
      right: true,
      selector: (row) => row.rate,
      cell: (row) => <span>{row.rate}%</span>,
    },
    {
      name: "Requirement",
      minWidth: "140px",
      center: true,
      selector: (row) => row.requirement,
      cell: (row) => <span>{row.requirement} referrals</span>,
    },
    {
      name: "Total Affiliates",
      minWidth: "160px",
      right: true,
      selector: (row) => row.totalAffiliates,
    },
    {
      name: "Total Payments",
      minWidth: "160px",
      right: true,
      selector: (row) => "$" + row.totalPayments,
    },
    {
      name: "Actions",
      allowOverflow: true,
      center: true,
      cell: (row) => {
        return (
          <div className="d-flex">
            <Edit
              size={15}
              className="me-1 cursor-pointer text-primary"
              onClick={() => openEditModal(row)}
            />

            <Popconfirm
              title="Are you sure to delete?"
              placement="topRight"
              onConfirm={() => deletePlan(row.id)}
              okText="Yes"
              cancelText="No"
            >
              <Trash size={15} className="me-2 cursor-pointer text-danger" />
            </Popconfirm>
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
