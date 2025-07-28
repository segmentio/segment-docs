{% assign currentSlug = page.url | split: "/" | last %}
{% assign currentIntegration = site.data.catalog.sources.items | where: "slug", currentSlug | first %}
{% if currentIntegration.url contains "cloud-apps" or page.path contains "cloud-apps" %}
{% if currentIntegration.isCloudEventSource  %}

<div class="quick-info">
  <div class="qi-content">
    <h6>Source Info</h6>
    <ul class="qi">
      <li><p markdown=1>The {{ page.title }} is an **Event Cloud** source. This means that it sends data as events, which are behaviors or occurrences tied to a user and a point in time. Data from these sources can be loaded into your Segment warehouses, and **also** sent to  Segment streaming destinations. [Learn more about cloud sources.](/docs/connections/sources/#cloud-apps)</p></li>
      {% if currentIntegration.status == "PUBLIC_BETA" %}<li>This source is in <span class="release-pill">Beta</span></li>{%endif%}
      {% if currentIntegration.partnerOwned %}<li>This integration is partner owned. Please reach out to the partner's support for any issues.</li>{% endif %}
    </ul> 
  </div>
</div>

{% elsif currentSlug == "transcend" %}
<div class="quick-info">
  <div class="qi-content">
    <h6>Integration Info</h6>
    <ul class="qi">
      <li><p markdown=1>The {{ page.title }} is a Segment [Public API](/docs/api/public-api/){:target="_blank"} integration. It facilitates privacy requests using Segment’s API, including erasure and tracking opt-out for Segment users.</p></li>
      {% if currentIntegration.status == "PUBLIC_BETA" %}<li>This source is in <span class="release-pill">Beta</span></li>{% endif %}
      {% if currentIntegration.partnerOwned %}<li>This integration is partner owned. Please reach out to the partner's support for any issues.</li>{% endif %}
    </ul>
  </div>
</div>

{% else %}
<div class="quick-info">
  <div class="qi-content">
    <h6>Source Info</h6>
    <ul class="qi">
      <li><p markdown=1>The {{ page.title }} is an **Object Cloud** source. This means that it sends information (traits) about a thing that exists and persists over time, such as a person or company, and which can be updated over time. Data from this source can only be exported directly to a warehouse, but it can then be used for further analysis. [Learn more about cloud sources.](/docs/connections/sources/#cloud-apps)</p></li>
      {% if currentIntegration.status == "PUBLIC_BETA" %}<li>This source is in <span class="release-pill">Beta</span></li>{%endif%}
      {% if currentIntegration.partnerOwned %}<li>This integration is partner owned. Please reach out to the partner's support for any issues.</li>{% endif %}
    </ul>
  </div>
</div>
{% endif %}
{% endif %}


