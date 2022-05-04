{% assign currentSlug = page.url | split: "/" | last %}
{% assign currentIntegration = site.data.catalog.sources.items | where: "slug", currentSlug | first %}
{% if currentIntegration.url contains "cloud-apps" or page.path contains "cloud-apps" %}
{% if currentIntegration.isCloudEventSource  %}
<div class="premonition success"><div class="fa fa-check-square"></div><div class="content"><p class="header">Good to know: Event source</p>
<p markdown=1>The {{ page.title }} is an **event** source. This means that it sends data as events, which are behaviors or occurrences tied to a user and a point in time. Data from these sources can be loaded into your Segment warehouses, and **also** sent to  Segment streaming destinations. [Learn more about cloud sources.](/docs/connections/sources/#cloud-apps)</p>
</div></div>
{% else %}

<div class="premonition success"><div class="fa fa-check-square"></div><div class="content"><p class="header">Good to know: Object source</p><p markdown=1>The {{ page.title }} is an **object** source. This means that it sends information (traits) about a thing that exists and persists over time, such as a person or company, and which can be updated over time. Data from this source can only be exported directly to a warehouse, but it can then be used for further analysis. [Learn more about cloud sources.](/docs/connections/sources/#cloud-apps)</p></div></div>
{% endif %}
{% endif %}
