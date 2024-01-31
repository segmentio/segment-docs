---
title: Data Graph
plan: unify
beta: true
---

> info "Segment's Data Graph is in private beta"
> The Data Graph is in private beta, and Segment is actively working on this feature. Some functionality may change before it becomes generally available. 

With Linked Profiles, you can build a Data Graph that defines relationships between any entity data set in the warehouse and the Segment Profiles you send with Profiles Sync. 

Make this relational data accessible to marketers and business stakeholders to empower them with the data they need to create targeted and personalized customer engagements.

> info ""
> Segment's Data Graph powers [Linked Events](/docs/unify/linked-profiles/linked-events/) and [Linked Audiences](/docs/engage/audiences/linked-audiences/).


## Prerequisites

To use the Data Graph, you'll need the following:
- A supported data warehouse. 
- [Profiles Sync](/docs/unify/profiles-sync/) set up with ready-to-use [data models and tables](/docs/unify/profiles-sync/tables/) in your warehouse.

> info ""
> Linked Profiles follows zero-copy principles, and doesn't copy entities to store in Segment. Segment stores and processes all data in the United States. 

> warning ""
> Don't send any personal health information with the Data Graph.

## Step 1: Set up your data warehouse

> info "data warehouse support"
> - [Snowflake](/docs/unify/linked-profiles/setup-guides/snowflake-setup/) is supported by both Linked Events and Linked Audiences.
> - [Redshift](/docs/unify/linked-profiles/setup-guides/redshift-setup/) and [BigQuery](/docs/unify/linked-profiles/setup-guides/BigQuery-setup/)  are currently supported for Linked Events.

<!-- Not yet available for Data Graph as of 1/16/24
- [Redshift Setup]((/docs/unify/linked-profiles/setup-guides/redshift-setup/))
- [BigQuery Setup]((/docs/unify/linked-profiles/setup-guides/bigquery-setup/))
--> 

