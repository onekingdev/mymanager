exports.otpVerificationBody = (otp) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="font-family:arial, 'helvetica neue', helvetica, sans-serif"> 
<head> 
  <meta charset="UTF-8"> 
  <meta content="width=device-width, initial-scale=1" name="viewport"> 
  <meta name="x-apple-disable-message-reformatting"> 
  <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
  <meta content="telephone=no" name="format-detection"> 
  <title>New message</title><!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
<xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG></o:AllowPNG>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
</xml>
<![endif]--> 
  <style type="text/css">
#outlook a {
  padding:0;
}
.es-button {
  mso-style-priority:100!important;
  text-decoration:none!important;
}
a[x-apple-data-detectors] {
  color:inherit!important;
  text-decoration:none!important;
  font-size:inherit!important;
  font-family:inherit!important;
  font-weight:inherit!important;
  line-height:inherit!important;
}
.es-desk-hidden {
  display:none;
  float:left;
  overflow:hidden;
  width:0;
  max-height:0;
  line-height:0;
  mso-hide:all;
}
[data-ogsb] .es-button {
  border-width:0!important;
  padding:10px 30px 10px 30px!important;
}
@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120% } h1 { font-size:36px!important; text-align:left } h2 { font-size:26px!important; text-align:left } h3 { font-size:20px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:36px!important; text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important; text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important; text-align:left } .es-menu td a { font-size:12px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:20px!important; display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0!important } .es-m-p0r { padding-right:0!important } .es-m-p0l { padding-left:0!important } .es-m-p0t { padding-top:0!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-m-p5 { padding:5px!important } .es-m-p5t { padding-top:5px!important } .es-m-p5b { padding-bottom:5px!important } .es-m-p5r { padding-right:5px!important } .es-m-p5l { padding-left:5px!important } .es-m-p10 { padding:10px!important } .es-m-p10t { padding-top:10px!important } .es-m-p10b { padding-bottom:10px!important } .es-m-p10r { padding-right:10px!important } .es-m-p10l { padding-left:10px!important } .es-m-p15 { padding:15px!important } .es-m-p15t { padding-top:15px!important } .es-m-p15b { padding-bottom:15px!important } .es-m-p15r { padding-right:15px!important } .es-m-p15l { padding-left:15px!important } .es-m-p20 { padding:20px!important } .es-m-p20t { padding-top:20px!important } .es-m-p20r { padding-right:20px!important } .es-m-p20l { padding-left:20px!important } .es-m-p25 { padding:25px!important } .es-m-p25t { padding-top:25px!important } .es-m-p25b { padding-bottom:25px!important } .es-m-p25r { padding-right:25px!important } .es-m-p25l { padding-left:25px!important } .es-m-p30 { padding:30px!important } .es-m-p30t { padding-top:30px!important } .es-m-p30b { padding-bottom:30px!important } .es-m-p30r { padding-right:30px!important } .es-m-p30l { padding-left:30px!important } .es-m-p35 { padding:35px!important } .es-m-p35t { padding-top:35px!important } .es-m-p35b { padding-bottom:35px!important } .es-m-p35r { padding-right:35px!important } .es-m-p35l { padding-left:35px!important } .es-m-p40 { padding:40px!important } .es-m-p40t { padding-top:40px!important } .es-m-p40b { padding-bottom:40px!important } .es-m-p40r { padding-right:40px!important } .es-m-p40l { padding-left:40px!important } }
</style> 
</head> 
<body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
  <div class="es-wrapper-color" style="background-color:#FAFAFA"><!--[if gte mso 9]>
      <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
        <v:fill type="tile" color="#fafafa"></v:fill>
      </v:background>
    <![endif]--> 
  <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FAFAFA"> 
    <tr> 
      <td valign="top" style="padding:0;Margin:0"> 
      <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
        <tr> 
          <td align="center" style="padding:0;Margin:0"> 
          <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
            <tr> 
              <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px"> 
              <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                <tr> 
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                  <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                    <tr> 
                      <td align="left" style="padding:0;Margin:0; display: flex; justify-content: space-between"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:-apple-system, blinkmacsystemfont, 'segoe ui', roboto, helvetica, arial, sans-serif, 'apple color emoji', 'segoe ui emoji', 'segoe ui symbol';line-height:24px;color:#174AE7;font-size:16px"><strong>Welcome To My Manager</strong></p><img src="https://me.mymanager.com/static/media/logo.01654d61.svg" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;margin-left: 5px; width: 150px"></td> 
                    </tr> 
                  </table></td> 
                </tr> 
              </table></td> 
            </tr> 
            <tr> 
              <td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px"> 
              <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                <tr> 
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                  <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                    <tr> 
                      <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px;font-size:0px"><img src="https://jhclqt.stripocdn.email/content/guids/CABINET_67e080d830d87c17802bd9b4fe1c0912/images/55191618237638326.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="100"></td> 
                    </tr> 
                    <tr> 
                      <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;padding-bottom:10px"><h1 style="Margin:0;line-height:46px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:46px;font-style:normal;font-weight:bold;color:#333333">Confirm Your Email</h1></td> 
                    </tr> 
                    <tr> 
                      <td align="center" class="es-m-p0r es-m-p0l" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">You’ve received this message because your email address has been registered with our site. Please use the verification code bellow and confirm that you are the owner of this account.</p></td> 
                    </tr> 
                    <tr> 
                      <td align="center" style="padding:0;Margin:0;padding-bottom:5px;padding-top:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">If you did not register with us, please disregard this email.</p></td> 
                    </tr> 
                    <tr> 
                      <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><span class="es-button-border" style="border-style:solid;border-color:#174AE7;background:#174AE7;border-width:0px;display:inline-block;border-radius:6px;width:auto"><a href="" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:20px;border-style:solid;border-color:#174AE7;border-width:10px 30px 10px 30px;display:inline-block;background:#174AE7;border-radius:6px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:24px;width:auto;text-align:center;border-left-width:30px;border-right-width:30px">${otp}</a></span></td> 
                    </tr> 
                    <tr> 
                      <td align="center" class="es-m-p0r es-m-p0l" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Once confirmed, this email will be uniquely associated with your account.</p></td> 
                    </tr> 
                  </table></td> 
                </tr> 
              </table></td> 
            </tr> 
          </table></td> 
        </tr> 
      </table> 
      <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"> 
        <tr> 
          <td align="center" style="padding:0;Margin:0"> 
          <table class="es-footer-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:640px"> 
            <tr> 
              <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px"> 
              <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                <tr> 
                  <td align="left" style="padding:0;Margin:0;width:600px"> 
                  <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                    <tr> 
                      <td align="center" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px;font-size:0"> 
                      <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                        <tr> 
                          <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><img title="Facebook" src="https://jhclqt.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                          <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><img title="Twitter" src="https://jhclqt.stripocdn.email/content/assets/img/social-icons/logo-black/twitter-logo-black.png" alt="Tw" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                          <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><img title="Instagram" src="https://jhclqt.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                          <td align="center" valign="top" style="padding:0;Margin:0"><img title="Youtube" src="https://jhclqt.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Yt" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                        </tr> 
                      </table></td> 
                    </tr> 
                    <tr> 
                      <td align="center" style="padding:0;Margin:0;padding-bottom:35px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;color:#333333;font-size:12px">mymanager © 2022&nbsp;All Rights Reserved.<br></p></td> 
                    </tr> 
                  </table></td> 
                </tr> 
              </table></td> 
            </tr> 
          </table></td> 
        </tr> 
      </table> 
      <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
        <tr> 
          <td class="es-info-area" align="center" style="padding:0;Margin:0"> 
          <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" bgcolor="#FFFFFF"> 
            <tr> 
              <td align="left" style="padding:20px;Margin:0"> 
              <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                <tr> 
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                  <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                    <tr> 
                      <td align="center" class="es-infoblock" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px"><a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px"></a>No longer want to receive these emails?&nbsp;<a href="" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px">Unsubscribe</a>.<a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px"></a></p></td> 
                    </tr> 
                  </table></td> 
                </tr> 
              </table></td> 
            </tr> 
          </table></td> 
        </tr> 
      </table></td> 
    </tr> 
  </table> 
  </div>  
</body>
</html>
  `;

exports.documentEmailTemplate = ({ ...data }) => {
  const emailContent = {
    new: {
      button: `Review Document`,
      text: `sent you a document to review and sign`,
    },
    reminder: {
      button: `Review Document`,
      text: `sent you a document to review and sign`,
    },
    viewed: {
      button: `Review`,
      text: `viewed your document`,
    },
    completed: {
      button: `View Completed Documents`,
      text: `Your document has been completed`,
    },
    expired: {
      text: `Your document has been voided`,
    },
  };
  // const MYMANAGERLOGO = "https://mymember.com/static/media/logo.74bfe749.png";
  const MYMANAGERLOGO = "https://mymanager.com/static/media/logo.86b72fab.svg";

  let person;

  if (data.type === "new" || data.type === "viewed") {
    person = data.senderName;
  } else {
    person = "";
  }

  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="font-family:arial, 'helvetica neue', helvetica, sans-serif"> 
  <head> 
    <meta charset="UTF-8"> 
    <meta content="width=device-width, initial-scale=1" name="viewport"> 
    <meta name="x-apple-disable-message-reformatting"> 
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
    <meta content="telephone=no" name="format-detection"> 
    <title>New message</title><!--[if (mso 16)]>
      <style type="text/css">
      a {text-decoration: none;}
      </style>
      <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
  <xml>
      <o:OfficeDocumentSettings>
      <o:AllowPNG></o:AllowPNG>
      <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
  </xml>
  <![endif]--> 
    <style type="text/css">
  #outlook a {
    padding:0;
  }
  .es-button {
    mso-style-priority:100!important;
    text-decoration:none!important;
  }
  a[x-apple-data-detectors] {
    color:inherit!important;
    text-decoration:none!important;
    font-size:inherit!important;
    font-family:inherit!important;
    font-weight:inherit!important;
    line-height:inherit!important;
  }
  .es-desk-hidden {
    display:none;
    float:left;
    overflow:hidden;
    width:0;
    max-height:0;
    line-height:0;
    mso-hide:all;
  }
  [data-ogsb] .es-button {
    border-width:0!important;
    padding:10px 30px 10px 30px!important;
  }
  @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120% } h1 { font-size:36px!important; text-align:left } h2 { font-size:26px!important; text-align:left } h3 { font-size:20px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:36px!important; text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important; text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important; text-align:left } .es-menu td a { font-size:12px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:20px!important; display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0!important } .es-m-p0r { padding-right:0!important } .es-m-p0l { padding-left:0!important } .es-m-p0t { padding-top:0!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-m-p5 { padding:5px!important } .es-m-p5t { padding-top:5px!important } .es-m-p5b { padding-bottom:5px!important } .es-m-p5r { padding-right:5px!important } .es-m-p5l { padding-left:5px!important } .es-m-p10 { padding:10px!important } .es-m-p10t { padding-top:10px!important } .es-m-p10b { padding-bottom:10px!important } .es-m-p10r { padding-right:10px!important } .es-m-p10l { padding-left:10px!important } .es-m-p15 { padding:15px!important } .es-m-p15t { padding-top:15px!important } .es-m-p15b { padding-bottom:15px!important } .es-m-p15r { padding-right:15px!important } .es-m-p15l { padding-left:15px!important } .es-m-p20 { padding:20px!important } .es-m-p20t { padding-top:20px!important } .es-m-p20r { padding-right:20px!important } .es-m-p20l { padding-left:20px!important } .es-m-p25 { padding:25px!important } .es-m-p25t { padding-top:25px!important } .es-m-p25b { padding-bottom:25px!important } .es-m-p25r { padding-right:25px!important } .es-m-p25l { padding-left:25px!important } .es-m-p30 { padding:30px!important } .es-m-p30t { padding-top:30px!important } .es-m-p30b { padding-bottom:30px!important } .es-m-p30r { padding-right:30px!important } .es-m-p30l { padding-left:30px!important } .es-m-p35 { padding:35px!important } .es-m-p35t { padding-top:35px!important } .es-m-p35b { padding-bottom:35px!important } .es-m-p35r { padding-right:35px!important } .es-m-p35l { padding-left:35px!important } .es-m-p40 { padding:40px!important } .es-m-p40t { padding-top:40px!important } .es-m-p40b { padding-bottom:40px!important } .es-m-p40r { padding-right:40px!important } .es-m-p40l { padding-left:40px!important } }
  </style> 
  </head> 
  <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
    <div class="es-wrapper-color" style="background-color:#FAFAFA"><!--[if gte mso 9]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
          <v:fill type="tile" color="#fafafa"></v:fill>
        </v:background>
      <![endif]--> 
    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FAFAFA"> 
      <tr> 
        <td valign="top" style="padding:0;Margin:0"> 
        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
          <tr> 
            <td align="center" style="padding:0;Margin:0"> 
            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
              <tr> 
                <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px"> 
                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                  <tr> 
                    <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                      <tr> 
                        <td align="left" style="padding:0;Margin:0; display: flex; justify-content: space-between"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:-apple-system, blinkmacsystemfont, 'segoe ui', roboto, helvetica, arial, sans-serif, 'apple color emoji', 'segoe ui emoji', 'segoe ui symbol';line-height:24px;color:#174AE7;font-size:16px"><strong>Sent via My Manager</strong></p> <img src="https://me.mymanager.com/static/media/logo.01654d61.svg" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;margin-left: 5px; width: 150px"></td> 
                      </tr> 
                    </table></td> 
                  </tr> 
                </table></td> 
              </tr> 
              <tr> 
                <td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px"> 
                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                  <tr> 
                    <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                      <tr> 
                        <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px;font-size:0px"><img src="https://jhclqt.stripocdn.email/content/guids/CABINET_67e080d830d87c17802bd9b4fe1c0912/images/55191618237638326.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="100"></td> 
                      </tr> 
                      <tr> 
                        <td align="center" class="es-m-p0r es-m-p0l" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">${person} ${
    emailContent[data.type].text
  }</p></td> 
                      </tr> 
                      <tr> 
                        <td align="center" class="es-m-p0r es-m-p0l" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Dear ${
                          data.recipientName
                        },</p></td> 
                      </tr> 
                    
                      
                      <tr> 
                        <td align="center" style="padding:0;Margin:0;padding-bottom:5px;padding-top:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"> ${
                          data.message
                        }</p></td> 
                      </tr> 
                      <tr> 
                        <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><span class="es-button-border" style="border-style:solid;border-color:#174AE7;background:#174AE7;border-width:0px;display:inline-block;border-radius:6px;width:auto"><a href="${
                          data.docLink
                        }" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:20px;border-style:solid;border-color:#174AE7;border-width:10px 30px 10px 30px;display:inline-block;background:#174AE7;border-radius:6px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:24px;width:auto;text-align:center;border-left-width:30px;border-right-width:30px">${
    emailContent[data.type].button
  }</a></span></td> 
                      </tr> 
                      <tr> 
                        <td align="center" class="es-m-p0r es-m-p0l" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Best regards, ${
                          data.senderName
                        }</p></td> 
                      </tr> 
                    </table></td> 
                  </tr> 
                </table></td> 
              </tr> 
            </table></td> 
          </tr> 
        </table> 
        <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"> 
          <tr> 
            <td align="center" style="padding:0;Margin:0"> 
            <table class="es-footer-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:640px"> 
              <tr> 
                <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px"> 
                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                  <tr> 
                    <td align="left" style="padding:0;Margin:0;width:600px"> 
                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                      <tr> 
                        <td align="center" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px;font-size:0"> 
                        <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                          <tr> 
                            <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><img title="Facebook" src="https://jhclqt.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                            <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><img title="Twitter" src="https://jhclqt.stripocdn.email/content/assets/img/social-icons/logo-black/twitter-logo-black.png" alt="Tw" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                            <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><img title="Instagram" src="https://jhclqt.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                            <td align="center" valign="top" style="padding:0;Margin:0"><img title="Youtube" src="https://jhclqt.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Yt" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                          </tr> 
                        </table></td> 
                      </tr> 
                      <tr> 
                        <td align="center" style="padding:0;Margin:0;padding-bottom:35px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;color:#333333;font-size:12px">mymanager © 2022&nbsp;All Rights Reserved.<br></p></td> 
                      </tr> 
                    </table></td> 
                  </tr> 
                </table></td> 
              </tr> 
            </table></td> 
          </tr> 
        </table> 
        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
          <tr> 
            <td class="es-info-area" align="center" style="padding:0;Margin:0"> 
            <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" bgcolor="#FFFFFF"> 
              <tr> 
                <td align="left" style="padding:20px;Margin:0"> 
                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                  <tr> 
                    <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                      <tr> 
                        <td align="center" class="es-infoblock" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px"><a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px"></a>No longer want to receive these emails?&nbsp;<a href="" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px">Unsubscribe</a>.<a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px"></a></p></td> 
                      </tr> 
                    </table></td> 
                  </tr> 
                </table></td> 
              </tr> 
            </table></td> 
          </tr> 
        </table></td> 
      </tr> 
    </table> 
    </div>  
  </body>
  </html>
  `;
};

