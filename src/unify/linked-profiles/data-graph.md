---
title: Data Graph
hidden: true

---

With Linked Profiles, you can build a Data Graph that defines relationships between any data set in the warehouse and the Segment Profiles you send with Profiles Sync. 

Use the Data Graph to define relationships between data sets and give marketers access to data to target, personalize, and analyze customer experiences.

> success ""
> Segment's Data Graph powers [Linked Events](#) and [Linked Audiences](#).

## Prerequisites

To use the Data Graph, you'll need the following:
- A Unify and Engage Foundations or Premier plan.
- Workspace owner or Unify Read-only/Admin and Entities Admin permissions.
- A Snowflake Data Warehouse. 
- [Profiles Sync](/docs/unify/profiles-sync/) set up with ready to use [data models and tables](/docs/unify/profiles-sync/tables/) in your warehouse.
- A Braze, Customer.io, or Iterable Destination. <!-- are we supporting all destination actions here? -->


> info ""
> Linked Profiles follows Zero Copy principles. This means that Segment doesn't copy entities to store in Segment. Segment stores and processes all data in the U.S. 

> warning ""
> Don't send any personal health information (PHI) with the Data Graph.


## Connect your warehouse to the Data Graph

> success ""
> Before getting started with the Data Graph, be sure to [set up your Snowflake permissions](/unify/linked-profiles/setup-guides/snowflake-setup/). 

To connect your warehouse to the data graph:

1. In your Segment workspace, navigate to **Unify**, and select **Data Graph**.
- This should be the Unify space with Profiles Sync already set up.
2. Click **Connect warehouse**.
3. Select your warehouse type.
4. Enter your warehouse credentials. Then, test your connection and click **Save**.

Depending on the size of your warehouse, it may take anywhere from a few minutes to an hour for Segment to sync your warehouse metadata to cache before you're able to set up your Data Graph. 

## Build your Data Graph

The Data Graph is a semantic layer that represents a subset of relevant business data that you'll use for audience targeting and personalization in downstream tools. 

Use the configuration language spec below to add models to build your Data Graph.

### Delete and edit entities and/or relationships from your Data Graph

> info ""
> Each Unify space has one Data Graph. The current version is v0.0.6.

Segment recommends creating a new Linked Audience or Linked Event. Deleting and/or editing entities in the Data Graph may lead to errors if you reference these entities or relationships in existing Linked Audiences and Linked Events. 

While you can delete relationships or entities from the Data Graph, these relationships and entities will still display in the Linked Audience builder and Linked Events.

### Define entities

Use the parameters, defintions, and examples below to help you define entities.

#### Profile 

The profile is a special class of entity. The profile is always defined at the top of the Data Graph, and there can only be one profile for a Data Graph. The profile entity corresponds to the Profiles Sync tables and models. The parameters are:

- `profile_folder`: This is the folder or schema location for the profile tables. 
- `materialization`: Identify the type of materialization (`dbt`,`segment`,`none`). 

```python
#define a profile entity

profile {
     profile_folder = "segment"
     materialization = "none"
     # for the pilot, use "none" for materialization
}
```

#### Entity

An entity is a stateful representation of a business object. The entity corresponds to a table in the warehouse that represents that entity. The parameters are:

- `entity`: This should be a unique name for the entity.
- `table_ref`: Define the table reference.
- `primary_key`: This is the unique identifier for the given table and should be a column with unique values per row.
- (Optional) `enrichment_enabled` = true: Indicate if you plan to also reference the entity table for Linked Events. 


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
> Snowflake schemas are case sensitive, so you'll need to reflect the uppercase schema, table, and column names based on how you have it in Snowflake.

#### Relate Entity to Profile

- `relationship`: A unique name to be referenced by the Audience builder.
- `related_entity`: Reference your already defined entity.
- `external_id`: Define the external ID that will be used to join the profile with your entity.
    - `type`: Identify the external ID type (`email`, `phone`, `user id`).
    - This corresponds to the `external_id_type` column in your `external_id_mapping` table.
- `join_key`: This is the column on the entity table that you are matching to the external identifier.

```python
data_graph { 
     #define entities

     profile {
          #define profile

          #relate profile to account
          relationship "Accounts" {
               related_entity = "account"
               external_id {
                    type = "email"
                    join_key = "email_id"
               }
          }
     }
}
```

#### Relate between entities

- `relationship`: A unique name that will be referenced in the Audience builder.
- `related_entity`: Your already defined entity.
- `join_on`: Define relationships between two entity tables `[lefty entity name].[column name] = [right entity name].[column name]`. 
     - Note that the entity name is a reference to the alias provided in the config and doesn't need to be the fully qualified table name. 

```py
data_graph { 
     #define entities
     profile {
          #define profile
               ...
               #relate account to carts
               relationship "Carts" { 
                    related_entity = "cart"
                    join_on = "account.id = cart.account_id"
               }
          }
     }         
}

```

If you're relating entities with a junction table:
- `Junction_table`: Define relationships between two entities tables joined by a junction table.
     - `table_ref`: Define the table reference to the join table.
     - `primary_key`: The unique identifier on the join table and should be a column with unique values per row.
     - `left_join_on`: Define relationship between the two entity tables `[left entity name].[column name] = [junction table column name]`.
     - `right_join_on`: Define relationship between the two entity tables `[junction table column name] = [right entity name].[column name]`.
     - Note that schema.table is implied within the junction table column name and doesn't need to be provided. 
     - Attributes from a junction table are not referenceable with the Audience Builder. If you'd like to reference an additional column on the junction table for filtering, you must first define it as an entity and explicitly define a relationship name. 

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

![An example of a data graph](images/data-graph-example.png)

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

## Next steps 

After you've set up your Data Graph, get started with [Linked Audiences](/docs/unify/linked-profiles/linked-audiences/) and [Linked Events](/docs/unify/linked-profiles/linked-events/).

