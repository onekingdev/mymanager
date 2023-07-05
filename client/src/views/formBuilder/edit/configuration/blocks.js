//media: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.3-1H3.4C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.3 1h17.4c.8 0 1.3-.4 1.3-1V9zm-1 6H3V9h18v6z"></path><path d="M4 11.5h16v1H4z"></path></svg>`,
//<svg viewBox="0 0 24 24"><path fill="currentColor" d="M20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20M4,6V18H20V6H4M6,9H18V11H6V9M6,13H16V15H6V13Z"></path></svg>
let blocksJson = [
  {
    id: 'section-wide',
    label: 'Wide',
    media: `<svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M2 20h20V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h20a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1Z"></path>
  </svg>`,
    content: {
      type: 'section-wide',
      name: 'Section'
    },

    category: 'Layout'
  },
  {
    id: 'section-full-width',
    label: 'Full Width',
    media: `<svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M2 20h20V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h20a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1Z"></path>
  </svg>`,
    content: {
      type: 'section-full-width',
      name: 'Section'
    },
    category: 'Layout'
  },
  {
    id: 'section-medium',
    label: 'Medium',
    media: `<svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M2 20h20V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h20a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1Z"></path>
  </svg>`,
    content: {
      type: 'section-medium',
      name: 'Section'
    },
    category: 'Layout'
  },
  {
    id: 'section-small',
    label: 'Small',
    media: `<svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M2 20h20V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h20a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1Z"></path>
  </svg>`,
    content: {
      type: 'section-small',
      name: 'Section'
    },
    category: 'Layout'
  },
  {
    id: 'column-1',
    label: '1 Column',
    media: `<svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M2 20h20V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h20a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1Z"></path>
  </svg>`,
    content: {
      type: 'column-1',
      name: 'Column'
    },
    category: 'Column'
  },
  {
    id: 'column-2',
    label: '2 Column',
    media: `<svg viewBox="0 0 23 24">
    <path fill="currentColor" d="M2 20h8V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM13 20h8V4h-8v16Zm-1 0V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1Z"></path>
  </svg>`,
    content: {
      type: 'column-2',
      name: 'Column'
    },
    category: 'Column'
  },
  {
    id: 'column-3',
    label: '3 Column',
    media: `<svg viewBox="0 0 23 24">
    <path fill="currentColor" d="M2 20h4V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM17 20h4V4h-4v16Zm-1 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1ZM9.5 20h4V4h-4v16Zm-1 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z"></path>
  </svg>`,
    content: {
      type: 'column-3',
      name: 'Column'
    },
    category: 'Column'
  },
  {
    id: 'column-4',
    label: '4 Column',
    media: `<svg viewBox="0 0 23 24"><path fill="currentColor" d="M2 20h2V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM7 20h2V4h-2v16Zm-1 0V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1ZM12 20h2V4h-2v16Zm-1 0V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1ZM17 20h2V4h-2v16Zm-1 0V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1Z"/></svg>`,
    content: {
      type: 'column-4',
      name: 'Column'
    },
    category: 'Column'
  },
  {
    id: 'column-5',
    label: '5 Column',
    media: `<svg viewBox="0 0 23 24"><path fill="currentColor" d="M2 20h2V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM6.5 20h2V4h-2v16Zm-1 0V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1ZM11 20h2V4h-2v16Zm-1 0V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1ZM15.5 20h2V4h-2v16Zm-1 0V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1ZM20 20h2V4h-2v16Zm-1 0V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1Z"/></svg>`,
    content: {
      type: 'column-5',
      name: 'Column'
    },
    category: 'Column'
  },
  {
    id: 'column-6',
    label: '6 Column',
    media: `<svg viewBox="0 0 23 24"><path fill="currentColor" d="M2 20h1V4h-1v16Zm-1 0V4a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1ZM5.5 20h1V4h-1v16Zm-1 0V4a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1ZM9 20h1V4h-1v16Zm-1 0V4a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1ZM12.5 20h1V4h-1v16Zm-1 0V4a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1ZM16 20h1V4h-1v16Zm-1 0V4a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1ZM19.5 20h1V4h-1v16Zm-1 0V4a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1Z"/></svg>`,
    content: {
      type: 'column-6',
      name: 'Column'
    },
    category: 'Column'
  },
  {
    id: 'column-left',
    label: 'Left Sidebar',
    media: `<svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M2 20h5V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM10 20h12V4H10v16Zm-1 0V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1Z"></path>
  </svg>`,
    content: {
      type: 'column-left',
      name: 'Column'
    },
    category: 'Column'
  },
  {
    id: 'column-right',
    label: 'Right Sidebar',
    media: `<svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M2 20h12V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM17 20h5V4H17v16Zm-1 0V4a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H17a1 1 0 0 1-1-1Z"></path>
  </svg>`,
    content: {
      type: 'column-right',
      name: 'Column'
    },
    category: 'Column'
  },
  {
    id: 'headline',
    label: 'Headline',
    media: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 64C0 46.3 14.3 32 32 32H80h48c17.7 0 32 14.3 32 32s-14.3 32-32 32H112V208H336V96H320c-17.7 0-32-14.3-32-32s14.3-32 32-32h48 48c17.7 0 32 14.3 32 32s-14.3 32-32 32H400V240 416h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H368 320c-17.7 0-32-14.3-32-32s14.3-32 32-32h16V272H112V416h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H80 32c-17.7 0-32-14.3-32-32s14.3-32 32-32H48V240 96H32C14.3 96 0 81.7 0 64z"/></svg>
    `,
    
    content: {
      type: 'heading',
      name: 'Headline'
    },
    category: 'Text'
  },
  {
    id: 'paragraph',
    label: 'Paragraph',
    media:`<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-type"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>`,
    content: {
      type: 'paragraph',
      name: 'Paragraph'
    },
    category: 'Text'
  },
  {
    id: 'bullets',
    label: 'Bullets',
    media: `
    <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 434.98"><path fill-rule="nonzero" d="M99.67 32.07c-7.95 0-14.41-6.52-14.41-14.56 0-8.03 6.46-14.55 14.41-14.55h397.92c7.95 0 14.41 6.52 14.41 14.55 0 8.04-6.46 14.56-14.41 14.56H99.67zM17.35 434.98C7.77 434.98 0 427.13 0 417.46c0-9.66 7.77-17.51 17.35-17.51h.56c9.58 0 17.35 7.85 17.35 17.51 0 9.67-7.77 17.52-17.35 17.52h-.56zm0-132.4C7.77 302.58 0 294.73 0 285.06s7.77-17.51 17.35-17.51h.56c9.58 0 17.35 7.84 17.35 17.51 0 9.67-7.77 17.52-17.35 17.52h-.56zm0-135.14C7.77 167.44 0 159.59 0 149.92s7.77-17.51 17.35-17.51h.56c9.58 0 17.35 7.84 17.35 17.51 0 9.67-7.77 17.52-17.35 17.52h-.56zm83.4 132.17c-6.99 0-12.66-6.51-12.66-14.55 0-8.03 5.67-14.55 12.66-14.55h395.77c6.99 0 12.66 6.52 12.66 14.55 0 8.04-5.67 14.55-12.66 14.55H100.75zm0-135.14c-6.99 0-12.66-6.51-12.66-14.55 0-8.03 5.67-14.55 12.66-14.55h395.77c6.99 0 12.66 6.52 12.66 14.55 0 8.04-5.67 14.55-12.66 14.55H100.75zm0 267.55c-7.88 0-14.26-6.52-14.26-14.56 0-8.03 6.38-14.55 14.26-14.55h395.77c7.87 0 14.26 6.52 14.26 14.55 0 8.04-6.39 14.56-14.26 14.56H100.75zM17.35 35.03C7.77 35.03 0 27.18 0 17.51 0 7.85 7.77 0 17.35 0h.56c9.58 0 17.35 7.85 17.35 17.51 0 9.67-7.77 17.52-17.35 17.52h-.56z"/></svg>
    
    `,
    content: {
      type: 'bullet',
      name: 'Bullets'
    },
    category: 'Text'
  },
  {
    id: 'short-image',
    label: 'Image',
    media: `<svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M21,3H3C2,3 1,4 1,5V19A2,2 0 0,0 3,21H21C22,21 23,20 23,19V5C23,4 22,3 21,3M5,17L8.5,12.5L11,15.5L14.5,11L19,17H5Z"></path>
  </svg>`,
    content: {
      type: 'short-image',
      name: 'Image'
    },
    category: 'Media'
  },
  {
    id: 'short-video',
    label: 'Video',
    media: `<svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z"></path>
  </svg>`,
    content: {
      type: 'short-video',
      name: 'Video'
    },
    category: 'Media'
  },
  {
    id: 'input',
    label: 'Input',
    media: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.3-1H3.4C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.3 1h17.4c.8 0 1.3-.4 1.3-1V9zm-1 6H3V9h18v6z"></path><path d="M4 10h1v4H4z"></path></svg>`,
    content: {
      type: 'short-text',
      name: 'Input'
    },
    category: 'Form'
  },
  {
    id: 'select',
    label: 'Drop Down',
    media: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.3-1H3.4C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.3 1h17.4c.8 0 1.3-.4 1.3-1V9zm-1 6H3V9h18v6z"></path><path d="M18.5 13l1.5-2h-3zM4 11.5h11v1H4z"></path></svg>`,
    content: {
      type: 'select',
      name: 'Drop Down'
    },
    category: 'Form'
  },
  {
    id: 'text-area',
    label: 'Text Area',
    media: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 7.5c0-.9-.5-1.5-1.3-1.5H3.4C2.5 6 2 6.6 2 7.5v9c0 .9.5 1.5 1.3 1.5h17.4c.8 0 1.3-.6 1.3-1.5v-9zM21 17H3V7h18v10z"></path><path d="M4 8h1v4H4zM19 7h1v10h-1zM20 8h1v1h-1zM20 15h1v1h-1z"></path></svg>`,
    content: {
      type: 'long-text',
      name: 'Text Area'
    },
    category: 'Form'
  },
  {
    id: 'checkbox',
    label: 'Checkbox',
    media: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
    <path d="M10 17l-5-5 1.41-1.42L10 14.17l7.59-7.59L19 8m0-5H5c-1.11 0-2 .89-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5a2 2 0 0 0-2-2z"></path></svg>`,
    content: {
      type: 'checkbox',
      name: 'Checkbox'
    },
    category: 'Form'
  },
  // {
  //   id: 'sms',
  //   label: 'SMS',
  //   media: `<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  //   content: {
  //     type: 'email',
  //     name: 'SMS'
  //   },
  //   category: 'Form'
  // },
  {
    id: 'survey',
    label: 'Survey',
    media: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 5.5c0-.3-.5-.5-1.3-.5H3.4c-.8 0-1.3.2-1.3.5v3c0 .3.5.5 1.3.5h17.4c.8 0 1.3-.2 1.3-.5v-3zM21 8H3V6h18v2zM22 10.5c0-.3-.5-.5-1.3-.5H3.4c-.8 0-1.3.2-1.3.5v3c0 .3.5.5 1.3.5h17.4c.8 0 1.3-.2 1.3-.5v-3zM21 13H3v-2h18v2z"></path><rect width="10" height="3" x="2" y="15" rx=".5"></rect></svg>`,
    content: {
      type: 'star-rating',
      name: 'Survey'
    },
    category: 'Form'
  },
  {
    id: 'address',
    label: 'Address',
    media: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M21,6V8H3V6H21M3,18H12V16H3V18M3,13H21V11H3V13Z"></path></svg>`,
    content: {
      type: 'address',
      name: 'Address'
    },
    category: 'Form'
  },
  {
    id: 'signature',
    label: 'Signature',
    media: `<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
    content: {
      type: 'signature',
      name: 'Signature'
    },
    category: 'Form'
  },
  {
    id: 'button',
    label: 'Button',
    media: `<svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M20 20.5C20 21.3 19.3 22 18.5 22H13C12.6 22 12.3 21.9 12 21.6L8 17.4L8.7 16.6C8.9 16.4 9.2 16.3 9.5 16.3H9.7L12 18V9C12 8.4 12.4 8 13 8S14 8.4 14 9V13.5L15.2 13.6L19.1 15.8C19.6 16 20 16.6 20 17.1V20.5M20 2H4C2.9 2 2 2.9 2 4V12C2 13.1 2.9 14 4 14H8V12H4V4H20V12H18V14H20C21.1 14 22 13.1 22 12V4C22 2.9 21.1 2 20 2Z"></path>
</svg>`,
    content: {
      type: 'submit',
      name: 'Button'
    },
    category: 'Form'
  },
  {
    id: 'count-down',
    label: 'CountDown',
    media: `<svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M12 20C16.4 20 20 16.4 20 12S16.4 4 12 4 4 7.6 4 12 7.6 20 12 20M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2M17 11.5V13H11V7H12.5V11.5H17Z"></path>
  </svg>`,
    content: {
      type: 'count-down',
      name: 'Count Down'
    },
    category: 'Misc'
  },
  {
    id: 'product-list',
    label: 'Product-list',
    media: `
    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-archive"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>
    `,
    content: {
      type: 'product-list',
      name: 'Product List'
    },
    category: 'Misc'
  },
  {
    id: 'mym_text_box',
    label: 'MYM TextBox',
    media: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path d="M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5zM4.34 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25H4.34zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44zM15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35z"></path>
            </svg>`,
    content: {
      type: 'mym_text_box',
      name: 'MYM TextBox'
    },
    category: 'Misc'
  },
  {
    id: 'product',
    label: 'Product',
    media: `
    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-archive"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>
    
    `,
    content: {
      type: 'product',
      name: 'Product'
    },
    category: 'Misc'
  },
  {
    id: 'membership',
    label: 'Membership',
    media: `
    <svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M21,3H3C2,3 1,4 1,5V19A2,2 0 0,0 3,21H21C22,21 23,20 23,19V5C23,4 22,3 21,3M5,17L8.5,12.5L11,15.5L14.5,11L19,17H5Z"></path>
  </svg>
    
    `,
    content: {
      type: 'membership',
      name: 'Membership'
    },
    category: 'Misc'
  },
  // {
  //   id: 'membership_type',
  //   label: 'Type',
  //   media: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
  //               <path d="M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5zM4.34 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25H4.34zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44zM15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35z"></path>
  //           </svg>`,
  //   content: {
  //     type: 'membership_type',
  //     name: 'Membership Block'
  //   },
  //   category: 'Membership Block'
  // },
  // {
  //   id: 'membership_due',
  //   label: 'Due',
  //   media: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
  //               <path d="M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5zM4.34 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25H4.34zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44zM15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35z"></path>
  //           </svg>`,
  //   content: {
  //     type: 'membership_due',
  //     name: 'Membership Block'
  //   },
  //   category: 'Membership Block'
  // },
  // {
  //   id: 'membership_start_date',
  //   label: 'Start Date',
  //   media: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
  //               <path d="M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5zM4.34 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25H4.34zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44zM15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35z"></path>
  //           </svg>`,
  //   content: {
  //     type: 'membership_start_date',
  //     name: 'Membership Block'
  //   },
  //   category: 'Membership Block'
  // },
  // {
  //   id: 'membership_end_date',
  //   label: 'End Date',
  //   media: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
  //               <path d="M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5zM4.34 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25H4.34zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44zM15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35z"></path>
  //           </svg>`,
  //   content: {
  //     type: 'membership_end_date',
  //     name: 'Membership Block'
  //   },
  //   category: 'Membership Block'
  // },
  // {
  //   id: 'membership_total',
  //   label: 'Total',
  //   media: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
  //               <path d="M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5zM4.34 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25H4.34zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44zM15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35z"></path>
  //           </svg>`,
  //   content: {
  //     type: 'membership_total',
  //     name: 'Membership Block'
  //   },
  //   category: 'Membership Block'
  // },
  // {
  //   id: 'membership_down_pay',
  //   label: 'Down Pay',
  //   media: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
  //               <path d="M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5zM4.34 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25H4.34zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44zM15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35z"></path>
  //           </svg>`,
  //   content: {
  //     type: 'membership_down_pay',
  //     name: 'Membership Block'
  //   },
  //   category: 'Membership Block'
  // },
  // {
  //   id: 'membership_reg_fee',
  //   label: 'Reg.Fee',
  //   media: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
  //               <path d="M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5zM4.34 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25H4.34zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44zM15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35z"></path>
  //           </svg>`,
  //   content: {
  //     type: 'membership_reg_fee',
  //     name: 'Membership Block'
  //   },
  //   category: 'Membership Block'
  // },
  {
    id: 'fill_waiver',
    label: 'Waiver',
    media: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path d="M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5zM4.34 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25H4.34zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44zM15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35z"></path>
            </svg>`,
    content: {
      type: 'fill_waiver',
      name: 'Waiver'
    },
    category: 'Fillables'
  },
  // {
  //   id: 'fill_signature',
  //   label: 'Signature',
  //   media: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
  //               <path d="M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5zM4.34 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25H4.34zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44zM15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35z"></path>
  //           </svg>`,
  //   content: {
  //     type: 'fill_signature',
  //     name: 'Fillable Field'
  //   },
  //   category: 'Fillable Field'
  // }
];

export default blocksJson;
