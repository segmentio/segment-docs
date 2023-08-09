# 💥 Segment Partner Direct Destination Documentation Template

> Hi Partners 👋🏼
>
> Welcome to Segment - glad to have you onboard! This doc serves as a guideline for your team to create best-in-class documentation alongside your amazing product.
>
> Here are the guidelines we want you to have in mind when writing out your documentation:
>
> -   Be succinct and simple in your writing. Reduce text bloat where possible.
> -   Avoid 1st person language as it’s confusing for customers if they don’t know who wrote the docs (Segment or the Partner).
> -   Where pre-reading is required, hyperlink to other more generic parts of Segment’s (or your) documentation.
>
> -   Screenshots/Images are generally discouraged unless absolutely necessary
>
> The below template intends to provide a standardized structure. To submit your documentation, complete the following steps:
>
> 1. Fork and clone the `segment-docs` repo locally
> 2. Create a new branch (e.g., partner-name/destination)
> 3. Create an `index.md` file in the following path `src/connections/destinations/catalog/humanic-ai/index.md
> 4. Copy the template below into your `index.md` file, and edit it to be in line with how your integration operates
> 5. Add, commit, and push your code, then submit a pull request to the `segment-docs` repo
>
> If a section does not apply to your integration, feel free to remove. Please don’t create separate sections unless absolutely necessary. In most cases, creating a H3 (###) sub-heading under an existing section is the best option!
>
> If you have any questions in the meantime, please reach out to our team at partner-support@segment.com.

## Template begins here...

---

## title: Humanic Destination

> Include a 1-2 sentence introduction to your company and the value it provides to customers - updating the name and hyperlink. Please leave the utm string unchanged.

[Humanic](https://humanic.ai/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is revolutionizing the CRM space to make it easier than ever for growing companies to maximize revenue from their existing users. Humanic is the industry's first PLG CRM for today’s modern revenue teams. With support from top industry veterans at DoorDash, Notion, Miro, Canvas, MailChimp and more - there's no better time explore what Humanic can offer your business!

Managing upwards of 1000+ active users can be an overwhelming task, and many CRMs struggle to keep up with the influx. If you need a reliable system that allows for user sorting based on payment or user activity, it's time to consider more robust solutions than traditional customer relationship management software. Read on for details on how the Humanic PLG CRM can help unlock revenue from your existing user base. To Sign up and explore right away [click here](https://humanic.ai/signup?utm_source=segmentio&utm_medium=docs&utm_campaign=partners).

> Update your company name and support email address.

This destination is maintained by Humanic. For any issues with the destination, [contact the Humanic Support team](mailto:support@humanic.ai).

> Update your company name (x2) and support email address.

## Getting Started

> Do not remove this line. It will auto-populate the following information for your integration:

{% include content/connection-modes.md %}

> Include clear, succinct steps including hyperlinks to where customers can locate their API Key in your app. If there is an expected delay for a customer to see data flow into your integration, please make that explicit.

1. From the Destinations catalog page in the Segment App, click **Add Destination**.
2. Search for "Humanic" in the Destinations Catalog, and select the "Humanic" destination.
3. Choose which Source should send data to the "Humanic" destination.
4. Go to the [Humanic dashboard](https://dashboard.humanic.ai/dashboard/profile/){:target="\_blank"}, Go to the API Keys tab and generate an API key and copy it. 
5. Enter the "API Key" in the "Humanic" destination settings in Segment.

> For each of the following call types (Page, Screen, Identify, Track, Group), update:
>
> 1. Code snippet with relevant code sample including required traits or properties.
> 2. Your integration name.
> 3. What the corresponding call looks like within your platform (eg. Segment `page` call might be a `pageview` on your platform).
> 4. It can be helpful to describe _where_ data will appear (ie. Will `identify` calls appear within a Users dashboard as well as the Real-time dashboard of your platform?)
> 5. Any other important information for customer to note when sending through the events.

## Supported methods

Humanic.ai supports the following methods, as specified in the [Segment Spec](/docs/connections/spec).

### Page

Send [Page](/docs/connections/spec/page) calls to record which web pages users have visited. For example:

```js
analytics.page("Pricing", {
  title: "Segment Pricing",
  url: "https://segment.com/pricing",
  path: "/pricing",
  referrer: "https://segment.com/warehouses",
});
```

Segment sends Page calls to Humanic.ai as a `pageview`.

### Screen

Send [Screen](/docs/connections/spec/screen) calls to ecord which mobile app screens users have viewed. For example:

```obj-c
[[SEGAnalytics sharedAnalytics] screen:@"Home"
                            properties:@{ @"Feed Type": @"private" }];
```

Segment sends Screen calls to Humanic.ai as a `screenview`.

### Identify

Send [Identify](/docs/connections/spec/identify) calls to create new users or update existing users with new values. For example:

```js
analytics.identify('userId123', {
    email: 'john.doe@example.com',
});
```

Segment sends Identify calls to Humanic.ai as an `identify` event.

### Track

Send [Track](/docs/connections/spec/track) calls to record user behavior in your app. For example:

```js
analytics.track('Login Button Clicked');
```

Segment sends Track calls to Humanic.ai as a `track` event.

---

> Congratulations! 🎉 You’ve finished the documentation for your Segment integration. If there’s any additional information or nuance which did not fit in the above template and that you want to share with our mutual customers, feel free to include these as a separate section for us to review. If not, you may now submit this doc to our team via your designated Slack Channel and we’ll respond with updates when we publish it and your integration!