exports.documentTemplate = ({ ...data }) => `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>New Message</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <script src="https://unpkg.com/feather-icons"></script>
    <style>
        .btn-primary{
            background-color: rgb(115,103,240)!important;
            border: rgb(115,103,240);
        }
        .bg-secondary{
            background-color: rgb(181, 181, 181)!important;
        }
    </style>
</head>
  <body class="bg-light-secondary">
    <div class="bg-light-secondary">
        <div class="bg-light p-5 w-50 mx-auto">
            <div class="bg-secondary text-center w-75 mx-auto p-5">
                <i data-feather="edit" ></i>
                <h6 class="py-3">${data.senderName} sent you a document to review and sign.</h6>
                <a href="${data.docLink}" class="btn" style="color:#fff;background: #174AE7">Review Document</a>
            </div>
            <div class="w-75 mx-auto py-5">
                <h5>Sender name</h5>
            <p><a href="mailto:${data.senderEmail}">${data.senderEmail}</a></p>
    
            <p>${data.recipientName},</p>
            <p>${data.message}</p>
            <p>Thank you, ${data.senderName}</p>
            </div>
        </div>
        

    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
    <script>
        feather.replace()
    </script>
</body>
</html>`;

exports.uploadPhotoEmailTemplate = ({ ...data }) => {
  const emailContent = {
    new: {
      button: `Review Document`,
      text: `sent you a document to review and sign`,
    },
    reminder: {
      button: `Review Document`,
      text: `sent you a document to review and sign`,
    },
    viewed: {
      button: `Review`,
      text: `viewed your document`,
    },
    completed: {
      button: `View Completed Documents`,
      text: `Your document has been completed`,
    },
    expired: {
      text: `Your document has been voided`,
    },
    uploaded: {
      text: `uploaded photo for the task`,
    },
    completed: {
      text: `completed the task`,
    },
    notCompleted: {
      text: `not completed the task`,
    },
  };
  // const MYMANAGERLOGO = "https://mymember.com/static/media/logo.74bfe749.png";
  const MYMANAGERLOGO = "https://mymanager.com/static/media/logo.86b72fab.svg";

  let person;

  if (
    data.type === "new" ||
    data.type === "viewed" ||
    data.type === "uploaded" ||
    data.type === "completed" ||
    data.type === "notCompleted"
  ) {
    person = data.senderName;
  } else {
    person = "";
  }

  let uploadedImage = ``;
  if (data.type === "uploaded") {
    uploadedImage = `<tr>
      <td
        align="center"
        style="
          padding: 0;
          margin: 0;
          padding-top: 10px;
          padding-bottom: 10px;
        "
      >
          <img style="height: 60px;"
          src="${data.imageURL}" ></img>
      </td>
    </tr>`;
  } else {
    uploadedImage = ``;
  }

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html
    xmlns="http://www.w3.org/1999/xhtml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    style="font-family: arial, 'helvetica neue', helvetica, sans-serif"
  >
    <head>
      <meta charset="UTF-8" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="x-apple-disable-message-reformatting" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta content="telephone=no" name="format-detection" />
      <title>New message</title>
      <!--[if (mso 16)]>
        <style type="text/css">
          a {
            text-decoration: none;
          }
        </style>
      <![endif]-->
      <!--[if gte mso 9
        ]><style>
          sup {
            font-size: 100% !important;
          }
        </style><!
      [endif]-->
      <!--[if gte mso 9]>
        <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG></o:AllowPNG>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      <![endif]-->
      <style type="text/css">
        #outlook a {
          padding: 0;
        }
        .es-button {
          mso-style-priority: 100 !important;
          text-decoration: none !important;
        }
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: none !important;
          font-size: inherit !important;
          font-family: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
        }
        .es-desk-hidden {
          display: none;
          float: left;
          overflow: hidden;
          width: 0;
          max-height: 0;
          line-height: 0;
          mso-hide: all;
        }
        [data-ogsb] .es-button {
          border-width: 0 !important;
          padding: 10px 30px 10px 30px !important;
        }
        @media only screen and (max-width: 600px) {
          p,
          ul li,
          ol li,
          a {
            line-height: 150% !important;
          }
          h1,
          h2,
          h3,
          h1 a,
          h2 a,
          h3 a {
            line-height: 120%;
          }
          h1 {
            font-size: 36px !important;
            text-align: left;
          }
          h2 {
            font-size: 26px !important;
            text-align: left;
          }
          h3 {
            font-size: 20px !important;
            text-align: left;
          }
          .es-header-body h1 a,
          .es-content-body h1 a,
          .es-footer-body h1 a {
            font-size: 36px !important;
            text-align: left;
          }
          .es-header-body h2 a,
          .es-content-body h2 a,
          .es-footer-body h2 a {
            font-size: 26px !important;
            text-align: left;
          }
          .es-header-body h3 a,
          .es-content-body h3 a,
          .es-footer-body h3 a {
            font-size: 20px !important;
            text-align: left;
          }
          .es-menu td a {
            font-size: 12px !important;
          }
          .es-header-body p,
          .es-header-body ul li,
          .es-header-body ol li,
          .es-header-body a {
            font-size: 14px !important;
          }
          .es-content-body p,
          .es-content-body ul li,
          .es-content-body ol li,
          .es-content-body a {
            font-size: 16px !important;
          }
          .es-footer-body p,
          .es-footer-body ul li,
          .es-footer-body ol li,
          .es-footer-body a {
            font-size: 14px !important;
          }
          .es-infoblock p,
          .es-infoblock ul li,
          .es-infoblock ol li,
          .es-infoblock a {
            font-size: 12px !important;
          }
          *[class="gmail-fix"] {
            display: none !important;
          }
          .es-m-txt-c,
          .es-m-txt-c h1,
          .es-m-txt-c h2,
          .es-m-txt-c h3 {
            text-align: center !important;
          }
          .es-m-txt-r,
          .es-m-txt-r h1,
          .es-m-txt-r h2,
          .es-m-txt-r h3 {
            text-align: right !important;
          }
          .es-m-txt-l,
          .es-m-txt-l h1,
          .es-m-txt-l h2,
          .es-m-txt-l h3 {
            text-align: left !important;
          }
          .es-m-txt-r img,
          .es-m-txt-c img,
          .es-m-txt-l img {
            display: inline !important;
          }
          .es-button-border {
            display: inline-block !important;
          }
          a.es-button,
          button.es-button {
            font-size: 20px !important;
            display: inline-block !important;
          }
          .es-adaptive table,
          .es-left,
          .es-right {
            width: 100% !important;
          }
          .es-content table,
          .es-header table,
          .es-footer table,
          .es-content,
          .es-footer,
          .es-header {
            width: 100% !important;
            max-width: 600px !important;
          }
          .es-adapt-td {
            display: block !important;
            width: 100% !important;
          }
          .adapt-img {
            width: 100% !important;
            height: auto !important;
          }
          .es-m-p0 {
            padding: 0 !important;
          }
          .es-m-p0r {
            padding-right: 0 !important;
          }
          .es-m-p0l {
            padding-left: 0 !important;
          }
          .es-m-p0t {
            padding-top: 0 !important;
          }
          .es-m-p0b {
            padding-bottom: 0 !important;
          }
          .es-m-p20b {
            padding-bottom: 20px !important;
          }
          .es-mobile-hidden,
          .es-hidden {
            display: none !important;
          }
          tr.es-desk-hidden,
          td.es-desk-hidden,
          table.es-desk-hidden {
            width: auto !important;
            overflow: visible !important;
            float: none !important;
            max-height: inherit !important;
            line-height: inherit !important;
          }
          tr.es-desk-hidden {
            display: table-row !important;
          }
          table.es-desk-hidden {
            display: table !important;
          }
          td.es-desk-menu-hidden {
            display: table-cell !important;
          }
          .es-menu td {
            width: 1% !important;
          }
          table.es-table-not-adapt,
          .esd-block-html table {
            width: auto !important;
          }
          table.es-social {
            display: inline-block !important;
          }
          table.es-social td {
            display: inline-block !important;
          }
          .es-m-p5 {
            padding: 5px !important;
          }
          .es-m-p5t {
            padding-top: 5px !important;
          }
          .es-m-p5b {
            padding-bottom: 5px !important;
          }
          .es-m-p5r {
            padding-right: 5px !important;
          }
          .es-m-p5l {
            padding-left: 5px !important;
          }
          .es-m-p10 {
            padding: 10px !important;
          }
          .es-m-p10t {
            padding-top: 10px !important;
          }
          .es-m-p10b {
            padding-bottom: 10px !important;
          }
          .es-m-p10r {
            padding-right: 10px !important;
          }
          .es-m-p10l {
            padding-left: 10px !important;
          }
          .es-m-p15 {
            padding: 15px !important;
          }
          .es-m-p15t {
            padding-top: 15px !important;
          }
          .es-m-p15b {
            padding-bottom: 15px !important;
          }
          .es-m-p15r {
            padding-right: 15px !important;
          }
          .es-m-p15l {
            padding-left: 15px !important;
          }
          .es-m-p20 {
            padding: 20px !important;
          }
          .es-m-p20t {
            padding-top: 20px !important;
          }
          .es-m-p20r {
            padding-right: 20px !important;
          }
          .es-m-p20l {
            padding-left: 20px !important;
          }
          .es-m-p25 {
            padding: 25px !important;
          }
          .es-m-p25t {
            padding-top: 25px !important;
          }
          .es-m-p25b {
            padding-bottom: 25px !important;
          }
          .es-m-p25r {
            padding-right: 25px !important;
          }
          .es-m-p25l {
            padding-left: 25px !important;
          }
          .es-m-p30 {
            padding: 30px !important;
          }
          .es-m-p30t {
            padding-top: 30px !important;
          }
          .es-m-p30b {
            padding-bottom: 30px !important;
          }
          .es-m-p30r {
            padding-right: 30px !important;
          }
          .es-m-p30l {
            padding-left: 30px !important;
          }
          .es-m-p35 {
            padding: 35px !important;
          }
          .es-m-p35t {
            padding-top: 35px !important;
          }
          .es-m-p35b {
            padding-bottom: 35px !important;
          }
          .es-m-p35r {
            padding-right: 35px !important;
          }
          .es-m-p35l {
            padding-left: 35px !important;
          }
          .es-m-p40 {
            padding: 40px !important;
          }
          .es-m-p40t {
            padding-top: 40px !important;
          }
          .es-m-p40b {
            padding-bottom: 40px !important;
          }
          .es-m-p40r {
            padding-right: 40px !important;
          }
          .es-m-p40l {
            padding-left: 40px !important;
          }
        }
      </style>
    </head>
    <body
      style="
        width: 100%;
        font-family: arial, 'helvetica neue', helvetica, sans-serif;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        padding: 0;
        margin: 0;
      "
    >
      <div class="es-wrapper-color" style="background-color: #fafafa">
        <!--[if gte mso 9]>
          <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
            <v:fill type="tile" color="#fafafa"></v:fill>
          </v:background>
        <![endif]-->
        <table
          class="es-wrapper"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          style="
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            border-collapse: collapse;
            border-spacing: 0px;
            padding: 0;
            margin: 0;
            width: 100%;
            height: 100%;
            background-repeat: repeat;
            background-position: center top;
            background-color: #fafafa;
          "
        >
          <tr>
            <td valign="top" style="padding: 0; margin: 0">
              <table
                cellpadding="0"
                cellspacing="0"
                class="es-content"
                align="center"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  border-collapse: collapse;
                  border-spacing: 0px;
                  table-layout: fixed !important;
                  width: 100%;
                "
              >
                <tr>
                  <td align="center" style="padding: 0; margin: 0">
                    <table
                      bgcolor="#ffffff"
                      class="es-content-body"
                      align="center"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                        background-color: #ffffff;
                        width: 600px;
                      "
                    >
                      <tr>
                        <td
                          align="left"
                          style="
                            padding: 0;
                            margin: 0;
                            padding-top: 20px;
                            padding-left: 20px;
                            padding-right: 20px;
                          "
                        >
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-collapse: collapse;
                              border-spacing: 0px;
                            "
                          >
                            <tr>
                              <td
                                align="center"
                                valign="top"
                                style="padding: 0; margin: 0; width: 560px"
                              >
                                <table
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    border-collapse: collapse;
                                    border-spacing: 0px;
                                  "
                                >
                                  <tr>
                                    <td
                                      align="left"
                                      style="padding: 0; margin: 0; display: flex; justify-content: space-between"
                                    >
                                      <p
                                        style="
                                          margin: 0;
                                          -webkit-text-size-adjust: none;
                                          -ms-text-size-adjust: none;
                                          mso-line-height-rule: exactly;
                                          font-family: -apple-system,
                                            blinkmacsystemfont, 'segoe ui', roboto,
                                            helvetica, arial, sans-serif,
                                            'apple color emoji', 'segoe ui emoji',
                                            'segoe ui symbol';
                                          line-height: 24px;
                                          color: #174AE7;
                                          font-size: 16px;
                                        "
                                      >
                                        <strong>Sent via My Manager</strong>
                                      </p>
                                      <img src="https://me.mymanager.com/static/media/logo.01654d61.svg" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;margin-left: 5px; width: 150px">
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td
                          align="left"
                          style="
                            margin: 0;
                            padding-left: 20px;
                            padding-right: 20px;
                            padding-top: 30px;
                            padding-bottom: 30px;
                          "
                        >
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-collapse: collapse;
                              border-spacing: 0px;
                            "
                          >
                            <tr>
                              <td
                                align="center"
                                valign="top"
                                style="padding: 0; margin: 0; width: 560px"
                              >
                                <table
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    border-collapse: collapse;
                                    border-spacing: 0px;
                                  "
                                >
                                  <tr>
                                    <td
                                      align="center"
                                      style="
                                        padding: 0;
                                        margin: 0;
                                        padding-top: 10px;
                                        padding-bottom: 10px;
                                        font-size: 0px;
                                      "
                                    >
                                      <img
                                        src="https://jhclqt.stripocdn.email/content/guids/CABINET_67e080d830d87c17802bd9b4fe1c0912/images/55191618237638326.png"
                                        alt
                                        style="
                                          display: block;
                                          border: 0;
                                          outline: none;
                                          text-decoration: none;
                                          -ms-interpolation-mode: bicubic;
                                        "
                                        width="100"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      align="center"
                                      class="es-m-p0r es-m-p0l"
                                      style="
                                        margin: 0;
                                        padding-top: 5px;
                                        padding-bottom: 5px;
                                        padding-left: 40px;
                                        padding-right: 40px;
                                      "
                                    >
                                      <p
                                        style="
                                          margin: 0;
                                          -webkit-text-size-adjust: none;
                                          -ms-text-size-adjust: none;
                                          mso-line-height-rule: exactly;
                                          font-family: arial, 'helvetica neue',
                                            helvetica, sans-serif;
                                          line-height: 21px;
                                          color: #333333;
                                          font-size: 14px;
                                        "
                                      >
                                        ${person} ${emailContent[data.type].text}
                                      </p>
                                    </td>
                                  </tr>
  
                                  <tr>
                                    <td
                                      align="center"
                                      style="
                                        padding: 0;
                                        margin: 0;
                                        padding-bottom: 5px;
                                        padding-top: 10px;
                                      "
                                    >
                                      <p
                                        style="
                                          margin: 0;
                                          -webkit-text-size-adjust: none;
                                          -ms-text-size-adjust: none;
                                          mso-line-height-rule: exactly;
                                          font-family: arial, 'helvetica neue',
                                            helvetica, sans-serif;
                                          line-height: 21px;
                                          color: #333333;
                                          font-size: 14px;
                                        "
                                      >
                                        <b>${data.message}</b>
                                        <br></br>
                                        Please check the task.
                                      </p>
                                    </td>
                                  </tr>
                                  ${uploadedImage}
                                  <tr>
                                    <td
                                      align="center"
                                      class="es-m-p0r es-m-p0l"
                                      style="
                                        margin: 0;
                                        padding-top: 5px;
                                        padding-bottom: 5px;
                                        padding-left: 40px;
                                        padding-right: 40px;
                                      "
                                    >
                                      <p
                                        style="
                                          margin: 0;
                                          -webkit-text-size-adjust: none;
                                          -ms-text-size-adjust: none;
                                          mso-line-height-rule: exactly;
                                          font-family: arial, 'helvetica neue',
                                            helvetica, sans-serif;
                                          line-height: 21px;
                                          color: #333333;
                                          font-size: 14px;
                                        "
                                      >
                                        Best regards, ${data.senderName}
                                      </p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table
                cellpadding="0"
                cellspacing="0"
                class="es-footer"
                align="center"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  border-collapse: collapse;
                  border-spacing: 0px;
                  table-layout: fixed !important;
                  width: 100%;
                  background-color: transparent;
                  background-repeat: repeat;
                  background-position: center top;
                "
              >
                <tr>
                  <td align="center" style="padding: 0; margin: 0">
                    <table
                      class="es-footer-body"
                      align="center"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                        background-color: transparent;
                        width: 640px;
                      "
                    >
                      <tr>
                        <td
                          align="left"
                          style="
                            margin: 0;
                            padding-top: 20px;
                            padding-bottom: 20px;
                            padding-left: 20px;
                            padding-right: 20px;
                          "
                        >
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-collapse: collapse;
                              border-spacing: 0px;
                            "
                          >
                            <tr>
                              <td
                                align="left"
                                style="padding: 0; margin: 0; width: 600px"
                              >
                                <table
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    border-collapse: collapse;
                                    border-spacing: 0px;
                                  "
                                >
                                  <tr>
                                    <td
                                      align="center"
                                      style="
                                        padding: 0;
                                        margin: 0;
                                        padding-top: 15px;
                                        padding-bottom: 15px;
                                        font-size: 0;
                                      "
                                    >
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="es-table-not-adapt es-social"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                          border-collapse: collapse;
                                          border-spacing: 0px;
                                        "
                                      >
                                        <tr>
                                          <td
                                            align="center"
                                            valign="top"
                                            style="
                                              padding: 0;
                                              margin: 0;
                                              padding-right: 40px;
                                            "
                                          >
                                            <img
                                              title="Facebook"
                                              src="https://jhclqt.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png"
                                              alt="Fb"
                                              width="32"
                                              style="
                                                display: block;
                                                border: 0;
                                                outline: none;
                                                text-decoration: none;
                                                -ms-interpolation-mode: bicubic;
                                              "
                                            />
                                          </td>
                                          <td
                                            align="center"
                                            valign="top"
                                            style="
                                              padding: 0;
                                              margin: 0;
                                              padding-right: 40px;
                                            "
                                          >
                                            <img
                                              title="Twitter"
                                              src="https://jhclqt.stripocdn.email/content/assets/img/social-icons/logo-black/twitter-logo-black.png"
                                              alt="Tw"
                                              width="32"
                                              style="
                                                display: block;
                                                border: 0;
                                                outline: none;
                                                text-decoration: none;
                                                -ms-interpolation-mode: bicubic;
                                              "
                                            />
                                          </td>
                                          <td
                                            align="center"
                                            valign="top"
                                            style="
                                              padding: 0;
                                              margin: 0;
                                              padding-right: 40px;
                                            "
                                          >
                                            <img
                                              title="Instagram"
                                              src="https://jhclqt.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png"
                                              alt="Inst"
                                              width="32"
                                              style="
                                                display: block;
                                                border: 0;
                                                outline: none;
                                                text-decoration: none;
                                                -ms-interpolation-mode: bicubic;
                                              "
                                            />
                                          </td>
                                          <td
                                            align="center"
                                            valign="top"
                                            style="padding: 0; margin: 0"
                                          >
                                            <img
                                              title="Youtube"
                                              src="https://jhclqt.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png"
                                              alt="Yt"
                                              width="32"
                                              style="
                                                display: block;
                                                border: 0;
                                                outline: none;
                                                text-decoration: none;
                                                -ms-interpolation-mode: bicubic;
                                              "
                                            />
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      align="center"
                                      style="
                                        padding: 0;
                                        margin: 0;
                                        padding-bottom: 35px;
                                      "
                                    >
                                      <p
                                        style="
                                          margin: 0;
                                          -webkit-text-size-adjust: none;
                                          -ms-text-size-adjust: none;
                                          mso-line-height-rule: exactly;
                                          font-family: arial, 'helvetica neue',
                                            helvetica, sans-serif;
                                          line-height: 18px;
                                          color: #333333;
                                          font-size: 12px;
                                        "
                                      >
                                        mymanager © 2022&nbsp;All Rights
                                        Reserved.<br />
                                      </p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table
                cellpadding="0"
                cellspacing="0"
                class="es-content"
                align="center"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  border-collapse: collapse;
                  border-spacing: 0px;
                  table-layout: fixed !important;
                  width: 100%;
                "
              >
                <tr>
                  <td
                    class="es-info-area"
                    align="center"
                    style="padding: 0; margin: 0"
                  >
                    <table
                      class="es-content-body"
                      align="center"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                        background-color: transparent;
                        width: 600px;
                      "
                      bgcolor="#FFFFFF"
                    >
                      <tr>
                        <td align="left" style="padding: 20px; margin: 0">
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-collapse: collapse;
                              border-spacing: 0px;
                            "
                          >
                            <tr>
                              <td
                                align="center"
                                valign="top"
                                style="padding: 0; margin: 0; width: 560px"
                              >
                                <table
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    border-collapse: collapse;
                                    border-spacing: 0px;
                                  "
                                >
                                  <tr>
                                    <td
                                      align="center"
                                      class="es-infoblock"
                                      style="
                                        padding: 0;
                                        margin: 0;
                                        line-height: 14px;
                                        font-size: 12px;
                                        color: #cccccc;
                                      "
                                    >
                                      <p
                                        style="
                                          margin: 0;
                                          -webkit-text-size-adjust: none;
                                          -ms-text-size-adjust: none;
                                          mso-line-height-rule: exactly;
                                          font-family: arial, 'helvetica neue',
                                            helvetica, sans-serif;
                                          line-height: 14px;
                                          color: #cccccc;
                                          font-size: 12px;
                                        "
                                      >
                                        <a
                                          target="_blank"
                                          href=""
                                          style="
                                            -webkit-text-size-adjust: none;
                                            -ms-text-size-adjust: none;
                                            mso-line-height-rule: exactly;
                                            text-decoration: underline;
                                            color: #cccccc;
                                            font-size: 12px;
                                          "
                                        ></a
                                        >No longer want to receive these
                                        emails?&nbsp;<a
                                          href=""
                                          target="_blank"
                                          style="
                                            -webkit-text-size-adjust: none;
                                            -ms-text-size-adjust: none;
                                            mso-line-height-rule: exactly;
                                            text-decoration: underline;
                                            color: #cccccc;
                                            font-size: 12px;
                                          "
                                          >Unsubscribe</a
                                        >.<a
                                          target="_blank"
                                          href=""
                                          style="
                                            -webkit-text-size-adjust: none;
                                            -ms-text-size-adjust: none;
                                            mso-line-height-rule: exactly;
                                            text-decoration: underline;
                                            color: #cccccc;
                                            font-size: 12px;
                                          "
                                        ></a>
                                      </p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </body>
  </html>
    `;
};

exports.appointEmailTemplate = ({ ...data }) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html
    xmlns="http://www.w3.org/1999/xhtml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    style="font-family: arial, 'helvetica neue', helvetica, sans-serif"
  >
    <head>
      <meta charset="UTF-8" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="x-apple-disable-message-reformatting" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta content="telephone=no" name="format-detection" />
      <title>New message</title>
      <!--[if (mso 16)]>
        <style type="text/css">
          a {
            text-decoration: none;
          }
        </style>
      <![endif]-->
      <!--[if gte mso 9
        ]><style>
          sup {
            font-size: 100% !important;
          }
        </style><!
      [endif]-->
      <!--[if gte mso 9]>
        <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG></o:AllowPNG>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      <![endif]-->
      <style type="text/css">
        #outlook a {
          padding: 0;
        }
        .es-button {
          mso-style-priority: 100 !important;
          text-decoration: none !important;
        }
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: none !important;
          font-size: inherit !important;
          font-family: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
        }
        .es-desk-hidden {
          display: none;
          float: left;
          overflow: hidden;
          width: 0;
          max-height: 0;
          line-height: 0;
          mso-hide: all;
        }
        [data-ogsb] .es-button {
          border-width: 0 !important;
          padding: 10px 30px 10px 30px !important;
        }
        @media only screen and (max-width: 600px) {
          p,
          ul li,
          ol li,
          a {
            line-height: 150% !important;
          }
          h1,
          h2,
          h3,
          h1 a,
          h2 a,
          h3 a {
            line-height: 120%;
          }
          h1 {
            font-size: 36px !important;
            text-align: left;
          }
          h2 {
            font-size: 26px !important;
            text-align: left;
          }
          h3 {
            font-size: 20px !important;
            text-align: left;
          }
          .es-header-body h1 a,
          .es-content-body h1 a,
          .es-footer-body h1 a {
            font-size: 36px !important;
            text-align: left;
          }
          .es-header-body h2 a,
          .es-content-body h2 a,
          .es-footer-body h2 a {
            font-size: 26px !important;
            text-align: left;
          }
          .es-header-body h3 a,
          .es-content-body h3 a,
          .es-footer-body h3 a {
            font-size: 20px !important;
            text-align: left;
          }
          .es-menu td a {
            font-size: 12px !important;
          }
          .es-header-body p,
          .es-header-body ul li,
          .es-header-body ol li,
          .es-header-body a {
            font-size: 14px !important;
          }
          .es-content-body p,
          .es-content-body ul li,
          .es-content-body ol li,
          .es-content-body a {
            font-size: 16px !important;
          }
          .es-footer-body p,
          .es-footer-body ul li,
          .es-footer-body ol li,
          .es-footer-body a {
            font-size: 14px !important;
          }
          .es-infoblock p,
          .es-infoblock ul li,
          .es-infoblock ol li,
          .es-infoblock a {
            font-size: 12px !important;
          }
          *[class="gmail-fix"] {
            display: none !important;
          }
          .es-m-txt-c,
          .es-m-txt-c h1,
          .es-m-txt-c h2,
          .es-m-txt-c h3 {
            text-align: center !important;
          }
          .es-m-txt-r,
          .es-m-txt-r h1,
          .es-m-txt-r h2,
          .es-m-txt-r h3 {
            text-align: right !important;
          }
          .es-m-txt-l,
          .es-m-txt-l h1,
          .es-m-txt-l h2,
          .es-m-txt-l h3 {
            text-align: left !important;
          }
          .es-m-txt-r img,
          .es-m-txt-c img,
          .es-m-txt-l img {
            display: inline !important;
          }
          .es-button-border {
            display: inline-block !important;
          }
          a.es-button,
          button.es-button {
            font-size: 20px !important;
            display: inline-block !important;
          }
          .es-adaptive table,
          .es-left,
          .es-right {
            width: 100% !important;
          }
          .es-content table,
          .es-header table,
          .es-footer table,
          .es-content,
          .es-footer,
          .es-header {
            width: 100% !important;
            max-width: 600px !important;
          }
          .es-adapt-td {
            display: block !important;
            width: 100% !important;
          }
          .adapt-img {
            width: 100% !important;
            height: auto !important;
          }
          .es-m-p0 {
            padding: 0 !important;
          }
          .es-m-p0r {
            padding-right: 0 !important;
          }
          .es-m-p0l {
            padding-left: 0 !important;
          }
          .es-m-p0t {
            padding-top: 0 !important;
          }
          .es-m-p0b {
            padding-bottom: 0 !important;
          }
          .es-m-p20b {
            padding-bottom: 20px !important;
          }
          .es-mobile-hidden,
          .es-hidden {
            display: none !important;
          }
          tr.es-desk-hidden,
          td.es-desk-hidden,
          table.es-desk-hidden {
            width: auto !important;
            overflow: visible !important;
            float: none !important;
            max-height: inherit !important;
            line-height: inherit !important;
          }
          tr.es-desk-hidden {
            display: table-row !important;
          }
          table.es-desk-hidden {
            display: table !important;
          }
          td.es-desk-menu-hidden {
            display: table-cell !important;
          }
          .es-menu td {
            width: 1% !important;
          }
          table.es-table-not-adapt,
          .esd-block-html table {
            width: auto !important;
          }
          table.es-social {
            display: inline-block !important;
          }
          table.es-social td {
            display: inline-block !important;
          }
          .es-m-p5 {
            padding: 5px !important;
          }
          .es-m-p5t {
            padding-top: 5px !important;
          }
          .es-m-p5b {
            padding-bottom: 5px !important;
          }
          .es-m-p5r {
            padding-right: 5px !important;
          }
          .es-m-p5l {
            padding-left: 5px !important;
          }
          .es-m-p10 {
            padding: 10px !important;
          }
          .es-m-p10t {
            padding-top: 10px !important;
          }
          .es-m-p10b {
            padding-bottom: 10px !important;
          }
          .es-m-p10r {
            padding-right: 10px !important;
          }
          .es-m-p10l {
            padding-left: 10px !important;
          }
          .es-m-p15 {
            padding: 15px !important;
          }
          .es-m-p15t {
            padding-top: 15px !important;
          }
          .es-m-p15b {
            padding-bottom: 15px !important;
          }
          .es-m-p15r {
            padding-right: 15px !important;
          }
          .es-m-p15l {
            padding-left: 15px !important;
          }
          .es-m-p20 {
            padding: 20px !important;
          }
          .es-m-p20t {
            padding-top: 20px !important;
          }
          .es-m-p20r {
            padding-right: 20px !important;
          }
          .es-m-p20l {
            padding-left: 20px !important;
          }
          .es-m-p25 {
            padding: 25px !important;
          }
          .es-m-p25t {
            padding-top: 25px !important;
          }
          .es-m-p25b {
            padding-bottom: 25px !important;
          }
          .es-m-p25r {
            padding-right: 25px !important;
          }
          .es-m-p25l {
            padding-left: 25px !important;
          }
          .es-m-p30 {
            padding: 30px !important;
          }
          .es-m-p30t {
            padding-top: 30px !important;
          }
          .es-m-p30b {
            padding-bottom: 30px !important;
          }
          .es-m-p30r {
            padding-right: 30px !important;
          }
          .es-m-p30l {
            padding-left: 30px !important;
          }
          .es-m-p35 {
            padding: 35px !important;
          }
          .es-m-p35t {
            padding-top: 35px !important;
          }
          .es-m-p35b {
            padding-bottom: 35px !important;
          }
          .es-m-p35r {
            padding-right: 35px !important;
          }
          .es-m-p35l {
            padding-left: 35px !important;
          }
          .es-m-p40 {
            padding: 40px !important;
          }
          .es-m-p40t {
            padding-top: 40px !important;
          }
          .es-m-p40b {
            padding-bottom: 40px !important;
          }
          .es-m-p40r {
            padding-right: 40px !important;
          }
          .es-m-p40l {
            padding-left: 40px !important;
          }
        }
      </style>
    </head>
    <body
      style="
        width: 100%;
        font-family: arial, 'helvetica neue', helvetica, sans-serif;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        padding: 0;
        margin: 0;
      "
    >
      <div class="es-wrapper-color" style="background-color: #fafafa">
        <!--[if gte mso 9]>
          <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
            <v:fill type="tile" color="#fafafa"></v:fill>
          </v:background>
        <![endif]-->
        <table
          class="es-wrapper"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          style="
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            border-collapse: collapse;
            border-spacing: 0px;
            padding: 0;
            margin: 0;
            width: 100%;
            height: 100%;
            background-repeat: repeat;
            background-position: center top;
            background-color: #fafafa;
          "
        >
          <tr>
            <td valign="top" style="padding: 0; margin: 0">
              <table
                cellpadding="0"
                cellspacing="0"
                class="es-content"
                align="center"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  border-collapse: collapse;
                  border-spacing: 0px;
                  table-layout: fixed !important;
                  width: 100%;
                "
              >
                <tr>
                  <td align="center" style="padding: 0; margin: 0">
                    <table
                      bgcolor="#ffffff"
                      class="es-content-body"
                      align="center"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                        background-color: #ffffff;
                        width: 600px;
                      "
                    >
                      <tr>
                        <td
                          align="left"
                          style="
                            padding: 0;
                            margin: 0;
                            padding-top: 20px;
                            padding-left: 20px;
                            padding-right: 20px;
                          "
                        >
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-collapse: collapse;
                              border-spacing: 0px;
                            "
                          >
                            <tr>
                              <td
                                align="center"
                                valign="top"
                                style="padding: 0; margin: 0; width: 560px"
                              >
                                <table
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    border-collapse: collapse;
                                    border-spacing: 0px;
                                  "
                                >
                                  <tr>
                                    <td
                                      align="left"
                                      style="padding: 0; margin: 0; display: flex; justify-content: space-between"
                                    >
                                      <p
                                        style="
                                          margin: 0;
                                          -webkit-text-size-adjust: none;
                                          -ms-text-size-adjust: none;
                                          mso-line-height-rule: exactly;
                                          font-family: -apple-system,
                                            blinkmacsystemfont, 'segoe ui', roboto,
                                            helvetica, arial, sans-serif,
                                            'apple color emoji', 'segoe ui emoji',
                                            'segoe ui symbol';
                                          line-height: 24px;
                                          color: #174AE7;
                                          font-size: 16px;
                                        "
                                      >
                                        <strong>Sent via My Manager</strong>
                                      </p>
                                      <img src="https://me.mymanager.com/static/media/logo.01654d61.svg" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;margin-left: 5px; width: 150px">
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td
                          align="left"
                          style="
                            margin: 0;
                            padding-left: 20px;
                            padding-right: 20px;
                            padding-top: 30px;
                            padding-bottom: 30px;
                          "
                        >
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-collapse: collapse;
                              border-spacing: 0px;
                            "
                          >
                            <tr>
                              <td
                                align="center"
                                valign="top"
                                style="padding: 0; margin: 0; width: 560px"
                              >
                                <table
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    border-collapse: collapse;
                                    border-spacing: 0px;
                                  "
                                >
                                  <tr>
                                    <td
                                      align="center"
                                      style="
                                        padding: 0;
                                        margin: 0;
                                        padding-top: 10px;
                                        padding-bottom: 10px;
                                        font-size: 0px;
                                      "
                                    >
                                      <img
                                        src="https://jhclqt.stripocdn.email/content/guids/CABINET_67e080d830d87c17802bd9b4fe1c0912/images/55191618237638326.png"
                                        alt
                                        style="
                                          display: block;
                                          border: 0;
                                          outline: none;
                                          text-decoration: none;
                                          -ms-interpolation-mode: bicubic;
                                        "
                                        width="100"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      align="center"
                                      class="es-m-p0r es-m-p0l"
                                      style="
                                        margin: 0;
                                        padding-top: 5px;
                                        padding-bottom: 5px;
                                        padding-left: 40px;
                                        padding-right: 40px;
                                      "
                                    >
                                      <p
                                        style="
                                          margin: 0;
                                          -webkit-text-size-adjust: none;
                                          -ms-text-size-adjust: none;
                                          mso-line-height-rule: exactly;
                                          font-family: arial, 'helvetica neue',
                                            helvetica, sans-serif;
                                          line-height: 21px;
                                          color: #333333;
                                          font-size: 14px;
                                        "
                                      >
                                        Hello! <br /> Please check appointment on mymanager.com.
                                      </p>
                                    </td>
                                  </tr>
  
                                  <tr>
                                    <td
                                      align="center"
                                      style="
                                        padding: 0;
                                        margin: 0;
                                        padding-bottom: 5px;
                                        padding-top: 10px;
                                      "
                                    >
                                      ${data.tableData}
                                    </td>
                                  </tr>
                                  
                                  <tr>
                                    <td
                                      align="center"
                                      class="es-m-p0r es-m-p0l"
                                      style="
                                        margin: 0;
                                        padding-top: 5px;
                                        padding-bottom: 5px;
                                        padding-left: 40px;
                                        padding-right: 40px;
                                      "
                                    >
                                      <p
                                        style="
                                          margin: 0;
                                          -webkit-text-size-adjust: none;
                                          -ms-text-size-adjust: none;
                                          mso-line-height-rule: exactly;
                                          font-family: arial, 'helvetica neue',
                                            helvetica, sans-serif;
                                          line-height: 21px;
                                          color: #333333;
                                          font-size: 14px;
                                        "
                                      >
                                        Best regards.
                                      </p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table
                cellpadding="0"
                cellspacing="0"
                class="es-footer"
                align="center"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  border-collapse: collapse;
                  border-spacing: 0px;
                  table-layout: fixed !important;
                  width: 100%;
                  background-color: transparent;
                  background-repeat: repeat;
                  background-position: center top;
                "
              >
                <tr>
                  <td align="center" style="padding: 0; margin: 0">
                    <table
                      class="es-footer-body"
                      align="center"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                        background-color: transparent;
                        width: 640px;
                      "
                    >
                      <tr>
                        <td
                          align="left"
                          style="
                            margin: 0;
                            padding-top: 20px;
                            padding-bottom: 20px;
                            padding-left: 20px;
                            padding-right: 20px;
                          "
                        >
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-collapse: collapse;
                              border-spacing: 0px;
                            "
                          >
                            <tr>
                              <td
                                align="left"
                                style="padding: 0; margin: 0; width: 600px"
                              >
                                <table
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    border-collapse: collapse;
                                    border-spacing: 0px;
                                  "
                                >
                                  <tr>
                                    <td
                                      align="center"
                                      style="
                                        padding: 0;
                                        margin: 0;
                                        padding-top: 15px;
                                        padding-bottom: 15px;
                                        font-size: 0;
                                      "
                                    >
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="es-table-not-adapt es-social"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                          border-collapse: collapse;
                                          border-spacing: 0px;
                                        "
                                      >
                                        <tr>
                                          <td
                                            align="center"
                                            valign="top"
                                            style="
                                              padding: 0;
                                              margin: 0;
                                              padding-right: 40px;
                                            "
                                          >
                                            <img
                                              title="Facebook"
                                              src="https://jhclqt.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png"
                                              alt="Fb"
                                              width="32"
                                              style="
                                                display: block;
                                                border: 0;
                                                outline: none;
                                                text-decoration: none;
                                                -ms-interpolation-mode: bicubic;
                                              "
                                            />
                                          </td>
                                          <td
                                            align="center"
                                            valign="top"
                                            style="
                                              padding: 0;
                                              margin: 0;
                                              padding-right: 40px;
                                            "
                                          >
                                            <img
                                              title="Twitter"
                                              src="https://jhclqt.stripocdn.email/content/assets/img/social-icons/logo-black/twitter-logo-black.png"
                                              alt="Tw"
                                              width="32"
                                              style="
                                                display: block;
                                                border: 0;
                                                outline: none;
                                                text-decoration: none;
                                                -ms-interpolation-mode: bicubic;
                                              "
                                            />
                                          </td>
                                          <td
                                            align="center"
                                            valign="top"
                                            style="
                                              padding: 0;
                                              margin: 0;
                                              padding-right: 40px;
                                            "
                                          >
                                            <img
                                              title="Instagram"
                                              src="https://jhclqt.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png"
                                              alt="Inst"
                                              width="32"
                                              style="
                                                display: block;
                                                border: 0;
                                                outline: none;
                                                text-decoration: none;
                                                -ms-interpolation-mode: bicubic;
                                              "
                                            />
                                          </td>
                                          <td
                                            align="center"
                                            valign="top"
                                            style="padding: 0; margin: 0"
                                          >
                                            <img
                                              title="Youtube"
                                              src="https://jhclqt.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png"
                                              alt="Yt"
                                              width="32"
                                              style="
                                                display: block;
                                                border: 0;
                                                outline: none;
                                                text-decoration: none;
                                                -ms-interpolation-mode: bicubic;
                                              "
                                            />
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      align="center"
                                      style="
                                        padding: 0;
                                        margin: 0;
                                        padding-bottom: 35px;
                                      "
                                    >
                                      <p
                                        style="
                                          margin: 0;
                                          -webkit-text-size-adjust: none;
                                          -ms-text-size-adjust: none;
                                          mso-line-height-rule: exactly;
                                          font-family: arial, 'helvetica neue',
                                            helvetica, sans-serif;
                                          line-height: 18px;
                                          color: #333333;
                                          font-size: 12px;
                                        "
                                      >
                                        mymanager © 2022&nbsp;All Rights
                                        Reserved.<br />
                                      </p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table
                cellpadding="0"
                cellspacing="0"
                class="es-content"
                align="center"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  border-collapse: collapse;
                  border-spacing: 0px;
                  table-layout: fixed !important;
                  width: 100%;
                "
              >
                <tr>
                  <td
                    class="es-info-area"
                    align="center"
                    style="padding: 0; margin: 0"
                  >
                    <table
                      class="es-content-body"
                      align="center"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                        background-color: transparent;
                        width: 600px;
                      "
                      bgcolor="#FFFFFF"
                    >
                      <tr>
                        <td align="left" style="padding: 20px; margin: 0">
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-collapse: collapse;
                              border-spacing: 0px;
                            "
                          >
                            <tr>
                              <td
                                align="center"
                                valign="top"
                                style="padding: 0; margin: 0; width: 560px"
                              >
                                <table
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    border-collapse: collapse;
                                    border-spacing: 0px;
                                  "
                                >
                                  <tr>
                                    <td
                                      align="center"
                                      class="es-infoblock"
                                      style="
                                        padding: 0;
                                        margin: 0;
                                        line-height: 14px;
                                        font-size: 12px;
                                        color: #cccccc;
                                      "
                                    >
                                      <p
                                        style="
                                          margin: 0;
                                          -webkit-text-size-adjust: none;
                                          -ms-text-size-adjust: none;
                                          mso-line-height-rule: exactly;
                                          font-family: arial, 'helvetica neue',
                                            helvetica, sans-serif;
                                          line-height: 14px;
                                          color: #cccccc;
                                          font-size: 12px;
                                        "
                                      >
                                        <a
                                          target="_blank"
                                          href=""
                                          style="
                                            -webkit-text-size-adjust: none;
                                            -ms-text-size-adjust: none;
                                            mso-line-height-rule: exactly;
                                            text-decoration: underline;
                                            color: #cccccc;
                                            font-size: 12px;
                                          "
                                        ></a
                                        >No longer want to receive these
                                        emails?&nbsp;<a
                                          href=""
                                          target="_blank"
                                          style="
                                            -webkit-text-size-adjust: none;
                                            -ms-text-size-adjust: none;
                                            mso-line-height-rule: exactly;
                                            text-decoration: underline;
                                            color: #cccccc;
                                            font-size: 12px;
                                          "
                                          >Unsubscribe</a
                                        >.<a
                                          target="_blank"
                                          href=""
                                          style="
                                            -webkit-text-size-adjust: none;
                                            -ms-text-size-adjust: none;
                                            mso-line-height-rule: exactly;
                                            text-decoration: underline;
                                            color: #cccccc;
                                            font-size: 12px;
                                          "
                                        ></a>
                                      </p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </body>
  </html>
    `;
};

