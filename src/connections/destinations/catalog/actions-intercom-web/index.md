---
title: Intercom Web (Actions) Destination
hide-boilerplate: true
hide-dossier: false
id: 62d9daff84a6bf190da9f592
hide_action:
  - id: 5W984Qq59XEQnFYKXKHGeZ
    name: "Update User"
  - id: nqdBJoXJwFrzwoL1y45LYt
    name: "Update Company"
versions:
  - name: 'Intercom Cloud Mode (Actions)'
    link: '/docs/connections/destinations/catalog/actions-intercom-cloud'
  - name: 'Intercom (Classic)'
    link: '/docs/connections/destinations/catalog/intercom'
---

{% include content/plan-grid.md name="actions" %}

Intercom is a customer communications platform that shows you who is using your product. Intercom allows you to personally communicate with your users with targeted content, behavior-driven messages, and conversational support.

When you use the Intercom Web (Actions) destination, Segment loads the [Intercom JavaScript library](https://developers.intercom.com/installing-intercom/docs/intercom-for-web){:target="_blank"} for you. The Intercom library enables you to track your user’s events on your website and interact with the Intercom messenger window.

## Benefits of Intercom Web Mode (Actions) vs Intercom Classic
Intercom Web (Actions) provides the following benefits over the classic Intercom destination:

- **Fewer settings.** Data mapping for actions-based destinations happens during configuration, which eliminates the need for most settings.
- **Clearer mapping of data.** Actions-based destinations enable you to define the mapping between the data Segment receives from your source, and the data Segment sends to the destination.
- **Granular control over data sent.** You can customize the conditions under which the events are sent to Intercom.
- **Selectively shows the Intercom chat widget.** 

## Getting Started

1. From the Segment web app, navigate to **Connections > Catalog**.
2. Search for **Intercom Web (Actions)** in the Destinations Catalog, and select the destination.
3. Click **Configure Intercom Web (Actions)**.
4. Select the web source that will send data to Intercom Web (Actions) and follow the steps to name your destination. The web source chosen must use [Analytics.js 2.0](/docs/connections/sources/catalog/libraries/website/javascript/).
5. On the **Settings** tab, input your Intercom App ID and other destination settings.
6. Follow the steps in the Destinations Actions documentation on [Customizing mappings](/docs/connections/destinations/actions/#customizing-mappings).
7. Enable the destination and configured mappings.

### Custom Launcher 

By default, the Intercom chat widget is displayed on the bottom right of your browswer window on page load, but you can customize the chat widget to launch only after a user clicks a specific button, link, or element instead by providing your own CSS selector. For example, you can trigger the Messenger to open when a customer clicks on your ‘Talk to us’ button or chat icon. 

1. Go to your settings for your Intercom destination in your Segment workspace and find **Custom Inbox Button Selector**
2. Change the default value from `#IntercomDefaultWidget` to the ID of the element you specify instead (e.g. `#my_custom_link`)
3. Go to your Intercom workspace and locate your **Messenger & Omnichannel** settings
4. Click the **Messenger** settings and disable the **Show the Messenger Launcher** setting by toggling it off 

> success ""
> **Tip**! You can specify multiple links by passing a class instead (e.g., `.my_custom_class_name`)

{% include components/actions-fields.html settings="true"%}
