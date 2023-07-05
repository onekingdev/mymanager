import React, { useState } from 'react';
import { Eye, Save, X } from 'react-feather';
import { BiMobile } from 'react-icons/bi';
import { FaBox, FaLayerGroup, FaPaintBrush } from 'react-icons/fa';
import { MdOutlineDesktopMac, MdOutlineTablet } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, ButtonGroup, Collapse, Nav, Navbar, NavbarToggler, NavItem } from 'reactstrap';
import { updateFormDataAction } from '../../formBuilder/store/action';

export default function JournalNavbar({
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

  const handleSave = (event) => {
    //set html,css
    event.preventDefault();
    // const html = editor.getHtml();
    // const css = editor.getCss();
    // const components = editor.getComponents();
    // editor.runCommand('set-data');
    // let tempFormData = store.form.formData.map((x) => {
    //   if (x.id === step.id) {
    //     return { ...step, html: html, css: css, components: components };
    //   }
    //   return x;
    // });
    // dispatch(updateFormDataAction(store.form._id, tempFormData));
    toast.success('Your form saved successfully!');
    // toggle();
  };

  const handleColumns = (event) => {
    event.preventDefault();
    setBlockTitle('Columns');
    const blocks = editor.BlockManager.getAll();
    const filtered = blocks.filter((block) => block.get('category').attributes.id === 'Column');
    editor.BlockManager.render(filtered);

    toggleBlocks(true);
  };
  const handleElements = (event) => {
    event.preventDefault();
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
      <Navbar full="false" expand="sm">
        <NavbarToggler onClick={toggleNav} />
        <Collapse isOpen={isNavOpen} navbar>
          <Nav className="">
            <NavItem className="me-1 my-1">
              <ButtonGroup>
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
                  color="dark"
                  onClick={handleSave}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#174ae7';
                    e.currentTarget.style.borderColor = '#174ae7';
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