exports.incompletedTaskEmailTemplate = ({ ...data }) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html
      xmlns="http://www.w3.org/1999/xhtml"
      xmlns:o="urn:schemas-microsoft-com:office:office"
      style="font-family: arial, 'helvetica neue', helvetica, sans-serif"
    >
      <head>
        <meta charset="UTF-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="x-apple-disable-message-reformatting" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta content="telephone=no" name="format-detection" />
        <title>New message</title>
        <!--[if (mso 16)]>
          <style type="text/css">
            a {
              text-decoration: none;
            }
          </style>
        <![endif]-->
        <!--[if gte mso 9
          ]><style>
            sup {
              font-size: 100% !important;
            }
          </style><!
        [endif]-->
        <!--[if gte mso 9]>
          <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG></o:AllowPNG>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        <![endif]-->
        <style type="text/css">
          #outlook a {
            padding: 0;
          }
          .es-button {
            mso-style-priority: 100 !important;
            text-decoration: none !important;
          }
          a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
          }
          .es-desk-hidden {
            display: none;
            float: left;
            overflow: hidden;
            width: 0;
            max-height: 0;
            line-height: 0;
            mso-hide: all;
          }
          [data-ogsb] .es-button {
            border-width: 0 !important;
            padding: 10px 30px 10px 30px !important;
          }
          @media only screen and (max-width: 600px) {
            p,
            ul li,
            ol li,
            a {
              line-height: 150% !important;
            }
            h1,
            h2,
            h3,
            h1 a,
            h2 a,
            h3 a {
              line-height: 120%;
            }
            h1 {
              font-size: 36px !important;
              text-align: left;
            }
            h2 {
              font-size: 26px !important;
              text-align: left;
            }
            h3 {
              font-size: 20px !important;
              text-align: left;
            }
            .es-header-body h1 a,
            .es-content-body h1 a,
            .es-footer-body h1 a {
              font-size: 36px !important;
              text-align: left;
            }
            .es-header-body h2 a,
            .es-content-body h2 a,
            .es-footer-body h2 a {
              font-size: 26px !important;
              text-align: left;
            }
            .es-header-body h3 a,
            .es-content-body h3 a,
            .es-footer-body h3 a {
              font-size: 20px !important;
              text-align: left;
            }
            .es-menu td a {
              font-size: 12px !important;
            }
            .es-header-body p,
            .es-header-body ul li,
            .es-header-body ol li,
            .es-header-body a {
              font-size: 14px !important;
            }
            .es-content-body p,
            .es-content-body ul li,
            .es-content-body ol li,
            .es-content-body a {
              font-size: 16px !important;
            }
            .es-footer-body p,
            .es-footer-body ul li,
            .es-footer-body ol li,
            .es-footer-body a {
              font-size: 14px !important;
            }
            .es-infoblock p,
            .es-infoblock ul li,
            .es-infoblock ol li,
            .es-infoblock a {
              font-size: 12px !important;
            }
            *[class="gmail-fix"] {
              display: none !important;
            }
            .es-m-txt-c,
            .es-m-txt-c h1,
            .es-m-txt-c h2,
            .es-m-txt-c h3 {
              text-align: center !important;
            }
            .es-m-txt-r,
            .es-m-txt-r h1,
            .es-m-txt-r h2,
            .es-m-txt-r h3 {
              text-align: right !important;
            }
            .es-m-txt-l,
            .es-m-txt-l h1,
            .es-m-txt-l h2,
            .es-m-txt-l h3 {
              text-align: left !important;
            }
            .es-m-txt-r img,
            .es-m-txt-c img,
            .es-m-txt-l img {
              display: inline !important;
            }
            .es-button-border {
              display: inline-block !important;
            }
            a.es-button,
            button.es-button {
              font-size: 20px !important;
              display: inline-block !important;
            }
            .es-adaptive table,
            .es-left,
            .es-right {
              width: 100% !important;
            }
            .es-content table,
            .es-header table,
            .es-footer table,
            .es-content,
            .es-footer,
            .es-header {
              width: 100% !important;
              max-width: 600px !important;
            }
            .es-adapt-td {
              display: block !important;
              width: 100% !important;
            }
            .adapt-img {
              width: 100% !important;
              height: auto !important;
            }
            .es-m-p0 {
              padding: 0 !important;
            }
            .es-m-p0r {
              padding-right: 0 !important;
            }
            .es-m-p0l {
              padding-left: 0 !important;
            }
            .es-m-p0t {
              padding-top: 0 !important;
            }
            .es-m-p0b {
              padding-bottom: 0 !important;
            }
            .es-m-p20b {
              padding-bottom: 20px !important;
            }
            .es-mobile-hidden,
            .es-hidden {
              display: none !important;
            }
            tr.es-desk-hidden,
            td.es-desk-hidden,
            table.es-desk-hidden {
              width: auto !important;
              overflow: visible !important;
              float: none !important;
              max-height: inherit !important;
              line-height: inherit !important;
            }
            tr.es-desk-hidden {
              display: table-row !important;
            }
            table.es-desk-hidden {
              display: table !important;
            }
            td.es-desk-menu-hidden {
              display: table-cell !important;
            }
            .es-menu td {
              width: 1% !important;
            }
            table.es-table-not-adapt,
            .esd-block-html table {
              width: auto !important;
            }
            table.es-social {
              display: inline-block !important;
            }
            table.es-social td {
              display: inline-block !important;
            }
            .es-m-p5 {
              padding: 5px !important;
            }
            .es-m-p5t {
              padding-top: 5px !important;
            }
            .es-m-p5b {
              padding-bottom: 5px !important;
            }
            .es-m-p5r {
              padding-right: 5px !important;
            }
            .es-m-p5l {
              padding-left: 5px !important;
            }
            .es-m-p10 {
              padding: 10px !important;
            }
            .es-m-p10t {
              padding-top: 10px !important;
            }
            .es-m-p10b {
              padding-bottom: 10px !important;
            }
            .es-m-p10r {
              padding-right: 10px !important;
            }
            .es-m-p10l {
              padding-left: 10px !important;
            }
            .es-m-p15 {
              padding: 15px !important;
            }
            .es-m-p15t {
              padding-top: 15px !important;
            }
            .es-m-p15b {
              padding-bottom: 15px !important;
            }
            .es-m-p15r {
              padding-right: 15px !important;
            }
            .es-m-p15l {
              padding-left: 15px !important;
            }
            .es-m-p20 {
              padding: 20px !important;
            }
            .es-m-p20t {
              padding-top: 20px !important;
            }
            .es-m-p20r {
              padding-right: 20px !important;
            }
            .es-m-p20l {
              padding-left: 20px !important;
            }
            .es-m-p25 {
              padding: 25px !important;
            }
            .es-m-p25t {
              padding-top: 25px !important;
            }
            .es-m-p25b {
              padding-bottom: 25px !important;
            }
            .es-m-p25r {
              padding-right: 25px !important;
            }
            .es-m-p25l {
              padding-left: 25px !important;
            }
            .es-m-p30 {
              padding: 30px !important;
            }
            .es-m-p30t {
              padding-top: 30px !important;
            }
            .es-m-p30b {
              padding-bottom: 30px !important;
            }
            .es-m-p30r {
              padding-right: 30px !important;
            }
            .es-m-p30l {
              padding-left: 30px !important;
            }
            .es-m-p35 {
              padding: 35px !important;
            }
            .es-m-p35t {
              padding-top: 35px !important;
            }
            .es-m-p35b {
              padding-bottom: 35px !important;
            }
            .es-m-p35r {
              padding-right: 35px !important;
            }
            .es-m-p35l {
              padding-left: 35px !important;
            }
            .es-m-p40 {
              padding: 40px !important;
            }
            .es-m-p40t {
              padding-top: 40px !important;
            }
            .es-m-p40b {
              padding-bottom: 40px !important;
            }
            .es-m-p40r {
              padding-right: 40px !important;
            }
            .es-m-p40l {
              padding-left: 40px !important;
            }
          }
        </style>
      </head>
      <body
        style="
          width: 100%;
          font-family: arial, 'helvetica neue', helvetica, sans-serif;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
          padding: 0;
          margin: 0;
        "
      >
        <div class="es-wrapper-color" style="background-color: #fafafa">
          <!--[if gte mso 9]>
            <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
              <v:fill type="tile" color="#fafafa"></v:fill>
            </v:background>
          <![endif]-->
          <table
            class="es-wrapper"
            width="100%"
            cellspacing="0"
            cellpadding="0"
            style="
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              border-collapse: collapse;
              border-spacing: 0px;
              padding: 0;
              margin: 0;
              width: 100%;
              height: 100%;
              background-repeat: repeat;
              background-position: center top;
              background-color: #fafafa;
            "
          >
            <tr>
              <td valign="top" style="padding: 0; margin: 0">
                <table
                  cellpadding="0"
                  cellspacing="0"
                  class="es-content"
                  align="center"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    border-collapse: collapse;
                    border-spacing: 0px;
                    table-layout: fixed !important;
                    width: 100%;
                  "
                >
                  <tr>
                    <td align="center" style="padding: 0; margin: 0">
                      <table
                        bgcolor="#ffffff"
                        class="es-content-body"
                        align="center"
                        cellpadding="0"
                        cellspacing="0"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-collapse: collapse;
                          border-spacing: 0px;
                          background-color: #ffffff;
                          width: 600px;
                        "
                      >
                        <tr>
                          <td
                            align="left"
                            style="
                              padding: 0;
                              margin: 0;
                              padding-top: 20px;
                              padding-left: 20px;
                              padding-right: 20px;
                            "
                          >
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                              "
                            >
                              <tr>
                                <td
                                  align="center"
                                  valign="top"
                                  style="padding: 0; margin: 0; width: 560px"
                                >
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                    "
                                  >
                                    <tr>
                                      <td
                                        align="left"
                                        style="padding: 0; margin: 0"
                                      >
                                        <p
                                          style="
                                            margin: 0;
                                            -webkit-text-size-adjust: none;
                                            -ms-text-size-adjust: none;
                                            mso-line-height-rule: exactly;
                                            font-family: -apple-system,
                                              blinkmacsystemfont, 'segoe ui', roboto,
                                              helvetica, arial, sans-serif,
                                              'apple color emoji', 'segoe ui emoji',
                                              'segoe ui symbol';
                                            line-height: 24px;
                                            color: #7367f0;
                                            font-size: 16px;
                                          "
                                        >
                                          <strong>Sent via My Manager</strong>
                                        </p>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td
                            align="left"
                            style="
                              margin: 0;
                              padding-left: 20px;
                              padding-right: 20px;
                              padding-top: 30px;
                              padding-bottom: 30px;
                            "
                          >
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                              "
                            >
                              <tr>
                                <td
                                  align="center"
                                  valign="top"
                                  style="padding: 0; margin: 0; width: 560px"
                                >
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                    "
                                  >
                                    <tr>
                                      <td
                                        align="center"
                                        style="
                                          padding: 0;
                                          margin: 0;
                                          padding-top: 10px;
                                          padding-bottom: 10px;
                                          font-size: 0px;
                                        "
                                      >
                                        <img
                                          src="https://jhclqt.stripocdn.email/content/guids/CABINET_67e080d830d87c17802bd9b4fe1c0912/images/55191618237638326.png"
                                          alt
                                          style="
                                            display: block;
                                            border: 0;
                                            outline: none;
                                            text-decoration: none;
                                            -ms-interpolation-mode: bicubic;
                                          "
                                          width="100"
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        align="center"
                                        class="es-m-p0r es-m-p0l"
                                        style="
                                          margin: 0;
                                          padding-top: 5px;
                                          padding-bottom: 5px;
                                          padding-left: 40px;
                                          padding-right: 40px;
                                        "
                                      >
                                        <p
                                          style="
                                            margin: 0;
                                            -webkit-text-size-adjust: none;
                                            -ms-text-size-adjust: none;
                                            mso-line-height-rule: exactly;
                                            font-family: arial, 'helvetica neue',
                                              helvetica, sans-serif;
                                            line-height: 21px;
                                            color: #333333;
                                            font-size: 14px;
                                          "
                                        >
                                          Hi ${data.recipientName}! Please check today(${data.nowDate})'s incompleted task reporting.
                                        </p>
                                      </td>
                                    </tr>
    
                                    <tr>
                                      <td
                                        align="center"
                                        style="
                                          padding: 0;
                                          margin: 0;
                                          padding-bottom: 5px;
                                          padding-top: 10px;
                                        "
                                      >
                                        ${data.tableData}
                                      </td>
                                    </tr>
                                    
                                    <tr>
                                      <td
                                        align="center"
                                        class="es-m-p0r es-m-p0l"
                                        style="
                                          margin: 0;
                                          padding-top: 5px;
                                          padding-bottom: 5px;
                                          padding-left: 40px;
                                          padding-right: 40px;
                                        "
                                      >
                                        <p
                                          style="
                                            margin: 0;
                                            -webkit-text-size-adjust: none;
                                            -ms-text-size-adjust: none;
                                            mso-line-height-rule: exactly;
                                            font-family: arial, 'helvetica neue',
                                              helvetica, sans-serif;
                                            line-height: 21px;
                                            color: #333333;
                                            font-size: 14px;
                                          "
                                        >
                                          Best regards, ${data.senderName}
                                        </p>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <table
                  cellpadding="0"
                  cellspacing="0"
                  class="es-footer"
                  align="center"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    border-collapse: collapse;
                    border-spacing: 0px;
                    table-layout: fixed !important;
                    width: 100%;
                    background-color: transparent;
                    background-repeat: repeat;
                    background-position: center top;
                  "
                >
                  <tr>
                    <td align="center" style="padding: 0; margin: 0">
                      <table
                        class="es-footer-body"
                        align="center"
                        cellpadding="0"
                        cellspacing="0"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-collapse: collapse;
                          border-spacing: 0px;
                          background-color: transparent;
                          width: 640px;
                        "
                      >
                        <tr>
                          <td
                            align="left"
                            style="
                              margin: 0;
                              padding-top: 20px;
                              padding-bottom: 20px;
                              padding-left: 20px;
                              padding-right: 20px;
                            "
                          >
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                              "
                            >
                              <tr>
                                <td
                                  align="left"
                                  style="padding: 0; margin: 0; width: 600px"
                                >
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                    "
                                  >
                                    <tr>
                                      <td
                                        align="center"
                                        style="
                                          padding: 0;
                                          margin: 0;
                                          padding-top: 15px;
                                          padding-bottom: 15px;
                                          font-size: 0;
                                        "
                                      >
                                        <table
                                          cellpadding="0"
                                          cellspacing="0"
                                          class="es-table-not-adapt es-social"
                                          role="presentation"
                                          style="
                                            mso-table-lspace: 0pt;
                                            mso-table-rspace: 0pt;
                                            border-collapse: collapse;
                                            border-spacing: 0px;
                                          "
                                        >
                                          <tr>
                                            <td
                                              align="center"
                                              valign="top"
                                              style="
                                                padding: 0;
                                                margin: 0;
                                                padding-right: 40px;
                                              "
                                            >
                                              <img
                                                title="Facebook"
                                                src="https://jhclqt.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png"
                                                alt="Fb"
                                                width="32"
                                                style="
                                                  display: block;
                                                  border: 0;
                                                  outline: none;
                                                  text-decoration: none;
                                                  -ms-interpolation-mode: bicubic;
                                                "
                                              />
                                            </td>
                                            <td
                                              align="center"
                                              valign="top"
                                              style="
                                                padding: 0;
                                                margin: 0;
                                                padding-right: 40px;
                                              "
                                            >
                                              <img
                                                title="Twitter"
                                                src="https://jhclqt.stripocdn.email/content/assets/img/social-icons/logo-black/twitter-logo-black.png"
                                                alt="Tw"
                                                width="32"
                                                style="
                                                  display: block;
                                                  border: 0;
                                                  outline: none;
                                                  text-decoration: none;
                                                  -ms-interpolation-mode: bicubic;
                                                "
                                              />
                                            </td>
                                            <td
                                              align="center"
                                              valign="top"
                                              style="
                                                padding: 0;
                                                margin: 0;
                                                padding-right: 40px;
                                              "
                                            >
                                              <img
                                                title="Instagram"
                                                src="https://jhclqt.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png"
                                                alt="Inst"
                                                width="32"
                                                style="
                                                  display: block;
                                                  border: 0;
                                                  outline: none;
                                                  text-decoration: none;
                                                  -ms-interpolation-mode: bicubic;
                                                "
                                              />
                                            </td>
                                            <td
                                              align="center"
                                              valign="top"
                                              style="padding: 0; margin: 0"
                                            >
                                              <img
                                                title="Youtube"
                                                src="https://jhclqt.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png"
                                                alt="Yt"
                                                width="32"
                                                style="
                                                  display: block;
                                                  border: 0;
                                                  outline: none;
                                                  text-decoration: none;
                                                  -ms-interpolation-mode: bicubic;
                                                "
                                              />
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        align="center"
                                        style="
                                          padding: 0;
                                          margin: 0;
                                          padding-bottom: 35px;
                                        "
                                      >
                                        <p
                                          style="
                                            margin: 0;
                                            -webkit-text-size-adjust: none;
                                            -ms-text-size-adjust: none;
                                            mso-line-height-rule: exactly;
                                            font-family: arial, 'helvetica neue',
                                              helvetica, sans-serif;
                                            line-height: 18px;
                                            color: #333333;
                                            font-size: 12px;
                                          "
                                        >
                                          mymanager © 2022&nbsp;All Rights
                                          Reserved.<br />
                                        </p>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <table
                  cellpadding="0"
                  cellspacing="0"
                  class="es-content"
                  align="center"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    border-collapse: collapse;
                    border-spacing: 0px;
                    table-layout: fixed !important;
                    width: 100%;
                  "
                >
                  <tr>
                    <td
                      class="es-info-area"
                      align="center"
                      style="padding: 0; margin: 0"
                    >
                      <table
                        class="es-content-body"
                        align="center"
                        cellpadding="0"
                        cellspacing="0"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          border-collapse: collapse;
                          border-spacing: 0px;
                          background-color: transparent;
                          width: 600px;
                        "
                        bgcolor="#FFFFFF"
                      >
                        <tr>
                          <td align="left" style="padding: 20px; margin: 0">
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                              "
                            >
                              <tr>
                                <td
                                  align="center"
                                  valign="top"
                                  style="padding: 0; margin: 0; width: 560px"
                                >
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                    "
                                  >
                                    <tr>
                                      <td
                                        align="center"
                                        class="es-infoblock"
                                        style="
                                          padding: 0;
                                          margin: 0;
                                          line-height: 14px;
                                          font-size: 12px;
                                          color: #cccccc;
                                        "
                                      >
                                        <p
                                          style="
                                            margin: 0;
                                            -webkit-text-size-adjust: none;
                                            -ms-text-size-adjust: none;
                                            mso-line-height-rule: exactly;
                                            font-family: arial, 'helvetica neue',
                                              helvetica, sans-serif;
                                            line-height: 14px;
                                            color: #cccccc;
                                            font-size: 12px;
                                          "
                                        >
                                          <a
                                            target="_blank"
                                            href=""
                                            style="
                                              -webkit-text-size-adjust: none;
                                              -ms-text-size-adjust: none;
                                              mso-line-height-rule: exactly;
                                              text-decoration: underline;
                                              color: #cccccc;
                                              font-size: 12px;
                                            "
                                          ></a
                                          >No longer want to receive these
                                          emails?&nbsp;<a
                                            href=""
                                            target="_blank"
                                            style="
                                              -webkit-text-size-adjust: none;
                                              -ms-text-size-adjust: none;
                                              mso-line-height-rule: exactly;
                                              text-decoration: underline;
                                              color: #cccccc;
                                              font-size: 12px;
                                            "
                                            >Unsubscribe</a
                                          >.<a
                                            target="_blank"
                                            href=""
                                            style="
                                              -webkit-text-size-adjust: none;
                                              -ms-text-size-adjust: none;
                                              mso-line-height-rule: exactly;
                                              text-decoration: underline;
                                              color: #cccccc;
                                              font-size: 12px;
                                            "
                                          ></a>
                                        </p>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </body>
    </html>
    `;
};

exports.invoiceEmailTemplate = ({ ...data }) => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Email Template</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: sans-serif;
        }
      </style>
    </head>
    <body>
      <div
        class="container"
        style="max-width: 500px; margin: auto; text-align: center"
      >
        <div style="margin-top: 28px; color: #212529">
          <span>INVOICE ${data.invoiceNo}</span>
        </div>
        <div style="font-size: 60px; color: #184ae7; margin: 38px 0 58px 0">
          <!-- <b>MyManager</b> -->
          <img src=${
            data.logo === "" ? "./assets/logo.png" : data.logo
          } alt="" style:"height:200px">
        </div>
        <div
          class="whole-container"
          style="
            max-width: 500px;
            background-color: #f8f8f8;
            margin: auto;
            text-align: center;
            padding: 1px 0 30px 0;
            color: #212529;
          "
        >
          <h3 style="font-weight: 500; font-size: 30px">
            <b> Due ${data.dueDate}</b>
          </h3>
          <div style="margin: 30px 0px 15px 0px">
            <span style="font-size: 50px; margin-top: 20px"
              ><b>$ ${data.pay}</b></span
            >
          </div>
          
          <a href="${data.invoiceLink}" style="
          background-color: #184ae7;
          font-size: 18px;
          padding: 10px 30px;
          border: none;
          border-radius: 5px;
          color: white;
          margin: 0 0 10px 0;
        ">Review & Pay</a>
          <div>
            <p style="color: #636464; font-size: 18px; text-align: center"
              >Powered by My Manager</p
            >
          </div>
        </div>
        <div
          style="
            font-size: 1em;
            padding: 20px;
            text-align: center;
            line-height: 40px;
            margin-bottom: 30px;
            color: #212529;
          "
        >
          <span style="text-align: start"
            ><b>${data.message || "Thankyou for choosing our team!"}</b></span
          >
        </div>
        <div>
          <hr />
          <div
            style="
              text-align: center;
              font-size: 20px;
              color: #636464;
              line-height: 40px;
            "
          >
            <div>${data.address || "158 Broadway, 3A Brooklyn, NY 11211 US"}</div>
            <div>${data.email || "admin@mymanager.com"}</div>
            <div>mymanager.com</div>
          </div>
        </div>
      </div>
    </body>
  </html>
  `;
};

