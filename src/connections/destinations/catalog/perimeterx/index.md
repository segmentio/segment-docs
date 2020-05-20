---
title: PerimeterX Destination
rewrite: true
---

When you toggle on the PerimeterX Destination in Segment, our CDN is updated within 5-10 minutes. Our snippet will start asynchronously loading PerimeterX's snippet onto your page. This means you should remove PerimeterX's snippet from your page.

## Getting Started

1. Configure your [Policy and Application within PerimeterX](https://dash.readme.io/project/pxconsole/v1.0/docs/segment).
2. Copy your Application ID and paste into your Segment PerimeterX settings

## Identify

PerimeterX will send an `identify` call back to Segment on every page load with the following custom trait: `pxResult`. The value of `pxResult` will be either 0 or 1 meaning the traffic is either human or non-human.

You have the option to map up to 10 of your `identify` traits to custom parameters within PerimeterX.

1. Create the custom parameter in PerimeterX. Click "Admin" > "Applications" > choose your application. Under "Custom parameters" click "Add".
2. Choose a Parameter (1-10) and a display name:
![](images/cmA_dv62kgp.png)
3. In your Segment PerimeterX Destination settings, enter the name of the `identify` trait you'd like to map to the custom parameter you created and then enter the number of the custom parameter (1-10).
![](images/cnKeeTBLune.png)
