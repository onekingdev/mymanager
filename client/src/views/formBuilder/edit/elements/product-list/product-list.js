import ImageOne from '../../../../../assets/images/elements/beats-headphones.png';

function generateStarRating(rating, maxRating = 5) {
  const fullStar = '<i class="fa fa-star"></i>';
  const halfStar = '<i class="fa fa-star-half-o"></i>';
  const emptyStar = '<i class="fa fa-star-o"></i>';
  const roundedRating = rating;
  let ratingOutput = '';
  for (let i = 1; i <= Math.floor(roundedRating); i++) {
    ratingOutput += fullStar;
  }
  if ((Math.round(roundedRating * 2) / 2) % 1 !== 0) {
    ratingOutput += halfStar;
  }
  const remainingStars = maxRating - Math.ceil(roundedRating);
  for (let i = 1; i <= remainingStars; i++) {
    ratingOutput += emptyStar;
  }
  return `${ratingOutput} (${roundedRating} out of ${maxRating} stars)`;
}

// export function createProductComponent(product, selectedData) {
//   return {
//     tagName: 'div',
//     attributes: { class: 'product p-1', productId: product.id },
//     components: [
//       {
//         tagName: 'img',
//         components: '',
//         draggable: false,
//         droppable: false,
//         selectable: false,
//         hoverable: false,
//         attributes: { class: '', alt: 'Demo Image', src: product.sku }
//       },
//       {
//         tagName: 'div',
//         attributes: { class: 'scale-rating element'},
//         components: [
//           {
//             tagName: 'div',
//             draggable: '.section-column-child',
//             droppable: false,
//             attributes: { class: '' },
//             components: [
//               `<div class='d-flex justify-content-between'>
//                       <div class="rating_scale">
//                           ${generateStarRating(4.5)}
//                       </div>
//                       <h3>${product.price}</h3>
//                   </div>
//                   `
//             ]
//           }
//         ]
//       },
//       {
//         tagName: 'h3',
//         attributes: { class: 'product-title p-1' },
//         components: [product.name]
//       },
//       {
//         tagName: 'p',
//         attributes: { class: 'product-description p-1' },
//         components: [product.desc]
//       },
//       {
//         tagName: 'div',
//         attributes: { class: 'd-flex justify-content-between' },
//         components: [
//           {
//             attributes: { class: '' },
//             components: [
//               `
//                    <div class='d-flex justify-content-between'>
//                       <Button class="favrote btn "><i class='fa fa-heart'></i> Favroute </Button>
//                       <Button class="primary btn"><i class='fa fa-shopping-cart'></i> Buy Now</Button>
//                    </div>
//                 `
//             ]
//           }
//         ]
//       }
//     ]
//   };
// }

export function createProductComponent(product) {
  return {
    tagName: 'div',
    selectable: false,
    hoverable: false,
    attributes: { class: 'product p-1', productId: product._id },
    components: [
      {
        tagName: 'img',
        components: '',
        draggable: false,
        droppable: false,
        selectable: false,
        hoverable: false,
        attributes: { class: '', alt: 'Demo Image', src: product.product_url }
      },
      {
        tagName: 'div',
        selectable: false,
        hoverable: false,
        attributes: { class: 'scale-rating element' },
        components: [
          {
            tagName: 'div',
            draggable: '.section-column-child',
            droppable: false,
            selectable: false,
            hoverable: false,
            attributes: { class: 'html-container' },
            content:
              `<div class='d-flex justify-content-between'>
                      <div class="rating_scale">
                          ${generateStarRating(product.product_rating)}
                      </div>
                      <h3>${product?.product_price}</h3>
                  </div>
                  `

          }
        ]
      },
      {
        tagName: 'h3',
        selectable: false,
        hoverable: false,
        attributes: { class: 'product-title p-1' },
        components: [product?.product_name]
      },
      {
        tagName: 'p',
        selectable: false,
        hoverable: false,
        attributes: { class: 'product-description p-1' },
        components: [product?.product_description]
      },
      {
        tagName: 'div',
        selectable: false,
        hoverable: false,
        attributes: { class: 'd-flex justify-content-between' },
        components: [
          {
            tagName: 'div',
            droppable: false,
            selectable: false,
            hoverable: false,
            attributes: { class: 'html-container' },
            content:
              `
                   <div class='d-flex justify-content-between'>
                      <Button class="favrote btn" name="product-favourite" data-content="${encodeURIComponent(JSON.stringify(product))}"><i class='fa fa-heart'></i> Favroute </Button>
                      <Button class="primary btn" name="product-buy" data-content="${encodeURIComponent(JSON.stringify(product))}"><i class='fa fa-shopping-cart'></i> Buy Now</Button>
                   </div>
                `

          }
        ]
      }
    ]
  };
}

