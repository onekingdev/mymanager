import "@styles/react/apps/app-users.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

import { Fragment, useEffect, useState } from "react";

import AffiliateListFilters from "./AffiliateListFilters";
import { Card } from "reactstrap";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
import Pagination from "./TablePagination";
import data from "./data";
import useColumns from "./useColumns";

const AffiliateList = () => {
  const { columns } = useColumns();
  const [sort, setSort] = useState("desc");
  const [sortColumn, setSortColumn] = useState("id");
  const [affiliatesList, setAffiliateList] = useState([]);

  useEffect(() => {
    setAffiliateList(data.affiliates);
  }, []);

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };

  return (
    <Fragment>
      <AffiliateListFilters></AffiliateListFilters>

      <Card className="overflow-hidden">
        <div
          className="react-dataTable employee-list-table"
          style={{ height: "80vh" }}
        >
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            columns={columns}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationComponent={Pagination}
            data={affiliatesList}
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default AffiliateList;
