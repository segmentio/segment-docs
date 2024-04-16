---
title: Add a Destination
strat: retl-quickstart
---
After you add a model to your Reverse ETL source, you need to add a destination, or business app or tool that Segment should send data to. 

If your destination is not listed in the [Reverse ETL destination catalog](#reverse-etl-destination-catalog), use the [Segment Connections Destination](#segment-connections-destination) to send data from your Reverse ETL warehouse to your destination.

> info "More information might be required"
> Depending on the destination, you might need to know certain endpoints and have specific credentials to configure the destination. See the documentation for each destination for details. 

To add your first destination:
1. Navigate to **Connections > Destinations** and select the **Reverse ETL** tab.
2. Click **Add Reverse ETL destination**.
3. Select the destination you want to connect to and click **Configure**.
4. Select the Reverse ETL source you want to connect the destination to.
5. Enter the **Destination name** and click **Create Destination**.
6. Enter the required information on the **Settings** tab of the destination.
7. Navigate to the destination settings tab and enable the destination. If the destination is disabled, then Segment won't be able to start a sync.

> success ""
> To add multiple destinations to your source, repeat steps 1-7 above.

<div class="double">
  {% include components/reference-button.html href="/connections/reverse-etl/quickstart/create-a-model/" newtab="false" icon="symbols/arrow-left.svg" title="Create a model" description="After adding your warehouse as a source, create a SQL query that defines sets of data you want to synchronize to your Reverse ETL destinations." variant="related" subtitle="back" %}

  {% include components/reference-button.html href="/connections/reverse-etl/quickstart/add-a-mapping/" newtab="false" icon="symbols/arrow-right.svg" title="Add a mapping" description="Map data from your warehouse to specific fields in your target destinations." variant="related" subtitle="next" %}
</div>

## Reverse ETL destination catalog

These destinations support [Reverse ETL](/docs/connections/reverse-etl/). If you don’t see your destination listed in the Reverse ETL catalog, use the [Segment Connections destination](/docs/connections/destinations/catalog/actions-segment/) to send data from your Reverse ETL warehouse to other destinations listed in the [catalog](/docs/connections/destinations/catalog/).  

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

The Segment Connections destination enables you to mold data extracted from your warehouse in [Segment Spec](/docs/connections/spec/) API calls that are then processed by [Segment’s HTTP Tracking API](/docs/connections/sources/catalog/libraries/server/http-api/). The requests hit Segment’s servers, and then Segment routes your data to any destination you want. Get started with the [Segment Connections destination](/docs/connections/destinations/catalog/actions-segment).