---
title: Epsilon (Actions) Destination
---

{% include content/plan-grid.md name="actions" %}

[Epsilon](https://www.epsilon.com){:target="_blank"} is a global advertising and marketing technology company that provides data-driven marketing solutions, helping brands create personalized customer experiences across all channels.

This destination is maintained by Epsilon. For any issues with the destination, [contact their Support team](mailto:support@epsilon.com).

## Getting started

1. From your workspace's [Destination catalog page](https://app.segment.com/goto-my-workspace/destinations/catalog){:target="_blank"} search for "Epsilon".
2. Select Epsilon (Actions) and click **Add Destination**.
3. Select an existing Source to connect to Epsilon (Actions).
4. Contact Epsilon support to obtain your **Company ID** and **Company Magic** credentials.
5. Enter the **Company ID** and **Company Magic** in the Epsilon destination settings in Segment.

{% include components/actions-fields.html %}

## Supported Events

The Epsilon destination supports the following predefined event types:

### Mobile App Events
- **First App Open/App Download** - Tracks when a user first opens or downloads your mobile app
- **App Open** - Tracks subsequent app opens
- **Sign in/Create Account** - Tracks user authentication events

### E-commerce Events
- **Shop Department View** - Tracks when users view product departments
- **Shop Category View** - Tracks when users view product categories  
- **Shop Subcategory View** - Tracks when users view product subcategories
- **Shop Product View** - Tracks individual product views
- **Add to Favorites** - Tracks when users add products to favorites
- **Add to Saved List** - Tracks when users add products to wishlists
- **Add to Cart** - Tracks when users add products to their cart
- **Transaction Complete** - Tracks completed purchases

### Custom Events
- **Custom Event** - Allows you to send any custom event with flexible field mapping

## Event Data Structure

All events sent to Epsilon include:

### Standard Fields
- **Company ID** (`dtm_cid`) - Your Epsilon company identifier
- **Company Magic** (`dtm_cmagic`) - Your Epsilon authentication token
- **Form ID** (`dtm_fid`) - Used to identify app visits vs conversions
- **App ID** - Mobile app namespace
- **App Version** - Version of your mobile app
- **Device Type** - iOS or Android

### User Identifiers
- **Device ID** - Mobile device identifier (IDFV or Google App Set ID)
- **Advertising ID** - Mobile advertising identifier (IDFA or Google Ad ID)
- **User Agent** - Device user agent string
- **IP Address** - User's IP address
- **Email Hash** - Hashed email address (automatically hashed by Segment)
- **Mobile Hash** - Hashed phone number (automatically hashed by Segment)
- **User ID** - Your internal user identifier

### Product Information (for applicable events)
- **Department** - Product department
- **Category** - Product category
- **Sub Category** - Product subcategory
- **Product ID** - Unique product identifier
- **Brand** - Product brand
- **UPC** - Universal Product Code
- **MPN** - Manufacturer Part Number

### Transaction Information (for conversion events)
- **Transaction ID** - Unique order identifier
- **Conversion Value** - Total purchase amount (excluding tax/shipping)
- **Currency** - ISO 4217 currency code (e.g., USD, EUR)
- **Order Type** - Type of order (Delivery, Pickup, etc.)
- **Store Location** - For pickup orders, the store location
- **Items** - Array of purchased items with quantities, prices, and discounts

## Data Processing

### Email and Phone Hashing
Segment automatically hashes email addresses and phone numbers using SHA-256 before sending them to Epsilon. You can provide either hashed or unhashed values - Segment will ensure proper hashing.

### Device-Specific Mapping
The destination automatically maps device identifiers based on the device type:
- **iOS devices**: Uses `idfa` for device ID and `idfv` for vendor ID
- **Android devices**: Uses `google_play_id` for device ID and `google_app_set_id` for vendor ID

### Custom Properties
For custom events, you can include additional properties that will be passed through to Epsilon alongside the standard fields.

## Preset Mappings

The destination includes preset mappings for common e-commerce events:

| Segment Event | Epsilon Event | Description |
|---------------|---------------|-------------|
| Application Installed | firstOpen | First app open/download |
| Application Opened | appOpen | Subsequent app opens |
| Signed In | signIn | User authentication |
| Product Added To Wishlist | addSavedList | Add to wishlist |
| Product Added | cart | Add to cart |
| Order Completed | conversion | Purchase completion |

These presets automatically map the appropriate Segment event properties to Epsilon's expected field structure.