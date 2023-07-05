/*
YOUTUBE
<iframe width="560" height="315" src="https://www.youtube.com/embed/EI65nOBRaT8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

VIMEO
<div style="padding:75% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/804826164?h=5d4c7b7424&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;" title="New Recording - 3/5/2023, 4:57:30 PM"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>

Wistia
<script src="https://fast.wistia.com/embed/medias/52zeohgwa7.jsonp" async></script><script src="https://fast.wistia.com/assets/external/E-v1.js" async></script><div class="wistia_responsive_padding" style="padding:177.71% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div class="wistia_embed wistia_async_52zeohgwa7 videoFoam=true" style="height:100%;position:relative;width:100%"><div class="wistia_swatch" style="height:100%;left:0;opacity:0;overflow:hidden;position:absolute;top:0;transition:opacity 200ms;width:100%;"><img src="https://fast.wistia.com/embed/medias/52zeohgwa7/swatch" style="filter:blur(5px);height:100%;object-fit:contain;width:100%;" alt="" aria-hidden="true" onload="this.parentNode.style.opacity=1;" /></div></div></div></div>

*/

let Video = {
  model: {
    defaults: {
      tagName: 'div',
      draggable: '.section-column-child', // Can be dropped only inside `form` elements
      droppable: true, // Can't drop other elements inside
      attributes: {
        class: 'video-element',
        type: 'iframe'
      },
      components: [
        {
          tagName: 'iframe',
          components: '',
          draggable: false,
          droppable: false,
          selectable: false,
          hoverable: false,
          attributes: {
            class: '',
            src: '',
            controls: true,
            allow:
              'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
            allowfullscreen: true
          }
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
              attributes: { class: 'fa fa-plus' }
            }
          ],
          hoverable: false,
          badgable: false,
          draggable: false,
          droppable: false,
          selectable: false,
          attributes: { class: 'bottom add-more-element' }
        }
      ],
      styles: ``
    }
  }
};

export default Video;
