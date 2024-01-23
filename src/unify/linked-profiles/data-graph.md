---
title: Data Graph
plan: unify
beta: true
---

With Linked Profiles, you can build a Data Graph that defines relationships between any data set in the warehouse and the Segment Profiles you send with Profiles Sync. 

Define relationships between data from your warehouse to give marketers access to data to target, personalize, and analyze customer experiences.

> success ""
> Segment's Data Graph powers [Linked Events](/docs/unify/linked-profiles/linked-events/) and [Linked Audiences](/docs/unify/linked-profiles/linked-audiences/).

## Prerequisites

To use the Data Graph, you'll need the following:
- A Unify and Engage Foundations or Premier plan.
- A Snowflake Data Warehouse. 
- [Profiles Sync](/docs/unify/profiles-sync/) set up with ready to use [data models and tables](/docs/unify/profiles-sync/tables/) in your warehouse.
- An [Actions-based Destination](/docs/connections/destinations/actions/#available-actions-based-destinations).


> info ""
> Linked Profiles follows Zero Copy principles, and doesn't copy entities to store in Segment. Segment stores and processes all data in the United States. 

> warning ""
> Don't send any personal health information with the Data Graph.

## Step 1: Set up your data warehouse

Before setting up the Data Graph, you'll need to set up your data warehouse. Use the [Snowflake Setup](/docs/unify/linked-profiles/setup-guides/snowflake-setup/) guide to get started.

<!-- Not yet available for Data Graph as of 1/16/24
- [Redshift Setup]((/docs/unify/linked-profiles/setup-guides/redshift-setup/))
- [BigQuery Setup]((/docs/unify/linked-profiles/setup-guides/bigquery-setup/))
--> 

Linked Profiles uses [Segment's Reverse ETL](/docs/connections/reverse-etl/) infrastructure to pull data from your warehouse. 

To track what data has been sent to Segment on previous syncs, Segment stores delta/diffs in tables within a single schema called `_segment_reverse_etl` in your data warehouse. You can choose which database/project in your warehouse this data lives in. 


## Step 2: Connect your warehouse to the Data Graph

> success ""
> Before getting started with the Data Graph, be sure to [set up your Snowflake permissions](/unify/linked-profiles/setup-guides/snowflake-setup/). 

To connect your warehouse to the data graph:

1. In your Segment workspace, navigate to **Unify**, and select **Data Graph**.
- This should be a Unify space with Profiles Sync already set up.
2. Click **Connect warehouse**.
3. Select your warehouse type.
4. Enter your warehouse credentials. 
5. Test your connection, then click **Save**.

Depending on the size of your warehouse, it may take anywhere from a few minutes to an hour for Segment to sync your warehouse metadata to cache before you're able to set up your Data Graph. 

## Step 3: Build your Data Graph

The Data Graph is a semantic layer that represents a subset of relevant business data that you'll use for audience targeting and personalization in downstream tools. 

Use the configuration language spec below to add models to build your Data Graph.

### Delete and edit entities and/or relationships from your Data Graph

> info ""
> Each Unify space has one Data Graph. The current version is v0.0.6.

Segment recommends creating a new Linked Audience or Linked Event. Deleting and/or editing entities in the Data Graph may lead to errors if you reference these entities or relationships in existing Linked Audiences and Linked Events. 

While you can delete relationships or entities from the Data Graph, these relationships and entities will still display in the Linked Audience builder and Linked Events.

### Define entities

Use the parameters, defintions, and examples below to help you define entities.

> warning ""
> Snowflake schemas are case sensitive, so you'll need to reflect the schema, table, and column names based on how you case them in Snowflake.

#### Profile 

The profile is a special class of entity. The profile is always defined at the top of the Data Graph, and there can only be one profile for a Data Graph. The profile entity corresponds to the Profiles Sync tables and models. 

The parameters are:

| Parameters     | Definition                                                           |
| ----------- | --------------------------------------------------------------------- |
| `profile_folder`      | This is the folder or schema location for the profile tables.     |
| `materialization`     | Identify the type of materialization (`dbt`,`segment`,`none`). |


```python
#define a profile entity

profile {
     profile_folder = "segment"
     materialization = "none"
    
}
```

#### Entity

An entity is a stateful representation of a business object. The entity corresponds to a table in the warehouse that represents that entity. 


| Parameters     | Definition                                                           |
| ----------- | --------------------------------------------------------------------- |
| `entity`      | A unique slug for the entity, which is immutable and treated as a delete if you make changes. The slug must be in all lowercase, and supports dashes or underscores (for example, `account-entity` or `account_entity`).    |
| `name`        | A unique label which will display across Segment.                           |
| `table_ref`   | Define the table reference. In order to specify a connection to your table in Snowflake, a fully qualified table reference is required: `[database name].[schema name].[table name]`. |
| `primary_key` | The unique identifier for the given table. Should be a column with unique values per row. |
| (Optional) `enrichment_enabled = true`      | Indicate if you plan to also reference the entity table for [Linked Events](/docs/unify/linked-profiles/linked-events/).                         |



```python
# Define an entity and optionally indicate if the entity will be referenced for Linked Events (event enrichment)

entity "account" {
     table_ref = "cust.account"
     primary_key = "id"
     enrichment_enabled = true
}
```

### Relate entities

Use the following relationship, parameters, and examples to help you relate entities.

> warning ""
> Snowflake schemas are case sensitive, so you'll need to reflect the schema, table, and column names based on how you case them in Snowflake.


#### Relate Entity to Profile

| Parameters     | Definition                                                           |
| ----------- | --------------------------------------------------------------------- |
| `relationship`      | A unique slug for the relationship, which is immutable and treated as a delete if you make changes. The slug must be in all lowercase and will support dashes or underscores (for example, `user-account` or `user_account`).   |
| `name`        | A unique label that displays throughout your Segment space.                          |
| `related_entity`   | Reference your already defined entity. |


A profile can be related to an entity in two ways:
1. With an `external_id`: Define the external ID that will be used to join the profile with your entity.
     - `type`: Identify the external ID type (`email`, `phone`, `user id`).
     - This corresponds to the `external_id_type` column in your `external_id_mapping` table.
     - `join_key`: This is the column on the entity table that you are matching to the external identifier.
2. With a `trait`: Define a profile trait that will be used to join the profile with your entity.
     - `name`: The trait name that corresponds to a column name in your `profile_traits_updates` table.
     - `join_key`: This is the column on the entity table that you are matching to the trait.
     

```python
data_graph { 
     #define entities

     profile {
          #define profile

          # Option 1: relate profile to account with an `external_id`
          relationship "user-accounts" {
               name = "Premium Accounts"
               related_entity = "account-entity"
               external_id {
                    type = "email"
                    join_key = "email_id"
               }
          }

          # Option 2: relate profile to account with a `trait`
          relationship: "user-accounts" {
               name = "Premium Accounts"
               related_entity = "account-entity"
               trait {
                    name = "cust_id"
                    join_key = "id"
               }
          }
     }
}
```

#### Relate between entities

| Parameters     | Definition                                                           |
| ----------- | --------------------------------------------------------------------- |
| `relationship`      | A unique slug for the relationship, which is immutable and treated as a delete if you make changes. The slug must be in all lowercase and will support dashes or underscores (for example, `user-account` or `user_account`).   |
| `name`        | This should be a unique label that displays throughout your Segment space.                          |
| `related_entity`   | Reference your already defined entity. |
| `join_on`         |    Define relationships between two entity tables `[lefty entity name].[column name] = [right entity name].[column name]`. Note that the entity name is a reference to the alias provided in the config and doesn't need to be the fully qualified table name. |


```py
data_graph { 
     #define entities
     profile {
          #define profile
               ...
               #relate account to carts
               relationship "Carts" { 
                    name = "Shopping Carts"
                    related_entity = "cart-entity"
                    join_on = "account.id = cart.account_id"
               }
          }
     }         
}

```

If you're relating entities with a junction table:

- `Junction_table`: Define relationships between two entities tables joined by a junction table.
     - `table_ref`: Define the table reference to the join table. In order to specify a connection to your table in Snowflake, a fully qualified table reference is required: `[database name].[schema name].[table name]`.
     - `primary_key`: The unique identifier on the join table and should be a column with unique values per row.
     - `left_join_on`: Define relationship between the two entity tables: `[left entity name].[column name] = [junction table column name]`.
     - `right_join_on`: Define relationship between the two entity tables: `[junction table column name] = [right entity name].[column name]`.

Note that `schema.table` is implied within the junction table column name and doesn't need to be provided. 

Attributes from a junction table are not referenceable with the Audience Builder. If you'd like to reference an additional column on the junction table for filtering, you must first define it as an entity and explicitly define a relationship name. 

```py
#relating entities with junction table

data_graph { 
     #define entities
     profile {
          #define profile
               ...
               #relate products to carts
               relationship "Products" {
                    related_entity = "product"
                    junction_table {
                         primary_key = "id"
                         table_ref = "customer.cart_product"
                         left_join_on = "cart.id = cart_id"
                         #schema.table is implied within the cart_id key
                         right_join_on = "product_id = product.sku"
                    }

               }
          }
     }         
}

```

![An example of a data graph](/docs/unify/images/data-graph-example.png)

```py
data_graph {
     version =  "v0.0.6"

     #define a profile entity
     profile {
          profile_folder = "segment"
          materialization = "none"

          #relate profile to accounts
          relationship "Accounts" {
               related_entity = "account"
               external_id {
                    type = "email"
                    join_key = "email_id"
               }
               
               #relate account to carts
               relationship "Carts" { 
                    related_entity = "cart"
                    join_on = "account.id = cart.account_id"

                    #relate products to carts
                    relationship "Products" { 
                         related_entity = "product"
                         junction_table {
				   primary_key = "id"
                              table_ref = "customer.cart_product"
                              left_join_on = "cart.id = cart_id"
                              #schema.table is implied within the cart_id key
                              right_join_on = "product_id = product.sku"
                         }
                    }
               }
          }
     }

     #define account, product, and cart entities
     entity "account" {
          table_ref = "cust.account"
          primary_key = "id"
          enrichment_enabled = true
     }

     entity "product" {
          table_ref = "prod.product_skus"
          primary_key = "sku"
          enrichment_enabled = true
     }

     entity "cart" {
          table_ref = "cust.cart"
          primary_key = "id"
     }
}

```

## Validate your Data Graph

Validate your Data Graph using the config builder and preview, then click **Save**.

## Edit your Data Graph

To edit your Data Graph:

1. Navigate to **Unify > Data Graph**.
2. Select the **Builder** tab, and click **Edit Data Graph**.

You can edit your Data Graph at any time. However, some types of edits may impact existing Linked Audiences and Linked Events. These include:

- Adding a new relationship before an existing relationship
- Replacing existing relationships with new relationships
- Deleting existing entities or relationships

If you make one of these edits, recreate your existing Linked Audiences and/or remove the entity from your existing Linked Events mappings.

## Next steps 

After you've set up your Data Graph, get started with [Linked Audiences](/docs/unify/linked-profiles/linked-audiences/) and [Linked Events](/docs/unify/linked-profiles/linked-events/).

