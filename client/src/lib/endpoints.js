export const ENDPOINTS = {
  // Auth
  SEND_PASS_RESET_OTP: 'auth/send-reset-pass-otp',
  RESET_PASS: '/auth/reset-password',

  // Onboarding Status
  GET_ONBOARDING_STATUS: '/onboarding/status',

  // Contacts
  GET_TOTAL_CLIENTS: '/client-contact/total-clients',
  CREATE_NEW_POSITION: '/client-contact/position',
  ALL_CLIENT_POSITION: '/client-contact/position',
  ONE_CLIENT_POSITION: '/client-contact/position/',
  CREATE_CLIENTS: '/client-contact',

  // Contacts --> employee
  ALL_EMPLOYEES: '/contact-employee/allemployees',
  CREATE_NEW_EMPLOYEE_POSITION: '/contact-employee/position',
  ALL_EMPLOYEE_POSITION: '/contact-employee/position',
  ALL_EMPLOYEE_SHIFT: '/employee-shifts/',
  EMPLOYEE_SHIFT: '/employee-shifts/',
  ONE_EMPLOYEE_POSITION: '/contact-employee/position/',

  // Roles --> role
  ALL_ROLES: '/role/',

  // Contacts --> Leads
  LEAD_CONTACT: '/lead-contact/',
  CREATE_NEW_LEAD_POSITION: '/lead-contact/position',
  ALL_LEAD_POSITION: '/lead-contact/position',

  // Contacts --> Relationships
  CREATE_NEW_RELATION_POSITION: '/relation-contact/position',
  ALL_RELATION_POSITION: '/relation-contact/position',
  ONE_RELATION_POSITION: '/relation-contact/position/',

  // Contacts --> Vendor
  VENDOR_CONTACT: '/vendor-contact/',
  CREATE_NEW_VENDOR_POSITION: '/vendor-contact/position',
  ALL_VENDOR_POSITION: '/vendor-contact/position',

  //Membership
  MEMBER_TYPE: '/membership-type/',
  MEMBER_TYPES: '/membership-type',
  CREAT_NEW_MEMBERSHIP_TYPE: '/membership-type/add',

  // Members
  GET_TOTAL_MEMBERS: '/member-contact/total-members',
  CREATE_NEW_MEMBERS_POSITION: '/member-contact/position',
  ALL_MEMBERS_POSITION: '/member-contact/position',
  ONE_MEMBERS_POSITION: '/member-contact/position/',
  CREATE_NEW_MEMBERS_TAG: '/contact/bytag',
  ALL_MEMBERS_TAG: '/contact/bytag',
  ONE_MEMBERS_TAG: '/contact/bytag',
  CREATE_MEMBER: '/member-contact',

  //Document
  UPLOAD_DOCUMENT: '/document/upload',
  ADD_RECIPIENTS: '/document-recipient/',
  EDIT_RECIPIENTS: '/document-recipient/recipient/',
  GET_DOC_BY_HASH: '/document/email-link?hashCode=',
  GET_DOC_BY_TOKEN: '/document/email-link?token=',
  Get_DOCUMENT_BY_ID: '/document/documentId/',
  GET_USER_DOCS: '/document/',
  GET_RECEIVED_DOCS: '/document/received',
  DELETE_DOCUMENTS: '/document/delete',
  DOCUMENT_RESEND: 'document-recipient/email/resend',

  //custome fields
  ADD_CUSTOM_FIELD: '/document-custome-fields/add',
  DELETE_CUSTOM_FIELD: '/document-custome-fields/delete?id=',
  GET_CUSTOM_FIELDS_BY_USER: '/document-custome-fields/getbyuser',
  // get user
  GET_USER: '/user',

  // invoice
  GET_INVOICE: '/invoice',
  GET_CUSTOMER: '/customer',

  //Document- Signature & stamps & initials
  SIGNATURE_AND_INITIAL: '/document-signature/signatures',
  UPLOAD_SIGNATURES: '/document-signature/upload',

  //Document- Signature & stamps & initials
  SIGNATURE_AND_INITIAL: '/document-signature/signatures',
  UPLOAD_SIGNATURES: '/document-signature/upload',

  // Marketing Emails
  COMPOSE_EMAIL: 'marketing/compose-email',
  GET_ALL_EMAILS: 'marketing/emails',
  GET_EMAIL_BY_ID: 'marketing/emails/',
  DELETE_EMAILS: 'marketing/emails/',
  MARK_EMAILS_AS_SPAM: 'marketing/emails/mark-as-spam',
  STAR_EMAILS: 'marketing/emails/star',
  SEND_SCHEDULED_EMAIL_NOW: 'marketing/emails/send-scheduled-email-now',

  // Form Builder
  CREATE_FORM: 'formBuilder/create',
  GET_FORM: 'formBuilder/get',
  DELETE_FORM: 'formBuilder/delete',

  // Projects Management
  CREATE_PROJECT: '/project-manager/createProject',
  GET_PROJECTS: '/project-manager/getprojects?id=',
  DELETE_PROJECT: '/project-manager/deleteProject?id=',
  UPDATE_PROJECT: '/project-manager/updateProject',

  GET_TABLES: '/project-manager/get?id=',
  CREATE_NEW_TABLE: '/project-manager/createTable',
  DELETE_TABLE: '/project-manager/deleteTable',
  ADD_ROW: '/project-manager/addRow',
  DELETE_ROW: '/project-manager/deleteRow',
  ADD_COLUMN: '/project-manager/addColumn',
  UPDATE_COLUMN: '/project-manager/updateColumn',
  DELETE_COLUMN: '/project-manager/deleteColumn',
  UPDATE: '/project-manager/update',
  GET_ACTIVITY_LAST_SEEN: '/project-manager/getActivity?id=',

  //socialproof tab
  CREATE_ADD_CAMPAIGN: '/campaign/add_Campaign',
  CREATE_ADD_GOAL: '/create_goal/create_goal',
  GET_GOALLIST: '/create_goal/get_Goal',
  GET_CATEGORY: 'camp_category/cmp_getallCategory',
  ADD_NOTIFICATION: '/uProof_notification/add_uproof_noti',
  ADD_DISPLAY_URL: '/display_url/add_display_url',
  DISPLAY_URLLIST: '/display_url/display_url_list',
  DELETE_DISPLAY: '/display_url/del_display_url/',
  GET_CAMPAIGN_LIST: '/campaign/get_Campaign',
  DELETE_CAMPAIGN: '/campaign/del_campign/',
  EDIT_CAMPAIGN: '/campaign/update_campaign',
  DELETE_GOAL: '/create_goal/del_goal/',
  GOAL_VIEW_ONE: '/create_goal/viewone_Goal/',
  UPDATE_GOAL: '/create_goal/update_goal/',
  ADD_RECENTLY_ACTIVITY: '/recent_activity/add_recent_actvty',

  //category tab
  GET_CATEGORY_DETAILS: '/category/categoryDetails',

  //myjournal tab
  GET_MYJOURNAL_LIST: '/myjournalCategory/get_journal_Category',
  GET_JOURNAL_LIST_BY_ID: '/myjournal/get_Journal_bycategory',
  CREATE_MY_JOURNAL: '/myjournalCategory/create_journal_category',
  CREATE_MY_JOURNAL_BY_ID: '/myJournal/add_MyJournal/',
  UPDATE_MY_JOURNAL: '/myJournal/update_MyJournal/',
  UPDATE_COLUMN_ORDER: '/project-manager/updateColumnOrder',
  UPDATE_DYNAMIC_FIELDS: '/project-manager/updateDynamicColumnFields',
  GET_ACTIVITY_LAST_SEEN: '/project-manager/getActivity?id=',
  GET_ONE_MY_JOURNAL: 'myjournal/getone_myJournal',
  CREATE_PAGE_POST: '/facebook/facebook/create-page-posts',
  DELETE_JOURNAL: '/myjournal/dltMyJournal',
  DELETE_JOURNAL_CATEGORY: '/myjournalCategory/del_category',
  UPDATE_JOURNAL_CATEGORY: '/myjournalCategory/update',
  CALENDER_JOURNAL: '/myjournal/journalList_by_date',
  CALENDER_LIST: '/myJournal/myJournal_list',
  JOURNALEDIT: '/myJournal/update_myjournal',

  //Email Template Category
  FORM_CATEGORY: '/form-categories',

  // Planable api
  WORKSPACE_LIST: '/planable_workspace/workSpace_list',
  CREATE_WORK_SPACE: '/planable_workspace/createWorkSpace',
  VIEW_ONE_WORKSPACE: '/planable_workspace/viewone_workspace/',
  DELETE_ONE_WORKSPACE: '/planable_workspace/dlt_workspace/',
  EDIT_WORKSPACE: '/planable_workspace/update_planable_myWorkSpace/',
  ADD_COMMENT: '/comment/add_comment',
  DELETE_COMMENT: '/comment/del_comment/',
  COMMENT_BY_POST: '/comment/comment_by_post/',
  ADD_COMPOSE: '/compose/add_compose',
  EDIT_COMPOSE: '/compose/update_compose/',
  DELETE_COMPOSE: '/compose/del_compose/',
  GET_COMPOSE: '/compose/get_compose',
  GET_COMPOS_BY_ID: '/compose/get_compose/',
  FACEBOOK_GET_PAGES: '/facebook/facebook/get-pages/',
  FACEBOOK_SCHEDULE_POST: '/facebook/schedule-post',
  FACEBOOKPAGE_REFRESH_TOKEN: '/facebook/refresh-token',
  FACEBOOK_USER_LOGIN_LONG_TOKEN: '/facebook/facebook_short_token', // It would go form userlogin
  FACEBOOK_LONG_TOKEN_USER: '/facebook/facebook_long_token' //
};
