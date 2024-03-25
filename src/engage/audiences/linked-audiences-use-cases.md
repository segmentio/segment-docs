---
title: Linked Audiences Use Cases
plan: engage-foundations
beta: true
redirect_from: 
    - '/unify/linked-profiles/linked-audiences-use-cases'
hidden: false
---

# Linked Audience Use Cases 

Below are some example use cases to help you learn more about Linked Audiences.

## Use case 1: Build an audience of users who have a credit card with an outstanding balance

To build this audience, define a nested entity condition to relate a `Profile` to their:
- `Account` entity
- `Credit Card` entity where `credit_card.balance` is "Outstanding"

In the Data Graph, `Account` and `Credit Card` are defined as entities and represented as separate tables in your data warehouse. 

Relationships are defined between:
- `Profile` and `Account`
- `Account` and `Credit Card`

In the warehouse, `credit_card.balance` is a column in the `Credit Card` table. By filtering against the `credit_card.balance` column for the "Outstanding" value, marketers can return a list of users that have a credit card with an outstanding balance.

## Use case 2: Build an audience of cat owners who are also a part of the platinum membership tier

To build this audience, define a nested entity condition to relate a `Profile` to their:
- `Household` entity
- `Pet` entity where `pet.type` is "Cat"

Define an audience membership condition to filter for users that are a member of the "Platinum membership tier" audience.

In the Data Graph, `Households` and `Pets` are defined as entities and are represented as separate tables in your data warehouse.

Relationships are defined between:
- `Profiles` and `Households`
- `Households` and `Pets`

In the warehouse, `pets.type` is a column in the `pets` table. By filtering against the `pets.type` column for the "cat" value, marketers can return a list of users that have a cat.

Then, adding the audience membership condition allows marketers to further refine their audience to only include users who are part of the "Platinum membership tier" audience.

## Use case 3: Build an audience of credit card holders with a certain number of transactions

To build this audience, define a nested entity condition to relate a `Profile` to their:
- `Accounts` entity
- `Subscriptions` entity where `subscriptions.tier` is "Premium"
- `Transactions` entity where `transactions.count` is greater than five

This nested entity condition has four levels of relationship depth.

In the Data Graph, `Accounts`, `Credit Cards`, and `Transactions` are defined as entities.

Relationships are defined between:
- `Profiles` and `Accounts`
- `Accounts` and `Credit Cards`
- `Credit Cards` and `Transactions`

In the warehouse, `subscriptions.tier` is a column in the `Subscriptions` table, and `transactions.count` is a column in the `Transactions` table. By filtering against the `subscriptions.tier` column for the "Premium" value, and the `transactions.count` column for values greater than five, marketers can return a list of users that have a premium account where there are greater than five transactions.
