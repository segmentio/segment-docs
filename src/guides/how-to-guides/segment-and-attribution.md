---
title: Segment's Role in Attribution 
---

At a higher level, attribution tools allow you to connect a specific campaign to user acquisition, giving you more visibility into campaign performance.  See [our destination catalog](https://segment.com/catalog) for list of attribution tools that Segment supports. 

There are three stages of mobile attribution as it relates to Segment. 

1.  Customer installs your app

2.  The install is attributed by an attribution provider (Adjust, AppsFlyer, etc)

3.  Attribution information is sent back to Segment


Here is a bit more information on what is happening at each of those stages. 

## Customer installs your app

When [lifecycle events](/docs/connections/spec/mobile/#lifecycle-events) are enabled, the **Application Installed** and **Application Opened** events are triggered on the first app open after the app is installed.  Note, if the app is deleted and then later reinstalled on the device, these events will be triggered again on first app open. 

**Situations where install counts look lower in Segment than in other tools. **

Some tools, like iTunes or Google Play, count install on download rather than on app open like Segment.  iTunes and Google Play is able to easily collect data on download but not as easily able to collect first-party data on app open. Whereas other tools, such as Segment, need their SDK to be loaded in app and initialized on app open before they are able to collect the install information. For example, if a user downloads your app but does not open it, the install will be counted in iTunes/Google Play but not counted in Segment or other tools.

**Situations where install counts look higher in Segment than in other tools**

Many tools deduplicate install data. Some tools only allow one install event per lifetime of deviceId. Others deduplicate by deviceId accepting only one install per UTC day.  Each and every tool is different.  

Segment, on the other hand, does not deduplicate.  We don't believe our role in your data pipeline should be deduping particular events.  In fact, there may be situations where you may want to account for multiple **Application Installed** events such as: user sells their phone, user uninstalls and later decides to reinstall, etc. It is better to think about the **Application Installed** data in your Segment warehouse as the raw source of data, giving you flexibility to query 

For more information on how installs are counted in different tools, here are a few resources from our partners: 

[Adjust - Discrepancies and Why Data Does not Always Match Up](https://www.adjust.com/blog/discrepancies-and-why-data-does-not-always-match-up/)

## The install is attributed by an attribution provider

### Device-Mode Connection

When you enable an attribution destination in device-mode, our integration code will also load that tool's SDK. Upon app launch, the destination's SDK will send install information which is then use to attribute that install to a campaign on their backend.  Segment loads the destination's SDK, but attribution happens outside of Segment. 

### Cloud-Mode Connection

Destination receives the **Application Installed** event and attributes the installation on their backend. 

## Attribution information is sent back to Segment

### Device-Mode Connection

For tools that support this, if you have enabled "Track Attribution Data" in your Segment dashboard, our integration listens to the attribution tool's SDK for a change in attribution state. **Note**: Not all device-mode attribution tools offer "Track Attribution Data" functionality.  See the settings section for a particular tool in your Segment dashboard for confirmation. 

When there is a change in attribution state, the integration code triggers an **Install Attributed** call to be sent back to your Segment source (and on to all other enabled destinations - in device and cloud-mode).  

Here is an example of how that call is triggered in the [AppsFlyer integration code](https://github.com/AppsFlyerSDK/segment-appsflyer-ios/blob/5e12550d63e98322409c7e6b9ce55137809ccf5b/segment-appsflyer-ios/Classes/SEGAppsFlyerIntegration.m#L150). This is the similar for other attribution providers such as [Adjust](https://github.com/segment-integrations/analytics-ios-integration-adjust/blob/e5197205b63aab95995f449f509e51d84d3d0cb2/Pod/Classes/SEGAdjustIntegration.m#L154). 

### Cloud-Mode Connection

For tools that support server-side postback, after install is attributed, an **Install Attributed** event is triggered and sent server-side to your Segment source and forwarded on to all enabled cloud-mode destinations. 

Example **Install Attributed** event: 

```js
analytics.track('Install Attributed', {
  provider: 'Tune/Adjust/AppsFlyer',
  campaign: {
    source: 'Network/FB/AdWords/MoPub/Source',
    name: 'Campaign Name',
    content: 'Organic Content Title',
    ad_creative: 'Red Hello World Ad',
    ad_group: 'Red Ones'
  }
});
```

For more detailed information on a particular attribution destination and functionality, see our [Destinations docs](https://segment.com/docs/connections/destinations/).
