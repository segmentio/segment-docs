---
title: Release Notes
hide_toc: true
badges:
  new_feature: "primary"
  update: "success"
---

A blurb about release notes here....

{% for post in site.release_notes %}
  {% assign release_type_slug = post.release_type | replace: "-", "_" %}

  <hr>
  
  <article class="release-note">
    <div class="flex flex--wrap waffle">
      <div class="flex__column flex__column--shrink">
        <span class="badge badge--{{ page.badges[release_type_slug] }}">{{ post.release_type | replace: "-", " " }}</span>
      </div>
      <div class="flex__column flex__column--shrink">
        <span class="badge badge--gray">{{ post.product_area }}</span>
      </div>
      {% if post.business == true %}
        <div class="flex__column flex__column--shrink">
          <span class="badge badge--gray">business</span>
        </div>
      {% elsif post.team == true %}
        <div class="flex__column flex__column--shrink">
          <span class="badge badge--gray">team</span>
        </div>
      {% endif %}
    </div>
    <div class="release-note__body">
      <h2>{{ post.title }}</h2>
      <date class="release-note__date">{{ post.date | date: "%B %d, %Y" }}</date>
      <main>{{ post.description | markdownify }}</main>
      <div class="release-note__links">
        {% for link in post.doc_links %}
          <a href="{{ link.url }}">{{ link.title }}</a>
        {% endfor %}
      </div>
      <div class="flex flex--wrap waffle waffle--large" data-glightbox>
        {% for image in post.images %}
          <a  href="/docs/{{ image.path }}" class="flex__column flex__column--6 flex__column--3@medium">
            <img class="thumbnail" src="/docs/{{ image.path }}" alt="{{ image.desc }}">
          </a>
        {% endfor %}
      </div>
    </div>
  </article>
{% endfor %}
