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

#### Warehouse data

- Checking account details: *account_number*
- Card details: *credit_card_type, card_status, card_balance, due_date*

#### Relational data

- User can have multiple accounts (For example: checking, savings, retirement)
- An account can have many cards (For example: debit, credit)
- A card can have many transactions

### Step 1: Build your data graph 

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
  
### Step 2: Activate your Linked Audience

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


### Result

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

#### Warehouse data

- Workspace details: workspace_arr, engagement_score, term_end_date

#### Relational data

- Users can belong to multiple Segment workspaces. 
- Role can depend on the workspace.

### Step 1: Build your data graph 

Follow the steps in [Data Graph](docs/unify/linked-profiles/data-graph/) to build the following: 

- Profiles 
  - Roles
    - Workspaces
    - Accounts 

### Step 2: Activate your Linked Audience 

Follow [Step3: Activate your linked audience](/docs/engage/audiences/linked_audiences/#step-1-build-a-linked-audience) to set up your audience. 

1. Select all profiles:
   - associated where their role is data,
   - with a workspace with an ARR greater than $50k, 
   - and the renewal date is less than 5 months.
2. Choose your event trigger: workspace matches audience
3. Select the following personalized data properties:
   - Profile properties: *user_business_group, user_role* 
   - Workspace details: *workspace_arr, engagement_score, term_end_date*

### Results

The result is an email to your customer that contains:
- Customer Name
- Customer Success Manager Name
- Product Name
- The Associated Customer Use Case 