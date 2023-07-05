const script = function(){

    if(typeof CKEDITOR == 'undefined')
    {
      var script = document.createElement('script');
      script.type = "text/javascript";
      script.src = "https://cdn.ckeditor.com/4.19.0/standard/ckeditor.js";
      document.body.appendChild(script);
    }
    else{
        window.$('[data-rte]').each(function(){
            window.CKEDITOR.replace(this);
        })
    }

}

let paragraphType = {
    model: {
        defaults:{
            tagName: 'div',
            draggable: '.section-column-child', // Can be dropped only inside `form` elements
            droppable: false, // Can't drop other elements inside
            attributes: {class: 'paragraph element'},
            components: [
                {
                    tagName: 'p',
                    type: 'text',
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mauris elit, porta et nibh eget, blandit lobortis augue. Donec mollis nunc augue, sit amet hendrerit ex lobortis ut. Duis at ullamcorper ligula. Vivamus in blandit metus, suscipit accumsan urna. In tempus odio tellus, eget laoreet est suscipit et. Fusce ullamcorper, est ut convallis luctus, turpis eros tempus sapien, ut commodo mi ipsum vitae elit. Phasellus commodo orci vel tempus iaculis.',
                    attributes: {class: 'short-text-label'},
                    draggable: false,
                    droppable: false,
                    selectable: false,
                    hoverable: false,
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
                    attributes: {class: 'fa fa-plus'},
                  }
                ],
                hoverable: false,
                badgable: false,
                draggable: false,
                droppable: false,
                selectable: false,
                attributes: {class: 'bottom add-more-element'},

              }

                /*`
                    <textarea name="par" id="par" rows="10" cols="80" data-rte="1">
                    </textarea>
                `*/
            ],
            styles: `
                .paragraph{ padding: 10px}
            `,
            script
        }
    }
}

export default paragraphType
