---
title: Collab Travel CRM Destination
hide-boilerplate: true
hide-dossier: false
id: collab-travel-crm
---

{% include content/plan-grid.md name="actions" %}

[Collab Travel CRM](https://collabtravelcrm.com/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) is the all-in-one platform for modern travel agencies. Sync your bookings, leads, and itineraries with your marketing stack.

This destination is maintained by Collab Travel CRM. For any issues with the destination, [contact their Support team](mailto:support@collabtravelcrm.com).

## Getting Started

### Generate your API Key

1. Log in to your [Collab Travel CRM](https://collabtravelcrm.com) account
2. Navigate to **Settings > Integrations**
3. Find the **Segment** integration card
4. Click **Generate Webhook Secret**
5. Copy the generated secret - you'll need this to configure the destination in Segment

### Add the Destination

1. From the Segment web app, navigate to **Connections > Catalog**
2. Search for **Collab Travel CRM**
3. Click **Add Destination**
4. Select the source you want to connect and click **Next**
5. Give your destination a name and click **Create Destination**
6. Paste your **API Key** (webhook secret) from Collab Travel CRM
7. Click **Save Changes**

{% include components/actions-fields.html %}

## Supported Events

### Trip Booked

Track when a customer books a trip. This event follows the Segment [E-commerce spec](https://segment.com/docs/connections/spec/ecommerce/v2/).

| Property | Type | Description |
|----------|------|-------------|
| `order_id` | string | Unique booking identifier |
| `revenue` | number | Total booking value |
| `currency` | string | Currency code (e.g., "USD") |
| `destination_city` | string | Travel destination city |
| `destination_country` | string | Travel destination country |
| `start_date` | string | Trip start date (ISO 8601) |
| `end_date` | string | Trip end date (ISO 8601) |
| `number_of_travelers` | number | Number of travelers |
| `products` | array | Array of itinerary items |

### Lead Created

Track when a new lead is captured.

| Property | Type | Description |
|----------|------|-------------|
| `lead_source` | string | Where the lead came from |
| `interest_level` | string | Lead interest level (hot/warm/cold) |
| `service_category` | string | Type of travel service |
| `travel_date_interest` | string | Approximate travel dates |
| `group_size` | number | Expected group size |

### Proposal Sent

Track when a proposal is sent to a client.

| Property | Type | Description |
|----------|------|-------------|
| `proposal_id` | string | Unique proposal identifier |
| `proposal_title` | string | Title of the proposal |
| `total_value` | number | Total proposal value |
| `number_of_options` | number | Number of options included |
| `client_email` | string | Client email address |

### Review Submitted

Track when a client submits a review.

| Property | Type | Description |
|----------|------|-------------|
| `review_id` | string | Unique review identifier |
| `rating` | number | Rating score (1-5) |
| `trip_destination` | string | Destination reviewed |
| `review_text` | string | Review content |

## Data Mapping

Collab Travel CRM automatically maps Segment data to CRM contacts:

| Segment Field | Collab CRM Field |
|---------------|------------------|
| `userId` | External ID |
| `traits.email` | Email |
| `traits.firstName` | First Name |
| `traits.lastName` | Last Name |
| `traits.phone` | Phone |

## FAQ

### How do I find my API Key?

Navigate to **Settings > Integrations > Segment** in your Collab Travel CRM dashboard and click **Generate Webhook Secret**.

### What happens to existing contacts?

When an `identify` event is received for an email that already exists in your CRM, the contact is updated with the new information rather than creating a duplicate.

### Are events logged for auditing?

Yes, all inbound Segment events are logged in the **Segment Activity Log** accessible from your Integrations settings page.

### What regions are supported?

Collab Travel CRM is hosted on Supabase infrastructure with global edge functions, providing low-latency data ingestion worldwide.

---

*For additional support, contact [support@collabtravelcrm.com](mailto:support@collabtravelcrm.com)*
