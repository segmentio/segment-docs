---
title: Criteo Audiences Destination
hide-personas-partial: true
hide-boilerplate: true
hide-dossier: false
id: 6238cec53a46dd187d094eb7
redirect_from:
  - "/connections/destinations/catalog/actions-criteo-audiences" 
---
{% include content/plan-grid.md name="actions" %}

Criteo Audiences (Actions) enables advertisers to send Segment Persona Audiences to Criteo using Criteo's Audience API.

By using Segment's Persona Audiences with Criteo, you can increase traffic and drive conversions with hyper-relevant ads that promote product discovery.

## Benefits of Criteo Audiences (Actions)

Benefits of the Criteo Audiences (Actions) destination include:
- **Improved email matching**: This integration creates a direct connection between Segment and Criteo for a higher match rate of email identifiers. 


- **Fewer settings**: Unlike Criteo's Filter destination, this destination doesn't require any copy and paste code. You only need your Advertiser ID and Criteo API credentials.

- **Criteo Audience**: You don't need a Criteo audience ID as the audience gets created on the fly using the Personas audience name. This enables the names of audience segments to be consistent across Segment and Criteo.

- **Batching events and support for large audiences**: This destination supports batching which enables Criteo to receive large audiences without discrepancies.

- **Near real time audience updates**: Actions destination helps Criteo receive real-time events and add or remove users from Criteo audiences appropriately.

## Getting Started

### Prerequisites:

Before connecting to the Criteo Audiences (Actions) destination, you must create a Criteo API Marketing Solutions app to generate your app credentials (client ID and secret) as per the guidelines in [Criteo's Developer's Portal](https://developers.criteo.com/marketing-solutions/docs/onboarding-checklist){:target="_blank"}.

You will also need your Criteo Advertiser ID. Please reach out to your Criteo Account Strategist to get this ID.

### To Add the Criteo Audiences Destination:

1. From your Segment workspace, go to **Connections > Catalog** and click **Destinations**.

2. Search for **Criteo Audiences** in the Destinations Catalog and select the destination.

3. Click **Configure Criteo Audiences**.

4. Choose your **Personas** space for the Source as this destination only supports sending Personas Audiences to Criteo.

5. On the **Settings** tab, name your destination. For example, `Criteo audiences – <audience name>`.

6. Enter your Criteo Advertiser ID, API client ID and client secret.

7. Click **Save Changes**.  

8. In the **Mappings** tab, click **New Mapping** and select **Add Users to Audience**. Don't change any defaults.

9. Under the **Configure actions fields**, set **Enable Batching** to *Yes* and click **Save**.  

7. Repeat steps 8 and 9 for **Remove Users from Audience**.

8. **Enable** both mappings.

9. Go to the **Settings** tab and **Enable** the destination.

10. Go to your **Personas** space and click the **Audiences** tab. Select the source audience that you want to send to your Criteo Audiences destination.

11. Click **Add Destinations** and select the Criteo Audience destination you created. In the settings that appear on the right-hand side, toggle the **Send Track** option on and disable **Send Identify**. Click **Save**. 

Your Criteo destination is now ready to receive audiences, and your Persona audiences now reflect in your Criteo Advertiser dashboard. Be aware, it takes 12-24 hours for the number of identifiers to populate in Criteo's Management Center.

> warning ""
> **NOTE**: You can connect **ONE** personas audience to a single instance of Criteo Audience destination. If you have multiple audiences, repeat the above process to create a new Criteo audience destination and connect the audience to new destination each time.

{% include components/actions-fields.html %}

## Legacy Destination

Please discontinue use of the legacy Criteo destination. Follow the steps above to define your Segment Persona Audiences to be sent to Criteo.
