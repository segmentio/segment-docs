---
title: Using Linked Audiences with Iterable
plan: engage-foundations
beta: true
hidden: true
---

Linked Audiences allows you to [dynamically personalize email messages](https://support.iterable.com/hc/en-us/articles/205480365-Personalizing-Templates-with-Handlebars){:target="_blank"} in Iterable using the predefined traits of any Linked Audience profile and the attributes of any entities used to match the profile into the audience. 

The following topic is intended for a Technical Marketer and Data Engineer to complete together while setting up their Linked Audience. 

## Supported Iterable Engagement Tools

The following engagement tools are available for use with Linked Audiences in Segment:

| Type                                                                                                                                             | Description                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| [Journey Campaign](https://support.iterable.com/hc/en-us/articles/360050203812-Campaigns-Overview#journey-campaigns){:target="_blank"} | Trigger a single-step campaign when you add a specific custom event to a user profile in Iterable. Dynamically personalize the campaign with rich entity context. |

## Segment Destination Actions

Segment sends data from your Linked Audiences to actions-based destinations. For example, you could send account information for the audience profiles with past due accounts to an email platform. 

You can configure multiple triggers per audience (For example: one for account entry, and one for account exit).

|Segment Destination Action                                                                              |How does it work?                                                                                                                                                                                                                                                                                |How does Iterable store the data?                                                                                               |Iterable API Endpoint                                                 |
|--------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------|
|[Custom Event](/docs/connections/destinations/catalog/actions-iterable/#custom-event) |Segment sends personalization payload information into Iterable as [Iterable custom events](https://support.iterable.com/hc/en-us/articles/206430615-Custom-Event-Properties#event-properties){:target="_blank"}. The entity personalization payload is contained in the `dataFields` parameter within API calls.|[Custom event properties](https://support.iterable.com/hc/en-us/articles/206430615-Events-and-Event-Properties#event-properties){:target="_blank"}|[Track an event](https://api.iterable.com/api/docs#events_track){:target="_blank"}      |
|[Upsert User](/docs/connections/destinations/catalog/actions-iterable/#upsert-user)  |Segment sends personalization payloads into Iterable as [Iterable user profiles](https://support.iterable.com/hc/en-us/articles/206430145-Managing-User-Profile-Fields-in-Iterable){:target="_blank"}. The entity personalization payload is contained in the `datafields` parameter in API calls.               |[User profile fields](https://support.iterable.com/hc/en-us/articles/206430145-Managing-User-Profile-Fields-in-Iterable){:target="_blank"}        |[Update user data](https://api.iterable.com/api/docs#users_updateUser){:target="_blank"}|

## Iterable Journey Campaign

Iterable [Journey Campaigns](https://support.iterable.com/hc/en-us/articles/360050203812-Campaigns-Overview#journey-campaigns){:target="_blank"} store the entity personalization payload as [event properties in custom events](https://support.iterable.com/hc/en-us/articles/206430615-Events-and-Event-Properties#event-properties){:target="_blank"}.

**Note**: Using custom events can impact your Iterable [billing](https://support.iterable.com/hc/articles/205480345#custom-event-usage-metrics){:target="_blank"}.

### Prerequisites

In Segment, ensure you have:

* Set up your [Linked Audience](/docs/engage/audiences/linked-audiences/). 
* A copy of your Linked Audience event name and Iterable user id.
* Set up [Iterable as an actions destination](/docs/connections/destinations/catalog/actions-iterable/). 
* Set up a [Custom Event destination action](/docs/connections/destinations/catalog/actions-iterable/#custom-event) and the relevant trigger using the [Linked Audiences](/docs/engage/audiences/linked-audiences/) workflow. 

In Iterable, ensure you have:

* Permissions to access the application, or access to someone who has permissions.
* Created all Segment profiles as Iterables profiles using the [Upsert User destination action](/docs/connections/destinations/catalog/actions-iterable/#upsert-user) through [Connections](/docs/connections/) or [Reverse ETL](/docs/connections/reverse-etl/). This is a requirement for them to receive a campaign triggered by a custom event.
* Review the custom event payload schema from your [Segment Linked Audiences test event](/docs/engage/audiences/linked-audiences/#step-3-send-a-test-event-to-your-destination) so you know what properties to include in your message personalization. You can do this by [accessing the user's profile](https://support.iterable.com/hc/en-us/articles/218365803-Managing-User-Profiles#accessing-a-user-s-profile){:target="_blank"} and clicking into their [event history](https://support.iterable.com/hc/en-us/articles/218365803-Managing-User-Profiles#event-history){:target="_blank"} to see the specific properties.
* Created an Iterable profile, for campaign testing, with an email address you can access.
* Familiarity with the [Handlebars templating syntax](https://support.iterable.com/hc/en-us/articles/205480365-Personalizing-Templates-with-Handlebars){:target="_blank"} to manually type out the code using dot notation.

### Step 1: Set up an Iterable Journey Campaign

To use Linked Audiences you must set up a Journey campaign in Iterable. 

In Iterable, do the following:

1. Create a [Journey](https://support.iterable.com/hc/en-us/articles/4405798856212-Journeys-Overview){:target="_blank"} and in the [Start tile](https://support.iterable.com/hc/en-us/articles/15934993720468-Journey-Setup-The-Start-Tile){:target="_blank"} select the Entry source as [Event Occurs](https://support.iterable.com/hc/en-us/articles/15934993720468-Journey-Setup-The-Start-Tile#event-occurs){:target="_blank"}, then choose **Entry type = Custom event**. Search and choose the name of the Segment custom event you previously set up and tested in Segment.
2. Add an [Email Message tile](https://support.iterable.com/hc/en-us/articles/12649121962260-Journey-Setup-Message-Tiles#setting-up-message-tiles){:target="_blank"}, [create your campaign](https://support.iterable.com/hc/en-us/articles/14825389793556-Creating-a-Campaign){:target="_blank"}, and connect it to your Start Tile.
3. Edit the content in your email: 
    1. Under Design, choose either the [WYSIWYG Editor](https://support.iterable.com/hc/en-us/articles/11554987128340-WYSIWYG-Editor){:target="_blank"} or the [Side by Side Editor](https://support.iterable.com/hc/en-us/articles/11555192523412-Side-by-Side-Editor){:target="_blank"}.
    2. Reference your Segment custom event payload schema in Iterable to determine what properties to include in your message. You can do this by [accessing the user's profile](https://support.iterable.com/hc/en-us/articles/218365803-Managing-User-Profiles#accessing-a-user-s-profile){:target="_blank"} and clicking into their [event history](https://support.iterable.com/hc/en-us/articles/218365803-Managing-User-Profiles#event-history){:target="_blank"} (Events > History > Details).
    3. Translate the event properties in the payload schema into [Handlebars syntax](https://support.iterable.com/hc/en-us/articles/205480365-Personalizing-Templates-with-Handlebars){:target="_blank"} for [custom events](https://support.iterable.com/hc/en-us/articles/206430615-Custom-Event-Properties#using-event-properties-to-customize-a-template){:target="_blank"}, and enter it in the HTML editor in Iterable. See the personalization [examples below](#handlebars-examples-to-use-in-iterable) for more specific details.
4. Choose any additional settings that apply and review and [publish your journey](https://support.iterable.com/hc/en-us/articles/6027159030804-Building-Journeys#publishing-a-journey){:target="_blank"}. Then continue on to Test your campaign flow in Segment.

### Step 2: Test your campaign flow

1. Open the Segment app and send yourself a test email for review. Add your Iterable user id and click **[Send test event to destination](/docs/engage/audiences/linked-audiences/#step-3-send-a-test-event-to-your-destination)**. Review the email you received, and ensure it is formatted properly. 

![A screenshot of the test event page](/docs/engage/images/send-test-event.png) 

If the event is sent successfully to Iterable, you will see a `“message”: “success”` response in Segment.
2. Open Iterable and check the [Campaign tab in Messaging Insights](https://support.iterable.com/hc/en-us/articles/360052814452-Messaging-Insights#viewing-metrics){:target="_blank"} (Insights > Messaging Insights > Campaigns > _[Your Unique Campaign])_ to confirm that Iterable has sent the message. 
3. If your email doesn’t look the way you want it to, adjust the [Handlebars syntax](https://support.iterable.com/hc/en-us/articles/205480365-Personalizing-Templates-with-Handlebars#referencing-user-profile-and-event-fields-with-handlebars){:target="_blank"} in Iterable, and send another test event. See the following [personalization examples](#handlebars-examples-to-use-in-iterable){:target="_blank"} for more specific details. 
4. When you’re finished testing your campaign, proceed to [Enable your Linked Audience](/docs/engage/audiences/linked-audiences/#step-4-enable-your-linked-audience).

## Handlebars examples to use in Iterable

Use the following examples as context and information to experiment with setting up your campaign in Iterable.

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

The following helps translate your payload data into Handlebars syntax:  

* To reference a specific event property:
    * Use the following Handelbars syntax: <code>{% raw %}{{event_property_name}}{% endraw %}</code>
    * An example of this property might look like:  <code>{% raw %}{{first_name}}{% endraw %}</code>
* To reference nested event properties within an Array:
    * Use the following Handlebars syntax:  <code>{% raw %}{{event_property_name.[#_that_represents_specific_entry_in_array].nested_event_property_name}}{% endraw %}</code>
    * An example of this property might look like:  <code>{% raw %}{{shopping_cart__products[0].product_name}}{% endraw %}</code>

You can read more on how to reference [event properties](https://support.iterable.com/hc/en-us/articles/205480365-Personalizing-Templates-with-Handlebars#referencing-user-profile-and-event-fields-with-handlebars){:target="_blank"} and [nested properties](https://support.iterable.com/hc/en-us/articles/360031118392-Handlebars-FAQ#how-do-i-reference-items-in-a-nested-object){:target="_blank"} in Handlebars. 

### Basic email example

Use the  Segment custom event payload schema to build an abandoned cart email campaign that includes specific information for the product in a customer’s shopping cart.

When an email is sent, it lists the specific product and its related price in your customer’s shopping cart. It might look like the following screenshot: 

![A screenshot of an email, with the name, item, and price personalized.](/docs/engage/images/linked-cart-simple.png)

This is an example of what your email using HTML and [Handlebars syntax](https://support.iterable.com/hc/en-us/articles/205480365-Personalizing-Templates-with-Handlebars){:target="_blank"} might look like in Iterable:

{% raw %} 

```html
Hi {{first_name}},
<br />
<br />
Did you forget to checkout?<br />
<br />
We noticed you added some items to your shopping cart including this item: <br />
<br />
<b>Product Name: </b> 
{{shopping_cart__products.[0].product_name}}
<br />
<b>Product Price: </b> 
{{shopping_cart__products.[0].product_price}} USD
<br />
<br />

Quick, now is your chance to own this item before it sells out!

```
{% endraw %} 

### Advanced email example

Use the Segment custom event payload schema to build an abandoned cart email campaign where you can use the [`#each` block helper](https://support.iterable.com/hc/en-us/articles/205480365-Personalizing-Templates-with-Handlebars#iterating-over-all-values-each){:target="_blank"} to run a block of code repeatedly. In this example, you can list all of the products and their related prices in a customer’s shopping cart.

When an email is sent, it lists all of the products and their related prices in your customer’s shopping cart. It might look like the following screenshot: 

![A screenshot of an abandoned cart email, with a personalized name, two items, and prices for those items.](/docs/engage/images/linked-cart-advanced.png)

This is an example of what your email using HTML and [Handlebars syntax](https://support.iterable.com/hc/en-us/articles/205480365-Personalizing-Templates-with-Handlebars){:target="_blank"} might look like in Iterable:

{% raw %} 
```html
Hi {{first_name}},
<br />
<br />
Did you forget to checkout?<br />
<br />
We noticed you added some items to your shopping cart. Here's what you left: <br />
<br />

{{#each shopping_cart__products}}
<b>Product Name: </b>
{{product_name}}
<br />
<b>Product Price: </b>
{{product_price}} USD
<br />
<br />

{{/each}}

Quick, now is your chance to own these items before they sell out!
```
{% endraw %} 
