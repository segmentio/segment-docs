---
title: Predictions
plan: unify-plus 
redirect_from:
  - "/engage/audiences/predictive-traits"
---

Predictions, Segment's artificial intelligence and machine learning feature, lets you predict the likelihood that users will perform any event tracked in Segment.

With Predictions, you can identify users with, for example, a high propensity to purchase, refer a friend, or use a promo code. Predictions also lets you predict a user's lifetime value (LTV).

Segment saves predictions to user profiles, letting you build Audiences, trigger Journeys, and send data to downstream destinations.

For more details on AI usage and data, see [Predictions Nutrition Facts Label](/docs/unify/traits/predictions/predictions-nutrition-facts/).

On this page, you'll learn how to build a prediction.

## Build a prediction

![The Predictive Trait builder in the Segment UI](../../images/trait_builder.png)

Follow these steps to build a prediction:

1. In the Trait Builder, click **Predictions**, select the prediction you want to create, then click **Next**..
- (For custom Predictive Goals) Add a condition(s) and event(s) to predict. 
- Select the event and (optional) property that you want to use to make a prediction.
5. Select a time period for the prediction. 
6. (Optional) In **Include all events**, uncheck any events you don't want Segment to factor into the prediction.
7. Click **Calculate**. If you're satisfied with the available data, click **Next**.
5. (Optional) Connect a Destination, then click **Next**.
6. Add a name and description for the Trait, then click **Create Trait**.

Keep the following in mind when you build a prediction:

- Segment lets you predict the likelihood of a customer performing multiple events. 
- You can choose a time period of 15, 30, 60, 90, or 120 days. 
- You have granular control over the events Segment factors into the predictive model. By default, Segment's model makes predictions on all events sent to Engage. Segment lets you exclude events you don't want included by unselecting **Include all events**, then filtering out any events you want excluded from the model.

In the next section, you'll learn more about the four available predictions.

## Choosing a prediction

Segment offers four predictions: Custom Predictive Goals, Likelihood to Purchase, Predicted LTV, and Likelihood to Churn.

### Custom Predictive Goals

Custom Predictive Goals require a starting cohort, target event, and quality data.

#### Starting cohort

When you build a Custom Predictive Goal, you'll first need to select a cohort, or a group of users, for which you want to make a prediction. Traits with small cohorts compute faster and tend to be more accurate. If you want to predict for an entire audience, though, skip cohort selection and move to selecting a target event.

#### Target event

The target event is the Segment event that you want to predict. In creating a prediction, Segment determines the likelihood of the user performing the target event. Segment lets you include up to two target events and an event property in your prediction.

### Data requirements

As with everything in machine learning, better data = better predictions. Trust and performance are Segment's number 1 priority, so we have a number of data checks to ensure that the Predictions we make are of high quality and can be relied upon.
We do our best to provide this guidance in the UI before you create a trait, but some of our checks can only happen once we start to train a model. If a trait fails, you’ll see an error message and description in the UI. In general, here are Segment's best practices, data requirements, and service limits for Predictions.

#### Definitions
- **Feature Window**: The time period in the past that contains the data that the model will use for training.
- **Target Window**: This is the time horizon over which you want to make a prediction. You can select this in the UI for each of the different traits.
- **Target Event**: This is the event that you are predicting the likelihood of a customer performing.
So if you want to create a propensity to purchase over the next 30 days, the Target Window would be 30 days, and the Target Event would be `Order Completed`, (or whichever purchase event you are tracking).

#### To get access to predictions, you must : 
- Track fewer than 100 million users in the Engage Space.
- Also track fewer than 5,000 event types. _An event type, refers to the total number of distinct events that were seen across all users in an Engage Space within the past 15 days._
  - If you track more than 5,000 distinct events, please stop tracking enough events to drop below this limit, and then wait around 15 days before trying to create your first prediction.
  - An event becomes inactive once it has not been sent to an Engage Space within the past 15 days.
  - To prevent events from reaching your Engage Space, you can modify your event payloads to include `integrations.Personas` as `false`.
    - For more information on using the integrations object, please see [Spec : Common Fields](https://segment.com/docs/connections/spec/common/#context:~:text=In%20more%20detail%20these%20common%20fields,Destinations%20field%20docs%20for%20more%20details.), [Integrations](https://segment.com/docs/connections/spec/common/#context:~:text=Kotlin-,Integrations,be%20sent%20to%20rest%20of%20the%20destinations%20that%20can%20accept%20it.,-Timestamps), and [Filtering with the Integrations object](https://segment.com/docs/guides/filtering-data/#filtering-with-the-integrations-object).
    - Analytics.js example : `analytics.track("Button Clicked", {button:"submit form"}, {"integrations":{"Personas":false}})`. 
- Track more than 1 event type.

#### To have a trait compute successfully, you must :
- Have at least 5 different event types tracked in the Feature Window.
- These 5 events must have data that spans 1.5x the length of the Target Window in the past.
  - So if you are creating a propensity to purchase in the next 60 days, there must be at least 90 days of historical data.
- If making a prediction for a smaller subset audience, then this audience must contain more than 1 non-anonymous user.
- At least 100 users performing the Target Event.
- At least 100 users not performing the Target Event.

> info "Predictive Traits and anonymous events"
> Predictive Traits are limited to non-anonymous events, which means you'll need to include an additional `external_id` other than `anonymousId` in the targeted events. If want to create Predictive Traits based on anonymous events, reach out to your CSM with your use case for creating an anonymous Predictive Trait and the conditions for trait.

### Likelihood to Purchase

Likelihood to Purchase is identical to Custom Predictive Goals, but Segment prefills the `Order Completed` event, assuming it's tracked in your Segment instance. 

If you don’t track `Order Completed`, choose a target event that represents a customer making a purchase.

### Predicted Lifetime Value

Predicted Lifetime Value predicts a customer's future spend over the next 90 days. To create this prediction, select a purchase event, revenue property, and the currency (which defaults to USD). The following table contains details for each property:

| Property        | Description                                                                                                                |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Purchase event  | Choose a target event that represents a customer making a purchase. For most companies, this is usually `Order Completed`. |
| Purchase amount | Select the purchase event property that represents the total amount. For most companies, this is the `Revenue` property.   |
| Currency        | Segment defaults all currencies to USD.                                                                                    |

### Likelihood to Churn

Likelihood to Churn proactively identifies customers likely to stop using your product. Segment builds this prediction by determining whether or not a customer will perform a certain action.

To use Likelihood to Churn, you'll need to specify a customer event, a future time frame for which you want the prediction to occur, and if you want to know whether the customer will or won't perform the event.

For example, suppose you wanted to predict whether or not a customer would view a page on your site over the next three months. You would select `not perform`, `Page Viewed`, and `at least 1 time within 90 days`. 

Segment would then build the prediction from this criteria and create specific percentile cohorts. You can then use these cohorts to target customers with retention flows, promo codes, or one-off email and SMS campaigns.

#### Data requirements

Predicted LTV has strict data requirements. Segment can only make predictions for customers that have purchased two or more times. Segment also requires a year of purchase data to perform LTV calculations.

## Use cases

For use cases and information on how Segment builds prediction, read [Using Predictions](/docs/unify/traits/predictions/using-predictions/).
