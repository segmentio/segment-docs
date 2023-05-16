---
title: Analytics React Native Firebase Plugin
strat: react-native
---
Firebase is Google's platform for mobile apps. The Segment Firebase destination requires that you bundle the Firebase SDK with your project. The Segment-wrapped destination code then runs on the user's device, and sends its tracking calls to the Firebase API endpoints, and a copy to Segment for archiving.

Firebase’s destination plugin code is open source and available on GitHub. You can view it [here.](https://github.com/segment-integrations/analytics-swift-firebase)

## Adding the dependency

You need to install the `@segment/analytics-react-native-plugin-firebase` and its dependencies: `@react-native-firebase/app` and `@react-native-firebase/analytics`

Using NPM:
```bash
npm install --save @segment/analytics-react-native-plugin-firebase @react-native-firebase/app @react-native-firebase/analytics
```

Using Yarn:
```bash
yarn add @segment/analytics-react-native-plugin-firebase @react-native-firebase/app @react-native-firebase/analytics
```

Run `pod install` after the installation to autolink the Firebase SDK.

See [React Native Firebase](https://rnfirebase.io) and [React Native Firebase Analytics](https://rnfirebase.io/analytics/usage) for more details of Firebase packages.

> info "rnfirebase dependency"
> You will need to follow the [install guide](/docs/connections/sources/catalog/libraries/mobile/react-native/classic) for the rnfirebase dependency too. This may include adding the `GoogleService-Info.plist` and the `google-services.json` file.


## Using the Plugin in your App

Follow the [instructions for adding plugins](https://github.com/segmentio/analytics-react-native#adding-plugins) on the main Analytics client:

In your code where you initialize the analytics client call the `.add(plugin)` method with an `FirebasePlugin` instance. 

```ts
import { createClient } from '@segment/analytics-react-native';

import { FirebasePlugin } from '@segment/analytics-react-native-plugin-firebase';

const segmentClient = createClient({
  writeKey: 'SEGMENT_KEY'
});

segmentClient.add({ plugin: new FirebasePlugin() });
```
## Identify

When you call `identify` Segment will map to the corresponding Firebase Analytics calls:

- If there is a `userId` on your `identify` call, Segment triggers `setUserId` using the Firebase SDK
- If there are traits included, Segment will set user properties for each trait you include on the `identify` call

You can use these traits to create audiences and views to analyze your users' behavior.

**Note**: Google prohibits sending PII to Firebase unless ["robust notice" is given to your app users](https://firebase.google.com/policies/analytics/). For iOS apps, some Analytics features, such as audiences and campaign attribution, and some user properties, such as Age and Interests, require the [AdSupport framework](https://developer.apple.com/reference/adsupport) to be enabled.

Learn more about [Firebase's reporting dashboard here](https://support.google.com/firebase/answer/6317517?hl=en&ref_topic=6317489).

**Firebase has strict requirements for User Property names; they must:**

- Begin with a letter (not a number or symbol, including an underscore)
- Contain only alphanumeric characters and underscores
- Be no longer than 40 characters

User Property values must be fewer than 100 characters.

You are limited to 25 unique user properties per Firebase Console.

Firebase automatically collects [these user properties](https://support.google.com/firebase/answer/6317486).

## Track

When you call `track` Segment will log the event with Firebase. Firebase automatically tracks [the events listed here](https://support.google.com/firebase/answer/6317485) and it will still do so when bundling with Segment.

Firebase has a limit of 500 distinctly named events so it pays off to be [intentional in what you track](/docs/protocols/tracking-plan/best-practices/).

When you call `track`, Segment maps from the [Segment spec](/docs/connections/spec/) to those that match Firebase's spec. For anything that does not match, Segment will pass the event to Firebase as a custom event. Custom parameters cannot be seen directly in the Firebase Analytics dashboard but they can be used as filters in **Audiences**.

Like with user properties, Segment will perform the following transformations on both your event names and event parameters. Unlike user properties, you do not need to pre-define event parameters in your Firebase dashboard.

- Trims leading and trailing whitespace from property names
- Replaces spaces with underscores
- Trims property names to 40 characters (Android only)

Event parameter values must be fewer than 100 characters.

### Event Mappings

Segment adheres to Firebase's semantic event specification and maps the following Segment spec-matching events (left) to the corresponding Firebase events (right):

| Segment Event                                                                                | Firebase Event     |
| -------------------------------------------------------------------------------------------- | ------------------ |
| [Products Searched](/docs/connections/spec/ecommerce/v2/#products-searched)                  | `search`           |
| [Product List Viewed](/docs/connections/spec/ecommerce/v2/#product-list-viewed)              | `view_item_list`   |
| [Product Viewed](/docs/connections/spec/ecommerce/v2/#product-viewed)                        | `view_item`        |
| [Product Clicked](/docs/connections/spec/ecommerce/v2/#product-clicked)                      | `select_content`   |
| [Product Shared](/docs/connections/spec/ecommerce/v2/#product-shared)                        | `share`            |
| [Product Added](/docs/connections/spec/ecommerce/v2/#product-added)                          | `add_to_cart`      |
| [Product Added To Wish list](/docs/connections/spec/ecommerce/v2/#product-added-to-wishlist) | `add_to_wishlist`  |
| [Checkout Started](/docs/connections/spec/ecommerce/v2/#checkout-started)                    | `begin_checkout`   |
| [Promotion Viewed](/docs/connections/spec/ecommerce/v2/#promotion-viewed)                    | `present_offer`    |
| [Payment Info Entered](/docs/connections/spec/ecommerce/v2/#payment-info-entered)            | `add_payment_info` |
| [Order Completed](/docs/connections/spec/ecommerce/v2/#order-completed)                      | `purchase`         |
| [Order Refunded](/docs/connections/spec/ecommerce/v2/#order-refunded)                        | `purchase_refund`  |

### Property Mappings

Segment maps the followed Segment spec-matching properties (left) to the corresponding Firebase event parameters (right):

| Segment Property | Firebase Property | Accepted Value(s)            |
| ---------------- | ----------------- | ---------------------------- |
| `category`       | `item_category`   | (String) "kitchen supplies"  |
| `product_id`     | `item_id`         | (String) "p1234"             |
| `name`           | `item_name`       | (String) "Le Creuset pot"    |
| `price`          | `price`           | (double) 1.0                 |
| `quantity`       | `quantity`        | (long) 1                     |
| `query`          | `search_term`     | (String) "Le Creuset"        |
| `shipping`       | `shipping`        | (double) 2.0                 |
| `tax`            | `tax`             | (double) 0.5                 |
| `total`          | `value`           | (double) 3.99 or (long) 3.99 |
| `revenue`        | `value`           | (double) 3.99 or (long) 3.99 |
| `order_id`       | `transaction_id`  | (String) "o555636"           |
| `currency`       | `currency`        | (String) "USD"               |

## Screen

Segment will map Screen events to the [logScreenView](https://rnfirebase.io/reference/analytics#logScreenView) method. This will set the screen name and class the user is currently viewing.

### **Conversion Tracking and Adwords Conversions**

Firebase is Google's recommended method for reporting conversions to Adwords. To use Firebase, track the conversion events as you normally would with Segment and Segment will send them through to Firebase.

### Troubleshooting

Firebase has great logging. If you are having any issues, you can enable debug mode as outlined [here](https://firebase.google.com/docs/analytics/debugview).
