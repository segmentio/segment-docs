---
title: Friendbuy Source
---

[Friendbuy](https://www.friendbuy.com/friendbuy-segment-integration) will send referral and loyalty event data to Segment in real time, allowing you to send data instantly to connected tools like your data warehouse. This enables timely and up-to-date insights, personalized user experiences, and customer cohort analysis.

This is an [Event Cloud Source](https://segment.com/docs/sources/#event-cloud-sources) which can not only export data into your Segment warehouse, but they can also federate the exported data into your other enabled Segment Destinations.

This source is maintained by Friendbuy. For any issues with the source, [contact their Support team](mailto:support@friendbuy.com).

## Getting Started

1. From your workspace's [Sources catalog page](https://app.segment.com/goto-my-workspace/sources/catalog) click **Add Source**.
2. Search for "Friendbuy" in the Sources Catalog, select Friendbuy, and click **Add Source**.
3. On the next screen, give the Source a nickname configure any other settings.

   - The nickname is used as a label in the Segment app, and Segment creates a related schema name in your warehouse. The nickname can be anything, but we recommend using something that reflects the source itself and distinguishes amongst your environments (eg. SourceName_Prod, SourceName_Staging, SourceName_Dev).

4. Click **Add Source** to save your settings.
5. Copy the **Write Key** from the Segment UI and log in to your Friendbuy account - navigate to Settings > Developer Center > Integrations > Select Segment Integration and paste the **Write Key** > Click Install.

## Stream

Friendbuy uses our Segment Integration to stream event data to Segment in real time. It uses the server-side `track` and `identify` methods to send data to Segment. These events are then available in any destination that accepts server-side events, and available in a schema in your data warehouse, so you can query using SQL.

The default behavior is for Friendbuy to include an Anonymous ID for every event. The Anonymous ID is a hashed email. Friendbuy will also include a User ID, which is the Friendbuy the Customer ID.  If Friendbuy does not have the Customer ID, then only the Anonymous ID will be included. 

## Referral Events

The table below lists referral events that Friendbuy sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations. Friendbuy always includes the Anonymous ID and includes the User ID if available.

<table>
  <thead>
    <tr>
      <th>Event Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="#advocate-created">Advocate Created</a></td>
      <td>Segment receives this event when a customer submits their name, email and/or phone number in a Referral Widget on your site</td>
    </tr>
    <tr>
      <td><a href="#referred-friend-created">Referred Friend Created</a></td>
      <td>Segment receives this event when a customer is referred by and Advocate and submits their name, email and/or phone number in a Friend Widget on your site</td>
    </tr>
    <tr>
      <td><a href="#referral-share">Referral Share</a></td>
      <td>Segment receives this event when an advocate shares the referral program offer through the Referral Widget with a Friend via Email, PURL, SMS or Social (Facebook, Messenger, Twitter)</td>
    </tr>
    <tr>
      <td><a href="#referral-advocate-reward-earned">Referral Advocate Reward Earned</a></td>
      <td>Segment receives this event when an Advocate earns a reward after a referred Friend completes the referral conversion event and passes all business rules and fraud checks</td>
    </tr>
    <tr>
      <td><a href="#referral-friend-incentive-earned">Referral Friend Incentive Earned</a></td>
      <td>Segment receives this event when a referred Friend completes the referral conversion event, passes all business rules and fraud checks, and then earns an incentive</td>
    </tr>
    <tr>
      <td><a href="#referral-advocate-reward-rejected">Referral Advocate Reward Rejected</a></td>
      <td>Segment receives this event when an Advocate reward is rejected and not distributed because they did not passes all business rules and fraud checks</td>
    </tr>
    <tr>
      <td><a href="#referral-friend-incentive-rejected">Referral Friend Incentive Rejected</a></td>
      <td>Segment receives this event when a referred Friend completes the referral conversion event, but does not pass all business rules and fraud checks, and incentive is not distributed</td>
    </tr>
  </tbody>
</table>

## Loyalty Events 

The table below lists loyalty events that Friendbuy sends to Segment. These events appear as tables in your warehouse, and as regular events in other Destinations. Friendbuy always includes the Anonymous ID and includes the User ID if available.

<table>
  <thead>
    <tr>
      <th>Event Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="#loyalty-reward-earned">Loyalty Reward Earned</a></td>
      <td>Segment receives this event when a Loyalty Member completes a rewardable event, passes all associated earning event rules, and earns a reward</td>
    </tr>
    <tr>
      <td><a href="#loyalty-credit-event">Loyalty Credit Event</a></td>
      <td>Segment receives this event when there is an update to a Loyalty Member’s credit. For example, when a Friendbuy Loyalty Credit is redeemed</td>
    </tr>
  </tbody>
</table>

## Referral Event Properties

The tables below list the properties included in each referral event.

### Advocate Created
<table>
  <thead>
    <tr>
      <th>Property Name</th>
      <th>Description</th>
      <th>Always Included</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>email</td>
      <td>Email address of the Advocate created</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>phone</td>
      <td>Phone number of the Advocate created</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>customer_id</td>
      <td>
        Customer ID of the Advocate created.<br><br>
        This will be the same value as the User ID that Segment receives for this event
      </td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>ip</td>
      <td>IP address of the Advocate created</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>referral_link</td>
      <td>
        Referral link assigned to the Advocate created.<br><br>
        A Referral link, also called a personal referral link or personal URL (PURL), is a link that uniquely associates an advocate to a referral program. An advocate uses their personal referral link to refer friends to a site or business. When this link is clicked by a friend, the friend is taken to the associated destination URL. Also, the referred friend’s browser will be cookied by Friendbuy with information about the referral
      </td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>referral_code</td>
      <td>
        Referral code assigned to the Advocate created.<br><br>
        A referral code is a unique code generated by Friendbuy to associate an advocate to a referral campaign. A referral code can be used to look up the advocate’s name, the advocate’s customer ID, and offer information for that particular referral campaign. Note: referral code is not a coupon code. It solely provides information to associate the advocate to a campaign
      </td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>campaign_name</td>
      <td>The name of the referral campaign associated with the Referral Widget that was used to create this Advocate</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>campaign_id</td>
      <td>The ID of the referral campaign associated with the Referral Widget that was used to create this Advocate</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>customer_name</td>
      <td>
        Name of the Advocate created
      </td>
      <td>
         Only included if known.<br><br>
         This will be the full name if known. Otherwise, it might just be first name depending on how the widget is configured or what the customer provides
      </td>
    </tr>
    <tr>
      <td>widget_name</td>
      <td>The name of the Referral Widget that was used to create this Advocate</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>ab_test_variant_id</td>
      <td>The ID of the variant used</td>
      <td>Only included if the referral campaign is running an AB test</td>
    </tr>
    <tr>
      <td>email_marketing_opt_in_status</td>
      <td>The email subscription status of the Advocate created</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>sms_marketing_opt_in_status</td>
      <td>The SMS subscription status of the Advocate created</td>
      <td>&#x2705;</td>
    </tr>
  </tbody>
</table>



### Referred Friend Created
<table>
  <thead>
    <tr>
      <th>Property Name</th>
      <th>Description</th>
      <th>Always Included</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>email</td>
      <td>Email address of the Friend created</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>phone</td>
      <td>Phone number of the Friend created</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>customer_id</td>
      <td>
        Customer ID of the Friend created.<br><br>
        This will be the same value as the User ID that Segment receives for this event
      </td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>ip</td>
      <td>IP address of the Friend created</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>advocate_referral_code</td>
      <td>
        Referral code of the Advocate who referred this Friend.<br><br>
        A referral code is a unique code generated by Friendbuy to associate an advocate to a referral campaign. A referral code can be used to look up the advocate’s name, the advocate’s customer ID, and offer information for that particular referral campaign. Note: referral code is not a coupon code. It solely provides information to associate the advocate to a campaign
      </td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>campaign_name</td>
      <td>The name of the referral campaign associated with the Friend Widget that was used to create this Friend</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>campaign_id</td>
      <td>The ID of the referral campaign associated with the Friend Widget that was used to create this Friend</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>customer_name</td>
      <td>Name of the Friend created</td>
      <td>
         Only included if known.<br><br>
         This will be the full name if known. Otherwise, it might just be first name depending on how the widget is configured or what the customer provides
      </td>
    </tr>
    <tr>
      <td>widget_name</td>
      <td>The name of the Friend Widget that was used to create this Friend</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>ab_test_variant_id</td>
      <td>The ID of the variant used</td>
      <td>Only included if the referral campaign is running an AB test</td>
    </tr>
    <tr>
      <td>email_marketing_opt_in_status</td>
      <td>The email subscription status of the Friend created</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>sms_marketing_opt_in_status</td>
      <td>The SMS subscription status of the Friend created</td>
      <td>&#x2705;</td>
    </tr>
  </tbody>
</table>



### Referral Share
<table>
  <thead>
    <tr>
      <th>Property Name</th>
      <th>Description</th>
      <th>Always Included</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>email</td>
      <td>Email address of the Advocate</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>phone</td>
      <td>Customer ID of the Advocate.<br><br>
        This will be the same value as the User ID that Segment receives for this event</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>customer_id</td>
      <td>IP address of the Advocate</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>share_channel</td>
      <td>
        The share channel used by the Advocate.<br><br>
        An advocate can refer a friend through several different channels, including email, personal referral link (PURL), SMS, or social channels like Facebook, Messenger, Twitter or WhatsApp.
      </td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>referral_link</td>
      <td>
        Referral link assigned to the Advocate.<br><br>
        A Referral link, also called a personal referral link or personal URL (PURL), is a link that uniquely associates an advocate to a referral program. An advocate uses their personal referral link to refer friends to a site or business. When this link is clicked by a friend, the friend is taken to the associated destination URL. Also, the referred friend’s browser will be cookied by Friendbuy with information about the referral
      </td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>email_share_reminder</td>
      <td>Indicates whether the Advocate chose to send the Friend a reminder email after 3 days</td>
      <td>Only included if the share channel is email</td>
    </tr>
    <tr>
      <td>referral_code</td>
      <td>
        Referral code assigned to the Advocate.<br><br>
        A referral code is a unique code generated by Friendbuy to associate an advocate to a referral campaign. A referral code can be used to look up the advocate’s name, the advocate’s customer ID, and offer information for that particular referral campaign. Note: referral code is not a coupon code. It solely provides information to associate the advocate to a campaign
      </td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>campaign_name</td>
      <td>The name of the referral campaign associated with this referral share</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>campaign_id</td>
      <td>The ID of the referral campaign associated with this referral share</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>widget_name</td>
      <td>The name of the Referral Widget that was used to create this referral</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>ab_ test_variant_id</td>
      <td>The ID of the variant used</td>
      <td>Only included if the referral campaign is running an AB test</td>
    </tr>
  </tbody>
</table>


### Referral Advocate Reward Earned
<table>
  <thead>
    <tr>
      <th>Property Name</th>
      <th>Description</th>
      <th>Always Included</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>email</td>
      <td>Email address of the Advocate</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>customer_id</td>
      <td>
        Customer ID of the Advocate.<br><br>
        This will be the same value as the User ID that Segment receives for this event
      </td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>ip</td>
      <td>IP address of the Advocate that earned the reward</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>coupon_code</td>
      <td>
        The code used to receive a discount on a purchase, commonly set up as a percentage or dollar amount off an item. In a refer-a-friend program, a coupon code can be used to reward advocates or incentivize friends to make a purchase. The code can also be used to establish attribution between the referred friend and the advocate
      </td>
      <td>Only included if the reward type is Coupon Code</td>
    </tr>
    <tr>
      <td>reward_value</td>
      <td>The value of the reward earned by the Advocate</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>reward_currency</td>
      <td>The currency of the reward earned by the Advocate</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>campaign_name</td>
      <td>The name of the referral campaign associated with this Advocate reward</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>campaign_id</td>
      <td>The ID of the referral campaign associated with this Advocate reward</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>conversion_event</td>
      <td>
        The type of event the Friend needed to perform in order for the Advocate to earn this reward (e.g., purchase, email capture, sign up, or custom event)
      </td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>friend_email</td>
      <td>The email address of the Friend who performed the referral conversion event</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>friend_customer_id</td>
      <td>Customer ID of the Friend who performed the referral conversion event</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>friend_ip_address</td>
      <td>IP address of the Friend who performed the referral conversion event</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>friend_purchase_total</td>
      <td>The total amount that the Friend spent at the time of conversion</td>
      <td>Only included if the <code>conversion_event</code> is a purchase</td>
    </tr>
    <tr>
      <td>friend_order_id</td>
      <td>The Order ID of the purchase that the Friend made at the time of conversion</td>
      <td>Only included if the <code>conversion_event</code> is a purchase</td>
    </tr>
    <tr>
      <td>friend_new_customer_status</td>
      <td>Indicates whether the Friend is a new customer</td>
      <td>Only included if the <code>conversion_event</code> is a purchase</td>
    </tr>
    <tr>
      <td>reward_tier</td>
      <td>The Reward Tier of the Advocate</td>
      <td>Only included if you have set up Tier-based rewards that deliver different rewards depending on the number of referrals</td>
    </tr>
    <tr>
      <td>widget_name</td>
      <td>The name of the Referral Widget that the Advocate used to share</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>ab_ test_variant_id</td>
      <td>The ID of the variant used</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>share_channel</td>
      <td>
        The share channel used by the Advocate.<br><br>
        An advocate can refer a friend through several different channels, including email, personal referral link (PURL), SMS, or social channels like Facebook, Messenger, Twitter or WhatsApp.
      </td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>referral_code</td>
      <td>
        Referral code assigned to the Advocate.<br><br>
        A referral code is a unique code generated by Friendbuy to associate an advocate to a referral campaign. A referral code can be used to look up the advocate’s name, the advocate’s customer ID, and offer information for that particular referral campaign. Note: referral code is not a coupon code. It solely provides information to associate the advocate to a campaign.
      </td>
      <td>&#x2705;</td>
    </tr>
  </tbody>
</table>



### Referral Friend Incentive Earned
<table>
  <thead>
    <tr>
      <th>Property Name</th>
      <th>Description</th>
      <th>Always Included</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>email</td>
      <td>Email address of the Friend that earned the incentive</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>customer_id</td>
      <td>
        Customer ID of the Friend that earned the incentive.<br><br>
        This will be the same value as the User ID that Segment receives for this event
      </td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>ip</td>
      <td>IP address of the Friend that earned the incentive</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>coupon_code</td>
      <td>
        The coupon code provided to the Friend, in order to incentivize them to make a purchase.<br><br>
        A code used to receive a discount on a purchase, commonly set up as a percentage or dollar amount off an item. The code can also be used to establish attribution between the referred friend and the advocate
      </td>
      <td>Only included if the reward type is Coupon Code</td>
    </tr>
    <tr>
      <td>incentive_value</td>
      <td>The value of the incentive earned by the Friend</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>incentive_currency</td>
      <td>The currency of the incentive earned by the Friend</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>campaign_name</td>
      <td>The name of the referral campaign associated with this Friend incentive</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>campaign_id</td>
      <td>The ID of the referral campaign associated with this Friend incentive</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>conversion_event</td>
      <td>
        The type of event the Friend needed to perform, in order for the Advocate to earn a reward (e.g., purchase, email capture, sign up, or custom event)
      </td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>incentive_tier</td>
      <td>The Reward Tier of the Advocate</td>
      <td>Only included if you have set up Tier-based rewards that deliver different rewards depending on the number of referrals</td>
    </tr>
    <tr>
      <td>ab_ test_variant_id</td>
      <td>The ID of the variant used</td>
      <td>Only included if the referral campaign is running an AB test</td>
    </tr>
    <tr>
      <td>share_channel</td>
      <td>
        The share channel used by the Advocate.<br><br>
        An advocate can refer a friend through several different channels, including email, personal referral link (PURL), SMS, or social channels like Facebook, Messenger, Twitter or WhatsApp.
      </td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>referral_code</td>
      <td>
        Referral code assigned to the Advocate.<br><br>
        A referral code is a unique code generated by Friendbuy to associate an advocate to a referral campaign. A referral code can be used to look up the advocate’s name, the advocate’s customer ID and offer information for that particular referral campaign. Note: referral code is not a coupon code. It solely provides information to associate the advocate to a campaign.
      </td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>advocate_email</td>
      <td>The email address of the Advocate who referred the Friend that earned this incentive</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>advocate_customer_id</td>
      <td>The Customer ID of the Advocate who referred the Friend that earned this incentive</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>advocate_ip_address</td>
      <td>The IP address of the Advocate who referred the Friend that earned this incentive</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>widget_name</td>
      <td>The name that the referred Friend used to enter their information to receive their incentive</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>friend_purchase_total</td>
      <td>The total amount that the Friend spent at the time of conversion</td>
      <td>Only included if the <code>conversion_event</code> is a purchase</td>
    </tr>
    <tr>
      <td>friend_order_id</td>
      <td>The Order ID of the purchase that the Friend made at the time of conversion</td>
      <td>Only included if the <code>conversion_event</code> is a purchase</td>
    </tr>
    <tr>
      <td>friend_new_customer_status</td>
      <td>Indicates whether the Friend is a new customer</td>
      <td>Only included if the <code>conversion_event</code> is a purchase</td>
    </tr>
  </tbody>
</table>



### Referral Advocate Reward Rejected
<table>
  <thead>
    <tr>
      <th>Property Name</th>
      <th>Description</th>
      <th>Always Included</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>email</td>
      <td>Email address of the Advocate</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>customer_id</td>
      <td>
        Customer ID of the Advocate.<br><br>
        This will be the same value as the User ID that Segment receives for this event
      </td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>ip</td>
      <td>IP address of the Advocate that earned the reward</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>rejection_reasons</td>
      <td>
        The reason or reasons that this Advocate reward was rejected.<br><br>
        This could be due to one or more business rules not being passed, such as a Friend who completed a conversion but did so outside of an established attribution window.<br><br>
        This could be due to fraud detection, such as the referred Friend and the Advocate sharing the same IP address.
      </td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>campaign_name</td>
      <td>The name of the referral campaign associated with this Advocate reward</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>campaign_id</td>
      <td>The ID of the referral campaign associated with this Advocate reward</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>conversion_event</td>
      <td>
        The type of event the Friend needed to perform in order for the Advocate to earn this reward (e.g., purchase, email capture, sign up, or custom event)
      </td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>friend_email</td>
      <td>The email address of the Friend who performed the referral conversion event</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>friend_customer_id</td>
      <td>Customer ID of the Friend who performed the referral conversion event</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>friend_ip_address</td>
      <td>IP address of the Friend who performed the referral conversion event</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>friend_purchase_total</td>
      <td>The total amount that the Friend spent at the time of conversion</td>
      <td>Only included if the <code>conversion_event</code> is a purchase</td>
    </tr>
    <tr>
      <td>friend_order_id</td>
      <td>The Order ID of the purchase that the Friend made at the time of conversion</td>
      <td>Only included if the <code>conversion_event</code> is a purchase</td>
    </tr>
    <tr>
      <td>friend_new_customer_status</td>
      <td>Indicates whether the Friend is a new customer</td>
      <td>Only included if the <code>conversion_event</code> is a purchase</td>
    </tr>
    <tr>
      <td>reward_tier</td>
      <td>The Reward Tier of the Advocate</td>
      <td>Only included if you have set up Tier-based rewards that deliver different rewards depending on the number of referrals</td>
    </tr>
    <tr>
      <td>widget_name</td>
      <td>The name of the Referral Widget that was used to refer the Friend that converted</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>ab_test_variant_id</td>
      <td>The ID of the variant used</td>
      <td>Only included if the referral campaign is running an AB test</td>
    </tr>
    <tr>
      <td>share_channel</td>
      <td>
        The share channel used by the Advocate.<br><br>
        An advocate can refer a friend through several different channels, including email, personal referral link (PURL), SMS, or social channels like Facebook, Messenger, Twitter, or WhatsApp.
      </td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>referral_code</td>
      <td>
        Referral code assigned to the Advocate.<br><br>
        A referral code is a unique code generated by Friendbuy to associate an advocate to a referral campaign. A referral code can be used to look up the advocate’s name, the advocate’s customer ID, and offer information for that particular referral campaign. Note: referral code is not a coupon code. It solely provides information to associate the advocate to a campaign.
      </td>
      <td>&#x2705;</td>
    </tr>
  </tbody>
</table>


### Referral Friend Incentive Rejected
<table>
  <thead>
    <tr>
      <th>Property Name</th>
      <th>Description</th>
      <th>Always Included</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>email</td>
      <td>Email address of the Friend that had the incentive rejected</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>customer_id</td>
      <td>
        Customer ID of the Friend that had the incentive rejected.<br><br>
        This will be the same value as the User ID that Segment receives for this event
      </td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>ip</td>
      <td>IP address of the Friend that had the incentive rejected</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>rejection_reasons</td>
      <td>
        The reason or reasons that this Friend incentive was rejected.<br><br>
        This could be due to one or more business rules not being passed, such as the Friend needing to be a new customer or needing the purchase to be a certain minimum order amount.<br><br>
        This could be due to fraud detection, such as the referred Friend and the Advocate sharing the same IP address.
      </td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>campaign_name</td>
      <td>The name of the referral campaign associated with this Friend incentive</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>campaign_id</td>
      <td>The ID of the referral campaign associated with this Friend incentive</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>conversion_event</td>
      <td>
        The type of event the Friend needed to perform in order for the Advocate to earn a reward (e.g., purchase, email capture, sign up, or custom event)
      </td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>reward_tier</td>
      <td>The Reward Tier of the Advocate</td>
      <td>Only included if you have set up Tier-based rewards that deliver different rewards depending on the number of referrals</td>
    </tr>
    <tr>
      <td>ab_test_variant_id</td>
      <td>The ID of the variant used</td>
      <td>Only included if the referral campaign is running an AB test</td>
    </tr>
    <tr>
      <td>share_channel</td>
      <td>
        The share channel used by the Advocate.<br><br>
        An advocate can refer a friend through several different channels, including email, personal referral link (PURL), SMS, or social channels like Facebook, Messenger, Twitter, or WhatsApp.
      </td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>referral_code</td>
      <td>
        Referral code assigned to the Advocate.<br><br>
        A referral code is a unique code generated by Friendbuy to associate an advocate to a referral campaign. A referral code can be used to look up the advocate’s name, the advocate’s customer ID, and offer information for that particular referral campaign. Note: referral code is not a coupon code. It solely provides information to associate the advocate to a campaign.
      </td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>advocate_email</td>
      <td>The email address of the Advocate who referred the Friend that earned this incentive</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>advocate_customer_id</td>
      <td>The Customer ID of the Advocate who referred the Friend that earned this incentive</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>advocate_ip_address</td>
      <td>The IP address of the Advocate who referred the Friend that earned this incentive</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>widget_name</td>
      <td>The name of the Referral Widget that was used to refer the Friend that converted</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>friend_purchase_total</td>
      <td>The total amount that the Friend spent at the time of conversion</td>
      <td>Only included if the <code>conversion_event</code> is a purchase</td>
    </tr>
    <tr>
      <td>friend_order_id</td>
      <td>The Order ID of the purchase that the Friend made at the time of conversion</td>
      <td>Only included if the <code>conversion_event</code> is a purchase</td>
    </tr>
    <tr>
      <td>friend_new_customer_status</td>
      <td>Indicates whether the Friend is a new customer</td>
      <td>Only included if the <code>conversion_event</code> is a purchase</td>
    </tr>
  </tbody>
</table>



## Loyalty Event Properties

The tables below lists the properties included in each loyalty event.

### Loyalty Reward Earned
<table>
  <thead>
    <tr>
      <th>Property Name</th>
      <th>Description</th>
      <th>Always Included</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>email</td>
      <td>Email address of the Loyalty Member</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>customer_id</td>
      <td>
        Customer ID of the Loyalty Member.<br><br>
        This will be the same value as the User ID that Segment receives for this event
      </td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>ip</td>
      <td>IP address of the Loyalty Member</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>earning_event</td>
      <td>
        The name of the event the Loyalty Member needed to perform in order to earn this reward (e.g., Joined Program, Purchase, Refer a Friend, Sign Up, or Custom Event)
      </td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>friend_email</td>
      <td>The email address of the Friend who performed the referral conversion event</td>
      <td>Only included for “refer a friend” type earning events</td>
    </tr>
    <tr>
      <td>friend_customer_id</td>
      <td>The Customer ID of the Friend who performed the referral conversion event</td>
      <td>Only included for “refer a friend” type earning events</td>
    </tr>
    <tr>
      <td>friend_ip_address</td>
      <td>The IP address of the Friend who performed the referral conversion event</td>
      <td>Only included for “refer a friend” type earning events</td>
    </tr>
    <tr>
      <td>coupon_code</td>
      <td>
        The coupon code provided to the Loyalty Member in order to redeem this reward.<br><br>
        A code used to receive a discount on a purchase, commonly set up as a percentage or dollar amount off an item.
      </td>
      <td>Only included if the reward type is Coupon Code</td>
    </tr>
    <tr>
      <td>reward_value</td>
      <td>The value of the reward earned by the Loyalty Member</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>reward_currency</td>
      <td>The currency of the reward earned by the Loyalty Member</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>campaign_name</td>
      <td>The name of the loyalty campaign associated with this loyalty reward</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>campaign_id</td>
      <td>The ID of the loyalty campaign associated with this loyalty reward</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>order_id</td>
      <td>
        The Order ID of the purchase that the Loyalty Member made, which created this rewardable event
      </td>
      <td>Only included if the <code>conversion_event</code> is a purchase</td>
    </tr>
    <tr>
      <td>purchase_total</td>
      <td>
        The total amount spent by the Loyalty Member on the purchase that created this rewardable event
      </td>
      <td>Only included if the <code>conversion_event</code> is a purchase</td>
    </tr>
    <tr>
      <td>birthday</td>
      <td>The birth date of the Loyalty Member</td>
      <td>Only included if known</td>
    </tr>
  </tbody>
</table>



### Loyalty Credit Event
<table>
  <thead>
    <tr>
      <th>Property Name</th>
      <th>Description</th>
      <th>Always Included</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>email</td>
      <td>Email address of the Loyalty Member</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>customer_id</td>
      <td>
        Customer ID of the Loyalty Member.<br><br>
        This will be the same value as the User ID that Segment receives for this event
      </td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>earning_event</td>
      <td>
        The type of event the Loyalty Member performed in order to earn this reward (e.g., Joined Program, Purchase, Refer a Friend, Sign Up, or Custom Event)
      </td>
      <td>Only included if the <code>credit_event_type</code> is earned</td>
    </tr>
    <tr>
      <td>credit_amount</td>
      <td>The amount of the update to the Loyalty Member's credit</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>reward_currency</td>
      <td>The currency of the update to the Loyalty Member's credit</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>customer_running_balance</td>
      <td>The current balance of the Loyalty Member's credit</td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>credit_event_type</td>
      <td>
        The type of update to the Loyalty Member's credit (e.g., earned, redeemed, expired, reversed)
      </td>
      <td>&#x2705;</td>
    </tr>
    <tr>
      <td>credit_issuer</td>
      <td>
        The email address of the Friendbuy user who manually issued the credit
      </td>
      <td>Only sent if credit is issued manually</td>
    </tr>
    <tr>
      <td>credit_description</td>
      <td>
        The description provided when a credit is manually issued
      </td>
      <td>Only sent if credit is issued manually and the description field is filled in</td>
    </tr>
  </tbody>
</table>




## Adding Destinations

Now that your Source is set up, you can connect it with Destinations.

Log into your downstream tools and check to see that your events appear as expected, and that they contain all of the properties you expect. If your events and properties don’t appear, check the [Event Delivery](https://segment.com/docs/connections/event-delivery/) tool, and refer to the Destination docs for each tool for troubleshooting.

If there are any issues with how the events are arriving to Segment, [contact the Friendbuy support team](mailto:support@friendbuy.com).