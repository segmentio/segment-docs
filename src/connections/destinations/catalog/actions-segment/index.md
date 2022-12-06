---
title: Segment Destination
hide-boilerplate: true
hide-dossier: false
id: 6371eee1ae5e324869aa8b1bvr
---

Reverse ETL is a directional version of ETL (extract, transform, load) that extracts datafrom a data warehouse and loads it into 3rd party destination. The Segment destination allows you to send your warehouse data back through Segment's Tracking API. Using this destination, you can mold the data extracted from your warehouse into Segment-spec events. **This destination is only compatible with Reverse ETL warehouse sources**.

> info ""
> The Segment (Actions) destination is in beta and is in active development. Some functionality may change before it becomes generally available.


## Getting started

1. From the Segment web app, navigate to **Reverse ETL**.
2. To enable the Segment destination, you must create a warehouse source and model. Navigate to **Reverse ETL > Sources**.
3. Create a model in one of your warehouse sources.                          
4. Navigate back to **Reverse ETL > Destinations**.
5. Click "Add Destination" in top-right corner.
6. Select the Segment destination and configure to enable the source that will send data to the Segment destination and follow the steps to name your destination.

{% include components/actions-fields.html %}

## FAQ & Troubleshooting

### MTU and API Call Considerations
This destination is not intended for Engage/Profiles data
