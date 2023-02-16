<div class="destinations-catalog">
    <div class="destinations-catalog__section markdown" id="{{ category | slugify }}">
      <div class="flex flex--wrap waffle waffle--xlarge">
        {% assign integrations = site.data.catalog.destinations.items %}
        {% for integration in integrations %}
        {% if integration.connection_modes.cloud.mobile == true %}
          <div class="flex__column flex__column--6">
            <a class="thumbnail-integration flex flex--middle" href="{{ site.baseurl }}/{{ integration.url }}">
              <div class="thumbnail-integration__content">
                <div class="flex flex--wrap flex--middle waffle waffle--xlarge@medium">
                  <div class="flex__column flex__column--12 flex__column--2@medium thumbnail-integration__logo-wrapper">
                    {% if integration.logos.mark != '' %}
                      <img class="thumbnail-integration__logo image" alt="{{integration.display_name}}" src="{{integration.mark.url}}" />
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
        {% endif %}
        {% endfor %}
      </div>
    </div>