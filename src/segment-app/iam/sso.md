---
title: "Single Sign On team management"
---
{% include content/plan-grid.md name="sso" %}


Segment supports Single Sign On for Business Tier accounts. You can use any SAML-based Identity Provider (IdP), for example Okta, Bitium, OneLogin, or Centrify, or use GSuite to serve as your identity provider, delegating access to the application based on rules you create in your central identity management solution.

With SSO, you have centralized control over your users' ability to authenticate or not in your IdP, and can also enforce rules like two-factor authentication or password rotation at the IdP level.

You can configure as many IdP connections to your workspace as needed to support IdP-initiated authentication. This allows seamless migration from one system to a new one, for example if your organization switches IdP vendors or switches from GSuite to a dedicated SAML IdP like Okta or OneLogin.

To enable SSO-based login from the Segment login page (app.segment.com/login), you must first verify that you own the domain, and connect it to your organization's Segment account. Once you have done that, SSO users from your domain can use the Segment login page to access your default Segment workspace.

The Segment login page can only be connected to one workspace. To use your IdP with multiple workspaces, you will have to initiate login to the other workspaces from the IdP instead of through the login portal.

## Set up — SAML

Segment's SSO configuration is entirely self-service; we don't require any back and forth with our team in order to test and enable the feature on your workspace. Additionally, we have prebuilt connections with [Okta](https://www.okta.com/integrations/segment/), [OneLogin](https://www.onelogin.com), and [Azure AD](https://docs.microsoft.com/en-us/azure/active-directory/saas-apps/segment-tutorial) which can help you get setup faster. However, we are here to help! don't hesitate to [get in touch](https://segment.com/help/contact/) if you run into any questions or issues.

To get started, go to your workspace settings and choose the "Connections" tab under "Authentication" and click "Add New Connection." Follow the steps to create a SAML connection.

![](images/asset_JR9CRr6f.png)

![](images/asset_XCyMZpwo.png)

## Prepare your IdP for the connection.

Segment officially supports apps for Okta, Azure AD, and OneLogin. Next, find Segment in your IdP's app catalog, and follow the set up instructions they provide.

If you're using a different IdP, you must create a custom SAML-based application.

Your provider will ask you for a few things from Segment, which we provide in the set up flow:

![](images/asset_RRAJ92MY.png)

### A few gotchas to look out for:

- For GSuite configurations, make sure the `Start URL` field in Service Provider Details is left blank.

- Different IdPs have different names for the Audience URL. Some call it "Audience URI", some call it "Entity ID", some call it "Service Provider Entity ID." It's likely there are only two required fields without correct defaults, and they correspond to the `SSO URL` and `Audience URL` values above.

- In all IdPs we've worked with, the default `NameID` option is the correct one. Make sure it's using the `emailAddress` schema.

- In all IdPs we've worked with, the default connection encryption options are the correct ones. (Signed Response & Assertion Signature with SHA256, Unencrypted Assertions).

- Different IdPs store records of your employees differently. The only attribute mapping we require is to make sure you're sending `email` . In Okta this is at `user.email`. In Duo this is `mail`.

- Make sure you've enabled "send all attributes" (not just NameID) if applicable for your IdP.

- No `RelayState` is required. This is also sometimes called `Target`.

Once you create the application in your IdP, you can come back to Segment and click "Next".

## Configure Segment to Talk to Your IdP.

Your IdP provides a URL and x.509 certificate. Copy them into their respective fields in Segment.

![](images/asset_s19XDgWX.png)

Then, click "Configure Connection."

You're all set!

## Test your connection with IdP-initiated SSO.

Back at the connections page, make sure your connection is enabled with the switch on the right.

![](images/asset_SNxN4JhO.png)

You can now test using IdP-initiated SSO (by clicking login to Segment from within your IdP) is working correctly. If not, double check the IdP configuration gotchas section above.

## Require SSO.

For most customers we recommend requiring SSO for all users. If you do not require SSO, users can still log in with a username and password. If some members cannot log in using SSO, Segment also supports SSO exceptions.

These options are off by default, but configurable on the "Advanced Settings" page.

![](images/asset_require_sso.png)

## Set up — GSuite

GSuite configuration is incredibly simple with Segment. To get started, go to your workspace settings and choose the "Connections" tab under "Authentication" and click "Add New Connection." Follow the steps to create a "Google Apps For Work" connection.

You simply enter your domain (or, if you've verified it already, choose it from the dropdown) and then click the resulting link to authorize the connection.

## Enabling Segment-initiated login

Segment supports "interruption" on the login page for emails that match your workspace's domain.


In order to enable this, you'll need to verify your domain with Segment. To do that, go to the "Domains" tab under "Authentication" in the workspace settings page.

![](images/asset_MSaDZk2f.png)

Enter your domain and click "Add Domain." When you click verify, you're given two options to verify your domain, either using a meta tag to add to your `/index.html` at the root, or a DNS txt record that you can add through your DNS provider. Once you do so and click verify, you're ready to go!

> note ""
> **Note**: domain tokens expire 14 days after they are verified.

## SSO Frequently Asked Questions

##### Do you support automatic user provisioning?

Segment supports "just in time" user permissioning; new users who authenticate using your IdP are automatically created in Segment as minimal-access (read-only) members. If the user already exists in Segment then Segment associates the IdP-identity with the existing Segment user account.

Segment also supports user provisioning and role mapping [using SCIM](/docs/segment-app/iam/scim/).

##### Do you support automatic user de-provisioning?

Yes, users can be automatically de-provisioned [if you use SCIM](/docs/segment-app/iam/scim/).

##### Will my users lose access to their other workspaces when I enable SSO?

Segment allows users to own their own workspaces. While your IdP authentication will ensure that any non-owners must have logged in with SSO to access _your workspace_, they can still log into Segment with username and password to access their own workspaces.

##### Can I still invite people outside the organization?

Workspace owners can invite additional owners with any domain using the traditional invite mechanism.

If the workspace is configured to require SSO, and the user is not on your IdP, you can add an Exemption under **Workspace Settings > Authentication > Advanced Settings**.

##### How do I configure SSO to access multiple workspaces?

If you would like to use SSO for multiple workspaces, your admin must configure access to each workspace as a separate app in your identity provider.
