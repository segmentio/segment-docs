<div class="destinations-catalog">
  <div class="destinations-catalog__section">
    <div class="flex flex--wrap waffle waffle--xlarge">
      {% assign warehouses = site.data.catalog.warehouse.items | sort: "display_name" %}
      {% for warehouse in warehouses %}
        {% if warehouse.categories contains "RETL" %}
          <div class="flex__column flex__column--6">
            <a class="thumbnail-integration flex flex--middle" href="/docs/connections/reverse-etl/reverse-etl-source-setup-guides/{{ warehouse.slug }}-setup/">
              <div class="thumbnail-integration__content">
                <div class="flex flex--wrap flex--middle waffle waffle--xlarge@medium">
                  <div class="flex__column flex__column--12 flex__column--2@medium thumbnail-integration__logo-wrapper">
                    {% if warehouse.mark.url != '' %}
                      <img class="thumbnail-integration__logo image" alt="{{ warehouse.display_name }}" src="{{ warehouse.mark.url }}" />
                    {% else %}
                      <img class="thumbnail-integration__logo image" alt="{{ warehouse.display_name }}" src="{{ warehouse.logo.url }}" />
                    {% endif %}
                  </div>
                  <h5 class="flex__column flex__column--12 flex__column--10@medium">{{ warehouse.display_name }}</h5>
                </div>
              </div>
            </a>
          </div>
        {% endif %}
      {% endfor %}
    </div>
  </div>
</div>