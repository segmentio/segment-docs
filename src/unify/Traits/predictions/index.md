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

> warning "Not a HIPAA Eligible Service or PCI Compliant"
> Agent Copilot and Unified Profiles in Flex aren't HIPAA Eligible Services or PCI compliant and shouldn't be used in Flex or Segment workflows that are subject to HIPAA or PCI.

## Access and build a prediction

To create a prediction, you'll first request access, then build a prediction.

![The Predictive Trait builder in the Segment UI](../../images/trait_builder.png)

### Request Predictions access

Follow these steps to access Predictions:

1. Navigate to **Engage > Audiences > Computed traits** or **Unify > Traits**. Select **Create computed trait**.
2. Select **Request Access** to access Predictions.
   
**Note:** After requesting prediction access, it may take up to a day to receive the necessary permissions.

### Build a prediction

Once your Workspace is enabled for Predictions, follow these steps to build a prediction:

1. In the Trait Builder, select **Predictions**, choose the Trait you want to create, then click **Next**.
2. Select **Custom Predictive Goal**, **Likelihood to Purchase**, **Predicted Lifetime Value**, or **Likelihood to Churn**.
4. (For custom Predictive Goals) Add a condition(s) and event(s) to predict. 
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

The target event is the Segment event that you want to predict. In creating a prediction, Segment determines the likelihood of the user performing the target event. Predictions work better when many customers have performed the event.

#### Data requirements

Segment doesn't enforce data requirements for predictions. In machine learning, however, data quality and quantity are critical. Segment recommends that you make predictions for at least 50,000 users and choose a target event that at least 5,000 users have performed in the last 30 days. 

You can create predictions outside of these suggestions, but your results may vary.

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
