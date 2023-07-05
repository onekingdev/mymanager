import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Input, Label, Form, FormText } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { createMyJournal } from '../../../../requests/myJournal/getMyJournal';
import { addJournalCategoryAction, editJournalCategoryAction } from '../store/action';
import { toast } from 'react-toastify';

const CreateCategoryModal = ({ basicModal, setBasicModal,dispatch , store,isEdit,selectedCategory }) => {

  const [category,setCategory] = useState({labelColor:'#174AE7', title:''})
  const [validTitle,setValidTitle] = useState(false)

  const handleCreateCategoryClick = async () => {
    try {
      if(validTitle===false){
        toast.error('Title is taken. Please choose another one ')
        return
      }
      if(category.title === '' ){
        toast.error('Title is invalid')
        return
      }
      if(isEdit===true){
        dispatch(editJournalCategoryAction(category._id,category))
      }
      else{
        dispatch(addJournalCategoryAction(category))
      }
      
      
      setBasicModal(false);
    } catch (error) {
      toast.error('Error creating journal category!');
    }
  };

  const toggleBasicModal = () => {
    setBasicModal(!basicModal);
  };

  const isNewCategoryName = (title) => {
    if(isEdit===true){
      const categoryExists = store?.journalCategories?.some((category) => category.title === title && category._id !== selectedCategory._id);
      categoryExists ? setValidTitle(false) : setValidTitle(true);
    }
    else{
      const categoryExists = store?.journalCategories?.some((category) => category.title === title);
      categoryExists ? setValidTitle(false) : setValidTitle(true);
    }
    
  };

  const onChange = (e) =>{
    if(e.target.name ==='title'){
      isNewCategoryName(e.target.value)
    }
    
    
    setCategory({...category,[e.target.name]:e.target.value})
  }
  useEffect(()=>{
    if(isEdit===true){
      setCategory(selectedCategory)
    }
    else{
      setCategory({labelColor:'#174AE7', title:''})
    }
  },[isEdit,selectedCategory])
  return (
    <Modal
      isOpen={basicModal}
      toggle={() => setBasicModal(!basicModal)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalHeader toggle={() => setBasicModal(!basicModal)}>{isEdit === true ? 'Edit Category':'Create New Category'}</ModalHeader>
      <ModalBody className="p-2">
      <div>
            <Label>Enter Category Name</Label>
            <Input
                  autoFocus
                  placeholder="Enter Event Title"
                  value={category?.title}
                  onChange={onChange}
                  name='title'
                  valid={validTitle}
                  invalid={!validTitle}
                />
                {validTitle===false && <FormText color="danger" id="validation-add-board">
                That name is already taken! Please use other name
              </FormText>}
            
          </div>
          <div>
            <Label className="mt-1">Select Label Color</Label>
            <Input
              name="labelColor"
              type="color"
              value={category?.labelColor}
              defaultValue={'#174Ae7'}
              size="lg"
              onChange={onChange}
              placeholder="color"
            />
          </div>
          <div className="d-flex justify-content-end mt-1">
            <Button color="primary" type="submit" className="me-1" onClick={handleCreateCategoryClick}>
              {isEdit===true ? 'Save':'Create'}
            </Button>
            <Button color="secondary" onClick={() => toggleBasicModal()}>
              Cancel
            </Button>
          </div>
      </ModalBody>
    </Modal>
  );
};

export default CreateCategoryModal;
