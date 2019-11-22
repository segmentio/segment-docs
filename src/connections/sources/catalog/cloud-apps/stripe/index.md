---
title: Stripe Source
rewrite: true
---
[Stripe](https://stripe.com/about) builds economic infrastructure for the internet, that enables businesses of every size to accept payments and manage their businesses online.

This is an [Object Cloud Source](https://segment.com/docs/connections/sources/#object-cloud-sources) which can export data from its third party tool and import it directly into your Segment warehouse.

This document was last updated on July 30, 2018. If you notice any gaps, outdated information or simply want to leave some feedback to help us improve our documentation, please [let us know](https://segment.com/help/contact)!

## Getting Started
 1. From your workspace's `/sources` page, click `add source`.
 2. Choose Stripe.
 3. Give the source a nickname and a schema name. The nickname is a label used in the Segment interface, and the schema name is the namespace you query against in your warehouse. Both can be whatever you like, but we recommend sticking to something that reflects the source itself, like `Stripe` for nickname and `stripe` or `stripe_prod` for the schema name.
 _**NOTE:** that you can add multiple instances if you have multiple Stripe accounts. That's why we allow you to customize the source's nickname and schema name!_
 4. When you click connect, you'll be dropped into Stripe's OAuth flow. Once you sign in and grant permissions, you'll be good to go!

## Components

### Sync
The Stripe source is built with a sync component, which means we'll make requests to their API on your behalf on a 3 hour interval to pull the latest data into Segment. In the initial sync, we'll grab all the Stripe objects (and their corresponding properties) according to the Collections Table below. The objects will be written into a separate schema, corresponding to the source instance's schema name you designated upon creation (ie. `stripe_prod.charges`).

Our sync component uses an upsert API, so the data in your warehouse loaded via sync will reflect the latest state of the corresponding resource in Stripe.  For example,  if `subscription_status` goes from `active` to `inactive` between syncs, on its next sync that tickets status will be `inactive`.

The source syncs and warehouse syncs are independent processes. Source runs pull your data into the Segment Hub, and warehouse runs flush that data to your warehouse. Sources will sync with Segment every 3 hours. Depending on your Warehouses plan, we will push the Source data to your warehouse on the interval associated with your billing plan.

## Collections
Collections are the groupings of resources we pull from your source. In your warehouse, each collection gets its own table.

|  Collection | Type | Description |
|  ------ | ------ | ------ |
|  accounts | object | This is an object representing your Stripe account. You can retrieve it to see properties on the account like its current e-mail address or if the account is enabled yet to make live charges. For more info, see [Stripe's API docs](https://stripe.com/docs/api#account) |
|  application_fee_refunds | object | Application Fee Refund objects allow you to refund an application fee that has previously been created but not yet refunded. Funds will be refunded to the Stripe account that the fee was originally collected from. For more info, see [Stripe's API docs](https://stripe.com/docs/api#fee_refunds) |
|  application_fees | object | When you collect a transaction fee on top of a charge made for your user (using Stripe Connect), an application fee object is created in your account. You can list, retrieve, and refund application fees. For more info, see [Stripe's API docs](https://stripe.com/docs/api#application_fees) |
|  balance_transactions | object | Balance transactions lists the transaction balance history. For more info, see [Stripe's API docs](https://stripe.com/docs/api#balance_transaction_object)|
|  balance_transaction_fee_details | object | Balance transaction fee details include a breakdown of fees (in cents) paid for each transaction. For more info, see [Stripe's API docs](https://stripe.com/docs/api#balance_transaction_object) |
|  bank_accounts | object | Bank accounts are used at Stripe in two ways: as a payment method on Customer objects and as a transfer destination on Account objects for managed accounts. The accepted and required parameters are different for each context. For more info, see [Stripe's API docs](https://stripe.com/docs/api#bank_accounts) |
|  bitcoin_receivers | object | A Bitcoin receiver wraps a Bitcoin address so that a customer can push a payment to you. This guide describes how to use receivers to create Bitcoin payments. For more info, see [Stripe's API docs](https://stripe.com/docs/api#bitcoin_receivers) |
|  cards | object | You can store multiple cards on a customer in order to charge the customer later. You can also store multiple debit cards on a recipient or a managed account in order to transfer to those cards later. For more info, see [Stripe's API docs](https://stripe.com/docs/api#cards) |
|  charges | object | To charge a credit or a debit card, you create a charge object. You can retrieve and refund individual charges as well as list all charges. For more info, see [Stripe's API docs](https://stripe.com/docs/api#charges) |
|  coupons | object | A coupon contains information about a percent-off or amount-off discount you might want to apply to a customer. Coupons only apply to invoices; they do not apply to one-off charges. For more info, see [Stripe's API docs](https://stripe.com/docs/api#coupons) |
|  customers | object | Customer objects allow you to perform recurring charges and track multiple charges that are associated with the same customer. For more info, see [Stripe's API docs](https://stripe.com/docs/api#customers) |
|  discounts | object | A discount represents the actual application of a coupon to a particular customer. It contains information about when the discount began and when it will end. For more info, see [Stripe's API docs](https://stripe.com/docs/api#discounts) |
|  disputes | object | A dispute occurs when a customer questions your charge with their bank or credit card company. When a customer disputes your charge, you're given the opportunity to respond to the dispute with evidence that shows the charge is legitimate. You can find more information about the dispute process in our disputes FAQ. For more info, see [Stripe's API docs](https://stripe.com/docs/api#disputes) |
|  file_uploads | object | There are various times when you'll want to upload files to Stripe (for example, when uploading dispute evidence). This can be done by creating a file upload object. When you upload a file, the API responds with a file token and other information about the file. The token can then be used to retrieve a file object. For more info, see [Stripe's API docs](https://stripe.com/docs/api#file_uploads) |
|  invoice_items | object | Sometimes you want to add a charge or credit to a customer but only actually charge the customer's card at the end of a regular billing cycle. This is useful for combining several charges to minimize per-transaction fees or having Stripe tabulate your usage-based billing totals. For more info, see [Stripe's API docs](https://stripe.com/docs/api#invoiceitems) |
|  invoice_lines | object | When retrieving an invoice, you'll get a lines property containing the total count of line items and the first handful of those items For more info, see [Stripe's API docs](https://stripe.com/docs/api#invoice_lines) |
|  invoices | object | Invoices are statements of what a customer owes for a particular billing period, including subscriptions, invoice items, and any automatic proration adjustments if necessary. For more info, see [Stripe's API docs](https://stripe.com/docs/api#invoices) |
| payment_intents  | object | A PaymentIntent tracks the process of collecting a payment from your customer. A PaymentIntent transitions through multiple statuse throughout its lifetime and ultimately creates at most one successful charge. For more info, see [Stripe's API docs](https://stripe.com/docs/api/payment_intents) |
| payment_methods  | object | PaymentMethod objects represent your customer's payment instruments. They can be used with [PaymentIntents](https://stripe.com/docs/payments/payment-intents) to collect payments or saved to Customer objects to store instrument details for future payments. For more info, see [Stripe's API docs](https://stripe.com/docs/payments/payment-methods) |
|  plans | object | A subscription plan contains the pricing information for different products and feature levels on your site. For more info, see [Stripe's API docs](https://stripe.com/docs/api#plans) |
|  refunds | object | Refund objects allow you to refund a charge that has previously been created but not yet refunded. Funds will be refunded to the credit or debit card that was originally charged. The fees you were originally charged are also refunded. For more info, see [Stripe's API docs](https://stripe.com/docs/api#refunds) |
|  subscriptions | object | Subscriptions allow you to charge a customer's card on a recurring basis. A subscription ties a customer to a particular plan you've created. For more info, see [Stripe's API docs](https://stripe.com/docs/api#subscriptions) |
|  transfer_reversals | object | A previously created transfer can be reversed if it has not yet been paid out. Funds will be refunded to your available balance, and the fees you were originally charged on the transfer will be refunded. You may not reverse automatic Stripe transfers. For more info, see [Stripe's API docs](https://stripe.com/docs/api#transfer_reversals) |
|  transfers | object | When Stripe sends you money or you initiate a transfer to a bank account, debit card, or connected Stripe account, a transfer object will be created. You can retrieve individual transfers as well as list all transfers. For more info, see [Stripe's API docs](https://stripe.com/docs/api#transfers) |

## Collection Properties
Below are tables outlining the properties included in the collections listed above.

### accounts
|  Property Name | Description |
|  ------ | ------ |
| email | The primary user's email address |
| statement_descriptor | The default text that appears on credit card statements when a charge is made directly on the account |
| display_name | The display name for this account |
| timezone | The timezone used in the Stripe Dashboard for this account |
| details_submitted | Whether account details have been submitted |
| charges_enabled | Whether the account can create live charges |
| transfers_enabled | Whether transfers are enabled |
| default_currency | The currency this account has chosen to use as the default |
| country | The country of the account |
| business_name | The publicly visible name of the business |
| business_url | The publicly visible website of the business |
| support_phone | A publicly shareable support phone number for the business |
| business_logo | The publicly visible logo of the business |
| support_url | A publicly shareable website |
| support_email | A publicly shareable support email address for the business |
| debit_negative_balances | A Boolean indicating if Stripe should try to reclaim negative balances from an attached bank account |

### application_fee_refunds
|  Property Name | Description |
|  ------ | ------ |
| amount | Amount, in cents |
| currency | Three-letter ISO currency code, in lowercase |
| fee_id | ID of the application fee that was refunded |

### application_fees
|  Property Name | Description |
|  ------ | ------ |
| account_id | ID of the Stripe account this fee was taken from |
| amount | Amount earned, in pence |
| amount_refunded | Amount in pence refunded |
| application_id | ID of the Connect application that earned the fee |
| balance_transaction_id | Balance transaction that describes the impact of this collected application fee on your account balance |
| charge_id | ID of the charge that the application fee was taken from |
| currency | Three-letter ISO currency code, in lowercase |
| originating_transaction | ID of the corresponding charge on the platform account |
| refunded | Whether the fee has been fully refunded |

### balance_transactions
|  Property Name | Description |
|  ------ | ------ |
| amount | Gross amount of the transaction, in cents |
| currency | Three-letter ISO currency code, in lowercase |
| description | An arbitrary string attached to the object |
| fee | Fees (in cents) paid for this transaction |
| net | Net amount of the transaction, in cents |
| status | If the transaction's net funds are available in the Stripe balance yet |
| type | Transaction type |
| source | The Stripe object to which this transaction is related |

### balance_transaction_fee_details
|  Property Name | Description |
|  ------ | ------ |
| balance_transaction_id | Unique identifier for the object |
| amount | Gross amount of the transaction, in pence |
| currency | Three-letter ISO currency code, in lowercase |
| description | An arbitrary string attached to the object |
| type | Transaction type |

### bank_accounts
|  Property Name | Description |
|  ------ | ------ |
| bank_name | Name of the bank associated with the routing number |
| country | Two-letter ISO code representing the country the bank account is located in |
| currency | Three-letter ISO code for the currency paid out to the bank account |
| default_for_currency | Currency default |
| status | Status of account |

### cards
|  Property Name | Description |
|  ------ | ------ |
| address_city | City/District/Suburb/Town/Village |
| address_country | Billing address country, if provided when creating card |
| address_line1 | Address line 1 (Street address/PO Box/Company name) |
| address_line1_check | Check for above |
| address_line2 | Address line 2 (Apartment/Suite/Unit/Building) |
| address_state | State/County/Province/Region |
| address_zip | ZIP or postal code |
| address_zip_check | Check for above |
| brand | Card brand |
| country | Two-letter ISO code representing the country of the card |
| cvc_check | If a CVC was provided, results of the check |
| exp_month | Two-digit number representing the card's expiration month |
| exp_year | Four-digit number representing the card's expiration year |
| funding | Card funding type |
| name | Cardholder name |
| last4 | The last four digits of the card |
| dynamic_last4 | The last four digits of the device account number |
| fingerprint | Uniquely identifies this particular card number. |
| tokenization_method | If the card number is tokenized, this is the method that was used |

### charges
|  Property Name | Description |
|  ------ | ------ |
| amount | A positive integer in the smallest currency unit representing how much to charge |
| amount_refunded | Amount in cents refunded |
| application_fee | The application fee (if any) for the charge |
| balance_transaction_id | ID of the balance transaction that describes the impact of this charge on your account balance |
| captured | If the charge was created without capturing |
| currency | Three-letter ISO currency code, in lowercase |
| customer_id | ID of the customer this charge is for if one exists |
| description | An arbitrary string attached to the object |
| destination | The account (if any) the charge was made on behalf of, with an automatic transfer |
| failure_code | Error code explaining reason for charge failure if available  |
| failure_message | Message to user further explaining reason for charge failure if available |
| invoice_id | ID of the invoice this charge is for if one exists |
| paid | true if the charge succeeded, or was successfully authorized for later capture |
| payment_intent_id | ID of the PaymentIntent associated with this charge, if one exists. |
| payment_method_id | ID of the payment method used in this charge.                |
| receipt_email | This is the email address that the receipt for this charge was sent to |
| receipt_number | This is the transaction number that appears on email receipts sent for this charge |
| refunded | Whether the charge has been fully refunded |
| statement_descriptor | Extra information about a charge. This will appear on your customer's credit card statement |
| status | The status of the payment |

### coupons
|  Property Name | Description |
|  ------ | ------ |
| percent_off | Percent that will be taken off the subtotal of any invoices for this customer for the duration of the coupon |
| amount_off | Amount (in the currency specified) that will be taken off the subtotal of any invoices for this customer |
| currency | The three-letter ISO code for the currency of the amount to take off |
| duration | Describes how long a customer who applies this coupon will get the discount |
| max_redemptions | Maximum number of times this coupon can be redeemed, in total, before it is no longer valid |
| times_redeemed | Number of times this coupon has been applied to a customer |
| valid | Taking account of the above properties, whether this coupon can still be applied to a customer |
| duration_in_months | If duration is repeating, the number of months the coupon applies |

### customers
|  Property Name | Description |
|  ------ | ------ |
| account_balance | Current balance, if any, being stored on the customer's account |
| currency | Three-letter ISO code for the currency the customer can be charged in for recurring billing purpose |
| delinquent | When the customer's latest invoice is billed by charging automatically, delinquent is true if the invoice's latest charge is failed |
| description | An arbitrary string attached to the object |
| email | The customer's email address |

### discounts
|  Property Name | Description |
|  ------ | ------ |
| customer_id | ID of the customer |
| subscription | The subscription that this coupon is applied to, if it is applied to a particular subscription |

### disputes
|  Property Name | Description |
|  ------ | ------ |
| charge_id | ID of the charge that was disputed |
| amount | Disputed amount. Usually the amount of the charge |
| status | Current status of dispute |
| currency | Three-letter ISO currency code, in lowercase |
| reason | Reason given by cardholder for dispute |
| is_charge_refundable | If true, it is still possible to refund the disputed payment |

### invoice_items
|  Property Name | Description |
|  ------ | ------ |
| amount | Amount (in the currency specified) of the invoice item |
| currency | Three-letter ISO currency code, in lowercase |
| customer_id | The ID of the customer who will be billed when this invoice item is billed |
| description | An arbitrary string attached to the object |
| discountable | If true, discounts will apply to this invoice item. Always false for prorations |
| invoice_id | The ID of the invoice this invoice item belongs to |
| proration | Whether the invoice item was created automatically as a proration adjustment when the customer switched plans |
| quantity | Quantity of units for the invoice item. If the invoice item is a proration, the quantity of the subscription that the proration was computed for |
| subscription_id | The subscription that this invoice item has been created for, if any |

### invoices
|  Property Name | Description |
|  ------ | ------ |
| amount_due | Final amount due at this time for this invoice |
| application_fee | The fee in cents that will be applied to the invoice and transferred to the application owner's Stripe account when the invoice is paid |
| attempt_count | Number of payment attempts made for this invoice, from the perspective of the payment retry schedule |
| attempted | Whether an attempt has been made to pay the invoice |
| charge_id | ID of the latest charge generated for this invoice, if any |
| currency | Three-letter ISO currency code, in lowercase |
| customer_id | ID of the customer |
| description | An arbitrary string attached to the object |
| ending_balance | Ending customer balance after the invoice is frozen |
| forgiven | Whether the invoice has been forgiven. Forgiving an invoice instructs us to update the subscription status as if the invoice were successfully paid |
| paid | Whether payment was successfully collected for this invoice |
| receipt_number | This is the transaction number that appears on email receipts sent for this invoice |
| starting_balance | Starting customer balance before the invoice is frozen |
| statement_descriptor | Extra information about an invoice for the customer's credit card statement |
| subscription_id | The subscription that this invoice was prepared for, if any |
| subtotal | Total of all subscriptions, invoice items, and prorations on the invoice before any discount is applied |
| tax | The amount of tax included in the total, calculated from tax_percent and the subtotal. If no tax_percent is defined, this value will be null |
| tax_percent | This percentage of the subtotal has been added to the total amount of the invoice, including invoice line items and discounts |
| total | Total after discount |

### invoice_lines
|  Property Name | Description |
|  ------ | ------ |
| amount | The amount, in cents |
| currency | Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html)  |
| description | An arbitrary string attached to the object |
| discountable | If true, discounts will apply to this line item. Always false for prorations |
| proration | If true, this line item is a proration |
| quantity | The quantity of the subscription, if the line item is a subscription or a proration |
| invoice_id | The ID of the invoice to which this line belongs |
| period_start | Start of the line item's billing period |
| period_end | End of the line item's billing period |
| plan_id | The id of the Plan that this invoice_line belongs to |
| subscription_id | If id is prefixed with `sub_` then this is the line item's UUID, else it is the ID of The subscription that the invoice item pertains to, if any.  |
| type | A string identifying the type of the source of this line item, either an `InvoiceItem` or a `Subscription` |
| item_id | If id is prefixed with `ii_` then this is the line item's UUID, if any |

### payment_intents
| Property Name             | Description                                                  |
| ------------------------- | ------------------------------------------------------------ |
| amount                    | Amount intended to be collected by this PaymentIntent.       |
| amount_capturable         | Amount that can be captured from this PaymentIntent.         |
| amount_received           | Amount that was collected by this PaymentIntent.             |
| application_id            | ID of the Connect application that created the PaymentIntent. |
| application_fee_amount    | The amount of the application fee (if any) for the resulting payment. |
| canceled_at               | Time at which the PaymentIntent was canceled. Measured in seconds since the Unix epoch. |
| cancellation_reason       | Reason for cancellation of this PaymentIntent, either user-provided (`duplicate`, `fraudulent`, `requested_by_customer`, or `abandoned`) or generated by Stripe internally (`failed_invoice`, `void_invoice`, or `automatic`). |
| capture_method            | One of `automatic` (default) or `manual`. For more info refer [Stripe API docs](https://stripe.com/docs/api/payment_intents/object#payment_intent_object-capture_method) |
| confirmation_method       | One of `automatic` (default) or `manual`. For more info refer [Stripe API docs](https://stripe.com/docs/api/payment_intents/object#payment_intent_object-confirmation_method) |
| created                   | Time at which the object was created. Measured in seconds since the Unix epoch. |
| currency                  | Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. |
| customer_id               | ID of the Customer this PaymentIntent is for, if one exists. |
| description               | An arbitrary string attached to the object. Often useful for displaying to users. |
| invoice_id                | ID of the invoice that created this PaymentIntent, if it exists. |
| livemode                  | Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode. |
| on_behalf_of              | The account (if any) for which the funds of the PaymentIntent are intended. |
| payment_method_id         | ID of the payment method used in this PaymentIntent.         |
| receipt_email             | Email address that the receipt for the resulting payment will be sent to. |
| review_id                 | ID of the review associated with this PaymentIntent, if any. |
| statement_descriptor      | Extra information about a PaymentIntent. This will appear on your customer's statement when this PaymentIntent succeeds in creating a charge. |
| status                    | Status of this PaymentIntent, one of `requires_payment_method`, `requires_confirmation`, `requires_action`, `processing`, `requires_capture`, `canceled`, or `succeeded`. Read more about each PaymentIntent [status](https://stripe.com/docs/payments/payment-intents/status). |
| transfer_data_destination | The account (if any) the payment will be attributed to for tax reporting, and where funds from the payment will be transferred to upon payment success. |
| transfer_group            | A string that identifies the resulting payment as part of a group. See the PaymentIntents [use case for connected accounts](https://stripe.com/docs/payments/payment-intents/use-cases#connected-accounts) for details. |

### payment_methods
| Property Name     | Description                                                  |
| ----------------- | ------------------------------------------------------------ |
| billing_details_address_city | City tied to the PaymentMethod's billing details |
| billing_details_address_country | 2-letter country code tied to the PaymentMethod's billing details |
| billing_details_address_line1 | Address line 1 tied to the PaymentMethod's billing details |
| billing_details_address_line2 | Address line 2 tied to the PaymentMethod's billing details |
| billing_details_address_postal_code | ZIP or Postal code tied to the PaymentMethod's billing details |
| billing_details_address_state | State/Country/Province/Region tied to the PaymentMethod's billing details |
| billing_details_email | Email address tied to the PaymentMethod's billing details |
| billing_details_name | Name tied to the PaymentMethod's billing details  |
| billing_details_phone | Phone number tied to the PaymentMethod's billing details |
| created           | Time at which the object was created. Measured in seconds since the Unix epoch. |
| customer_id       | The ID of the Customer to which this PaymentMethod is saved. This will not be set when the PaymentMethod has not been saved to a Customer. |
| livemode          | Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode. |
| type              | The type of the PaymentMethod. An additional object is included on the PaymentMethod with a name matching this value. It contains additional information specific to the PaymentMethod type. |
| custom object | The additional details of the PaymentMethod as specified by the `type` property. (Please note this is a Dynamic Object, and may have multiple properties prefixed with the same key) |

### plans
|  Property Name | Description |
|  ------ | ------ |
| interval | One of day, week, month or year. The frequency with which a subscription should be billed |
| name | Unique identifier |
| amount | The amount in cents to be charged on the interval specified |
| currency | Three-letter ISO currency code, in lowercase |
| interval_count | The number of intervals (specified in the interval property) between subscription billings |
| trial_period_days | Default number of trial days when subscribing a customer to this plan using trial_from_plan=true |

### refunds
|  Property Name | Description |
|  ------ | ------ |
| amount | Amount, in cents |
| currency | Three-letter ISO currency code, in lowercase |
| balance_transaction_id | Balance transaction that describes the impact on your account balance |
| charge_id | ID of the charge that was refunded |
| receipt_number | This is the transaction number that appears on email receipts sent for this refund |
| reason | Reason for the refund |

### subscriptions
|  Property Name | Description |
|  ------ | ------ |
| application_fee_percent | This represents the percentage of the subscription invoice subtotal that will be transferred to the application owner's Stripe account |
| cancel_at_period_end | If the subscription has been canceled with the at_period_end flag set to true, cancel_at_period_end on the subscription will be true |
| customer_id | ID of the customer who owns the subscription |
| quantity | The quantity of the plan to which the customer should be subscribed |
| status | Possible values are trialing, active, past_due, canceled, or unpaid |
| tax_percent | If provided, each invoice created by this subscription will apply the tax rate, increasing the amount billed to the customer |

### transfer_reversals
|  Property Name | Description |
|  ------ | ------ |
| amount | Amount, in cents |
| currency | Three-letter ISO currency code, in lowercase |
| balance_transaction_id | Balance transaction that describes the impact on your account balance |
| transfer_id | ID of the transfer that was reversed |

### transfers
|  Property Name | Description |
|  ------ | ------ |
| amount | Amount in cents to be transferred |
| amount_reversed | Amount in cents reversed (can be less than the amount attribute on the transfer if a partial reversal was issued) |
| application_fee | application_fee |
| balance_transaction_id | Balance transaction that describes the impact of this transfer on your account balance |
| currency | Three-letter ISO currency code, in lowercase |
| description | An arbitrary string attached to the object |
| destination_id | ID of the Stripe account the transfer was sent to |
| destination_payment | If the destination is a Stripe account, this will be the ID of the payment that the destination account received for the transfer |
| reversed | Whether the transfer has been fully reversed. If the transfer is only partially reversed, this attribute will still be false |
| source_transaction | ID of the charge or payment that was used to fund the transfer. If null, the transfer was funded from the available balance |

## V2 Changelog
In September 2017, Segment will upgrade all Stripe sources to sync incrementally, using the [List Events](https://stripe.com/docs/api#list_events) endpoint to sync changes to Stripe objects. There are a few benefits to this approach…

  - **Faster sync times:** for larger accounts, we've seen performance improve by 10x
  - **Additional Object Properties:** Events provide additional metadata about objects, like their creation time and deletion time
  - **Reduced load on the Stripe API:** Our new Stripe source helps cut down load on our partner's API, and reduces unnecessary data transfer

### How It Works
1. The Stripe Source will run a full sync of all objects, using the `List All` endpoints for `Charges`, `Customers`, `Refunds`, etc.
2. After the first sync completes, the source will automatically switch into incremental mode.
  1. When the source is scheduled to run, it will query for all events since the last sync completed. An event can be an object (e.g. a customer) being `created`, `updated`, or `deleted`
  2. The Segment source will materialize the event stream into the latest state of the object. So the `charges` table will always reflect the latest `charge.updated` event.

### Changelog

**30-May-2019**

|  **Collection** | **Changes**  |
|  ------ | -------------------------------------- |
|  charges | **New Properties**<ul><li>payment_method_id</li><li>payment_intent_id</li></ul> |
|  invoice_lines   | ***Updated docs for collection*** |
|  payment_intents | ***New Collection*** |
|  payment_methods | ***New Collection*** |

|  **Collection** | **Changes**  |
|  ------ | -------------------------------------- |
|  accounts | *No Change - accounts cannot be synced incrementally* |
|  application_fee_refunds | **Deprecated properties** <ul><li> balance_transaction_id </li></ul> |
|  application_fees | **Deprecated properties** <ul><li>refund_ids</li></ul> |
|  balance_transaction_fee_details | *No Change* |
|  balance_transactions | **Deprecated properties** <ul><li>sourced_transfers</li></ul> |
|  bank_accounts | **Deprecated properties** <ul><li>currency</li></ul>**New properties**<ul><li>is_deleted</li></ul> |
|  cards | **New properties** <ul><li>customer_id</li><li>is_deleted</li></ul> |
|  charges | **Deprecated properties**<ul><li>receipt_number</li><li>dispute_id</li><li>tokenization_method</li></ul> |
|  coupons | *No Change* |
|  customers | **Deprecated properties**<ul><li>source_ids</li><li>subscription_ids</li><li>discount_id</li></ul>**New properties** <ul><li> is_deleted </li></ul> |
|  discounts | *No Change* |
|  disputes | *No Change* |
|  invoice_items | *No Change* |
|  invoice_lines | **Deprecated properties** <ul><li>metadata_*</li></ul> |
|  invoices | **Deprecated properties** <ul><li>line_ids</li><li>attempt_count</li><li>next_payment_attempt</li></ul> |
|  order_returns | **Deprecated properties**<ul><li>refund_id</li></ul> |
|  order_shipping_methods | *No Change* |
|  orders | **Deprecated properties**<ul><li>status_transitions_*</li></ul> |
|  plans | *No Change* |
|  products | *No Change* |
|  refunds | **Deprecated properties** <ul><li>refunds starting with `py_` </li></ul> |
|  skus | *No Change* |
|  subscriptions | *No Change* |
|  subscription_items | ***NEWCOLLECTION*** |
|  transfer_reversals | *No Change* |
|  transfers | **Deprecated Properties**<ul><li>reversal_ids</li></ul> |

## Adding Destinations
Currently, Warehouses are the only supported destination for object-cloud sources.