exports.clintEmailTemplate = ({ ...data }) => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Email Template</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: sans-serif;
        }
      </style>
    </head>
    <body>
      <div
        class="container"
        style="max-width: 500px; margin: auto; text-align: center"
      >
        <div style="margin-top: 28px; color: #212529">
          <span>INVOICE ${data.invoiceNo}</span>
        </div>
        <div style="font-size: 60px; color: #184ae7; margin: 38px 0 58px 0">
          <!-- <b>MyManager</b> -->
          <img src=${
            data.logo === "" ? "./assets/logo.png" : data.logo
          } alt="" style:"height:200px">
        </div>
        <div
          class="whole-container"
          style="
            max-width: 500px;
            background-color: #f8f8f8;
            margin: auto;
            text-align: center;
            padding: 1px 0 30px 0;
            color: #212529;
          "
        >
          <h3 style="font-weight: 500; font-size: 30px">
            <b> Due ${data.dueDate}</b>
          </h3>
          <div style="margin: 30px 0px 15px 0px">
            <span style="font-size: 50px; margin-top: 20px"
              ><b>$ ${data.pay}</b></span
            >
          </div>
          
          <a href="${data.invoiceLink}" style="
          background-color: #184ae7;
          font-size: 18px;
          padding: 10px 30px;
          border: none;
          border-radius: 5px;
          color: white;
          margin: 0 0 10px 0;
        ">Review & Pay</a>
          <div>
            <p style="color: #636464; font-size: 18px; text-align: center"
              >Powered by My Manager</p>
          </div>
        </div>
        <div
          style="
            font-size: 1em;
            padding: 20px;
            text-align: center;
            line-height: 40px;
            margin-bottom: 30px;
            color: #212529;
          "
        >
          <span style="text-align: start"
            ><b>${data.message || "Thankyou for choosing our team!"}</b></span
          >
        </div>
        <div>
          <hr />
          <div
            style="
              text-align: center;
              font-size: 20px;
              color: #636464;
              line-height: 40px;
            "
          >
            <div>${data.address || "158 Broadway, 3A Brooklyn, NY 11211 US"}</div>
            <div>${data.email || "admin@mymanager.com"}</div>
            <div>mymanager.com</div>
          </div>
        </div>
      </div>
    </body>
  </html>
  `;
};

exports.organizationEmailTemplate = ({ ...data }) => {
  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="font-family:arial, 'helvetica neue', helvetica, sans-serif"> 
  <head> 
    <meta charset="UTF-8"> 
    <meta content="width=device-width, initial-scale=1" name="viewport"> 
    <meta name="x-apple-disable-message-reformatting"> 
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
    <meta content="telephone=no" name="format-detection"> 
    <title>New message</title><!--[if (mso 16)]>
      <style type="text/css">
      a {text-decoration: none;}
      </style>
      <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
  <xml>
      <o:OfficeDocumentSettings>
      <o:AllowPNG></o:AllowPNG>
      <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
  </xml>
  <![endif]--> 
    <style type="text/css">
  #outlook a {
    padding:0;
  }
  .es-button {
    mso-style-priority:100!important;
    text-decoration:none!important;
  }
  a[x-apple-data-detectors] {
    color:inherit!important;
    text-decoration:none!important;
    font-size:inherit!important;
    font-family:inherit!important;
    font-weight:inherit!important;
    line-height:inherit!important;
  }
  .es-desk-hidden {
    display:none;
    float:left;
    overflow:hidden;
    width:0;
    max-height:0;
    line-height:0;
    mso-hide:all;
  }
  [data-ogsb] .es-button {
    border-width:0!important;
    padding:10px 30px 10px 30px!important;
  }
  @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120% } h1 { font-size:36px!important; text-align:left } h2 { font-size:26px!important; text-align:left } h3 { font-size:20px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:36px!important; text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important; text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important; text-align:left } .es-menu td a { font-size:12px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:20px!important; display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0!important } .es-m-p0r { padding-right:0!important } .es-m-p0l { padding-left:0!important } .es-m-p0t { padding-top:0!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-m-p5 { padding:5px!important } .es-m-p5t { padding-top:5px!important } .es-m-p5b { padding-bottom:5px!important } .es-m-p5r { padding-right:5px!important } .es-m-p5l { padding-left:5px!important } .es-m-p10 { padding:10px!important } .es-m-p10t { padding-top:10px!important } .es-m-p10b { padding-bottom:10px!important } .es-m-p10r { padding-right:10px!important } .es-m-p10l { padding-left:10px!important } .es-m-p15 { padding:15px!important } .es-m-p15t { padding-top:15px!important } .es-m-p15b { padding-bottom:15px!important } .es-m-p15r { padding-right:15px!important } .es-m-p15l { padding-left:15px!important } .es-m-p20 { padding:20px!important } .es-m-p20t { padding-top:20px!important } .es-m-p20r { padding-right:20px!important } .es-m-p20l { padding-left:20px!important } .es-m-p25 { padding:25px!important } .es-m-p25t { padding-top:25px!important } .es-m-p25b { padding-bottom:25px!important } .es-m-p25r { padding-right:25px!important } .es-m-p25l { padding-left:25px!important } .es-m-p30 { padding:30px!important } .es-m-p30t { padding-top:30px!important } .es-m-p30b { padding-bottom:30px!important } .es-m-p30r { padding-right:30px!important } .es-m-p30l { padding-left:30px!important } .es-m-p35 { padding:35px!important } .es-m-p35t { padding-top:35px!important } .es-m-p35b { padding-bottom:35px!important } .es-m-p35r { padding-right:35px!important } .es-m-p35l { padding-left:35px!important } .es-m-p40 { padding:40px!important } .es-m-p40t { padding-top:40px!important } .es-m-p40b { padding-bottom:40px!important } .es-m-p40r { padding-right:40px!important } .es-m-p40l { padding-left:40px!important } }
  </style> 
  </head> 
  <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
    <div class="es-wrapper-color" style="background-color:#FAFAFA"><!--[if gte mso 9]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
          <v:fill type="tile" color="#fafafa"></v:fill>
        </v:background>
      <![endif]--> 
    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FAFAFA"> 
      <tr> 
        <td valign="top" style="padding:0;Margin:0"> 
        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
          <tr> 
            <td align="center" style="padding:0;Margin:0"> 
            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
              <tr> 
                <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px"> 
                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                  <tr> 
                    <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                      <tr> 
                        <td align="left" style="padding:0;Margin:0; display: flex; justify-content: space-between">
                          <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:-apple-system, blinkmacsystemfont, 'segoe ui', roboto, helvetica, arial, sans-serif, 'apple color emoji', 'segoe ui emoji', 'segoe ui symbol';line-height:24px;color:#174AE7;font-size:16px;">
                            <strong>Welcome To MyManager</strong></p> <img src="https://me.mymanager.com/static/media/logo.01654d61.svg" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;margin-left: 5px; width: 150px"></td> 
                      </tr> 
                    </table></td> 
                  </tr> 
                </table></td> 
              </tr> 
              <tr> 
                <td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px"> 
                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                  <tr> 
                    <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                      <tr> 
                        <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;padding-bottom:10px"><h1 style="Margin:0;line-height:46px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:bold;color:#333333">Activate your organization ${data.orgName}</h1></td> 
                      </tr> 
                      <tr> 
                        <td align="center" class="es-m-p0r es-m-p0l" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">You’ve received This is a reminder email for activating your organization. Please click on the Active button bellow .</p></td> 
                      </tr> 
                      <tr> 
                        <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;"><h1 style="Margin:0;line-height:20px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;font-style:normal;color:#333333">${data.message}</h1></td> 
                      </tr> 
                      <tr> 
                        <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;"><h1 style="Margin:0;line-height:20px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;font-style:normal;font-weight:bold;color:#333333">Email: ${data.email}</h1></td> 
                      </tr> 
                      <tr> 
                        <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;"><h1 style="Margin:0;line-height:20px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;font-style:normal;font-weight:bold;color:#333333">Contact: ${data.contact}</h1></td> 
                      </tr> 
                      <tr> 
                        <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;"><h1 style="Margin:0;line-height:20px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;font-style:normal;font-weight:bold;color:#333333">Address: ${data.address}</h1></td> 
                      </tr> 
                      <tr> 
                        <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><span class="es-button-border" style="border-style:solid;border-color:#174AE7;background:#174AE7;border-width:0px;display:inline-block;border-radius:6px;width:auto"><a class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:20px;border-style:solid;border-color:#174AE7;border-width:10px 30px 10px 30px;display:inline-block;background:#174AE7;border-radius:6px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:24px;width:auto;text-align:center;border-left-width:30px;border-right-width:30px" href=${data.url}>ACTIVATE</a></span></td> 
                      </tr> 
                      <tr> 
                        <td align="center" class="es-m-p0r es-m-p0l" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Once Active, this email will be uniquely associated with your account.</p></td> 
                      </tr> 
                    </table></td> 
                  </tr> 
                </table></td> 
              </tr> 
            </table></td> 
          </tr> 
        </table> 
        <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"> 
          <tr> 
            <td align="center" style="padding:0;Margin:0"> 
            <table class="es-footer-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:640px"> 
              <tr> 
                <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px"> 
                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                  <tr> 
                    <td align="left" style="padding:0;Margin:0;width:600px"> 
                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                      <tr> 
                        <td align="center" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px;font-size:0"> 
                        <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                          <tr> 
                            <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><img title="Facebook" src="https://jhclqt.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                            <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><img title="Twitter" src="https://jhclqt.stripocdn.email/content/assets/img/social-icons/logo-black/twitter-logo-black.png" alt="Tw" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                            <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><img title="Instagram" src="https://jhclqt.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                            <td align="center" valign="top" style="padding:0;Margin:0"><img title="Youtube" src="https://jhclqt.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Yt" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                          </tr> 
                        </table></td> 
                      </tr> 
                      <tr> 
                        <td align="center" style="padding:0;Margin:0;padding-bottom:35px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;color:#333333;font-size:12px">mymanager © 2022&nbsp;All Rights Reserved.<br></p></td> 
                      </tr> 
                    </table></td> 
                  </tr> 
                </table></td> 
              </tr> 
            </table></td> 
          </tr> 
        </table> 
        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
          <tr> 
            <td class="es-info-area" align="center" style="padding:0;Margin:0"> 
            <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" bgcolor="#FFFFFF"> 
              <tr> 
                <td align="left" style="padding:20px;Margin:0"> 
                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                  <tr> 
                    <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                      <tr> 
                        <td align="center" class="es-infoblock" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px"><a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px"></a>No longer want to receive these emails?&nbsp;<a href="" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px">Unsubscribe</a>.<a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px"></a></p></td> 
                      </tr> 
                    </table></td> 
                  </tr> 
                </table></td> 
              </tr> 
            </table></td> 
          </tr> 
        </table></td> 
      </tr> 
    </table> 
    </div>  
  </body>
  </html>
  `;
};

