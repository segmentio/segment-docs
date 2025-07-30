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
6. (Optional) In **Include all events** and **Include all new traits** uncheck any events or traits you don't want Segment to factor into the prediction.
7. Click **Calculate**. If you're satisfied with the available data, click **Next**.
5. (Optional) Connect a Destination, then click **Next**.
6. Add a name and description for the Trait, then click **Create Trait**.

Keep the following in mind when you build a prediction:

- Segment lets you predict the likelihood of a customer performing multiple events. 
- You can choose a time period of 15, 30, 60, 90, or 120 days. 
- You have granular control over the events Segment factors into the predictive model. By default, Segment's model makes predictions on all events and custom traits sent to Engage. Segment lets you exclude events or traits you don't want included by unselecting **Include all events** or **Include all new traits**. 

In the next section, you'll learn more about the four available predictions.

## Choosing a prediction

Segment offers four predictions: Custom Predictive Goals, Likelihood to Purchase, Predicted LTV, and Likelihood to Churn.

### Custom Predictive Goals

Custom Predictive Goals require a starting cohort, target event, and quality data.

#### Starting cohort

When you build a Custom Predictive Goal, you'll first need to select a cohort, or a group of users, for which you want to make a prediction. Traits with small cohorts compute faster and tend to be more accurate. If you want to predict for an entire audience, though, skip cohort selection and move to selecting a target event.

#### Target event

The target event is the Segment event that you want to predict. In creating a prediction, Segment determines the likelihood of the user performing the target event. Segment lets you include up to two target events and an event property in your prediction.

### Access and data requirements

In machine learning, better data leads to better predictions. Because Segment prioritizes trust and performance, Segment has a number of data checks to ensure that each prediction is reliable and of high quality. Segment provides guidance in the UI before you create a trait, but some checks only occur during model training. If a trait fails, you’ll see an error message and description in the UI. 

This sections lists Segment's access and data requirements, service limits, and best practices for Predictions.

#### Definitions

- **Feature Window**: The past time period that contains the data used for model training.
- **Target Window**: The time horizon for which you want to make the prediction. You can select this in the UI for each trait.
- **Target Event**: The event predicting the likelihood of customer action.

For example, to predict a customer's propensity to purchase over the next 30 days, set the Target Window to 30 days and the Target Event to `Order Completed` (or the relevant purchase event that you track).

#### Predictions access requirements

To access Predictions, you must:

- Track more than 1 event type, but fewer than 2,000 event types. An event type refers to the total number of distinct events seen across all users in an Engage Space within the past 15 days.
  - If you currently track more than 2,000 distinct events, reduce the number of tracked events below this limit and wait around 15 days before creating your first prediction.
  - Events become inactive if they've not been sent to an Engage Space within the past 15 days.
