// ** Reactstrap Imports
import { Card, CardBody, Button } from 'reactstrap'

// ** Third Party Components
import toast from 'react-hot-toast'
import { X } from 'react-feather'

const ToastError = () => {
  return (
    <Card>
      <CardBody>
        <div className='d-flex text-center align-items-center flex-column'>
          <X size='32' className='mb-1' />
          <h5 className='mb-1 fw-bolder'>Error</h5>
          <p className='mb-50'>Creates a notification with an animated error icon.</p>
          <Button color='danger' onClick={() => toast.error("This didn't work.")}>
            Error
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}

export default ToastError