exports.organizationInvitationEmailTemplate = ({ ...data }) => {
  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="font-family:arial, 'helvetica neue', helvetica, sans-serif"> 
  <head> 
    <meta charset="UTF-8"> 
    <meta content="width=device-width, initial-scale=1" name="viewport"> 
    <meta name="x-apple-disable-message-reformatting"> 
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
    <meta content="telephone=no" name="format-detection"> 
    <title>New message</title><!--[if (mso 16)]>
      <style type="text/css">
      a {text-decoration: none;}
      </style>
      <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
  <xml>
      <o:OfficeDocumentSettings>
      <o:AllowPNG></o:AllowPNG>
      <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
  </xml>
  <![endif]--> 
    <style type="text/css">
  #outlook a {
    padding:0;
  }
  .es-button {
    mso-style-priority:100!important;
    text-decoration:none!important;
  }
  a[x-apple-data-detectors] {
    color:inherit!important;
    text-decoration:none!important;
    font-size:inherit!important;
    font-family:inherit!important;
    font-weight:inherit!important;
    line-height:inherit!important;
  }
  .es-desk-hidden {
    display:none;
    float:left;
    overflow:hidden;
    width:0;
    max-height:0;
    line-height:0;
    mso-hide:all;
  }
  [data-ogsb] .es-button {
    border-width:0!important;
    padding:10px 30px 10px 30px!important;
  }
  @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120% } h1 { font-size:36px!important; text-align:left } h2 { font-size:26px!important; text-align:left } h3 { font-size:20px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:36px!important; text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important; text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important; text-align:left } .es-menu td a { font-size:12px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:20px!important; display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0!important } .es-m-p0r { padding-right:0!important } .es-m-p0l { padding-left:0!important } .es-m-p0t { padding-top:0!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-m-p5 { padding:5px!important } .es-m-p5t { padding-top:5px!important } .es-m-p5b { padding-bottom:5px!important } .es-m-p5r { padding-right:5px!important } .es-m-p5l { padding-left:5px!important } .es-m-p10 { padding:10px!important } .es-m-p10t { padding-top:10px!important } .es-m-p10b { padding-bottom:10px!important } .es-m-p10r { padding-right:10px!important } .es-m-p10l { padding-left:10px!important } .es-m-p15 { padding:15px!important } .es-m-p15t { padding-top:15px!important } .es-m-p15b { padding-bottom:15px!important } .es-m-p15r { padding-right:15px!important } .es-m-p15l { padding-left:15px!important } .es-m-p20 { padding:20px!important } .es-m-p20t { padding-top:20px!important } .es-m-p20r { padding-right:20px!important } .es-m-p20l { padding-left:20px!important } .es-m-p25 { padding:25px!important } .es-m-p25t { padding-top:25px!important } .es-m-p25b { padding-bottom:25px!important } .es-m-p25r { padding-right:25px!important } .es-m-p25l { padding-left:25px!important } .es-m-p30 { padding:30px!important } .es-m-p30t { padding-top:30px!important } .es-m-p30b { padding-bottom:30px!important } .es-m-p30r { padding-right:30px!important } .es-m-p30l { padding-left:30px!important } .es-m-p35 { padding:35px!important } .es-m-p35t { padding-top:35px!important } .es-m-p35b { padding-bottom:35px!important } .es-m-p35r { padding-right:35px!important } .es-m-p35l { padding-left:35px!important } .es-m-p40 { padding:40px!important } .es-m-p40t { padding-top:40px!important } .es-m-p40b { padding-bottom:40px!important } .es-m-p40r { padding-right:40px!important } .es-m-p40l { padding-left:40px!important } }
  </style> 
  </head> 
  <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
    <div class="es-wrapper-color" style="background-color:#FAFAFA"><!--[if gte mso 9]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
          <v:fill type="tile" color="#fafafa"></v:fill>
        </v:background>
      <![endif]--> 
    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FAFAFA"> 
      <tr> 
        <td valign="top" style="padding:0;Margin:0"> 
        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
          <tr> 
            <td align="center" style="padding:0;Margin:0"> 
            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
              <tr> 
                <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px"> 
                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                  <tr> 
                    <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                      <tr> 
                        <td align="left" style="padding:0;Margin:0; display: flex; justify-content: space-between">
                          <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:-apple-system, blinkmacsystemfont, 'segoe ui', roboto, helvetica, arial, sans-serif, 'apple color emoji', 'segoe ui emoji', 'segoe ui symbol';line-height:24px;color:#174AE7;font-size:16px;">
                            <strong>Welcome To MyManager</strong></p> <img src="https://me.mymanager.com/static/media/logo.01654d61.svg" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;margin-left: 5px; width: 150px"></td> 
                      </tr> 
                    </table></td> 
                  </tr> 
                </table></td> 
              </tr> 
              <tr> 
                <td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px"> 
                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                  <tr> 
                    <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                      <tr> 
                        <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;padding-bottom:10px"><h1 style="Margin:0;line-height:46px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:bold;color:#333333">Hi ${data.name}</h1></td> 
                      </tr> 
                      <tr> 
                        <td align="center" class="es-m-p0r es-m-p0l" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:16px">You are invited to ${data.orgName}</p></td> 
                      </tr> 
                      <tr> 
                        <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;"><p style="Margin:0;line-height:20px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;font-style:normal;color:#333333">Message: ${data.message}</h></td> 
                      </tr> 

                  <tr> 
                        <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;"><p style="Margin:0;line-height:20px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;font-style:normal;color:#333333">Please click bellow link to join the organization</h></td> 
                      </tr>
                      <tr> 
                        <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><span class="es-button-border" style="border-style:solid;border-color:#174AE7;background:#174AE7;border-width:0px;display:inline-block;border-radius:6px;width:auto"><a class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:20px;border-style:solid;border-color:#174AE7;border-width:10px 30px 10px 30px;display:inline-block;background:#174AE7;border-radius:6px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:24px;width:auto;text-align:center;border-left-width:30px;border-right-width:30px" href=${data.url}>Join Now</a></span></td> 
                      </tr> 
                      <tr> 
                        <td align="center" class="es-m-p0r es-m-p0l" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Once Invite, this email will be uniquely associated with your account.</p></td> 
                      </tr> 
                    </table></td> 
                  </tr> 
                </table></td> 
              </tr> 
            </table></td> 
          </tr> 
        </table> 
        <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"> 
          <tr> 
            <td align="center" style="padding:0;Margin:0"> 
            <table class="es-footer-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:640px"> 
              <tr> 
                <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px"> 
                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                  <tr> 
                    <td align="left" style="padding:0;Margin:0;width:600px"> 
                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                      <tr> 
                        <td align="center" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px;font-size:0"> 
                        <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                          <tr> 
                            <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><img title="Facebook" src="https://jhclqt.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                            <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><img title="Twitter" src="https://jhclqt.stripocdn.email/content/assets/img/social-icons/logo-black/twitter-logo-black.png" alt="Tw" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                            <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><img title="Instagram" src="https://jhclqt.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                            <td align="center" valign="top" style="padding:0;Margin:0"><img title="Youtube" src="https://jhclqt.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Yt" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                          </tr> 
                        </table></td> 
                      </tr> 
                      <tr> 
                        <td align="center" style="padding:0;Margin:0;padding-bottom:35px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;color:#333333;font-size:12px">mymanager © 2022&nbsp;All Rights Reserved.<br></p></td> 
                      </tr> 
                    </table></td> 
                  </tr> 
                </table></td> 
              </tr> 
            </table></td> 
          </tr> 
        </table> 
        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
          <tr> 
            <td class="es-info-area" align="center" style="padding:0;Margin:0"> 
            <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" bgcolor="#FFFFFF"> 
              <tr> 
                <td align="left" style="padding:20px;Margin:0"> 
                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                  <tr> 
                    <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                      <tr> 
                        <td align="center" class="es-infoblock" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px"><a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px"></a>No longer want to receive these emails?&nbsp;<a href="" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px">Unsubscribe</a>.<a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px"></a></p></td> 
                      </tr> 
                    </table></td> 
                  </tr> 
                </table></td> 
              </tr> 
            </table></td> 
          </tr> 
        </table></td> 
      </tr> 
    </table> 
    </div>  
  </body>
  </html>
  `;
};

exports.invitationEmailTemplate = (link) => {
  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="font-family:arial, 'helvetica neue', helvetica, sans-serif"> 
  <head> 
    <meta charset="UTF-8"> 
    <meta content="width=device-width, initial-scale=1" name="viewport"> 
    <meta name="x-apple-disable-message-reformatting"> 
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
    <meta content="telephone=no" name="format-detection"> 
    <title>New message</title><!--[if (mso 16)]>
      <style type="text/css">
      a {text-decoration: none;}
      </style>
      <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
  <xml>
      <o:OfficeDocumentSettings>
      <o:AllowPNG></o:AllowPNG>
      <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
  </xml>
  <![endif]--> 
    <style type="text/css">
  #outlook a {
    padding:0;
  }
  .es-button {
    mso-style-priority:100!important;
    text-decoration:none!important;
  }
  a[x-apple-data-detectors] {
    color:inherit!important;
    text-decoration:none!important;
    font-size:inherit!important;
    font-family:inherit!important;
    font-weight:inherit!important;
    line-height:inherit!important;
  }
  .es-desk-hidden {
    display:none;
    float:left;
    overflow:hidden;
    width:0;
    max-height:0;
    line-height:0;
    mso-hide:all;
  }
  [data-ogsb] .es-button {
    border-width:0!important;
    padding:10px 30px 10px 30px!important;
  }
  @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120% } h1 { font-size:36px!important; text-align:left } h2 { font-size:26px!important; text-align:left } h3 { font-size:20px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:36px!important; text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important; text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important; text-align:left } .es-menu td a { font-size:12px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:20px!important; display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0!important } .es-m-p0r { padding-right:0!important } .es-m-p0l { padding-left:0!important } .es-m-p0t { padding-top:0!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-m-p5 { padding:5px!important } .es-m-p5t { padding-top:5px!important } .es-m-p5b { padding-bottom:5px!important } .es-m-p5r { padding-right:5px!important } .es-m-p5l { padding-left:5px!important } .es-m-p10 { padding:10px!important } .es-m-p10t { padding-top:10px!important } .es-m-p10b { padding-bottom:10px!important } .es-m-p10r { padding-right:10px!important } .es-m-p10l { padding-left:10px!important } .es-m-p15 { padding:15px!important } .es-m-p15t { padding-top:15px!important } .es-m-p15b { padding-bottom:15px!important } .es-m-p15r { padding-right:15px!important } .es-m-p15l { padding-left:15px!important } .es-m-p20 { padding:20px!important } .es-m-p20t { padding-top:20px!important } .es-m-p20r { padding-right:20px!important } .es-m-p20l { padding-left:20px!important } .es-m-p25 { padding:25px!important } .es-m-p25t { padding-top:25px!important } .es-m-p25b { padding-bottom:25px!important } .es-m-p25r { padding-right:25px!important } .es-m-p25l { padding-left:25px!important } .es-m-p30 { padding:30px!important } .es-m-p30t { padding-top:30px!important } .es-m-p30b { padding-bottom:30px!important } .es-m-p30r { padding-right:30px!important } .es-m-p30l { padding-left:30px!important } .es-m-p35 { padding:35px!important } .es-m-p35t { padding-top:35px!important } .es-m-p35b { padding-bottom:35px!important } .es-m-p35r { padding-right:35px!important } .es-m-p35l { padding-left:35px!important } .es-m-p40 { padding:40px!important } .es-m-p40t { padding-top:40px!important } .es-m-p40b { padding-bottom:40px!important } .es-m-p40r { padding-right:40px!important } .es-m-p40l { padding-left:40px!important } }
  </style> 
  </head> 
  <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
    <div class="es-wrapper-color" style="background-color:#FAFAFA"><!--[if gte mso 9]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
          <v:fill type="tile" color="#fafafa"></v:fill>
        </v:background>
      <![endif]--> 
    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FAFAFA"> 
      <tr> 
        <td valign="top" style="padding:0;Margin:0"> 
        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
          <tr> 
            <td align="center" style="padding:0;Margin:0"> 
            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
              <tr> 
                <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px"> 
                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                  <tr> 
                    <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                      <tr> 
                        <td align="left" style="padding:0;Margin:0; display: flex; justify-content: space-between">
                          <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:-apple-system, blinkmacsystemfont, 'segoe ui', roboto, helvetica, arial, sans-serif, 'apple color emoji', 'segoe ui emoji', 'segoe ui symbol';line-height:24px;color:#174AE7;font-size:16px;">
                            <strong>Welcome To MyManager</strong></p> <img src="https://me.mymanager.com/static/media/logo.01654d61.svg" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;margin-left: 5px; width: 150px"></td> 
                      </tr> 
                    </table></td> 
                  </tr> 
                </table></td> 
              </tr> 
              <tr> 
                <td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px"> 
                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                  <tr> 
                    <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                      <tr> 
                        <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px;font-size:0px"><img src="https://jhclqt.stripocdn.email/content/guids/CABINET_67e080d830d87c17802bd9b4fe1c0912/images/55191618237638326.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="100"></td> 
                      </tr> 
                      <tr> 
                        <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;padding-bottom:10px"><h1 style="Margin:0;line-height:46px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:46px;font-style:normal;font-weight:bold;color:#333333">Reply To Event</h1></td> 
                      </tr> 
                      <tr> 
                        <td align="center" class="es-m-p0r es-m-p0l" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">You’ve received this message because you are invited to our event. Please use the link bellow and confirm your decision whether to go or not.</p></td> 
                      </tr> 
                      <tr> 
                        <td align="center" style="padding:0;Margin:0;padding-bottom:5px;padding-top:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">If you did not register with us, please disregard this email.</p></td> 
                      </tr> 
                      <tr>   
                        <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><span class="es-button-border" style="border-style:solid;border-color:#174AE7;background:#174AE7;border-width:0px;display: -webkit-box;-webkit-box-orient:vertical;overflow:hidden;-webkit-line-clamp:1;border-radius:6px;width:80%;padding:10px"><a href="event/${link}" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:15px; max-width: 200px; border-style:solid;border-color:#174AE7;border-width:10px 30px 10px 30px;background:#174AE7;border-radius:6px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:24px;text-align:center;border-left-width:30px;border-right-width:30px">Join Now</a></span></td> 
                      </tr> 
                      <tr> 
                        <td align="center" class="es-m-p0r es-m-p0l" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Once reply, your decision will be reported to this event manager.</p></td> 
                      </tr> 
                    </table></td> 
                  </tr> 
                </table></td> 
              </tr> 
            </table></td> 
          </tr> 
        </table> 
        <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"> 
          <tr> 
            <td align="center" style="padding:0;Margin:0"> 
            <table class="es-footer-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:640px"> 
              <tr> 
                <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px"> 
                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                  <tr> 
                    <td align="left" style="padding:0;Margin:0;width:600px"> 
                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                      <tr> 
                        <td align="center" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px;font-size:0"> 
                        <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                          <tr> 
                            <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><img title="Facebook" src="https://jhclqt.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                            <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><img title="Twitter" src="https://jhclqt.stripocdn.email/content/assets/img/social-icons/logo-black/twitter-logo-black.png" alt="Tw" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                            <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><img title="Instagram" src="https://jhclqt.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                            <td align="center" valign="top" style="padding:0;Margin:0"><img title="Youtube" src="https://jhclqt.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Yt" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                          </tr> 
                        </table></td> 
                      </tr> 
                      <tr> 
                        <td align="center" style="padding:0;Margin:0;padding-bottom:35px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;color:#333333;font-size:12px">mymanager © 2022&nbsp;All Rights Reserved.<br></p></td> 
                      </tr> 
                    </table></td> 
                  </tr> 
                </table></td> 
              </tr> 
            </table></td> 
          </tr> 
        </table> 
        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
          <tr> 
            <td class="es-info-area" align="center" style="padding:0;Margin:0"> 
            <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" bgcolor="#FFFFFF"> 
              <tr> 
                <td align="left" style="padding:20px;Margin:0"> 
                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                  <tr> 
                    <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                      <tr> 
                        <td align="center" class="es-infoblock" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px"><a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px"></a>No longer want to receive these emails?&nbsp;<a href="" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px">Unsubscribe</a>.<a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px"></a></p></td> 
                      </tr> 
                    </table></td> 
                  </tr> 
                </table></td> 
              </tr> 
            </table></td> 
          </tr> 
        </table></td> 
      </tr> 
    </table> 
    </div>  
  </body>
  </html>
  `;
};

