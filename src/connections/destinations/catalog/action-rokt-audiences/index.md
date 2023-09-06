---
title: Rokt Audiences (Actions) Destination
hide-personas-partial: true
hide-boilerplate: true
hide-dossier: false
id: 
redirect_from:
  - "/connections/destinations/catalog/actions-rokt-audiences" 
---
{% include content/plan-grid.md name="actions" %}

Rokt Audiences enables advertisers to send Segment Persona Audiences to Rokt using Rokt's Audience API.

By using Segment's Persona Audiences with Rokt, you can increase the efficieiny of your ad campaigns through suppression and targeting of existing or new customers. 

## Benefits of Rokt Audiences (Actions)

Benefits of the Rokt Audiences (Actions) destination include:
- **Improved email matching**: This integration creates a direct connection between Segment and Rokt for a 100% match rate of email identifiers. 

- **Easy setup**: This destination only requires your Advertiser API key.

- **Batching events and support for large audiences**: This destination supports batching which enables Rokt to receive large audiences without discrepancies.

- **Near real-time audience updates**: The actions destination helps Rokt receive real-time events and add or remove users from Rokt audiences appropriately.

## Getting Started

### Prerequisites:

Before connecting to the Rokt Audiences destination, you must have an account with Rokt and receive your API key.

### Add the destination:
To add the Rokt Audiences (Actions) destination:

1. From your Segment workspace, go to **Connections > Catalog** and click **Destinations**.

2. Search for **Rokt Audiences** in the Destinations Catalog and select the destination.

3. Click **Configure Rokt Audiences**.

4. Select the space in Engage to use as the Source as this destination only supports sending Engage Audiences to Rokt.

5. On the **Settings** tab, name your destination. For example, `Rokt audiences – <audience name>`.

6. Enter your Rokt API key.

7. Click **Save Changes**.  

8. In the **Mappings** tab, click **New Mapping** and select **Add Users to Audience**. Don't change any defaults.

9. Under the **Configure actions fields**, set **Enable Batching** to *Yes* and click **Save**.  

7. Repeat steps 8 and 9 for **Remove Users from Audience**.

8. **Enable** both mappings.

9. Go to the **Settings** tab and **Enable** the destination.

10. Select your space, and navigate to **Engage > Audiences**. Select the source audience that you want to send to your Rokt Audiences destination.

11. Click **Add Destinations** and select the Rokt Audience destination you created. In the settings that appear on the right-hand side, toggle the **Send Track** option on and **Send Identify**. Click **Save**. 

Your Rokt destination is now ready to receive audiences, and your Persona audiences are now accessible in your Rokt Advertiser dashboard. Be aware, it can take 12-24 hours for the first sync when the number email identifies are in the millions. 

> warning ""
> You can connect **ONE** Engage audience to a single instance of Rokt Audience destination. If you have multiple audiences, repeat the above process to create a new Rokt audience destination and connect the audience to new destination each time.

{% include components/actions-fields.html %}