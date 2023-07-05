import { useCallback, useState, useEffect, useMemo, useRef } from 'react';
import ReactFlow, { addEdge, ReactFlowProvider, useReactFlow, Background, Controls, Position } from 'react-flow-renderer';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Input, Button, Label } from 'reactstrap';
import 'reactflow/dist/style.css';
import EditContactSideBar from './components/EditContactSideBar';
import AddNewActionSideBar from './components/AddNewActionSideBar';
import ShowDetailModal from './components/ShowDetailModal';
import CustomNode from './components/CustomNode';
import { setOffEditableContactAction, getAllAutomations, setOffShowAddNewActionSideBarAction, saveAutomationAction, initEditAction, getSmartList, getPhoneNum } from '../store/actions'
import { RotateCcw } from 'react-feather';
import AddText from "./components/addNewSideBars/AddText";
import AddEmail from './components/addNewSideBars/AddEmail';
import AddNotification from './components/addNewSideBars/AddNotification';
import AddAutomation from './components/addNewSideBars/AddAutomation';
import Select, { components } from 'react-select';
import { customInterIceptors } from '../../../../lib/AxiosProvider';
const API = customInterIceptors();

const rfStyle = {
  backgroundColor: 'white',
  grid: 99999,
};


const ChartFlow = (props) => {

  const dispatch = useDispatch();
  const WIDTH = 100;
  const HEIGHT = 170;
  const selectedAutomation = useSelector(state => state.automation.selectedAutomation);
  const { isEditContact, showAddNewSideBar, showDetailId, editActionId, isEditModal, editActionType } = useSelector(state => state.automation);
  const [automationName, setAutomationName] = useState(selectedAutomation.automationName);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState('');
  const [userName, setUserName] = useState(selectedAutomation.userName ? { value: selectedAutomation.userName + ' <' + selectedAutomation.userEmail + '>', label: selectedAutomation.userName + ' <' + selectedAutomation.userEmail + '>' } : null);
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState(selectedAutomation.userPhone ? { value: selectedAutomation.userPhone, label: selectedAutomation.userPhone } : null);
  const [selectUsers, setSelectUsers] = useState([]);
  const [phoneNumOptions, setPhoneNumOptions] = useState([]);
  const [isShowEditModal, setIsShowEditModal] = useState(isEditModal);
  const toggleEditSidebar = () => {
    setIsShowEditModal(false);
    dispatch(initEditAction())
  }
  useEffect(() => {
    setIsShowEditModal(isEditModal)
  }, [isEditModal])
  const [detailAction, setDetailAction] = useState(null);
  useEffect(() => {
    const detailActionShow = selectedAutomation.actions.find(item => item.id == showDetailId);
    setDetailAction(detailActionShow)
  }, [showDetailId])

  const actionsData = selectedAutomation.actions;


  useEffect(() => {
    if (actionsData.length > 0) {
      const treeObj = {};

      for (let item of actionsData) {
        treeObj[item.id] = { ...item, children: [], leafCount: 0, posX: 0, posY: HEIGHT };
      }

      for (let item of actionsData) {
        if (item.parentId == "0") continue;
        treeObj[item.parentId].children.push(item.id);
      }

      function calcLeaf(id) {
        if (treeObj[id].isLast) {
          treeObj[id].leafCount = 1;
          return 1;
        }

        let result = 0;
        for (let item of treeObj[id].children) {
          result += calcLeaf(item);
        }
        treeObj[id].leafCount = result;
        return result;
      }

      calcLeaf(actionsData[0].id);

      function calcPos(id) {
        if (treeObj[id].isLast) {
          return;
        }
        if (treeObj[id].children.length === 1) {
          const childId = treeObj[id].children[0];
          treeObj[childId].posX = 0;
          treeObj[childId].posY = HEIGHT;
          calcPos(childId);
          return;
        }
        const leftId = treeObj[id].children[0];
        const rightId = treeObj[id].children[1];

        calcPos(leftId);
        calcPos(rightId);

        treeObj[leftId].posX =
          (-(treeObj[leftId].leafCount + treeObj[rightId].leafCount) * WIDTH) / 2;
        treeObj[leftId].posY = HEIGHT;

        treeObj[rightId].posX =
          ((treeObj[leftId].leafCount + treeObj[rightId].leafCount) * WIDTH) / 2;
        treeObj[rightId].posY = HEIGHT;

      }

      calcPos(actionsData[0].id);

      const result = [{ id: '0', data: { id: '0', actionType: 'editContact', isLast: false, label: 'EditContact', content: 'EditContact', }, type: 'circle', targetPosition: Position.Top, position: { x: 0, y: -500 } }];
      for (let key in treeObj) {
        result.push({
          id: treeObj[key].id,
          data: treeObj[key],
          position: { x: treeObj[key].posX, y: treeObj[key].posY },
          parentNode: treeObj[key].parentId,
          type: "circle",
        });
      }

      setNodes(result)
    } else {
      setNodes([{ id: '0', data: { id: '0', actionType: 'editContact', isLast: true, label: 'EditContact', content: 'EditContact', }, type: 'circle', position: { x: 0, y: -500 } }])
    }
  }, [actionsData])

  const [actionSum, setActionSum] = useState(0)

  useEffect(() => {
    let actionCount = 0;
    if (actionsData.length > 0) {
      let edgesData = [];
      actionsData.map((item, index) => {


        const edgeItem = {
          id: item.id + '-' + item.parentId,
          source: item.parentId,
          target: item.id
        }
        // console.log(edgeItem)
        edgesData.push(edgeItem)
        if (item.actionType != 'condition') actionCount++;

      })
      setEdges(edgesData)
      setActionSum(actionCount)
    }
  }, [actionsData])


  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );


  const nodeTypes = { circle: CustomNode }


  const toggleContactSideBar = () => {
    dispatch(setOffEditableContactAction())
  }

  const toggleNewActionSideBar = () => {
    dispatch(setOffShowAddNewActionSideBarAction())
  }

  const save = () => {
    const _selectedAutomation = { ...selectedAutomation, automationName: automationName, userName: user, userEmail: userEmail, userPhone: userPhone.label }
    dispatch(saveAutomationAction(_selectedAutomation));
    // dispatch(getAllAutomations());
    props.goBackToTable()

  };


  const { zoomIn, zoomOut } = useReactFlow();

  useEffect(() => {
    dispatch(getSmartList());
    // if (selectedAutomation != null) {
    //   setShowingAutomation(selectedAutomation);
    //   setAutomationName(selectedAutomation.automationName);
    // }
  }, []);


  const auth = useSelector(state => state.auth.userData);

  const contacts = useSelector(state => state.totalContacts.contactList.list);

  // const getPhones = (id) => async () => {
  //   try {
  //     const data = await API.post('/deposit/getPhoneNums', { id: id })
  //     console.log(data)
  //   } catch (error) {

  //   }
  // }


  useEffect(() => {
    const relations = contacts.filter(item => item.contactType.findIndex(i => i == '64359ae6d31c66dec6acf2c1') != -1)
    let froms = [];
    const myInfo = { id: auth.id, name: auth.fullName, email: auth.email, phone: auth.phone == '' ? [] : [auth.phone] }
    froms.push(myInfo)
    if (relations.length > 0) {
      relations.map(relation => {
        const newContact = { id: relation._id, name: relation.fullName, email: relation.email, phone: relation.phone == '' ? [] : [relation.phone] }
        froms.push(newContact)
      })
    };

    setUsers(froms);

  }, []);


  useEffect(() => {
    let selectUserOptions = [];
    if (users.length > 0) {
      users.map(user => {
        selectUserOptions.push({ value: user.id, label: user.name + ' <' + user.email + '>' })
      })
    }
    setSelectUsers(selectUserOptions);
  }, [users])

  const onSetUserName = (e) => {
    setUserName(e)
    let currentUser = users.find(i => i.id == e.value);
    setUser(currentUser.name)
    setUserPhone(null)

    setUserEmail(currentUser.email);

    API.post('/deposit/getPhoneNums', { id: e.value })
      .then(res => {
        let phoneNums = [];
        if (currentUser.phone[0] != undefined) phoneNums.push({ value: currentUser.phone[0], label: currentUser.phone[0] })

        if (res.data.success) {

          if (res.data.data != null && res.data.data.purchased_Num) {
            phoneNums.push({ value: res.data.data.purchased_Num, label: res.data.data.purchased_Num })
          }
          if (res.data.data != null && res.data.data.purchased_Num2) {
            phoneNums.push({ value: res.data.data.purchased_Num2, label: res.data.data.purchased_Num2 })
          }
        }

        setPhoneNumOptions(phoneNums)
      })

  }

  return (
    <>
      <Row className="m-1 pb-1 border-bottom" >

        <Col sm="3" lg="3" md="3" style={{ zIndex: 999 }}>
          <Label><b>SEND FROM:</b></Label>
          <Select
            id="task-tags"
            className="react-select"
            classNamePrefix="select"
            placeholder='Select User...'

            isClearable={false}
            options={selectUsers}
            // theme={selectThemeColors}
            // styles={customStyles}
            defaultValue={userName}
            onChange={(e) => {
              onSetUserName(e);
            }}
          />
        </Col>
        {/* <Col sm="3" lg="3" md="3">
          <Input
            type="text"
            id="basicInput"
            placeholder="Enter User Email"
            value={userEmail}
            disabled
          />
        </Col> */}
        <Col sm="2" lg="2" md="2" style={{ zIndex: 999 }}>
          <Label><b>PHONE:</b></Label>
          <Select
            id="task-tags"
            className="react-select"
            classNamePrefix="select"
            placeholder='Select SMS...'
            isClearable={false}
            options={phoneNumOptions}
            // theme={selectThemeColors}
            // styles={customStyles}
            defaultValue={userPhone}
            onChange={(e) => {
              setUserPhone(e);
            }}
          />
        </Col>
        <Col sm="3" lg="3" md="3">
          <Label><b>AUTOMATION NAME:</b></Label>

          <Input
            type="text"
            id="basicInput"
            placeholder="Enter Automation Name"
            value={automationName}
            onChange={(e) => setAutomationName(e.target.value)}
          />
        </Col>
        <Col sm="2" lg="2" md="2" ></Col>
        <Col sm="1" lg="1" md="1" >
          <Button color="success" style={{ marginTop: '22px', paddingLeft: 'inherit' }} block outline onClick={() => save()}>
            Save
          </Button>
        </Col>
        <Col sm="1" lg="1" md="1" style={{ marginTop: '22px', paddingLeft: 'inherit' }}>
          <Button color="primary" block outline onClick={() => props.goBackToTable()}>
            Back
          </Button>
        </Col>

      </Row>
      <div style={{ background: 'white', position: 'absolute', top: '200px', left: '30px', textAlign: 'center', zIndex: '100', width: '80px', height: '120px', textAlign: 'center' }}>
        <label className='text-uppercase'>Actions</label>
        <div style={{
          border: '1px solid blue',
          borderRadius: '50%',
          width: "60px",
          height: "60px",
          margin: 'auto'
        }}>
          <p style={{ fontSize: '24px', padding: '19px 0px' }}>{actionSum}</p>
        </div>

        <div className="d-flex justify-content-around gaps border-1 mt-1 w-70">
          <div
            style={{
              border: '1px solid black',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              cursor: 'pointer'
            }}
            onClick={() => zoomIn({ duration: 800 })}
          >
            <p style={{ fontSize: '18px', textAlign: 'center' }} className="font-weight-bold">
              +
            </p>
          </div>
          <div
            style={{
              border: '1px solid black',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              marginLeft: '3px',
              cursor: 'pointer'
            }}
            onClick={() => zoomOut({ duration: 800 })}
          >
            <p style={{ fontSize: '18px', textAlign: 'center' }} className="font-weight-bold">
              -
            </p>
          </div>
          {/* <div
            style={{
              border: '1px solid black',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              marginLeft: '3px',
              cursor: 'pointer'
            }}
          // onClick={handleRotation}
          >
            <p style={{ fontSize: '14px', textAlign: 'center' }} className="font-weight-bold">
              <RotateCcw size={13} style={{ marginBottom: '5px' }} />
            </p>
          </div> */}
        </div>
      </div>

      <div style={{ width: '100vm', height: '100vh', margin: 'auto', background: 'white' }}>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          fitView
          snapToGrid={true}
          nodeTypes={nodeTypes}
          minZoom={0.5}
          maxZoom={2}
        >
          <Background />
        </ReactFlow>
      </div>
      {isEditContact && <EditContactSideBar open={isEditContact} toggleSidebar={toggleContactSideBar} />}
      <AddNewActionSideBar open={showAddNewSideBar} toggleSidebar={toggleNewActionSideBar} />
      {showDetailId != '' && <ShowDetailModal actionId={showDetailId} />}

      {isShowEditModal && editActionType == 'text' && <AddText open={isShowEditModal} toggleSidebar={toggleEditSidebar} />}
      {isShowEditModal && editActionType == 'notification' && <AddNotification open={isShowEditModal} toggleSidebar={toggleEditSidebar} />}
      {isShowEditModal && editActionType == 'email' && <AddEmail open={isShowEditModal} toggleSidebar={toggleEditSidebar} />}
      {isShowEditModal && editActionType == 'automation' && <AddAutomation open={isShowEditModal} toggleSidebar={toggleEditSidebar} />}
    </>
  );
}

const ChartFlowWithProvider = (props) => {
  return (
    <ReactFlowProvider>
      <ChartFlow goBackToTable={props.goBackToTable} />
    </ReactFlowProvider>
  )
}
export default ChartFlowWithProvider;
