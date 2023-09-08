---
title: Rokt Audiences (Actions) Destination
hide-personas-partial: true
hide-boilerplate: true
hide-dossier: false
private: true
hidden: true
beta: true
id: 643697130067c2f408ff28ca
redirect_from:
  - "/connections/destinations/catalog/actions-rokt-audiences" 
---
{% include content/plan-grid.md name="actions" %}

Rokt Audiences (Actions) destination enables advertisers to send Segment Persona Audiences to Rokt using Rokt's Audience API.

By using Segment's Persona Audiences with Rokt, you can increase the efficiency of your ad campaigns through suppression and targeting of existing or new customers. 

## Benefits of Rokt Audiences (Actions)

Benefits of the Rokt Audiences (Actions) destination include:
- **Improved email matching**: This integration creates a direct connection between Segment and Rokt for a 100% match rate of email identifiers. 

- **Easy setup**: This destination only requires your Advertiser API key.

- **Batching events and support for large audiences**: This destination supports batching which enables Rokt to receive large audiences without discrepancies.

- **Near real-time audience updates**: The actions destination helps Rokt receive real-time events and add or remove users from Rokt audiences appropriately.

## Getting started

### Prerequisites:

Before connecting to the Rokt Audiences destination, you must have an account with Rokt and receive your API key.

### Add the destination:
To add the Rokt Audiences (Actions) destination:

1. From your Segment workspace, go to **Connections > Catalog** and select the **Destinations** tab of the catalog.

2. Search for **Rokt Audiences (Actions)** and select the destination.

3. Click **Add destination**.

4. Select the space in Engage to use as the Source as this destination only supports sending Engage Audiences to Rokt.

5. On the **Settings** tab, enter the name of your destination. For example, `Rokt audiences – <audience name>`.

6. Enter your Rokt **API key**.

7. Click **Save Changes**.  

8. In the **Mappings** tab, select **+ New Mapping** and select **Add Users to Audience**. Don't change any defaults.

9. Under the **Configure actions fields**, set **Enable Batching** to *Yes* and click **Save**.  

7. Repeat steps 8 and 9 for **Remove Users from Audience**.

8. **Enable** both mappings.

9. Go to the **Settings** tab and select the toggle to **Enable** the destination.

10. Select your space, and navigate to **Engage > Audiences**. Select the source audience that you want to send to your Rokt Audiences (Actions) destination.

11. Click **Add Destinations** and select the Rokt Audience (Actions) destination you created. In the settings that appear on the right-hand side, toggle the **Send Track** option on and **Send Identify**. Click **Save**. 

Your Rokt Audiences (Actions) destination is now ready to receive audiences, and your Persona audiences are now accessible in your Rokt Advertiser dashboard. Keep in mind that it can take 12-24 hours for the first sync when the number of email identifies are in the millions. 

> warning ""
> You can only connect **one** Engage audience to a single instance of the Rokt Audience (Actions) destination. If you have multiple audiences, repeat the above process to create a new Rokt Audience (Actions) destination and connect the audience to a new destination each time.

{% include components/actions-fields.html %}