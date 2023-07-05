const defaultElements = [
  {
    elementTitle: "Employees",
    elementParent: "contacts",
    defaultId: "contacts/employee",
    navLink: "/contacts/employee/list",
  },
  {
    elementTitle: "Relationships",
    elementParent: "contacts",
    defaultId: "contacts/relationships",
    navLink: "/contacts/relationship/list",
  },
  {
    elementTitle: "Journal",
    elementParent: "tasksAndGoals",
    defaultId: "tasksAndGoals/journal",
    navLink: "/tasksAndGoals",
  },
  {
    elementTitle: "Appointment",
    elementParent: "calendar",
    defaultId: "calendar/appointment",
    navLink: "/calendar",
  },
  {
    elementTitle: "Templates",
    elementParent: null,
    defaultId: "documents/templates",
    navLink: "/documents",
  },
  {
    elementTitle: "Emails",
    elementParent: "marketing",
    defaultId: "marketing/email",
    navLink: "/marketing",
  },
  {
    elementTitle: "Tickets",
    elementParent: "marketing",
    defaultId: "marketing/ticket",
    navLink: "/marketing",
  },
  {
    elementTitle: "Membership",
    elementParent: "shop",
    defaultId: "shop/membership",
    navLink: "/ecommerce/shop",
  },
  {
    elementTitle: "Courses",
    elementParent: "shop",
    defaultId: "shop/courses",
    navLink: "/ecommerce/shop",
  },
  {
    elementTitle: "Income",
    elementParent: "finance",
    defaultId: "finance/income",
    navLink: "/finance",
  },
  {
    elementTitle: "Attendance",
    elementParent: "calendar",
    defaultId: "calendar/attendance",
    navLink: "/calendar",
  },
  {
    elementTitle: "Chat",
    elementParent: "marketing",
    defaultId: "marketing/chat",
    navLink: "/marketing",
  },
  {
    elementTitle: "Expired",
    elementParent: "statistics",
    defaultId: "statistics/expired",
    navLink: "/business/statistics",
  },
  {
    elementTitle: "Shop",
    elementParent: null,
    defaultId: "shop",
    navLink: "/ecommerce/shop",
  },
  {
    elementTitle: "Settings",
    elementParent: null,
    defaultId: "settings",
    navLink: "/setting",
  },
  {
    elementTitle: "Advance Settings",
    elementParent: "settings",
    defaultId: "settings/advance",
    navLink: "/setting",
  },
  {
    elementTitle: "Members",
    elementParent: "contacts",
    defaultId: "contacts/members",
    navLink: "/contacts/members/list",
  },
  {
    elementTitle: "Tasks & Goals",
    elementParent: null,
    defaultId: "tasksAndGoals",
    navLink: "/tasksAndGoals",
  },
  {
    elementTitle: "Tasks",
    elementParent: "tasksAndGoals",
    defaultId: "tasksAndGoals/tasks",
    navLink: "/tasksAndGoals",
  },
  {
    elementTitle: "Marketing",
    elementParent: null,
    defaultId: "marketing",
    navLink: "/marketing",
  },
  {
    elementTitle: "Social Contact",
    elementParent: "mysocial",
    defaultId: "mysocial/socialContact",
    navLink: "/mysocial",
  },
  {
    elementTitle: "Social Proof",
    elementParent: "mysocial",
    defaultId: "mysocial/socialProof",
    navLink: "/mysocial",
  },
  {
    elementTitle: "Coupons",
    elementParent: "shop",
    defaultId: "shop/coupons",
    navLink: "/ecommerce/shop",
  },
  {
    elementTitle: "Vendors",
    elementParent: "contacts",
    defaultId: "contacts/vendor",
    navLink: "/contacts/vendor/list",
  },
  {
    elementTitle: "Calendar",
    elementParent: null,
    defaultId: "calendar",
    navLink: "/calendar",
  },
  {
    elementTitle: "Statistics",
    elementParent: null,
    defaultId: "statistics",
    navLink: "/business/statistics",
  },
  {
    elementTitle: "Dashboard",
    elementParent: 'statistics',
    defaultId: "statistics/dashboard",
    navLink: "/business/statistics",
  },
  {
    elementTitle: "Products",
    elementParent: "shop",
    defaultId: "shop/products",
    navLink: "/ecommerce/shop",
  },
  {
    elementTitle: "Invoice",
    elementParent: "finance",
    defaultId: "finance/invoice",
    navLink: "/finance",
  },
  {
    elementTitle: "File Manager",
    elementParent: null,
    defaultId: "file-manager",
    navLink: "/filemanager",
  },
  {
    elementTitle: "Notifications",
    elementParent: "settings",
    defaultId: "settings/notifications",
    navLink: "/setting",
  },
  {
    elementTitle: "Leads",
    elementParent: "contacts",
    defaultId: "contacts/leads",
    navLink: "/contacts/leads/list",
  },
  {
    elementTitle: "QR Barcode",
    elementParent: "business",
    defaultId: "business/qrBarcode",
    navLink: "/business/tools",
  },
  {
    elementTitle: "Statistics",
    elementParent: null,
    defaultId: "statistics",
    navLink: "/business/statistics",
  },
  {
    elementTitle: "Retention",
    elementParent: "statistics",
    defaultId: "statistics/retention",
    navLink: "/business/statistics",
  },
  {
    elementTitle: "Expenses",
    elementParent: "finance",
    defaultId: "finance/expenses",
    navLink: "/finance",
  },
  {
    elementTitle: "Profit & Loss",
    elementParent: "finance",
    defaultId: "finance/profitloss",
    navLink: "/finance",
  },
  {
    elementTitle: "Permissions & Roles",
    elementParent: "settings",
    defaultId: "settings/permissions",
    navLink: "/setting",
  },
  {
    elementTitle: "Clients",
    elementParent: "contacts",
    defaultId: "contacts/client",
    navLink: "/contacts/clients/list",
  },
  {
    elementTitle: "Dashboard",
    elementParent: null,
    defaultId: "dashboard",
    navLink: "/dashboard/analytics",
  },
  {
    elementTitle: "Goals",
    elementParent: "tasksAndGoals",
    defaultId: "tasksAndGoals/goals",
    navLink: "/tasksAndGoals",
  },
  {
    elementTitle: "Reporting",
    elementParent: "tasksAndGoals",
    defaultId: "tasksAndGoals/reporting",
    navLink: "/tasksAndGoals",
  },
  {
    elementTitle: "Documents",
    elementParent: null,
    defaultId: "documents",
    navLink: "/documents",
  },
  {
    elementTitle: "Business Tools",
    elementParent: null,
    defaultId: "business",
    navLink: "/business/tools",
  },
  {
    elementTitle: "Finance",
    elementParent: null,
    defaultId: "finance",
    navLink: "/finance",
  },
  {
    elementTitle: "Security",
    elementParent: "settings",
    defaultId: "settings/security",
    navLink: "/setting",
  },
  {
    elementTitle: "My Social",
    elementParent: null,
    defaultId: "mysocial",
    navLink: "/mysocial",
  },
  {
    elementTitle: "Reputation",
    elementParent: "mysocial",
    defaultId: "mysocial/reputation",
    navLink: "/mysocial",
  },
  {
    elementTitle: "Progression",
    elementParent: "statistics",
    defaultId: "statistics/progression",
    navLink: "/business/statistics",
  },
  {
    elementTitle: "Account",
    elementParent: "settings",
    defaultId: "settings/account",
    navLink: "/setting",
  },
  {
    elementTitle: "Deposit",
    elementParent: "settings",
    defaultId: "settings/deposit",
    navLink: "/setting",
  },
  {
    elementTitle: "Organizations",
    elementParent: null,
    defaultId: "organizations",
    navLink: "/organizations/",
  },
  {
    elementTitle: "Contacts",
    elementParent: null,
    defaultId: "contacts",
    navLink: "/contacts/",
  },
  {
    elementTitle: "Events",
    elementParent: "calendar",
    defaultId: "calendar/event",
    navLink: "/calendar",
  },
  {
    elementTitle: "Booking",
    elementParent: "calendar",
    defaultId: "calendar/booking",
    navLink: "/calendar",
  },
  {
    elementTitle: "Text",
    elementParent: "marketing",
    defaultId: "marketing/text",
    navLink: "/marketing",
  },
  {
    elementTitle: "Automation",
    elementParent: "marketing",
    defaultId: "marketing/automation",
    navLink: "/marketing",
  },
  {
    elementTitle: "Project Manager",
    elementParent: "business",
    defaultId: "business/projectManager",
    navLink: "/business/tools",
  },
  {
    elementTitle: "Forms & Funnels",
    elementParent: "business",
    defaultId: "business/formsFunnels",
    navLink: "/business/tools",
  },
  {
    elementTitle: "Birthday",
    elementParent: "statistics",
    defaultId: "statistics/birthday",
    navLink: "/business/statistics",
  },
  {
    elementTitle: "Billing",
    elementParent: "settings",
    defaultId: "settings/billing",
    navLink: "/setting",
  },
  {
    elementTitle: "Progression",
    elementParent: "settings",
    defaultId: "settings/progression",
    navLink: "/setting",
  },
];

module.exports = { defaultElements };