// module.exports = testEmail = 
module.exports = (name, email, password) => {
    console.log(email, password)
    return (
        // document.createElement('html').innerHTML =
        `
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Fund Request Invitation</title>

            <style type="text/css">
                body {
                    -webkit-font-smoothing: antialiased;
                    -webkit-text-size-adjust: none;
                    width: 100% !important;
                    margin: 0 !important;
                    height: 100%;
                    color: #676767;
                }

                td {
                    font-family: Helvetica, Arial, sans-serif;
                    font-size: 14px;
                    color: #777777;
                    text-align: center;
                    line-height: 21px;
                }

                a {
                    color: #6f89ff;
                    font-weight: bold;
                    text-decoration: none !important;
                }

                .pull-left {
                    text-align: left;
                }

                .pull-right {
                    text-align: right;
                }

                .header-lg,
                .header-md,
                .header-sm {
                    font-size: 32px;
                    font-weight: 700;
                    line-height: normal;
                    padding: 35px 0 0;
                    color: #4d4d4d;
                }

                .header-md {
                    font-size: 24px;
                }

                .header-sm {
                    padding: 5px 0;
                    font-size: 18px;
                    line-height: 1.3;
                }

                .content-padding {
                    padding: 20px 0 30px;
                }

                .mobile-header-padding-right {
                    width: 290px;
                    text-align: right;
                    padding-left: 10px;
                }

                .mobile-header-padding-left {
                    /* width: 290px;
                    text-align: left;
                    padding-left: 10px; */
                }

                .free-text {
                    width: 100% !important;
                    padding: 10px 60px 0px;
                }

                .block-rounded {
                    /* border-radius: 5px;
                    border: 1px solid #e5e5e5;
                    vertical-align: top; */
                }

                .button {
                    padding: 30px 0 0;
                }

                .info-block {
                    /* padding: 0 20px;
                    width: 260px; */
                }

                .mini-block-container {
                    padding: 30px 50px;
                    width: 500px;
                }

                .mini-block {
                    background-color: #ffffff;
                    width: 498px;
                    /* border-top:10px red; */
                    border: 1px solid #cccccc;
                    border-radius: 5px;
                    padding: 45px 75px;
                    /* border-top:10px #6f89ff; */
                    /* border: 10px; */
                }

                .block-rounded {
                    width: 260px;
                }

                .info-img {
                    width: 258px;
                    border-radius: 5px 5px 0 0;
                }

                .force-width-img {
                    width: 480px;
                    height: 1px !important;
                }

                .force-width-full {
                    width: 600px;
                    height: 1px !important;
                }

                .user-img img {
                    width: 30%;
                    /* border-radius: 5px; */
                    /* border: 1px solid #cccccc; */
                }

                /* .user-img { */
                /* text-align: center;
                    border-radius: 100px;
                    color: #ff6f6f;
                    font-weight: 700; */
                /* } */

                .user-msg {
                    padding-top: 10px;
                    font-size: 18px;
                    text-align: center;
                    font-style: italic;
                }

                .mini-img {
                    padding: 5px;
                    width: 140px;
                }

                .mini-img img {
                    border-radius: 5px;
                    width: 140px;
                }

                .force-width-gmail {
                    min-width: 600px;
                    height: 0px !important;
                    line-height: 1px !important;
                    font-size: 1px !important;
                }

                .mini-imgs {
                    padding: 25px 0 30px;
                }

                .credentials_card {
                    padding-top: 10px;
                    font-size: 18px;
                    text-align: center;
                    font-weight: bold;
                    /* padding: 5px; */
                    /* padding: 5px !important; */
                    padding: 30px 0 0;
                }
            </style>

            <style type="text/css" media="screen">
                @import url(http://fonts.googleapis.com/css?family=Oxygen:400,700);
            </style>
        </head>

        <body bgcolor="#f7f7f7">
            <table align="center" cellpadding="0" cellspacing="0" class="container-for-gmail-android" width="100%">
                <tr>
                    <td align="center" valign="top" width="100%" style="background-color: #f7f7f7;" class="content-padding">
                        <center>
                            <table cellspacing="0" cellpadding="0" width="600" class="w320">
                                <tr>
                                    <td class="header-lg">
                                        You've received an invitation!
                                    </td>
                                </tr>
                                <tr>
                                    <td class="free-text">
                                        <span><a href="">@ipfSoftwares</a></span> have invited you to join Fund Request!!!
                                    </td>
                                </tr>
                                <tr>
                                    <td class="mini-block-container">
                                        <table cellspacing="0" cellpadding="0" width="100%"
                                            style="border-collapse:separate !important;">
                                            <tr>
                                                <td class="mini-block">
                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                        <tr>
                                                            <td>
                                                                <table cellspacing="0" cellpadding="0" width="100%">
                                                                    <tr>
                                                                        <td class="user-img">
                                                                            <a href=""><img class="user-img"
                                                                                    src='https://www.ipfsoftwares.com/img/logo-blue.png'
                                                                                    alt="ipf_logo" /></a>
                                                                            <br /><a href="">@ipfSoftwares</a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="user-msg">
                                                                            <!-- "Hey Bob, -->
                                                                            <!-- here's your invite! Come check out my profile page
                                                                            when you have a chance. You'll love it!" -->
                                                                            ${name},<br>
                                                                            You can now download and use <br>
                                                                            Fund Request APP.<br>
                                                                            for more information click here.
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="">
                                                                <div class='credentials_card'>
                                                                    For first time login, use<br>
                                                                    Email: ${email}<br>
                                                                    Password: ${password}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </center>
                    </td>
                </tr>
                </tr>
                <tr>
                    <td align="center" valign="top" width="100%" style="background-color: #f7f7f7; height: 100px;">
                        <center>
                            <table border="0" cellpadding="0" cellspacing="0" style="max-width:600px;" width="100%"
                                class="wrapperFooter">
                                <tbody>
                                    <tr>
                                        <td align="center" valign="top">
                                            <!-- Content Table Open// -->
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="footer">
                                                <tbody>
                                                    <tr>
                                                        <td align="center" valign="top"
                                                            style="padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px;"
                                                            class="socialLinks">
                                                            <!-- Social Links (Facebook)// -->
                                                            <a href="https://web.facebook.com/ipfsoftwarescom/" target="_blank"
                                                                style="display:inline-block;" class="facebook">
                                                                <img src="http://weekly.grapestheme.com/notify/img/social/light/facebook.png"
                                                                    alt="" width="40" border="0"
                                                                    style="height:auto; width:100%; max-width:40px; margin-left:2px; margin-right:2px">
                                                            </a>
                                                            <!-- Social Links (Twitter)// -->
                                                            <a href="https://twitter.com/ipfsoftwares" target="_blank"
                                                                style="display:inline-block;" class="twitter">
                                                                <img src="http://weekly.grapestheme.com/notify/img/social/light/twitter.png"
                                                                    alt="" width="40" border="0"
                                                                    style="height:auto; width:100%; max-width:40px; margin-left:2px; margin-right:2px">
                                                            </a>
                                                            <!-- Social Links (Instagram)// -->
                                                            <a href="https://www.instagram.com/ipfsoftwares/" target="_blank"
                                                                style="display: inline-block;" class="instagram">
                                                                <img src="http://weekly.grapestheme.com/notify/img/social/light/instagram.png"
                                                                    alt="" width="40" border="0"
                                                                    style="height:auto; width:100%; max-width:40px; margin-left:2px; margin-right:2px">
                                                            </a>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td align="center" valign="top" style="padding: 10px 10px 5px;" class="brandInfo">
                                                            <!-- Brand Information // -->
                                                            <p class="text"
                                                                style="color:#777777; font-family:'Open Sans', Helvetica, Arial, sans-serif; font-size:12px; font-weight:400; font-style:normal; letter-spacing:normal; line-height:20px; text-transform:none; text-align:center; padding:0; margin:0;">
                                                                ©&nbsp;Notify Inc. | 800 Broadway, Suite 1500 | Mbezi,Temboni, TZ
                                                            </p>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td align="center" valign="top" style="padding: 0px 10px 20px;"
                                                            class="footerLinks">
                                                            <!-- Use Full Links (Privacy Policy)// -->
                                                            <p class="text"
                                                                style="color:#777777; font-family:'Open Sans', Helvetica, Arial, sans-serif; font-size:12px; font-weight:400; font-style:normal; letter-spacing:normal; line-height:20px; text-transform:none; text-align:center; padding:0; margin:0;">
                                                                <a href="https://www.ipfsoftwares.com" style="color:#777777;text-decoration:underline;" target="_blank"> IPFSOFTWARES </a>&nbsp;|&nbsp;
                                                                <a href="#" style="color:#777777;text-decoration:underline;" target="_blank"> Fund Request App </a>&nbsp;|&nbsp;
                                                                <a href="#" style="color:#777777;text-decoration:underline;" target="_blank"> Privacy Policy </a>
                                                            </p>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td align="center" valign="top" style="padding: 0px 10px 10px;"
                                                            class="footerEmailInfo">
                                                            <!-- Information of NewsLetter (Subscribe Info)// -->
                                                            <p class="text"
                                                                style="color:#777777; font-family:'Open Sans', Helvetica, Arial, sans-serif; font-size:12px; font-weight:400; font-style:normal; letter-spacing:normal; line-height:20px; text-transform:none; text-align:center; padding:0; margin:0;">
                                                                If you have any quetions please contact us 
                                                                <a href="#" style="color:#777777;text-decoration:underline;" target="_blank">support@mail.com.</a><br> 
                                                                <!--<a href="#" style="color:#777777;text-decoration:underline;" target="_blank">Unsubscribe</a> from our mailing lists -->
                                                            </p>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td align="center" valign="top"
                                                            style="padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px;"
                                                            class="appLinks">
                                                            <!-- App Links (Anroid)// -->
                                                            <a href="#Play-Store-Link" target="_blank"
                                                                style="display:inline-block;" class="play-store">
                                                                <img src="http://weekly.grapestheme.com/notify/img/app/play-store.png"
                                                                    alt="" width="120" border="0"
                                                                    style="height:auto;margin:5px;width:100%;max-width:120px;">
                                                            </a>
                                                            <!-- App Links (IOs)// -->
                                                            <a href="#App-Store-Link" target="_blank"
                                                                style="display: inline-block;" class="app-store">
                                                                <img src="http://weekly.grapestheme.com/notify/img/app/app-store.png"
                                                                    alt="" width="120" border="0"
                                                                    style="height:auto;margin:5px;width:100%;max-width:120px;">
                                                            </a>
                                                        </td>
                                                    </tr>

                                                    <!-- Space -->
                                                    <tr>
                                                        <td height="30" style="font-size:1px;line-height:1px;">&nbsp;</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <!-- Content Table Close// -->
                                        </td>
                                    </tr>

                                    <!-- Space -->
                                    <tr>
                                        <td height="30" style="font-size:1px;line-height:1px;">&nbsp;</td>
                                    </tr>
                                </tbody>
                            </table>
                        </center>
                    </td>
                </tr>
            </table>
        </body>
        `
    )
}