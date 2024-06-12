---
title: Using Linked Audiences with Braze
plan: engage-foundations
beta: true
hidden: true
---

# Using Linked Audiences with Braze

Linked Audiences allows you to send the predefined traits of any audience profile, along with the attributes of any entities used to match the profile into the audience to Braze and use them for dynamically personalizing  email messages. 

The following topic is intended for a Technical Marketer and Data Engineer to complete together while setting up their Linked Audience. 

# Supported Braze Engagement Tools

The following engagement tools are available for use with Linked Audiences in Segment:

Type
Description
Action-based Campaigns
Trigger and dynamically personalize campaigns with rich entity context.


## Segment Destination Actions

Segment sends event data it receives from your sources, to actions-based destinations. (For example: associated accounts for the audience profiles with past due accounts). You can configure multiple triggers per audience (For example: one for account entry, and one for account exit).

## Segment Destination Action

How does it work?
How does Braze store the data?
Braze API Endpoint
Track Event 
Segment sends personalization payload information into Braze via Braze Profile custom events. The entity personalization payload is contained in the events parameter within API calls. Segment appends Profile Traits as objects (or event properties) and Entity Context as nested objects.
Event objects

Nested objects in custom events
track API endpoint 
Update User Profile 
Segment sends personalization payload information into Braze via Braze profile custom attributes. The entity personalization payload is contained in the attributes parameter in API calls.
User attributes object  

Nested custom attributes
track API endpoint 

# Braze Action-based Delivery Campaign

Braze Action-Based Delivery campaigns store the entity personalization payload as nested objects in custom events. 

## Prerequisites

You must have previously done the following before setting up an action based delivery campaign in Braze. 

In Segment, ensure you have:

- Set up your Linked Audience.
- A copy of your linked audience Event Personalization Payload, event name, and Braze user id.
- Set up Braze as an actions destination. 
- Set up a Track Event destination action and the relevant trigger. 

In Braze, ensure you have:

- Permissions to access the application, or access to someone who has permissions. 
- Created all Segment profiles using the Update User Profile destination action via Connections or Reverse ETL. This is a requirement for them to receive an action-based campaign.
- Created a Braze profile with an email address that you want to use for campaign testing (your own). 
- Familiarity with the Liquid templating syntax to manually type out the code using dot notation.

## Step 1: Set up a Braze action-based Delivery Campaign

To take advantage of Linked Audiences, you must now take some additional steps in Braze to set up an action-based delivery campaign. 

In Braze, do the following: 

1. Create a new email Campaign. 
2. Create an email using the HTML Editor to begin personalizing with liquid tags. 
3. Reference your personalization payload schema from Segment to determine what properties to include in your message.
4. Translate the Segment event properties in the payload schema into liquid syntax, and enter it in the HTML editor in Braze. See the personalization examples below for more specific details on what the payload looks like. 
5. Next, schedule your campaign delivery:

    - Choose Action based delivery > custom event > Add trigger. 
    - Search and choose the name of the Segment custom event you previously set up and tested in Segment.
5. Select your target Audience:
    - Add a filter to target users without a segment 
    - Search and choose the name of the Segment custom event you previously set up and tested in Segment.
    - Select ‘more than 0 times’ as the timeframe for this filter. 
6. Choose any additional audience settings that apply, then review and deploy your campaign, then continue on to Step 2: Test your campaign flow. 

## Step 2: Test your campaign flow in Segment

In Segment, finish setting up your destination campaign by sending yourself a test email for review by clicking the **Send test event to destination** button. Review the email you received, and ensure it is formatted properly. 

If your email doesn’t look the way you want it to, adjust the liquid syntax in Braze, and send another test event. See the personalization examples below for more specific details

When you’re finished testing your campaign, click Save and Enable to save your linked audience, then proceed to Step 4: Enable your Linked Audience.

# Liquid Examples to use in Braze

Use the following examples as context and information to experiment with setting up your campaign in Braze.

The following is an example of what your payload data might look like with nested payload properties:


{
   "event": "abandoned_carts_linked_audience",
   "properties": {
      "first_name": "Andrew",
      "last_name": "Shopper",
      "shopping_cart__id": "123",
      "shopping_cart__shopping_cart_products": [
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


The following table helps translate you payload data into Liquid syntax:  

Reference Data Definition
Liquid Syntax 
Example Properties
Reference a specific event property
{{event_properties.${event_property_name}}}


{{event_properties.${first_name}}}
Reference nested event properties within an Array


{{event_properties.shopping_cart__shopping_cart_products.[#_that_represents_specific_nested_event_in_array].event_property_name }}
{{event_properties.shopping_cart__shopping_cart_products[0].product_name}}


## Basic Payload Email Example

Use the Segment payload data you copied when setting up your Linked audience to build an abandoned cart email campaign that includes specific information for the product in a customer’s shopping cart.

When an email is sent, it will list the specific product, and its related price in your customer’s shopping cart. It might look like the following: 



This is an example of what your email using HTML and liquid tags might look like in Braze:

Hi {{event_properties.${first_name}}},
<br />
<br />
Did you forget to checkout?<br />
<br />
We noticed you added some items to your shopping cart including this item: <br />
<br />
<b>Product Name: </b> 
{{event_properties.shopping_cart__shopping_cart_products[0].product_name}}
<br />
<b>Product Price: </b> 
{{event_properties.shopping_cart__shopping_cart_products[0].product_price}} USD
<br />
<br />

Quick, now is your chance to own this item before it sells out!

## Advanced Payload Example Email Example

When you want to personalize your campaign with a dynamic event payload, you can use an iteration tag to run a block of code repeatedly. In this abandoned cart email campaign example, you can use a for loop to list all of the products and their related prices in a customer’s shopping cart.

When an email is sent, it will list all of the products and their related prices in your customer’s shopping cart. It might look like the following: 



This is an example of what your email using HTML and liquid tags might look like in Braze:


Hi {{event_properties.${first_name}}},
<br />
<br />
Did you forget to checkout?<br />
<br />
We noticed you added some items to your shopping cart. Here's what you left: <br />
<br />

{% for shopping_cart_products in event_properties.${shopping_cart__shopping_cart_products} %}
<b>Product Name: </b>
{{shopping_cart_products.product_name}}
<br />
<b>Product Price: </b>
{{shopping_cart_products.product_price}} USD
<br />
<br />

{%endfor%}

Quick, now is your chance to own these items before they sell out!