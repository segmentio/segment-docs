---
title: Data Graph
plan: unify
beta: true
hidden: true
redirect_from:
  - '/unify/linked-profiles/data-graph'
---

The Data Graph is a semantic layer unifying all your customer datasets. With the Data Graph, you can define relationships between any entity data set in the warehouse and the Segment Profiles you send with Profiles Sync. The Data Graph enables businesses to map and understand the relationships between different datasets about their customers (accounts, subscriptions, households, products, etc.), and tie rich entity context back to the profile. Once the defined, the Data Graph allows you to make this relational data accessible to marketers and business stakeholders to empower them with all the data they need to create targeted and personalized customer engagements.

> info ""
> Data Graph currently only supports workspaces in the United States.

The Data Graph powers:

- [Linked Audiences](/docs/engage/audiences/linked-audiences/): Enables marketers to build targeting logic based on data points available in the data graph in a self-service way. Start by building a [Data Graph](/docs/unify/data-graph/data-graph/) that defines relationships between any data set in the warehouse and the Segment Profiles you send with Profiles Sync. From there, use Linked Audiences to unlock a world of new hyper-personalized campaigns.
- [Linked Events](/docs/unify/data-graph/linked-events/): Enables data teams to enrich event streams, in real time, with any data set coming from a data warehouse or data lake, and send those enriched events to any Destination. Start by building a [Data Graph](/docs/unify/data-graph/data-graph/) with the data models you want to use, and then use set up the enrichment in Destinations or Functions. 

> warning ""
> Don't send any personal health information with the Data Graph.

## Prerequisites

To use the Data Graph, you'll need the following:

- A supported data warehouse.
- If using Linked Audiences, [Profiles Sync](/docs/unify/profiles-sync/) will need to be set up with ready-to-use [data models and tables](/docs/unify/profiles-sync/tables/) in your warehouse. Note: Profiles Sync is not required for Linked Events.
- Workspace Owner or Unify Read-only/Admin and Entities Admin permissions.

## Step 1: Set up Data Graph permissions in your data warehouse

