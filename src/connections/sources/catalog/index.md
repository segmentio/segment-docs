---
title: Sources catalog
hide_toc: true
landing: true
icon: symbols/connections.svg
excerpt: Detailed information about each destination. Learn how our API methods are implemented for that destination.
---

<div class="destinations-catalog">

  {% assign items = site.data.catalog.sources.sources %}
  {% assign categories_array = "" | split: ',' %}

  {% for item in items %}
    {% assign main_category = item.categories[0] %}
    {% unless categories_array contains main_category %}
      {% if main_category and main_category != "" %}
        {% assign categories_array = categories_array | push: main_category %}
      {% endif %}
    {% endunless %}
  {% endfor %}
  {% for item in items %}
    {% assign main_category = item.categories[0] %}
    {% unless categories_array contains main_category %}
      {% unless main_category and main_category != "" %}
        {% assign categories_array = categories_array | push: 'Uncategorized' %}
      {% endunless %}
    {% endunless %}
  {% endfor %}

  {% for category in categories_array %}
    <div class="destinations-catalog__section" id="{{ category.name | slugify }}">
      <h2 class="destinations-catalog__title">
        {{ category }}
      </h2>
      <div class="flex flex--wrap waffle waffle--large">
        {% for item in items %}
          {% if item.categories[0] and item.categories[0] != "" %}
            {% if item.categories[0] == category %}
              <div class="flex__column flex__column--6 flex__column--4@medium">
                <a class="thumbnail-integration" href="{{ doc_path | relative_url }}">
                  <div class="thumbnail-integration__content flex flex--stack flex--center flex--middle">
                    <div class="thumbnail-integration__logo">
                      {% if item.logos.mark != '' %}
                        <img class="image" alt="{{item.display_name}}" src="{{item.logos.mark}}" />
                      {% else %}
                        <img class="image" alt="{{item.display_name}}" src="{{item.logos.logo}}" />
                      {% endif %}
                    </div>
                    <h5>{{ item.display_name }}</h5>
                  </div>
                  {% if item.status == 'PUBLIC_BETA' %}
                    <p class="thumbnail-integration__label">Beta</p>
                  {% endif %}
                </a>
              </div>
            {% endif %}
          {% else %}
            <div class="flex__column flex__column--6 flex__column--4@medium">
              <a class="thumbnail-integration" href="{{ doc_path | relative_url }}">
                <div class="thumbnail-integration__content flex flex--stack flex--center flex--middle">
                  <div class="thumbnail-integration__logo">
                    {% if item.logos.mark != '' %}
                      <img class="image" alt="{{item.display_name}}" src="{{item.logos.mark}}" />
                    {% else %}
                      <img class="image" alt="{{item.display_name}}" src="{{item.logos.logo}}" />
                    {% endif %}
                  </div>
                  <h5>{{ item.display_name }}</h5>
                </div>
                {% if item.status == 'PUBLIC_BETA' %}
                  <p class="thumbnail-integration__label">Beta</p>
                {% endif %}
              </a>
            </div>
          {% endif %}
        {% endfor %}
      </div>
    </div>
  {% endfor %}
</div>
