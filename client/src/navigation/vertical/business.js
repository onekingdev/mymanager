// ** Icons Import
import { PieChart, Minimize, BarChart2, Trello, User } from 'react-feather';
import { GrCertificate } from 'react-icons/gr';
import { FaBirthdayCake } from 'react-icons/fa';
import { MdOutlineBusinessCenter } from 'react-icons/md';
import { AiOutlineCalculator, AiOutlineForm } from 'react-icons/ai';

export default [
  {
    id: 'business',
    title: 'Business Tools',
    icon: <MdOutlineBusinessCenter size={20} />,
    action: 'read',
    resource: 'business',
    navLink: '/business/tools',
    // children: [
    //   {
    //     id: 'projectManager',
    //     title: 'Project Manager',
    //     icon: <Trello size={20} />,
    //     navLink: '/business/projectmanager',
    //     action: 'manage',
    //     resource: 'business/projectManager',
    //   },
    //   {
    //     id: 'formBuilder',
    //     title: 'Forms & Funnels',
    //     icon: <AiOutlineForm size={20} />,
    //     navLink: '/form-funnel',
    //     action: 'manage',
    //     resource: 'formBuilder',
    //   },
      // {
      //   id: 'userCourses',
      //   title: 'My Courses',
      //   icon: <User size={20} />,
      //   navLink: '/mycma/usercourses',
      //   action: 'manage',
      //   resource: 'mycma/myaccount',
      // },
      // {
      //   id: 'retention',
      //   title: 'Retention',
      //   icon: <PieChart size={20} />,
      //   navLink: '/business/retention',
      //   action: 'manage',
      //   resource: 'business/retention',
      // },
      // {
      //   id: 'birthday',
      //   title: 'Birthday',
      //   icon: <FaBirthdayCake size={20} />,
      //   navLink: '/business/birthday',
      //   action: 'manage',
      //   resource: 'business/birthday',
      // },
      // {
      //   id: 'expired',
      //   title: 'Expired',
      //   icon: <Minimize size={20} />,
      //   navLink: '/business/expired',
      //   action: 'manage',
      //   resource: 'business/expired',
      // },
      // {
      //   id: 'statistics',
      //   title: 'Statistics',
      //   icon: <BarChart2 size={20} />,
      //   navLink: '/business/statistics',
      //   action: 'manage',
      //   resource: 'business/statistics',
      // },
      // {
      //   id: 'certifications',
      //   title: 'Progression',
      //   icon: <GrCertificate size={20} />,
      //   navLink: '/business/progression',
      //   action: 'manage',
      //   resource: 'business/certifications',
      // }
    //]
  }
];
