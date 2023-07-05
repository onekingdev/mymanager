import "@styles/react/apps/app-users.scss";

import AffiliateTable from "./AffiliateTable";
import Breadcrumbs from "@components/breadcrumbs";
import { Fragment } from "react";
import Stats from "./Stats";

const stats = {
  activeAffiliates: 2000,
  affiliatesEarnings: 50000,
  affiliateRequests: 60,
  totalCommissionPaid: 10000,
};

const MemberPage = () => {
  return (
    <Fragment>
      {/* <Breadcrumbs
                breadCrumbTitle="Home"
                breadCrumbParent="Affiliate Manager"
                breadCrumbActive="Affiliates"
            /> */}
      <div className="app-user-list">
        <Stats statsData={stats} />
        <AffiliateTable />
      </div>
    </Fragment>
  );
};

export default MemberPage;
