---
title: Multi-Factor Authentication (MFA)
---

Multi-factor Authentication (MFA) provides an additional layer of security when logging into your Segment account. When MFA is enabled, users must enter their username and password, and a one-time use code.

You can configure your Segment workspace to use a code generation app (for example [Google Authenticator](https://support.google.com/accounts/answer/1066447), [1Password](https://1password.com), or [Authy](https://authy.com)) to generate a time-based token, or send a text-message (U.S. and Canada only). You can also log in using a recovery code in case you don't have your MFA device available.

We highly recommend that you [choose a strong password](https://segment.com/docs/iam/secure-password/) and also enable MFA for the email account that you use to log into Segment. If someone is able to gain access to your email, they will be able to access your Segment account even if your Segment account has MFA enabled.

### Who can use MFA?

MFA is available to all Segment customers that are not [logged in using SSO](https://segment.com/docs/iam/sso/). If your company uses SSO to sign in to Segment, you should enable MFA at the SSO provider. Contact your company's IT team if you have questions about your company's SSO configuration.


## Enabling MFA

1. Log into Segment and click your user icon in the top right corner of the screen
2. Click **Account security**.
3. Locate the MFA section, and click **Edit**
4. Click either **Text Message** or **Authenticator App** and follow the instructions to set up the app.

Once MFA is enabled, Segment prompts you for one of these methods every time you log in.
