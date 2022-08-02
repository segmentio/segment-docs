---
title: Sources Catalog
hide_toc: true
landing: true
icon: symbols/squares-arrow.svg
excerpt: A list of the available sources on the Segment platform. 
layout: catalog
menu_icon: "read-more"
redirect_from:
  - '/docs/connections/sources/catalog/cloud-apps/'
  - '/docs/connections/sources/catalog/libraries/'
  - '/docs/connections/sources/catalog/libraries/'
  - '/docs/connections/sources/catalog/libraries/mobile/'
  - '/docs/connections/sources/catalog/libraries/ott/'
  - '/docs/connections/sources/catalog/libraries/server/'
  - '/docs/connections/sources/catalog/libraries/website/'
---
Below is a list of the available sources on the Segment platform.


<div class="destinations-catalog">
  {% assign categories = site.data.catalog.source_categories.items %}
  {% assign promoted_categories = "Website, Mobile, Server, Ott" | split: ", " %}

  {% for category in promoted_categories %}
    <div class="destinations-catalog__section markdown" id="{{ category | slugify }}">
      <h2 class="destinations-catalog__title" id="{{ category | slugify }}">
        {{ category }}
      </h2>
      <div class="flex flex--wrap waffle waffle--xlarge">
        {% assign integrations = site.data.catalog.sources.items | where: "categories", category | where: "hidden", false %}
        {% for integration in integrations %}
          <div class="flex__column flex__column--6">
            <a class="thumbnail-integration flex flex--middle" href="{{ site.baseurl }}/{{ integration.url }}">
              <div class="thumbnail-integration__content">
                <div class="flex flex--wrap flex--middle waffle waffle--xlarge@medium">
                  <div class="flex__column flex__column--12 flex__column--2@medium thumbnail-integration__logo-wrapper">
                    {% if integration.logos.mark != '' %}
                      <img class="thumbnail-integration__logo image" alt="{{integration.display_name}}" src="{{integration.logo.url}}" />
                    {% else %}
                      <img class="thumbnail-integration__logo image" alt="{{integration.display_name}}" src="{{integration.logo.url}}" />
                    {% endif %}
                  </div>
                  <h5 class="flex__column flex__column--12 flex__column--10@medium">{{ integration.display_name }}</h5>
                </div>
                {% if integration.status == 'PUBLIC_BETA' %}
                  <p class="thumbnail-integration__label">Beta</p>
                {% endif %}
              </div>
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
    <div class="flex flex--wrap waffle waffle--xlarge">
      {% assign integrations = site.data.catalog.sources.items %}
      {% for integration in integrations %}
        {% unless integration.categories contains promoted_categories[0] or integration.categories contains promoted_categories[1] or integration.categories contains promoted_categories[2] or integration.categories contains promoted_categories[3] or integration.hidden == true %}
          <div class="flex__column flex__column--6">
            <a class="thumbnail-integration flex flex--middle" href="{{ site.baseurl }}/{{ integration.url }}">
              <div class="thumbnail-integration__content">
                <div class="flex flex--wrap flex--middle waffle waffle--xlarge@medium">
                  <div class="flex__column flex__column--12 flex__column--2@medium thumbnail-integration__logo-wrapper">
                    {% if integration.logos.mark != '' %}
                      <img class="thumbnail-integration__logo image" alt="{{integration.display_name}}" src="{{integration.logo.url}}" />
                    {% else %}
                      <img class="thumbnail-integration__logo image" alt="{{integration.display_name}}" src="{{integration.logo.url}}" />
                    {% endif %}
                  </div>
                  <h5 class="flex__column flex__column--12 flex__column--10@medium">{{ integration.display_name }}</h5>
                </div>
                {% if integration.status == 'PUBLIC_BETA' %}
                  <p class="thumbnail-integration__label">Beta</p>
                {% endif %}
              </div>
            </a>
          </div>
        {% endunless %}
      {% endfor %}
    </div>
  </div>
</div>

