// ** Icons Import

import { BarChart2 } from 'react-feather'
import { BsShop } from 'react-icons/bs'

export default [
      {
        id: 'statistics',
        title: 'Statistics',
        icon: <BarChart2 size={20} />,
        navLink: '/business/statistics',
        action: 'read',
        resource: 'statistics',
      },
]
