---
title: Using Linked Audiences with Braze
plan: engage-foundations
beta: true
hidden: false
---


Linked Audiences allows you [dynamically personalize email messages](https://www.braze.com/docs/user_guide/personalization_and_dynamic_content/liquid){:target="_blank"} in Braze using the predefined traits of any Linked Audience profile and the attributes of any entities used to match the profile into the audience. 


## Supported Braze Engagement Tools

The following engagement tool is available for use with Linked Audiences in Segment:

| Type                                                                                                                                             | Description                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| [Action-based Campaigns](https://www.braze.com/docs/user_guide/engagement_tools/campaigns/building_campaigns/delivery_types/triggered_delivery/){:target="_blank"} | Trigger and dynamically personalize campaigns with rich entity context. |

## Segment Destination Actions

Segment sends data from your Linked Audiences to actions-based destinations. For example, you could send account information for the audience profiles with past due accounts to an email platform. 

You can configure multiple triggers per audience (For example: one for account entry, and one for account exit).


| Segment Destination Action                                                                                                     | How does it work?                                                                                                                                                                                                                                                                                                                                                                    | How does Braze store the data?                                                                                                                                                                                                                               | Braze API Endpoint                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| [Track Event](/docs/connections/destinations/catalog/braze-cloud-mode-actions/#track-event)                 | Segment sends personalization payload information into Braze as [Braze Profile custom events](https://www.braze.com/docs/user_guide/data_and_analytics/custom_data/custom_events/){:target="_blank"}. The entity personalization payload is contained in the `events` parameter within API calls. Segment appends Profile Traits as objects (or event properties) and Entity Context as nested objects. | [Event objects](https://www.braze.com/docs/api/objects_filters/event_object/){:target="_blank"} or [Nested objects in custom events](https://www.braze.com/docs/user_guide/data_and_analytics/custom_data/custom_events/nested_objects/){:target="_blank"} | [track API endpoint](https://documenter.getpostman.com/view/4689407/SVYrsdsG?version=latest#4cf57ea9-9b37-4e99-a02e-4373c9a4ee59){:target="_blank"} |
| [Update User Profile](https://segment.com/docs/connections/destinations/catalog/braze-cloud-mode-actions/#update-user-profile){:target="_blank"} | Segment sends personalization payload information into Braze as [Braze profile custom attributes](https://www.braze.com/docs/user_guide/data_and_analytics/custom_data/custom_attributes/){:target="_blank"}. The entity personalization payload is contained in the `attributes` parameter in API calls.                                                                                               | [User attributes object](https://www.braze.com/docs/api/objects_filters/user_attributes_object){:target="_blank"}  or [Nested Custom Attributes](https://www.braze.com/docs/user_guide/data_and_analytics/custom_data/custom_attributes/nested_custom_attribute_support/){:target="_blank"} | [track API endpoint](https://documenter.getpostman.com/view/4689407/SVYrsdsG?version=latest#4cf57ea9-9b37-4e99-a02e-4373c9a4ee59){:target="_blank"} |

## Braze Action-based Delivery Campaign

Braze's [Action-Based Delivery campaigns](https://www.braze.com/docs/user_guide/engagement_tools/campaigns/building_campaigns/delivery_types/triggered_delivery/){:target="_blank"} store the entity personalization payload as [nested objects in custom events](https://www.braze.com/docs/user_guide/data_and_analytics/custom_data/custom_events/nested_objects/){:target="_blank"}. 

### Prerequisites

Complete the following setup steps before you configure an action based delivery campaign in Braze.

In Segment, ensure you have:

- Set up your [Linked Audience](/docs/engage/audiences/linked-audiences/). 
- A copy of your Linked Audience [Event Personalization Payload](/docs/engage/audiences/linked-audiences#showhide-preview), event name, and Braze user id.
- Set up [Braze as an actions destination](/docs/connections/destinations/catalog/braze-cloud-mode-actions/). 
- Set up a [Track Event destination action](/docs/connections/destinations/catalog/braze-cloud-mode-actions/#track-event) and the relevant trigger using the [Linked Audiences](/docs/engage/audiences/linked-audiences/) workflow. 

In Braze, ensure you have:

- Permissions to access the application, or access to someone with permissions. 
- Created all Segment profiles as Braze profiles using the [Update User Profile destination action](/docs/connections/destinations/catalog/braze-cloud-mode-actions/#update-user-profile) through [Connections](/docs/connections/) or [Reverse ETL](/docs/connections/reverse-etl/). This is a [requirement for the profiles to receive an action-based campaign](https://www.braze.com/docs/user_guide/engagement_tools/testing/race_conditions/#targeting-new-users){:target="_blank"}.
- Created a Braze profile that has an email address you can access. You'll use this profile for campaign testing in a later step.
- Familiarity with the [Liquid templating syntax](https://www.braze.com/docs/user_guide/personalization_and_dynamic_content/liquid){:target="_blank"}.

### Step 1: Set up a Braze action-based Delivery Campaign

To use Linked Audiences you must set up an action-based delivery campaign in Braze. 

In Braze, do the following: 

1. Create a new [email Campaign](https://www.braze.com/docs/user_guide/message_building_by_channel/email){:target="_blank"}. 
2. [Create an email using the HTML Editor](https://www.braze.com/docs/user_guide/message_building_by_channel/email/html_editor/creating_an_email_campaign/){:target="_blank"} and [personalize it using Liquid tags](https://www.braze.com/docs/user_guide/personalization_and_dynamic_content/liquid){:target="_blank"}. 
   1. Reference your [personalization payload schema](/docs/engage/audiences/linked-audiences/#showhide-preview) from Segment to determine what properties to include in your message.
   2. Translate the Segment event properties in the payload schema into Liquid syntax for [custom events](https://www.braze.com/docs/user_guide/data_and_analytics/custom_data/custom_events){:target="_blank"}, and enter it in the Braze HTML editor. See the following personalization [examples](#liquid-examples-to-use-in-braze) for more details on how you can personalize your campaign.
3. Next, [schedule your campaign delivery](https://www.braze.com/docs/user_guide/engagement_tools/campaigns/building_campaigns/delivery_types){:target="_blank"}:
    1. Select [Action-based delivery](https://www.braze.com/docs/user_guide/engagement_tools/campaigns/building_campaigns/delivery_types/triggered_delivery/#step-1-select-a-trigger-event){:target="_blank"} > [**New Trigger Action**](https://www.braze.com/docs/user_guide/engagement_tools/campaigns/building_campaigns/delivery_types/triggered_delivery/#step-1-select-a-trigger-event){:target="_blank"}: [**Perform Custom Event**](https://www.braze.com/docs/user_guide/data_and_analytics/custom_data/custom_events){:target="_blank"} > **Add Trigger**. 
    2. Search for and select the name of the Segment custom event you previously set up and tested in Segment.
    3. Select **Delivery Controls** > [**Allow users to become re-eligible to receive campaigns**](https://www.braze.com/docs/user_guide/engagement_tools/campaigns/building_campaigns/delivery_types/reeligibility/#campaigns){:target="_blank"} checkbox, and select 0 minutes. This is necessary for [Step 2: Test your campaign flow](#step-2-test-your-campaign-flow) so that you don’t have to wait for a user to become re-eligible while testing. You can adjust these settings after you have finished testing.
4. Select your target Audience:
    1. Add a filter to [target users without a segment](https://www.braze.com/docs/user_guide/engagement_tools/campaigns/building_campaigns/targeting_users/#without-segment){:target="_blank"}. 
    2. Search for and select the name of the Segment custom event you previously set up and tested in Segment.
    3. Select **More than 0 times** as the timeframe for this filter. 
5. Update any additional settings that apply to your campaign, then [review and deploy](https://www.braze.com/docs/user_guide/message_building_by_channel/email/html_editor/creating_an_email_campaign/#step-5-review-and-deploy){:target="_blank"} your campaign and continue to [Step 2: Test your campaign flow](#step-2-test-your-campaign-flow). 

### Step 2: Test your campaign flow

Open the Segment app and send yourself a test email for review. Add your Braze user id and click **[Send test event to destination](/docs/engage/audiences/linked-audiences/#step-3-send-a-test-event-to-your-destination)**. Review the email you received, and ensure it is formatted properly.

![A screenshot of the test event page](/docs/engage/images/send-test-event.png)

1. If the event is sent successfully to Braze, you will see a `“message”: “success”` response in Segment.
2. Open Braze and check your [campaign dashboard](https://www.braze.com/docs/user_guide/message_building_by_channel/email/reporting_and_analytics/email_reporting){:target="_blank"} (Braze > *[Your Unique Campaign]* > Analytics) to confirm that Braze sent the message. It can take up to 15 minutes for Braze to send the email.
3. If your email doesn’t look the way you want it to, adjust the [Liquid syntax](https://www.braze.com/docs/user_guide/personalization_and_dynamic_content/liquid/using_liquid/#using-liquid-1){:target="_blank"} in Braze and send another test event in Segment. See the following [personalization examples](#liquid-examples-to-use-in-braze) for more specific details.
4. When you’re finished testing your campaign, proceed to [Enable your Linked Audience](/docs/engage/audiences/linked-audiences/#step-4-enable-your-linked-audience).

## Liquid examples to use in Braze

Use the following examples as context and information to experiment with setting up your campaign in Braze.

The following is an example of what your payload data might look like with nested payload properties:


```js
{
   "event": "abandoned_carts_linked_audience",
   "properties": {
      "first_name": "Andrew",
      "last_name": "Shopper",
      "shopping_cart__id": "123",
      "shopping_cart__products": [
         {
            "id": "324",
            "product_name": "Premium Tennis Shoes",
            "product_price": "$140",
            "__entity": "product"
         },
         {
             "id": "489",
             "product_name": "Premium Jacket",
             "product_price": "$200",
            "__entity": "product"
          }
       ],
       "__entity": "cart"
     }
 }
```

The following helps translate your payload data into Liquid syntax:  

- To reference a specific event property:
  - Use the following liquid syntax: <code>{% raw %}{{event_properties.event_property_name}}{% endraw %}</code>
  - An example of this property might look like: <code>{% raw %}{{event_properties.first_name}}{% endraw %}</code>
- To reference nested event properties within an Array:
  - Use the following liquid syntax: <code>{% raw %}{{event_property_name.[#_that_represents_specific_entry_in_array].nested_event_property_name }}{% endraw %}</code> 
  - An example of this property might look like: <code>{% raw %}{{event_properties.shopping_cart__products[0].product_name}}{% endraw %}<code> 

### Basic email example

Use the Segment payload data you [copied when setting up your Linked audience](/docs/engage/audiences/linked-audiences#showhide-preview) to build an abandoned cart email campaign that includes specific information for the product in a customer’s shopping cart.

When an email is sent, it lists the specific product and its related price in your customer’s shopping cart. It might look like the following screenshot: 

![A screenshot of an email, with the name, item, and price personalized.](/docs/engage/images/linked-cart-simple.png)

This is an example of what your email formatted using [HTML](https://www.braze.com/docs/user_guide/message_building_by_channel/email/html_editor/creating_an_email_campaign/){:target="_blank"} and [Liquid](https://www.braze.com/docs/user_guide/personalization_and_dynamic_content/liquid){:target="_blank"} might look like in Braze:

{% raw %} 

```html
Hi {{event_properties.first_name}},
<br />
<br />
Did you forget to checkout?<br />
<br />
We noticed you added some items to your shopping cart including this item: <br />
<br />
<b>Product Name: </b> 
{{event_properties.shopping_cart__products[0].product_name}}
<br />
<b>Product Price: </b> 
{{event_properties.shopping_cart__products[0].product_price}} USD
<br />
<br />

Quick, now is your chance to own this item before it sells out!
```

{% endraw %} 


### Advanced email example

Use the Segment payload data you [copied when setting up your Linked audience](/docs/engage/audiences/linked-audiences#showhide-preview) to build an abandoned cart email campaign where you can use an [iteration tag](https://www.braze.com/docs/user_guide/personalization_and_dynamic_content/liquid/supported_personalization_tags/#iteration-tags){:target="_blank"} to run a block of code repeatedly. In this example, you can use a for loop to list all of the products and their related prices in a customer’s shopping cart.

When an email is sent, it lists all of the products and their related prices in your customer’s shopping cart. It might look like the following: 

![A screenshot of an abandoned cart email, with a personalized name, two items, and prices for those items.](/docs/engage/images/linked-cart-advanced.png)

This is an example of what your email formatted using [HTML](https://www.braze.com/docs/user_guide/message_building_by_channel/email/html_editor/creating_an_email_campaign/){:target="_blank"} and [Liquid](https://www.braze.com/docs/user_guide/personalization_and_dynamic_content/liquid){:target="_blank"} might look like in Braze:

{% raw %} 

```html
Hi {{event_properties.first_name}},
<br />
<br />
Did you forget to checkout?<br />
<br />
We noticed you added some items to your shopping cart. Here's what you left: <br />
<br />

{% for products in event_properties.shopping_cart__products %}
<b>Product Name: </b>
{{products.product_name}}
<br />
<b>Product Price: </b>
{{products.product_price}} USD
<br />
<br />

{%endfor%}

Quick, now is your chance to own these items before they sell out!
```

{% endraw %} 
