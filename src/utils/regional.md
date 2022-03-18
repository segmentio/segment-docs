---
title: Regional Availability
hidden: true
---
{% assign sources = site.data.catalog.regional-supported.sources %}
{% assign destinations = site.data.catalog.regional-supported.destinations %}
{% assign warehouses = site.data.catalog.regional-supported.warehouses %}

This page breaks down individual integrations along with their support for Regional workspaces and endpoints.
## Sources

<table>
  <thead>
    <tr>
      <th>Source</th>
      <th>US Workspace</th>
      <th>EU workspace w/ US Endpoint</th>
      <th>EU workspace w/ EU Endpoint</th>
    </tr>
  </thead>
  <tbody>
    {% for source in sources %}
    <tr>
      <td>{{source.display_name}}</td>
      <td>{% if source.regions contains "us" %}<img class="inline" src="/docs/images/supported.svg" />{% else %}<img alt="" class="inline" src="/docs/images/unsupported.svg" />{% endif %}</td>
      <td>{% if source.regions contains "eu" and source.endpoints contains "us" %}<img class="inline" src="/docs/images/supported.svg" />{% else %}<img alt="" class="inline" src="/docs/images/unsupported.svg" />{% endif %}</td>
      <td> {% if source.regions contains "eu" and source.endpoints contains "eu" %}<img class="inline" src="/docs/images/supported.svg" />{% else %}<img alt="" class="inline" src="/docs/images/unsupported.svg" />{% endif %}</td>
    </tr>
    {% endfor %}
  </tbody>
</table>

## Destinations

<table>
  <thead>
    <tr>
      <th>Destination</th>
      <th>US Workspace</th>
      <th>EU workspace w/ US Endpoint</th>
      <th>EU workspace w/ EU Endpoint</th>
    </tr>
  </thead>
  <tbody>
    {% for destination in destinations %}
    <tr>
      <td>{{destination.display_name}}</td>
      <td>{% if destination.regions contains "us" %}<img class="inline" src="/docs/images/supported.svg" />{% else %}<img alt="" class="inline" src="/docs/images/unsupported.svg" />{% endif %}</td>
      <td>{% if destination.regions contains "eu" and destination.endpoints contains "us" %}<img class="inline" src="/docs/images/supported.svg" />{% else %}<img alt="" class="inline" src="/docs/images/unsupported.svg" />{% endif %}</td>
      <td> {% if destination.regions contains "eu" and destination.endpoints contains "eu" %}<img class="inline" src="/docs/images/supported.svg" />{% else %}<img alt="" class="inline" src="/docs/images/unsupported.svg" />{% endif %}</td>
    </tr>
    {% endfor %}
  </tbody>
</table>

## Warehouses

<table>
  <thead>
    <tr>
      <th>Warehouse</th>
      <th>US Workspace</th>
      <th>EU workspace w/ US Endpoint</th>
      <th>EU workspace w/ EU Endpoint</th>
    </tr>
  </thead>
  <tbody>
    {% for warehouse in warehouses %}
    <tr>
      <td>{{warehouse.display_name}}</td>
      <td>{% if warehouse.regions contains "us" %}<img class="inline" src="/docs/images/supported.svg" />{% else %}<img alt="" class="inline" src="/docs/images/unsupported.svg" />{% endif %}</td>
      <td>{% if warehouse.regions contains "eu" and warehouse.endpoints contains "us" %}<img class="inline" src="/docs/images/supported.svg" />{% else %}<img alt="" class="inline" src="/docs/images/unsupported.svg" />{% endif %}</td>
      <td> {% if warehouse.regions contains "eu" and warehouse.endpoints contains "eu" %}<img class="inline" src="/docs/images/supported.svg" />{% else %}<img alt="" class="inline" src="/docs/images/unsupported.svg" />{% endif %}</td>
    </tr>
    {% endfor %}
  </tbody>
</table>