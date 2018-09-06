// const nodemailer = require('nodemailer');
// const mandrillTransport = require('nodemailer-mandrill-transport');
// const bcrypt = require('bcrypt-nodejs');

// // Registration url link.

// // const hashToken = bcrypt.hashSync(req.body.email);
// // const registrationUrl = `https://${req.body.hostName}/verify/${hashToken}`;


// /*
// * Configuring mandrill transport.
// * Copy your API key here.
// */

// const transporter = nodemailer.createTransport(mandrillTransport({
//   auth: {
//     apiKey: 'XBtjqQ-iREAZWkmBXc00Mg',
//   },
// }));



// const sendMail = (email, url) => {
//   const mailOptions = {
//     from: 'Fantom',
//     to: email,
//     subject: 'Fantom: Verify your email',
//     html: `
//         <table width="100%" bgcolor="#ffffff" border="0" cellpadding="10" cellspacing="0" style="
//             background:  #f3f3f3;
//         ">
//         <tbody><tr>
//           <td>
//             <!--[if (gte mso 9)|(IE)]>
//               <table width="600" align="center" cellpadding="0" cellspacing="0" border="0">
//                 <tr>
//                   <td>
//             <![endif]-->
//             <table bgcolor="#ffffff" class="content" align="center" cellpadding="0" cellspacing="0" border="0">
//               <tbody><tr>
//                 <td align="center" valign="top">
//                     <!-- BEGIN BODY // -->
//                     <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateContainer">
//                       <tbody><tr>
//                         <td valign="top" mc:edit="body_content" style="
//                         color: #505050;
//                         font-family: Helvetica;
//                         font-size: 14px;
//                         line-height: 150%;
//                         padding-top: 3.143em;
//                         padding-right: 3.5em;
//                         padding-left: 3.5em;
//                         padding-bottom: 3.143em;
//                         text-align: left;
//                         ">
//                           <p>Hi</p>
//                           <p>Welcome to Fantom</p>
//                           <p>Please click on the button below to verify your email.</p>
//                           <a href="${url}" style="
//                           background: #5098ea;
//                           display: inline-block;
//                           color: #FFFFFF;
//                           border-top: 10px solid #5098ea;
//                           border-bottom: 10px solid #5098ea;
//                           border-left: 20px solid #5098ea;
//                           border-right: 20px solid #5098ea;
//                           text-decoration: none;
//                           font-size: 14px;
//                           margin-top: 1.0em;
//                           border-radius: 3px 3px 3px 3px;
//                           background-clip: padding-box;
//                           "><strong>Verify</strong></a>
//                         </td>
//                       </tr>
//                     </tbody></table>
//                     <!-- // END BODY -->
//                   </td>
//               </tr>
        
//             </tbody></table>
//             <!--[if (gte mso 9)|(IE)]>
//                   </td>
//                 </tr>
//             </table>
//             <![endif]-->
//             </td>
//           </tr>
//         </tbody></table>`,
//   };
//   // Sending email.
//   smtpTransport.sendMail(mailOptions, (err, info) => {
//     if (err) {
//       return // console.log(err);
//     }
//     // console.log(info, 'Message sent:');
//   });
// };
// const successMail = (email, name) => {
//   const mailOptions = {
//     from: 'Fantom',
//     to: email,
//     subject: 'Fantom: Thank you for Registration',
//     html: `
//         <table width="100%" bgcolor="#ffffff" border="0" cellpadding="10" cellspacing="0" style="
//             background:  #f3f3f3;
//         ">
//         <tbody><tr>
//           <td>
//             <!--[if (gte mso 9)|(IE)]>
//               <table width="600" align="center" cellpadding="0" cellspacing="0" border="0">
//                 <tr>
//                   <td>
//             <![endif]-->
//             <table bgcolor="#ffffff" class="content" align="center" cellpadding="0" cellspacing="0" border="0">
//               <tbody><tr>
//                 <td align="center" valign="top">
//                     <!-- BEGIN BODY // -->
//                     <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateContainer">
//                       <tbody><tr>
//                         <td valign="top" mc:edit="body_content" style="
//                         color: #505050;
//                         font-family: Helvetica;
//                         font-size: 14px;
//                         line-height: 150%;
//                         padding-top: 3.143em;
//                         padding-right: 3.5em;
//                         padding-left: 3.5em;
//                         padding-bottom: 3.143em;
//                         text-align: left;
//                         ">
//                           <p></p>
//                           <p>Hi ${name}</p>
//                           <p>Thank you for registering your interest. We will be in touch shortly.</p>
//                         </td>
//                       </tr>
//                     </tbody></table>
//                     <!-- // END BODY -->
//                   </td>
//               </tr>
        
