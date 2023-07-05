


export function createMembershipComponent(membership) {
  return {
    tagName: 'div',

    content: `<div class="MuiPaper-root MuiCard-root makeStyles-cardStyle-30 MuiPaper-elevation1 MuiPaper-rounded">
  <div class="MuiCardContent-root">
    <div class="row">
      <div class="col-sm-12 col-md-12 col-lg-12"><p class="MuiTypography-root mt-1 MuiTypography-body1"
                                                    style="color: rgb(57, 57, 57); font-size: 1.6rem;">Card Details</p>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-6">
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-12">
            <div class="form-label-group form-group">
              <div><label htmlFor="CardHolder" class="">Card Holder Name</label></div>
              <input required="" name="card_holder_name" id="CardHolder" placeholder="card holder name" type="text"
                     class="form-control" value=""/></div>
          </div>
          <div class="col-sm-12 col-md-12 col-lg-12">
            <div class="form-label-group form-group">
              <div><label htmlFor="Pan" class="">Card Number</label></div>
              <input required="" name="pan" id="Pan" placeholder="Card number" class="form-control" type="text"
                     value="" inputMode="numeric"/></div>
          </div>
          <div class="col-sm-6 col-md-4 col-lg-4">
            <div class="form-label-group form-group">
              <div><label htmlFor="cvv" class="">CVV</label></div>
              <input name="cvv" id="cvv" placeholder="cvv" class="form-control" type="number" value=""
                     inputMode="numeric"/></div>
          </div>
          <div class="col-sm-6 col-md-4 col-lg-4">
            <div class="form-group">
              <div><label htmlFor="expiry_date" class="">Expiry Date</label></div>
              <input required="" name="expiry_date" id="expiry_date" placeholder="MM YY" class="form-control"
                     type="text" value="" inputMode="numeric"/></div>
          </div>
          <div class="col-sm-12 col-md-4 col-lg-4">
            <div class="form-label-group form-group">
              <div><label htmlFor="Amount" class="">Amount</label></div>
              <input required="" name="amount" id="Amount" placeholder="Amount" type="number" class="form-control"
                     value=""/></div>
          </div>
          <div class="col-sm-6 col-md-6 col-lg-6">
            <div class="form-label-group form-group">
              <div><label htmlFor="phone" class="">Phone</label></div>
              <input required="" name="phone" id="phone" placeholder="phone" class="form-control" type="text"
                     value="" inputMode="numeric"/></div>
          </div>
          <div class="col-sm-6 col-md-6 col-lg-6">
            <div class="form-label-group form-group">
              <div><label htmlFor="email" class="">Email</label></div>
              <input required="" name="email" id="email" placeholder="email" type="email" class="form-control"
                     value=""/></div>
          </div>
          <div class="col-sm-12 col-md-12 col-lg-12">
            <div class="cardlogoWrapper"></div>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-6">
        <div style="background: rgb(246, 246, 246);">
          <div class="p-1" style="background: rgb(246, 246, 246);">
            <ul class="MuiList-root MuiList-dense MuiList-padding" style="width: 100%;">
              <li class="MuiListItem-root MuiListItem-dense MuiListItem-gutters"><b>Cart Summary</b></li>
              <li class="MuiListItem-root d-flex justify-content-between MuiListItem-dense MuiListItem-gutters"
                  style="border-bottom: 1px solid rgb(212, 213, 217);">
                <div class="makeStyles-primaryTitle-42">Price</div>
                <div class="makeStyles-secondaryTitle-43" name="total_price">$ ${membership.balance}</div>
              </li>
              <li class="MuiListItem-root MuiListItem-dense MuiListItem-gutters"><b>PAY NOW</b></li>
              <li class="MuiListItem-root d-flex justify-content-between MuiListItem-dense MuiListItem-gutters">
                <div class="makeStyles-primaryTitle-42">Down Payment</div>
                <div class="makeStyles-secondaryTitle-43" name="down_payment">$ ${membership.down_payment}</div>
              </li>
              <li class="MuiListItem-root d-flex justify-content-between MuiListItem-dense MuiListItem-gutters"
                  style="border-bottom: 1px solid rgb(212, 213, 217);">
                <div class="makeStyles-primaryTitle-42">Registration Fee</div>
                <div class="makeStyles-secondaryTitle-43" name="registration_fee">$ 0</div>
              </li>
              <li
                class="MuiListItem-root mt-2 d-flex justify-content-between text-success MuiListItem-dense MuiListItem-gutters"
                style="font-size: 1.4rem;">
                <div class="makeStyles-primaryTitle-42"><b>Total</b></div>
                <div><b name="total_price_amount">$ ${membership.total_price}</b></div>
              </li>
              <li class="MuiListItem-root d-flex justify-content-center MuiListItem-dense MuiListItem-gutters">
                <button class="MuiButtonBase-root MuiButton-root MuiButton-text" tabIndex="0"
                        type="submit" name="pay_now" data-content="${encodeURIComponent(JSON.stringify(membership))}><span class="MuiButton-label">Pay Now</span><span
                  class="MuiTouchRipple-root"></span></button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
                `,
    hoverable: false,
    badgable: false,
    draggable: false,
    droppable: false,
    selectable: true,
    attributes: {class: 'p-3 html-container', membershipId: membership._id },

  }
}

let membershipType = {
  model: {
    // Default properties
    defaults: {
      tagName: 'div',
      attributes: {class: 'membership element'},
      draggable: '.section-column-child', // Can be dropped only inside `form` elements
      droppable: false, // Can't drop other elements inside
      components: [
        createMembershipComponent({
          _id: 1,
          total_price: 1750,
          balance:1000,
          down_payment: 750
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
      ],
      styles: `
                .heading {padding: 10px;}
          `,
      stylable: ['heading-1', 'heading-2', 'font-size', 'align-content'],
    }
  }
}

export default membershipType;

