---
title: Google Enhanced Conversions Destination
strat: google
hide-boilerplate: true
hide-dossier: true
---

> info ""
> This document is about a feature that is in beta. This means that the destination is in active development, and some functionality may change before it becomes generally available.

> success ""
> **Good to know**: This page is about the [Actions-framework](/docs/connections/destinations/actions/) Google Enhanced Conversions Segment destination. 

The Google Enhanced Conversions destination enables you to improve the accuracy of your conversion measurement. You can supplement existing conversion tags by sending first-party customer conversion data from your website, such as email address, to Google Ads. Segment hashes this data and sends it in a privacy-safe way. Google matches hashed data with signed-in Google accounts to attribute the conversion to ad events, such as clicks or views. To learn more about Google Enhanced Conversions, see Google's documentation [About enhanced conversions](https://support.google.com/google-ads/answer/9888656?hl=en-GB){:target="_blank"}.

> warning "Before you begin"
> Enable Enhanced Conversions in your Google Ads account. For each Conversion, specify in the settings that you will use the Enhanced Conversions API:
> 1.  When you log in to Google Ads, make sure you are in [Expert Mode](https://support.google.com/google-ads/answer/9520605?hl=en){:target="_blank"}.
> 2. Click **Tools & Settings** in the top bar, and select **Conversions** from the dropdown. Select the **Conversion Action** you want Segment to log to.
> 3. Expand the tab for **Enhanced conversions**. Enable **Turn on enhanced conversions**. Under "To start, select how you want to set up enhanced conversions", select **API**.
> 
> When you authenticate your Segment workspace with your Google Account, use a Google Account that is a member of your Google Ads account.

## Getting started
1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Search for “Google Enhanced Conversions” in the Destinations Catalog, and select the destination.
3. Click **Configure Google Enhanced Conversions** in the top-right corner of the screen.
4. Select the source that will send data to Google Enhanced Conversions and follow the steps to name your destination.
5. On the **Settings** tab, enter the Conversion ID and click **Save**. Find the Conversion ID in your Google Ads account using the instructions in the article [Google Ads conversions](https://support.google.com/tagmanager/answer/6105160?hl=en){:target="_blank"}. When you log in to Google Ads, enable [Expert Mode](https://support.google.com/google-ads/answer/9520605?hl=en){:target="_blank"}. You'll follow these same instructions to get the Conversion label, which you'll need when you set up your first Mapping, below.
6. On the **Settings** tab, authenticate with Google using OAuth. Click **Connect to Google Enhanced Conversions**. Follow the prompts to authenticate using OAuth, with a Google login that is a member of the Google Ads account with Enhanced Conversions enabled.
7. Follow the steps in the Destinations Actions documentation on [Customizing mappings](/docs/connections/destinations/actions/#customizing-mappings).


{% capture conv_label %}
#### Find the Conversions label
Enter the Conversion Label. Find the Conversion Label using the instructions in the article [Google Ads conversions](https://support.google.com/tagmanager/answer/6105160?hl=en){:target="_blank"}.
{% endcapture %}

{% capture test_mapping %}
#### Test the Mapping
To test your mapping:
1. Expand the **Test event trigger** section. Segment searches for recent events that match the trigger conditions. If there are no recent events that match the criteria, click **manually enter an event**, and replace the default event data with the following:
```json
{
  "messageId": "segment-test-message-hkz2b",
  "timestamp": "2021-08-27T17:32:12.781Z",
  "context" : {
    "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
  },
  "type": "track",
  "properties": {
    "email": "test@example.org",
    "orderId": "123",
    "firstName": "Bob John",
    "lastName": "Smith",
    "phone": "14150000000",
    "address": {
      "street": "123 Market Street",
      "city": "San Francisco",
      "state": "CA",
      "postalCode": "94000",
      "country": "USA"
    }
  },
  "userId": "test-user-j75yud",
  "event": "Order Completed"
}
```
8. Click **Test Event**.
9. Scroll down and expand the **Send a test event** section, and click **Test Action**.
10. The section displays the test result and the payload that Google Enhanced Conversions returns to Segment.
11. Click **Save**.
12. Enable the Mapping with the toggle under the **Status** column.
{% endcapture %}

{% include components/actions-fields.html content1=conv_label section1="postConversion" content2=test_mapping section2="postConversion" %}
