import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Table,
  Form
} from 'reactstrap';

// import tag table row
import TagTableRow from './TagTableRow';

// create new tag request api function import
import { useCreateNewTag, deleteMemberTagRQ } from '../../../../requests/contacts/member-contacts';

import { toast } from 'react-toastify';

const AddTagModal = ({ modal, setState, toggle, newTags, tags, refetch }) => {
  //console.log(newTags);
  // =========================

  // Create New tag

  // pass member tag data to db
  const { mutate } = useCreateNewTag();

  // new member tag data submit handler
  const handleSubmit = (event) => {
    event.preventDefault();

    const tag = event.target.tag.value;
    const memberTag = { tag: tag };

    const isTagExist = newTags.find((p) => p.tag.toLowerCase() === tag.toLowerCase());

    if (isTagExist) {
      event.target.reset();
      return toast.error('This tag already exists');
    } else {
      // pass data
      mutate(memberTag);

      // refetch data
      setTimeout(() => {
        refetch();
      }, 300);

      event.target.reset();
    }
  };

  // ========================

  // Delete Tag

  // Delete member Tag Modal state
  const [deleteModal, setDeleteModal] = useState({
    id: '',
    show: false
  });

  // delete member positon handler
  const deleteClienTag = (id) => {
    // We want no deletion of default tags

    if (!id) {
      // Hide Modal
      setDeleteModal({
        id: '',
        show: false
      });
      return toast.warning("It's a default tag. You can't delete this");
    }

    // delete request
    deleteMemberTagRQ(id);

    // Hide Modal
    setDeleteModal({
      id: '',
      show: false
    });

    // refetch data
    setTimeout(() => {
      refetch();
    }, 100);
  };

  return (
    <form>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create New Tag</ModalHeader>
        <ModalBody>
          <div className="mb-1">
            <Form onSubmit={handleSubmit}>
              <Label className="form-label" for="tag">
                New Tag
              </Label>
              <div className="d-flex gap-2">
                <Input style={{ width: '71%' }} id="tag" name="tag" placeholder="add new" />
                <Button type="submit" size="sm" color="primary">
                  Add Tag
                </Button>
              </div>
            </Form>
          </div>
        </ModalBody>

        <ModalFooter>
          <h5
            style={{
              marginRight: 'auto',
              marginTop: '7px',
              marginBottom: '10px'
            }}
          >
            Available Tags
          </h5>
          <Table size="sm">
            <thead>
              <tr>
                <th style={{ width: '20%' }}>SL</th>
                <th style={{ width: '62%' }}>Tag</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {newTags?.map((p, i) => (
                <TagTableRow
                  refetch={refetch}
                  setDeleteModal={setDeleteModal}
                  key={i + 1}
                  i={i}
                  tagId={p._id}
                  tag={p.tag}
                ></TagTableRow>
              ))}
            </tbody>
          </Table>

          <Button className="mt-2" color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Delete Modal */}

      <Modal
        toggle={() => {
          setDeleteModal({
            id: '',
            show: false
          });
        }}
        centered
        isOpen={deleteModal.show}
      >
        <ModalBody>
          <div>
            <h3>Are you sure to Delete ?</h3>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            size="sm"
            onClick={() => {
              setDeleteModal({
                id: '',
                show: false
              });
            }}
          >
            No
          </Button>
          <Button
            // disabled={deleteLoading}
            size="sm"
            color="primary"
            onClick={() => {
              deleteClienTag(deleteModal?.id);
            }}
          >
            {/* {deleteLoading ? 'Deleting...' : 'Yes'} */}
            Yes
          </Button>{' '}
        </ModalFooter>
      </Modal>
    </form>
  );
};

export default AddTagModal;
