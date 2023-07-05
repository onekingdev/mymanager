import { useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Badge,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Form,
  FormText,
  FormFeedback,
  ListGroup,
  ListGroupItem,
  UncontrolledDropdown
} from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { editMyJournals } from '../../../../requests/myJournal/getMyJournal';
import '../../../../../src/assets/styles/jaornal.scss';
import { toast } from 'react-toastify';

const EditCategoryModal = ({ editModal, setEditModal, selectedCategory, setSideBarUpdateData, JournallistData }) => {
  const defaultValues = {
    title: ''
  };
  const {
    reset,
    setValue,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

  const [labelColor, setLabelColor] = useState('');

  // ** Effect
  // ** Set values with defined values
  useEffect(() => {
    setValue('title', selectedCategory.title ? selectedCategory.title : '');
    setLabelColor(selectedCategory?.labelColor);
  }, [selectedCategory]);
  const toggleEditModal = () => {
    setEditModal(!editModal);
  };

  const isNewCategoryName = (title) => {
    const categoryExists = JournallistData.some(
      (category) => category.title === title && category.title != selectedCategory.title
    );
    return categoryExists ? false : true;
  };

  const handleEditCategoryClick = (data) => {
    editMyJournals(selectedCategory._id, { title: data.title, labelColor: labelColor }).then(
      (response) => {
        setSideBarUpdateData(true);
      }
    );
    setEditModal(!editModal);
  };

  return (
    <Modal
      isOpen={editModal}
      toggle={() => setEditModal(!editModal)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalHeader toggle={() => setEditModal(!editModal)}>Create New Category</ModalHeader>
      <ModalBody className="p-2">
        <Form onSubmit={handleSubmit(handleEditCategoryClick)}>
          <div>
            <Label>Enter Category Name</Label>
            <Controller
              name="title"
              control={control}
              rules={{ required: true, validate: isNewCategoryName }}
              render={({ field: { value, onChange } }) => (
                <Input
                  autoFocus
                  placeholder="Enter Event Title"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            {errors.title && errors.title.type == 'required' && (
              <FormText color="danger" id="validation-add-board">
                Category name is required
              </FormText>
            )}
            {errors.title && errors.title.type == 'validate' && (
              <FormText color="danger" id="validation-add-board">
                That name is already taken! Please use other name
              </FormText>
            )}
          </div>
          <div>
            <Label className="mt-1">Select Label Color</Label>
            <Input
              name="labelColor"
              type="color"
              value={labelColor}
              defaultValue={'#ea5455'}
              size="lg"
              onChange={(e) => setLabelColor(e.target.value)}
              placeholder="color"
            />
          </div>
          <div className="d-flex justify-content-end mt-1">
            <Button color="primary" type="submit" className="me-1">
              Update
            </Button>
            <Button color="secondary" onClick={() => toggleEditModal()}>
              Cancel
            </Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default EditCategoryModal;
