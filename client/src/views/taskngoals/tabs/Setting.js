import React from 'react';
import Height from '../../formBuilder/edit/styles/properties/Height';

import SettingTab from '../../tasks/setting';

const Setting = (props) => {
  const { store } = props;

  return (
    <div style={{ height: '100%' }}>
      <SettingTab store={store} />
    </div>
  );
};

export default Setting;
