---
title: Sources Catalog
hide_toc: true
landing: true
icon: symbols/squares-arrow.svg
excerpt: Detailed information about each destination. Learn how our API methods are implemented for that destination.
layout: catalog
menu_icon: "read-more"
redirect_from:
  - '/docs/connections/sources/catalog/cloud-apps/'
  - '/docs/connections/sources/catalog/cloud-apps/'
---

<div class="destinations-catalog">
  {% assign categories = site.data.catalog.source_categories.items %}
  {% assign promoted_categories = "Website, Mobile, Server, Ott" | split: ", " %}

  {% for category in promoted_categories %}
    <div class="destinations-catalog__section markdown" id="{{ category | slugify }}">
      <h2 class="destinations-catalog__title" id="{{ category | slugify }}">
        {{ category }}
      </h2>
      <div class="flex flex--wrap waffle waffle--large">
        {% assign integrations = site.data.catalog.sources.items | where: "categories", category %}
        {% for integration in integrations %}
          <div class="flex__column flex__column--6 flex__column--4@medium">
            <a class="thumbnail-integration" href="{{ site.baseurl }}/{{ integration.url }}">
              <div class="thumbnail-integration__content flex flex--stack flex--center flex--middle">
                <div class="thumbnail-integration__logo">
                  {% if integration.logos.mark != '' %}
                    <img class="image" alt="{{integration.display_name}}" src="{{integration.logo.url}}" />
                  {% else %}
                    <img class="image" alt="{{integration.display_name}}" src="{{integration.logo.url}}" />
                  {% endif %}
                </div>
                <h5>{{ integration.display_name }}</h5>
              </div>
              {% if integration.status == 'PUBLIC_BETA' %}
                <p class="thumbnail-integration__label">Beta</p>
              {% endif %}
            </a>
          </div>
        {% endfor %}
      </div>
    </div>
  {% endfor %}


  <div class="destinations-catalog__section markdown" id="cloud-apps">
    <h2 class="destinations-catalog__title" id="cloud-apps">
      Cloud-apps
    </h2>
    <div class="flex flex--wrap waffle waffle--large">
      {% assign integrations = site.data.catalog.sources.items %}
      {% for integration in integrations %}
        {% unless integration.categories contains promoted_categories[0] or integration.categories contains promoted_categories[1] or integration.categories contains promoted_categories[2] or integration.categories contains promoted_categories[3]%}
          <div class="flex__column flex__column--6 flex__column--4@medium">
            <a class="thumbnail-integration" href="{{ site.baseurl }}/{{ integration.url }}">
              <div class="thumbnail-integration__content flex flex--stack flex--center flex--middle">
                <div class="thumbnail-integration__logo">
                  {% if integration.logos.mark != '' %}
                    <img class="image" alt="{{integration.display_name}}" src="{{integration.logo.url}}" />
                  {% else %}
                    <img class="image" alt="{{integration.display_name}}" src="{{integration.logo.url}}" />
                  {% endif %}
                </div>
                <h5>{{ integration.display_name }}</h5>
              </div>
              {% if integration.status == 'PUBLIC_BETA' %}
                <p class="thumbnail-integration__label">Beta</p>
              {% endif %}
            </a>
          </div>
        {% endunless %}
      {% endfor %}
    </div>
  </div>
</div>

<br/>
## Object Cloud Sources


- [Marketo](/docs/connections/sources/catalog/cloud-apps/marketo/)
- [Salesforce Marketing Cloud](/docs/connections/sources/catalog/cloud-apps/salesforce-marketing-cloud/)
