---
title: Release Notes
---

A blurb about release notes here....

{% for post in site.release_notes %}
  <div>
    <div>
      <p>{{post.release_type | replace: "-", " "}}</p>
      <p>{{post.product_area}}</p>
      {% if post.business == true %}
        <p>business</p>
      {% elsif post.team == true %}
        <p>team</p>
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
