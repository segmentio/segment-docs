---
title: PerimeterX
beta: true
---

## Getting Started

When you toggle on the PerimeterX Destination in Segment, this is what happens:

+ Our CDN is updated within 5-10 minutes. Then our snippet will start asynchronously loading PerimeterX’s snippet onto your page. This means you should remove PerimeterX’s snippet from your page.

+ PerimeterX will send an `.identify()` call back to Segment on every page load with the following custom trait: `pxResult`. The value of `pxResult` will be either 0 or 1 meaning the traffic is either human or non-human.

Here's how you can get started using PerimeterX!

### 1. Create an account with PerimeterX.

### 2. Create a new Policy within PerimeterX.

+ Click the "Admin" tab inside the console.
+ Click "New Policy".
+ Rename your new policy by clicking the words "Policy name" in the new policy and then
click "Apply Changes".

![](https://cloudup.com/cg69lTztbJx+)

### 3. Configure your Application

+ Click the "Admin" tab inside the console.
+ Define your first application by clicking the button "Create a New Application" and filling
in the modal.
+ Select the policy that you would like to use (default is pxDefault_Policy and you should
use the policy that you just created)

![](https://cloudup.com/c1DmbmMK5q8+)

### 4. Copy your Application ID and paste into your Segment PerimeterX settings

+ In the Perimeterx console, Click "Admin".
+ Click "Applications".
+ Choose the Application you'd like to connect and copy the Application ID. It will be located under the name and description of your application.
+ Paste the Application ID into your [Segment Perimeterx settings](https://segment.com/docs/destinations/perimeterx/#settings) and Activate the Destination.

## Identify

You have the option to map up to 10 of your Segment `.identify()` traits to custom parameters in PerimeterX. Here's how:

1. Create the custom parameter in PerimeterX. Click "Admin" > "Applications" > choose your application. Under "Custom parameters" click "Add".
2. Choose a Parameter (1-10) and then a display name.
![](https://cloudup.com/cmA_dv62kgp+)
3. In your Segment PerimeterX Destination settings, enter the name of the `.identify()` trait you'd like to map the the custom parameter you created and then enter the number of the custom parameter (1-10).
![](https://cloudup.com/cnKeeTBLune+)

{% include content/integration-foot.md %}
