// ** Reducers Imports
import navbar from './navbar';
import layout from './layout';
import auth from './authentication';
import todo from '@src/views/apps/todo/store';
import chat from '@src/views/apps/chat/store';
import users from '@src/views/apps/user/store';
import email from '@src/views/apps/email/store';
import invoice from '@src/views/apps/invoice/store';
import calendar from '@src/views/calendar/store';
import kanban from '@src/views/apps/kanban/store';
import workspace from '@src/views/apps/workspace/store';
import label from '@src/views/tasks/label-management/store';
import qrcode from '@src/views/tasks/setting/store';
import ecommerce from '@src/views/apps/ecommerce/store';
import dataTables from '@src/views/tables/data-tables/store';
import permissions from '@src/views/apps/roles-permissions/store';
import attendance from '../views/calendar/attendance/store';

// custom
import clientContact from '../views/contacts/store/reducer';
import employeeSchedule from '../views/contacts/schedule/store/reducer';
import employeeContact from '../views/contacts/store/reducer';
import leadContact from '../views/contacts/store/reducer';
import relationshipContact from '../views/contacts/store/reducer';
import vendorContact from '../views/contacts/store/reducer';
import memberContact from '../views/contacts/member/store/reducer';
import event from '../views/calendar/event/store';
import filemanager from '../views/apps/filemanager/store';
import book from '../views/calendar/book/store';

import ticket from '../views/apps/ticket/store';
//import shop from '../views/shop/store';
//import shopDetails from './../views/shop/store/reducer'

import tasks from '../views/tasks/task-reporting/store/reducer';
import { EmailMarketing } from '../views/apps/email/store/emailMarketing';
import documents from '../views/documents/store';
import totalContacts from '../views/contacts/store/reducer';

import smartList from '../views/settings/tabs/advancesettings/store';
// text
import text from '../views/apps/text/store';
// deposit
import deposit from '../views/depositfunds/store';
import progression from '../views/settings/tabs/progressiontab/store/reducer';
import roles from '../views/settings/tabs/rolesandper/store/reducer';
import course from '../views/mycma/usercourses/store/reducer';
import projectManagement from '../views/business/projects/store/reducer';
import formEditor from '../views/formBuilder/store/reducer';

import employeeTasks from '../views/settings/tabs/rolesandper/store/employee/reducer';
import userSignatureStampInitial from '../views/settings/tabs/rolesandper/store/signsAndStamps/reducer';
import myGoals from '../views/goals/store/reducer';
import goals from '../views/taskngoals/store/reducer';
import chatWidgetSettings from '../views/settings/store/reducer';
import finance from '../views/finance/store/reducer';
import organizations from '../views/organizations/store/reducer';
import automation from '../views/marketing/automation/store/reducer';
import retention from '../views/settings/tabs/advancesettings/tabs/retention/store/reducer';
import userInvoice from '../views/finance/invoice/store/reducer';
import shops from './../views/shops/store/reducer';
import settings from './../views/settings/store/reducer';
import journal from './../views/apps/newjournal/store/reducer';

const rootReducer = {
  auth,
  todo,
  chat,
  email,
  //shop,
  users,
  kanban,
  workspace,
  label,
  qrcode,
  navbar,
  layout,
  invoice,
  calendar,
  ecommerce,
  dataTables,
  permissions,
  projectManagement,
  clientContact,
  employeeContact,
  employeeSchedule,
  leadContact,
  relationshipContact,
  vendorContact,
  memberContact,
  tasks,
  filemanager,
  book,
  event,
  attendance,
  ticket,
  EmailMarketing: EmailMarketing,
  documents,
  totalContacts,
  smartList,
  text,
  deposit,
  roles,
  progression,
  course,
  formEditor,
  employeeTasks,
  userSignatureStampInitial,
  myGoals,
  finance,
  organizations,
  automation,
  goals,
  retention,
  userInvoice,
  shops,
  settings,
  journal
};

export default rootReducer;
