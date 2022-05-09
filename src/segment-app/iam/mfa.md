---
title: Multi-Factor Authentication (MFA)
---
{% include content/plan-grid.md name="mfa" %}


Multi-factor Authentication (MFA) provides an additional layer of security when logging into your Segment account. When MFA is enabled, users must enter their username and password, and a one-time use code. Users can either enable MFA for their own account, or workspace owners can require that all users in a workspace use MFA. These security settings are available in the workspace from the "Advanced Settings" section.

You can configure your Segment workspace to send a text message code (U.S. and Canada only), or use an authentication app to generate a time-based token (for example [Google Authenticator](https://support.google.com/accounts/answer/1066447), [1Password](https://1password.com), or [Authy](https://authy.com)). You can also log in using a recovery code in case you don't have your MFA device available. When you configure MFA, be sure to save your recovery code in safe place so you can access your Segment account in the event you lose your MFA device.

We highly recommend that you [choose a strong password](https://segment.com/docs/segment-app/iam/secure-password/) and also enable MFA for the email account that you use to log into Segment. If someone is able to gain access to your email, they will be able to access your Segment account even if your Segment account has MFA enabled.

### Who can use MFA?

MFA is available to all Segment customers that are not [logged in using SSO](https://segment.com/docs/segment-app/iam/sso/). If your company uses SSO to sign in to Segment, you should enable MFA at the SSO provider. Contact your company's IT team if you have questions about your company's SSO configuration.


## Enabling MFA

1. Log into Segment and go to your [MFA Settings](https://app.segment.com/settings/user/mfa) page.
2. Click either **Authenticator App** or **Text Message** and follow the instructions to set up MFA.

Once MFA is enabled, Segment prompts you for one of these methods every time you log in.

## Recovering MFA
Your recovery code can be used bypass in the event you do not have your MFA device. If you no longer have access to your recovery code, you can choose to send a recovery code to your email to re-access your Account.

1. Enter your username and password on the login screen.
2. Click the _authenticating a different way_ link.
3. Click _Recovery Code_.
4. Click _Send recovery code to my email_.

