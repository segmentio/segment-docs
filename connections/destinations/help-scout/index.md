---

---

[Help Scout](https://www.helpscout.net/) is a help desk software company which provides an email-based customer support platform, knowledge base tool, and an embeddable search/contact widget for customer service professionals.

This document was last updated on October 16, 2018. If you notice any gaps, outdated information, or simply want to leave some feedback to help us improve our documentation, [please let us know](https://segment.com/help/contact/)!

## Getting Started

{% include content/connection-modes.md %}

1. From your Segment UI’s Destinations page click on “Add Destination”.
2. Search for Help Scout within the Destinations Catalog and confirm the Source you’d like to connect to.
3. Copy your Help Scout API key and paste it into to the API Key field in your Segment settings for Help Scout. You can find your API Key on the Help Scout API keys page by navigating from the [Help Scout Dashboard](https://secure.helpscout.net/).

    If you need help finding your API key, simply click on the user icon in the upper-right corner, click 'Your Profile', and then 'Authentication' on the right. From there, just navigate to the 'API Keys' tab. On that page you can generate a new API key or grab your existing one. It should be 40 characters long, for reference.

4. Start sending events!

## Identify

If you haven't had a chance to review our spec, please take a look to understand what the [Identify method](https://segment.com/docs/spec/identify/) does. An example call would look like this:

    analytics.identify({
      userId: '019mr8mf4r',
      traits: {
        name: 'Kamala Khan',
        email: 'kkhan@colesacademic.edu',
      }
    });

You can use the Identify call to create or update customers in your Help Scout account.

A `name` and an `email` are required by Help Scout to complete the request. You can set the userId as the `email`, although this is [not recommended](https://segment.com/docs/spec/identify/#user-id). You can also specify `firstName` and `lastName` traits instead of a single `name` trait. You can learn more about which properties Help Scout will accept [here](https://developer.helpscout.com/help-desk-api/customers/create/).
