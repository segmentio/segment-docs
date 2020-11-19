---
title: 'Spec: A/B Testing Events'
hidden: true
---

This guide explains what data should be sent to Segment *from* A/B Testing tools and hence is targeted to partners who send A/B testing data back into Segment rather than targeted to customers themselves. The [semantic events](/docs/connections/spec/semantic/) detailed below represent the ideal for A/B Testing events.

## Overview

Every A/B Testing tool is built around the concept of [showing visitors an experiment](#experiment-viewed) with changes to the page. Each experiment can have multiple variations shown to different random samples of visitors.

## Events

The one semantic event for recording A/B Test experiments is:

* [Experiment Viewed](#experiment-viewed)

### Experiment Viewed

This event will be sent **automatically** every time a customer sees a variation of an active A/B Test when using some A/B testing tools using Segment. You don't actually have to make these track calls! Note that the A/B testing tools will need to be loaded synchronously in order for these events to fire properly.

#### Properties

This event supports the following semantic properties:

Property          | Type   | Description
--------          | ----   | -----------
`experiment_id`   | String | The experiment's ID.
`experiment_name` | String | The experiment's human-readable name.
`variation_id`    | String | The variations's ID.
`variation_name`  | String | The variation's human-readable name.
