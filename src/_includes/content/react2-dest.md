<!-- Usage: `include react-dest only={ios|android}` -->
<!-- in the file we're pulling from the API, "name" corresponds with the path to the yml blob for a specific destination.-->
{% assign currentSlug = page.url | split: "/" | last %}
{% assign thisDest = site.data.catalog.destinations.items | where: "slug", currentSlug | first %}
{% assign thisDestName = thisDest.display_name %}
{% assign thisDestRNspecific = include.only %}


{% if thisDestRNspecific %}
<div class="premonition info">
<div class="fa fa-info-circle"></div>
<div class="content"><p>
The {{thisDestName}} device-mode destination SDK is only available for {{thisDestRNspecific}} in React Native.
</p></div></div>
{%endif%}

To add the {{thisDestName}} device-mode SDK to a [React Native](/docs/connections/sources/catalog/libraries/mobile/react-native/) project using Segment's new `2.0` release, please reference the supported [Destination Plugin documentation](/docs/connections/sources/catalog/libraries/mobile/react-native/#supported-destinations).