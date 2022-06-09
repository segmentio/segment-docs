---
title: Rollbar Destination
id: 54521fda25e721e32a72eeed
---
## Getting Started

When you enable Rollbar in Segment, we'll start sending data to the Rollbar API for your account. Currently, Rollbar will send data from our analytics.js library.

To start pushing user data to Rollbar, toggle the destination on and add your Rollbar access token. Your access token can be found in your Rollbar Settings > Access Tokens.

## Identify

The first thing you'll want to do is to [`identify`](/docs/connections/spec/identify/) a user with any relevant information as soon as they log-in, or sign-up. You record this with our [`identify`](/docs/connections/spec/identify/) method.

## Enabling Source Maps

This feature makes use of JavaScript Source Maps to translate the minified code references back into the original source. To use this feature in Rollbar, be sure to do the following:

1. Enable source maps and fill out the Code Version in your [Rollbar settings](/docs/connections/destinations/catalog/rollbar/#settings) in the Segment UI.

2. Provide your source map. There are two ways you can do this:

  a. Automatic download: place a comment like the following at the bottom of your minified JavaScript files:

  ```
  //# sourceMappingURL=URL_TO_SOURCE_MAP
  ```

  b. Upload pre-deploy: at the beginning of your deploy script, upload a source map package using Rollbar's API.

  For more detail on providing your source map, checkout [Rollbar's documentation here](https://rollbar.com/docs/source-maps/#step-2-provide-your-source-map).
