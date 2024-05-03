---
title: Linked Audiences Use Cases
plan: engage-foundations
beta: true
hidden: true
redirect_from: 
    - '/unify/linked-profiles/linked-audiences-use-cases'
---
> info "Linked Audiences is in public beta"
> Linked Audiences is in public beta, and Segment is actively working on this feature. Some functionality may change before it becomes generally available.

Below are some example use cases to help you understand the concepts around linked audiences using specific examples.

## Use Case Example 1: Financial Services

### Email reminder to pay off overdue credit card

Target an audience of customers who own a checking account with at least one credit card with an overdue balance. Then, personalize the email reminder to pay off overdue credit card targeting.

#### Financial Services Warehouse data

- Checking account details: *account_number*
- Card details: *credit_card_type, card_status, card_balance, due_date*

#### Financial Services Relational data

- User can have multiple accounts (For example: checking, savings, retirement)
- An account can have many cards (For example: debit, credit)
- A card can have many transactions

### Step 1: Build your Financial Services data graph

Follow the steps in [Data Graph](docs/unify/linked-profiles/data-graph/) to build the following:

- Profiles
  - Accounts
    - Checking
    - Savings
  - Credit Cards
    - Debit
      - Transactions
    - Credit
      - Purchases
  
### Step 2: Activate your Financial Services Linked Audience

Follow [Step 3: Activate your linked audience](/docs/engage/audiences/linked_audiences/#step-1-build-a-linked-audience) to set up your audience.

1. Select all profiles:
   - associated with at least one instance (account),
   - where the account type is checking,
   - all accounts with at least 1 credit card…
   - where the status is overdue.

2. Choose your event trigger: *account_status is overdue*
3. Select the following personalized data properties:
   - Profile traits: *first_name, user_primary_bank*
   - Checking account details: *account_number*
   - Card details: *credit_card_type, card_status, card_balance, due_date*


### Financial Services Result

The result is an email to your customer that contains:
- Name
- Account details, including
  - Account Number
  - Credit card name
  - Balance
  - Due Date

## Use Case Example 2: SaaS Business

### Personalize an email with customers with low engagement score before renewals:

Send a personalized email to customers with low engagement scores before renewal.

#### SaaS Warehouse data

- Workspace details: workspace_arr, engagement_score, term_end_date

#### SaaS Relational data

- Users can belong to multiple Segment workspaces. 
- Role can depend on the workspace.

### Step 1: Build your SaaS data graph

Follow the steps in [Data Graph](docs/unify/linked-profiles/data-graph/) to build the following:

- Profiles
  - Roles
    - Workspaces
    - Accounts

### Step 2: Activate your SaaS Linked Audience

Follow [Step3: Activate your linked audience](/docs/engage/audiences/linked_audiences/#step-1-build-a-linked-audience) to set up your audience.

1. Select all profiles:
   - associated where their role is data,
   - with a workspace with an ARR greater than $50k, 
   - and the renewal date is less than 5 months.
2. Choose your event trigger: workspace matches audience
3. Select the following personalized data properties:
   - Profile properties: *user_business_group, user_role* 
   - Workspace details: *workspace_arr, engagement_score, term_end_date*

### SaaS Results

The result is an email to your customer that contains:

- Customer Name
- Customer Success Manager Name
- Product Name
- The Associated Customer Use Case

## Use Case Example 3: Retail Business

### Personalized promotion email to target customers with a product back in stock

Owl Shoes dreams of crafting a targeted promotion email to Char to nudge her to buy one of her wish list items that’s now back in stock. With Linked Audiences, Owl Shoes can easily pull in details about the product name, shoe size, and loyalty status.

#### Retail Warehouse data

Product details: *product_name, product_status*

#### Retail Relational data

- Each order can contain multiple products
- A product can be related to multiple orders
  
### Step 1: Build your Retail data graph

Follow the steps in [Data Graph](docs/unify/linked-profiles/data-graph/) to build the following:

- Profiles
  - Wish List
    - Products
  - Orders
    - Products

### Step 2: Activate your Retail Linked Audience

Follow [Step3: Activate your linked audience](/docs/engage/audiences/linked_audiences/#step-1-build-a-linked-audience) to set up your audience.

1. Select all profiles:
   - associated with at least 1 wish list,
   - where at least 1 product is in stock.
2. Choose your event trigger: *product changes to in stock*
3. Select the following personalized data properties:
   - Profile properties: *First_Name*
   - Wish list properties: *Product_Name, Product_Status, Shoe_Size*
   - Order Properties: *Order_Date*

### Retail Results

The result is an email to your customer that contains:

- Customer Name
- Wishlist Product Name
- Shoe Size
- Customer’s Loyalty Status
- A Discount Code
