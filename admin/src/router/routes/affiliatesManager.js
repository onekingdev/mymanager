import { lazy } from "react";

const AffiliatesListPage = lazy(() =>
  import("../../views/affiliate-manager/affiliates/list/index")
);
const AffiliateViewPage = lazy(() =>
  import("../../views/affiliate-manager/affiliates/view/index")
);
const CommissionPlanPage = lazy(() =>
  import("../../views/affiliate-manager/commission-plans/index")
);

export default [
  {
    path: "/affiliate-manager/list",
    element: <AffiliatesListPage />,
  },
  {
    path: "/affiliate-manager/affiliate/:id",
    element: <AffiliateViewPage />,
  },
  {
    path: "/affiliate-manager/commission-packages",
    element: <CommissionPlanPage />,
  },
];
