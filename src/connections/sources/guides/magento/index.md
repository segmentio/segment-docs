---
title: Magento Plugin [Deprecated]
hidden: true
---

Our Magento extension lets you send your ecommerce analytics data to [any of our destinations](/docs/destinations) without writing any code yourself. You can be up an running with a complete ecommerce tracking setup in minutes!

The extension automatically collects information about the customer, which pages they visit, which products they add and remove from their cart, and which orders they complete.

{% include content/deprecated.md %}

The current version of this plugin should be free of bugs but any existing and future development will be paused for the time being. We recommend exploring and using third party alternatives.

## Getting Started

The recommended way to install the Magento extension is via the Magento Connect marketplace:

  1. Inside your Magento Admin navigate to **System > Magento Connect > Magento Connect Manager**.
  2. Re-enter your login credentials.
  3. Under the **Install New Extensions** section, paste this key: `http://connect20.magentocommerce.com/community/analytics`
  4. Click the **Install** button, and the plugin should install automatically.
  5. Go back to your main Magento Admin, an navigate to **System > Configuration**.
  6. Choose the **General > Analytics** section from the sidebar.
  7. Expand the **Segment** section of the page, and paste in your source's **Write Key** and click **Save Config**.

That's it, you're done! You'll automatically be identifying customers and recording their actions as they move around your Magento store.

Now just turn on any of our destinations in Segment on your destinations page and we'll start sending your data to them for you!


## Common Questions

### What customer information does it record automatically?
We automatically identify customers that are logged in to your Magento store with all of the information stored about them in the Magento database. This includes fields like `first_name`, `last_name`, `email`, `gender`, etc.

### Which actions does it record automatically?
Just by installing the plugin, without touching any code, we'll already be recording events when the customer visits your store's pages, and when they perform certain Ecommerce-specific actions:

<table>
  <tr>
    <td>`Viewed Product`</td>
    <td>When the customer views a product listing.</td>
  </tr>
  <tr>
    <td>`Viewed Product Reviews`</td>
    <td>When the customer views the reviews for a specific product.</td>
  </tr>
  <tr>
    <td>`Added Product`</td>
    <td>When the customer adds a product to their shopping cart.</td>
  </tr>
  <tr>
    <td>`Removed Product`</td>
    <td>When the customer removes a product from their shopping cart.</td>
  </tr>
  <tr>
    <td>`Reviewed Product`</td>
    <td>When the customer submits a review for a product.</td>
  </tr>
  <tr>
    <td>`Wishlisted Product`</td>
    <td>When the customer adds a product to their wishlist.</td>
  </tr>
  <tr>
    <td>`Order Completed`</td>
    <td>When the customer completes an order.</td>
  </tr>
  <tr>
    <td>`Registerd`</td>
    <td>When the customer signs up for an account.</td>
  </tr>
  <tr>
    <td>`Logged In`</td>
    <td>When the customer logs in to their account.</td>
  </tr>
  <tr>
    <td>`Logged Out`</td>
    <td>When the customer logs out of their account.</td>
  </tr>
  <tr>
    <td>`Searched Products`</td>
    <td>When the customer searches for products.</td>
  </tr>
  <tr>
    <td>`Filtered Products`</td>
    <td>When the customer filters product listings.</td>
  </tr>
  <tr>
    <td>`Subscribed Newsletter`</td>
    <td>When the customer subscribes to your newsletter.</td>
  </tr>
</table>

We also automatically add useful properties to the events when applicable. For example, the `Order Completed` event includes information about each product in the order, and the `Searched Products` events includes a `query` property of what the customer searched for.


## Tracking Custom Events

For the most basic install, you're already good to go. If you'd like to add your own custom tracking to your Magento store, you can add Javascript directly to any page.

Here's the Javascript you would add to track a custom event:

```javascript
analytics.track('Shared Product', {
  platform: 'Facebook',
  name: 'Diplomacy',
  category: 'Toys & Games',
  manufacturer: 'Avalon Hill',
  price: 22.68
});
```

<table>
  <tr>
    <td>`event` _String_</td>
    <td>The name of the event you're tracking. We recommend using human-readable names like `'Played Song'` or `'Updated Status'`.</td>
  </tr>
  <tr>
    <td>`properties` _Object, optional_</td>
    <td>An array of properties for the event. If the event was `'Shared Product'`, it might have properties like `'price'`, `'category'`, etc.</td>
  </tr>
</table>
