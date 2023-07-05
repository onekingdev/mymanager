import React, { Fragment, memo, useState } from 'react';
import { Button, Collapse, List, ListGroupItem, Nav, NavItem } from 'reactstrap';
import { BsFolder, BsFolder2Open } from 'react-icons/bs';
import { MdOutlineExpandMore, MdOutlineLock, MdChevronRight } from 'react-icons/md';
import { MoreVertical } from 'react-feather/dist';

import './style.scss';
import AddFolder from './CreateOrEditFolder/index';
import EditDeleteFolder from './EditAndDeleteFolder';
import CreateAndEditSubFolder from './SubFolders/index';
import { useSelector } from 'react-redux';

function TextTemplateSidebar(props) {
  const { activeMainFolder, setActiveMainFolder, activeSubMainFolder, setActiveSubMainFolder } =
    props;
  const [openFolder, setOpenFolder] = useState(null);
  const [sweetAlertOpen, setSweetAlertOpen] = useState(false);
  const [type, setType] = useState('');

  // ** Redux Store
  const folderArr = useSelector((state) => state.text.templateFolders);

  const handleMainFolder = (folder) => {
    setOpenFolder(!openFolder);
    setActiveMainFolder(folder);
    // props.MAIN_FOLDER_DATA(folder)
    setActiveSubMainFolder(null);
  };
  const handleSubFolder = (mainFolder, subFolder) => {
    setActiveMainFolder(mainFolder);
    setActiveSubMainFolder(subFolder);
    // props.SET_FOLDER_ID(mainFolder?._id, subFolder?._id);
    // props.LIST_TEMPLATES(subFolder?._id);
    // props.SUB_FOLDER_DATA(subFolder);
    // props.MAIN_FOLDER_DATA(mainFolder)
  };

  // const handleDeleteFolder = () => {
  //   if (type === 'folder') {
  //     props.REMOVE_FOLDER(null, activeMainFolder);
  //   } else {
  //     props.REMOVE_SUB_FOLDER(null, activeSubMainFolder);
  //   }
  //   setSweetAlertOpen(false);
  // };

  // const handleDeleteId = (type, folderid) => {
  //   setSweetAlertOpen(true);
  //   setType(type);
  // };

  const handleChangeLink = (e, item) => {
    if (item) {
      if (item.subFolder.length > 0) {
        return;
      } else {
        e.target
          .closest('.listWrapper')
          .querySelectorAll('.nav-folder-link')
          .forEach((el, index) => {
            if (el.classList.contains('active')) {
              el.classList.remove('active');
            } else return;
          });
        e.target
          .closest('.listWrapper')
          .querySelectorAll('.nav-subfolder-link')
          .forEach((el, index) => {
            if (el.classList.contains('active')) {
              el.classList.remove('active');
            } else return;
          });
        e.target.closest('.nav-folder-link').classList.add('active');
      }
    } else {
      e.target
        .closest('.listWrapper')
        .querySelectorAll('.nav-folder-link')
        .forEach((el, index) => {
          if (el.classList.contains('active')) {
            el.classList.remove('active');
          } else return;
        });
      e.target
        .closest('.listWrapper')
        .querySelectorAll('.nav-subfolder-link')
        .forEach((el, index) => {
          if (el.classList.contains('active')) {
            el.classList.remove('active');
          } else return;
        });
      e.target.closest('.nav-subfolder-link').classList.add('active');
    }
  };
  return (
    <Fragment>
      <Nav className="listWrapper px-1" vertical>
        <AddFolder />
        {folderArr &&
          folderArr.map((item) => {
            return (
              <NavItem key={item?._id}>
                <div
                  className="d-flex align-items-center justify-content-between py-50 ps-25 rounded-2 cursor-pointer nav-folder-link"
                  onClick={(e) => {
                    handleChangeLink(e, item);
                    setActiveMainFolder(item);
                  }}
                >
                  <div
                    className="d-flex gap-1 w-100 align-items-center"
                    fullWidth
                    onClick={() => {
                      handleMainFolder(item);
                    }}
                  >
                    <BsFolder2Open size={16} />
                    <span className="f-subname text-capitalize">{item?.folderName}</span>
                    {item?.subFolder?.length > 0 ? (
                      openFolder ? (
                        <MdOutlineExpandMore size={16} className="ms-auto" />
                      ) : (
                        <MdChevronRight size={16} className="ms-auto" />
                      )
                    ) : (
                      <div />
                    )}
                  </div>
                  <div className="d-flex gap-1 align-items-center">
                    {item?.adminId === undefined ? (
                      <EditDeleteFolder item={item} folderType="folder" />
                    ) : (
                      <MdOutlineLock size={16} style={{ color: '#757575' }} />
                    )}
                  </div>
                </div>
                <Collapse isOpen={openFolder && item?._id === activeMainFolder?._id}>
                  <Nav vertical className="ml-1">
                    {item?.subFolder?.map((subFolder) => {
                      return (
                        <div
                          onClick={(e) => {
                            handleChangeLink(e);
                            handleSubFolder(item, subFolder);
                          }}
                          key={subFolder?._id}
                          className="d-flex justify-content-between align-items-center py-50 ps-25 ms-1 cursor-pointer nav-subfolder-link rounded-2"
                        >
                          <div className="d-flex">
                            <div className="d-flex gap-1 f-subname">
                              <BsFolder size={16} />
                              <span className="f-subnam text-capitalize">
                                {subFolder?.subFolderName}
                              </span>
                            </div>
                          </div>
                          <div className="d-flex align-items-center gap-1">
                            {item?.adminId === undefined ? (
                              <EditDeleteFolder
                                item={item}
                                subfolder={subFolder}
                                folderType="subfolder"
                              />
                            ) : (
                              <MdOutlineLock size={16} style={{ color: '#757575' }} />
                            )}
                          </div>
                        </div>
                      );
                    })}
                    <div className="mt-50">
                      <CreateAndEditSubFolder parent={item} />
                    </div>
                  </Nav>
                </Collapse>
              </NavItem>
            );
          })}
      </Nav>
    </Fragment>
  );
}

export default memo(TextTemplateSidebar);
