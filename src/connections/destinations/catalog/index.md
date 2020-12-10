---
title: Destination Catalog
hide_toc: true
layout: catalog
menu_icon: "read-more"
---

> info "Want a simpler list?"
> Check out the [list of _all_ destinations](index-all/).

<br>
<div class="destinations-catalog">
  {% assign categories = site.data.catalog.destination_categories.items | sort:"display_name" %}

  {% for category in categories %}
    <div class="destinations-catalog__section markdown">
      {% assign category_icon = category.slug | slugify %}

      <h2 class="destinations-catalog__title flex flex--middle" id="{{ category.slug | slugify }}">
        {% include icons/destinations-catalog/{{ category_icon }}.svg %}

        {{ category.display_name }}
      </h2>

      <div class="flex flex--wrap waffle waffle--large">
        {% assign destinations = site.data.catalog.destinations.items | where: "categories", category.display_name %}

        {% for destination in destinations %}
          {% if destination.status contains "PUBLIC" or destination.status contains "BETA" %}
            <div class="flex__column flex__column--6 flex__column--4@medium">
              <a class="thumbnail-integration" href="{{ site.baseurl }}/{{ destination.url }}/">
                <div class="thumbnail-integration__content flex flex--stack flex--center flex--middle">
                  <div class="thumbnail-integration__logo">
                    {% if destination.mark.url != '' %}
                      <img class="image" alt="{{ destination.display_name }}" src="{{ destination.mark.url }}">
                    {% else %}
                      <img class="image" alt="{{ destination.display_name }}" src="{{ destination.logo.url }}">
                    {% endif %}
                  </div>

                  <h5>{{ destination.display_name }}</h5>
                </div>

                {% if destination.status == 'PUBLIC_BETA' %}
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
