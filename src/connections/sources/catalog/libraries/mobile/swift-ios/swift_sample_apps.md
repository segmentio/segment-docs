---
title: Analytics Swift Sample Apps
strat: swift
---
Add a blurb here about how to use these examples.

{% assign resources = site.data.catalog.swift_resources.items | where: "categories", "sample" %}

<table>
<thead>
<th>Implementation Example</th>
<th>Description</th>
</thead>
<tbody>
{% for resource in resources %}
<tr>
<td><a target="_blank" href="{{resource.url}}">{{resource.name}}</td>
<td> - </td>
</tr>
{%endfor%}
</tbody>
</table>


<!-- <div class="destinations-catalog">
<div class="destinations-catalog__section markdown" id="{{ category | slugify }}">
 <div class="flex flex--wrap waffle waffle--xlarge">
        {% assign category = "sample" %}
        {% assign resources = site.data.catalog.swift_resources.items | where: "categories", category %}
        {% for resource in resources %}
          <div class="flex__column flex__column--6">
            <a class="thumbnail-integration flex flex--middle" target="_blank" href="{{ resource.url }}">
              <div class="thumbnail-integration__content">
                <div class="flex flex--wrap flex--middle waffle waffle--xlarge@medium">
                  <div class="flex__column flex__column--12 flex__column--2@medium thumbnail-integration__logo-wrapper">
                      <img class="thumbnail-integration__logo image" alt="{{integration.display_name}}" src="{{integration.logo.url}}" />
                  </div>
                  <h5 class="flex__column flex__column--12 flex__column--10@medium">{{ resource.name }}</h5>
                </div>
              </div>
            </a>
          </div>
        {% endfor %}
      </div>
    </div>
  </div> -->
