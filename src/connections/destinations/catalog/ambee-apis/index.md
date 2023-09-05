---
title: "Ambee"
hidden: true
beta: true
id: 
---

{% include content/plan-grid.md name="actions" %}

Ambee provides self-serve predictive analytics for businesses,
using machine learning to automate audience insights and
recommendations based on climate and environmental datasets. Ambee
offers actionable air quality and pollen data that can reinforce your
climate strategy, simplify personalization and enhance business
outcomes.

This destination is maintained by Ambee. For any issues with the
destination, contact Ambee's [Support
Team](https://support.getambee.com/portal/en/home){:target="_blank"}.

{% include content/ajs-upgrade.md %}

## Getting started


1. From the **Segment** web app, click **Catalog**, then click
**Destinations**.
2. Find the **Destinations Actions** item in the left navigation, and click
it.
3. Click Configure **Ambee**
4. Select an existing Source to connect to **Ambee** (Actions).

{% include components/actions-fields.html %}

## Settings

### Segment write key

The write key is a unique identifier for each Source. It lets Segment
know which Source is sending the data and which destinations should
receive that data.

To find a write key, you first need to create a non-cloud Source such as
a website, server, or mobile source.

Then, in the Source, navigate to **Settings** > **API Keys**.


### API Key

To start working with Ambee as your destination, you'll need
Ambee's API Key. Sign up for Ambee [here](https://auth.ambeedata.com/users/register?redirectUrl=https://api-dashboard.getambee.com){:target="_blank"}.

Once you are signed in, you will get your limited-period API key on the
dashboard's homepage. If your use case requires data in bulk, you'll
need to subscribe to Ambee's [enterprise
plan](https://www.getambee.com/pricing){:target="_blank"}. During
subscription, you'll need to specify your choice of API: **air quality**
and/or **pollen**.

After subscription, you can use Ambee's air quality and/or pollen data
by pasting your API key under **the API Key section** in **Mapping**.

## Ambee Destination Mapping

### Ambee Air Quality Subscription

Ambee's air quality subscription helps you personalize and position your
messaging via emails, SMS, and push notifications to improve user
engagement on your website based on air quality triggers for locations
across the world. You can also retarget messaging based on your user's
geo-location, for example:

- Promote the sale of your EVs in highly polluted areas

- Advertise anti-pollution products like masks, skincare, and more, during highly polluted durations

- Showcase ads for smart air purifiers in highly polluted localities

The table below shows the AQI risk levels, their associated value, and
what each category means for the public. Ambee uses globally valid data
that follows US EPA standards to provide relevant recommendations. If
you are subscribed to **air quality** you can select the risk levels
for AQI from the drop-down box under **the air quality** section.

  | AQI risk levels     | Index Values    | What it means               |
  |---------------------|-----------------|-----------------------------|
  | Good                | 0-50            | Air quality is good and poses little or no risk.                 |
  | Moderate            | 51-100          | Air quality is acceptable; however, there may be some health concerns for a small number of extremely sensitive people.   |
  | Unhealthy for sensitive groups | 101-150 | When air quality is in this range, people in sensitive groups may experience health effects when engaging in outdoor activities.           |
  | Unhealthy           | 151-200         | When air quality is in this range, everyone who is active outdoors may experience effects. Members of sensitive groups are likely to experience more serious effects.   |
  | Very unhealthy      | 201-300         | When air quality is in this range, it is expected that there will be widespread effects among general population and more serious effects in members of sensitive groups.  |
  | Hazardous           | 301-500         | Air quality in this range triggers health warnings of emergency conditions. The entire population is more likely to be affected by serious health effects.          
  
### Ambee Pollen Subscription

Ambee's pollen subscription helps you contextualize and hyper-target
your marketing and advertising campaigns with emails, SMS, and push
notifications to improve user engagement with the help of pollen
triggers for locations across the world. You can also personalize your
ad content based on the user's geolocation, for example:

- Advertise anti-allergy tissues based on high pollen condition

- Promote OTC medicines to allergy sufferers

The risk levels below are recommended by NAB to understand the risks
they are exposed to, and it helps them take preventative measures to
reduce their exposure to pollen. Ambee uses the NAB-compliant index to
provide accurate insights. If you are subscribed to **pollen**, you can
select the risk levels for pollen from the drop-down box under the
**pollen** section.

| Risk Level    | Tree    | Grass     |   Weed      | What it means   |
|---------------|---------|-----------|-------------|-----------------|
| Low           | 0-95    | 0-29      | 0-20        | Individuals susceptible to pollen may experience mild allergic symtoms.        |
| Moderate      | 96-207  | 30-60     | 21-77       | Many individuals sensitive to pollen may experience allergic symptoms.            |
| High          | 208-703 | 61-341    | 78-266      | Most individuals with any sensitivity to pollen will experience allergic symptoms. Extremely sensitive groups could experience serious symptoms.    |
| Very High     | 704+    | 342+      | 267+        | Almost all individuals with any sensitivity to pollen will experience symptoms.     |

### IP Address

Ambee will fetch the user's IP address to trigger air quality and/or
pollen notifications for device mode with analytics.js or mobile
(android/iOS).
