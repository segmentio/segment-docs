<!-- in the file we're pulling from the API, "name" corresponds with the path to the yml blob for a specific destination.-->
{% assign currentSlug = page.url | split: "/" | last %}
{% assign currentIntegration = site.data.catalog.destinations.items | where: "slug", currentSlug | first %}
{% if currentIntegration %}

{% if currentIntegration.platforms.server == true %}
{% unless page.hide-personas-partial == true %}
{% assign overridesList = site.data.catalog.overrides-list.items %}


## Personas

You can send computed traits and audiences generated using [Segment Personas](/docs/personas) to this destination as a **user property**. To learn more about Personas, contact us for a [demo](https://segment.com/contact/demo).

For user-property destinations, an [identify](/docs/connections/spec/identify/) call is sent to the destination for each user being added and removed. The property name is the snake_cased version of the audience name, with a true/false value to indicate membership. For example, when a user first completes an order in the last 30 days, Personas sends an Identify call with the property `order_completed_last_30days: true`. When the user no longer satisfies this condition (for example, it's been more than 30 days since their last order), Personas sets that value to `false`.

When you first create an audience, Personas sends an Identify call for every user in that audience. Later audience syncs only send updates for users whose membership has changed since the last sync.

{% endunless %}

{% endif %}

{% unless page.hide-settings == true %}
## Settings
Segment lets you change these destination settings from the Segment app without having to touch any code.
<table class="settings">
<thead>
<tr>
<th>Setting</th>
<th>Description</th>
</tr>
</thead>
{% for item in currentIntegration.settings %}
  {% unless item.deprecated == true %}
<tr>
<td class="def" id="{{item.label | slugify}}">{{item.label}}{% if item.required == true %}<br /><i>(required)</i>{%endif%}</td>
<td markdown="span"><code>{{item.type}}</code>{% if item.defaultValue != null and item.defaultValue != "" and item.defaultValue != '{}'%}, defaults to {%if item.type == "array" %}{{item.defaultValue | join: ", " }}{%elsif item.type == "string"%}<code>{{item.defaultValue}}</code> {%elsif item.type == "boolean" %} <code>{{item.defaultValue | upcase }}</code> {%else%} {{item.defaultValue}}{%endif%}. <br /> <br /> {%else%}. {% endif %}{{item.description}}</td>
</tr>


  {% endunless %}
{% endfor %}
</table>
{% endunless %}
{% if currentIntegration.previous_names.size > 1 %}

{% unless page.hide-integrations-object == true %}
## Adding {{ currentIntegration.display_name }} to the integrations object

To add {{ currentIntegration.display_name }} to the `integrations` JSON object (for example, [to filter data from a specific source](/docs/guides/filtering-data/#filtering-with-the-integrations-object)), use one of the following valid names for this integration:
{% if page.name-override %}
{% assign currentIntegration = site.data.catalog.overrides.items | where: "slug", currentSlug | first %}
{% endif %}

{% for valid_name in currentIntegration.previous_names %}
- {{ valid_name }}
{% endfor %}

{% endunless %}
{% endif %}

{% endif %}
