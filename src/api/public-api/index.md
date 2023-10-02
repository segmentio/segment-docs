---
title: Public API
plan: papi
---
The Segment Public API helps you manage your Segment workspaces and its resources. You can use the API to perform CRUD (create, read, update, delete) operations at no extra charge. This includes working with resources such as Sources, Destinations, Warehouses, Tracking Plans, and the Segment Destinations and Sources Catalogs. The Public API is available to Team and Business Tier customers.

All CRUD endpoints in the API follow REST conventions and use standard HTTP methods. Different URL endpoints represent different resources in a workspace.

{% include components/reference-button.html
  href="https://docs.segmentapis.com"
  icon="media/programming.svg"
  title="Segment Public API Documentation"
  description="Research and test the Public API's available endpoints."
%}

> success "Getting started with the Public API"
> If your application is built in Javascript / Typescript, Go, Java, or Swift, check out [Segment's Public API SDKs](https://docs.segmentapis.com/tag/Getting-Started#section/Install-and-use-an-SDK){:target="_blank"}.

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
| Increased reliability   | The Public API features more stable endpoints, and a 99.8% success rate                                                                                             |


## API Token Security

To enhance API token security, Segment partners with GitHub to prevent fraudulent use of exposed API tokens found in public git repositories. This helps to prevent malicious actors from using exposed tokens to perform unauthorized actions in your Segment workspace. 

Within seconds, GitHub scans each commit in public repositories for Public API tokens, and sends detected tokens to Segment. Valid tokens are automatically revoked and workspace owners are notified. 

Learn more about [GitHub's secret scanning program](https://docs.github.com/en/developers/overview/secret-scanning-partner-program){:target="_blank"}.

## OAuth 2.0

> info ""
> This feature is currently in pilot and is governed by Segment’s [First Access and Beta Preview Terms](https://www.twilio.com/en-us/legal/tos){:target="_blank"}. 

You can authenticate and authorize the Public API using [OAuth 2.0](/docs/connections/oauth).

### Frequently Asked Questions
#### What should I do if I see a notification that my token was exposed?
In most cases, identifying and revoking an exposed token takes seconds. Segment recommends you check the [audit trail](/docs/segment-app/iam/audit-trail/) to ensure no unauthorized actions were taken with the token.

#### How did my token get exposed?
Developers can accidentally commit tokens to public repositories, exposing them to the public. This can happen when developers use a token in a local development environment and forget to remove it before committing their code.

#### Why are exposed tokens automatically revoked?
By automatically revoking the exposed token, Segment helps keep your workspace secure and prevents potential abuse of the token.

#### How do I enable this feature?
This feature is automatically enabled for all workspaces on Team or Business tier plans.

#### What should I do when I see a CORS error? 
If you see a CORS error, this means you're attempting to make a request to the Public API on the front-end. The Public API is used for server-side only. To get rid of the error, move all Public API requests to a server.

#### What User Role / Workspace permissions are required to generate Public API tokens?
Only [users that have a `Workspace Owner` role](https://segment.com/docs/segment-app/iam/roles/#global-roles) can create Public API Tokens.
