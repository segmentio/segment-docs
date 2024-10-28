---
title: Recommended Items
plan: unify-plus
---

Recommended Items, part of Segment's CustomerAI, lets you add personalized item recommendations to each user profile.

Based on a user's past interactions, this trait generates a list of up to 10 items, like products, articles, or songs, that each user is most likely to engage with.

This recommendation is designed for cases where you want to personalize experiences, like email content, in-app recommendations, or website suggestions, to fit each user's unique preferences.

In this guide, you’ll learn how to set up a Recommended Item trait, as well as best practices to get the most out of your recommendations.

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