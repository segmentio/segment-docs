---
title: Product Based Audiences
hidden: true
beta: true
---
CustomerAI Recommendations helps your marketing teams harness the power of Machine Learning. Recommendations is making it easier to build personalized recommendations and then add them into existing websites, ad destinations, email marketing systems, and audiences.

Recommendations is a personalization feature that helps you improve in-product / digital experiences to maximize lift. The recommendations are optimized for user-based commerce, media, and content affinity use cases. There are 2 critical ways that you can think of using Product Recommendations: Product Based Items and Personalized Items Traits. These can be used to power a number of campaign types around Cross Selling, Upselling, Ranking, Moving Excess Inventory, Next Best Action, and Increasing Average Order Volume (AOV)

## Use Cases
### Product-based Audiences
Product-based Audiences is a new type of CustomerAI Audience. It lets you choose a specific item, brand, or category in your catalog, and then find the people that are most likely to purchase, view, read or engage with that specific product.
Let’s say you’re an ecommerce store that sells stationery. You might want to create a Back to School campaign around specific products or categories, like paper, binders, pens, and more
Other use cases include
  - New Product Announcements
  - Excess Inventory Sales
  - Holiday-based promotions
Any time you want to start with a product or category and then return an audience of the people that are most likely to engage, use a Product Based Audience

### Personalized Items Trait
Personalized Items Trait is a new type of trait that gets added onto the Segment Profile. You choose what field you want to output onto the profile (product skus, brands, categories, etc) and it will return a list of the 5-10 items that each customer is most likely to engage with.
This is incredibly useful for email personalization, website personalization or any other type of dynamic personalization. Use this personalized items trait combined with the Segment Profile API to power rich customer experiences.
For example, let’s say you’re Netflix and one of your users has just finished watching a series. On the website, you could create a scrollable catalog with different show recommendations, unique for each user.
Personalized item traits are great at dynamic personalization use cases where you want to showcase the different items that users are most likely to engage with.

## Getting Access
Product Based Audience feature is currently in Private Beta, with Personalized Items Traits coming soon after. If you’re interested in testing it out or learning more about pricing, reach out to your Customer Success Manager

## Using Product Based Audiences
### Setting Up Recommendation Catalog
To create these recommendations, Segment utilizes your interaction events (order_completed, product_added, product_searched, etc) and product meta data of those interaction events to power our Product Recommendations & Product Based Audiences workflows.

You must provide a mapping to these specific events.
First, head to Engage -> Engage Settings -> Recommendation Catalog to get started

#### Interaction Events
The first step is mapping your interaction events. You want to choose 3-7 events where customers are interacting with your products. These events will be different for each business, but some common examples might be
  - Order Completed
  - Product Added
  - Product Searched
  - Product Viewed
  - Added to Cart
  - Product Added to Wishlist
  - Added to Favorites

  Primary Key Mappings
For each interaction event that was selected, you need to identify the property of that event that represents the Primary Key of the Product.
So if you have selected the event Order Completed, you need to map the unique Product ID property that is tracked within Segment. This is how our system knows the meta data to use to power our machine learning model. A typical mapping might look something like this

  Column Mappings
Product Recommendations and Product Based Audiences let you utilize the different metadata that you track. For example, you can create an Audience around customers that are most likely to engage with a brand or a category.
In order to make a recommendation on one of these property levels, you must map those properties to our suggested Model Columns. For ecommerce companies, provide 4 suggested Model Columns to map towards. These fields are
  - Brand
  - Product Name - Price
  - Category

If you track slightly different data like Store Location, Company, SKU, or other fields that you would like to use to build a Product Based Audience, then create a new column to map to by hitting this button in the bottom left corner.
 

When mapping events to the model column, you want to select the event property that matches the model column. So if you are mapping to model column ‘Brand’, for each of the selected interaction events, select the property that refers to ‘Brand’.
See the screenshot below for an example of how this could look like
 With all of these fields filled out, it will take a few hours for this mapping to be live. Once complete, you’ll be able to create a Product Based audience based on the product name, product category, or even brand
Building a Product Based Audience
Once your catalog mapping is complete, we can now actually build your Audience. Again a product based audience lets you first start with a Brand, Category, Store Location, Product

 Name, or other parameter, and build an audience of the people that are most likely to engage with that item
Select a Product Based Audience
From Engage, click on ‘Audiences’, then ‘New Audience’
Then select ‘Product Based Audience.’ Note: if you don’t have your recommendation catalog set up, Segment will prompt you to map your catalog first.
Selecting a Property
Next, you will select the type of Product Based Audience you want to create. For example, if you want to build an audience based around the Brand, or Category, or Name, you will make that selection here.
These fields come directly from the Column Mapping we did in the Recommendation Catalog Set up.
  
  This screenshot shows me building an audience around the people that are most likely to purchase any item in the Keyboard Category.
You will be prompted with a dropdown field here, we recommend selecting an item from this dropdown. However, if you have a new item that you want to recommend that hasn’t yet been visible, you can type it in. Please note that it must match your exact tracking plan and is case sensitive
 Setting an Audience Size
The final step is choosing your audience size. The more customers that you choose in the audience. The larger the audience size, the lower the likelihood of each incremental customer’s individual propensity to purchase that item or category.
We recommend selecting customers in the top 20 percentile

For example, an audience of 100k people will have higher statistical likelihood than an audience size of 1 Million. However, the audience size of 1 Million might result in a higher number of total sales.
Also, this audience size that is selected is a maximum size. There are scenarios where the system will not be able to completely fill your audience size with customers that are likely to engage with your product.
 Wrapping Up
Finally, the audience should be computed within a few hours, up to a day depending on the amount of data that you track, and then you are ready to send these customers a campaign or promo. Please feel free to reach out if you have any questions.
We can’t wait to see what you build
