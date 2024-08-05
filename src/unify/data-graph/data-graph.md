---
title: Data Graph
plan: unify
beta: true
hidden: true
redirect_from:
  - '/unify/linked-profiles/data-graph'
---

You can build a Data Graph that defines relationships between any entity data set in the warehouse and the Segment Profiles you send with Profiles Sync. Make this relational data accessible to marketers and business stakeholders to empower them with the data they need to create targeted and personalized customer engagements.

Using the Data Graph, you can reflect your business in your data model. The Data Graph enables businesses to map and understand the relationships between different datasets about their customers (accounts, subscriptions, households, products), and tie rich entity context back to the profile.

> info ""
> Data Graph currently only supports workspaces in the United States.

Using Data Graph, you only need to define the relationships between data sets one time to make data accessible to marketers and business stakeholders to build targeted and personalized customer engagements. 

The Data Graph powers:

- [Linked Audiences](/docs/engage/audiences/linked-audiences/): enables marketers to build targeting logic based on data points available in the data graph in a self-service way. Start by building a [Data Graph](/docs/unify/data-graph/data-graph/) that defines relationships between any data set in the warehouse and the Segment Profiles you send with Profiles Sync. From there, use Linked Audiences to unlock a world of new hyper-personalized campaigns.
- [Linked Events](/docs/unify/data-graph/linked-events/): enables data teams to enrich event streams, in real time, with any data set coming from a data warehouse or data lake, and send those enriched events to any Destination. Start by building a [Data Graph](/docs/unify/data-graph/data-graph/) with the data models you want to use, and then use set up the enrichment in Destinations or Functions. 

