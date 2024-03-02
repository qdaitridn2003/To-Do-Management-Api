export enum RoleEnum {
  User = 'User',
  Admin = 'Admin',
}

export enum StrategyEnum {
  Local = 'Local',
  Google = 'Google',
  Facebook = 'Facebook',
}

export enum GenderEnum {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export enum ConfirmationEnum {
  Accept = 'Accepted',
  Pending = 'Pending',
  Cancel = 'Cancelled',
}

export enum StatusEnum {
  Todo = 'Todo',
  Progress = 'Progressing',
  Complete = 'Completed',
  Cancel = 'Cancelled',
}

export enum PriorityEnum {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

export const MetaDataKey = {
  AuthService: 'AUTH SERVICE',
  FirebaseAdmin: 'FIREBASE ADMIN',
  FirebaseStore: 'FIREBASE STORE',
  Strategy: 'STRATEGY',
};

export const emailHtml = (otp: string) => `
<html
  xmlns='http://www.w3.org/1999/xhtml'
  xmlns:v='urn:schemas-microsoft-com:vml'
  xmlns:o='urn:schemas-microsoft-com:office:office'
>
  <head>
    <!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
    <meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <meta name='x-apple-disable-message-reformatting' />
    <!--[if !mso]><!--><meta
      http-equiv='X-UA-Compatible'
      content='IE=edge'
    /><!--<![endif]-->
    <title></title>

    <style type='text/css'>
      @media only screen and (min-width: 520px) { .u-row { width: 500px
      !important; } .u-row .u-col { vertical-align: top; } .u-row .u-col-100 {
      width: 500px !important; } } @media (max-width: 520px) { .u-row-container
      { max-width: 100% !important; padding-left: 0px !important; padding-right:
      0px !important; } .u-row .u-col { min-width: 320px !important; max-width:
      100% !important; display: block !important; } .u-row { width: 100%
      !important; } .u-col { width: 100% !important; } .u-col > div { margin: 0
      auto; } } body { margin: 0; padding: 0; } table, tr, td { vertical-align:
      top; border-collapse: collapse; } p { margin: 0; } .ie-container table,
      .mso-container table { table-layout: fixed; } * { line-height: inherit; }
      a[x-apple-data-detectors='true'] { color: inherit !important;
      text-decoration: none !important; } table, td { color: #000000; } #u_body
      a { color: #0000ee; text-decoration: underline; }
    </style>

  </head>

  <body
    class='clean-body u_body'
    style='margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000'
  >
    <!--[if IE]><div class="ie-container"><![endif]-->
    <!--[if mso]><div class="mso-container"><![endif]-->
    <table
      id='u_body'
      style='border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%'
      cellpadding='0'
      cellspacing='0'
    >
      <tbody>
        <tr style='vertical-align: top'>
          <td
            style='word-break: break-word;border-collapse: collapse !important;vertical-align: top'
          >
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->

            <div
              class='u-row-container'
              style='padding: 0px;background-color: transparent'
            >
              <div
                class='u-row'
                style='margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;'
              >
                <div
                  style='border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;'
                >
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->

                  <!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                  <div
                    class='u-col u-col-100'
                    style='max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;'
                  >
                    <div
                      style='height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;'
                    >
                      <!--[if (!mso)&(!IE)]><!--><div
                        style='box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;'
                      ><!--<![endif]-->

                        <table
                          style='font-family:arial,helvetica,sans-serif;'
                          role='presentation'
                          cellpadding='0'
                          cellspacing='0'
                          width='100%'
                          border='0'
                        >
                          <tbody>
                            <tr>
                              <td
                                style='overflow-wrap:break-word;word-break:break-word;padding:16px;font-family:arial,helvetica,sans-serif;'
                                align='left'
                              >

                                <table
                                  width='100%'
                                  cellpadding='0'
                                  cellspacing='0'
                                  border='0'
                                >
                                  <tr>
                                    <td
                                      style='padding-right: 0px;padding-left: 0px;'
                                      align='center'
                                    >

                                      <img
                                        align='center'
                                        border='0'
                                        src='https://assets.unlayer.com/stock-templates/1706175102891-98d589779c4d41628f65746ef21d53e1%20(1).png'
                                        alt=''
                                        title=''
                                        style='outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 200px;'
                                        width='200'
                                      />

                                    </td>
                                  </tr>
                                </table>

                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style='font-family:arial,helvetica,sans-serif;'
                          role='presentation'
                          cellpadding='0'
                          cellspacing='0'
                          width='100%'
                          border='0'
                        >
                          <tbody>
                            <tr>
                              <td
                                style='overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;'
                                align='left'
                              >

                                <!--[if mso]><table width="100%"><tr><td><![endif]-->
                                <h3
                                  style='margin: 0px; color: #34495e; line-height: 140%; text-align: center; word-wrap: break-word; font-size: 24px; font-weight: 400;'
                                ><span><span><strong>Confirm Your Request</strong></span></span></h3>
                                <!--[if mso]></td></tr></table><![endif]-->

                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style='font-family:arial,helvetica,sans-serif;'
                          role='presentation'
                          cellpadding='0'
                          cellspacing='0'
                          width='100%'
                          border='0'
                        >
                          <tbody>
                            <tr>
                              <td
                                style='overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;'
                                align='left'
                              >

                                <div
                                  style='font-size: 14px; color: #34495e; line-height: 140%; text-align: left; word-wrap: break-word;'
                                >
                                  <p style='line-height: 140%;'><strong>Hello
                                      there!</strong></p>
                                </div>

                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style='font-family:arial,helvetica,sans-serif;'
                          role='presentation'
                          cellpadding='0'
                          cellspacing='0'
                          width='100%'
                          border='0'
                        >
                          <tbody>
                            <tr>
                              <td
                                style='overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;'
                                align='left'
                              >

                                <div
                                  style='font-size: 14px; color: #34495e; line-height: 140%; text-align: left; word-wrap: break-word;'
                                >
                                  <p style='line-height: 140%;'>Thank you for
                                    using
                                    <strong>Team Cook
                                      Application</strong><em><strong
                                      >.</strong></em>
                                    Just use this code below to complete your
                                    request.</p>
                                </div>

                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style='font-family:arial,helvetica,sans-serif;'
                          role='presentation'
                          cellpadding='0'
                          cellspacing='0'
                          width='100%'
                          border='0'
                        >
                          <tbody>
                            <tr>
                              <td
                                style='overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;'
                                align='left'
                              >

                                <div
                                  style='font-size: 14px; color: #34495e; line-height: 140%; text-align: center; word-wrap: break-word;'
                                >
                                  <div>
                                    <div>Remember! Never share this code with
                                      anyone, not even if application</div>
                                    <div>ask to you and it expires in few
                                      minutes.</div>
                                  </div>
                                </div>

                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style='font-family:arial,helvetica,sans-serif;'
                          role='presentation'
                          cellpadding='0'
                          cellspacing='0'
                          width='100%'
                          border='0'
                        >
                          <tbody>
                            <tr>
                              <td
                                style='overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;'
                                align='left'
                              >

                                <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
                                <div align='center'>
                                  <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:34px; v-text-anchor:middle; width:312px;" arcsize="12%"  stroke="f" fillcolor="#3aaee0"><w:anchorlock/><center style="color:#FFFFFF;"><![endif]-->
                                  <a
                                    href=''
                                    target='_blank'
                                    class='v-button'
                                    style='box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #3aaee0; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:65%; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 18px;'
                                  >
                                    <span
                                      style='display:block;padding:8px;line-height:100%;'
                                    ><strong>${otp}</strong></span>
                                  </a>
                                  <!--[if mso]></center></v:roundrect><![endif]-->
                                </div>

                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table
                          style='font-family:arial,helvetica,sans-serif;'
                          role='presentation'
                          cellpadding='0'
                          cellspacing='0'
                          width='100%'
                          border='0'
                        >
                          <tbody>
                            <tr>
                              <td
                                style='overflow-wrap:break-word;word-break:break-word;padding:12px;font-family:arial,helvetica,sans-serif;'
                                align='left'
                              >

                                <div
                                  style='font-size: 14px; color: #34495e; line-height: 140%; text-align: left; word-wrap: break-word;'
                                >
                                  <p style='line-height: 140%;'><strong>Cheer,
                                      peace out !</strong></p>
                                </div>

                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>

            <div
              class='u-row-container'
              style='padding: 0px;background-color: transparent'
            >
              <div
                class='u-row'
                style='margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;'
              >
                <div
                  style='border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;'
                >
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->

                  <!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                  <div
                    class='u-col u-col-100'
                    style='max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;'
                  >
                    <div
                      style='height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;'
                    >
                      <!--[if (!mso)&(!IE)]><!--><div
                        style='box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;'
                      ><!--<![endif]-->

                        <table
                          style='font-family:arial,helvetica,sans-serif;'
                          role='presentation'
                          cellpadding='0'
                          cellspacing='0'
                          width='100%'
                          border='0'
                        >
                          <tbody>
                            <tr>
                              <td
                                style='overflow-wrap:break-word;word-break:break-word;padding:24px;font-family:arial,helvetica,sans-serif;'
                                align='left'
                              >

                                <div
                                  style='font-size: 16px; color: #34495e; line-height: 140%; text-align: center; word-wrap: break-word;'
                                >
                                  <p style='line-height: 140%;'><strong><em>From
                                        Team Cook With Love</em>
                                      ❤️</strong></p>
                                </div>

                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>

            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
    <!--[if mso]></div><![endif]-->
    <!--[if IE]></div><![endif]-->
  </body>

</html>
`;
