// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Table, Badge } from 'reactstrap'

//** Function Imports 
import activityTimeDifference from "./ActivityTimeDifference";

//** Redux Imports
import { useSelector } from 'react-redux';

const LastSeen = () => {

    let projectLastSeenData = useSelector((state) => state.projectManagement.projectLastSeen);

    return (
        <Table responsive>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Last Viewed</th>
                </tr>
            </thead>
            <tbody>
                {projectLastSeenData?.map((lastSeenData) => {
                    return (
                        <tr>
                            <td>
                                <Avatar color="light-primary" icon={`${lastSeenData?.userName.slice(0, 1).toUpperCase()}`} id={`project-activity-tooltip`} />
                                <span className='ps-1 align-middle fw-bold'>{(lastSeenData?.userName).toUpperCase()}</span>
                            </td>
                            <td>
                                <Badge pill color='light-primary' className='me-1'>
                                    {activityTimeDifference(lastSeenData?.timestamp)}
                                </Badge>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default LastSeen
