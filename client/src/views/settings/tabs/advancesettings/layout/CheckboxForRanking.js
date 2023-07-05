import { Label, Input } from 'reactstrap';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { customInterIceptors } from '../../../../../lib/AxiosProvider';
import {
  addRankForSmartListAction,
  deleteRankForSmartListAction
} from '../../progressiontab/store/actions';
const API = customInterIceptors();
const CheckboxForRanking = (props) => {
  const [checkedRanking, setCheckedRanking] = useState([]);
  const [allRanks, setAllRanks] = useState([]);
  const progression = props.progression;
  const category = props.category;
  const ranks = props._ranks
  useEffect(() => {
    const getRanks = async () => {
      const response = await API.get(`/rank-category/category_rank_info/${category}`);
      if (response.status == 200) setAllRanks(response.data.data);
    };
    getRanks().catch(console.error);

  }, []);
  const dispatch = useDispatch();
  const handleOnChange = (e) => {
    const _checkedRanking = [...checkedRanking];
    if (e.target.checked) {
      _checkedRanking.push(e.target.value);
      dispatch(
        addRankForSmartListAction({
          progression: progression,
          category: category,
          ranking: e.target.value
        })
      );
    } else {
      const index = _checkedRanking.findIndex((Ranking) => Ranking == e.target.value);
      _checkedRanking.splice(index, 1);
      dispatch(
        deleteRankForSmartListAction({
          progression: progression,
          category: category,
          ranking: e.target.value
        })
      );
    }
    setCheckedRanking(_checkedRanking);
  };
  return (
    <div className="ms-2">
      {allRanks.length != 0 &&
        allRanks.map((item, index) => {
          return (
            <div className="form-check form-check mt-1" key={index}>
              <Input
                type="checkbox"
                value={item._id}
                defaultChecked={(checkedRanking.includes(item._id) || ranks.includes(item._id))}
                onChange={(e) => handleOnChange(e)}
              />
              <Label className="form-check-label d-flex justify-content-around">
                <span>Rank: </span>
                <span>Name - {item.rankName}</span> <span>Order - {item.rankOrder}</span>{' '}
                <span>
                  Image - <img src={item.rankImage} width="24px" />
                </span>
                <span>
                  Color -{' '}
                  <span
                    style={{ width: '24px', height: '24px', backgroundColor: `${item.Color}` }}
                  ></span>
                </span>
              </Label>
            </div>
          );
        })}
    </div>
  );
};

export default CheckboxForRanking;
