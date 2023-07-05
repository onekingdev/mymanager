// ** Components
import About from './membershipFormSteps/About';

import { Offcanvas,OffcanvasHeader,OffcanvasBody } from 'reactstrap';

const AddCourseModal = (props) => {
  // ** Props
  const { centeredModal, setCenteredModal,shopStore } = props;

  return (
    <Offcanvas
      direction="end"
      scrollable
      style={{minWidth:"35vw"}}
      isOpen={centeredModal}
      toggle={() => setCenteredModal(!centeredModal)}
    >
      <OffcanvasHeader toggle={() => setCenteredModal(!centeredModal)}>
       Add Course
      </OffcanvasHeader>
      <OffcanvasBody>
      <About shopStore={shopStore} setCenteredModal={setCenteredModal} centeredModal={centeredModal}/>
      </OffcanvasBody>
    </Offcanvas>



  )
};

export default AddCourseModal;
