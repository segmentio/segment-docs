---
title: Reverse ETL Catalog
beta: false
---

Reverse ETL supports the Actions destinations listed in this catalog. Most destinations not listed here are supported through the [Segment Connections](#segment-connections-destination) destination. 

> success ""
> Twilio Engage Premier Subscriptions users can use the [Segment Profiles](/docs/connections/destinations/catalog/actions-segment-profiles/) destination to enrich their warehouse data.  

The following destinations natively support [Reverse ETL](/docs/connections/reverse-etl/). If you don’t see your destination listed in the Reverse ETL catalog, use the [Segment Connections destination](/docs/connections/destinations/catalog/actions-segment/) to send data from your Reverse ETL warehouse to other destinations listed in the [catalog](/docs/connections/destinations/catalog/).  

<div class="destinations-catalog">
      <div class="flex flex--wrap waffle waffle--xlarge">
        {% assign destinations = site.data.catalog.destinations.items %}
        {% for destination in destinations %}
        {% unless destination.hidden %}
            {% if destination.status contains "PUBLIC" or destination.status contains "BETA" %}
            {% if destination.platforms.warehouse == true %}
              <div class="flex__column flex__column--6">
                <a class="thumbnail-integration flex flex--middle" href="{{ site.baseurl }}/{{ destination.url }}/">
                  <div class="thumbnail-integration__content">
                    <div class="flex flex--wrap flex--middle waffle waffle--xlarge@medium">
                      <div class="flex__column flex__column--12 flex__column--2@medium thumbnail-integration__logo-wrapper">
                        {% if destination.mark.url != '' and destination.mark.url != null %}
                          <img class="thumbnail-integration__logo image" alt="{{ destination.display_name }}" src="{{ destination.mark.url }}">
                        {% else %}
                          <img class="thumbnail-integration__logo image" alt="{{ destination.display_name }}" src="{{ destination.logo.url }}">
                        {% endif %}
                      </div>
                      <h5 class="flex__column flex__column--12 flex__column--10@medium">{{ destination.display_name }}</h5>
                    </div>
                  </div>
                  {% if destination.status == 'PUBLIC_BETA' %}
                    <p class="thumbnail-integration__label">Beta</p>
                  {% endif %}
                </a>
              </div>
              {% endif %}
            {% endif %}
          {% endunless %}
        {% endfor %}
      </div>
    </div>

## Segment Connections destination
If you don’t see your destination listed in the Reverse ETL catalog, use the [Segment Connections destination](/docs/connections/destinations/catalog/actions-segment/) to send data from your Reverse ETL warehouse to other destinations listed in the [catalog](/docs/connections/destinations/catalog/).  

The Segment Connections destination enables you to mold data extracted from your warehouse in [Segment Spec](/docs/connections/spec/) API calls that are then processed by [Segment’s HTTP Tracking API](/docs/connections/sources/catalog/libraries/server/http-api/). The requests hit Segment’s servers, and then Segment routes your data to any destination you want. Get started with the [Segment Connections destination](/docs/connections/destinations/catalog/actions-segment/). 	

> warning ""
> The Segment Connections destination sends data to Segment’s Tracking API, which has cost implications. New users count as new MTUs and each call counts as an API call. For information on how Segment calculates MTUs and API calls, please see [MTUs, Throughput and Billing](/docs/guides/usage-and-billing/mtus-and-throughput/).

## Send data to Engage with Segment Profiles
Engage Premier Subscriptions users can use Reverse ETL to sync subscription data from warehouses to destinations.

To get started with using Reverse ETL for subscriptions:
1. Navigate to **Engage > Audiences** and select the **Profile explorer** tab.
2. Click **Manage subscription statuses** and select **Update subscription statuses**.
3. Select **Sync with RETL** as the method to update your subscription statuses.
4. Click **Configure**.
5. In the Reverse ETL catalog, select the Reverse ETL source you want to use.
6. Set up the source. Refer to the [add a source](/docs/connections/reverse-etl/setup/#step-1-add-a-source) section for more details on how to set up the source.
7. Add the Segment Profiles destination as your Reverse ETL destination. Refer to [add a destination](/docs/connections/reverse-etl/setup/#step-3-add-a-destination) for more details on how to set up the destination.
8. Once your destination is set, go to the **Mappings** tab of your destination and click **Add Mapping**.
9. Select the model you want to use and then select **Send Subscriptions**.
10. Click **Create Mapping**.
11. Follow the steps in the [Create Mappings](/docs/connections/reverse-etl/setup/#step-4-create-mappings) section to set your mappings.
