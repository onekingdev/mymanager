import { MdOutlineSwitchAccount } from 'react-icons/md';
import { contactsAction, updateStageAction } from '../../store/actions';
import { Input } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const KanbanStage = (props) => {
  const { stage, store } = props;

  // ** States
  const [title, setTitle] = useState(stage.title);
  // ** Variables
  const dispatch = useDispatch();

  // ** Effect
  useEffect(() => {
    setTitle(stage?.title);
  }, [stage?.title]);

  const boardRenderCount = store?.filter(
    (leadContact) => leadContact?.stage === stage.title
  ).length;

  return (
    <div className="lead-board-title-container d-flex align-items-center justify-content-between">
      <div className="align-items-center board-header">
        <Input
          className="board-title border-0 bg-transparent input-lg task-field"
          // value={title.toUpperCase()}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value.toLocaleUpperCase());
          }}
          onKeyDown={(e) => {
            if (e.code == 'Enter') {
              let payload = { value: e.target.value, color: stage.color };
              dispatch(updateStageAction(stage.id, payload));
              dispatch(contactsAction());
            }
          }}
          style={{ color: 'black' }}
        />
        <div className="ms-1 cursor-grab" style={{ marginBottom: '0.3rem' }}>
          <MdOutlineSwitchAccount size={16} className="me-1" />
          {boardRenderCount} Leads
        </div>
      </div>

      <svg class="arrow" width="16" height="56" xmlns="http://www.w3.org/2000/svg" role="img">
        <g fill="none" fill-rule="evenodd">
          <path class="arrow__right" fill="#F7F7F7" d="M0 0h16v56H0z"></path>
          <path class="arrow__border" fill="#E5E5E5" d="M1 0l8 28-8 28H0V0z"></path>
          <path class="arrow__left" fill="#F7F7F7" d="M0 1l8 27-8 27z"></path>
        </g>
      </svg>
    </div>
  );
};

export default KanbanStage;
