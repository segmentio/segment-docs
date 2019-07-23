---
title: "How do you add users?"
---

If you have more than one person working with your Segment Warehouse, you might want to create users for your team so that each person can have a discrete login. The three steps in this section will show you how to create a user, grant usage on a schema and then grant the privileges that the user will need to interact with that schema.

### 1\. Creating a user with the [CREATE USER](http://docs.aws.amazon.com/redshift/latest/dg/r_CREATE_USER.html) command

![](../../images/asset_h5NYu2A6.png)

The code above in \[\] is optional, you don't need to group your users or give their credentials an expiration date, the code works without it. However, if you do choose to use those parameters, `<abstime>` should be formatted as '2015-09-13' which translates to September 13th, 2015.

For instance, you can create a user named `stephencolbert` as

![](../../images/asset_tCuF9cKv.png)

This creates a user, you can run the following to get a list of users in your database.

![](../../images/asset_mqIokcxg.png)

Now that we've confirmed that the user has been created, they already have access to the public schema that contains systems-level information about the cluster but we need to give them access to the specific schemas that they'll be working in.

### 2. [GRANT USAGE](http://docs.aws.amazon.com/redshift/latest/dg/r_GRANT.html) on the schema to the user we just created

![](../../images/asset_A9wjfpH7.png)

The above SQL command grants the user USAGE priveleges on a schema. Let's assume you want to grant `stephencolbert` access to your development schema, it would look like below

![](../../images/asset_lBjUYlwq.png)

Our new user now has usage rights on the `development` schema, now we need to grant the type of SQL commands they'll be able to run against the cluster. For the purposes of this example, we're going to give the user read only privileges.

### 3. [GRANT SELECT](http://docs.aws.amazon.com/redshift/latest/dg/r_GRANT.html) privileges so the user can query the tables

![](../../images/asset_g1XTzzbo.png)

The above SQL command grants the user SELECT rights on all tables in the chosen schema. For our `stephencolbert`user and the `development` schema, it would look like below.

![](../../images/asset_0NVxn6T3.png)

Doing these three steps will result in a new user that can query all the tables in a given schema. If you want to give access to more than one schema then you can simply repeat steps 2 and 3 for each additional schema. If you have any questions or if you're running into any issues getting this set up, [contact us](/contact).
