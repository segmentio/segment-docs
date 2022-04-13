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

To add the {{thisDestName}} device-mode SDK to a [React Native](/docs/connections/sources/catalog/libraries/mobile/react-native/) project using Segment's `1.5.1≤` release:
1. Navigate to the root folder of your project, and run a `yarn add @segment/analytics-react-native-{{thisDestName | downcase | replace: " ", "-" }}{% if thisDestRNspecific %}-{{thisDestRNspecific}}{%endif%}` command to add the destination SDK to your project.
2. Add an `import` statement to your project, as in the example below.
   ```js
   import {{thisDestName | replace: " ", "" }} from '@segment/analytics-react-native-{{thisDestName | downcase | replace: " ", "-" }}{% if thisDestRNspecific %}-{{thisDestRNspecific}}{%endif%}'
   ```
3. In the same project file, add the destination to the `using` list in the `await` command.
   ```js
   await analytics.setup('YOUR_WRITE_KEY', {
     // Add any of your Device-mode destinations. This ensures they load before continuing.
     using: {{thisDestName | replace: " ", "" }}
     // ...
   })
   ```
4. Finally, change to your iOS development folder ( `cd ios` ) and run `pod install`.
