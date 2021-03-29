---
title: Data Residency
---
Segment offers customers the option to mitigate risk by providing regional infrastructure across Europe, Middle East, Africa and Asia Pacific. The default region for all customers is in Oregon, United States. The regional infrastructure has the same [rate limits and SLA](/docs/connections/rate-limits/) as the default region.

## Agree to Terms

> note ""
> This feature is in Public Preview.

Before you can enable Regional Data Ingest and Storage on your workspace, you must read and agree to the [First Access and Beta Terms and Conditions](https://segment.com/legal/first-access-beta-preview/) and [Acceptable Use Policy](https://segment.com/legal/acceptable-use-policy/).

Once agreed to, click **Accept Terms** to enable the feature on your active workspace.

![](images/enable-regaional-ingest.png)

## Enable Regional Data Ingest

Regional Data Ingest enables you to send data to segment from either Client-side or Server-side sources, through locally hosted API ingest points. The regional infrastructure has the capability to fail-over across locations within the region, but will not cross regions.

### Client-side Sources

You can configure Segment's client-side SDKs for Javascript, iOS, Android, and React Native sources to send data to a regional host by selecting the ingest region on a per-source basis.

![](images/regional-ingest.png)

