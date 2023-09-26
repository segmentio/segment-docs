---
title: OAuth 2.0
---

OAuth 2.0 is an online authorization tool that uses tokens to grant access to API resources like Segment’s tracking API. You can use OAuth 2.0 as a security requirement for connections to third-party tools. 

> info ""
> This feature is currently in pilot. For pilot, Segment doesn’t support OAuth for Web and Mobile sources where an end-user is involved. OAuth 2.0 only supports server to Segment communication, a machine-to-machine workflow. 

## Permissions 
Depending on your workspace permissions, your access to OAuth apps is limited. 

Segment Role | Permission
------------ | -----------
Workspace Owner | You can view/create/edit **Workspace Settings>Access Management>OAuth application**.
Workspace Member | You cannot view/create/edit **Workspace Settings > Access Management > OAuth app**.
Source Admin | You can view/edit **Source> Settings > OAuth app**. <br> You can connect/disconnect OAuth application. <br> You can enable/disable OAuth enforcement.
Source Read-only | You can only view **Source > Settings > OAuth app**.
Function Admin | You can view/edit **Source Function Instance > Settings > OAuth app**. <br>You can connect/disconnect OAuth application. <br>You can enable/disable OAuth enforcement.
Function Read-only | You can only view **Source Function Instance > Settings > OAuth application**.

## Create an OAuth app

> info ""
> You must have already created workspace in Segment to use OAuth.

To create a new OAuth application:

1. Create a private and public key by running the script:

    ```
    openssl genpkey -algorithm RSA -out private.pem -pkeyopt rsa_keygen_bits:2048
    openssl rsa -in private.pem -pubout -outform PEM -out public.pem
    ```

2. Navigate to **Settings > Workspace** settings and select the Access Management tab. 
3. Select the **OAuth application** tab within the **Access Management** page. 
4. Click **Create OAuth app**.
5. Enter the configuration settings:

    Settings | Details
    -------- | -------
    Application name | The name of the OAuth app.
    Public key | Upload a public key in PEM format to authenticate through the OAuth application. You can upload a second public key after you create the OAuth application. 
    Public key name | Enter a name for your public key. 
    Token expiration period | You can choose between: 1 day, 2 days, 3 days, 1 week, 2 weeks, 3 weeks, 30 days.
    Scope | This specifies what type of access is needed for each API. For pilot, Segment offers these 2 scopes: <br><li>Tracking API <br><li><li> `tracking_api:write` <br><li>Public API <br><li><li>`public_api:read_write`
6. Click **Create**. 

## Connect a source to OAuth
> info ""
> OAuth only supports server-side sources and does not support. Currently for beta, only http API and node.js and public api and source functions are other api points that are covered 

To connect a source to OAuth: 

1. Navigate to **Connections > Sources**.
2. Select the source you want to enable OAuth for. 
3. Go to the **Settings** tab of the source page and select **OAuth app**. 
4. Click **Create OAuth app**. 
5. Select the OAuth app you want to connect the source to. 
6. Click **Connect**. 
7. Select the toggle to **Enable OAuth** for the source. 

To disconnect the source from OAuth, select **Disconnect**.

## Request the access token

To request the access token, run:

```
./gentoken.sh -k <private-key.pem> -i <key_id> -a <oauth_app_id> | jq '.access_token'
```

## Edit an OAuth application
To edit an existing OAuth application: 

1. Navigate to **Settings > Workspace** settings and select the **Access Management** tab. 
2. Select the **OAuth application** tab within the **Access Management** page. 
3. Click the application name of the OAuth application you want to edit. 
4. On the **Overview** tab you can:
    1. Revoke a token
    2. Copy the Application ID and the Public key
    3. Delete the OAuth application
5. Select the **Settings** tab on the right window where you can: 
    1. Edit the **Application name**
    2. Delete a public key
    3. Add a new public key
    4. Change the token expiration period
    5. Edit your scope
6. Click **Save changes**. 


## Delete an OAuth app
> info ""
> In order to delete an OAuth app, you must remove all connected sources from the app. 

To delete an OAuth app: 
1. Navigate to **Settings > Workspace settings** and select the **Access Management** tab. 
2. Select the **OAuth application** tab within the **Access Management** page. 
3. Select the **App name** of the OAuth app you want to delete. 
4. Select **Delete OAuth app**.
5. Enter the name of the OAuth app you want to delete. 
6. Click **Delete OAuth app**. 

## Remove a token
To remove a token: 
1. Navigate to **Settings > Workspace settings** and select the **Access Management** tab. 
2. Select the *OAuth application tab within the **Access Management** page. 
3. Select the **App name** with the token you want to delete. 
4. Enter the complete token
5. Click **Revoke token**.