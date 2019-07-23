## **Getting Started**

Branch is a bundled destination. You will need to add their destination to your SDK.

First you will need to [sign up for a free Branch account](http://branch.io/signup?bmp=segment) and follow the steps on their Dashboard to complete setup and retrieve your API Key.

Next you will have to set up deep link routing and enable your app to create links, the guides for which are below

# iOS

**Note that the below code snippets are in objective-c. The [Swift setup guide](https://docs.branch.io/apps/segment-ios/#step-2-add-some-code-to-your-appdelegate), as well as setup guides for advanced product features can all be found in [Branch’s Developer Portal](https://dev.branch.io/?bmp=segment).  

Also, when referencing Branch’s quickstart guide within the dev portal, don’t worry about installing the SDK files.  Segment has already taken care of that for you.  Skip down to the section entitled "PList Configuration".


## 1 - Configure the SDK

### PList configuration

#### Add your Branch key

Your app key can be retrieved on the [Settings](https://dashboard.branch.io/#/settings) page of your dashboard. Now you need to add it to `YourProject-Info.plist` (`Info.plist` for Swift).

1. In the plist file, mouse over "Information Property List" which is the root item under the Key column.

2. After about half a second, you will see a "+" sign appear. Click it.

3. In the newly added row, fill in `branch_key` for its key, leave type as String, and enter your app key obtained in above steps in its value column.

4. Save the plist file.

#### Configure for URI deep linking

To set up your URI Scheme, you’ll need to open your project in XCode and complete the following.

1. Click on YourProject-Info.plist on the left (or in Swift, Info.plist).

2. Find URL Types and click the right arrow. (If it doesn’t exist, right click anywhere and choose "Add Row". Scroll down and choose URL Types)

3. Add `myapp`, where *myapp* is a unique string for your app, as an item in URL Schemes as below:

![image alt text](images/image_4.png)

#### Configure for Universal Links

Configuring your app for Branch’s Universal Links is very simple. At a high level, you just need to go in and add in the selected `Associated Domains` to your Xcode project.

**Step 1.** Enable Associated Domains in Xcode

First, double check that provisioning profiles in your app belong to the same team that you are going to use throughout the Universal Link configuration process with Branch. Using provisioning profiles from a different team will cause Universal Links to fail and fall back to normal Branch links. Then go to the `Capabilities` tab of your project file.

Scroll down and enable `Associated Domains` so that the accordion expands.

![image alt text](images/image_1.png)

If you see an error like this, make sure:

* that you have the right team selected

* your Bundle Identifier of your Xcode project matches the one used to register the App Identifier

**Step 2:** Add in your Branch link domains

In the `Domains` section, add the appropriate domain tags for `bnc.lt` as well as your `white label domain` if you use one. You must prefix it with `applinks:`. If you’re just using `bnc.lt` for all of your Branch links, you only need to add a single domain:

* `applinks:bnc.lt`

![image alt text](images/image_2.png)

**Note: If you encounter any issues, please follow the [full instructions here](https://docs.branch.io/deep-linking/universal-links/#enable-associated-domains-in-xcode).**

### Starting a Branch Session
The Branch session starts every single time your app opens up, and checks if the user came from a link. You register a callback method here that will return any deep link parameters upon link click. Please note that the callback function is called 100% of the time, even when the network is out.

We also bundle in a [bunch of other stuff](https://docs.branch.io/deep-linking/routing/#branch-added-parameters) that you might find useful.

### Initialize SDK And Register Deep Link Routing Function

There are a few pieces of code that must be in place. First, open your project’s **AppDelegate.m** (or **AppDelegate.Swift**) file.

* Add `#import "Branch/Branch.h` at the top of the file (Objective-C only)

* Find the line which starts the method:

```objective-c
(BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:
```

and paste the following piece of code within:

```objective-c
[[Branch getInstance] initSessionWithLaunchOptions:launchOptions andRegisterDeepLinkHandler:^(NSDictionary * _Nonnull params, NSError * _Nullable error) {
// do stuff with deep link data (nav to page, display content, etc)
NSLog(@"%@", params);
}];
```

* You will also need to add the following as a separate method:

```objective-c
(BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
// handler for URI Schemes (depreciated in iOS 9.2+, but still used by some apps)
[[Branch getInstance] application:app openURL:url options:options];
return YES;
}
```

**NOTE** If you are seeing a "Branch.h file not found" error but you’ve imported the SDK, or it’s breaking during compiling–and you’re **using Xcode 6.3 or newer** – [click here](https://support.branch.io/support/solutions/articles/6000109874-xcode-error-branch-not-found).

### Handle Deep Link

This method is necessary to receive a Branch parameter when the URI scheme is called and the app open immediately. It will automatically call the **Deep Link Handler** registered above:

```objective-c
(BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:NSString *)sourceApplication annotation:(id)annotation {
    // pass the url to the handle deep link call
    [[Branch getInstance] handleDeepLink:url];

    // do other deep link routing for the Facebook SDK, Pinterest SDK, etc
    return YES;
}
```

### Continue User Activity

Additionally, in iOS9, if you list content in Spotlight with Branch, you’ll want to receive those parameters in this App Delegate callback.

```objective-c
(BOOL)application:(UIApplication *)application
continueUserActivity:(NSUserActivity *)userActivity
 restorationHandler:(void (^)(NSArray *restorableObjects))restorationHandler {
    BOOL handledByBranch = [[Branch getInstance] continueUserActivity:userActivity];
    return handledByBranch;
}
```
### Advanced functionality

#### Branch-provided data parameters in callback
Previously, Branch did not return any information to the app if `initSession` was called but the user hadn’t clicked on a link. Now Branch returns explicit parameters every time. Here is a list, and a description of what each represents.

* `~` denotes analytics

* `+` denotes information added by Branch

* (for the curious, `$` denotes reserved keywords used for controlling how the Branch service behaves)

| Parameter | Meaning
| --- | ---
| ~channel | The channel on which the link was shared, specified at link creation time
| ~feature | The feature, such as `invite` or `share`, specified at link creation time
| ~tags | Any tags, specified at link creation time
| ~campaign | The campaign the link is associated with, specified at link creation time
| ~stage | The stage, specified at link creation time
| ~creation_source | Where the link was created (‘API’, ‘Dashboard’, ‘SDK’, ‘iOS SDK’, ‘Android SDK’, or ‘Web SDK’)
| +match_guaranteed | True or false as to whether the match was made with 100% accuracy
| +referrer | The referrer for the link click, if a link was clicked
| +phone_number | The phone number of the user, if the user texted himself/herself the app
| +is\_first\_session | Denotes whether this is the first session (install) or any other session (open)
| +clicked\_branch\_link | Denotes whether or not the user clicked a Branch link that triggered this session
| +click_timestamp | Epoch timestamp of when the click occurred


#### Retrieve deep link params after initialization

You can retrieve the deep link data at any time from the Branch singleton by calling one of the below methods.

##### Get First Referring Params

This is the latest set of deep link data from the most recent link that was clicked. If you minimize the app and reopen it, the session will be cleared and so will this data.

```objective-c
NSDictionary *params = [[Branch getInstance] getLatestReferringParams];
```

##### Get first referring params

These are the first set of deep link data the ever referred the user. Once it’s been set for a given user, it can never be updated. This is useful for referral programs.

```objective-c
NSDictionary *params = [[Branch getInstance] getFirstReferringParams];
```



## 2 - Setup deep linking

Deep linking is an incredibly important part of building your app, and essential for delivering a high quality user experience. When a user clicks a link, you should take them to the exact thing they clicked on. Here’s how to do it.

### Create your deep link 

`BranchUniversalObject` is the best way of tracking and sharing content with Branch. It provides convenient methods for sharing, deep linking, and tracking how often that content is viewed. This information is then used to provide you with powerful content analytics. 

Below is how to create your own Branch Links. In order to share these links, we’ve built a *native share sheet for Android* and implemented a simple way to use *UIActivityViewController* on *iOS*. Check out the section on [content sharing](https://dev.branch.io/recipes/content_sharing/ios).

```objective-c
#import "BranchUniversalObject.h"
#import "BranchLinkProperties.h"
```

First create the object that you’d like to link to:

```objective-c
BranchUniversalObject *branchUniversalObject = [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];
branchUniversalObject.title = @"My Content Title";
branchUniversalObject.contentDescription = @"My Content Description";
branchUniversalObject.imageUrl = @"https://example.com/mycontent-12345.png";
[branchUniversalObject addMetadataKey:@"property1" value:@"blue"];
[branchUniversalObject addMetadataKey:@"property2" value:@"red"];
```

Then define the properties of the link you’d like to create.

```
BranchLinkProperties *linkProperties = [[BranchLinkProperties alloc] init];
linkProperties.feature = @"sharing";
linkProperties.channel = @"facebook";
[linkProperties addControlParam:@"$desktop_url" 
withValue:@"http://example.com/home"];
[linkProperties addControlParam:@"$ios_url" 
withValue:@"http://example.com/ios"];
```

Lastly, create the link by referencing the universal object.

```objective-c
[branchUniversalObject getShortUrlWithLinkProperties:linkProperties andCallback:^(NSString *url, NSError *error) {
    if (!error) {
        NSLog(@"success getting url! %@", url);
    }
}];
```

### Alternate 1: Easy deep link routing

Branch will handle all the deep link routing for you if you leverage the automatic deeplinking functionality described below. Here’s how to build on it:

#### Make your UIViewController a delegate for BranchDeepLinkingController

The work in this section will take place in the view controller that you want to appear when a user clicks a link. For example, this could be a view to show a product.

##### Import the proper header

In the view controller that will display on link click, first import `Branch.h`.

```objective-c
import "Branch.h"
```

##### Register for the delegate

Make your view controller conform to the delegate `BranchDeepLinkingController`.

```objective-c
@interface ExampleDeepLinkingController : UIViewController <BranchDeepLinkingController>
```

##### Configure your view on load
Receive the delegate method that will be called when the view controller is loaded from a link click.

```objective-c
@synthesize deepLinkingCompletionDelegate;
- (void)configureControlWithData:(NSDictionary *)data {
  NSString *pictureUrl = data[@"product_picture"];

  // show the picture
  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
    NSData *imageData = [NSData dataWithContentsOfURL:[NSURL URLWithString:pictureUrl]];
    UIImage *image = [UIImage imageWithData:imageData];
    dispatch_async(dispatch_get_main_queue(), ^{
      self.productImageView.image = image;
    });
  });
}
```

##### Add a close button

Since the view controller is displayed modally, you should add a close button that let’s the user minimize to continue the remainder of your flow.

```objective-c
(IBAction)closePressed {
    [self.deepLinkingCompletionDelegate deepLinkingControllerCompleted];
}
```

#### Register your UIViewController for a specific key

Lastly, you need to tell Branch which view controller you will use and which key to respond to. In this case we’re using `product_picture` as above.

**Note**: If you don’t know what this key is, see [Creating Links](https://dev.branch.io/recipes/quickstart_guide/ios/#creating-links)

```objective-c
(BOOL)application:(UIApplication *)application
    didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

  Branch *branch = [Branch getInstance];

  ExampleDeepLinkingController *controller = [[UIStoryboard storyboardWithName:@"Main"
                                                                          bundle:[NSBundle mainBundle]]
                                                instantiateViewControllerWithIdentifier:@"DeepLinkingController"];

  [branch registerDeepLinkController:controller forKey:@"product_picture"];
  [branch initSessionWithLaunchOptions:launchOptions automaticallyDisplayDeepLinkController:YES];


  **return** YES;
}
```

#### Where to define your deep link keys
You can define the deep link metadata in the `Branch Universal Object` that you’ll create before creating a deep link.

```objective-c
BranchUniversalObject *branchUniversalObject = [[BranchUniversalObject alloc] initWithCanonicalIdentifier:@"item/12345"];
branchUniversalObject.title = @"My Content Title";
branchUniversalObject.contentDescription = @"My Content Description";
branchUniversalObject.imageUrl = @"https://example.com/mycontent-12345.png";

// Add the custom deep link keys and values as metadata
[branchUniversalObject addMetadataKey:@"product_picture" value:@"12345"];
[branchUniversalObject addMetadataKey:@"user_id" value:@"6789"];
```

### Alternate 2: Handle routing yourself in the Branch callback

This section will describe a routing example in an abstract way. In case you want the simple version, Branch can handle routing for you automatically. Just check out the section on [simplified deep link routing](https://dev.branch.io/recipes/setup_deep_linking/ios).

Inside of the deepLinkHandler, you will want to examine the params dictionary to determine whether the user clicked on a link to content. Below is an example assuming that the links correspond to pictures.

```objective-c
(BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *****)launchOptions {

  // initialize the session, setup a deep link handler
  [[Branch getInstance] initSessionWithLaunchOptions:launchOptions
                          andRegisterDeepLinkHandler:^(NSDictionary *****params, NSError *****error) {

    // start setting up the view controller hierarchy
    UINavigationController *navC = (UINavigationController *)self.window.rootViewController;
    UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"Main" bundle:nil];
    UIViewController *nextVC;

    // If the key 'pictureId' is present in the deep link dictionary
    // then load the picture screen with the appropriate picture
    NSString *pictureId = [params objectForKey:@"pictureId"];
    if (pictureId) {
      nextVC = [storyboard instantiateViewControllerWithIdentifier:@"PicVC"];
      [nextVC setNextPictureId:pictureId];
    } else {
      nextVC = [storyboard instantiateViewControllerWithIdentifier:@"MainVC"];
    }

    // navigate!
    [navC setViewControllers:@[nextVC] animated:YES];
  }];

  return YES;
}
```

### Supporting existing routes

You spent a bunch of time already setting up deeplink paths before you heard of Branch and now you want the Branch links to leverage them? No problem at all. You can either set `$deeplink_path`, `$ios_deeplink_path` or `$android_deeplink_path` to the URI path you’d like us to call.

**Note that Universal Links and Spotlight on iOS do not support URI paths**

All of the examples below will cause Branch to trigger `myapp://content/1234:`

#### Dynamic link control

If you’re [creating links dynamically](https://dev.branch.io/overviews/link_creation_guide/#appending-query-parameters), you simply need to append the parameters. For example:

`"https://bnc.lt/a/key_live_jbgnjxvlhSb6PGH23BhO4hiflcp3y7ky?$deeplink_path=content%2F1234"`

#### SDK/API link control

```objective-c
BranchLinkProperties *linkProperties = [[BranchLinkProperties alloc] init];
linkProperties.feature = @"sharing";
linkProperties.channel = @"facebook";
[linkProperties addControlParam:@"$deeplink_path" withValue:@"content/1234"];
```

#### Dashboard link control

You can also control it for individual marketing links by inserting the keys and values into the deep link data section.

![image alt text](images/image_3.png)

<br>
****
<br>

# Android
## **Getting Started**


First you will have to set up deep link routing and enable your app to create links, the guide for which is below.  You can also visit [Branch’s Developer Portal](https://dev.branch.io/?bmp=segment) for advanced deep link features, integration customizations, and API reference guides.  

If you referencing Branch’s quickstart guide within the dev portal, don’t worry about installing the SDK files.  Segment has already taken care of that for you.  Skip down to the section entitled "Manifest configuration".

## 1 - Configure the SDK

### Manifest configuration

#### Step 1: Add your Branch key

Your Branch Key can be retrieved on the [Settings](https://dashboard.branch.io/#/settings) page of the dashboard. Now you need to add it to your project workspace.

Navigate to AndroidManifest.xml and add the following `<meta-data>` tags:

```java
<application>
    <!-- Other existing entries -->

    <!-- Set to true to use Branch_Test_Key -->
    <meta-data android:name="io.branch.sdk.TestMode" android:value="true" />
    <meta-data android:name="io.branch.sdk.BranchKey" android:value="key_live_abc123" />
    <meta-data android:name="io.branch.sdk.BranchKey.test" android:value="key_test_abc123" />

</application>
```

#### Step 2: Configure for deep linking

Find the `Activity` you want to open up when a link is clicked. This is typically your `SplashActivity` or a `BaseActivity` that all other activities inherit from. Inside your `AndroidManifest.xml` where the `Activity` is defined, do the following:

1. Copy in the intent filter as seen below with VIEW/DEFAULT/BROWSABLE in it.

2. Change *yourapp* under `android:scheme` to the URI scheme you’ve registered with us.

```java
<activity
  android:name="com.yourapp.SplashActivity"
  android:label="@string/app_name" >
  <intent-filter>
    <action android:name="android.intent.action.MAIN" />
    <category android:name="android.intent.category.LAUNCHER" />
  </intent-filter>

  <!-- Add this intent filter below, and change yourapp to your app name -->
  <intent-filter>
    <data android:scheme="yourapp" android:host="open" />
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
  </intent-filter>
</activity>
```

#### Step 3: Enable Auto Session Management - Custom Application Class

If you already have an Application class, then create a Branch instance in your `Application#onCreate()` method. If you don’t know what a custom application class is, you probably don’t have one, so skip this Step 3 and use the one below.

```java
public void onCreate() {
    super.onCreate();
    Branch.getAutoInstance(this);
}
```

#### Step 3 Alternative: Enable Auto Session Management - No Application Class

If you don’t have a custom application class, the last step is to register our `Application` class. The final step in setting up the Branch SDK is as follows:

```java
<application
    android:name="io.branch.referral.BranchApp">
```

Note: Auto session tracking is only available for `minSdkVersion` 14 or above.

**What if I support pre-15 Android?**

If you need to support pre-15, please see Branch's section about [session management](https://docs.branch.io/apps/android/#pre-android-15-support).

### Starting a Branch Session

The Branch session starts every single time your app opens up, and checks if the user came from a link. You register a callback method here that will return any deep link parameters upon link click. Please note that the callback function is called 100% of the time, even when the network is out.

We also bundle in a [bunch of other stuff](https://dev.branch.io/recipes/add_the_sdk/android/#branch-provided-data-parameters-in-callback) that you might find useful.

### Initialize SDK And Register Deep Link Routing Function

Open up your **splash activity** (or the activity you registered the intent for above), then add the onStart lifecycle method:

```java
@Override
public void onStart() {
    super.onStart();
    // Lifecycle callback method
}
```

Initialize the session and register your deep link router. Take note of how the instance is retrieved. If you are **not** using automatic session management, then you will need to use `getInstance(Context context)`.

```java
Branch branch = Branch.getInstance();

// ONLY use the line below IF you ARE NOT using automatic session management.*
// Branch branch = Branch.getInstance(getApplicationContext());

branch.initSession(new Branch.BranchReferralInitListener(){
    @Override
    public void onInitFinished(JSONObject referringParams, BranchError error) {
        if (error == null) {
            // params are the deep linked params associated with the link that the user clicked -> was re-directed to this app*
            // params will be empty if no data found
            // ... insert custom logic here ...
        } else {
            Log.i("MyApp", error.getMessage());
        }
    }
}, this.getIntent().getData(), this);
```

**NOTE** if you’re calling this inside a fragment, please use 'getActivity()' instead of passing in `this`. Also, `this.getIntent().getData()` refers to the data associated with an incoming intent.

Next, you’ll need to hook into the `onNewIntent` method specified inside the Activity lifecycle and set the intent. This is required for conformity with Facebook’s AppLinks.

```java
@Override
public voidonNewIntent(Intent intent) {
    this.setIntent(intent);
}
```
### Advanced functionality

#### Branch-provided data parameters in callback
Previously, Branch did not return any information to the app if `initSession` was called but the user hadn’t clicked on a link. Now Branch returns explicit parameters every time. Here is a list, and a description of what each represents.

* `~` denotes analytics

* `+` denotes information added by Branch

* (for the curious, `$` denotes reserved keywords used for controlling how the Branch service behaves)

| Parameter | Meaning
| --- | ---
| ~channel | The channel on which the link was shared, specified at link creation time
| ~feature | The feature, such as `invite` or `share`, specified at link creation time
| ~tags | Any tags, specified at link creation time
| ~campaign | The campaign the link is associated with, specified at link creation time
| ~stage | The stage, specified at link creation time
| ~creation_source | Where the link was created (‘API’, ‘Dashboard’, ‘SDK’, ‘iOS SDK’, ‘Android SDK’, or ‘Web SDK’)
| +match_guaranteed | True or false as to whether the match was made with 100% accuracy
| +referrer | The referrer for the link click, if a link was clicked
| +phone_number | The phone number of the user, if the user texted himself/herself the app
| +is\_first\_session | Denotes whether this is the first session (install) or any other session (open)
| +clicked\_branch\_link | Denotes whether or not the user clicked a Branch link that triggered this session
| +click_timestamp | Epoch timestamp of when the click occurred

#### Retrieve deep link params after initialization
You can retrieve the deep link data at any time from the Branch singleton by calling one of the below methods.

##### [Get First Referring Params](https://docs.branch.io/deep-linking/routing/#get-first-session-referring-params)

This is the latest set of deep link data from the most recent link that was clicked. If you minimize the app and reopen it, the session will be cleared and so will this data.

```java
JSONObject sessionParams = Branch.getInstance().getLatestReferringParams();
```

##### Get first referring params

These are the first set of deep link data the ever referred the user. Once it’s been set for a given user, it can never be updated. This is useful for referral programs.

```java
JSONObject installParams = Branch.getInstance().getFirstReferringParams();
```


#### Initialization to support Android pre-14

If you want to support pre-14 this method, you should include Branch SDK methods in both `onStart()` and `onStop()`. If you don’t close the Branch session, you’ll see strange behaviors like deep link parameters not showing up after clicking a link the second time. Branch must know when the app opens or closes to properly handle the deep link parameters retrieval.

##### Init Session

Please add this for every Activity for pre-14 support.

```java
@Override
protected void onStart() {
    super.onStart();
    Branch.getInstance(getApplicationContext()).initSession();
}
```

##### Close session

Please add this for every Activity for pre-14 support.

```java
@Override
protected void onStop() {
    super.onStop();
    branch.closeSession();
}
```

**Support for 100% Matching
Branch can leverage the install referrer broadcast to guarantee 100% accuracy of deeplinking through install when Google Play delivers it in time. All you need to do is register Branch for the install referrer broadcast in the **AndroidManifest.xml**.

**(Common)**

```java
<receiver android:name="io.branch.referral.InstallListener" android:exported="true">
  <intent-filter>
    <action android:name="com.android.vending.INSTALL_REFERRER" />
  </intent-filter>
</receiver>
```

**(Uncommon)**

```java
<receiver android:name="com.myapp.CustomInstallListener" android:exported="true">
  <intent-filter>
    <action android:name="com.android.vending.INSTALL_REFERRER" />
  </intent-filter>
</receiver>
```


<br>

## 2 - Setup deep linking

Deep linking is an incredibly important part of building your app, and essential for delivering a high quality user experience. When a user clicks a link, you should take them to the exact thing they clicked on. Here’s how to do it.

### Create your deep link

`BranchUniversalObject` is the best way of tracking and sharing content with Branch. It provides convenient methods for sharing, deeplinking, and tracking how often that content is viewed. This information is then used to provide you with powerful content analytics.

Below is how to create your own Branch Links. In order to share these links, we’ve built a *native share sheet for Android* and implemented a simple way to use *UIActivityViewController on iOS*. Check out the section on **[content sharin**g](https://dev.branch.io/recipes/content_sharing/android).

First create the object that you’d like to link to:

```java
BranchUniversalObject branchUniversalObject = new BranchUniversalObject()
                .setCanonicalIdentifier("item/12345")
                .setTitle("My Content Title")
                .setContentDescription("My Content Description")
                .setContentImageUrl("https://example.com/mycontent-12345.png")
                .setContentIndexingMode(BranchUniversalObject.CONTENT_INDEX_MODE.PUBLIC)
                .addContentMetadata("property1", "blue")
                .addContentMetadata("property2", "red");

Then define the properties of the link you’d like to create.

LinkProperties linkProperties = new LinkProperties()
               .setChannel("facebook")
               .setFeature("sharing")
               .addControlParameter("$desktop_url", "http://example.com/home")
               .addControlParameter("$ios_url", "http://example.com/ios");
```

Lastly, create the link by referencing the universal object.

```java
branchUniversalObject.generateShortUrl(this, linkProperties, new BranchLinkCreateListener() {
    @Override
    public void onLinkCreate(String url, BranchError error) {
        if (error == null) {
            Log.i("MyApp", "got my Branch link to share: " +url);
        }
    }
});
```

### Alternate 1: Easy deep link routing

Branch will handle all the deep link routing for you if you leverage the automatic deeplinking functionality described below. Here’s how to build on it:

#### Register your Activity for a specific key

Most of the configuration for the auto deep link feature will happen in the Manifest file, so let’s start there.

##### Option 1: List the key you want
In your Manifest file, it’s easy to specify which deep link keys you want to trigger the Activity to load. Just add this additional metadata for `io.branch.sdk.auto_link_keys` to the Activity you want to use. Let’s use `product_picture` in this example

**Note**: If you don’t know what this key is, see [Creating Links](https://dev.branch.io/recipes/quickstart_guide/android/#creating-links)

```java
<activity android:name="com.myapp.AutoDeepLinkExampleActivity">
    <meta-data android:name="io.branch.sdk.auto_link_keys" android:value="product_picture" />
    *<!-- your other activity stuff -->*
</activity>
```
##### Option 2: Specify the deeplink path you want

Alternatively to the key approach above, if you’re using Branch’s $deeplink_path to support previous URI routing, you can add this metadata `nameio.branch.sdk.auto_link_path` with the values of the deeplink paths that you want to open up an activity.

```java
<activity android:name="com.myapp.AutoDeepLinkExampleActivity">
  <meta-data android:name="io.branch.sdk.auto_link_path" android:value="custom/path/*,another/path/" />
  <!-- your other activity stuff -->
</activity>
```

##### Optional: Add in a request code for tracking

If you register your base activity to receive `onActivityResult` you can specify a custom code for the deep link activity like so.

```java
<meta-data android:name="io.branch.sdk.auto_link_request_code" android:value="@integer/AutoDeeplinkRequestCode" />
```

#### Setup your Activity for deep linking
Once a link has been clicked, a Branch session has been initialized and the deep link key is detected, the Activity will show. For example, this could be an Activity used to show a product.

##### Retrieve parameters on Activity start

The following code snippet shows an example of how to configure said Activity.

```java
@Override
protected void onResume() {
    super.onResume();
    if (Branch.isAutoDeepLinkLaunch(this)) {
        try {
            String autoDeeplinkedValue = Branch.getInstance().getLatestReferringParams().getString("auto_deeplink_key_1");
            launch_mode_txt.setText("Launched by Branch on auto deep linking!"
                    + "\n\n" + autoDeeplinkedValue);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    } else {
        launch_mode_txt.setText("Launched by normal application flow");
    }
}
```

##### Optional: Be notified when Activity finishes

You can be notified when the deep link activity finishes by using the onActivityResult parameter. Just check for the code you inserted in the Manifest.

```java
@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
  super.onActivityResult(requestCode, resultCode, data);

  //Checking if the previous activity is launched on branch Auto deep link.
  if(requestCode == getResources().getInteger(R.integer.AutoDeeplinkRequestCode)){
    //Decide here where  to navigate  when an auto deep linked activity finishes.
    //For e.g. Go to HomeActivity or a  SignUp Activity.
    Intent i = new Intent(getApplicationContext(), CreditHistoryActivity.class);
    startActivity(i);
  }
}
```

#### Where to define your deep link keys

You can define the deep link metadata in the `Branch Universal Object` that you’ll create before creating a deep link.

```java
BranchUniversalObject branchUniversalObject = new BranchUniversalObject()
                .setCanonicalIdentifier("content/12345")
                .setTitle("My Content Title")
                .setContentDescription("My Content Description")
                .setContentImageUrl("https://example.com/mycontent-12345.png")
                .setContentIndexingMode(BranchUniversalObject.CONTENT_INDEX_MODE.PUBLIC)

                // Add the custom deep link keys and values as metadata
                .addContentMetadata("product_picture", "12345")
                .addContentMetadata("user_id", "6789");
```

### Alternate 2: Handle routing yourself in the Branch callback

This section will describe a routing example in an abstract way. In case you want the simple version, Branch can handle routing for you automatically. Just check out the section on **[simplified deep link routing](https://dev.branch.io/recipes/setup_deep_linking/android).**

Inside `onStart`, when Branch is initialized, you will want to examine the dictionary we pass to you from our callback. Below is an example assuming that the links correspond to pictures.

```java
@Override
public void onStart() {
    super.onStart();

    Branch branch = Branch.getInstance();

    // If NOT using automatic session management
    // Branch branch = Branch.getInstance(getApplicationContext());

    branch.initSession(new BranchReferralInitListener(){
        @Override
        public void onInitFinished(JSONObject referringParams, Branch.BranchError error) {
            if (error == null) {
                // params are the deep linked params associated with the link that the user clicked before showing up
                // params will be empty if no data found
                String pictureID = referringParams.optString("picture_id", "");
                if (pictureID.equals("")) {
                    startActivity(new Intent(this, HomeActivity.class));
                }
                else {
                    Intent i = new Intent(this, ViewerActivity.class);
                    i.putExtra("picture_id", pictureID);
                    startActivity(i);
                }
            } else {
                Log.e("MyApp", error.getMessage());
            }
        }
    }, this.getIntent().getData(), this);
}
```

### Supporting existing routes

You spent a bunch of time already setting up deeplink paths before you heard of Branch and now you want the Branch links to leverage them? No problem at all. You can either set `$deeplink_path`, `$ios_deeplink_path` or `$android_deeplink_path` to the URI path you’d like us to call.

All of the examples below will cause Branch to trigger `myapp://content/1234`:

#### Dynamic link control

If you’re [creating links dynamically](https://dev.branch.io/overviews/link_creation_guide/#appending-query-parameters), you simply need to append the parameters. For example:

```java
"https://bnc.lt/a/key_live_jbgnjxvlhSb6PGH23BhO4hiflcp3y7ky?$deeplink_path=content%2F1234"
```

#### SDK/API link control

```java
LinkProperties linkProperties = new LinkProperties()
               .setChannel("facebook")
               .setFeature("sharing")
               .addControlParameter("$deeplink_path", "content/1234");
```

#### [Dashboard link control](https://dev.branch.io/recipes/setup_deep_linking/android/#dashboard-link-control)

You can also control it for individual marketing links by inserting the keys and values into the deep link data section.

![image alt text](images/image_0.png)
