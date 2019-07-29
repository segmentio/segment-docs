---
title: WordPress Plugin [Deprecated]
hidden: true
---

Our WordPress plugin lets you record analytics from your WordPress site. It uses the client-side [Analytics.js](/docs/sources/website/analytics.js) routing and takes only a minute to setup!

The plugin automatically collects page views and identifies users when they log in. You'll have a basic analytics set up without a single line of code.

Our plugin even tracks [WooCommerce](/docs/sources/website/guides/woocommerce) and [WP eCommerce](/docs/sources/website/guides/wp-ecommerce) events automatically following our [E-Commerce Tracking Guide](/docs/spec/ecommerce/v2/).

---

{% include content/deprecated.md %}

The current version of this plugin should be free of bugs but any existing and future development will be paused for the time being.

## Getting Started

Installing our WordPress plugin is really quick:

1. Go to the **Plugins > Add New** page in your WordPress admin.
2. Search for **Segment** and install **Analytics for WordPress - by Segment**.
3. Click **Activate Plugin**.
4. Click the plugin's **Settings** button and enter your Segment source's **Write Key** into the field and hit save.

That's it, you're done! You'll automatically be identifying users and recording their actions as they move around your WordPress site.

Now just turn on any of our destinations on your destinations page and we'll start sending your data to them for you!


## Common Questions


### What user information does it record automatically?

We automatically track a `Logged In` event, as well as identify users that are logged in to your WordPress site, and we record their `name`, `email`, `username`, and `website`, so you don't need to write any special code to handle that yourself. We also identify commenters if we can.


### Which actions does it record automatically?

Just by installing the plugin, without touching any code, we'll already be recording events based on the different types of pages the user visits:

<table>
  <tr>
    <td>`Viewed Home Page`</td>
    <td>When the user views your home page, whether it's a static page or a list of recent posts.</td>
  </tr>
  <tr>
    <td>`Viewed Post`</td>
    <td>When the user views a post. If they're viewing a custom post type, we'll use it's name instead.</td>
  </tr>
  <tr>
    <td>`Viewed Author Page`</td>
    <td>When the user views an archive of posts by a specific author.</td>
  </tr>
  <tr>
    <td>`Viewed Category Page`</td>
    <td>When the user views an archive of posts in a specific category.</td>
  </tr>
  <tr>
    <td>`Viewed Tag Page`</td>
    <td>When the user views an archive of posts with a specific tag.</td>
  </tr>
  <tr>
    <td>`Viewed Search Page`</td>
    <td>When the user views the search results page.</td>
  </tr>
</table>

We also automatically add useful properties to the events when applicable. For example, the `Viewed Search Page` event includes a `query` property of what the user searched for.


## Custom Events

For the most basic install, you're already good to go. But if you want to add your own custom tracking to your WordPress code, there are two ways to do it. You can either add javascript directly, or you can use the global PHP `Analytics` object, which will just render the necessary javascript into your WordPress page.

Here's the javascript you would add to track a custom event:

```javascript
analytics.track('Played a Song', {
  seconds: 268,
  artist: 'Kanye West'
});
```

If you prefer to write in PHP in WordPress template, here's the PHP code to track the exact same custom event:

```php
Analytics::track('Played a Song', array(
  'seconds' => 268,
  'artist' => 'Kanye West'
));
```

<table>
  <tr>
    <td>`event` _String_</td>
    <td>The name of the event you're tracking. We recommend using human-readable names like `'Played a Song'` or `'Updated Status'`.</td>
  </tr>
  <tr>
    <td>`properties` _Array, optional_</td>
    <td>An array of properties for the event. If the event was `'Add Product'`, it might have properties like `'price'`, `'product_type'`, etc.</td>
  </tr>
</table>
