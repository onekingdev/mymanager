// ** React Imports
import React from 'react';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Third Party Component
import { Eye } from 'react-feather';
import Chart from 'react-apexcharts';

import { useAddContacts, useUpdateContacts } from '@src/requests/contacts/contacts';

// ** Icons Imports
import { MoreVertical, FileText, Trash2, Archive, Edit } from 'react-feather';
import { selectThemeColors } from '@utils';
// import { ColourOption, colourOptions } from './docs/data';

import Select, { components, StylesConfig } from 'react-select';
import styled from 'styled-components';

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Tooltip,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Button,
  Table
} from 'reactstrap';

// import Note from '../Note';

export const useColumns = () => {
  const statusObj = {
    loss: 'light-danger',
    gain: 'light-success'
  };

  const columns = [
    {
      name: 'Progression Name',
      cell: (row) => row.current,
      width: '220',
      selector: ({ current }) => current
    },
    {
      name: 'Rank Name',
      selector: ({ beltColor, rankName }) => (beltColor, rankName),
      
      cell: (row) => (
        <div>
          <img
            src={row.beltColor}
            alt=""
            style={{
              width: '50px',
              height: '30px',
              padding: '5px'
            }}
          />
          <span style={{ paddingLeft: '10px' }}>{row.rankName || ''}</span>
        </div>
      )
    },
    {
      name: 'Category',
      selector: ({category}) => category,
      cell: (row) => ( 
        <div>
          <span style={{ paddingLeft: '10px' }}>{row.category}</span>
        </div>
      )
    },
    {
      name: 'Growth',
      selector: ({ gain, loss }) => ({ gain, loss }),
      cell: (row) => (
        <div style={{marginLeft: "20p"}}>
          {row.gain && (
            <Badge className="text-capitalize me-1" color="light-success" pill>
              {row.gain}+
            </Badge>
          )}
          {row.loss && (
            <Badge className="text-capitalize" color="light-danger" pill>
              {row.loss}-
            </Badge>
          )}
        </div>
      )
    },

    {
      name: 'Total',
      selector: ({ graph }) => graph,
      cell: (row) => (
        <div className="table-rating">
          <span>0</span>
        </div>
      )
    }
  ];
  return {
    columns
  };
};

const ExpandableTable = () => {
  return (
    <div className="expandable-content" style={{ marginLeft: '5%', marginRight: '10%' }}>
      <Table className="employee-sub-menu-table">
        <thead>
          <tr style={{ height: '10px !important' }}>
            <th>Task Name</th>
            <th>Type</th>
            <th>Task</th>
            <th>Description</th>
            <th>Note</th>
            <th>Action</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>
              <p style={{ fontSize: '13px', fontWeight: '600' }}>sdkjadkla</p>
            </th>
            <th style={{ fontSize: '13px', fontWeight: '400' }}>asdsadasdsa</th>
            <th>
              <Button
                color="primary"
                outline
                className="btn btn-sm"
                style={{ marginLeft: '-10px' }}
              >
                View
              </Button>
            </th>
            <th>
              <p className="desEmpText">sadkladlkjakld</p>
            </th>
            <th style={{ fontSize: '13px', fontWeight: '400' }}>dfsdfsdfdsfds</th>
            <th>
              <Badge pill>Hi</Badge>
            </th>
          </tr>

          {/* <th>5556</th> */}
        </tbody>
      </Table>
    </div>
  );
};
export default ExpandableTable;
