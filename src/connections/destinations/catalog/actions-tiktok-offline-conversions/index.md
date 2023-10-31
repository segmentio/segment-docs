---
title: Tiktok Offline Conversions (Actions) Destination
id: 6447ca8bfaa773a2ba0777a0
---

{% include content/plan-grid.md name="actions" %}

[Tiktok's Offline Events API](https://ads.tiktok.com/marketing_api/docs?id=1758049779688450){:target="_blank”} helps advertisers measure how TikTok ads result in offline customer actions, such as in-store purchases or offline subscriptions, purchases and more. Attributing online and offline events is an important step for advertisers to measure omni-channel results from their campaigns. 

**Benefits**
- **Measure how TikTok ads influence offline conversions.** Learn what online strategies lead to better Brick & Mortar sales, subscription sign-ups or leads. 
- **Power holistic attribution models with cross-channel event tracking.** Combine online and offline touchpoints to get comprehensive campaign metrics, like ROAS.
- **Reach offline customers online with custom audiences.** Promote new products or services to high-value customers who initiative offline events.


This destination is maintained by Tiktok. For any issues with the destination, [contact their Support team](mailto:segmenteng@bytedance.com).

{% include content/ajs-upgrade.md %}

## Getting started

Prior to setting up the **TikTok Offline Conversion Destination**, please create an Offline Event Set and generate the Access Token for it from **TikTok Events Manager**.

1. From the Segment web app, click **Catalog**, then click **Destinations**.
2. Find the Destinations Actions item in the left navigation, and click it.
3. Click **Configure Tiktok Offline Conversions (Actions)**.
4. Select an existing Source to connect to Tiktok Offline Conversions (Actions).
5. Give Destination a name.
6. On the Settings screen, provide Access Token and Event Set ID.
7. Toggle on the Destination.
8. Hit the Save Change button.

**Mappings Enabled by Default**

After setting up the Destination, four mappings will be enabled by default. You can click on the mappings tab to view and edit these mappings.

- Complete Payment: use this to track offline purchase events
- Subscribe: use this to track offline subscription events
- Contact: use this to track offline contact events
- Submit Form: use this to track offline form submissions

{% include components/actions-fields.html %}

## Acess Token & Event Set ID
Please refer to the [documentation](https://ads.tiktok.com/marketing_api/docs?id=1758051319816193){:target="_blank”} to obtain the **Access Token** and the **Event Set ID**.

## PII Requirement & Validation
TikTok Offline Events API requires at least one type of PII (email addresses and/or phone numbers) to be included in all offline conversion events. The email addresses and phone numbers will be hashed using SHA 256 from Segment before they are sent to TikTok. TikTok Offline Conversions Destination will automatically hash the provided PII, so please do not hash the PIIs before sending them to Segment. In addition, TikTok Offline Conversions Destination will validate all offline events before forwarding them to TikTok Offline Events API. TikTok Offline Conversions Destination will not send any offline events to TikTok with invalid or missing PIIs.

## Data and Privacy Considerations
- Every offline event sent to TikTok Offline Events API requires at least one email address or phone number.
- E-mails and phone numbers will be hashed in a privacy-safe way by default so that TikTok cannot identify customers who are not TikTok users.
- iOS compliance checks will be performed on PII (ATT opt-out users will still be reported and attributed).
- TikTok will pruge unmatched offline conversions IDs/records.


---
