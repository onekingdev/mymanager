// ** Icons Import
import { File } from 'react-feather'
import { BiBuildings } from 'react-icons/bi'

export default [
    {
        id: 'organizations',
        title: 'Organizations',
        action: 'read',
        resource: 'organizations',
        icon: <BiBuildings size={20} />,
        badge: 'light-warning',
        navLink: '/organizations'
    }
]
