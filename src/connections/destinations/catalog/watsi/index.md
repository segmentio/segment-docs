---
title: Watsi Destination
---

The Watsi destination gives you the ability to create a trigger which will send a Watsi gift card to your users based on your Segment events!

# Getting Started

First of all, make sure you have a [Watsi](https://watsi.org) account. Once you have an account, you must have access to this destination. To get access, email Watsi at connect@watsi.org with your account information, and we'll turn on this feature on for you.

Now we can go to the [Segment settings](https://watsi.org/donor/api) page - you need to be logged in to view it - where you will see a few tabs:

+ **Account Information** - Here is where you can find your Api Auth Token and your email, the two necessary fields for enabling Watsi as a Segment destination (more on that below).
+ **Activity Log** - Here is where you will see a list of actions that Watsi has taken because of the destination. You will be able to keep track of successful triggers and also get insights as to any failures you might receive.
+ **Segment Events** - In this pane, you can create, edit, and delete your custom triggers that Watsi will attempt to send gift cards for.

## Segment Events

![](https://www.filepicker.io/api/file/c74wZbs3Ssiysdrftnsr)

Here you will see a list of events you have created triggers for. In this example, I have created a trigger for a Sign Up event that when read by Watsi will send a Gift Card to the recipient (presumably someone who signs up for your service) for $10. Let's add a new trigger for someone upgrading their accounts.

![](https://www.filepicker.io/api/file/PX7dQqJSTt5LP8vvfXLF)

Notice that Watsi can currently only create triggers based on Segment `track` calls.Finally, click `Save`, and your trigger will be made.

That's pretty much all there is to set up on the Watsi side of this. However, no gift cards are being sent yet! That's because we haven't turned on the Watsi Segment destination yet. Head over to the Segment dashboard and look at the Watsi Destination:

![](https://www.filepicker.io/api/file/qZSLJr2SmClM7fx1fiGL)

We're going to want to add our API Auth Token and email that we saw earlier and click on `Enable Destination`. Now things should be good to go. Let's talk about what the events should look like.

## Track

When you call [track](), Segment will send the event to Watsi with the `event name` and `properties` you provide. For Watsi's destination, we accept any track event, but we only do something for the triggers you've set above. Let's say you named the event `Sign Up`:

### *Sign Up*

If you'd like to send a Watsi gift card to one of your customers, all you have to do is send us this `track` event along with the following properties:

| property | description                                            |
| -------- | ------------------------------------------------------ |
| `name`   | The name of the customer who will receive a gift card. |
| `email`  | The customer's email to send the gift card to.         |
|          |                                                        |

### *Responses*

If a gift card is successful, an empty `HTTP `200 is returned, as Segment docs specify. This means your customer should receive a gift card to their email address!

### *Example Calls*

Here's an example `track` call (omitting common fields) with all the required properties.

```
{
  "type": "track",
  "event": "Send Gift Card",
  "properties": {
    "name": "Shigeru Miyamoto",
    "email": "shigeru@nintendo.com"
  }
}
```
