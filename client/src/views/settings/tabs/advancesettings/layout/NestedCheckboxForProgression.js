import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Label, Input } from 'reactstrap';
import CheckboxForCategory from './CheckboxForCategory';
import {
  deleteProgressionForSmartListAction,
  setSmartListAction
} from '../../progressiontab/store/actions';

const NestedCheckboxForProgression = (props) => {
  const itemData = useSelector(state => state.progression.smartListRanking);
  let _progression = [];
  let _category = [];
  let _ranks = [];
  
  itemData.length!=0&&itemData.map(item => {
    _progression.push(item.progression);
    _category.push(item.category)
    _ranks.push(item.ranking)
  })

  const [checkedProgression, setCheckedProgression] = useState([]);
  const progressionList = useSelector((state) => state.progression.progressionList);

  const dispatch = useDispatch();
 
  const handleOnChange = (e) => {
    const _checkedProgression = [...checkedProgression];
    if (e.target.checked) {
      _checkedProgression.push(e.target.value);
    } else {
      const index = _checkedProgression.findIndex((progression) => progression == e.target.value);
      _checkedProgression.splice(index, 1);
      dispatch(deleteProgressionForSmartListAction(e.target.value));
    }
    setCheckedProgression(_checkedProgression);
  };
  return (
    <div>
      {progressionList.map((item, index) => {
        return (
          <div className="form-check form-check mt-1" key={index}>
            <Input
              type="checkbox"
              value={item._id}
              defaultChecked={(checkedProgression.includes(item._id)||_progression.includes(item._id))}
              onChange={(e) => handleOnChange(e)}
            />
            <Label className="form-check-label">Progression: {item.progressionName}</Label>
            {(checkedProgression.includes(item._id)||_progression.includes(item._id)) && (
              <CheckboxForCategory progression={item._id} _category={_category} _ranks={_ranks} category={item.categoryId} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default NestedCheckboxForProgression;