- To prevent events from reaching your Engage Space, modify your event payloads to set `integrations.Personas` to `false`.
  - For more information on using the integrations object, see [Spec: Common Fields](/docs/connections/spec/common/#context:~:text=In%20more%20detail%20these%20common%20fields,Destinations%20field%20docs%20for%20more%20details.), [Integrations](https://segment.com/docs/connections/spec/common/#context:~:text=Kotlin-,Integrations,be%20sent%20to%20rest%20of%20the%20destinations%20that%20can%20accept%20it.,-Timestamps), and [Filtering with the Integrations object](https://segment.com/docs/guides/filtering-data/#filtering-with-the-integrations-object).
  - Analytics.js example: `analytics.track("Button Clicked", {button:"submit form"}, {"integrations":{"Personas":false}})`

#### Successful trait computation

This table lists the requirements for a trait to compute successfully: Please note that for the events below, there cannot be any days where the event was not seen or performed in the entire workspace

| Requirement                     | Details                                                                                                                                                                                                                               |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Event Types                     | Track at least 5 different event types in the Feature Window.                                                                                                                                                                         |
| Historical Data                 | Segment requires historical data spanning at least 3 times the length of the target window. For example, a 30-day window requires 90 days of past data.                                                                               |
| Subset Audience (if applicable) | Ensure the audience contains more than 1 non-anonymous user.                                                                                                                                                                          |
| User Limit                      | Ensure that you are making a prediction for fewer than 10 million users. If you track more than 10 million users in your space, define a smaller audience in the **Make a Prediction For** section of the custom predictions builder. |
| User Activity                   | At least 100 users performing the Target Event and at least 100 users not performing the Target Event.                                                                                                                                |

#### Selecting events (optional)

Some customers want to specifically include or exclude events that get fed into the model. For example, if you track different events from an EU storefront compared to a US storefront and you only want to make predictions using data from the US, you could unselect the events from the EU space. This step is optional, Segment only recommends using it if you have a clear reason in mind for removing events from becoming a factor in the model.

#### Selecting traits (optional)
You can choose which traits to include or exclude from your prediction model. Segment supports only numerical and boolean custom traits.

In the UI, you can deselect traits you don’t want the model to use. Selecting a trait means Segment will attempt to include it in the model, but it may be excluded during training if it doesn’t improve model performance.

If you keep Include all new traits selected, Segment will automatically consider any new traits you start tracking. If you deselect this option, new traits won’t be included in future model calculations unless you manually add them.

> info "Predictive Traits and anonymous events"
> Predictive Traits are limited to non-anonymous events, which means you'll need to include an additional `external_id` other than `anonymousId` in the targeted events. If want to create Predictive Traits based on anonymous events, reach out to your CSM with your use case for creating an anonymous Predictive Trait and the conditions for trait.

### Likelihood to Purchase

Likelihood to Purchase is identical to Custom Predictive Goals, but Segment prefills the `Order Completed` event, assuming it's tracked in your Segment instance. 

If you don’t track `Order Completed`, choose a target event that represents a customer making a purchase.

### Predicted Lifetime Value

Predicted Lifetime Value predicts a customer's future spend over the next 120 days. To create this prediction, select a purchase event, revenue property, and the currency (which defaults to USD). LTV is only calculated for customers that have performed the selected purchase events 2 or more times. The following table contains details for each property:

| Property        | Description                                                                                                                |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Purchase event  | Choose a target event that represents a customer making a purchase. For most companies, this is usually `Order Completed`. |
| Purchase amount | Select the purchase event property that represents the total amount. For most companies, this is the `Revenue` property.   |
| Currency        | Segment defaults all currencies to USD.                                                                                    |

### Likelihood to Churn

Likelihood to Churn proactively identifies customers likely to stop using your product. Segment builds this prediction by determining whether or not a customer will perform a certain action.

To use Likelihood to Churn, you'll need to specify a customer event, a future time frame for which you want the prediction to occur, and if you want to know whether the customer will or won't perform the event.

For example, suppose you wanted to predict whether or not a customer would view a page on your site over the next three months. You would select `not perform`, `Page Viewed`, and `at least 1 time within 90 days`. 

Churn predictions are only made for eligible customers. In the previous example, only customers that have performed `Page Viewed` in the last 90 days would be eligible to recieve this prediction. The Segment app shows you which customers are eligibile to recieve this prediction.

Segment then uses this criteria to build the prediction and create specific percentile cohorts. You can then use these cohorts to target customers with retention flows, promo codes, or one-off email and SMS campaigns.

## Use cases

Once a trait successfully computes, you can send them downstream to some destinations, or use them in an audience. Predictive Traits support destinations that support this list of identifiers:

    ANONYMOUS = "anonymous_id"
    USER = "user_id"
    EMAIL = "email"
    PHONE = "phone"
    IOS_IDFA = "ios.idfa"
    ANDROID_IDFA = "android.idfa"
    GROUP = "group_id"
    NAME = "name"
    GA_CLIENT = "ga_client_id"
    GOOGLE = "google_gid"
    BRAZE = "braze_id"
    SEGMENT = "segment_id"

Other destinations may drop events published by Predictive Traits

For use additional cases and information on how Segment builds prediction, read [Using Predictions](/docs/unify/traits/predictions/using-predictions/). 



