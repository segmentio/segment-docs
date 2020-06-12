---
title: DoubleClick Floodlight Destination
---

## Getting Started

The DoubleClick Floodlight destination allows you to make calls directly to Floodlight based on your mapped events. All you have to do is drop in your **DoubleClick Advertiser ID** into your settings and map the Segment `track` events to their corresponding Floodlight tags.

If you'd like to send mobile data, this destination _requires_ you to send device specific information such as the `IDFA` or the `AdvertisingId` and thus you should send events using our **mobile** libraries. You can also send data from `analytics.js` and we will make direct HTTP requests to Doubleclick Floodlight from your browser.

## Track

In order to send `track` events to DoubleClick Floodlight, you **must** first create the Floodlight tags (**Sales** or **Counter**) inside your DoubleClick Campaign Manager and then map the Segment events to those tags inside Segment settings.

If you want to track custom properties, be sure to create [custom variables](https://segment.com/docs/connections/destinations/catalog/doubleclick-floodlight/#setting-up-custom-variables) inside DoubleClick Campaign Manager.

Once all the configurations are finished, whenever we receive a mapped Segment event, we will map the following properties and settings:

- `dc_rdid` will be set as `IDFA` or `AdvertisingId` (for mobile data only)
- `src` will be pulled from your destination settings
- `cat` and `type` will be pulled from your event mappings from the settings OR your top level **Activity Tag** and **Group Tag** settings
- `ord` for **counter** tags will be a random number to prevent browser caching
- `ord` for **sales** tags will be your whatever you define in your settings! (ie. `properties.order_id`) Include the `properties.` prefix to the key to ensure we can find the associated value in your `properties` object.
- `qty` for **sales** tags only we will sum the quantity of products in your `products` array property or fallback on top level `properties.quantity`
- `cost` for **sales** tags only we will send the `revenue`
- `u$` (if any) will be pulled from your property mapping setting
- `dc_lat` will be set to `0` or `1` depending on whether the device has **Limit Ad Tracking** enabled (for mobile data only)

**Important:** Floodlight requires that you [set a `User-Agent` header](https://cloudup.com/cDlD6KmuuOK) with that of the app where the track event took place. Our Android or analytics.js library automatically collects the `userAgent`. However, for iOS library you must manually send the user agent string inside the `context` object. If `context.userAgent` is not provided, we will try to generate a user agent string based on some device and operating system information that we *do* already collect.

Such generated user agent string might look something like this:

`Segment/1.0 (iPhone OS; CPU iPhone7,2; en-US) Apple; Version 8.1.3`

### Example

Assuming the below is an example Floodlight tag mapping:

![floodlight-tag-settings](images/c2HROpnXF5r+.png)

With the following `track` call:

```objective-c
[[SEGAnalytics sharedAnalytics] track:@"Free El"
                           properties:@{ @"show": @"Stranger Things", @"source": @"Netflix", @"greatestShowEver": YES }];
```

Will send the following `GET` request to DoubleClick Floodlight:

```
https://ad.doubleclick.net/ddm/activity/src=1234567;cat=fghij456;type=abcde123;dc_rdid=38400000-8cf0-11bd-b23e-10b96e4ddddd;u1=Stranger%20Things;u2=Netflix;u3=true;ord=1312312312;dc_lat=0
```

### Accessing Other Event Properties

By default, the Segment event property you define for each custom variable mapping will be matched against the property values found in the `properties` object of a `track` event. You can, however, use JSON style dot-notation-accessors wrapped in double curly brackets to map to **any** property in the event's raw payload to your custom variables. For example, some acceptable values could be `context.campaign.name`, `context.userAgent`, or `anonymousId` (inside of the double curly brackets). You can find the complete structure of a standard Segment event payload [here](/docs/connections/spec/common/#structure).

**Note:** `dc_rdid` and `dc_lat` will be automatically collected by our mobile libraries and `ord` will be uniquely generated for each event.

## Page

Our DoubleClick Floodlight destination also supports tracking named `page` events as conversions. In order to enable this functionality, follow the same steps laid out above for `track` events however, in the destination settings, input the conversion "event" name following this structure (where \[PAGE NAME\] is the `name` parameter you are passing to the Segment `page` event):

**Viewed** \[PAGE NAME\] **Page**

Here's an example for tracking a `page` event with the name **Confirmation**:

![page event as track event](images/page-event.png)

Make sure you enter the name case sensitively.

Reference our [docs](/docs/connections/sources/catalog/libraries/website/javascript/#page) for more on the `name` parameter.

### Pages with categories

If you are passing category names to `page` events you would like to track as conversions, you will need to slightly modify the event name you input into your destination settings. As opposed to **Viewed** \[PAGE NAME\] **Page**, you will need to input it as:

**Viewed** \[CATEGORY NAME\] \[PAGE NAME\] **Page**

For example, if you had a `page` event with the name as **Confirmation** that was being categorized as part of a group of **Checkout** pages, you would input:

**Viewed Checkout Confirmation Page**

Reference our [docs](/docs/connections/sources/catalog/libraries/website/javascript/#page) for more on the `category` paramter.

## Setting up Custom Variables

There are two things you need to do in order to send custom track properties as custom Floodlight variables. Firstly, refer to their [docs](https://support.google.com/dfa/partner/answer/2548879?hl=en) on how to create a custom variable inside DoubleClick:

Custom Floodlight variables use the keys u1=, u2=, and so on, and can take any values that you choose to pass to them. You can include custom Floodlight variables in any of your Floodlight activity tags and report on their values in Report Builder.

To create or edit a custom variable:

For each custom variable you want to create or edit, enter a Friendly Name, which is the name for the variable that is used in reports. For example, if you are using a custom variable to include users' ZIP codes in the Floodlight tags, you could use ZIP Code as the Friendly Name.

Choose the Type of custom variable you're creating. Choose string if you want the variable to include alphanumeric characters or special characters. The only characters you can't use are ", < and >. Choose number if you want to pass numeric values.

If you add Custom Floodlight Variables to a report as metrics, note that they will be summed in the report as if they are numeric values, even if the variables are actually strings. The string variables will display a value of 0.

Click Save.

## COPPA Compliance

DoubleClick Floodlight lets you set a parameter called `tag_for_child_directed_treatment` as either `0` or `1` if you want to mark a particular tag as coming from a user under the age of 13, under the [COPPA](https://www.ftc.gov/news-events/media-resources/protecting-consumer-privacy/kids-privacy-coppa) compliance.

If you want to set this flag, you can send an integration option namespaced as `coppaCompliant` with `true` or `false` (default):

```java

Analytics.with(context).track("Free El", new Properties().putValue("show", "Stranger Things").putValue("source", "Netflix").putValue("greatestShowEver", true), new Options().setIntegrationOptions("DoubleClick Floodlight", new ValueMap().putValue("coppaCompliant", true)));
```

> Note: This flag was previously called "copaCompliant" instead of "coppaCompliant". The method has been aliased to preserve the old functionality, and you do not need to update it if you used the old spelling.

## Sending Personally Identifiable Information (PII)

Do not map custom variables that are PII. Refer to the [warning](https://support.google.com/dfa/partner/answer/2548879?hl=en) by DoubleClick:

The terms of your DoubleClick contract prohibit passing any information to us that we could use or recognize as personally identifiable information (PII). If you enter certain key-values into a field in a DoubleClick product, you may see a warning that reminds you that you must not use key-values to pass data that we would recognize as PII. Key-values that trigger this warning include, for example, email and username. Note that it is okay to use these key-values if your purpose is not to collect information that DoubleClick could use or recognize as PII. (For example, email=weekly is fine, but passing a user's email address is not.) If you do choose one of these key-values, DoubleClick may contact you in the future to confirm that you are not using them in a way that is prohibited.
