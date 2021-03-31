<!-- canary comment -->

<!-- in the file we're pulling from the API, "name" corresponds with the path to the yml blob for a specific destination.-->
{% assign currentSlug = page.url | split: "/" | last %}
{% assign currentIntegration = site.data.catalog.destinations.items | where: "slug", currentSlug | first %}
{% if currentIntegration %}
<!-- this endif prevents you from showing a dossier if there's no info in destinations.yml-->



<!-- TODO -->


{% endif %}