To help you get started with the Data Graph, [view this short setup demo](https://drive.google.com/file/d/1oZNvs0raYaxK6tds3OEF0Ri3NGVCoXys/view?pli=1){:target="_blank"}.

> warning ""
> Don't send any personal health information with the Data Graph.

## Prerequisites

To use the Data Graph, you'll need the following:

- A supported data warehouse.
- (If setting up Linked Audiences) [Profiles Sync](/docs/unify/profiles-sync/) set up with ready-to-use [data models and tables](/docs/unify/profiles-sync/tables/) in your warehouse.
- Workspace Owner or Unify Read-only/Admin and Entities Admin permissions.

> info ""
> Profiles Sync is not required for Linked Events.

## Step 1: Set up required permissions in your data warehouse

To get started, set up the required permissions: 

- [Snowflake](/docs/unify/data-graph/setup-guides/snowflake-setup/) and [Databricks](/docs/unify/data-graph/setup-guides/databricks-setup/) are supported by both Linked Events and Linked Audiences.
- [Redshift](/docs/unify/data-graph/setup-guides/redshift-setup/) and [BigQuery](/docs/unify/data-graph/setup-guides/BigQuery-setup/) are currently supported for Linked Events. 

Linked Audiences uses [Segment's Reverse ETL](/docs/connections/reverse-etl/) infrastructure to pull data from your warehouse. 

To track what data has been sent to Segment on previous syncs, Segment stores delta/diffs in tables within a single schema called `_segment_reverse_etl` in your data warehouse. You can choose which database/project in your warehouse this data lives in. 

## Step 2: Connect your warehouse to the Data Graph

To connect your warehouse to the Data Graph:

1. Navigate to **Unify > Data Graph**.
This should be a Unify space with Profiles Sync already set up.
2. Click **Connect warehouse**.
3. Select your warehouse type.
**Note:** Linked Audiences only supports Snowflake.
4. Enter your warehouse credentials. 
5. Test your connection, then click **Save**.

## Step 3: Build your Data Graph

The Data Graph is a semantic layer that represents a subset of relevant business data that you'll use for audience targeting and personalization in downstream tools. Use the configuration language spec below to add models to build your Data Graph. The Data Graph currently supports 6 layers of depth, including the Profile entity. Warehouse schemas are case sensitive, so you'll need to reflect the schema, table, and column names based on how you case them in the warehouse.

To leverage the Data Graph auto-complete feature, begin typing or use the following keyboard shortcuts to autocomplete the profile_folder and table_ref properties.

- Mac: Ctrl + Space
- Windows: Alt + Esc

### Define entities

Use the parameters, definitions, and examples below to help you define entities.

#### Entity

The first step in creating a Data Graph is to define your Entities. An entity is a stateful representation of a business object. The entity corresponds to a table in the warehouse.

| Parameters     | Definition                                                           |
| ----------- | --------------------------------------------------------------------- |
| `entity`      | A unique slug for the entity, which is immutable and treated as a delete if you make changes. The slug must be in all lowercase, and supports dashes or underscores (for example, `account-entity` or `account_entity`).    |
| `name`        | A unique label that displays throughout your Segment space.                           |
| `table_ref`   | Defines the table reference. In order to specify a connection to your table in Snowflake, a fully qualified table reference is required: `[database name].[schema name].[table name]`. |
| `primary_key` | The unique identifier for the given table. Should be a column with unique values per row. |
| (Optional) `enrichment_enabled = true`      | Indicates if you plan to also reference the entity table for [Linked Events](/docs/unify/data-graph/linked-events/).                         |

Example:

```python
# Define an entity and optionally indicate if the entity will be referenced for Linked Events (event enrichment)

data_graph { 
# Entities are nested under the data_graph
entity "account-entity" {
     name = "account"
     table_ref = "PRODUCTION.CUST.ACCOUNT"
     primary_key = "id"
     enrichment_enabled = true
}

       entity "cart-entity" {
            name = "cart"
            table_ref = "PRODUCTION.CUST.CART"
            primary_key = "id"
       }
}
```

#### Profile 

Next, we define a Profile block, a special class of Entity that represents Segment Profiles. There can only be one profile for a Data Graph. The profile entity corresponds to the Profiles Sync tables and models, such as profile traits. 

The parameters are:

| Parameters     | Definition                                                           |
| ----------- | --------------------------------------------------------------------- |
| `profile_folder`      | This is the fully qualified path of the folder or schema location for the profile tables.     |
| `type`     | Identifies the materialization methods of the profile tables (segment:unmaterialized, segment:materialized) as defined in your Profiles Sync configuration. E.g. utilize segment:materialized if you are synching Profiles Materialized Tables. Note: Leveraging materialized profile tables optimizes warehouse compute costs. |

Example:

```python

data_graph {
entity "account-entity" {
     name = "account"
     table_ref = "PRODUCTION.CUST.ACCOUNT"
     primary_key = "id"
     enrichment_enabled = true
}

entity "cart-entity" {
      name = "cart"
      table_ref = "PRODUCTION.CUST.CART"
      primary_key = "id"
 }

# Define a profile entity
profile {
     profile_folder = "PRODUCTION.segment"
     type = segment:materialized
    
}
}


```

### Relate entities

Next, relate Profiles to Entities to model relationships between your Profiles and business datasets. Use the following relationship, parameters, and examples to help you relate entities.

#### Relate Entity to Profile

| Parameters     | Definition                                                           |
| ----------- | --------------------------------------------------------------------- |
| `relationship`      | A unique slug for the relationship, which is immutable and treated as a delete if you make changes. The slug must be in all lowercase and will support dashes or underscores (for example, `user-account` or `user_account`).   |
| `name`        | A unique label that displays throughout your Segment space.                          |
| `related_entity`   | References your already defined entity. |


A profile can be related to an entity in two ways:

**1. With an `external_id`**: Define the external ID that will be used to join the profile with your entity.
- `type`: Identify the external ID type (`email`, `phone`, `user id`). This corresponds to the `external_id_type` column in your `external_id_mapping` table. 
- `join_key`: This is the column on the entity table that you are matching to the external identifier.   

Example: 

```python
data_graph { 
 #define entities
     entity "account-entity" {
          name = "account"
          table_ref = "PRODUCTION.CUST.ACCOUNT"
          primary_key = "id"
          enrichment_enabled = true
     }

     entity "cart-entity" {
          name = "cart"
          table_ref = "PRODUCTION.CUST.CART"
          primary_key = "id"
     }

  #define profile
     profile {
         profile_folder = "PRODUCTION.segment"
         type = segment:materialized

          #Option 1: Relate account to profile with an external ID
          relationship "user-accounts" {
               name = "Premium Accounts"
               related_entity = "account-entity"
               external_id {
                    type = "email"
                    join_key = "email_id"
               }
          }
    }
}
```
**2. With a `trait`**: Define a profile trait that will be used to join the profile with your entity.
- `name`: The trait name that corresponds to a column name in your `profile_traits_updates` table.
- `join_key`: This is the column on the entity table that you are matching to the trait.
      
Example: 
```python

data_graph { 
     #define entities
     #define profile
     
     profile {
          
          profile_folder = "PRODUCTION.segment"
          type = segment:materialized

          #Option 2: relate account to profile with a trait`
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
     enrichment_enabled = true
}

     entity "cart-entity" {
          name = "cart"
          table_ref = "PRODUCTION.CUST.CART"
          primary_key = "id"
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

#### Relating entities with a junction table

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
          enrichment_enabled = true
     }

     entity "product-entity" {
          name = "product"
          table_ref = "PRODUCTION.PROD.PRODUCT_SKUS"
          primary_key = "sku"
          enrichment_enabled = true
     }

     entity "cart-entity" {
          name = "cart"
          table_ref = "PRODUCTION.CUST.CART"
          primary_key = "id"
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

