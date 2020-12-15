---
title: Release Notes
badges:
  new_feature: "primary"
  update: "success"
---

A blurb about release notes here....

{% for post in site.release_notes %}
  {% set release_type_slug = post.release_type | replace: "-", "_" %}

  <hr>
  
  <div>
    <div class="flex flex--wrap waffle">
      <span class="badge badge--{{ badges[release_type_slug] }}">{{post.release_type | replace: "-", " "}}</span>
      <span class="badge badge--gray">{{post.product_area}}</span>
      {% if post.business == true %}
        <span class="badge badge--gray">business</span>
      {% elsif post.team == true %}
        <span class="badge badge--gray">team</span>
      {% endif %}
    </div>
    <div>
      <h2>{{post.title}}</h2>
      <p>{{post.date | date: "%B %d, %Y" }}</p>
      <p>{{post.description | markdownify}}</p>
      <ul>
        {% for link in post.doc_links %}
          <li><a href="{{link.url}}">{{link.title}}</a></li>
        {% endfor %}
      </ul>
    </div>
  </div>
{% endfor %}
