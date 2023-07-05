// ** React Imports
import { useParams } from 'react-router-dom'
import { Fragment, useState } from 'react'

// ** myforms App Component Imports
import Sidebar from './components/Sidebar'

// ** Third Party Components

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'


// ** Styles
import '@styles/react/apps/app-email.scss'
import Table from './components/Table'


const Expired = () => {
    // ** States
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
        <Fragment>
            <Sidebar
                sidebarOpen={sidebarOpen}
            />
            <div className="content-right">
                <div className="content-body">
                    <div>
                        <Table />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Expired
