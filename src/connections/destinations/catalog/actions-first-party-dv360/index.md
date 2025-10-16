---
title: First Party Display and Video 360 (Actions) Destination
strat: google
hide-settings: true
id: 6683e1d5e37fd84efcf3bbef
engage: true
redirect_from: /connections/destinations/catalog/first-party-dv360/
---

Google’s [Display & Video (DV360)](https://marketingplatform.google.com/about/display-video-360/){:target="_blank"} is an end-to-end campaign management tool that enables enterprise customers to plan, measure, and run display and video advertisements. Segment’s integration with DV360 enables Segment customers to sync audiences created in Engage with DV360 for centralized audience management and improved retargeting.

This destination is different from the existing DV360 Actions as it allows you to upload [contact info](https://developers.google.com/display-video/api/reference/rest/v4/firstPartyAndPartnerAudiences#contactinfo){:target="_blank"} and the [mobile device ID](https://developers.google.com/display-video/api/reference/rest/v4/firstPartyAndPartnerAudiences#mobiledeviceidlist){:target="_blank"}.

This destination can only be used with Engage. 

## Setup
Configuring this integration requires action by both you in your Segment workspace, and Google in your Google Marketing Platform account. As a result, the time required to finish configuration and setup can vary.

### Enable the destination

To enable the First Party DV 360 destionation: 
1. Navigate to **Engage > Engage Settings > Destinations > Add Destination** in your Segment workspace.
2. Search for *First Party DV360* and click **Add destination**. 
3. Navigate to **Connections > Destinations** and search for the **First Party DV 360** destination you created. 
4. Select the **Mappings** tab and click **+ New Mapping**. 
5. Select the action you'd like to use. You can choose from: 

    Option | Details
    ------ | --------
    Edit Customer Match Members - Contact Info List | Add or update customer match members in Contact Info List Audience. 
    Edit Customer Match Members - Mobile Device Id List | Add or update customer match members in Mobile Device Id List Audience. 
    Remove Customer Match Members - Contact Info List | Remove customer match members from the Contact Info List Audience. 
    Remove Customer Match Members - Mobile Device Id List | Remove customer match members from the Mobile Device Id List Audience. 

   * Select either **Customer Info List** or **Mobile Device Id List** depending on what audience type you use. 
   * Select **Edit Customer Match Members** to add or update users to an audience. 
   * Select **Remove Customer Match Members** to remove users from an audience. 
   * If you want to create actions for both Customer Info List and Mobile Device Id List, you can create all 4 mappings. 
6. Switch the toggle to enable the destination. 


### Create an audience

To create an audience in your destination: 
1. Navigate to **Engage > Audiences** and click **+New audience**. 
2. Fill out the audience seetings. 
   * If you want to use Mobile Device ID Lists, ensure to fill out your app ID. 
   * Make sure you enabled track calls. 
3. Click **Save**. 
4. You should see an audience populate in your DV360 account. If you don't immediately see this, it can take up to a couple of hours for your audience to populate. 
5. Switch the toggle to **Connect to destination**. 
6. Navigate to **Connections > Destinations** and select the First Party DV360 destination. 
7. Select the **Mappings** tab. 
8. Click **+ New Mapping** and select **Remove from Audience**. 
9. Click **Save**.
10. Enable the mapping. 

## Consent mode
[Consent mode](https://support.google.com/analytics/answer/9976101?hl=en){:target="_blank"} is a feature provided by Google in the context of its products, particularly the Gtag library and Google Analytics. As of March 6, 2024, Google announced that consent mode must function for European Economic Area (EEA) users, otherwise data from EEA users won't process. 

Consent mode in the Gtag library and Google Analytics is designed to help website owners comply with privacy regulations, such as the General Data Protection Regulation (GDPR) in the European Union. It allows website owners to adjust how these tools use and collect data based on user consent.

With consent mode, you can configure your website to dynamically adjust the tracking behavior of the Gtag library and Google Analytics based on the user's consent status. If a user provides consent to data processing, both the Gtag library and Google Analytics can collect and use that data for analysis. If a user doesn't provide consent, both tools limit data collection to essential functions, helping businesses respect user privacy preferences.

Segment automatically sends consent as `TRUE` for this destination.  Segment uses the [bulk-uploader workflow](https://developers.google.com/authorized-buyers/rtb/bulk-uploader#workflow){:target="_blank"} which requires consented data. Ensure all audiences and journeys are connected to consented audiences.

{% include components/actions-fields.html %}

## Data requirements
Based on Google’s documentation, make sure you send the correct required identifiers:
* [Contact info list requirements](https://developers.google.com/display-video/api/reference/rest/v4/firstPartyAndPartnerAudiences#contactinfo){:target="_blank"}
   * For example, you must send first name, last name, ZIP code, and country code all together and not just one. Make sure all phone numbers are in [E.164 format](https://en.wikipedia.org/wiki/E.164){:target="_blank"}. 
* [Mobile ID Requirements](https://developers.google.com/display-video/api/reference/rest/v4/firstPartyAndPartnerAudiences#mobiledeviceidlist){:target="_blank"}


## FAQs

#### When will my data appear in DV360?
When you complete the connection between Segment and DV360, it can take from 24 to 48 hours for Google to create the user list. This must complete before Segment can begin to sync users into that list. 

#### What is membershipDurationDays and its limit?
The duration in days that an entry remains in the audience after the qualifying event. The set value must be greater than 0 and less than or equal to 540.
