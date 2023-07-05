import "@styles/react/apps/app-users.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

import { Card, CardHeader, CardTitle } from "reactstrap";

import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
import ReferenceListPagination from "./ReferenceListPagination";
import { data } from "./data";
import useColumns from "./useColumns";
import { useState } from "react";

const ReferencesTab = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { columns } = useColumns();

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Member Contracts</CardTitle>
      </CardHeader>
      <div className="react-dataTable" style={{ height: 'auto', maxHeight: "100%"}}>
        <DataTable
          noHeader
          pagination
          data={data}
          columns={columns}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          paginationComponent={() => (
            <ReferenceListPagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
          paginationDefaultPage={currentPage + 1}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
        />
      </div>
    </Card>
  );
};

export default ReferencesTab;
