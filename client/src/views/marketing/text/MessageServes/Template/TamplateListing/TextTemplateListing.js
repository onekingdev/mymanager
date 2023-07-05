import React, { memo, useState, useEffect } from 'react';
import { Card, CardBody, CardText, Col, Row } from 'reactstrap';
import AddTemplateModal from './addTemplateModal';
import EditTemplateModal from './editTemplateModal';
import DeleteTemplateModal from './deleteTemplateModal';
import { Copy, Trash } from 'react-feather';
import { Link } from 'react-router-dom';
import { ChevronsRight, Edit } from 'react-feather/dist';
import { HiHome } from 'react-icons/hi';
import { getFolders, uploadFolder } from '../../../../../apps/text/store';
import { useDispatch, useSelector } from 'react-redux';

function TextTemplateListing(props) {
  const { activeMainFolder, activeSubMainFolder } = props;
  const dispatch = useDispatch();
  const [listoftemplates, setListoftemplates] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [copiedTemplateText, setCopiedTemplateText] = useState('');
  const templateStore = useSelector((state) => state.text);

  // ** Effects
  useEffect(() => {
    dispatch(getFolders());
  }, []);

  useEffect(() => {
    if (activeMainFolder) {
      templateStore?.templateFolders.map((templateFolder, index1) => {
        if (
          templateFolder &&
          activeMainFolder &&
          templateFolder.folderName == activeMainFolder.folderName
        ) {
          if (activeSubMainFolder && activeSubMainFolder.subFolderName.length > 0) {
            templateFolder.subFolder.map((tmpSubfolder, index2) => {
              if (
                tmpSubfolder &&
                activeSubMainFolder &&
                tmpSubfolder.subFolderName == activeSubMainFolder.subFolderName
              ) {
                setListoftemplates(tmpSubfolder.template);
              } else return;
            });
          } else {
            setListoftemplates(templateFolder.template);
          }
        }
      });
    } else {
      let tmp = [];
      templateStore.templateFolders &&
        templateStore.templateFolders.length > 0 &&
        templateStore.templateFolders.map((perFolder, index1) => {
          tmp = [...tmp, ...perFolder.template];
          perFolder.subFolder.map((perSubFolder, index2) => {
            tmp = [...tmp, ...perSubFolder.template];
          });
        });
      setListoftemplates(tmp);
    }
  }, [templateStore?.templateFolders, activeMainFolder, activeSubMainFolder]);

  // ** Handlers
  const handleEditTemplate = (e, item) => {
    setIsEditModalOpen(!isEditModalOpen);
    setSelectedTemplate(item);
  };
  const handleTrashTemplate = (e, item) => {
    setSelectedTemplate(item);
    deleteToggle();
  };

  const handleCopyTemplate = (e, item) => {
    setSelectedTemplate(item);
    document.clear();
    var tmpEl = document.createElement('input');
    setCopiedTemplateText(item.text);
    e.target.closest('.col-card-wrapper').querySelector('#copyTemplate').style.display = 'block';
    document.body.appendChild(tmpEl);
    tmpEl.value = item.text;
    tmpEl.select();
    document.execCommand('copy');
    tmpEl.addEventListener('focusout', (e) => {
      document.querySelector('#copyTemplate').style.display = 'none';
      document.body.removeChild(tmpEl);
    });
  };
  const deleteToggle = () => {
    setIsDeleteOpen(!isDeleteOpen);
  };

  return (
    <div className="w-100">
      <div className="d-flex gap-2 align-items-center pt-1">
        <Link to="/">
          <HiHome size={16} />
        </Link>
        <ChevronsRight size={16} />
        {activeMainFolder?.folderName ? (
          <div className="d-flex gap-2">
            <span className="text-capitalize">{activeMainFolder?.folderName}</span>
            <ChevronsRight size={16} />
          </div>
        ) : null}
        {activeSubMainFolder?.subFolderName ? (
          <div className="d-flex gap-2">
            <span className="text-capitalize">{activeSubMainFolder?.subFolderName}</span>
            <ChevronsRight size={16} />
          </div>
        ) : null}
      </div>
      <div className="d-flex justify-content-end">
        <AddTemplateModal
          activeMainFolder={activeMainFolder}
          activeSubMainFolder={activeSubMainFolder}
        />
      </div>
      <br></br>
      <Row container spacing={3}>
        {listoftemplates !== null &&
          listoftemplates.map((item, index) => (
            <Col item xs={4} key={index} className="col-card-wrapper">
              <Card className="p-1 mb-2">
                <h4>{item?.template_name}</h4>
                <CardBody className="border rounded">
                  <CardText style={{ color: 'black', fontSize: '1rem' }} component="p">
                    {item?.text}
                  </CardText>
                </CardBody>
                <div className="d-flex justify-content-end gap-1 pt-1">
                  <Copy
                    size={16}
                    className="cursor-pointer template-action-item"
                    onClick={(e) => {
                      handleCopyTemplate(e, item);
                    }}
                  />
                  <Edit
                    size={16}
                    className="cursor-pointer template-action-item"
                    onClick={(e) => {
                      handleEditTemplate(e, item);
                    }}
                  />
                  <Trash
                    size={16}
                    className="cursor-pointer template-action-item"
                    disabled={item?.adminId !== undefined}
                    onClick={(e) => handleTrashTemplate(e, item)}
                  />
                </div>
              </Card>
              <p
                id="copyTemplate"
                style={{ fontSize: 'smaller', display: 'none' }}
                className="text-center"
              >
                Copied to clipboard
              </p>
            </Col>
          ))}
      </Row>
      <EditTemplateModal
        toggle={handleEditTemplate}
        open={isEditModalOpen}
        selectedTemplate={selectedTemplate}
      />
      <DeleteTemplateModal
        isDeleteOpen={isDeleteOpen}
        deleteToggle={deleteToggle}
        selectedTemplate={selectedTemplate}
        activeMainFolder={activeMainFolder}
        activeSubMainFolder={activeSubMainFolder}
      />
    </div>
  );
}

export default memo(TextTemplateListing);