exports.shareEmailTemplate = (name, taskName, boardName, workspaceName, link) => {
  return ` 
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  style="font-family: arial, 'helvetica neue', helvetica, sans-serif"
>
  <head>
    <meta charset="UTF-8" />
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta content="telephone=no" name="format-detection" />
    <title>New message</title>
    <!--[if (mso 16)]>
      <style type="text/css">
        a {
          text-decoration: none;
        }
      </style>
    <![endif]-->
    <!--[if gte mso 9
      ]><style>
        sup {
          font-size: 100% !important;
        }
      </style><!
    [endif]-->
    <!--[if gte mso 9]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG></o:AllowPNG>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
    <style type="text/css">
      #outlook a {
        padding: 0;
      }
      .es-button {
        mso-style-priority: 100 !important;
        text-decoration: none !important;
      }
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }
      .es-desk-hidden {
        display: none;
        float: left;
        overflow: hidden;
        width: 0;
        max-height: 0;
        line-height: 0;
        mso-hide: all;
      }
      [data-ogsb] .es-button {
        border-width: 0 !important;
        padding: 10px 30px 10px 30px !important;
      }
      @media only screen and (max-width: 600px) {
        p,
        ul li,
        ol li,
        a {
          line-height: 150% !important;
        }
        h1,
        h2,
        h3,
        h1 a,
        h2 a,
        h3 a {
          line-height: 120%;
        }
        h1 {
          font-size: 36px !important;
          text-align: left;
        }
        h2 {
          font-size: 26px !important;
          text-align: left;
        }
        h3 {
          font-size: 20px !important;
          text-align: left;
        }
        .es-header-body h1 a,
        .es-content-body h1 a,
        .es-footer-body h1 a {
          font-size: 36px !important;
          text-align: left;
        }
        .es-header-body h2 a,
        .es-content-body h2 a,
        .es-footer-body h2 a {
          font-size: 26px !important;
          text-align: left;
        }
        .es-header-body h3 a,
        .es-content-body h3 a,
        .es-footer-body h3 a {
          font-size: 20px !important;
          text-align: left;
        }
        .es-menu td a {
          font-size: 12px !important;
        }
        .es-header-body p,
        .es-header-body ul li,
        .es-header-body ol li,
        .es-header-body a {
          font-size: 14px !important;
        }
        .es-content-body p,
        .es-content-body ul li,
        .es-content-body ol li,
        .es-content-body a {
          font-size: 16px !important;
        }
        .es-footer-body p,
        .es-footer-body ul li,
        .es-footer-body ol li,
        .es-footer-body a {
          font-size: 14px !important;
        }
        .es-infoblock p,
        .es-infoblock ul li,
        .es-infoblock ol li,
        .es-infoblock a {
          font-size: 12px !important;
        }
        *[class="gmail-fix"] {
          display: none !important;
        }
        .es-m-txt-c,
        .es-m-txt-c h1,
        .es-m-txt-c h2,
        .es-m-txt-c h3 {
          text-align: center !important;
        }
        .es-m-txt-r,
        .es-m-txt-r h1,
        .es-m-txt-r h2,
        .es-m-txt-r h3 {
          text-align: right !important;
        }
        .es-m-txt-l,
        .es-m-txt-l h1,
        .es-m-txt-l h2,
        .es-m-txt-l h3 {
          text-align: left !important;
        }
        .es-m-txt-r img,
        .es-m-txt-c img,
        .es-m-txt-l img {
          display: inline !important;
        }
        .es-button-border {
          display: inline-block !important;
        }
        a.es-button,
        button.es-button {
          font-size: 20px !important;
          display: inline-block !important;
        }
        .es-adaptive table,
        .es-left,
        .es-right {
          width: 100% !important;
        }
        .es-content table,
        .es-header table,
        .es-footer table,
        .es-content,
        .es-footer,
        .es-header {
          width: 100% !important;
          max-width: 600px !important;
        }
        .es-adapt-td {
          display: block !important;
          width: 100% !important;
        }
        .adapt-img {
          width: 100% !important;
          height: auto !important;
        }
        .es-m-p0 {
          padding: 0 !important;
        }
        .es-m-p0r {
          padding-right: 0 !important;
        }
        .es-m-p0l {
          padding-left: 0 !important;
        }
        .es-m-p0t {
          padding-top: 0 !important;
        }
        .es-m-p0b {
          padding-bottom: 0 !important;
        }
        .es-m-p20b {
          padding-bottom: 20px !important;
        }
        .es-mobile-hidden,
        .es-hidden {
          display: none !important;
        }
        tr.es-desk-hidden,
        td.es-desk-hidden,
        table.es-desk-hidden {
          width: auto !important;
          overflow: visible !important;
          float: none !important;
          max-height: inherit !important;
          line-height: inherit !important;
        }
        tr.es-desk-hidden {
          display: table-row !important;
        }
        table.es-desk-hidden {
          display: table !important;
        }
        td.es-desk-menu-hidden {
          display: table-cell !important;
        }
        .es-menu td {
          width: 1% !important;
        }
        table.es-table-not-adapt,
        .esd-block-html table {
          width: auto !important;
        }
        table.es-social {
          display: inline-block !important;
        }
        table.es-social td {
          display: inline-block !important;
        }
        .es-m-p5 {
          padding: 5px !important;
        }
        .es-m-p5t {
          padding-top: 5px !important;
        }
        .es-m-p5b {
          padding-bottom: 5px !important;
        }
        .es-m-p5r {
          padding-right: 5px !important;
        }
        .es-m-p5l {
          padding-left: 5px !important;
        }
        .es-m-p10 {
          padding: 10px !important;
        }
        .es-m-p10t {
          padding-top: 10px !important;
        }
        .es-m-p10b {
          padding-bottom: 10px !important;
        }
        .es-m-p10r {
          padding-right: 10px !important;
        }
        .es-m-p10l {
          padding-left: 10px !important;
        }
        .es-m-p15 {
          padding: 15px !important;
        }
        .es-m-p15t {
          padding-top: 15px !important;
        }
        .es-m-p15b {
          padding-bottom: 15px !important;
        }
        .es-m-p15r {
          padding-right: 15px !important;
        }
        .es-m-p15l {
          padding-left: 15px !important;
        }
        .es-m-p20 {
          padding: 20px !important;
        }
        .es-m-p20t {
          padding-top: 20px !important;
        }
        .es-m-p20r {
          padding-right: 20px !important;
        }
        .es-m-p20l {
          padding-left: 20px !important;
        }
        .es-m-p25 {
          padding: 25px !important;
        }
        .es-m-p25t {
          padding-top: 25px !important;
        }
        .es-m-p25b {
          padding-bottom: 25px !important;
        }
        .es-m-p25r {
          padding-right: 25px !important;
        }
        .es-m-p25l {
          padding-left: 25px !important;
        }
        .es-m-p30 {
          padding: 30px !important;
        }
        .es-m-p30t {
          padding-top: 30px !important;
        }
        .es-m-p30b {
          padding-bottom: 30px !important;
        }
        .es-m-p30r {
          padding-right: 30px !important;
        }
        .es-m-p30l {
          padding-left: 30px !important;
        }
        .es-m-p35 {
          padding: 35px !important;
        }
        .es-m-p35t {
          padding-top: 35px !important;
        }
        .es-m-p35b {
          padding-bottom: 35px !important;
        }
        .es-m-p35r {
          padding-right: 35px !important;
        }
        .es-m-p35l {
          padding-left: 35px !important;
        }
        .es-m-p40 {
          padding: 40px !important;
        }
        .es-m-p40t {
          padding-top: 40px !important;
        }
        .es-m-p40b {
          padding-bottom: 40px !important;
        }
        .es-m-p40r {
          padding-right: 40px !important;
        }
        .es-m-p40l {
          padding-left: 40px !important;
        }
      }
    </style>
  </head>
  <body
    style="
      width: 100%;
      font-family: arial, 'helvetica neue', helvetica, sans-serif;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      padding: 0;
      margin: 0;
    "
  >
    <div class="es-wrapper-color" style="background-color: #fafafa">
      <!--[if gte mso 9]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
          <v:fill type="tile" color="#fafafa"></v:fill>
        </v:background>
      <![endif]-->
      <table
        class="es-wrapper"
        width="100%"
        cellspacing="0"
        cellpadding="0"
        style="
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          border-collapse: collapse;
          border-spacing: 0px;
          padding: 0;
          margin: 0;
          width: 100%;
          height: 100%;
          background-repeat: repeat;
          background-position: center top;
          background-color: #fafafa;
        "
      >
        <tr>
          <td valign="top" style="padding: 0; margin: 0">
            <table
              cellpadding="0"
              cellspacing="0"
              class="es-content"
              align="center"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                table-layout: fixed !important;
                width: 100%;
              "
            >
              <tr>
                <td align="center" style="padding: 0; margin: 0">
                  <table
                    bgcolor="#ffffff"
                    class="es-content-body"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: #ffffff;
                      width: 600px;
                    "
                  >
                    <tr>
                      <td
                        align="left"
                        style="
                          padding: 0;
                          margin: 0;
                          padding-top: 20px;
                          padding-left: 20px;
                          padding-right: 20px;
                        "
                      >
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              align="center"
                              valign="top"
                              style="padding: 0; margin: 0; width: 560px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      display: flex;
                                      justify-content: space-between;
                                    "
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        -webkit-text-size-adjust: none;
                                        -ms-text-size-adjust: none;
                                        mso-line-height-rule: exactly;
                                        font-family: -apple-system,
                                          blinkmacsystemfont, 'segoe ui', roboto,
                                          helvetica, arial, sans-serif,
                                          'apple color emoji', 'segoe ui emoji',
                                          'segoe ui symbol';
                                        line-height: 24px;
                                        color: #174ae7;
                                        font-size: 16px;
                                      "
                                    >
                                      <strong>Welcome To MyManager</strong>
                                    </p>
                                    <img
                                      src="https://me.mymanager.com/static/media/logo.01654d61.svg"
                                      alt
                                      style="
                                        display: block;
                                        border: 0;
                                        outline: none;
                                        text-decoration: none;
                                        -ms-interpolation-mode: bicubic;
                                        margin-left: 5px;
                                        width: 150px;
                                      "
                                    />
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td
                        align="left"
                        style="
                          margin: 0;
                          padding-left: 20px;
                          padding-right: 20px;
                          padding-top: 30px;
                          padding-bottom: 10px;
                        "
                      >
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              align="center"
                              valign="top"
                              style="padding: 0; margin: 0; width: 560px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-top: 10px;
                                      padding-bottom: 10px;
                                      font-size: 0px;
                                    "
                                  >
                                    <img
                                      src="https://jhclqt.stripocdn.email/content/guids/CABINET_67e080d830d87c17802bd9b4fe1c0912/images/55191618237638326.png"
                                      alt
                                      style="
                                        display: block;
                                        border: 0;
                                        outline: none;
                                        text-decoration: none;
                                        -ms-interpolation-mode: bicubic;
                                      "
                                      width="100"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="center"
                                    class="es-m-txt-c"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-bottom: 10px;
                                    "
                                  >
                                    <h1
                                      style="
                                        margin: 0;
                                        line-height: 46px;
                                        mso-line-height-rule: exactly;
                                        font-family: arial, 'helvetica neue',
                                          helvetica, sans-serif;
                                        font-size: 25px;
                                        font-style: normal;
                                        font-weight: bold;
                                        color: #333333;
                                      "
                                    >
                                      ${name} assigned you to an item
                                    </h1>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="center"
                                    class="es-m-p0r es-m-p0l"
                                    style="
                                      margin: 0;
                                      padding-top: 5px;
                                      padding-bottom: 5px;
                                      padding-left: 40px;
                                      padding-right: 40px;
                                    "
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        -webkit-text-size-adjust: none;
                                        -ms-text-size-adjust: none;
                                        mso-line-height-rule: exactly;
                                        font-family: arial, 'helvetica neue',
                                          helvetica, sans-serif;
                                        line-height: 21px;
                                        color: #333333;
                                        font-size: 14px;
                                      "
                                    >
                                      ${name} assigned you to do task ${taskName}.<br />
                                      This task(item) is located on ${boardName} Board of ${workspaceName}
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" style="padding-top: 20px">
                                    <span
                                      class="es-button-border"
                                      style="
                                        border-style: solid;
                                        border-color: #174ae7;
                                        background: #174ae7;
                                        border-width: 0px;
                                        display: -webkit-box;
                                        -webkit-box-orient: vertical;
                                        overflow: hidden;
                                        -webkit-line-clamp: 1;
                                        border-radius: 6px;
                                        width: 80%;
                                        padding: 10px;
                                      "
                                      ><a
                                        href=${link}
                                        class="es-button"
                                        target="_blank"
                                        style="
                                          mso-style-priority: 100 !important;
                                          text-decoration: none;
                                          -webkit-text-size-adjust: none;
                                          -ms-text-size-adjust: none;
                                          mso-line-height-rule: exactly;
                                          color: #ffffff;
                                          font-size: 15px;
                                          max-width: 200px;
                                          border-style: solid;
                                          border-color: #174ae7;
                                          border-width: 10px 30px 10px 30px;
                                          background: #174ae7;
                                          border-radius: 6px;
                                          font-family: arial, 'helvetica neue',
                                            helvetica, sans-serif;
                                          font-weight: normal;
                                          font-style: normal;
                                          line-height: 24px;
                                          text-align: center;
                                          border-left-width: 30px;
                                          border-right-width: 30px;
                                        "
                                        >See Task</a
                                      ></span
                                    >
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              cellpadding="0"
              cellspacing="0"
              class="es-footer"
              align="center"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                table-layout: fixed !important;
                width: 100%;
                background-color: transparent;
                background-repeat: repeat;
                background-position: center top;
              "
            >
              <tr>
                <td align="center" style="padding: 0; margin: 0">
                  <table
                    class="es-footer-body"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: transparent;
                      width: 640px;
                    "
                  >
                    <tr>
                      <td
                        align="left"
                        style="
                          margin: 0;
                          padding-top: 20px;
                          padding-bottom: 20px;
                          padding-left: 20px;
                          padding-right: 20px;
                        "
                      >
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              align="left"
                              style="padding: 0; margin: 0; width: 600px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-top: 15px;
                                      padding-bottom: 15px;
                                      font-size: 0;
                                    "
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="es-table-not-adapt es-social"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        <td
                                          align="center"
                                          valign="top"
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            padding-right: 40px;
                                          "
                                        >
                                          <img
                                            title="Facebook"
                                            src="https://jhclqt.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png"
                                            alt="Fb"
                                            width="32"
                                            style="
                                              display: block;
                                              border: 0;
                                              outline: none;
                                              text-decoration: none;
                                              -ms-interpolation-mode: bicubic;
                                            "
                                          />
                                        </td>
                                        <td
                                          align="center"
                                          valign="top"
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            padding-right: 40px;
                                          "
                                        >
                                          <img
                                            title="Twitter"
                                            src="https://jhclqt.stripocdn.email/content/assets/img/social-icons/logo-black/twitter-logo-black.png"
                                            alt="Tw"
                                            width="32"
                                            style="
                                              display: block;
                                              border: 0;
                                              outline: none;
                                              text-decoration: none;
                                              -ms-interpolation-mode: bicubic;
                                            "
                                          />
                                        </td>
                                        <td
                                          align="center"
                                          valign="top"
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            padding-right: 40px;
                                          "
                                        >
                                          <img
                                            title="Instagram"
                                            src="https://jhclqt.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png"
                                            alt="Inst"
                                            width="32"
                                            style="
                                              display: block;
                                              border: 0;
                                              outline: none;
                                              text-decoration: none;
                                              -ms-interpolation-mode: bicubic;
                                            "
                                          />
                                        </td>
                                        <td
                                          align="center"
                                          valign="top"
                                          style="padding: 0; margin: 0"
                                        >
                                          <img
                                            title="Youtube"
                                            src="https://jhclqt.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png"
                                            alt="Yt"
                                            width="32"
                                            style="
                                              display: block;
                                              border: 0;
                                              outline: none;
                                              text-decoration: none;
                                              -ms-interpolation-mode: bicubic;
                                            "
                                          />
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-bottom: 35px;
                                    "
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        -webkit-text-size-adjust: none;
                                        -ms-text-size-adjust: none;
                                        mso-line-height-rule: exactly;
                                        font-family: arial, 'helvetica neue',
                                          helvetica, sans-serif;
                                        line-height: 18px;
                                        color: #333333;
                                        font-size: 12px;
                                      "
                                    >
                                      mymanager © 2022&nbsp;All Rights
                                      Reserved.<br />
                                    </p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <table
              cellpadding="0"
              cellspacing="0"
              class="es-content"
              align="center"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                border-collapse: collapse;
                border-spacing: 0px;
                table-layout: fixed !important;
                width: 100%;
              "
            >
              <tr>
                <td
                  class="es-info-area"
                  align="center"
                  style="padding: 0; margin: 0"
                >
                  <table
                    class="es-content-body"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      background-color: transparent;
                      width: 600px;
                    "
                    bgcolor="#FFFFFF"
                  >
                    <tr>
                      <td align="left" style="padding: 20px; margin: 0">
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                          "
                        >
                          <tr>
                            <td
                              align="center"
                              valign="top"
                              style="padding: 0; margin: 0; width: 560px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                "
                              >
                                <tr>
                                  <td
                                    align="center"
                                    class="es-infoblock"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      line-height: 14px;
                                      font-size: 12px;
                                      color: #cccccc;
                                    "
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        -webkit-text-size-adjust: none;
                                        -ms-text-size-adjust: none;
                                        mso-line-height-rule: exactly;
                                        font-family: arial, 'helvetica neue',
                                          helvetica, sans-serif;
                                        line-height: 14px;
                                        color: #cccccc;
                                        font-size: 12px;
                                      "
                                    >
                                      <a
                                        target="_blank"
                                        href=""
                                        style="
                                          -webkit-text-size-adjust: none;
                                          -ms-text-size-adjust: none;
                                          mso-line-height-rule: exactly;
                                          text-decoration: underline;
                                          color: #cccccc;
                                          font-size: 12px;
                                        "
                                      ></a
                                      >No longer want to receive these
                                      emails?&nbsp;<a
                                        href=""
                                        target="_blank"
                                        style="
                                          -webkit-text-size-adjust: none;
                                          -ms-text-size-adjust: none;
                                          mso-line-height-rule: exactly;
                                          text-decoration: underline;
                                          color: #cccccc;
                                          font-size: 12px;
                                        "
                                        >Unsubscribe</a
                                      >.<a
                                        target="_blank"
                                        href=""
                                        style="
                                          -webkit-text-size-adjust: none;
                                          -ms-text-size-adjust: none;
                                          mso-line-height-rule: exactly;
                                          text-decoration: underline;
                                          color: #cccccc;
                                          font-size: 12px;
                                        "
                                      ></a>
                                    </p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>`;
};

