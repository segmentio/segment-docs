---
title: Redshift Setup
beta: true
plan: unify
---

On this page, you'll learn how to connect your Redshift data warehouse to Segment. 

## Getting started 

To get started with Redshift:
1. Log in to Redshift and select the Redshift cluster you want to connect. 
2. Follow these [networking instructions](/docs/connections/storage/catalog/redshift/#networking) to configure network and security settings.

## Create a new role and user

Run the SQL commands below to create a role (`segment_entities`) and user (`segment_entities_user`).

```sql
-- create role
CREATE ROLE segment_entities;

-- allow the role to create new schemas on specified database. (This is the name you chose when provisioning your cluster)
GRANT CREATE ON DATABASE "<enter database name here>" TO ROLE segment_entities;

-- create a user named "segment_entities_user" that Segment will use when connecting to your Redshift cluster. 
CREATE USER segment_entities_user PASSWORD '<enter password here>';

-- grant role permissions to the user
GRANT ROLE segment_entities TO segment_entities_user;
```

## Grant access to schemas and tables

You'll need to grant access to schemas and tables that you'd like to enrich with. This allows Segment to list schemas, tables, and columns, as well as create entities with data extracted and ingested to Segment.

### Schemas

Grant schema permissions based on customer need. Visit Amazon's docs to view [schema permissions](https://docs.aws.amazon.com/redshift/latest/dg/r_GRANT.html){:target="_blank"} and [example commands](https://docs.aws.amazon.com/redshift/latest/dg/r_GRANT-examples.html){:target="_blank"} that you can use to grant permissions.

```ts
-- view specific schemas in database
GRANT USAGE ON SCHEMA <schema-name> TO ROLE segment_entities;
```

### Tables

Grant table permissions based on customer need. Learn more about Amazon's [table permissions](https://docs.aws.amazon.com/redshift/latest/dg/r_GRANT.html){:target="_blank"}.

```ts
-- query data from a specific table in a schema
GRANT SELECT ON TABLE <schema-name>.<table-name> TO ROLE segment_entities;
```

### RETL table permissions

If you've used RETL in your database, you'll need to add the following [table permissions](https://docs.aws.amazon.com/redshift/latest/dg/r_GRANT.html){:target="_blank"}:

```ts
GRANT USAGE, CREATE ON SCHEMA __segment_reverse_etl TO ROLE segment_entities;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA __segment_reverse_etl TO ROLE segment_entities;
```
