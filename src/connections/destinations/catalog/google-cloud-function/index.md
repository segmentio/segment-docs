---
title: Google Cloud Function Destination
hide-cmodes: true
beta: true
strat: google
id: 5cbe24b1d07261000146ab55
---
Segment makes it easy to send your data to Google Cloud Function (and lots of other destinations). Once you collect your data using Segment's [open source libraries](/docs/connections/sources/catalog/), Segment translates and routes your data to Google Cloud Function in a format it can use.

[Google Cloud Function](https://cloud.google.com/functions) is a lightweight compute solution for developers to create single-purpose, stand-alone functions that respond to Cloud events without the need to manage a server or runtime environment.

{% include content/beta-note.md %}

# Getting Started

{% include content/connection-modes.md %}

## Build a Google Cloud Function to Process Segment Events

Before you can process events from Segment, you must provide a Google Cloud Function that can handle your incoming events.

1. Go to https://cloud.google.com/functions.
2. Click **VIEW CONSOLE**.
3. Select a project.
4. Click **CREATE FUNCTION**.
5. Enter a name for your function, and choose how much memory the function can use.
6. In the **Trigger** field, select `HTTP`. Save the `URL` GCP gives you. You'll use this to configure the Segment destination later.
7. Choose how you'll provide the function's code (in the **Source code** field) and what language the code is written in (in the **Runtime** field).
8. Enter the name of the function as you defined it in your code, in the **Function to execute** field.
9.  Click **Create** to save your settings and create the Google Cloud Function.


### Test the function

Segment recommends that you use the Debugger of the source you intend to connect to the Google Cloud Function destination to inspect the request body of the incoming event. This allows you to build handlers in your function based on accurate incoming data. For more information, see [Testing Connections](/docs/connections/test-connections/). 

## Configure the Google Cloud Function Destination

Once you create the Google Cloud Function, you can set up a Segment destination that calls the function.

<!-- https://app.segment.com/goto-my-workspace/destinations/catalog/google-cloud-function-->

1. Log in to the Segment app and select the workspace you want to work in.
2. Click **Catalog** and search for **Google Cloud Function**.
3. Click **Configure Google Cloud Function**.
4. Enter the destination settings for this GCF destination.

| Setting                | Description                                                                                                                                                                                                                                                           |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **HTTP Trigger**       | The URL given under the `Trigger` section when you created the Google Cloud Function.                                                                                                                                                                                 |
| **API Key** (optional) | A string to identify that a request is coming from Segment, if required by the function. <br><br>The API key is injected in the `Authorization` header as a [basic authorization header](https://en.wikipedia.org/wiki/Basic_access_authentication) without password. |
