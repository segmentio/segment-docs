---
title: 'Typewriter v7'
hidden: true
---

> warning ""
> Segment does not actively maintain Typewriter v7. Typewriter is available on [Github](https://github.com/segmentio/typewriter/tree/v7.4.1){:target="_blank”} under the MIT license for the open-source community to fork and contribute.

## Prerequisites

Typewriter is built with [Node.js](https://nodejs.org/en/), and requires `node@8.x` or later, and `npm@5.2.x` or later.

Run the following commands to verify your installed versions of Node and NPM:

```sh
$ node --version
v10.15.3

$ npm --version
6.9.0

$ npx --version
6.9.0
```

If you don't have these, [install `node`](https://nodejs.org/en/download/package-manager). Installing `node` also installs the`npm` and `npx` package managers . If you're on macOS, you can install it with [Homebrew](https://brew.sh/):

```sh
$ brew install node
```

Once you've installed Node and NPM, run the `--version` commands again to verify that they were installed correctly.

## iOS Quickstart

To get started using Typewriter with iOS:
1. Make sure you have `node` installed using the instructions in the [prerequisites](#prerequisites) above.
2. Install `analytics-ios` in your app. You just need to complete [`Step 1: Install the SDK`](/docs/connections/sources/catalog/libraries/mobile/ios/quickstart/#step-2-install-the-sdk) from the [`analytics-ios` Quickstart Guide](/docs/connections/sources/catalog/libraries/mobile/ios/quickstart).
3. Run `npx typewriter@7 init` to use the Typewriter quickstart wizard that generates a [`typewriter.yml`](#configuration-reference) configuration along with your first Typewriter client. When you run the command, it creates a `typewriter.yml` file in your repo. For more information on the format of this file, see the [Typewriter Configuration Reference](#configuration-reference).

> info "Regenerate your Typewriter client"
> Run `npx typewriter` to regenerate your Typewriter client. You must do this each time you update your Tracking Plan.

You can now import your new Typewriter client into your project using XCode. If you place your generated files into a folder in your project, import the project as a group not a folder reference.

To use your Typewriter client in an Objective-C application:

```objc
// Import your auto-generated Typewriter client:
#import "SEGTypewriterAnalytics.h"

// Issue your first Typewriter track call!
[SEGTypewriterAnalytics orderCompletedWithOrderID: "ck-f306fe0e-cc21-445a-9caa-08245a9aa52c" total: @39.99];
```

To use your Typewriter client in a Swift application, add a [Bridging Header](https://developer.apple.com/documentation/swift/imported_c_and_objective-c_apis/importing_objective-c_into_swift) like the example below:

```objc
// TypewriterSwiftExample-Bridging-Header.h
//
// Make sure to include all generated headers from your Typewriter client:
#import "Analytics/SEGTypewriterAnalytics.h"
#import "Analytics/SEGGarage.h"
#import "Analytics/SEGObjectItem.h"
#import "Analytics/SEGOccupantsItem.h"
#import "Analytics/SEGSubterraneanLab.h"
#import "Analytics/SEGTunnel.h"
#import "Analytics/SEGUniverse.h"
#import "Analytics/SEGUniverseCharactersItemItem.h"
```

Then, you can use your Typewriter client in Swift:

```objc
// Issue your first Typewriter track call!
SEGTypewriterAnalytics.orderCompleted(
  orderID: "ck-f306fe0e-cc21-445a-9caa-08245a9aa52c",
  total: 39.99
)
```

## Android Quickstart

To get started using Typewriter with Android:
1. Make sure you have `node` installed using the instructions in the [prerequisites](#prerequisites) above.
2. Install `analytics-android` in your app, and configure the singleton analytics instance by following the first three steps in in the [Android Quickstart](/docs/connections/sources/catalog/libraries/mobile/android/quickstart/#step-2-install-the-library).
3. Run `npx typewriter@7 init` to use the Typewriter quickstart wizard that generates a [`typewriter.yml`](#configuration-reference) configuration along with your first Typewriter client. When you run the command, it creates a `typewriter.yml` file in your repo. For more information on the format of this file, see the [Typewriter Configuration Reference](#configuration-reference).

> info "Regenerate your Typewriter client"
> Run `npx typewriter` to regenerate your Typewriter client. You must do this each time you update your Tracking Plan.

You can now use your Typewriter client in your Android Java application:

```java
// Import your auto-generated Typewriter client:
import com.segment.generated.*

// Issue your first Typewriter track call!
TypewriterAnalytics.with(this).orderCompleted(
  OrderCompleted.Builder()
    .orderID("ck-f306fe0e-cc21-445a-9caa-08245a9aa52c")
    .total(39.99)
    .build()
);
```

## Adding Events

To update or add a new event to a Typewriter client, first apply your changes to your Tracking Plan. Then run the following:

```sh
# Run this in the directory with your repo's `typewriter.yml`.
$ npx typewriter@7
```

## API Token Configuration

You must be a Workspace Owner to create Segment API tokens. For more information about roles in the Segment app, see the [Roles documentation](/docs/segment-app/iam/roles/). 

> info ""
> Typewriter7 only uses the Config API. 


To create an API token:
1. Click on the **Tokens** tab on the [Access Management](https://app.segment.com/goto-my-workspace/settings/access-management){:target="_blank"} page and click **Create Token**.
2. Select Segment's Config API. __If you don't see this option, reach out to friends@segment.com for assistance.__
3. Add a description for the token and assign access. If you choose *Workspace Member*, you only need to select **Tracking Plan Read-Only** for the Resource Role, as Typewriter only needs the *Tracking Plan Read-Only* role.
4. Click **Create**.

Typewriter looks for an API token in three ways, in the following order:
1. If a token is piped through, it will use that token. For example, `echo $TW_TOKEN | typewriter build`.
2. Typewriter executes a token script from the `typewriter.yml`. See [Token Script](/docs/protocols/apis-and-extensions/typewriter/#token-script){:target="_blank"} for more information.
3. Typewriter reads the contents of the `~/.typewriter` file.

The quickstart wizard prompts you for an API token and stores it in `~/.typewriter` for you.

Segment recommends you use a [Token Script](/docs/protocols/apis-and-extensions/typewriter/#token-script) to share an API token with your team. When you use a token script, you can supply your API token as an environment variable (`echo $TYPEWRITER_TOKEN`), from an `.env.` file (`source .env; echo $TYPEWRITER_TOKEN`) or using any other CLI tool for providing secrets.

Segment also recommends you to pipe through your API Token as this allows you to keep your token secret, but it also allows you to share it across your team.
