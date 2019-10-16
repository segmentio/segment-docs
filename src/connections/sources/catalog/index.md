---
title: Sources catalog
hide_toc: true
landing: true
icon: symbols/connections.svg
excerpt: Detailed information about each destination. Learn how our API methods are implemented for that destination.
---

<div class="destinations-catalog">
  <div class="destinations-catalog__section" id="{{ category.name | slugify }}">
    <div class="flex flex--wrap waffle waffle--large">
      {% assign app_sources = site.data.catalog.sources.sources %}
      {% assign cloud_sources = site.data.catalog.cloud_sources.sources %}
      {% assign sources = app_sources | concat: cloud_sources | uniq: 'display_name' | sort: 'display_name' %}

      {% for source in sources %}
        {% assign doc_path = source.name | replace: "catalog", "connections/sources" %}
        {% if source.categories contains 'website'%}
      <!-- Show AJs first -->
          <div class="flex__column flex__column--6 flex__column--4@medium">
            <a class="thumbnail-integration" href="{{ doc_path | relative_url }}">
              <div class="thumbnail-integration__content flex flex--stack flex--center flex--middle">
                <div class="thumbnail-integration__logo">
                  {% if source.logos.mark != '' %}
                    <img class="image" alt="{{source.display_name}}" src="{{source.logos.mark}}" />
                  {% else %}
                    <img class="image" alt="{{source.display_name}}" src="{{source.logos.logo}}" />
                  {% endif %}
                </div>

                <h5>{{ source.display_name }}</h5>
              </div>

              {% if source.status == 'PUBLIC_BETA' %}
                <p class="thumbnail-integration__label">Beta</p>
              {% endif %}
            </a>
          </div>

        {% elsif source.categories contains 'server'%}

          <div class="flex__column flex__column--6 flex__column--4@medium">
            <a class="thumbnail-integration" href="{{ doc_path | relative_url }}">
              <div class="thumbnail-integration__content flex flex--stack flex--center flex--middle">
                <div class="thumbnail-integration__logo">
                  {% if source.logos.mark != '' %}
                    <img class="image" alt="{{source.display_name}}" src="{{source.logos.mark}}" />
                  {% else %}
                    <img class="image" alt="{{source.display_name}}" src="{{source.logos.logo}}" />
                  {% endif %}
                </div>

                <h5>{{ source.display_name }}</h5>
              </div>

              {% if source.status == 'PUBLIC_BETA' %}
                <p class="thumbnail-integration__label">Beta</p>
              {% endif %}
            </a>
          </div>

        {% else %}

          <div class="flex__column flex__column--6 flex__column--4@medium">
            <a class="thumbnail-integration" href="{{ doc_path | relative_url }}">
              <div class="thumbnail-integration__content flex flex--stack flex--center flex--middle">
                <div class="thumbnail-integration__logo">
                  {% if source.logos.mark != '' %}
                    <img class="image" alt="{{source.display_name}}" src="{{source.logos.mark}}" />
                  {% else %}
                    <img class="image" alt="{{source.display_name}}" src="{{source.logos.logo}}" />
                  {% endif %}
                </div>

                <h5>{{ source.display_name }}</h5>
              </div>

              {% if source.status == 'PUBLIC_BETA' %}
                <p class="thumbnail-integration__label">Beta</p>
              {% endif %}
            </a>
          </div>
        {% endif %}
      {% endfor %}
    </div>
  </div>
</div>
