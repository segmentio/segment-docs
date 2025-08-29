---
title: Public API
plan: papi
---
The Segment Public API helps you manage your Segment workspaces and its resources. You can use the API to perform CRUD (create, read, update, and delete) operations at no extra charge. This includes working with resources such as Sources, Destinations, Warehouses, Tracking Plans, and the Segment Destinations and Sources Catalogs. The Public API is available to Team and Business Tier customers.

All CRUD endpoints in the API follow REST conventions and use standard HTTP methods. Different URL endpoints represent different resources in a workspace.

{% include components/reference-button.html
  href="https://docs.segmentapis.com"
  icon="media/programming.svg"
  title="Segment Public API Documentation"
  description="Research and test the Public API's available endpoints."
%}

> success "Getting started with the Public API"
> If your application is built in JavaScript, Typescript, Go, Java, Swift, or C#, check out [Segment's Public API SDKs](https://docs.segmentapis.com/tag/Getting-Started#section/Install-and-use-an-SDK){:target="_blank"}.

## Config API vs Public API
The Public API includes the following benefits over the Config API:

| Benefit                 | Details                                                                                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Future Enhancements     | Future improvements will be added to the Public API only.                                                                                                           |
| Improved error handling | The Public API offers more specific error messages, for faster issue resolution.                                                                                    |
| Versioning              | Each endpoint on the Public API can have multiple versions. Stable versions can coexist with beta or alpha versions.                                                |
| Higher rate limits      | The Public API can offer higher rate limits when needed or different rate limits per endpoint or token.                                                             |
| Improved architecture   | The Public API is built with improved security, checks for authentication, authorization, input validation, HTTPS exposed services, auto-scaling, and more in mind. |
| Cleaner mapping         | The Public API uses unique IDs for reference, in place of slugs in the Config API. Unique IDs are, by design, unique.                                               |
| Available in Europe     | The Public API is accessible to both US and EU-based workspaces.                                                                                                    |                                                               |
| Increased reliability   | The Public API features more stable endpoints, and a 99.8% success rate.                                                                                             |

## Create a Public API token

> info "Only Workspace Owners can create a Public API token"
> Only users with the **Workspace Owner** role can create a Public API token. For more information about roles, see Segment's [Roles](/docs/segment-app/iam/roles/) documentation. 

To create a Public API token in your Segment workspace:
1. Navigate to **Settings** > **Workspace settings** > **Access Management** > **Tokens**.
2. Click **+ Create Token**. 
3. Create a description for the token and assign it either **Workspace Owner** or **Workspace Member** access. 
4. Click **Create**.
5. Copy your workspace token somewhere secure and click **Done**.

To begin sending requests to the Public API, include the Public API Token in your HTTP requests. Configure the `Authorization` Header as a `Bearer Token` with the value of the newly generated Public API token.


## API token security

To enhance API token security, Segment partners with GitHub to prevent fraudulent use of exposed API tokens found in public git repositories. This helps to prevent malicious actors from using exposed tokens to perform unauthorized actions in your Segment workspace. 

Within seconds, GitHub scans each commit in public repositories for Public API tokens, and sends detected tokens to Segment. Valid tokens are automatically revoked and workspace owners are notified. 

Learn more about [GitHub's secret scanning program](https://docs.github.com/en/developers/overview/secret-scanning-partner-program){:target="_blank"}.

## FAQs
#### What should I do if I see a notification that my token was exposed?
In most cases, identifying and revoking an exposed token takes seconds. We recommend that you check the [audit trail](/docs/segment-app/iam/audit-trail/) to ensure no unauthorized actions were taken with the token.

#### How did my token get exposed?
Developers can accidentally commit tokens to public repositories, exposing them to the public. This can happen when developers use a token in a local development environment and forget to remove it before committing their code.

#### Why are exposed tokens automatically revoked?
By automatically revoking the exposed token, Segment helps keep your workspace secure and prevents potential abuse of the token.

#### How do I enable this feature?
This feature is automatically enabled for all workspaces on Team or Business tier plans.

#### What should I do when I see a CORS error? 
If you see a CORS error, this means you're attempting to make a request to the Public API on the front-end. The Public API is used for server-side only. To get rid of the error, move all Public API requests to a server.

#### What User Role / Workspace permissions are required to generate Public API tokens?
Only [users that have a **Workspace Owner** role](/docs/segment-app/iam/roles/#global-roles) can create Public API Tokens.

## Troubleshooting
#### The `Update Schema Settings in Source` endpoint returns an error for fields `forwardingViolationsTo` and `forwardingBlockedEventsTo`
When you don't have a source to forward violations or blocked events to, then exclude the fields `forwardingViolationsTo` or `forwardingBlockedEventsTo` entirely from the request and the setting will be disabled. 

`PATCH`  endpoint : `https://api.segmentapis.com/sources/{sourceId}/settings`
```
{
    "group": {
      "allowTraitsOnViolations": false,
      "allowUnplannedTraits": false,
      "commonEventOnViolations": "ALLOW"
    },
    "identify": {
      "allowTraitsOnViolations": true,
      "allowUnplannedTraits": true,
      "commonEventOnViolations": "Block"
    },
    "track": {
      "allowEventOnViolations": false,
      "allowPropertiesOnViolations": false,
      "allowUnplannedEventProperties": false,
      "allowUnplannedEvents": false,
      "commonEventOnViolations": "OMIT_PROPERTIES"
    }
  }
```
### What is the difference between a destination's Instance ID and Meta ID?
The destination’s Instance ID is specific to a single destination within your workspace. The destination’s Meta ID, which is returned by the delivery metrics endpoint, identifies which integration you've set up. For example, if you had a `dev` Mixpanel (Actions) destination and a `prod` Mixpanel (Actions) destination, they would have the same Meta ID but two different Instance IDs.  