Linked Profiles uses [Segment's Reverse ETL](/docs/connections/reverse-etl/) infrastructure to pull data from your warehouse. 

To track what data has been sent to Segment on previous syncs, Segment stores delta/diffs in tables within a single schema called `_segment_reverse_etl` in your data warehouse. You can choose which database/project in your warehouse this data lives in. 


## Step 2: Connect your warehouse to the Data Graph

> warning "Segment user permissions"
> You must have Workspace Owner or Unify Read-only/Admin and Entities Admin permissions to set up Linked Profiles.

> success ""
> Before getting started with the Data Graph, be sure to set up your warehouse permissions. 

To connect your warehouse to the Data Graph:

1. Navigate to **Unify > Data Graph**.
- This should be a Unify space with Profiles Sync already set up.
2. Click **Connect warehouse**.
3. Select your warehouse type.
- Note that Linked Audiences only supports Snowflake.
4. Enter your warehouse credentials. 
5. Test your connection, then click **Save**.

## Step 3: Build your Data Graph

> warning ""
> Warehouse schemas are case sensitive, so you'll need to reflect the schema, table, and column names based on how you case them in the warehouse.

The Data Graph is a semantic layer that represents a subset of relevant business data that you'll use for audience targeting and personalization in downstream tools. 

Use the configuration language spec below to add models to build your Data Graph. The Data Graph currently supports 4 layers of depth, including the Profile entity.


### Define entities

Use the parameters, definitions, and examples below to help you define entities.


#### Profile 

The profile is a special class of entity. The profile is always defined at the top of the Data Graph, and there can only be one profile for a Data Graph. The profile entity corresponds to the Profiles Sync tables and models, such as profile traits. 

The parameters are:

| Parameters     | Definition                                                           |
| ----------- | --------------------------------------------------------------------- |
| `profile_folder`      | This is the folder or schema location for the profile tables.     |
| `materialization`     | Identifies the type of materialization (`none`). |

Example:

```python
# Define a profile entity

profile {
     profile_folder = "segment"
     materialization = "none"
    
}
```

#### Entity

An entity is a stateful representation of a business object. The entity corresponds to a table in the warehouse that represents the entity. 


| Parameters     | Definition                                                           |
| ----------- | --------------------------------------------------------------------- |
| `entity`      | A unique slug for the entity, which is immutable and treated as a delete if you make changes. The slug must be in all lowercase, and supports dashes or underscores (for example, `account-entity` or `account_entity`).    |
| `name`        | A unique label that displays throughout your Segment space.                           |
| `table_ref`   | Defines the table reference. In order to specify a connection to your table in Snowflake, a fully qualified table reference is required: `[database name].[schema name].[table name]`. |
| `primary_key` | The unique identifier for the given table. Should be a column with unique values per row. |
| (Optional) `enrichment_enabled = true`      | Indicates if you plan to also reference the entity table for [Linked Events](/docs/unify/linked-profiles/linked-events/).                         |

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

profile {
# Relationships are nested under the profile
}
}
```

### Relate entities

Use the following relationship, parameters, and examples to help you relate entities.


#### Relate Entity to Profile

| Parameters     | Definition                                                           |
| ----------- | --------------------------------------------------------------------- |
| `relationship`      | A unique slug for the relationship, which is immutable and treated as a delete if you make changes. The slug must be in all lowercase and will support dashes or underscores (for example, `user-account` or `user_account`).   |
| `name`        | A unique label that displays throughout your Segment space.                          |
| `related_entity`   | References your already defined entity. |


A profile can be related to an entity in two ways:
- With an `external_id`: Define the external ID that will be used to join the profile with your entity.
     - `type`: Identify the external ID type (`email`, `phone`, `user id`). This corresponds to the `external_id_type` column in your `external_id_mapping` table. 
     - `join_key`: This is the column on the entity table that you are matching to the external identifier.   

Example: 

```python
data_graph { 
     #define entities

     profile {
          #define profile

          #Option 1: Relate account to profile with an external ID
          relationship "user-accounts" {
               name = "Premium Accounts"
               related_entity = "account-entity"
               external_id {
                    type = "email"
                    join_key = "email_id"
               }
          }
```
- With a `trait`: Define a profile trait that will be used to join the profile with your entity.
     - `name`: The trait name that corresponds to a column name in your `profile_traits_updates` table.
     - `join_key`: This is the column on the entity table that you are matching to the trait.
      
Example:
```python

data_graph { 
     #define entities

     profile {
          #define profile

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

| Parameters     | Definition                                                           |
| ----------- | --------------------------------------------------------------------- |
| `relationship`      | A unique slug for the relationship, which is immutable and treated as a delete if you make changes. The slug must be in all lowercase and will support dashes or underscores (for example, `user-account` or `user_account`).   |
| `name`        | A unique label that displays throughout your Segment space.                          |
| `related_entity`   | References your already defined entity. |
| `join_on`         |    Defines relationships between two entity tables `[lefty entity name].[column name] = [right entity name].[column name]`. Note that the entity name is a reference to the alias provided in the config and doesn't need to be the fully qualified table name. |

Example:

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

#### Relating entities with a junction table

If you're relating entities with a junction table:    

| Parameters     | Definition                                                           |
| ----------- | --------------------------------------------------------------------- |
| `junction_table`      | Defines the table reference to the join table. In order to specify a connection to your table in Snowflake, a fully qualified table reference is required: `[database name].[schema name].[table name]`.  |
| `table_ref`      | Defines the table reference to the join table. In order to specify a connection to your table in Snowflake, a fully qualified table reference is required: `[database name].[schema name].[table name]`.  |
| `primary_key`    | The unique identifier on the join table, and should be a column with unique values per row. |
| `left_join_on`   | Defines the relationship between the two entity tables: `[left entity name].[column name] = [junction table column name]`. |
| `right_join_on`  | Defines the relationship between the two entity tables: `[junction table column name] = [right entity name].[column name]`. |

Note that `schema.table` is implied within the junction table column name and doesn't need to be provided. 

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
## Data Graph Example 

![An example of a Data Graph](/docs/unify/images/data-graph-example.png)

```py
data_graph {
     version =  "v0.0.6"

     #define a profile entity
     profile {
          profile_folder = "segment"
          materialization = "none"

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

## Validate your Data Graph

Validate your Data Graph using the config builder and preview, then click **Save**.

## Edit your Data Graph

To edit your Data Graph:

1. Navigate to **Unify > Data Graph**.
2. Select the **Builder** tab, and click **Edit Data Graph**.

Deleting entities and relationships are not yet supported. 

> info ""
> While you can edit entities and relationships in the Data Graph, this may lead to errors in downstream services referencing these entities and relationships. Segment recommends you recreate your existing Linked Audience and/or remove the entity from your existing Linked Events mappings.


## Next steps 

After you've set up your Data Graph, get started with [Linked Audiences](/docs/engage/audiences/linked-audiences/) and [Linked Events](/docs/unify/linked-profiles/linked-events/).

