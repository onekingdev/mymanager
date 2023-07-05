import React, { useState } from 'react';
import FontFamily from '../configuration/fontfamily';
import AddAction from './properties/AddAction';
import BackgroundColor from './properties/BackgroundColor';
import BgImage from './properties/BgImage';
// import BorderColor from './properties/BorderColor';
import CheckRadioBorderColor from './properties/CheckRadioBorderColor';
import ChildColor from './properties/ChildColor';
import Corners from './properties/Corners';
import DateDetails from './properties/DateDetails';
import ExpireAction from './properties/ExpireAction';
import Font from './properties/Font';
// import AriaLabel from './properties/AriaLabel'
import MobileSize from './properties/MobileSize';
import MobileSubSize from './properties/MobileSubSize';
import FontSize from './properties/FontSize';
import Height from './properties/Height';
import IconColor from './properties/IconColor';
import ImageSource from './properties/imageSource/ImageSource';
import InputType from './properties/InputType';
import LinkUrl from './properties/LinkUrl';
import ListSetting from './properties/listSetting/ListSetting';
import ListType from './properties/bulletSetting/ListType';
import Opacity from './properties/Opacity';
import Padding from './properties/Padding';
import PlaceHolder from './properties/PlaceHolder';
import PropertyName from './properties/PropertyName';
import Required from './properties/Required';
import SectionWidth from './properties/SectionWidth';
import Spacing from './properties/Spacing';
import Sticky from './properties/Sticky';
import StripeSettings from './properties/StripeSettings';
import SubText from './properties/SubText';
import SubTextSize from './properties/SubTextSize';
import Text from './properties/Text';
import TextAlign from './properties/TextAlign';
import TextColor from './properties/TextColor';
import Translate from './properties/Translate';
import Typography from './properties/Typography';
import Width from './properties/Width';
import WidthPx from './properties/WidthPx';
import WrapperFontSize from './properties/WrapperFontSize';
import WrapperFormFont from './properties/WrapperFormFont';
import WrapperLabelWidth from './properties/WrapperLabelWidth';
import WrapperSpacing from './properties/WrapperSpacing';
import WrapperTextAlignment from './properties/WrapperTextAlignment';
import WrapperWidth from './properties/WrapperWidth';
import TopMargin from './properties/TopMargin';
import VideoStyles from './properties/video/VideoStyles';
import HeadingType from './properties/HeadingType';
import AddressType from './properties/AddressType';
import BulletOptions from './properties/bulletSetting/BulletOptions';
import Borders from './properties/Borders';
import CountDownSetting from './properties/countdown/CountDownSetting';
import ProductActionModal from './properties/ProductActionModal';
import MembershipActionModal from './properties/membeship/MembershipActionModal';
import Membership from './properties/membeship/Membership'

