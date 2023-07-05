import mock from './mock';

import './jwt';
import './pages/faq';
import './apps/chat';
import './apps/todo';
import './apps/email';
import './apps/invoice';
import './apps/kanban';
import './apps/calendar';
import './apps/userList';
import './pages/profile';
import './apps/eCommerce';
import './pages/blog-data';
import './tables/datatables';
import './pages/pricing-data';
import './navbar/navbarSearch';
import './pages/knowledge-base';
import './apps/permissionsList';
import './cards/card-analytics';
import './cards/card-statistics';
import './pages/account-settings';
import './autoComplete/autoComplete';

mock.onAny().passThrough();
