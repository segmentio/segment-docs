---
title: Pinterest Destination
id: 59526d7f70a3e552b957555c
---
## Getting Started

When you enable the Pinterest Tag in the Segment web app, your changes appear in the Segment CDN in about 45 minutes, and then Analytics.js starts asynchronously loading Pinterest Tag's tracking snippet onto your page. This means you should remove Pinterest Tag's snippet from your page.
+ Pinterest Tag will automatically start tracking visits and the defined events located on Pinterest Tag's documentation.

Here's how you can get started with using the Pinterest Tag!


### **1. Log into the Pinterest business account.**

In order to access the Pinterest Tag, you will need to have a Pinterest business account. If you don't yet have one, sign up for one [here](https://ads.pinterest.com/).


### **2. From the Ads menu, select Conversions.**

<img src="images/conversions-menu.png">

This will redirect to your Pinterest tags menu.

![](images/conversions-page.png)

### **3. Find the Pinterest Tag ID.**

The Tag ID, if you have created one, is listed below the Tag Name.

If you haven't yet made a Pinterest tag, then select "Create Tag." Upon naming your new tag, you'll see the Tag ID under the Tag Name.


### **4. Activate the Pinterest Tag destination in Segment.**

Log into your Segment account, and go to the Destinations Catalog in the desired workspace and select the Pinterest Tag destination (located at `https://segment.com/<Your Workspace>/destinations/catalog/pinterest-tag`).

![](images/pinterest-tag-configure.png)

From there, select "Configure Pinterest Tag" and select the desired source to activate it for, and select "Confirm Source." The selected source will be loaded, and a sidebar will appear, asking for the Pinterest Tag ID.

![](images/pinterest-tag-activate.png)

Select that option and put in the Pinterest Tag ID that we collected earlier. Select "Save." In addition, one can optionally bind Segment track event names to specified Pinterest Event names. Details on that are provided below. In addition, Segment Track call properties can be added to this list to also be sent to Pinterest. Once ready, select "Activate Destination." Our servers will build the latest CDN, and the Pinterest Tag will then load on the sites that use that source's Segment snippet!


## Segment Event Mapping to Pinterest Event Types

Segment automatically binds the following Segment events to the Pinterest [Event Types](https://developers.pinterest.com/docs/ad-tools/conversion-tag/?#eventcode):

+ (Segment Spec Event => Pinterest Tag Event Type)
+ Products Searched => Search
+ Product List Filtered => Search
+ Product Added => AddToCart
+ Order Completed => Checkout
+ Video Playback Started => WatchVideo
+ `.page() call with no category` => PageVisit
+ `.page() call with category` => ViewCategory

In the Segment.com Pinterest Tag destination settings, one can define their own events for Pinterest Tag's `Signup`, `Lead`, and `Custom` events. Any events sent that aren't bound to any of these events will still be sent as a Partner-defined event. However, they will not be available for conversion tracking; only for audience creation.

## Segment Event Mapping to Pinterest Event Data

Segment automatically binds the following properties to Pinterest [Event Data](https://developers.pinterest.com/docs/ad-tools/conversion-tag/?#event-data-in-javascript):

+ (Segment Spec Property => Pinterest Tag Event Data)
+ query => search_query
+ order_id => order_id
+ coupon => coupon
+ value => value
+ currency => currency
+ `nested within the e-commerce products array: name` => product_name
+ `nested within the e-commerce products array: product_id` => product_id
+ `nested within the e-commerce products array: sku` => product_id
+ `nested within the e-commerce products array: category` => product_category
+ `nested within the e-commerce products array: variant` => product_variant
+ `nested within the e-commerce products array: price` => product_price
+ `nested within the e-commerce products array: quantity` => product_quantity
+ `nested within the e-commerce products array: brand` => product_brand

In the Segment.com Pinterest Tag destination settings, one can also define their own custom properties, in addition to the mapped properties above.

## Enable Enhanced Match

Segment supports Pinterest Enhanced Match in two scenarios:
1. where a user is already identified when they visit your site
2. when a user visits your site anonymously but is identified at some later point.

To support Pinterest Enhanced Match in the first scenario, go to the Pinterest Tag destination settings in the Segment web app, and click **Enable Enhanced Match to on Page Load**. This attaches the hashed email address on the initial page load conversion event. For more information see the [Pinterest enhanced-match documentation here](https://help.pinterest.com/en/business/article/enhanced-match).

To support the second scenario, where a user visits your site anonymously, but is identified at a later point, you do not need to change any of the Pinterest destination settings. Instead, you can make an `identify()` call with the user's email address, which triggers a Pinterest `set()` method. This saves the identification parameters so they can be sent with the next event, so it's important to `set` the values as early as possible.

> **Note**: Nothing appears in the network tab in your browser or in the tag helper extension after `set()` is called. However, a hashed value for an `'em'` parameter is added in the next event call, in a JSON object encoded in the URL. You can also see the email box in the tag helper extension.

If you use Segment's `identify()` method to enable Pinterest's Enhanced Match, you only collect this information for events _after_ you enable the setting. Pinterest does not retroactively update values for past events.
