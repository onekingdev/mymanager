import React, { useState } from 'react';
import { Eye, Save, X } from 'react-feather';
import { BiMobile } from 'react-icons/bi';
import { FaBox, FaLayerGroup, FaPaintBrush } from 'react-icons/fa';
import { MdOutlineDesktopMac, MdOutlineTablet } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, ButtonGroup, Collapse, Nav, Navbar, NavbarToggler, NavItem } from 'reactstrap';
import { updateFormDataAction } from '../store/action';

export default function MainNav({
  toggle,
  isOpen,
  toggleBlocks,
  setDevice,
  dispatch,
  store,
  editor,
  setBlockTitle,
  step
}) {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const toggleNav = () => setIsNavOpen(!isOpen);

  const handlePreview = () => {
    //set html,css
    const html = editor.getHtml();
    const css = editor.getCss();
    const components = editor.getComponents()


    editor.runCommand('set-data');
    // save to db
    let tempFormData = store.form.formData.map((x) => {
      if (x.id === step.id) {
        return { ...step, html: html, css: css , components:components };
      }
      return x;
    });
    dispatch(updateFormDataAction(store.form._id, tempFormData));

    //redirect to preview with data
    window.open(`/form-funnel/${store.form._id}&path=${step.path}`);
  };

  const handleSave = () => {
    //set html,css
    const html = editor.getHtml();
    const css = editor.getCss();
    const components = editor.getComponents()
    editor.runCommand('set-data');
    let tempFormData = store.form.formData.map((x) => {
      if (x.id === step.id) {
        return { ...step, html: html, css: css,components:components };
      }
      return x;
    });
    dispatch(updateFormDataAction(store.form._id, tempFormData));
    toast.success('Your template saved successfully!');
    toggle();
  };

  const handlePublish = () => {};

  const handleSections = () => {
    setBlockTitle('Sections');
    const blocks = editor.BlockManager.getAll();
    const filtered = blocks.filter((block) => block.get('category').attributes.id === 'Layout');
    editor.BlockManager.render(filtered);

    toggleBlocks(true);
  };
  const handleColumns = () => {
    setBlockTitle('Columns');
    const blocks = editor.BlockManager.getAll();
    const filtered = blocks.filter((block) => block.get('category').attributes.id === 'Column');
    editor.BlockManager.render(filtered);

    toggleBlocks(true);
  };
  const handleElements = () => {
    setBlockTitle('Elements');
    const blocks = editor.BlockManager.getAll();
    const filtered = blocks.filter(
      (block) =>
        block.get('category').attributes.id !== 'Column' &&
        block.get('category').attributes.id !== 'Layout'
    );
    editor.BlockManager.render(filtered);

    toggleBlocks(true);
  };
  return (
    <div>
      <Navbar full="true" expand="md">
        <NavbarToggler onClick={toggleNav} />
        <Collapse isOpen={isNavOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem className="me-1">
              <Button
                onClick={toggle}
                color="light"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#0374C7';
                  e.currentTarget.style.borderColor = '#0374C7';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '';
                  e.currentTarget.style.borderColor = '';
                }}
              >
                CLOSE
              </Button>
            </NavItem>
            {/* <NavItem className="me-1">
              <Button color="link" className="p-0" onClick={() => toggleStyles(!isStyle)}>
                <FaPaintBrush size={20} />
              </Button>
            </NavItem> */}

            <NavItem className="me-1 my-auto">
              <ButtonGroup>
                <Button
                  color="outline-light"
                  onClick={() => setDevice('desktop')}
                  style={{ padding: '5px' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0374C7')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
                >
                  <MdOutlineDesktopMac size={20} />
                </Button>
                <Button
                  color="outline-light"
                  onClick={() => setDevice('tablet')}
                  style={{ padding: '5px' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0374C7')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
                >
                  <MdOutlineTablet size={20} />
                </Button>
                <Button
                  color="outline-light"
                  onClick={() => setDevice('mobile')}
                  style={{ padding: '5px' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0374C7')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
                >
                  <BiMobile size={20} />
                </Button>
              </ButtonGroup>
            </NavItem>
          </Nav>

          <Nav className="ms-auto me-0" navbar>
            <NavItem className="me-1 my-auto">
              <ButtonGroup>
                <button
                  onClick={handleSections}
                  className="btn text-light btn-section"
                  style={{ background: '#3BAF7C' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#6ae0ad';
                    e.currentTarget.style.borderColor = '#6ae0ad';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#3BAF7C';
                    e.currentTarget.style.borderColor = '#3BAF7C';
                  }}
                >
                  <span>SECTIONS</span>
                </button>
                <button
                  className="btn text-light"
                  onClick={handleColumns}
                  style={{ backgroundColor: '#0166AE' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#3f80ae';
                    e.currentTarget.style.borderColor = '#3f80ae';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#0166AE';
                    e.currentTarget.style.borderColor = '#0166AE';
                  }}
                >
                  <span>COLUMNS</span>
                </button>
                <button
                  onClick={handleElements}
                  style={{ background: '#F78828' }}
                  className="btn text-light"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f79948';
                    e.currentTarget.style.borderColor = '#f79948';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#F78828';
                    e.currentTarget.style.borderColor = '#F78828';
                  }}
                >
                  <span>ELEMENTS</span>
                </button>
              </ButtonGroup>
            </NavItem>

            <NavItem className="me-1 my-auto">
              <ButtonGroup>
                <Button
                  color="light"
                  onClick={handlePreview}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#0374C7';
                    e.currentTarget.style.borderColor = '#0374C7';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '';
                    e.currentTarget.style.borderColor = '';
                  }}
                >
                  <Eye size={16} /> <span>PREVIEW</span>
                </Button>
                <Button
                  color="outline-light"
                  onClick={handleSave}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#0374C7';
                    e.currentTarget.style.borderColor = '#0374C7';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '';
                    e.currentTarget.style.borderColor = '';
                  }}
                >
                  <Save size={16} /> <span>SAVE</span>
                </Button>
              </ButtonGroup>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
