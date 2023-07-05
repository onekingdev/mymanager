import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardBody,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from 'reactstrap';
import MembershipTableList from './MembershipTableList';
import { createMembershipComponent } from '../../../elements/membership/membership'

function MembershipActionModal({ getSelectedHtmlElement }) {
  const [openAction, setOpenAction] = useState(false);
  const [selectedData, setSelectedData] = React.useState([]);
  const [preSelectedIds, setPreSelectedIds] = React.useState([]);

  const toggleAction = () => setOpenAction(!openAction);

  const handleSelect = (rows) => {
    const recordSelectedRows = rows?.selectedRows;
    let isSame = true;
    if(recordSelectedRows.length != selectedData.length) {
      isSame = false;
    } else {
      recordSelectedRows.forEach(row => {
        const filter = selectedData.filter(selected => selected._id == row._id);
        if(!filter) isSame = false;
      })
    }
    if(!isSame) {

      let selectedIds = [];
      recordSelectedRows.forEach(child => {
        selectedIds.push(child._id)
      })
      setPreSelectedIds(selectedIds);
      setSelectedData(recordSelectedRows);
    }

  };

  const setMembership = () => {
    const element = getSelectedHtmlElement();
    const parentComponent = element.parent();
    // const selectedIds = selectedData.map((product) => product.id);
    // const productThatNeedsToBeRemoved = parentComponent
    //   .get('components')
    //   .filter((component) => selectedIds.includes(component.get('attributes').productId));
    parentComponent.empty();
    selectedData.forEach((product) => {
      const productComponent = createMembershipComponent(product);
      parentComponent.append(productComponent);
      //productList.push(productComponent);
    });
    toggleAction();

  };
  useEffect(() => {
    let selectedIds = [];
    const element = getSelectedHtmlElement();
    selectedIds.push(element.get('attributes').membershipId);
    setPreSelectedIds(selectedIds);
  }, [])
  return (
    <>
      <Button color="primary" size="sm" className="inputstyle w-100" onClick={toggleAction}>
        SELECT Membership
      </Button>
      <Modal isOpen={openAction} toggle={toggleAction} size="lg" style={{ marginTop: '10%' }}>
        <ModalHeader toggle={toggleAction}>Select Membership</ModalHeader>
        <MembershipTableList handleSelect={handleSelect} preselectIds={preSelectedIds}/>
        <ModalFooter>
          <Button color="primary" onClick={setMembership}>
            Select
          </Button>
          <Button color="danger" onClick={toggleAction}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default MembershipActionModal;
