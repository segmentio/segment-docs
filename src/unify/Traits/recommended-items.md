---
title: Recommended Items
plan: unify-plus
---

Recommended Items, part of Segment's CustomerAI, lets you add personalized item recommendations as a trait to each user profile.

Based on a user's past interactions, this trait generates a list of up to 5 items, like products, articles, or songs, that each user is most likely to engage with.

This recommendation is designed for cases where you want to personalize experiences, like email content, in-app recommendations, or website suggestions, to fit each user's unique preferences.

In this guide, you’ll learn how to set up a Recommended Item trait, as well as best practices to get the most out of your recommendations.

## Before you begin

Before you create Recommended Item traits, you'll first need to set up a Recommendation Catalog. The catalog setup process involves mapping your interaction events (like `order_completed`, `product_added`, and so on), as well as providing product from those interaction events.

For more information on setting up your Recommendation Catalog, see the [Product Based Audiences documentation](/docs/engage/audiences/product-based-audiences/#set-up-your-recommendation-catalog).

## Create a Recommended Item trait

Follow these steps to create a Recommended Item trait:

1. In your Segment workspace, navigate to **Unify > Traits > + Create computed trait**.
2. In the **New Computed Trait** builder, click **Recommendation**, then click **Next**.
3. In **Select users**, click **+ Add condition** to choose the users who should receive recommendations.
    - You can create recommendations for up to 2 million non-anonymous customers.
4. In **Define recommended items**, choose the item type you want to recommend. 
    - This is based on your product catalog.
5. Choose how many item types you want to return onto each profile. You can select up to 5 item types.
6. Click **Calculate** to get a preview of the number of users who will receive your recommendations, then click **Next**.
7. (Optional:) Select destinations you want to sync the trait to, then click **Next**.
8. Give your trait a name, then click **Create Trait**.

Segment begins creating your new trait. This process could take up to 48 hours.

## Example use case: 

Suppose you’re managing a music streaming app and want to give each user personalized music recommendations based on their listening habits. Here's how you might set this trait up:

| Step                 | Configuration                                                                                                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Select users         | Use an audience based on up to 2 million active, non-anonymous listeners who played at least one song in the past month.                                                        |
| Item type            | Select **Albums** as the item type to recommend. Because you have an extensive catalog of music, this lets each listener receive recommendations tailored to their interests.   |
| Number of item types | You decide to return a maximum of 5 albums for each profile, keeping the recommendations relevant and concise.                                                                  |
| Calculate            | Clicking **Calculate** gives you an overview of how many users will receive the album recommendations. Use it to ensure your conditions and catalog mapping meet your criteria. |
| Sync to destinations | This optional steps lets you sync the trait to third-party destinations that can deliver album recommendations over email, in-app messaging, or push notifications.             |
| Trait naming         | Name your trait `Personalized Album Recommendations`, making it easy to identify for future campaigns.                                                                          |

By setting up a trait like this, each user profile now includes personalized recommendations that reflect individual tastes. You can use these recommendations across a range of touchpoints, like in-app sections, personalized email content, or targeted messaging, to create a more engaging and customized user experience.