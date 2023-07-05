import React from 'react'
// ** Custom Components
import Avatar from '@components/avatar'


const GuestsModalTableRow = ({ guest }) => {

    const renderClient = (guest) => {
        const stateNum = Math.floor(Math.random() * 6),
            states = [
                'light-success',
                'light-danger',
                'light-warning',
                'light-info',
                'light-primary',
                'light-secondary'
            ],
            color = states[stateNum]

        if (guest?.photo) {
            return (
                <Avatar
                    img={guest.photo}
                    width="32"
                    height="32"
                />
            )
        } else {
            return (
                <Avatar
                    color={color || 'primary'}
                    content={guest.name || 'John Doe'}
                    initials
                />
            )
        }
    }

    return (
        <div className="d-flex justify-content-between mb-1">
            <div className="d-flex align-items-center">
                {renderClient(guest)}
                <h3 className="ms-75 mb-0 font-medium-1">{guest.email}</h3>
            </div>
        </div>
    )
}

export default GuestsModalTableRow