While Linked Audiences uses [Segment's Reverse ETL](/docs/connections/reverse-etl/) infrastructure to pull data from your warehouse, additional permissions are still required for Linked Audiences and Linked Events. To get started, set up the required permissions: 

- [Snowflake](/docs/unify/data-graph/setup-guides/snowflake-setup/) and [Databricks](/docs/unify/data-graph/setup-guides/databricks-setup/) are supported by both Linked Events and Linked Audiences.
- [Redshift](/docs/unify/data-graph/setup-guides/redshift-setup/) and [BigQuery](/docs/unify/data-graph/setup-guides/BigQuery-setup/) are currently supported for Linked Events. 

To track what data has been sent to Segment on previous syncs, Segment stores diffs in tables within a single schema called `_segment_reverse_etl` in your data warehouse. You can choose which database or project in your warehouse this data lives in. 

## Step 2: Connect your warehouse to the Data Graph

To connect your warehouse to the Data Graph:

1. Navigate to **Unify > Data Graph**. This should be a Unify space with Profiles Sync already set up.
2. Click **Connect warehouse**.
3. Select your warehouse type.
4. Enter your warehouse credentials. 
5. Test your connection, then click **Save**.

## Step 3: Build your Data Graph

The Data Graph is a semantic layer that represents a subset of relevant business data that marketers and business stakeholders can use for audience targeting and personalization in downstream tools. Use the configuration language spec below to build your Data Graph.

### Data Graph structure
- Define your entities. This corresponds to tables in your warehouse.
- Define your profile. This maps to the Segment Profiles tables synced via Profiles Sync.
- Define the relationship type.
  - The Data Graph currently supports 6 layers of depth, including the profile. There are no limits on the breadth of your Data Graph.
  - Relationships are nested under the profile.

Example:

```python

data_graph {
  ...
  profile {
    relationship "A"{
      ...
      relationship "B" {
        ...
        relationship "C"{
          ...
        }
      }
    }
  }  
}

```

### a) Define entities
> info ""
> Leverage the "Warehouse access" tab to view the warehouse tables you've granted Segment access to for the Data Graph.

The first step in creating a Data Graph is to define your entities. An entity corresponds to a table in the warehouse.

| Parameters     | Definition                                                           |
| ----------- | --------------------------------------------------------------------- |
| `entity`      | An immutable slug for the entity, and will be treated as a delete if you make changes. The slug must be in all lowercase, and supports dashes or underscores (e.g `account-entity` or `account_entity`)    |
| `name`        | A label that displays throughout your Segment space for Linked Events, Linked Audiences, etc. This name can be modified at any time                           |
| `table_ref`   | Defines the fully qualified table reference: `[database name].[schema name].[table name]`. Segment flexibly supports tables, views or materialized views |
| `primary_key` | The unique identifier for the given table. Must be a column with unique values per row |
| (Optional) `enrichment_enabled = true`      | Add this if you plan to reference the entity table for [Linked Events](/docs/unify/data-graph/linked-events/) use cases                         |

**Example:**

```python
data_graph {
  entity "account-entity" {
    name = "account"
    table_ref = "PRODUCTION.CUST.ACCOUNT"
    primary_key = "id"
  }
  
  entity "cart-entity" {
    name = "cart"
    table_ref = "PRODUCTION.CUST.CART"
    primary_key = "id"
    enrichment_enabled = true
  }
}
```

### b) Define the profile
> info ""
> Segments recommends that you select materialized views under the Profiles Sync Selective Sync settings to optimize warehouse compute costs.

Next, define the profile. This is a special class of entity that represents Segment Profiles, which corresponds to the Profiles Sync tables and models. For Linked Audiences, this allows marketers to filter on profile traits, event history, etc. There can only be one profile for a Data Graph. 

| Parameters     | Definition                                                           |
| ----------- | --------------------------------------------------------------------- |
| `profile_folder`      | Define the fully qualified path of the folder or schema location for the profile tables     |
| `type`     | Identify the materialization method of the profile tables defined in your Profiles Sync configuration (`segment:unmaterialized`, `segment:materialized`)|

**Example:**

```python

data_graph {
  # Define your entities
  entity "account-entity" {
    name = "account"
    table_ref = "PRODUCTION.CUST.ACCOUNT"
    primary_key = "id"
  }
  
  ...
  
  # Define the profile entity
  profile {
    profile_folder = "PRODUCTION.SEGMENT"
    type = "segment:materialized"
  }
}

```

### c) Define relationships

Now define your relationships across your entities. The Data Graph supports three types of relationships:
- Define relationship between an entity and the profile. This is the first level of relationships
- Define 1:many relationships
- Define many:many relationships 

All relationship types require you to define the `relationship`,`name`, and `related_entity`. Each type of relationship has specific `join_on` conditions. 

#### Define relationship between an entity and the profile
This is the first level of relationships and a unique type of relationship between an entity and the Segment profile entity.  

| Parameters     | Definition                                                           |
| ----------- | --------------------------------------------------------------------- |
| `relationship`      | An immutable slug for the relationship, and will be treated as a delete if you make changes. The slug must be in all lowercase, and supports dashes or underscores (e.g. `user-account` or `user_account`)  |
| `name`        | A label that displays throughout your Segment space for Linked Events, Linked Audiences, etc. This name can be modified at any time                          |
| `related_entity`   | References your already defined entity |

Reference your entity table and depending on your table columns, choose to join on one of the following: 
**Option 1:** Use the `external_id` block to join the profile entity with `user_id`, `email`, or `phone` as the identifier on the entity table
- `type`: Identify the external ID type (`email`, `phone`, `user id`). This corresponds to the `external_id_type` column in your Profiles Sync `external_id_mapping` table  
- `join_key`: This is the column on the entity table that you are matching to the external identifier   
**Option 2:** Use the `traits` block to join with a profile trait on the entity table
- `name`: The trait name that corresponds to a column name in your Profiles Sync `profile_traits_updates` table
- `join_key`: This is the column on the entity table that you are matching to the trait

**Example:**
```python
data_graph { 
  entity "account-entity" {
    name = "account"
    table_ref = "PRODUCTION.CUST.ACCOUNT"
    primary_key = "id"
  }

  profile {
    profile_folder = "PRODUCTION.SEGMENT"
    type = segment:materialized

    relationship "user-accounts" {
      name = "Premium Accounts"
      related_entity = "account-entity"

      # Option 1: Relate account to profile with an external ID
      external_id {
        type = "email"
        join_key = "email_id"
      }

      # Option 2: Relate account to profile with a trait
      trait {
        name = "cust_id"
        join_key = "id"
      }
    }
  }
}
```

#### Define 1:many relationship
Finally, define relationships between Entities nested within the Profiles block.

| Parameters     | Definition                                                           |
| ----------- | --------------------------------------------------------------------- |
| `relationship`      | A unique slug for the relationship, which is immutable and treated as a delete if you make changes. The slug must be in all lowercase and will support dashes or underscores (for example, `user-account` or `user_account`).   |
| `name`        | A unique label that displays throughout your Segment space.                          |
| `related_entity`   | References your already defined entity. |
| `join_on`         |    Defines relationships between two entity tables `[lefty entity slug].[column name] = [right entity slug].[column name]`. Note that the entity slug is a reference to the alias provided in the config and doesn't need to be the fully qualified table name. |

Example:

```py
data_graph { 
     #define entities
     entity "account-entity" {
          name = "account"
          table_ref = "PRODUCTION.CUST.ACCOUNT"
          primary_key = "id"
     }

     entity "cart-entity" {
          name = "cart"
          table_ref = "PRODUCTION.CUST.CART"
          primary_key = "id"
        enrichment_enabled = true
     }

     #define profile
     profile {
         profile_folder = "PRODUCTION.segment"
         type = segment:materialized
               
          relationship "user-accounts" {
               name = "Premium Accounts"
               related_entity = "account-entity"
               external_id {
                    type = "email"
                    join_key = "email_id"
               }

               #relate account to Carts
               relationship "Carts" { 
                    name = "Shopping Carts"
                    related_entity = "carts-entity"
                    join_on = "account-entity.id = carts-entity.account_id"
               }
          }

          }
     }         
}

```

#### Define many:many relationship

If you're relating entities with a junction table:

| Parameters     | Definition                                                           |
| ----------- | --------------------------------------------------------------------- |
| `junction_table`      | Defines the table reference to the join table. In order to specify a connection to your table in Snowflake, a fully qualified table reference is required: `[database name].[schema name].[table name]`.  |
| `table_ref`      | Defines the table reference to the join table. In order to specify a connection to your table in Snowflake, a fully qualified table reference is required: `[database name].[schema name].[table name]`.  |
| `primary_key`    | The unique identifier on the join table, and should be a column with unique values per row. |
| `left_join_on`   | Defines the relationship between the two entity tables: `[left entity slug].[column name] = [junction table column name]`. |
| `right_join_on`  | Defines the relationship between the two entity tables: `[junction table column name] = [right entity slug].[column name]`. |

**Note:** `schema.table` is implied within the junction table column name and doesn't need to be provided.

> warning ""
> Attributes from a junction table are not referenceable with the Audience Builder. If you'd like to reference an additional column on the junction table for filtering, you must first define it as an entity and explicitly define a relationship name.

Example:

```py

data_graph { 
     #define entities

     profile {
          #define profile
               ...
               #relate products to carts with a junction table
               relationship "products" {
                    name = "Purchased Products"
                    related_entity = "product-entity"
                    junction_table {
                         primary_key = "id"
                         table_ref = "PRODUCTION.CUSTOMER.CART_PRODUCT"
                         left_join_on = "CART.ID = CART_ID"
                         #schema.table is implied within the cart_id key
                         right_join_on = "PRODUCT_ID = PRODUCT.SKU"
                    }

               }
          }
     }         

```
## Step 4: Validate your Data Graph

Validate your Data Graph using the config builder and preview, then click **Save**.

## Data Graph example 

<img src="/docs/unify/images/data-graph-example.png" alt="An example of a Data Graph" width="5888"/>

```py
data_graph {
     version =  "v1.0.0"

#define a profile entity
     profile {
          profile_folder = "PRODUCTION.segment"
          type = "segment: materialized"

          #relate accounts to profiles with an external ID
          relationship "user-accounts" {
               name = "Premium Accounts"
               related_entity = "account-entity"
               external_id {
                    type = "email"
                    join_key = "email_id"
               }
               
          #relate carts to account
          relationship "user-carts" { 
               name = "Shopping Carts"
               related_entity = "cart-entity"
               join_on = "ACCOUNT.ID = CART.ACCOUNT_ID"

               #relate carts to products with a junction table
               relationship "products" { 
                    name = "Purchased Products"
                    related_entity = "product-entity"
                    junction_table {
                         primary_key = "id"
                         table_ref = "PRODUCTION.CUSTOMER.CART_PRODUCT"
                         left_join_on = "CART.ID = CART_ID"
                         #schema.table is implied within the cart_id key
                         right_join_on = "PRODUCT_ID = PRODUCT.SKU"
                    }
               }
          }
          }
     }

     #define account, product, and cart entities
     entity "account-entity" {
          name = "account"
          table_ref = "PRODUCTION.CUST.ACCOUNT"
          primary_key = "id"
     }

     entity "product-entity" {
          name = "product"
          table_ref = "PRODUCTION.PROD.PRODUCT_SKUS"
          primary_key = "sku"
     }

     entity "cart-entity" {
          name = "cart"
          table_ref = "PRODUCTION.CUST.CART"
          primary_key = "id"
          enrichment_enabled = true
     }
}

```
## Edit your Data Graph

To edit your Data Graph:

1. Navigate to **Unify > Data Graph**.
2. Select the **Builder** tab, and click **Edit Data Graph**.

A data consumer refers to a Segment feature referencing entities and relationships from the Data Graph.

## Breaking changes 

A breaking change occurs when deleting an entity or relationship that is being referenced by a data consumer. Note that an entity or relationship slug is immutable and treated as a delete if you make changes. Data consumers affected by breaking changes will fail on the next run. 

### Potential breaking change 

Editing the Data Graph may lead to errors with data consumers. If there’s a breaking change, the data consumer will fail on the next run. Unaffected data consumers will continue to work. 

## Next steps 

After you've set up your Data Graph, get started with [Linked Events](/docs/unify/data-graph/linked-events/) and [Linked Audiences](/docs/engage/audiences/linked-audiences/).

