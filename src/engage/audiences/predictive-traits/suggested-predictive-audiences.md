---
title: Suggested Predictive Audiences
plan: engage-foundations
---

Suggested Predictive Audiences can help you improve customer engagement, drive higher conversion rates, and reduce ad spend.

This page explains what a Suggested Predictive Audience is, how to build a Suggested Predictive Audience, and what each available Audience targets.

## Suggested Predictive Audience basics

A Suggested Predictive Audience is an out-of-the-box Audience template driven by machine learning.

Segment offers [five templates](/docs/engage/audiences/predictive-traits/suggested-predictive-audiences/#suggested-predictive-audience-types) that are prebuilt with [Predictive Traits](/docs/engage/audiences/predictive-traits) like likelihood to purchase and lifetime predicted value. Selecting a template generates a Predictive Audience whose members you can engage in a number of ways:

- [Send an email or SMS campaign](/docs/engage/campaigns/) with a discount code
- Promote a new product line with a drip campaign
- Target the Audience members with online ads
- Send personalized product recommendations

## Build a Suggested Predictive Audience

Follow these steps to build a Suggested Predictive Audience:

1. In your Segment workspace, navigate to **Engage > Audiences**.
2. From the Audiences tab, select **Go to Predictive Audiences**.
3. On the Audience you want to build, click **Build Audience > + Add Audience**.
4. Select the Audience type you want to build, then click **Next**.
5. On the **Set up requirements** tab, confirm that you have the right events and traits required for the Suggested Predictive Audience, then click **Next**.
 - If you're missing a required event or trait, Segment prompts you to select it from the dropdown and match it to the required field(s).
6. Preview your Audience, then click **Next**.
7. (Optional:) Connect the new Audience to a Destination.
8. Give your Suggested Predictive Audience a name, then click **Create Audience**.

Your Suggested Predictive Audience is now live.

## Suggested Predictive Audience types

Engage offers five Suggested Predictive Audiences. The following table summarizes the customers each Audience targets and the events and traits Engage uses to build the Audience:

| Audience           | Target                                                                                       | Built with                                                       |
| ------------------ | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **Ready to buy**   | Customers who are likely to make a purchase                                                  | `Likelihood to buy` <br> `Order completed`                       |
| **Long shots**     | Customers who have previously interacted with your brand but aren’t currently engaged        | `Order Completed` <br> `Likelihood to purchase`                  |
| **High LTV**       | Customers with a high predicted lifetime value                                               | `Predicted LTV`                                                  |
| **Potential VIPs** | Recently active customers with high predicted lifetime value and high propensity to purchase | `Page Viewed` <br> `Likelihood to Purchase` <br> `Predicted LTV` |
| **Dormant**        | Inactive customers who are unlikely to purchase                                              | `Page Viewed` <br> `Likelihood to Purchase` <br> `Predicted LTV` |


### Audience descriptions

#### Ready to buy

Choose a **Ready to buy** Predictive Audience to target customers who show a high propensity to make a purchase.

Segment builds this Audience with the [Likelihood to Purchase Predictive Trait](/docs/engage/audiences/predictive-traits//#likelihood-to-purchase). Audience members show encouraging engagement and have a likelihood to buy in the top 20th percentile. 

#### Long shots

Choose a **Long shot** Predictive Audience to target customers who have made a purchase but have a middling likelihood to buy.

Segment builds this Audience with the `Order Completed` event and `Likelihood to Purchase` trait. Audience members have completed a purchase but currently have a likelihood to buy somewhere between the 25th and 65th percentile. 

#### High lifetime value

Choose a **High lifetime value** Predictive Audience to target customers that show a high predicted lifetime value.

Segment builds this Audience with the [Predicted LTV Predictive Trait](/docs/engage/audiences/predictive-traits//#predicted-lifetime-value). Audience members are in the top 10th percentile of predicted lifetime value and Segment expects that they'll spend the most over the next 90 days.

#### Potential VIPs

Choose a **Potential VIPs** Predictive Audience to target customers exhibiting several promising marketing behaviors.

Segment builds this Audience with the `Page Viewed` event and Likelihood to Purchase and Predicted LTV Predictive Traits. Audience members have been active on your site within the last two weeks, have a high predicted lifetime value, and a high propensity to purchase. 

#### Dormant

Choose a **Dormant** Predictive Audience to target inactive customers. 

Segment builds this Audience with the `Page Viewed` event and the Likelihood to Purchase Predictive Trait. Audience members have a low likelihood to purchase and haven't been active on your site in the last 60 days.
