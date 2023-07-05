import React from 'react';
import ButtonThemes from './themes/ButtonThemes';
import DefaultInput from './themes/DefaultInput';
import BasicInput from './themes/BasicInput';
import GreyBorderInput from './themes/GreyBorderInput';
import LightGreyInput from './themes/LightGreyInput';
import BorderWhiteInput from './themes/BorderWhiteInput';
import SimpleInput from './themes/SimpleInput';
import GradientNoIcon3dInput from './themes/3dGradientNoIconInput';
import SimpleCleanInput from './themes/SimpleCleanInput';
import BlackBgInput from './themes/BlackBgInput';
import BlackUnderlineInput from './themes/BlackUnderlineInput';
import DefaultSelectInput from './themes/DefaultSelectInput.js';
import RoundedSelectInput from './themes/RoundedSelectInput.js';
import BasicSelectInput from './themes/BasicSelectInput.js';
import GreyBorderSelectInput from './themes/GreyBorderSelectInput.js';
import LightGreySelectInput from './themes/LightGreySelectInput.js';
import BorderWhiteSelectInput from './themes/BorderWhiteSelectInput.js';
import SimpleSelectInput from './themes/SimpleSelectInput.js';
import GradientSelectInput from './themes/3DGradientSelectInput.js';
import SimpleCleanSelectInput from './themes/SimpleCleanSelectInput.js';
import ImageTheme from './themes/ImageTheme';
import AddressTheme from './themes/AddressTheme';
import CountDownTheme from './themes/CountDownTheme';
import ProductListTheme from './themes/ProductListTheme';


function ThemeTab({ editor }) {

//  console.log(editor?.getSelected()?.attributes?.name
//  ) 

  const getSelectedHtmlElement = () => {
    return editor.getSelected().getChildAt(0);
  };
  const getWrapperHtmlElement = () => {
    return editor.DomComponents.getWrapper();
  };
  return (

    <div>
      {['Button'].includes(editor?.getSelected()?.attributes?.name) && (
        <>
          <ButtonThemes getSelectedHtmlElement={getSelectedHtmlElement} />
        </>
      )}
      {['Image'].includes(editor?.getSelected()?.attributes?.name) && (
        <>
          <ImageTheme getSelectedHtmlElement={getSelectedHtmlElement} />
        </>
      )}

      {['Count Down'].includes(editor?.getSelected()?.attributes?.name) && (
        <>
          <CountDownTheme getSelectedHtmlElement={getSelectedHtmlElement} />
        </>
      )}

      {['Product List'].includes(editor?.getSelected()?.attributes?.name) && (
        <>
          <ProductListTheme getSelectedHtmlElement={getSelectedHtmlElement} />
        </>
      )}

      {['Address'].includes(editor?.getSelected()?.attributes?.name) && (
        <>
          <AddressTheme getSelectedHtmlElement={getSelectedHtmlElement} />
        </>
      )}

      {['Text Area', 'Input', 'Drop Down'].includes(editor?.getSelected()?.attributes?.name) && (
        <>
          <div className='d-flex justify-content-center text-secondary m-1 fw-bolder'>CLICK TO SET THEME</div>
          <div className=' m-2'>
            <DefaultSelectInput getSelectedHtmlElement={getSelectedHtmlElement} />
            <RoundedSelectInput getSelectedHtmlElement={getSelectedHtmlElement} />
            <BasicSelectInput getSelectedHtmlElement={getSelectedHtmlElement} />
            <GreyBorderSelectInput getSelectedHtmlElement={getSelectedHtmlElement} />
            <LightGreySelectInput getSelectedHtmlElement={getSelectedHtmlElement} />
            <BorderWhiteSelectInput getSelectedHtmlElement={getSelectedHtmlElement} />
            <SimpleSelectInput getSelectedHtmlElement={getSelectedHtmlElement} />
            <GradientSelectInput getSelectedHtmlElement={getSelectedHtmlElement} />
            <SimpleCleanSelectInput getSelectedHtmlElement={getSelectedHtmlElement} />
          </div>




          {/* <DefaultInput getSelectedHtmlElement={getSelectedHtmlElement} />
          <BasicInput getSelectedHtmlElement={getSelectedHtmlElement} />
          <GreyBorderInput getSelectedHtmlElement={getSelectedHtmlElement} />
          <LightGreyInput getSelectedHtmlElement={getSelectedHtmlElement} />
          <BorderWhiteInput getSelectedHtmlElement={getSelectedHtmlElement} />
          <SimpleInput getSelectedHtmlElement={getSelectedHtmlElement} />
          <GradientNoIcon3dInput getSelectedHtmlElement={getSelectedHtmlElement} />
          <SimpleCleanInput getSelectedHtmlElement={getSelectedHtmlElement} />
          <BlackBgInput getSelectedHtmlElement={getSelectedHtmlElement} />
          <BlackUnderlineInput getSelectedHtmlElement={getSelectedHtmlElement} /> */}
        </>
      )}
      {/* 
      {['Input'].includes(editor?.getSelected()?.attributes?.name) && (
        // <>
        //   <DefaultInput getSelectedHtmlElement={getSelectedHtmlElement} />
        //   <BasicInput getSelectedHtmlElement={getSelectedHtmlElement} />
        //   <GreyBorderInput getSelectedHtmlElement={getSelectedHtmlElement} />
        //   <LightGreyInput getSelectedHtmlElement={getSelectedHtmlElement} />
        //   <BorderWhiteInput getSelectedHtmlElement={getSelectedHtmlElement} />
        //   <SimpleInput getSelectedHtmlElement={getSelectedHtmlElement} />
        //   <GradientNoIcon3dInput getSelectedHtmlElement={getSelectedHtmlElement} />
        //   <SimpleCleanInput getSelectedHtmlElement={getSelectedHtmlElement} />
        //   <BlackBgInput getSelectedHtmlElement={getSelectedHtmlElement} />
        //   <BlackUnderlineInput getSelectedHtmlElement={getSelectedHtmlElement} />
        // </>
      )} */}
      {/* {['Drop Down','Input'].includes(editor?.getSelected()?.attributes?.name) && (
        <>
          <div className='d-flex justify-content-center'>CLICK TO SET THEME</div>
          <div className=' m-2'>
            <DefaultSelectInput getSelectedHtmlElement={getSelectedHtmlElement} />
            <RoundedSelectInput getSelectedHtmlElement={getSelectedHtmlElement} />
            <BasicSelectInput getSelectedHtmlElement={getSelectedHtmlElement} />
            <GreyBorderSelectInput getSelectedHtmlElement={getSelectedHtmlElement} />
            <LightGreySelectInput getSelectedHtmlElement={getSelectedHtmlElement} />
            <BorderWhiteSelectInput getSelectedHtmlElement={getSelectedHtmlElement} />
            <SimpleSelectInput getSelectedHtmlElement={getSelectedHtmlElement} />
            <GradientSelectInput getSelectedHtmlElement={getSelectedHtmlElement} />
            <SimpleCleanSelectInput getSelectedHtmlElement={getSelectedHtmlElement} />
          </div>
        </>
      )} */}
    </div>
  );
}

export default ThemeTab;
