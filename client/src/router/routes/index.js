// ** Routes Imports
import DashboardRoutes from './Dashboards';
import ContactRoutes from './Contacts';
import AppRoutes from './Apps';
import TaskRoutes from './Task';
import CalendarRoutes from './Calendar';
import BusinessRoutes from './Business';
import ShopRoutes from './Shop';
import FinanceRoutes from './Finance';
import DocumentRoutes from './Documents';

// import FormRoutes from './Forms';
import PagesRoutes from './Pages';
// import TablesRoutes from './Tables';
// import ChartsRoutes from './Charts';
// import UiElementRoutes from './UiElements';
// import ExtensionsRoutes from './Extensions';
// import PageLayoutsRoutes from './PageLayouts';
import Myforms from './myforms';
import SettingRoute from './Setting';
import FileManagerRoutes from './FileManager';
import MyCMARoutes from './MyCMA';
import LiveChatSettingRoute from './liveChatSetting';
import WebToolRoutes from './WebTools';
import MarketingRoutes from './Marketing';
import MySocialRoutes from './MySocial';
import FormBuilderRoutes from './FormBuilder';
import OrganizationRoutes from './Organizations';

// ** Document title
const TemplateTitle = '%s - MyManager React Admin Template';

// ** Default Route
const DefaultRoute = '/dashboard/analytics';

// ** Merge Routess
const Routes = [
  ...DashboardRoutes,
  ...ContactRoutes,
  ...AppRoutes,
  ...TaskRoutes,
  // ...TablesRoutes,
  ...CalendarRoutes,
  ...BusinessRoutes,
  ...ShopRoutes,
  ...FinanceRoutes,
  ...DocumentRoutes,
  ...Myforms,
  ...FormBuilderRoutes,

  ...PagesRoutes,
  // ...UiElementRoutes,
  // ...ExtensionsRoutes,
  // ...PageLayoutsRoutes,
  // ...FormRoutes,
  // ...TablesRoutes,
  // ...ChartsRoutes,
  ...SettingRoute,
  ...FileManagerRoutes,
  ...MyCMARoutes,
  ...LiveChatSettingRoute,
  ...WebToolRoutes,
  ...MarketingRoutes,
  ...MySocialRoutes,
  ...OrganizationRoutes
];

export { DefaultRoute, TemplateTitle, Routes };