export default function SettingsTab({ editor }) {
  const getSelectedHtmlElement = () => {
    return editor.getSelected().getChildAt(0);
  };
  const getSelectedHtml = () => {
    return editor.getSelected();
  };
  const getWrapperHtmlElement = () => {
    return editor.DomComponents.getWrapper();
  };
  return (
    <div>
      <TopMargin getSelectedHtmlElement={getSelectedHtml} />
      {['Appointment'].includes(editor?.getSelected()?.attributes?.name) && (
        <>
          <Required getSelectedHtmlElement={getSelectedHtmlElement} />
          <Font getSelectedHtmlElement={getSelectedHtmlElement} />
          <FontSize getSelectedHtmlElement={getSelectedHtmlElement} />
        </>
      )}
      {['Address'].includes(editor?.getSelected()?.attributes?.name) && (
        <>
          <AddressType getSelectedHtmlElement={getSelectedHtmlElement} />
          <Required getSelectedHtmlElement={getSelectedHtmlElement} />
          <TextAlign getSelectedHtmlElement={getSelectedHtmlElement} />
          <BackgroundColor getSelectedHtmlElement={getSelectedHtmlElement} />
          <Padding getSelectedHtmlElement={getSelectedHtmlElement} />
          <Corners getSelectedHtmlElement={getSelectedHtmlElement} />
        </>
      )}
      {['Bullets'].includes(editor?.getSelected()?.attributes?.name) && (
        <>
          <BulletOptions getSelectedHtmlElement={getSelectedHtmlElement} />
          <Spacing getSelectedHtmlElement={getSelectedHtmlElement} />
          <Font getSelectedHtmlElement={getSelectedHtmlElement} />
          <TextColor getSelectedHtmlElement={getSelectedHtmlElement} />
          <ChildColor getSelectedHtmlElement={getSelectedHtmlElement} />
        </>
      )}
      {['Button'].includes(editor?.getSelected()?.attributes?.name) && (
        <>
          <AddAction getSelectedHtmlElement={getSelectedHtmlElement} />
          <hr />
          {/* <TopMargin getSelectedHtmlElement={getSelectedHtmlElement} /> */}
          {/* <EditAction getSelectedHtmlElement={getSelectedHtmlElement} /> */}
          {/* <AriaLabel getSelectedHtmlElement={getSelectedHtmlElement} /> */}
          <MobileSize getSelectedHtmlElement={getSelectedHtmlElement} />
          <MobileSubSize getSelectedHtmlElement={getSelectedHtmlElement} />
          <Text getSelectedHtmlElement={getSelectedHtmlElement} />
          <SubText getSelectedHtmlElement={getSelectedHtmlElement} />
          <Font getSelectedHtmlElement={getSelectedHtmlElement} />
          <FontSize getSelectedHtmlElement={getSelectedHtmlElement} />
          <SubTextSize getSelectedHtmlElement={getSelectedHtmlElement} />
          <TextColor getSelectedHtmlElement={getSelectedHtmlElement} />
          <BackgroundColor getSelectedHtmlElement={getSelectedHtmlElement} />
        </>
      )}
      {['Captcha'].includes(editor?.getSelected()?.attributes?.name) && <></>}

      {['Checkbox', 'Radio'].includes(editor?.getSelected()?.attributes?.name) && (
        <>
          <Required getSelectedHtmlElement={getSelectedHtmlElement} />
          <PropertyName getSelectedHtmlElement={getSelectedHtmlElement} />
          <Corners getSelectedHtmlElement={getSelectedHtmlElement} />
          <Font getSelectedHtmlElement={getSelectedHtmlElement} />
          <FontSize getSelectedHtmlElement={getSelectedHtmlElement} />
          <TextColor getSelectedHtmlElement={getSelectedHtmlElement} />
          {/* <ChildColor getSelectedHtmlElement={getSelectedHtmlElement} /> */}
          <BackgroundColor getSelectedHtmlElement={getSelectedHtmlElement} />
          {/* <IconColor getSelectedHtmlElement={getSelectedHtmlElement} /> */}
          <CheckRadioBorderColor getSelectedHtmlElement={getSelectedHtmlElement} />
          {/* <Opacity getSelectedHtmlElement={getSelectedHtmlElement} />
          <Typography getSelectedHtmlElement={getSelectedHtmlElement} /> */}
        </>
      )}
      {['Column'].includes(editor?.getSelected()?.attributes?.name) && (
        <>
          <BgImage getSelectedHtmlElement={getSelectedHtmlElement} />
          {/* <SectionWidth getSelectedHtmlElement={getSelectedHtmlElement} /> */}
          {/* <Sticky getSelectedHtmlElement={getSelectedHtmlElement} /> */}
          <BackgroundColor getSelectedHtmlElement={getSelectedHtmlElement} />
          <TextColor getSelectedHtmlElement={getSelectedHtmlElement} />
          <Padding getSelectedHtmlElement={getSelectedHtmlElement} />
        </>
      )}
      {['Count Down'].includes(editor?.getSelected()?.attributes?.name) && (
        <>
          <CountDownSetting getSelectedHtmlElement={getSelectedHtmlElement} />
        </>
      )}
      {['Divider'].includes(editor?.getSelected()?.attributes?.name) && <></>}
      {['Drop Down'].includes(editor?.getSelected()?.attributes?.name) && (
        <>
          <ListSetting getSelectedHtmlElement={getSelectedHtmlElement} />
          <PropertyName getSelectedHtmlElement={getSelectedHtmlElement} />
          <Required getSelectedHtmlElement={getSelectedHtmlElement} />
          <Font getSelectedHtmlElement={getSelectedHtmlElement} />
          <FontSize getSelectedHtmlElement={getSelectedHtmlElement} />
        </>
      )}
      {['SMS', 'Email'].includes(editor?.getSelected()?.attributes?.name) && <></>}
      {['Form'].includes(editor?.getSelected()?.attributes?.name) && (
        <>
          <WrapperWidth getWrapper={getWrapperHtmlElement} />
          <WrapperTextAlignment getWrapper={getWrapperHtmlElement} />
          <WrapperSpacing getWrapper={getWrapperHtmlElement} />
          <WrapperLabelWidth getWrapper={getWrapperHtmlElement} />
          <WrapperFormFont getWrapper={getWrapperHtmlElement} />
          <WrapperFontSize getWrapper={getWrapperHtmlElement} />
        </>
      )}

      {['Headline'].includes(editor?.getSelected()?.attributes?.name) && (
        <>
          <Text getSelectedHtmlElement={getSelectedHtmlElement} />
          <HeadingType getSelectedHtmlElement={getSelectedHtmlElement} />
          <Font getSelectedHtmlElement={getSelectedHtmlElement} />
          <FontSize getSelectedHtmlElement={getSelectedHtmlElement} />
          <TextColor getSelectedHtmlElement={getSelectedHtmlElement} />
          <BackgroundColor getSelectedHtmlElement={getSelectedHtmlElement} />
          <Borders getSelectedHtmlElement={getSelectedHtmlElement} />
          {/* <Opacity getSelectedHtmlElement={getSelectedHtmlElement} /> */}
        </>
      )}
      {['Image'].includes(editor?.getSelected()?.attributes?.name) && (
        <>
          <ImageSource getSelectedHtmlElement={getSelectedHtmlElement} />
          <WidthPx getSelectedHtmlElement={getSelectedHtmlElement} />
          <Height getSelectedHtmlElement={getSelectedHtmlElement} />
          {/* <LinkUrl getSelectedHtmlElement={getSelectedHtmlElement} /> */}
        </>
      )}
      {['Input', 'DatePicker', 'FileUpload'].includes(editor?.getSelected()?.attributes?.name) && (
        <>
          <InputType getSelectedHtmlElement={getSelectedHtmlElement} />
          <PlaceHolder getSelectedHtmlElement={getSelectedHtmlElement} />
          <Required getSelectedHtmlElement={getSelectedHtmlElement} />
          <Font getSelectedHtmlElement={getSelectedHtmlElement} />
          <FontSize getSelectedHtmlElement={getSelectedHtmlElement} />
          {['DatePicker'].includes(editor?.getSelected()?.attributes?.name) && (
            <>{/* start date - end date */}</>
          )}
        </>
      )}
      {['InputTable'].includes(editor?.getSelected()?.attributes?.name) && <></>}
      {['Long Text'].includes(editor?.getSelected()?.attributes?.name) && <></>}
      {['Membership'].includes(editor?.getSelected()?.attributes?.name) && <></>}
      {['Number'].includes(editor?.getSelected()?.attributes?.name) && <></>}
      {['Page Break'].includes(editor?.getSelected()?.attributes?.name) && (
        <>{/* whats this for */}</>
      )}
      {['Paragraph', 'Waiver'].includes(editor?.getSelected()?.attributes?.name) && (
        <>
          <Text getSelectedHtmlElement={getSelectedHtmlElement} />
          <Font getSelectedHtmlElement={getSelectedHtmlElement} />
          <FontSize getSelectedHtmlElement={getSelectedHtmlElement} />
          <TextColor getSelectedHtmlElement={getSelectedHtmlElement} />
          <BackgroundColor getSelectedHtmlElement={getSelectedHtmlElement} />
          <Borders getSelectedHtmlElement={getSelectedHtmlElement} />
          {/* <Opacity getSelectedHtmlElement={getSelectedHtmlElement} />
          <Typography getSelectedHtmlElement={getSelectedHtmlElement} /> */}
        </>
      )}
      {['Product List',].includes(editor?.getSelected()?.attributes?.name) && (
        <>
          <ProductActionModal getSelectedHtmlElement={getSelectedHtmlElement} />
          <hr />
        </>
      )}

      {['Membership',].includes(editor?.getSelected()?.attributes?.name) && (
          <>
            <MembershipActionModal getSelectedHtmlElement={getSelectedHtmlElement} />
            <hr />
          </>
      )}
      {['rows'].includes(editor?.getSelected()?.attributes?.name) && (
        <>
          <BgImage getSelectedHtmlElement={getSelectedHtmlElement} />
          <BackgroundColor getSelectedHtmlElement={getSelectedHtmlElement} />
          <TextColor getSelectedHtmlElement={getSelectedHtmlElement} />
          <Padding getSelectedHtmlElement={getSelectedHtmlElement} />
        </>
      )}
      {['Section'].includes(editor?.getSelected()?.attributes?.name) && (
        <>
          <BgImage getSelectedHtmlElement={getSelectedHtmlElement} />
          <SectionWidth getSelectedHtmlElement={() => editor.getSelected()} />
          <Sticky getSelectedHtmlElement={() => editor.getSelected()} />
          <BackgroundColor getSelectedHtmlElement={getSelectedHtmlElement} />
          <TextColor getSelectedHtmlElement={getSelectedHtmlElement} />
          <Padding getSelectedHtmlElement={getSelectedHtmlElement} />
        </>
      )}
      {['section-wide'].includes(editor?.getSelected()?.attributes?.type) && (
        <>
          <BgImage getSelectedHtmlElement={getSelectedHtmlElement} />
          <SectionWidth getSelectedHtmlElement={() => editor.getSelected()} />
          <Sticky getSelectedHtmlElement={() => editor.getSelected()} />
          <BackgroundColor getSelectedHtmlElement={getSelectedHtmlElement} />
          <TextColor getSelectedHtmlElement={getSelectedHtmlElement} />
          <Padding getSelectedHtmlElement={getSelectedHtmlElement} />
        </>
      )}
      {['Spinner'].includes(editor?.getSelected()?.attributes?.name) && <></>}
      {['Star Rating'].includes(editor?.getSelected()?.attributes?.name) && <></>}
      {['Stipe'].includes(editor?.getSelected()?.attributes?.name) && (
        <>
          <StripeSettings />
        </>
      )}
      {['Survey'].includes(editor?.getSelected()?.attributes?.name) && <></>}
      {['Text Area'].includes(editor?.getSelected()?.attributes?.name) && (
        <>
          {/* <InputType getSelectedHtmlElement={getSelectedHtmlElement} /> */}
          <PropertyName getSelectedHtmlElement={getSelectedHtmlElement} />
          <PlaceHolder getSelectedHtmlElement={getSelectedHtmlElement} />
          <Required getSelectedHtmlElement={getSelectedHtmlElement} />
          <Font getSelectedHtmlElement={getSelectedHtmlElement} />
          <FontSize getSelectedHtmlElement={getSelectedHtmlElement} />
        </>
      )}
      {['Time'].includes(editor?.getSelected()?.attributes?.name) && <></>}
      {['Video'].includes(editor?.getSelected()?.attributes?.name) && (
        <>
          <VideoStyles getSelectedHtmlElement={getSelectedHtmlElement} />
        </>
      )}
      {['Membership'].includes(editor?.getSelected()?.attributes?.name) && (
          <>
            <Membership getSelectedHtmlElement={getSelectedHtmlElement} />
          </>
      )}
    </div>
  );
}
