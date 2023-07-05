import "@styles/react/apps/app-users.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

import { Button, Card, CardHeader, CardTitle } from "reactstrap";
import { ChevronDown, Plus } from "react-feather";
import { Fragment, useEffect, useState } from "react";

import DataTable from "react-data-table-component";
import PlanModal from "./PlanModal";
import ReactPaginate from "react-paginate";
import data from "./data";
import { emptyPlan } from "../../../utility/affiliateUtils";
import toast from "react-hot-toast";
import useColumns from "./useColumns";

const CommissionPlansList = () => {
  const [modal, setModal] = useState(false);
  const [plans, setPlans] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    setPlans(data);
  }, []);

  const toggleModal = () => {
    setModal(!modal);
  };

  // ** Function to handle Modal toggle in create plan
  const openCreateModal = () => {
    setSelectedPlan({ ...emptyPlan });
    toggleModal();
  };

  // ** Function to handle Modal toggle in edit plan
  const openEditModal = (plan) => {
    setSelectedPlan({ ...plan });
    toggleModal();
  };

  const savePlan = (plan) => {
    const newPlans = [...plans];
    const index = newPlans.findIndex((p) => p.id === plan.id);
    if (index === -1) {
      newPlans.push(plan);
      toast.success("Plan created successfully");
    } else {
      newPlans[index] = plan;
      toast.success("Plan updated successfully");
    }

    setPlans(newPlans);
    toggleModal();
  };

  const deletePlan = (planId) => {
    const newPlans = [...plans];
    const index = newPlans.findIndex((plan) => plan.id === planId);
    if (index !== -1) {
      newPlans.splice(index, 1);
    }
    setPlans(newPlans);
    toast.success("Plan deleted successfully");
  };

  // ** Function to handle Pagination
  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={Math.ceil(plans.length / 10) || 1}
      breakLabel="..."
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextClassName="page-item next-item"
      previousClassName="page-item prev-item"
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
    />
  );

  const { columns } = useColumns({ openEditModal, deletePlan });

  return (
    <Fragment>
      <Card>
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-center align-items-start border-bottom">
          <CardTitle tag="h4">Commission Plans</CardTitle>
          <div className="d-flex mt-md-0 mt-1">
            <Button className="ms-2" color="primary" onClick={openCreateModal}>
              <Plus size={15} />
              <span className="align-middle ms-50">Create Commission Plan</span>
            </Button>
          </div>
        </CardHeader>

        <div className="react-dataTable" style={{ height: 'auto', maxHeight: "100%"}}>
          <DataTable
            noHeader
            pagination
            columns={columns}
            paginationPerPage={10}
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
            paginationDefaultPage={currentPage + 1}
            paginationComponent={CustomPagination}
            data={plans}

            // selectableRows
            // selectableRowsComponent={BootstrapCheckbox}
          />
        </div>
      </Card>

      <PlanModal
        open={modal}
        plan={selectedPlan}
        toggleModal={toggleModal}
        successAction={savePlan}
      />
    </Fragment>
  );
};

export default CommissionPlansList;