const script = function () {
  /* Set rates + misc */
  var taxRate = 0.05;
  var shippingRate = 15.0;
  var fadeTime = 300;

  /* Assign actions */
  window.$('.product-quantity input').change(function () {
    updateQuantity(this);
  });

  window.$('.product-removal button').click(function () {
    removeItem(this);
  });

  /* Recalculate cart */
  function recalculateCart() {
    var subtotal = 0;

    /* Sum up row totals */
    window.$('.product').each(function () {
      subtotal += parseFloat(window.$(this).children('.product-line-price').text());
    });

    /* Calculate totals */
    var tax = subtotal * taxRate;
    var shipping = subtotal > 0 ? shippingRate : 0;
    var total = subtotal + tax + shipping;

    /* Update totals display */
    window.$('.totals-value').fadeOut(fadeTime, function () {
      window.$('#cart-subtotal').html(subtotal.toFixed(2));
      window.$('#cart-tax').html(tax.toFixed(2));
      window.$('#cart-shipping').html(shipping.toFixed(2));
      window.$('#cart-total').html(total.toFixed(2));
      if (total === 0) {
        window.$('.checkout').fadeOut(fadeTime);
      } else {
        window.$('.checkout').fadeIn(fadeTime);
      }
      window.$('.totals-value').fadeIn(fadeTime);
    });
  }

  /* Update quantity */
  function updateQuantity(quantityInput) {
    /* Calculate line price */
    var productRow = window.$(quantityInput).parent().parent();
    var price = parseFloat(productRow.children('.product-price').text());
    var quantity = window.$(quantityInput).val();
    var linePrice = price * quantity;

    /* Update line price display and recalc cart totals */
    productRow.children('.product-line-price').each(function () {
      window.$(this).fadeOut(fadeTime, function () {
        window.$(this).text(linePrice.toFixed(2));
        recalculateCart();
        window.$(this).fadeIn(fadeTime);
      });
    });
  }

  /* Remove item from cart */
  function removeItem(removeButton) {
    /* Remove row from DOM and recalc cart total */
    var productRow = window.$(removeButton).parent().parent();
    productRow.slideUp(fadeTime, function () {
      productRow.remove();
      recalculateCart();
    });
  }
};

const productListType = {
  model: {
    defaults: {
      tagName: 'div',
      draggable: '.section-column-child',
      droppable: false,
      attributes: { class: 'product-card element' },
      components: [
        createProductComponent({
          _id: 1,
          product_url: ImageOne,
          product_name: 'Lenovo Thinkpad',
          category: 'Product',
          subCategory: 'Laptop',
          product_description: 'Everyone please give your full name and email address',
          product_rating: 5,
          product_price: 234,
          stock: 29
        }),
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
      styles: `
          .product-card {
            padding: 5px;
          }
          img{
            width: 100%;
          }
          .favrote{
            background: #c0b8b8 !important;
          }
          .primary{
            background: blue !important;
            color: #fff !important;
          }
          .product-price {
            font-size: 18px;
            font-weight: 600;
            color: #212529;
          }
          .product-title {
            font-size: 20px;
            font-weight: 600;
            color: #212529;
          }
          .product-description {
            color: #6c757d;
          }
        `,
      script
    }
  }
};

export default productListType;
