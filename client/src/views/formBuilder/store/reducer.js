import { createSlice } from '@reduxjs/toolkit';

//form data
export const formEditor = createSlice({
  name: 'formEditor',
  initialState: {
    form: {
      _id: '',
      name: '',
      memberType: '',
      smartList: '',
      subCategory: '',
      formType: 'leads',
      formData: [{ id: '', step: '1', name: '', css: '', html: '', path: '' }],
      automateEntry: false,
      status: '',
      isTemplate: false
    },
    formContacts: [],
    funnels: [],
    templates: []
  },
  reducers: {
    setFormReducer: (state, action) => {
      state.form = action?.payload;
    },
    
    setToDefaultReducer: (state, action) => {
      if (action?.payload?.isTemplate && action?.payload?.isTemplate === true) {
        state.form = {
          _id: '',
          name: '',
          memberType: '',
          smartList: '',
          subCategory: '',
          formType: 'leads',
          formData: [{ id: '', step: '1', name: '', css: '', html: '', path: '' }],
          automateEntry: false,
          status: '',
          isTemplate: true
        };
      } else {
        state.form = {
          _id: '',
          name: '',
          memberType: '',
          smartList: '',
          subCategory: '',
          formType: 'leads',
          formData: [{ id: '', step: '1', name: '', css: '', html: '', path: '' }],
          automateEntry: false,
          status: '',
          isTemplate: false
        };
      }
    },

    setAllFormsReducer: (state, action) => {
      state.funnels = action?.payload;
    },

    setTemplatesReducer: (state, action) => {
      state.templates = action?.payload;
    },
    setFormContacts: (state, action) => {
      state.formContacts = action?.payload;
    }
  }
});

export const {
  setFormReducer,
  setToDefaultReducer,
  setAllFormsReducer,

  setTemplatesReducer,
  setFormContacts
} = formEditor.actions;
export default formEditor.reducer;