//             </tbody></table>
//             <!--[if (gte mso 9)|(IE)]>
//                   </td>
//                 </tr>
//             </table>
//             <![endif]-->
//             </td>
//           </tr>
//         </tbody></table>`,
//   };
//   smtpTransport.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return // console.log(error);
//     }
//     // console.log(info, 'Message sent:');
//   });
// };


// module.exports.sendMail = sendMail;
// module.exports.successMail = successMail;
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: 'kgoyal@innow8apps.com',
    pass: 'Password1',
  },
});

const sendMail = (email, url) => {
  console.log('hihihihih', url);
  const mailOptions = {
    from: 'kgoyal@innow8apps.com',
    to: email,
    subject: 'Fantom: Verify your email',
    html: `
    <div style="min-width: 100%;width: 100%;background-color: #FFFFFF;-webkit-text-size-adjust: none;-ms-text-size-adjust: 100%;margin: 0;padding: 0;position: relative;font-size: 14px;line-height: 21px;" bgcolor="#FFFFFF">
    <div style="max-height:0;height:0;visibility:hidden;display:none;font=
-size:0"></div>
    <center>
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;border-collapse:collapse !important;mso-table-lspace:0pt;mso-table-rspace:0pt;height:100% !important;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;width:100% !important;">
        <tr>
            <td align="center" valign="top" style="border-collapse: collapse;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="container" style="background: #FFFFFF !important;max-width: 480px;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                    <tr>
                        <td align="center" valign="top" class="main_content" style="border-collapse: collapse;font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 'Droid Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                          <!-- Content Start -->

                          <!-- Header -->
                          <table cellspacing="0" cellpadding="0" style="text-align: left !important;background: #FFFFFF !important;max-width: 480px;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-color: #FFFFFF;" align="center" width="100%">
                            <tbody>
                              <tr>
                                <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                                <td height="48" style="font-size: 0;line-height: 0;border-collapse: collapse;">&nbsp;</td>
                                <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                              </tr>
                              <tr>
                                <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                                <td align="left" height="24" valign="top" style="vertical-align: top;text-align: left;border-collapse: collapse;">
                                  <img height="30" width="130" src="https://gallery.mailchimp.com/4b8bd780d4a9c6b85090d2d2d/images/8749d251-43fd-4c72-9f2c-551bd8238fde.png" alt="Fantom" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;border: none;font-size: 14px;font-weight: bold;height: auto;line-height: 100%;text-transform: capitalize;">
                                </td>
                                <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                              </tr>
                              <tr>
                                <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                                <td height="4" style="font-size: 0;line-height: 0;border-collapse: collapse;">&nbsp;</td>
                                <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                              </tr>
                            </tbody>
                          </table>
                        
                          <!-- Hero Text -->
                          <table cellspacing="0" cellpadding="0" style="text-align: left !important;background: #FFFFFF !important;max-width: 480px;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-color: #FFFFFF;" align="center" width="100%">
                            <tbody>
                              <tr>
                                <td height="48" style="font-size: 0;line-height: 0;border-collapse: collapse;">&nbsp;</td>
                              </tr>
                              <tr>
                                <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                                <td style="border-collapse: collapse;">
                                    <h2 style="color: #343434;font-size: 18px;font-weight: 500;line-height: 28px;margin: 0px !important;display: block;font-family: Helvetica, Arial, sans-serif;"><strong>
                                    Welcome ${email}
                                </strong></h2>
                                </td>
                                <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                              </tr>
                              <tr>
                                <td height="24" style="font-size: 0;line-height: 0;border-collapse: collapse;">&nbsp;</td>
                              </tr>
                              <tr>
                                <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                                <td style="border-collapse: collapse;">
                                    <h3 style="text-align: left !important;color: #343434;font-size: 18px;font-weight: 300 !important;line-height: 28px;display: block;margin: 0;font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 'Droid Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                                    We wanted to quickly welcome you to the community. 
                                    <br><br>
                                    Before we get started, we just need to confirm that this is you. Click below to verify your email address:
                                    </h3>
                                </td>
                                <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                              </tr>
                            </tbody>
                          </table>
                          <!-- Call to Action Button -->
                          <table cellspacing="0" cellpadding="0" style="text-align: left !important;background: #FFFFFF !important;max-width: 480px;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-color: #FFFFFF;" align="center" width="100%">
                            <tbody>
                              <tr>
                                <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                                <td height="48" style="font-size: 0;line-height: 0;border-collapse: collapse;">&nbsp;</td>
                                <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                              </tr>
                              <tr>
                                <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                                <td bgcolor="#3B49F5" style="border-radius: 2px;border-collapse: collapse;">
                                  <a href="${url}" style="font-size:16px; font-weight: 500; color:#ffffff; line-height:1.0; letter-spacing:normal; text-decoration:none; padding:18px 24px; display:block;">Verify Email Address <img align="right" width="18" height="14" alt="" src="https://gallery.mailchimp.com/4b8bd780d4a9c6b85090d2d2d/images/25319fe9-479b-445f-b14a-570c1cb1f87b.png" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;border: none;font-size: 14px;font-weight: bold;height: auto;line-height: 100%;text-transform: capitalize;"></a>
                                </td>
                                <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                              </tr>
                            </tbody>
                          </table>
                               <table cellspacing="0" cellpadding="0" style="text-align: left !important;background: #FFFFFF !important;max-width: 480px;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-color: #FFFFFF;" align="center" width="100%">
                            <tbody>
                              <tr>
                                <td height="48" style="font-size: 0;line-height: 0;border-collapse: collapse;">&nbsp;</td>
                              </tr>
                            

                              <tr>
                                <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                                <td style="border-collapse: collapse;">
                                  <h3 style="text-align: left !important;color: #343434;font-size: 18px;font-weight: 300 !important;line-height: 28px;display: block;margin: 0;font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 'Droid Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;">We look forward to having you as part of this journey.<br><br>

The Fantom Team
</h3>
                                </td>
                                <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                              </tr>
                            </tbody>
                          </table>
                          <!-- Line Divider -->
                          <table cellspacing="0" cellpadding="0" style="text-align: left !important;background: #FFFFFF !important;max-width: 480px;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-color: #FFFFFF;" align="center" width="100%">
                            <tbody>
                              <tr>
                                <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                                <td height="48" style="font-size: 0;line-height: 0;border-collapse: collapse;">&nbsp;</td>
                                <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                              </tr>
                              <tr>
                                <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                                <td height="1" bgcolor="#DDDDDD" style="border-collapse: collapse;">
                                </td>
                                <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                              </tr>
                            </tbody>
                          </table>
                         

                          
                        <!-- Footer Icon -->
                        <table cellspacing="0" cellpadding="0" style="text-align: left !important;background: #FFFFFF !important;max-width: 480px;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-color: #FFFFFF;" align="center" width="100%">
                          <tbody>
                            <tr>
                              <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                              <td height="48" style="font-size: 0;line-height: 0;border-collapse: collapse;">&nbsp;</td>
                              <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                            </tr>
                            <tr>
                              <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                              <td height="50" style="font-size: 0;line-height: 0;border-collapse: collapse;">
                                <img height="30" width="130" src="https://gallery.mailchimp.com/4b8bd780d4a9c6b85090d2d2d/images/8749d251-43fd-4c72-9f2c-551bd8238fde.png" alt="Fantom" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;border: none;font-size: 14px;font-weight: bold;height: auto;line-height: 100%;text-transform: capitalize;">
                              </td>
                              <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                            </tr>
                            <tr>
                              <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                              <td height="0" style="font-size: 0;line-height: 0;border-collapse: collapse;">&nbsp;</td>
                              <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                            </tr>
                            <tr>
                              <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                              <td height="1" bgcolor="" style="border-collapse: collapse;">
                                <span style="text-align:left !important; color: #343434; font-size: 16px; font-weight: 300 !important; line-height: 24px;">No limits P2P crypto wagering</span>
                              </td>
                              <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                            </tr>
                          </tbody>
                        </table>
                        <!-- Social Icons -->
                        <table cellspacing="0" cellpadding="0" style="text-align: left !important;background: #FFFFFF !important;max-width: 480px;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-color: #FFFFFF;" align="center" width="100%">
                          <tbody>
                            <tr>
                              <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                              <td colspan="6" height="48" style="font-size: 0;line-height: 0;border-collapse: collapse;">&nbsp;</td>
                              <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                            </tr>
                            <tr>
                              <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                              <td align="left" valign="middle" width="52" style="-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;">
                                <a href="https://twitter.com/Fantomteam" target="_blank" style="-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;color:#000000;display:block;width:100%;">
                                  <img border="0" src="https://gallery.mailchimp.com/4b8bd780d4a9c6b85090d2d2d/images/bd924a36-fba8-4527-b22f-f556f4ddd313.png" width="20" height="17" class="socialImage" alt="Twitter" style="border-width: 0;-ms-interpolation-mode: bicubic;height: auto;outline-style: none;font-size: 14px;font-weight: bold;line-height: 100%;text-decoration: none;text-transform: capitalize;border-style: none;max-width: 24px;margin-top: 0;margin-bottom: 0;margin-right: auto;margin-left: auto;display: inline;outline: none;border: none;margin: 0 auto;">
                                </a>
                              </td>

                              <td align="left" valign="middle" width="52" style="-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;">
                                <a href="https://t.me/Fantomchat" target="_blank" style="-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;color:#000000;display:block;width:100%;">
                                  <img border="0" src="https://gallery.mailchimp.com/4b8bd780d4a9c6b85090d2d2d/images/5427be3d-bb40-415b-94a7-92652d3d14d8.png" width="20" height="17" class="socialImage" alt="Telegram" style="border-width: 0;-ms-interpolation-mode: bicubic;height: auto;outline-style: none;font-size: 14px;font-weight: bold;line-height: 100%;text-decoration: none;text-transform: capitalize;border-style: none;max-width: 24px;margin-top: 0;margin-bottom: 0;margin-right: auto;margin-left: auto;display: inline;outline: none;border: none;margin: 0 auto;">
                                </a>
                              </td>
                              
                              <td class="mobile-hide" style="-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;">&nbsp;</td>
                              <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                            </tr>
                            <tr>
                              <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                              <td colspan="6" height="48" style="font-size: 0;line-height: 0;border-collapse: collapse;">&nbsp;</td>
                              <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                            </tr>
                          </tbody>
                        </table>
                        <!-- Copyright -->
                        <table cellspacing="0" cellpadding="0" style="text-align: left !important;background: #FFFFFF !important;max-width: 480px;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;background-color: #FFFFFF;" align="center" width="100%">
                          <tbody>
                            <tr>
                              <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                              <td height="24" style="font-size: 0;line-height: 0;border-collapse: collapse;">&nbsp;</td>
                              <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                            </tr>
                            <tr>
                              <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                              <td style="font-size: 0;line-height: 0;border-collapse: collapse;">
                                <div style="text-align:left !important; color: #646464; font-size: 12px; font-weight: 300 !important; line-height: 12px;">Copyright 2018, All rights reserved.</div>
                              </td>
                              <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                            </tr>
                            <tr>
                              <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                              <td height="8" style="font-size: 0;line-height: 0;border-collapse: collapse;">&nbsp;</td>
                              <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                            </tr>
                            <tr>
                              <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                              <td style="font-size: 0;line-height: 0;border-collapse: collapse;">
                                <div style="text-align:left !important; color: #646464; font-size: 12px; font-weight: 300 !important; line-height: 12px;">Sent by Fantom | Suite 23 Portland House, Glacis Road Gibraltar</div>
                              </td>
                              <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                            </tr>
                            <tr>
                              <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                              <td height="24" style="font-size: 0;line-height: 0;border-collapse: collapse;">&nbsp;</td>
                              <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                            </tr>
                            <tr>
                              <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                              <td height="24" style="font-size: 0;line-height: 0;border-collapse: collapse;">&nbsp;</td>
                              <td width="24" style="width: 24px;line-height: 0px;font-size: 0px;border-collapse: collapse;">&nbsp;</td>
                            </tr>
                          </tbody>
                        </table>

                      </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    </center>
</div>`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
       console.log(err, 'errrrrr');
    } else {
        console.log(info, `Message sent:`);
    }
    
  });
};
const successMail = (email) => {
  // const mailOptions = {
  //   from: 'akhanna@innow8apps.com',
  //   to: email,
  //   subject: 'Fantom: Thank you for Registration',
  //   html: `
  //       <table width="100%" bgcolor="#ffffff" border="0" cellpadding="10" cellspacing="0" style="
  //           background:  #f3f3f3;
  //       ">
  //       <tbody><tr>
  //         <td>
  //           <!--[if (gte mso 9)|(IE)]>
  //             <table width="600" align="center" cellpadding="0" cellspacing="0" border="0">
  //               <tr>
  //                 <td>
  //           <![endif]-->
  //           <table bgcolor="#ffffff" class="content" align="center" cellpadding="0" cellspacing="0" border="0">
  //             <tbody><tr>
  //               <td align="center" valign="top">
  //                   <!-- BEGIN BODY // -->
  //                   <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateContainer">
  //                     <tbody><tr>
  //                       <td valign="top" mc:edit="body_content" style="
  //                       color: #505050;
  //                       font-family: Helvetica;
  //                       font-size: 14px;
  //                       line-height: 150%;
  //                       padding-top: 3.143em;
  //                       padding-right: 3.5em;
  //                       padding-left: 3.5em;
  //                       padding-bottom: 3.143em;
  //                       text-align: left;
  //                       ">
  //                         <p></p>
  //                         <p>Hi ${name}</p>
  //                         <p>Thank you for registering your interest. We will be in touch shortly.</p>
  //                       </td>
  //                     </tr>
  //                   </tbody></table>
  //                   <!-- // END BODY -->
  //                 </td>
  //             </tr>
        
  //           </tbody></table>
  //           <!--[if (gte mso 9)|(IE)]>
  //                 </td>
  //               </tr>
  //           </table>
  //           <![endif]-->
  //           </td>
  //         </tr>
  //       </tbody></table>`,
  // };
  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     return // console.log(error, 'errrror');
  //   }
  //   // console.log(info, `Message sent:`);
  // });
};


module.exports.sendMail = sendMail;
module.exports.successMail = successMail;
