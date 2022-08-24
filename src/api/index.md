---
title: Public API
---
The Segment Public API helps you manage your Segment workspaces and its resources. You can use the API to perform CRUD (create, read, update, delete) operations at no extra charge. This includes working with resources such as Sources, Destinations, Warehouses, Tracking Plans, and the Segment Destinations and Sources Catalogs.

All CRUD endpoints in the API follow REST conventions and use standard HTTP methods. Different URL endpoints represent different resources in a workspace.

For more information, see the [Segment Public API documentation](#).

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
| Improved ease of use    |                                                                                                                                                                     |
| Available in Europe     |                                                                                                                                                                     |
| Increased reliability   | The Public API features more stable endpoints, and a 99.8% success rate                                                                                             |