exports.bookingMailTemplate = (bookingType, bookingInfo, user) => {
  return `<html>
<head>
</head>
<body style='background-color: #f5f6fb; font-size: 11px;'>
    
    <div style='width: 80%; max-width: 500px; background-color: white; margin: auto; padding: 20px; margin-top: 20px; margin-bottom: 20px;'>
        <div style='padding:10px; border-bottom: 1px solid #bea1a1;'>
            <span style='color: #b1aeae;'>A new event has been scheduled</span>
        </div>
        <div style='padding: 10px; font-size: 12px;'>
            <p style='color: #1b1a1a;'>
                <b>Event Type</b>
                <br>
                <br>
                ${bookingType.title}
                
            </p>
        </div>
        
        <div style='padding: 10px; font-size: 12px;'>
            <p style='color: #1b1a1a;'>
                <b>Invite</b>
                <br>
                <br>
                ${user.fullName}
                
            </p>
        </div>
        
        <div style='padding: 10px; font-size: 12px;'>
            <p style='color: #1b1a1a;'>
                <b>Invite Email</b>
                <br>
                <br>
                ${user.email}
                
            </p>
        </div>
        
        <div style='padding: 10px; font-size: 12px;'>
            <p style='color: #1b1a1a;'>
                <b>Event Date/Time</b>
                <br>
                <br>
                ${convertDate(bookingInfo.startDate, bookingInfo.timezone)}
                
            </p>
        </div>
        <div style='padding: 10px; border-top: 1px solid #bea1a1;'>
            <a href="http://localhost:3000/book/update/${
              bookingInfo._id
            }">View event in Calendar</a>
        </div>
    </div>
</body>
</html>`;
};

