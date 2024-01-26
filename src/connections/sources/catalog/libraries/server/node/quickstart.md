---
title: 'Quickstart: Node.js'
redirect_from: '/connections/sources/catalog/libraries/server/node-js/quickstart/'
strat: node-js
---

This tutorial will help you start sending data from your Node servers to Segment and any destination, using Segment's Node library. Check out the full documentation for [Analytics Node.js](/docs/connections/sources/catalog/libraries/server/node) to learn more.  

To get started with Analytics Node.js:
1. Create a Node.js source in the Segment app.
   1. Navigate to **Connections > Sources > Add Source**.
   2. Search for **Node.js** from the source catalog and click **Node.js**.
   3. Click **Add Source** again from the informational panel that appears to the right.
   4. Give the source a display name, and enter the URL the source will collect data from.
      * When you create a Source in the Segment web app, it tells the Segment servers that you'll be sending data from a specific source type. When you create or change a Source in the Segment app, Segment generates a new Write Key for that source. You use the write key in your code to tell the Segment servers where the data is coming from, so Segment can route it to your destinations and other tools.
2. Install the module.
   1. Run the following commands to install Segment:
       ```
        # npm
        npm install @segment/analytics-node
        # yarn
        yarn add @segment/analytics-node
        # pnpm
        pnpm install @segment/analytics-node
       ```

       This will add the Node library module to your `package.json`. The module exposes an `Analytics` constructor, which you need to initialize with your Segment project's **Write Key**, like so:

       ```javascript
        import { Analytics } from '@segment/analytics-node'
        // or, if you use require:
        const { Analytics } = require('@segment/analytics-node')

        // instantiation
        const analytics = new Analytics({ writeKey: '<YOUR_WRITE_KEY>' })
       ```

       This creates an instance of `Analytics` that you can use to send data to Segment for your project. The default initialization settings are production-ready and queue 20 messages before sending any requests. In development you might want to use [development settings](/docs/connections/sources/catalog/libraries/server/node#development).
3. Identify Users.

    * **Note:** For any of the different methods described in this quickstart, you can replace the properties and traits in the code samples with variables that represent the data collected.


    The `identify` method is how you tell Segment who the current user is. It includes a unique User ID and any optional traits you know about them. You can read more about it in the [identify reference](/docs/connections/sources/catalog/libraries/server/node#identify). Here's what a basic call to `identify` might look like:

    ```js
    analytics.identify({
      userId:'f4ca124298',
      traits: {
        name: 'Michael Bolton',
        email: 'mbolton@example.com',
        createdAt: new Date('2014-06-14T02:00:19.467Z')
      }
    });
    ```

    This identifies Michael by his unique User ID (the one you know him by in your database) and labeling him with `name` and `email` traits. When you're using the Node library, you don't need to identify a user on every request they make to your servers. Instead, Segment recommends calling `identify` a single time when the user's account is first created, and only identifying again later when their traits change.
4. Track Actions.

    Segment recommends tracking just a few important events. You can always add more later. You should track events that are indicators of success for your site, like **Signed Up**, **Item Purchased** or **Article Bookmarked**.

    <br> The `track` method is how you tell Segment about which actions your users are performing. Every action triggers what Segment calls an "event", which can also have associated properties. You can read more about `track` in the [track reference](/docs/connections/sources/catalog/libraries/server/node#track).

    Here's what a call to `track` might look like when a user signs up:

    ```js
    analytics.track({
      userId:'f4ca124298',
      event: 'Signed Up',
      properties: {
        plan: 'Enterprise'
      }
    });
    ```

    This tells Segment that your user just triggered the **Signed Up** event and chose your hypothetical `'Enterprise'` plan. Properties can be anything you want to record, for example:

    ```js
    analytics.track({
      userId:'f4ca124298',
      event: 'Bookmarked Article',
      properties: {
        title: 'Snow Fall',
        subtitle: 'The Avalanche at Tunnel Creek',
        author: 'John Branch'
      }
    });
    ```

After you've added a few `track` calls, you've successfully installed analytics tracking on your servers. Now you're ready to turn on any destination from the Segment app.

---

## What's Next?

You can check out the full docs for [Analytics Node.js](/docs/connections/sources/catalog/libraries/server/node) to see what else is possible, or read about the [Tracking API methods](/docs/connections/sources/catalog/libraries/server/http/) to get a sense for the bigger picture.

You can also consider installing [Analytics.js](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/) so that you can use destinations that require being loaded in the browser, like live chat tools or user feedback systems.
