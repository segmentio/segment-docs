---
title: OAuth 2.0
plan: oauth-2
---

OAuth 2.0 is an online authorization standard that uses tokens to grant access to API resources like Segment’s tracking API. You can use OAuth 2.0 as a security requirement for connections to third-party tools. 

## Permissions 
Depending on your workspace permissions, your access to OAuth apps is limited. 

Segment Role | Permission
------------ | -----------
Workspace Owner | You can view, create, and edit OAuth apps.
Workspace Member | You cannot view, create, or edit OAuth apps.
Source Admin | You can view and edit OAuth apps. <br> You can connect and disconnect OAuth apps. <br> You can enable or disable OAuth enforcement.
Source Read-only | You can only view OAuth apps.
Function Admin | You can view and edit OAuth apps. <br>You can connect and disconnect OAuth apps. <br>You can enable and disable OAuth enforcement.
Function Read-only | You can only view OAuth apps.

## Create an OAuth app

> info ""
> You must have already created a workspace in Segment to use OAuth.

To create a new OAuth application:

1. Navigate to **Settings > Workspace settings**  and select the Access Management tab. 
2. Select the **OAuth application** tab within the **Access Management** page. 
3. Click **Create OAuth app**.
4. Enter the configuration settings:

    Settings | Details
    -------- | -------
    Application name | The name of the OAuth app.
    Public key | Upload a public key in PEM format to authenticate through the OAuth application. You can upload a second public key after you create the OAuth application. You can create a public key by running the script: `openssl rsa -in private.pem -pubout -outform PEM -out public.pem`
    Public key name | Enter a name for your public key. 
    Token expiration period | You can choose between: 1 day, 2 days, 3 days, 1 week, 2 weeks, 3 weeks, 30 days.
    Scope | This specifies what type of access you need for each API. See the list of [supported scopes](#supported-scopes).
5. Click **Create**. 

Once you create your OAuth app, you can now connect a source to your OAuth app. 

## Connect a source to OAuth
> info ""
> OAuth only supports server-side sources. See the list of [supported sources](#supported-sources).

To connect a source to OAuth: 

1. Navigate to **Connections > Sources**.
2. Select the source you want to enable OAuth for. 
3. Go to the **Settings** tab of the source page and select **OAuth app**. 
4. Click **Connect OAuth app**. 
5. Select the OAuth app you want to connect the source to. 
6. Click **Connect**. 

To disconnect your source from OAuth, click **Disconnect**. 

## Enable a source to OAuth
Once you've connected your source to OAuth, you can enable it. To enable your source:

1. Navigate to **Connections > Sources** and select your source.
2. Go to the **Settings** tab of the source and select **OAuth app**.
3. Turn the toggle on for **Enable OAuth**. 

To disable your source from OAuth, turn the toggle off for **Enable OAuth**.

## Obtain the access token
You can obtain an access token once you create an OAuth application and enable a source to OAuth.  

Access tokens are only valid within a region. The supported regional authorization servers are: 
* Oregon - `https://oauth2.segment.io`
* Dublin - `https://oauth2.eu1.segmentapis.com`

To obtain the access token:

1. Create a node or shell script
1. Create a JWT token with the header and payload as below:

    Header
    ```
    {
        "alg":"RS256", 
        "typ":"JWT", 
        "kid":"<<KID>>"
    }
    ```

    Payload
    ```
    {
        "iss":"<<ISS>>",
        "sub":"<<SUB>>",
        "aud":"<<AUD>>", 
        "iat":"<<IAT>>",
        "exp":"<<EXP>>",
        "jti":"<<JTI>>"
    }
    ```

    Unless otherwise specified, all fields are mandatory. 

    Field | Description 
    ------------ | -------------
    KID | The key ID of the public key in the OAuth application. You can find this value in the Segment app by navigating to the Access Management tab and selecting the OAuth app you created. On the Overview tab for your OAuth app, you'll find your Key ID.  
    ISS | _(Optional)_  The identifier of the JWT issuer. This value is `https://oauth2.segment.io` if you're located in the US, or `https://oauth2.eu1.segmentapis.com` if you're located in the EU. 
    SUB | The OAuth application ID. You can find this value in the Segment app by navigating to the Access Management tab and selecting the OAuth app you created. On the Overview tab for your OAuth app, you'll find your application ID under **App ID**.
    AUD | The intended recipient of the token. This value is `https://oauth2.segment.io` if you're located in the US, or `https://oauth2.eu1.segmentapis.com` if you're located in the EU. 
    IAT | The epoch time in seconds when the token was issued. This is typically set using `math.floor(Date.now() / 1000)`.
    EXP | The expiry time of a token, measured in seconds. Tokens are expected to be valid for less than sixty seconds. You can set the expiry of a token using `math.floor(Date.now() / 1000) + 60`. 
    JTI | A case-sensitive string that acts as a [unique identifer for the token](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.7){:target="_blank”}. Segment recommends setting this value with a UUID format to avoid duplicate values between tokens. 

2. Send a form-url-encoded `POST` request to the regional authorization server's `\token` route with the following parameters:
    
    ```
    grant_type=client_credentials
    client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer
    client_assertion=<<JWT>>
    scope=<<SCOPE>>
    ```

    Field | Description
    ----- | ------------
    JWT | The signed JWT token string from Step 1.
    SCOPE | Scopes for which token is requested. See [supported scopes](#supported-scopes).

To use the access token, see an example of how to use the access token in the [HTTP API source](/docs/connections/sources/catalog/libraries/server/http-api/#oauth). 

## Edit an OAuth application
To edit an existing OAuth application: 

1. Navigate to **Settings > Workspace settings** and select the **Access Management** tab. 
2. Select the **OAuth application** tab within the **Access Management** page. 
3. Click the application name of the OAuth application you want to edit. 
4. On the **Overview** tab you can:
    * Revoke a token
    * Copy the Application ID and the Public key
    * Delete the OAuth application
5. Select the **Settings** tab on the right window where you can: 
    * Edit the **Application name**
    * Delete a public key
    * Add a new public key
    * Change the token expiration period
    * Edit your scope
6. Click **Save changes**. 


## Delete an OAuth app
> info ""
> To delete an OAuth app, you must remove all connected sources from the app. 

To delete an OAuth app: 
1. Navigate to **Settings > Workspace settings** and select the **Access Management** tab. 
2. Select the **OAuth application** tab within the **Access Management** page. 
3. Select the **App name** of the OAuth app you want to delete. 
4. Select **Delete OAuth app**.
5. Enter the name of the OAuth app you want to delete. 
6. Click **Delete OAuth app**. 

## Revoke a token

When security incidents expose access tokens, you can revoke your access token. To revoke a token: 
1. Navigate to **Settings > Workspace settings** and select the **Access Management** tab. 
2. Select the *OAuth application tab within the **Access Management** page. 
3. Select the **App name** with the token you want to delete. 
4. Enter the complete token
5. Click **Revoke token**.

## Supported sources
OAuth 2.0 currently supports these sources:
* [HTTP Tracking API](/docs/connections/sources/catalog/libraries/server/http-api/)
* [Node.js](/docs/connections/sources/catalog/libraries/server/node/)
* [Public API](/docs/api/public-api/)
* [Python](/docs/connections/sources/catalog/libraries/server/python/)
* [Source Functions](/docs/connections/functions/source-functions/)

## Supported scopes 
OAuth 2.0 currently supports these scopes:

**Tracking API scopes**
   * `tracking_api:write`

**Source Functions scopes**
   * `functions:write`

**Public API scopes**
   * `public_api:read_write`
