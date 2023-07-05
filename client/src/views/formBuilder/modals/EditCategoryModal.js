import { useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Button,
  Input,
  Label,
  Form,
  FormText,
} from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { updateFormCategory } from '../../../requests/formCategory/formCategory';
import { toast } from 'react-toastify';
import Select from 'react-select';

const EditCategoryModal = (props) => {
  const { editModal, setEditModal, selectedCategory, categoryUpdate, setCategoryUpdate, categoryData } =
    props;
  const defaultValues = {
    name: ''
  };

  const categoryTypes = [
    {
      value: 'sales',
      label: 'Sales'
    },
    {
      value: 'email',
      label: 'Email'
    },
    {
      value: 'leads',
      label: 'Leads'
    },
    {
      value: 'forms',
      label: 'Forms'
    },
    {
      value: 'website',
      label: 'Website'
    }
  ];

  const [labelColor, setLabelColor] = useState('');

  const {
    reset,
    setValue,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

  useEffect(() => {
    setValue('name', selectedCategory.name ? selectedCategory.name : '');
    const type_value = categoryTypes.find(item=>item.value === selectedCategory.type);
    setValue('type', selectedCategory.type ? type_value : '');
    setLabelColor(selectedCategory?.labelColor);
  }, [selectedCategory]);
  const toggleEditModal = () => {
    setEditModal(!editModal);
    reset();
  };

  const isNewCategoryName = (name) => {
    const categoryExists = categoryData.some(
      (category) => category.name === name && category.name != selectedCategory.name
    );
    return categoryExists ? false : true;
  };

  const handleEditCategoryClick = async (data) => {
    try{
      await updateFormCategory({id:selectedCategory._id, name: data?.name, labelColor: labelColor});
      const update = categoryUpdate + 1;
      setCategoryUpdate(update);
      setEditModal(!editModal);
    } catch {
      toast.error('Error updating email template category!');
    }
  };

  return (
    <Modal
      isOpen={editModal}
      toggle={() => {setEditModal(!editModal); reset();}}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalHeader toggle={() => {setEditModal(!editModal); reset();}}>Update Category</ModalHeader>
      <ModalBody className="p-2">
        <Form onSubmit={handleSubmit(handleEditCategoryClick)}>
          <div>
            <Label>Enter Category Name</Label>
            <Controller
              name="name"
              control={control}
              rules={{ required: true, validate: isNewCategoryName }}
              render={({ field: { value, onChange } }) => (
                <Input
                  autoFocus
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            {errors.name && errors.name.type == 'required' && (
              <FormText color="danger" id="validation-add-board">
                Category name is required
              </FormText>
            )}
            {errors.name && errors.name.type == 'validate' && (
              <FormText color="danger" id="validation-add-board">
                That name is already taken! Please use other name
              </FormText>
            )}
          </div>
          <div>
            <Label className="mt-1">Select Category Type</Label>
            <Controller
              name="type"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={categoryTypes}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            {errors.type && errors.type.type == 'required' && (
              <FormText color="danger" id="validation-add-board">
                Category type is required
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
