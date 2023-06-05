---
title: VWO Cloud Mode (Actions) Destination
hide-boilerplate: true
hide-dossier: false
id: 63bedc136a8484a53739e013
versions:
  - name: 'VWO Web Mode (Actions)'
    link: '/docs/connections/destinations/catalog/actions-vwo-web/'
---

{% include content/plan-grid.md name="actions" %}

[VWO](https://vwo.com/){:target="_blank"} is an optimization platform that allows websites to run experiments on their platforms to derive insights from visitor behavior and harness the results to amp up the conversion rate. Apart from experimentation, it also provides for personalization of the platform for different cohorts, full stack implementation, and direct deployment of the changes determined through experimentation.

> info ""
> The events and attributes that are transferred from Segment to your VWO account will appear under [UNREGISTERED EVENTS](https://help.vwo.com/hc/en-us/articles/8676443712537-Working-with-Events-in-VWO#:~:text=UNREGISTERED%20EVENTS%3A%20These%20are%20the,UNREGISTERED%20EVENTS.){:target="_blank"} and [UNREGISTERED ATTRIBUTES](https://help.vwo.com/hc/en-us/articles/8681465703705-Working-with-Attributes-in-VWO#:~:text=UNREGISTERED%20ATTRIBUTES%3A%20These%20are%20the,UNREGISTERED%20ATTRIBUTES.){:target="_blank"} sections, respectively. You need to save these events and attributes to VWO for further use.

## Benefits of VWO Cloud Mode(Actions) vs VWO Classic

VWO Cloud Mode (Actions) provides the following benefits over the classic VWO destination:

- **Support for Customer Data Platform (Data360)**. With the cloud mode enabled, you will be able to transfer all the events and attributes into your VWO account through the [Data360 module](https://help.vwo.com/hc/en-us/articles/8679651827737-About-VWO-Data360){:target="_blank"}.
- **Support for FullStack**. While the classic destination was serving only websites, the cloud mode can provide for server sources, as well.

## Getting started

1. From the Segment web app dashboard, navigate to **Connections > Catalog**.
2. Under the **Destinations** tab, search for “VWO Cloud Mode (Actions)”, and select the destination.
3. Click **Configure VWO Cloud Mode (Actions)**.
4. Select the source that will send data to VWO Cloud Mode (Actions), click **Next** to enter the name of your destination, and click Save.
5. On the **Settings** tab, under **Other Settings**, click on **Account ID**, enter your VWO account ID, and click **Save**. 
6. To customize the mapping of actions, follow the steps in the Destinations Actions documentation on [Customizing mappings](/docs/connections/destinations/actions/#customize-mappings). Mappings in Segment allow you to control the events and attributes that are sent to VWO. 
7. Enable the destination using the toggle switch.

> info ""
> VWO requires you to include a `vwo_uuid` key for all calls made in cloud-mode. The value of this key must be the VWO UUID(in the case of a website) or the User ID (in the case of FullStack). Track and Page calls require the `vwo_uuid` in the *properties* object. For Identify calls, you can place `vwo_uuid` in the *traits* object.

## Using VWO Cloud mode destination with Web

> info ""
> VWO recommends using the [VWO Web Mode destination](/docs/connections/destinations/catalog/actions-vwo-web/) for web pages as it requires minimal to no additional setup.

1. Install the VWO SmartCode on your website following VWO's guide [Configuring SmartCode for Your Website](https://help.vwo.com/hc/en-us/articles/360019422834-Configuring-SmartCode-for-Your-Website){:target="_blank"}
2. Create a VWO campaign on your website.
3. When a visitor lands on your website VWO generates a `_vwo_uuid` cookie that acts as a unique identifier for the visitor. To learn more about the VWO UUID, see VWO's article [How to locate your VWO UUID](https://help.vwo.com/hc/en-us/articles/360034891513-How-to-Locate-your-VWO-UUID-){:target="_blank"}.
4. Pass the value of the `_vwo_uuid` cookie with every call to Segment in the `vwo_uuid` key. Track and Page calls require the `vwo_uuid` in the *properties* object. For Identify calls, you can place `vwo_uuid` in the *traits* object.<br><br>To automate this step, you can use [Segment Analytics.js middleware](/docs/connections/sources/catalog/libraries/website/javascript/middleware/) and use the following script on your website. This script fetches the VWO UUID from the cookie and adds it to the segment payload so that you don’t have to do the same manually.

```html
<script>
  analytics.addSourceMiddleware(({ payload, next, integrations }) => {
    const getCookie = function (name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    };
    const event = payload.obj;
    const vwoUuid = getCookie("_vwo_uuid");
    switch (event.type) {
      case "track":
      case "page":
        payload.obj.properties.vwo_uuid = vwoUuid;
        break;
      case "identify":
        payload.obj.traits.vwo_uuid = vwoUuid;
        break;
    }
    next();
  });
</script>
```

All the events triggered in Segment will be available under **UNREGISTERED EVENTS** in the **Data360 > Events** section in VWO.  For more information about Events in VWO Data360, see VWO's article [Working with Events in VWO](https://help.vwo.com/hc/en-us/articles/8676443712537-Working-with-Events-in-VWO){:target="_blank"}.


## Use VWO Cloud mode destination with VWO FullStack

To use the VWO Cloud mode destination with the VWO FullStack suite, link your VWO FullStack environment with Segment using the environment’s SDK key. After that's done, integrate your VWO account with Segment.

To link your VWO FullStack environment with Segment:

1. From your VWO dashboard, navigate to the nav bar on the left > **FullStack > Projects** and select the appropriate project.
2. Under the **Environments** section, click the **Copy** button corresponding to the environment that you want to link to Segment.
3. In the **VWO SDK Key** field in the destination settings in Segment, paste the copied SDK key from the previous step.
4. Click **Save Changes**.

To integrate Segment with VWO FullStack:

1. Initialize VWO FullStack SDK. Follow the steps for your server in VWO's [Quick Start Guide](https://developers.vwo.com/docs/quick-start-guide){:target="_blank"}.
2. To track visitors in VWO, provide the user IDs of the visitors, which were used to track them in the VWO FullStack campaign. Pass that same User ID as `vwo_uuid` with all calls to Segment. Track and Page calls require the `vwo_uuid` in the *properties* object. For Identify calls, you can place `vwo_uuid` in the *traits* object.. 
3. All the events triggered in Segment will be available under **UNREGISTERED EVENTS** section which can be accessed by navigating from the left navbar > **Data360 > Events**.

## Supported Segment Calls in VWO

VWO Supports the following calls, as specified in the [Segment Spec](/docs/connections/spec/).

### Track
The [Track](/docs/connections/spec/track/) call records any actions your visitors perform, along with any properties that describe the action. Each action is known as an event. 

The destination forwards these events to VWO Data360 where they can be seen under the **UNREGISTERED EVENTS** section in **Data360 > Events** in VWO. These events can be registered and used as [Metrics](https://help.vwo.com/hc/en-us/articles/8675547113625-Working-with-Metrics-in-VWO){:target="_blank"} in VWO.

**Sample payload for Track Call to the destination**

```js
analytics.track("Segment Test Event", {
	"vwo_uuid": "<VWO UUID or User ID>",
	"property1": "value1"
});
```

**Corresponding JavaScript event that would generate the above payload**

```js
{
  "type": "track",
  "event": "<Event Name>",
  "properties": {
    "vwo_uuid": "<VWO UUID or User ID>",
    "property1": "value1"
  }
}
```

> info ""
> Event names are prepended with `segment.` before they're sent to VWO. If an event named "**ctaClick**" is triggered in Segment, it appears as `segment.ctaClick` under **UNREGISTERED EVENTS** in VWO.

### Identify
The [Identify](/docs/connections/spec/identify/) call associates a visitor with their actions and captures their traits. 

The destination forwards these traits to VWO Data360 where they can be seen under the **UNREGISTERED ATTRIBUTES** section in the **Data360 > Attributes** in VWO. These attributes can be registered and used to create [segments in VWO](https://help.vwo.com/hc/en-us/articles/8976459309465-Working-with-Segments-in-VWO-Data360){:target="_blank"}. For more information about Attributes in VWO Data360, see [Working with Attributes in VWO](https://help.vwo.com/hc/en-us/articles/8681465703705-Working-with-Attributes-in-VWO){:target="_blank"}.

**Sample payload for Identify call to the destination**

```js
{
  "type": "identify",
  "traits": {
    "vwo_uuid": "<VWO UUID or User ID>",
    "trait1": "value1"
  }
}
```

**Corresponding JavaScript event that would generate the above payload**

```js
analytics.identify({
	"vwo_uuid": "<VWO UUID or User ID>",
	"trait1": "value1"
});
```

> info ""
> Each trait key will be prepended with “**segment.**” before sending to VWO. So if a trait named "**trait1**" is sent in Segment, it’ll appear as "**segment.trait1**" under UNREGISTERED ATTRIBUTES in VWO.


### Page
The [Page](/docs/connections/spec/page/){:target="_blank"} call records when a visitor arrives at a page of your website, along with any optional properties about the page. When received, the destination triggers VWO’s Page Visit event.

> info ""
> Use Page calls with web pages only. Server-side sources in VWO's FullStack Suite do not support the Page Visit event.

**Sample payload for Page Call to the destination**

```js
{
  "type": "page",
  "properties": {
    "vwo_uuid": "<VWO UUID or User ID>"
  }
}

```

**Corresponding JavaScript event that would generate the above payload**

```js
analytics.page({
	"vwo_uuid": "<VWO UUID or UserID>",
});
```
<!-- The line below renders a table of connection settings (if applicable), Pre-built Mappings, and available actions. -->

{% include components/actions-fields.html %}
