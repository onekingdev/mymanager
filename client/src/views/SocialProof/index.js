import { useState } from 'react';

import SideTab from './components/SideTab';

// ** Styles
import '@styles/react/apps/app-email.scss';
const CampaignSideTab = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="content-area-wrapper p-0 animate__animated animate__fadeIn">
      <SideTab sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    </div>
  );
};
export default CampaignSideTab;
