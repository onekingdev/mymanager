import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Input, Label, Form, FormText } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { createFormCategory } from '../../../requests/formCategory/formCategory';
import { toast } from 'react-toastify';
import Select from 'react-select';

const CreateCategoryModal = (props) => {
  const { basicModal, setBasicModal, categoryUpdate, setCategoryUpdate, categoryData } = props;
  const [labelColor, setLabelColor] = useState('#174AE7');
  const defaultValues = { name: '' };

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

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

  const handleCreateCategoryClick = async (data) => {
    try {
      const name = data?.name;
      const type = data?.type.value;
      let payload = { name, type, labelColor: labelColor };
      await createFormCategory(payload);
      const update = categoryUpdate + 1;
      setCategoryUpdate(update);
      setBasicModal(false);
    } catch (error) {
      console.log(error)
      toast.error('Error creating email template category!');
    }
  };

  const toggleBasicModal = () => {
    setBasicModal(!basicModal);
    reset();
  };

  const isNewCategoryName = (name) => {
    const categoryExists = categoryData.some((category) => category.name === name);
    return categoryExists ? false : true;
  };

  return (
    <Modal
      isOpen={basicModal}
      toggle={() => {setBasicModal(!basicModal); reset();}}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalHeader toggle={() => {setBasicModal(!basicModal); reset();}}>Create New Category</ModalHeader>
      <ModalBody className="p-2">
        <Form onSubmit={handleSubmit(handleCreateCategoryClick)}>
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
              defaultValue={'#174Ae7'}
              size="lg"
              onChange={(e) => setLabelColor(e.target.value)}
              placeholder="color"
            />
          </div>
          <div className="d-flex justify-content-end mt-1">
            <Button color="primary" type="submit" className="me-1">
              Create
            </Button>
            <Button color="secondary" onClick={() => toggleBasicModal()}>
              Cancel
            </Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default CreateCategoryModal;
