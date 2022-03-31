---
title: Criteo Audiences (Actions) Destination
hide-personas-partial: true
hide-boilerplate: false
hide-dossier: true
id:
---
Criteo Audiences (Actions) enables advertisers to send Segment Persona Audiences seamlessly to Criteo using Criteo's Audience API.

By leveraging Segment's Persona Audiences with Criteo, you have the opportunity to get traffic and drive conversions from new and existing customer as well as re-engaging existing customers with hyper-relevant ads that promote product discovery.

# Benefits of Criteo Audiences (Actions)

This new integration creates a direct connection between Segment and Criteo for a higher match rate of email identifiers.  

- **Fewer settings**: Unlike our Filter destination, this destination does not require any custom copy and paste code. All that is needed is Advertiser id and Criteo API credentials.

- **Criteo Audience**: creation on the Fly: You do not need a Criteo audience id as the audience gets created on the fly using the Personas audience name. That way audience segment names are consistent across the two platforms Segment and Criteo.

- **Batching events and support for large audiences**: This destination supports batching which enables Criteo to receive large audiences without discrepancies.

- **Near real time audience updates**: Actions destination helps Criteo receive real time events and add or remove users from Criteo audiences appropriately.

# Getting Started

### Prerequisites:

Before connecting to Criteo Audiences (Actions) destination, you must create a Criteo API Marketing Solutions app to generate your app credentials (client id and secret) as per the guidelines in [Criteo's Developer's Portal](https://developers.criteo.com/marketing-solutions/docs/onboarding-checklist).  

You will also need your Criteo Advertiser ID. Please reach out to your Criteo Account Strategist to get this ID.

### To Add the Criteo Audiences Destination:

1. From your Segment workspace, go to **Connections > Catalog** and click Destinations.

2. Search for **Criteo Audiences** in the Destinations Catalog and select the destination.

3. Click **Configure Criteo Audiences** in the top-right corner of the screen.

4. Source should be your **Personas** space as this destination only supports sending Personas Audiences to Criteo.

5. On the **Settings** tab, name your destination appropriately, for example, Criteo audiences – <audience name>. Enter your Criteo Advertiser ID, API client id and client secret. Hit **Save Changes**.  

6. In the **Mappings** tab, click **New Mapping** and select **Add Users to Audience**. Do not change any defaults. Under **Configure Actions Fields**, set **Enable Batching** to **Yes** and hit **Save**.  

7. Repeat the same process for **Remove Users from Audience**.

8. **Enable** both mappings. You can then **Enable** the destination from **Settings** tab.

9. You can now go to your **Personas space > Audiences** tab and select the source audience that you want to send to your newly created Criteo Audiences destination.

10. Click **Add Destinations** and select the newly created destination. On the settings that appear on the right-hand side, toggle **Send Track** option on and disable **Send Identify**. Hit **Save**.  

Your Criteo destination should be ready to receive audiences!


>**NOTE**:
> Currently, you can only connect **ONE** personas audience to a single instance of Criteo Audience destination. If you have multiple audiences, repeat the above process to create a new Criteo audience destination and connect the audience to new destination each time.

# Legacy Destination

Please discontinue use of the legacy Criteo destination. Follow the steps above to define your Segment Persona Audiences to be sent to Criteo.
