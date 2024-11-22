---
title: Product Based Recommendation Audiences
plan: engage-foundations
redirect_from:
  - '/engage/audiences/recommendation-audiences'
---

Product Based Recommendation Audiences lets you select a product, article, song, or other piece of content from your catalog, and then build an audience of the people that are most likely to engage with it. Segment optimized the personalized recommendations built by Product Based Recommendation Audiences for user-based commerce, media, and content affinity use cases. 

You can use Product Based Recommendation Audiences to power the following common marketing campaigns: 

- **Cross-selling**: Identify an audience of users who recently purchased a laptop and send those customers an email with a discount on items in the "laptop accessories" category. 
- **Upselling**: Identify an audience of users who regularly interact with your free service and send them a promotion for your premium service. 
- **Ranking**: Identify an audience of users who frequently interact with one category of your website and send them a promotion that contains only items from this category. 
- **Moving excess inventory**: Identify an audience of users who are in the top 5% of purchasers for a specific brand you sell and send them a coupon for the excess inventory you have of that brand. 
- **Next best action**: Identify an audience of users who frequently read articles in your website's "Sports" category and recommend those users your latest sports article. 
- **Increasing average order value (AOV)**: Identify an audience of users who frequently interact with the "For Kids" section of your website and send them a back to school promotion in August, with free shipping after a set price threshold. 

## Create a Product Based Audience

### Set up your Recommendation Catalog
Segment uses your interaction events (`order_completed`, `product_added`, `product_searched`, `song_played`, `article_saved`) and the event metadata of those interaction events to power the Recommendations workflow.

To create your Recommendation Catalog:
1. Open your Engage space and navigate to **Engage** > **Engage Settings** > **Recommendation catalog**. 
2. On the Recommendation catalog page, click **Create catalog**. 
3. Select up to 10 product-related events you'd like Segment to use as a basis for recommendations. *Segment recommends selecting 3-7 different events that represent user interaction. For example: Product Added to Cart, Product Searched, or Product Viewed*. 
4. Select a product ID for each product-related event you previously selected. 
5. Click **Next**. 
6. Map event properties to the suggested model columns. Segment recommends mapping all properties of a product hierarchy to allow for increased granularity when building your Recommendation Audience. <br> _(Optional)_: To add an additional column to your model, click **+ Add column** on the Map properties page. 
7. When you've completed your mappings, click **Save**. 

> warning ""
> Segment can take several hours to create your Recommendation Catalog. 

### Create your Product Based Audience
Once you've created your Recommendation Catalog, you can build a Recommendation Audience. A Recommendation Audience lets you select a parameter and then build an audience of the people that are most likely to engage with that parameter. 

To create a Product Based Audience: 
1. Open your Engage space and click **+ New audience**. 
2. Select **Recommendation Audience** and click **Next**. 
3. Select a property and value that you'd like to build your audience around (for example, if the property was "Company", you could select a value of "Twilio"). For values that haven't updated yet, enter an exact value into the **Enter value** field. If you're missing a property, return to your [Recommendation catalog](#set-up-your-recommendation-catalog) and update your mapping to include the property. 
4. Set a maximum audience size by selecting one of the pre-populated options, or move the slider to create a custom audience. Segment recommends audiences that contain less than the top 20% of your audience because as the size of your audience increases, the propensity to purchase typically decreases. See [Best practices](#best-practices) for more information.
5. When you've filled out all fields, click **Next** to continue. 
6. On the Select Destinations page, select any destinations you'd like to sync your audience to and click **Next**.
7. Enter a name for your destination, update any optional fields, and click **Create Audience** to create your audience. 

> warning ""
> Segment can take up to a day to calculate your Product Based Audience.

## Best practices

- When mapping events to the model column during the setup process for your [Recommendation catalog](#set-up-your-recommendation-catalog), select the event property that matches the model column. For example, if you are mapping to model column ‘Brand’, select the property that refers to ‘Brand’ for each of the selected interaction events.
- When you complete your audience creation, the status will display as "live" with 0 customers. This means the audience is still computing, and the model is determining which customers belong to it. **Segment recommends waiting at least 24 hours for the audience to finish computing.** Once the computation is complete, the audience size will update from 0 customers to reflect the finalized audience.
- As the size of your audience increases, the propensity to purchase typically decreases. For example, an audience of a hundred thousand people that represents the top 5% of your customers might be more likely to purchase your product, but you might see a greater number of total sales if you expanded the audience to a million people that represent the top 50% of your customer base. 
