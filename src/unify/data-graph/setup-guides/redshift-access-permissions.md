---
title:  Redshift Data Graph User Access Permissions
---

Set up your Redshift Data Graph. You can choose from two different permissions options depending on your use case. 

## Permissions Option 1
You can set up the Data Graph in such a way that Segment has access to 2 databases:
* The first database has write access for storing Reverse ETL checkpoints databases
* The second database has read access

### Database
Create a separate databse for Segment usage (for example, `segment_workspace`). This will have the following schemas:
1. Profiles Sync Schema (for example: `profiles_sync`)
   * Segment will add [Profiles Sync tables](/docs/unify/profiles-sync/tables/) to this schema
2. `__segment_reverse_etl` schema
   * Segment will create the [`__segment_reverse_etl` schema](/docs/connections/reverse-etl/system/#reverse-etl-schema) to add checksum tables for Linked/Data Graph

### User
Have 2 roles assigned to the Segment user:
* Profiles Sync role (for example, `segment_profiles_sync_role`)
* Linked/Data Graph role (for example, `segment_linked_role`)

### Roles
#### Profiles Sync role (`segment_profiles_sync_role`)
The profiles sync role has the following permissions: 
* Read and write access to the Profiles Sync schema (for example, `profiles_sync`) 

#### Linked/Data Graph role (`segment_linked_role`)
This role has the following permissions: 
* Write access to the Segment Database (for example, `segment_workspace`) to create the `__segment_reverse_etl` schema in it 
* Read access to Profiles Sync schema (for example, `profiles_sync`) to read Segment Profile and Event tables that are created by Profiles Sync
* Read access to full user data schema (for example, devices schema), or read access to specific tables in the user data schema (for example, `user_devices` table or `device_locations` table)

## Permissions Option 2
Set up the Data Graph so that Segment has access to a single database. 

### Database
Create a single database for Profiles Sync & Linked usage (for example, `segment_workspace`). This has the following schemas:
1. Profiles Sync schema (for example, profiles_sync)
   * Segment adds [Profiles Sync tables](/docs/unify/profiles-sync/tables/) to this schema
2. `__segment_reverse_etl` schema
   * Segment creates the [`__segment_reverse_etl` schema](/docs/connections/reverse-etl/system/#reverse-etl-schema) to add checksum tables for Linked/Data Graph
3. End User Entity Details schema (for example, devices)
   * Segment has read access to these tables

### User
Have these 2 roles assigned to the Segment user:
* Profiles Sync role (for example, `segment_profiles_sync_role`)
* Linked/Data Graph role (for example, `segment_linked_role`)

### Roles
#### Profiles Sync role (`segment_profiles_sync_role`)

This role has the following permissions: 
* Read and write access to the Profiles Sync schema (for example, `profiles_sync`) 

#### Linked/Data Graph role (segment_linked_role)
This role has the following permissions: 
* Write access to Database (for example, `segment_workspace`) to create the `__segment_reverse_etl` schema in it 
* Read access to Profiles Sync schema (for example, `profiles_sync`) to read Segment Profile/Event tables that are created by Profiles Sync
* Read access to full user data schema (for example, devices schema) or read access to specific tables in the user data schema (for example, `user_devices` table or `device_locations` table)

## Setup Guide
To set your Data Graph so that Segment has access to 2 databases within your Redshift Cluster: 

### Step 1: Create the new Segment database
Run:

```
--Create new Segment database
CREATE DATABASE segment_workspace;
```

### Step 2: Create the Profiles Sync role

1. Switch to the Segment database in the Redshift query editor. Create a new Profiles Sync role.

    ```
    --create new Profiles Sync role
    CREATE ROLE segment_profiles_sync_role;
    ```

2. Create a new Profiles Sync schema.

    ```
    --create new Profiles Sync schema
    CREATE SCHEMA "profiles_sync";
    ```

3. Assign the Profiles Sync role with read and write access to the Profiles Sync schema.

    ```
    --grant Profiles Sync role write access to Profiles Sync schema
    GRANT ALL ON SCHEMA profiles_sync TO ROLE segment_profiles_sync_role; 
    ```

### Step 3: Create the Linked/Data Graph role

1. Create a new Linked/Data Graph role.

    ```
    --create new Linked/Data Graph role
    CREATE ROLE segment_linked_role;
    ```

2. Assign the Linked/Data Graph role with write access to the Segment database ([created in Step 1](#step-1-create-the-new-segment-database)) for permissions to create a new `__segment_reverse_etl` schema.

    ```
    --grant Linked role write access to segment_workspace DATABASE to create __segment_reverse_etl SCHEMA
    GRANT CREATE ON DATABASE segment_workspace TO ROLE segment_linked_role;
    ```

3. Assign the Linked/Data Graph role with read access to the Profiles Sync schema to access the Segment Profile/Event data.

    ```
    --grant Linked role read access to Profiles Sync SCHEMA
    GRANT USAGE ON SCHEMA "profiles_sync" TO ROLE segment_linked_role;

    -- Grant read access to existing Profiles Sync tables
    GRANT SELECT ON ALL TABLES IN SCHEMA profiles_sync TO ROLE segment_linked_role;

    -- Ensure future Profiles Sync tables also allow read access
    ALTER DEFAULT PRIVILEGES IN SCHEMA profiles_sync
    GRANT SELECT ON TABLES TO ROLE segment_linked_role;
    ```

4. Assign the Linked/Data Graph role read access to end user Entity Data.
   * For [Permissions Option 1](#permissions-option-1):
        1. Switch to the end user database in the query editor. Assign the Linked/Data Graph role with read access to user data.

            ```
            --grant Linked role read access to user entity tables in DATABASE user_database
            GRANT USAGE ON SCHEMA devices TO ROLE segment_linked_role;
            ```

        2. Select 1 of the options below:

            a. (*Option 1*):: Assign the Linked/Data Graph role with read access to full user data schema

            ```
            --for access to the full devices SCHEMA
            GRANT SELECT ON ALL TABLES IN SCHEMA devices TO ROLE segment_linked_role; 

            --ensure future user tables also allow read access
            ALTER DEFAULT PRIVILEGES IN SCHEMA devices
            GRANT SELECT ON TABLES TO ROLE segment_linked_role;
            ```

            b. (*Option 2*): Assign the Linked/Data Graph role with read access to specific tables in the user data schema

            ```
            --for access to select tables in the devices SCHEMA
            GRANT SELECT ON devices.user_devices TO ROLE segment_linked_role;
            GRANT SELECT ON devices.device_locations TO ROLE segment_linked_role; 
            ```
    * For permissions option 2:
        1. Stay in the Segment Database within the Redshift Query Editor. Assign the Linked/Data Graph role with read access to user data.

            ```
            --grant Linked role read access to user entity tables in DATABASE segment_workspace
            GRANT USAGE ON SCHEMA devices TO ROLE segment_linked_role;
            ```

        2. Select 1 of the options:
            
            a. (*Option 1*): Assign the Linked/Data Graph role with read access to the full user data schema.

            ```
            --for access to the full devices SCHEMA
            GRANT SELECT ON ALL TABLES IN SCHEMA devices TO ROLE segment_linked_role; 

            --ensure future user tables also allow read access
            ALTER DEFAULT PRIVILEGES IN SCHEMA devices
            GRANT SELECT ON TABLES TO ROLE segment_linked_role;
            ```

            b. (*Option 2*): Assign the Linked/Data Graph role with read access to specific tables in the user data schema

            ```
            --for access to select tables in the devices SCHEMA
            GRANT SELECT ON devices.user_devices TO ROLE segment_linked_role;
            GRANT SELECT ON devices.device_locations TO ROLE segment_linked_role; 
            ```

### Step 4: Create a new Segment user
1. Switch back to the Segment database in the query editor.

```
--create new USER
CREATE USER segment_user PASSWORD 'Abc123';
```

### Step 5: Assign both the Profiles Sync role ([from Step 2](#step-2-create-the-profiles-sync-role)) and the Linked/Data Graph role (from [Step 3](#step-3-create-the-linkeddata-graph-role)) to the user

```
--assign both roles to USER
GRANT ROLE segment_profiles_sync_role TO segment_user; --Assign Profiles Sync Role to user
GRANT ROLE segment_linked_role TO segment_user; --Assign Linked/Data Graph Role to user
```

