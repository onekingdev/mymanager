const addressType = {
  // Make the editor understand when to bind `my-input-type`
  //isComponent: el => el.tagName === 'INPUT',
  // Model definition
  model: {
    // Default properties
    defaults: {
      tagName: 'div',
      //draggable: 'form, form *', // Can be dropped only inside `form` elements
      draggable: '.section-column-child', // Can be dropped only inside `form` elements
      droppable: false, // Can't drop other elements inside
      attributes: { class: 'address element' },
      components: [
        {
          tagName: 'div',
          attributes: { class: 'address-section' },
          draggable: false,
          droppable: false,
          selectable: false,
          hoverable: false,
          components: [
            {
              tagName: 'h5',
              attributes: { class: 'address-type' },
              draggable: false,
              droppable: false,
              selectable: false,
              hoverable: false,
              components: 'Enter your address'
            },
            {
              tagName: 'div',
              attributes: { class: '  -address' },
              draggable: false,
              droppable: false,
              selectable: false,
              hoverable: false,
              components: [
                {
                  tagName: 'h6',
                  type: 'text',
                  components: 'Full Address*',
                  draggable: false,
                  droppable: false,
                  selectable: false,
                },
                {
                  tagName: 'input',
                  attributes: {
                    type: 'text',
                    name: 'address',
                    class: 'address-input',
                    placeHolder: '   Full Address...'
                  },
                  draggable: false,
                  droppable: false,
                  selectable: false,
                },
              ]
            },
            {
              tagName: 'div',
              attributes: { class: 'address-city' },
              draggable: false,
              droppable: false,
              selectable: false,
              hoverable: false,
              components: [
                {
                  tagName: 'h6',
                  type: 'text',
                  components: 'City Name*',
                  draggable: false,
                  droppable: false,
                  selectable: false,
                },
                {
                  tagName: 'input',
                  attributes: {
                    type: 'text',
                    name: 'city',
                    class: 'address-input',
                    placeHolder: '    City Name...'
                  },
                  draggable: false,
                  droppable: false,
                  selectable: false,
                },
              ]
            },
            {
              tagName: 'div',
              attributes: { class: 'address-country' },
              draggable: false,
              droppable: false,
              selectable: false,
              hoverable: false,
              components: [
                {
                  tagName: 'h6',
                  type: 'text',
                  components: 'Country',
                  draggable: false,
                  droppable: false,
                  selectable: false,
                },
                {
                  tagName: 'input',
                  attributes: {
                    type: 'text',
                    name: 'country',
                    class: 'address-input',
                    placeHolder: '    Select Country'
                  },
                  draggable: false,
                  droppable: false,
                  selectable: false,
                },
              ]
            },

            {
              tagName: 'div',
              attributes: { class: 'address-state-container' },
              draggable: false,
              droppable: false,
              selectable: false,
              hoverable: false,
              components: [
                {
                  tagName: 'div',
                  attributes: { class: 'address-state' },
                  draggable: false,
                  droppable: false,
                  selectable: false,
                  hoverable: false,
                  components: [
                    {
                      tagName: 'h6',
                      type: 'text',
                      components: 'State / Province*',
                      draggable: false,
                      droppable: false,
                      selectable: false,
                    },
                    {
                      tagName: 'input',
                      attributes: {
                        type: 'text',
                        name: 'state',
                        class: 'address-input',
                        placeHolder: '    State/Province...'
                      },
                      draggable: false,
                      droppable: false,
                      selectable: false,
                    },
                  ]
                },
                {
                  tagName: 'div',
                  attributes: { class: 'address-zip' },
                  draggable: false,
                  droppable: false,
                  selectable: false,
                  hoverable: false,
                  components: [
                    {
                      tagName: 'h6',
                      type: 'text',
                      components: 'Zip Code*',
                      draggable: false,
                      droppable: false,
                      selectable: false,
                    },
                    {
                      tagName: 'input',
                      attributes: {
                        type: 'text',
                        name: 'zip',
                        class: 'address-input',
                        placeHolder: '    Zip Code...'
                      },
                      draggable: false,
                      droppable: false,
                      selectable: false,
                    },
                  ]
                }

              ]
            },
          ],
        },

        {
          tagName: 'div',
          components: [
            {
              tagName: 'i',
              components: '',
              hoverable: false,
              badgable: false,
              draggable: false,
              droppable: false,
              selectable: false,
              attributes: { class: 'fa fa-plus' },
            }
          ],
          hoverable: false,
          badgable: false,
          draggable: false,
          droppable: false,
          selectable: false,
          attributes: { class: 'bottom add-more-element' },

        }

      ],

      styles: `.address {padding: 10px;}
                     .address-text {width: 100%;}
                     .address-input {width: 100%; height: 43px; border: 1px solid #ccc; border-radius:5px; }
                     .address-section div {margin-top: 10px;}
                     .address-state-container {display: flex}
                     .address-state {width: 60%; margin-right: 10px;}
                     .address-zip {flex: 1}

            `
    }
  },
}

export default addressType