exports.newContactMailTemplate = (fullName, user, newContactId) => {
  return `
<html>
<head>
</head>
<body style='background-color: #f5f6fb; font-size: 11px;'>
    <div
        style='width: 80%; max-width: 500px; background-color: white; margin: auto; padding: 20px; margin-top: 20px; margin-bottom: 20px;'>
        <div style='padding:10px; border-bottom: 1px solid #bea1a1;'>
            <span style='color: black;'>##-Please accept invitation by visiting that url below this line-##</span>
        </div>
        <div style='padding: 10px; font-size: 12px;'>
            <p style='color: #1b1a1a;'>
                Hello ${fullName}
                <br>
                <br>
                <u>${
                  user.fullName ? user.fullName : user.firstName + " " + user.lastName
                }</u> has invited you to their team, in a workspace called
                Mymanager.
                <br>
                <br>
                <span>Just Click: </span>https://mymanager.com/employee/activate/${newContactId}
            </p>
        </div>
        <div style='padding: 10px; border-top: 1px solid #bea1a1;'>
            <div style='color: black; line-height: 1.7;'>This email is a service from Https://mymanager.com</div>
            <div style='color: black;'>Delivered by Mymember</div>
        </div>
    </div>
</body>

</html>`;
};

exports.inviteWorkspaceMailTemplate = (fullName, user, id) => {
  return `<html>
      
<head>

</head>

<body style='background-color: #f5f6fb; font-size: 11px;'>

    <div
        style='width: 80%; max-width: 500px; background-color: white; margin: auto; padding: 20px; margin-top: 20px; margin-bottom: 20px;'>
        <div style='padding:10px; border-bottom: 1px solid #bea1a1;'>
            <span style='color: black;'>##-Please accept invitation by visiting that url below this line-##</span>
        </div>
        <div style='padding: 10px; font-size: 12px;'>
            <p style='color: #1b1a1a;'>
                Hello ${fullName}
                <br>
                <br>
                <u>${
                  user.fullName ? user.fullName : user.firstName + " " + user.lastName
                }</u> has invited you to their team, in a workspace called
                Mymanager.
                <br>
                <br>
                <span>Just Click: </span> https://mymanager.com/employee/activate/${id}
            </p>
        </div>
        <div style='padding: 10px; border-top: 1px solid #bea1a1;'>
            <div style='color: black; line-height: 1.7;'>This email is a service from Https://mymanager.com</div>
            <div style='color: black;'>Delivered by Mymember</div>
        </div>
    </div>
</body>

</html>`;
};

exports.memberInviteMailTemplate = (fullName, user, id) => {
  return `<html>
      
<head>

</head>

<body style='background-color: #f5f6fb; font-size: 11px;'>

    <div
        style='width: 80%; max-width: 500px; background-color: white; margin: auto; padding: 20px; margin-top: 20px; margin-bottom: 20px;'>
        <div style='padding:10px; border-bottom: 1px solid #bea1a1;'>
            <span style='color: black;'>##-Please accept invitation by visiting that url below this line-##</span>
        </div>
        <div style='padding: 10px; font-size: 12px;'>
            <p style='color: #1b1a1a;'>
                Hello ${fullName}
                <br>
                <br>
                <u>${
                  user.fullName ? user.fullName : user.firstName + " " + user.lastName
                }</u> has invited you to their team, in a workspace called
                Mymanager.
                <br>
                <br>
                <span>Just Click: </span> https://mymanager.com/member/activate/${id}
            </p>
        </div>
        <div style='padding: 10px; border-top: 1px solid #bea1a1;'>
            <div style='color: black; line-height: 1.7;'>This email is a service from Https://mymanager.com</div>
            <div style='color: black;'>Delivered by Mymember</div>
        </div>
    </div>
</body>

</html>`;
};

exports.liveChatMailTemplate = (user, code) => {
  return `<html>
                
<head>

</head>

<body style='background-color: #f5f6fb; font-size: 11px;'>

    <div
        style='width: 80%; max-width: 500px; background-color: white; margin: auto; padding: 20px; margin-top: 20px; margin-bottom: 20px;'>
        <div style='padding:10px; border-bottom: 1px solid #bea1a1;'>
            <span style='color: black;'>##-Please accept invitation by visiting that url below this line-##</span>
        </div>
        <div style='padding: 10px; font-size: 12px;'>
        <h5>${user.fullName + " " + user.lastName} send you this code for Live chat widget.</h5>
            <p style='color: #1b1a1a;'> 
                Code is : ${code}
                <br>
                <br>  
            </p>
        </div>
        <div style='padding: 10px; border-top: 1px solid #bea1a1;'>
            <div style='color: black; line-height: 1.7;'>This email is a service from Https://mymanager.com</div>
            <div style='color: black;'>Delivered by Mymember</div>
        </div>
    </div>
</body>

</html>`;
};

exports.ticketMailTemplate = (reqName, msg) => {
  return `<html>
  <head>

  </head>
  <body style='background-color: #f5f6fb; font-size: 11px;'>
      
      <div style='width: 80%; max-width: 500px; background-color: white; margin: auto; padding: 20px; margin-top: 20px; margin-bottom: 20px;'>
          <div style='padding:10px; border-bottom: 1px solid #bea1a1;'>
              <span style='color: #b1aeae;'>##-Please type your reply above this line-##</span>
          </div>
          <div style='padding: 10px; font-size: 12px;'>
              <p style='color: #1b1a1a;'>
                  Hello ${reqName}
                  <br>
                  <br>
                  ${msg}
              </p>
          </div>
          <div style='padding: 10px; border-top: 1px solid #bea1a1;'>
              <div style='color: #b1aeae; line-height: 1.7;'>This email is a service from BBQGuys Sales</div>
              <div style='color: #b1aeae;'>Deliverd by Mymember</div>
          </div>
      </div>
  </body>
</html>`;
};
