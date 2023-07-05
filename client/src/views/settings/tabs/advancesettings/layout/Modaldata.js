import React, { useState, useEffect } from 'react';
import Select, { components } from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
// ** Utils
import { selectThemeColors } from '@utils';
import { getProgressionDatas } from '../store';
import { customInterIceptors } from '../../../../../lib/AxiosProvider';
import NestedCheckboxForProgression from './NestedCheckboxForProgression';
import { getTagsAction, getLeadsSourceAction } from '../../../../contacts/store/actions';

const API = customInterIceptors();

import { FormGroup, Row, Input, Col } from 'reactstrap';

// ** contactTypeOption Select Options

function Modaldata(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTagsAction());
    dispatch(getLeadsSourceAction());
  }, []);

  const totalCount = useSelector((state) => state.totalContacts);
  const tags = totalCount.tags;
  const leadSources = totalCount?.leadSource;
  const customStyles = {
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#174ae7'
    })
  };

  const progressionData = useSelector((state) => state.progression.smartListRanking);

  const contactTypeOption = [
    { value: 'Clients', label: 'Clients' },
    { value: 'Employee', label: 'Employee' },
    { value: 'Leads', label: 'Leads' },
    { value: 'Relationships', label: 'Relationships' },
    { value: 'Vendor', label: 'Vendor' }
  ];

  const statusOption = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' }
  ];

  let leadSourceOption = [];

  leadSources.length != 0 &&
    leadSources.map((item) => {
      const leadItem = { value: item.title, label: item.title };
      leadSourceOption.push(leadItem);
    });

  let tagOption = [];
  tags.lenght != 0 &&
    tags.map((item) => {
      const tagItem = { value: item.value, label: item.value };
      tagOption.push(tagItem);
    });

  // useEffect(() => {
  //   const progressionWithCategory = dispatch(getProgressionDatas());
  //   console.log('this is progression data with category', progressionWithCategory);
  // }, []);

  const { title, contactType, status, leadSource, tag, other, category, otherShop, changeTab } =
    props;
  let convertContactType = [];
  let convertTag = [];
  let convertStatus = [];
  let convertLeadSource = [];
  useEffect(() => {
    contactType.lenght != 0 &&
      contactType.map((item) => {
        const typeItem = { value: item, label: item };
        convertContactType.push(typeItem);
      });
    tag.lenght != 0 &&
      tag.map((item) => {
        const tagItem = { value: item, label: item };
        convertTag.push(tagItem);
      });
    status.lenght != 0 &&
      status.map((item) => {
        const statusItem = { value: item, label: item };
        convertStatus.push(statusItem);
      });
    leadSource.lenght != 0 &&
      leadSource.map((item) => {
        const leadItem = { value: item, label: item };
        convertLeadSource.push(leadItem);
      });
  }, []);

  const [modalInfo, setModalInfo] = useState({
    contactType: convertContactType,
    status: convertStatus,
    leadSource: convertLeadSource,
    tag: convertTag,
    progression: progressionData,
    other: other,
    category: category,
    otherShop: otherShop,
    title: title
  });
  const _progression = props.progression;
  React.useEffect(() => {
    changeTab(modalInfo);
  }, [modalInfo]);

  return (
    <>
      <div>
        <h5>Title</h5>
        <FormGroup>
          <Input
            id="labelForm"
            name="formlabel"
            placeholder="Enter Details"
            type="text"
            value={modalInfo.title}
            onChange={(data) => {
              setModalInfo((prevModalInfo) => ({ ...prevModalInfo, title: data.target.value }));
            }}
          />
        </FormGroup>

        <h5>CONTACT TYPE</h5>
        <Row>
          <Col sm="12" className="mb-1">
            <Select
              isMulti
              id="task-tags"
              className="react-select"
              classNamePrefix="select"
              isClearable={false}
              options={contactTypeOption}
              // theme={{color:'#174ae7'}}
              styles={customStyles}
              value={modalInfo.contactType}
              onChange={(data) => {
                setModalInfo((prevModalInfo) => ({
                  ...prevModalInfo,
                  contactType: data !== null ? [...data] : []
                }));
              }}
            />
          </Col>
        </Row>

        <h5>STATUS</h5>
        <Row>
          <Col sm="12" className="mb-1">
            <Select
              isMulti
              id="task-tags"
              className="react-select"
              classNamePrefix="select"
              isClearable={false}
              options={statusOption}
              styles={customStyles}
              value={modalInfo.status}
              onChange={(data) => {
                setModalInfo((prevModalInfo) => ({
                  ...prevModalInfo,
                  status: data !== null ? [...data] : []
                }));
              }}
            />
          </Col>
        </Row>
        <h5>LEAD SOURCE</h5>
        <Row>
          <Col sm="12" className="mb-1">
            <Select
              isMulti
              id="task-tags"
              className="react-select"
              classNamePrefix="select"
              isClearable={false}
              options={leadSourceOption}
              styles={customStyles}
              value={modalInfo?.leadSource}
              onChange={(data) => {
                setModalInfo((prevModalInfo) => ({
                  ...prevModalInfo,
                  leadSource: data !== null ? [...data] : []
                }));
              }}
            />
          </Col>
        </Row>

        <h5>TAG</h5>
        <Row>
          <Col sm="12" className="mb-1">
            <Select
              isMulti
              id="task-tags"
              className="react-select"
              classNamePrefix="select"
              isClearable={false}
              options={tagOption}
              styles={customStyles}
              value={modalInfo.tag}
              onChange={(data) => {
                setModalInfo((prevModalInfo) => ({
                  ...prevModalInfo,
                  tag: data !== null ? [...data] : []
                }));
              }}
            />
          </Col>
        </Row>
        <h5>PROGRESSION</h5>
        <Row>
          <Col sm="12" className="mb-1">
            {/* <Select
              isMulti
              id="task-tags"
              className="react-select"
              classNamePrefix="select"
              isClearable={false}
              options={progressionOption}
              theme={selectThemeColors}
              value={modalInfo.progression}
              onChange={(data) => {
                setModalInfo((prevModalInfo) => ({
                  ...prevModalInfo,
                  progression: data !== null ? [...data] : []
                }));
              }}
            /> */}

            <NestedCheckboxForProgression item={_progression} />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Modaldata;
