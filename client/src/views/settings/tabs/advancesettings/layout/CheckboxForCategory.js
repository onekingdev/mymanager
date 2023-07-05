import { Label, Input } from 'reactstrap';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CheckboxForRanking from './CheckboxForRanking';
import { deleteCategoryForSmartListAction } from '../../progressiontab/store/actions';



const CheckboxForCategory = (props) => {
  const [checkedCategory, setCheckedCategory] = useState([]);

  const dispatch = useDispatch();
  let _category=[];
  _category = props._category?props._category:[];
  const progression = props.progression;
  const category = props.category;
  
  
  const handleOnChange = (e) => {
    const _checkedCategory = [...checkedCategory];
    if (e.target.checked) {
      _checkedCategory.push(e.target.value)
    } else {
      const index = _checkedCategory.findIndex(Category => Category == e.target.value)
      _checkedCategory.splice(index, 1)
      dispatch(deleteCategoryForSmartListAction(e.target.value))
    }
    setCheckedCategory(_checkedCategory);

  }
  return (
    <div className="ms-2">
      {category.map((item, index) => {
        return (
          <div className="form-check form-check mt-1" key={index}>
            <Input type="checkbox" value={item._id} defaultChecked={(checkedCategory.includes(item._id)||_category.includes(item._id))} onChange={(e) => handleOnChange(e)} />
            <Label className="form-check-label">Category: {item.categoryName}</Label>
            {(checkedCategory.includes(item._id)||_category.includes(item._id))&&<CheckboxForRanking _ranks={props._ranks} progression={progression} category={item._id} />}
          </div>
        );
      })}
    </div>
  );
};

export default CheckboxForCategory;
