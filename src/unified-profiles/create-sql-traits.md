---
title: RETL Queries for Importing Salesforce Objects Into Unified Profiles in Flex
hidden: true
---
You can use the following SQL queries to convert Salesforce objects with US phone number patterns (typically (555) 231-7654) into Segment Unify profiles with E.164 phone number formats (+15552317654). Unified Profiles in Flex requires phone numbers used for profile lookups to be in E.164 format.

Segment created three sample queries for Unified Profiles users to import common Salesforce objects: 
- [Accounts](#accounts)
- [Contacts](#contacts)
- [Leads](#leads)

To selectively import columns, replace the `a*`, `c*`, or `l*` with a list of fields to selectively import. For example, if you wanted to only import the ID, NAME, and ADDRESS fields for your Accounts, you'd replace `a*` with  `a.ID, a.NAME, a.ADDRESS`.

> success ""
> Segment creates a default database table (`segment_flex_unify`) during the [Segment for Flex](/docs/unified-profiles/segment-for-flex/){:target="_blank”} setup process.  

## Accounts

To import Salesforce Accounts into Unified Profiles as Segment Unify profiles, create a RETL mapping with the following format.

Replace `<database_name.account_table>` with your database name and account table, `PHONE` with the name of the column in your warehouse that contains phone numbers, and `BILLING_COUNTRY` with the name of the column in your warehouse that contains the account's country.  In this sample query, the `PHONE` column is the primary contact phone number and what you import as the Profile’s 'phone' trait.

The other phone fields for Salesforce Accounts are PersonHomePhone, PersonMobilePhone, & PersonOtherPhone, and could be substituted for `PHONE` in this query. **You can only import one phone number field as the identifier used for lookups in Unified Profiles.** 

``` sql
SELECT 
    a.*,
    CASE 
        WHEN a.PHONE REGEXP '^(\\([0-9]{3}\\) [0-9]{3}-[0-9]{4})$' AND a.BILLING_COUNTRY = 'US'
        THEN CONCAT('+1', REGEXP_REPLACE(a.PHONE, '[^0-9]',''))
        WHEN a.BILLING_COUNTRY != 'US'
        THEN REGEXP_REPLACE(a.PHONE, '[^0-9]','') 
        ELSE a.PHONE
    END as phone,
FROM 
    <database_name.account_table> a
WHERE 
    a.PHONE IS NOT NULL
    AND a.BILLING_COUNTRY IS NOT NULL;
```

After running this query, you can use ‘phone’ for lookups in Unified Profiles.  


## Contacts

To import Salesforce Contacts into Unified Profiles as Segment Unify profiles, create a RETL mapping with the following format. 

Replace `<database_name.contact_table>` with your database name and account table, `PHONE` with the name of the column in your warehouse that contains phone numbers, and `BILLING_COUNTRY` with the name of the column in your warehouse that contains the contact's country. 

Salesforce objects have several phone number-related fields. In this sample query, the `PHONE` column is the primary contact phone number and what you import as the Profile’s 'phone' trait. 

The other phone fields for Salesforce Contacts are HomePhone, MobilePhone, & OtherPhone, and could be substituted for `PHONE` in this query. **You can only import one phone number field as the identifier used for lookups in Unified Profiles.** 

``` sql
SELECT 
    c.*,
    CASE 
        WHEN c.PHONE REGEXP '^(\\([0-9]{3}\\) [0-9]{3}-[0-9]{4})$' AND c.MAILING_COUNTRY = 'US'
        THEN CONCAT('+1', REGEXP_REPLACE(c.PHONE, '[^0-9]',''))
        WHEN c.MAILING_COUNTRY != 'US'
        THEN REGEXP_REPLACE(c.PHONE, '[^0-9]','') 
        ELSE c.PHONE
    END as phone,
FROM 
    <database_name.contact_table> c
WHERE 
    c.PHONE IS NOT NULL
    AND c.MAILING_COUNTRY IS NOT NULL;
```

After running this query, you can use ‘phone’ for lookups in Unified Profiles.    

## Leads

To import Salesforce Leads into Unified Profiles as Segment Unify profiles, create a RETL mapping with the following format. 

Replace `<database_name.lead_table>` with your database name and lead table, `PHONE` with the name of the column in your warehouse that contains phone numbers, and `BILLING_COUNTRY` with the name of the column in your warehouse that contains the lead's country. 

Salesforce objects have several phone number-related fields. In this sample query, the `PHONE` column is the primary contact phone number and what you import as the Profile’s 'phone' trait. 

The other phone fields for Salesforce Leads are HomePhone, MobilePhone, & OtherPhone, and could be substituted for `PHONE` in this query. **You can only import one phone number field as the identifier used for lookups in Unified Profiles.** 

``` sql
SELECT 
    l.*,
    CASE 
        WHEN l.PHONE REGEXP '^(\\([0-9]{3}\\) [0-9]{3}-[0-9]{4})$' AND l.COUNTRY = 'US'
        THEN CONCAT('+1', REGEXP_REPLACE(l.PHONE, '[^0-9]',''))
        WHEN l.COUNTRY != 'US'
        THEN REGEXP_REPLACE(l.PHONE, '[^0-9]','') 
        ELSE l.PHONE
    END as phone,
FROM 
    <database_name.lead_table> l
WHERE 
    l.PHONE IS NOT NULL
    AND l.COUNTRY IS NOT NULL;
```

After running this query, you can use ‘phone’ for lookups in Unified Profiles.  

## Troubleshooting
If these queries don't return phone numbers in E.164 format, examine your existing data and change the REGEX patterns as appropriate.

Because the format in which an international phone number is saved in Salesforce largely depends on how users input them into the system, Salesforce administrators can add form validation methods, like input field validation rules with REGEXP functions, to guide users to input phone numbers in specific formats. These form validation methods may impact the format of the phone numbers in your database, and might require you to change the REGEXP patterns in the provided queries. 
