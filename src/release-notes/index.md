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
      <div class="flex flex--wrap waffle waffle--large">
        {% for image in post.images %}
          <a class="flex__column flex__column--6 flex__column--3@medium" href="#">
            <img class="thumbnail" src="/docs/{{image.path}}" alt="{{image.desc}}">
          </a>
        {% endfor %}
      </div>
    </div>
  </div>
{% endfor %}
