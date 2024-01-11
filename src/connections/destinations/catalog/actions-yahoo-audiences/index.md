---
title: Yahoo Audiences Destination
id: 6514281004d549fae3fd086a
beta: true
---

The Yahoo Audiences integration facilitates seamless connectivity between Engage Audiences and Yahoo DSP, offering users the flexibility to configure their data delivery preferences within the Segment platform.

This integration is designed to accommodate various identifiers, including **email**, **phone**, and **MAIDs** (iOS IDFA, Android Advertising Id). To ensure data security, the integration hashes **email** and **phone** identifiers, while also formatting phone numbers to comply with E.164 requirements.

Operating on the [Yahoo DataX platform](https://developer.yahooinc.com/datax/guide/){:target="_blank"}, the integration harnesses the power of the [Yahoo Realtime API](https://developer.yahooinc.com/datax/guide/datax-online-spec/user-data-audience-data/){:target="_blank"} for audience synchronization. Users can enjoy the convenience of syncing both realtime and batch audiences, with incremental batches supporting a maximum of 1000 user records. Notably, each synchronized user record can encompass the individual's membership in multiple audiences.

In addition to these features, the integration provides support for [Trait Activation](/docs/engage/trait-activation/) functionalities, specifically [Trait Enrichment](/docs/engage/trait-activation/trait-enrichment/) and [ID Sync](/docs/engage/trait-activation/id-sync/), enhancing the overall user experience.


## Getting started

To connect your Yahoo Audiences Destination: 
1. Create your Engage Audience.
2. Navigate to **Engage** > **Engage Settings** > **Destinations** and click **Add Destination**.
3. Select **Yahoo Audiences**, select your Engage space as the source, and name your destination.
4. Configure global destination settings on the **Settings** tab:

    Settings | Details
    -------- | -------
    Name | Specify the destination name, for example “Yahoo Audiences Production”. This value is only available in Segment.
    MDM ID | Specify the MDM ID provided by your Yahoo DSP representative.
    Engage Space ID | Specify the Engage Space ID. To locate Engage Space ID navigate to **Unify** > **Unify Settings** > **API Access**. This value identifies your customer node in Yahoo Data Taxonomy. Don't provide arbitrary values in this field, or any values other than your Engage Space ID. <br><br>**Note:** The destination displays an error if the provided value includes any characters other than [a-zA-Z0-9] and “_” (underscore). This is to prevent passing values not supported by Yahoo.
    Customer Description | Provide an optional description for the integration.
5. Turn on the **Enable Destination** toggle.
6. Click **Save Changes** to save the destination.
7. Configure destination Action Mappings. Action Mappings determine the information sent from Engage to the Yahoo Audiences destination. 
    1. On the **Mapping** tab click **Add Mapping** and select **Sync to Yahoo Ads Segment**.
    2. Within the mapping’s **Select events to map and send** configure whether the mapping should be triggered for all audiences connected to the destination, or for specific audiences only.
        - **Note:** Action mapping settings apply to all audiences that are processed by the mapping. The mapping can be configured to process all audiences connected to the destination, or only specific audiences. This can be helpful when enabling the GDPR flag only for specific audiences.
        - To apply the mapping only to specific audiences, modify the trigger as follows:
        ![A screenshot subscription settingsfor specific audience](images/yahoo-1.png)
        - To apply the mapping to all audiences, modify the trigger as follows:
        ![A screenshot subscription settings for all audiences](images/yahoo-2.png)
    3. Configure the mapping for **Email**, **Phone**, **Mobile Advertising Id** and **Device Type** fields. You can keep default mapping for these fields, if your data matches default mappings.
        - **Note:** The destination expects the mobile advertising ID to be a combination of 2 fields: advertising ID and device type. If device type field is not available in your data, the destination deduces the platform (iOS /Android) based on advertising ID value formatting. If the value is capitalized - the destination assumes that this is iOS IDFA, otherwise the destination assumes that is Android DSP ID.
    4. Configure whether **GDPR Flag** should be sent.
        - **Note:** **GDPR Flag** setting applies to the entire audience. Set this setting to TRUE if the audience is subject to GDPR regulations. If you set the **GDPR Flag** to YES, then populate **GDPR Consent Attributes** setting with the following IAB user consent attributes: “Access of Information” and “Personalization”. See more in [Yahoo DSP API documentation](https://developer.yahooinc.com/datax/guide/gdpr/faq/){:target="_blank"}. If the **GDPR Flag** setting is set to YES, and **GDPR Consent Attributes** is not populated, the audience sync fails. 
    5. Provide **GDPR Consent Attributes** if you opted to send a **GDPR Flag**.
    6. Save the mapping.
8. Connect the Destination to the Audience and configure the Audience Sync settings.
    1. Navigate to **Engage** > **Audiences** > **(your audience)**. Click **Add Destination** and select the destination you just created.
    2. Configure how the audience should be synced. Enable **Send Track** and disable **Send Identify**. 
    3. Select the identifiers to be synced to Yahoo:
        - **Default Setup**: Sends all email IDs available on a user profile.
        - **Customized Setup**: Configure the identifiers to be sent to Yahoo DSP.
    4. If you’d like to send iOS IDFA and Android Advertising ID - turn on **Send Mobile IDs** and map MAIDs using **Customized Setup**.
    5. Don't modify the **Placeholder** setting. 
    6. Click **Save Settings**.

> info ""
> Yahoo DSP supports the following identifiers: **email**, **phone**, **iOS IDFA**, **Android Advertising Id**. Segment hashes email and phone per Yahoo DSP requirements, so you don’t have to hash email and phone. Segment formats the phone to meet E.164 requirements: removes non-digit characters and adds “+” sign. Your phone trait/identifier must include country code, as Segment does not prepend phone with country code.

Once the Audience is connected to the Destination, Segment makes a request to Yahoo DSP to create an ‘audience’ (‘segment’) node in Yahoo Data Taxonomy. The node is identified by Audience ID, and named with Audience Key. After Engage has computed the audience, the Destination syncs the audience to Yahoo DSP.

{% include components/actions-fields.html %}

## Destination configurations for various use cases

### Use case 1

Email, phone, IOS IDFA and Android Advertising ID are available as Engage Identifiers. 

Setting | Details 
------- | --------
Action Mappings | Keep default field mappings.
Audience Sync settings | Select **Customized Setup**, and map available identifiers under the Identifiers section. You can select whether Engage should send First, Last, or All Available identifiers.

### Use case 2

Email, phone, IOS IDFA and Android Advertising Id are available as Engage Identifiers and/or Traits. 

Settings | Details
-------- | --------
Action Mappings | Modify the mapping to reflect your custom trait names. For example, if you’re planning to send `email_addr` trait as email to Yahoo Audiences, map `email_addr` trait in the **User Email** field.
Audience Sync settings | Click **Customized Setup** and select the **Identifiers** and **Traits** that you plan to send to Yahoo Audiences. For example, if you plan to send `phone` identifier and `email_addr` trait, map these fields as shown below: ![A screenshot customized setup configuration with traits](images/yahoo-5.png)

### Use case 3
Send mobile advertising ID custom traits to Yahoo Audiences.

Settings | Details
-------- | --------
Action Mappings | The destination expects 2 fields for mobile advertising ID: 1) advertising ID field (trait) storing the ID value iteself, and 2) device type field (trait) storing mobile platform name (`ios` or `android`). <br><br>* If your Engage data includes these 2 fields, you can map them as: `traits.advertising_id_trait` &rarr; `User Mobile Advertising ID` and `traits.device_type_trait` &rarr; `User Mobile Device Type`. <br><br> * If your data doesn't include a field with the device type, you can only map the advertising ID trait. The destination detects device type based on the ID value format. Apple IDFA is typically capitalized, and Android advertising ID is typically lowercase. <br><br> * If you have separate traits for iOS IDFA and Android Advertising ID, you can map them using the coalesce() function: `coalesce( traits.ios_ad_id_trait`, `traits.android_ad_id_trait)` &rarr; `User Mobile Advertising ID`
Audience Sync settings | Use **Customized Setup** to map custom advertising ID and, if available, device type traits. ![A screenshot customized setup configuration for use-case 3](images/yahoo-9.png)


## FAQs

### Why am I seeing the difference between audience size in Engage and in Yahoo DSP?
The difference between audience size in Segment and in Yahoo DSP is expected due to ID matching. Yahoo DSP will recognize only users it has matching ID (email / phone / MAID) for. 

### The audience has synced, but I’m seeing 0 population in Yahoo DSP UI.
As soon as user records land in Yahoo DSP, users become targetable in minutes. However, Yahoo DSP reporting is not realtime, and might take 24-48 hours to catch up. This delay does not affect targeting. Because of that you might see 0 users in the Yahoo DSP audience immediately after the sync.
