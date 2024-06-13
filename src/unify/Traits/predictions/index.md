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

#### Selecting events (optional)

Some customers want to specifically include or exclude events that get fed into the model. For example, if you track different events from an EU storefront compared to a US storefront and you only want to make predictions using data from the US, you could unselect the events from the EU space. This step is optional, Segment only recommends using it if you have a clear reason in mind for removing events from becoming a factor in the model.


#### Data requirements

Segment doesn't enforce data requirements for predictions. In machine learning, however, data quality and quantity are critical. Segment recommends that you make predictions for at least 50,000 users and choose a target event that at least 5,000 users have performed in the last 30 days. 

You can create predictions outside of these suggestions, but your results may vary.

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

For use cases and information on how Segment builds prediction, read [Using Predictions](/docs/unify/traits/predictions/using-predictions/).
