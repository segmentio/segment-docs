---
title: Documentation
layout: content
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in ipsum aliquam purus ullamcorper suscipit a et urna. Donec at enim non velit mollis feugiat. Sed arcu purus, condimentum.

<div class="l-block-grid-collection">
{% for category in site.data.categories %}
  <a class="block-grid-item" href="{{site.baseurl}}/{{ category.slug }}">
      <div class="logo">
        <img src="{{site.baseurl}}/assets/icons/home/{{ category.icon }}" />
      </div>
      <div class="content">
        <h3 class="title">{{ category.name }}</h3>
        <p class="description">{{ category.description }}</p>
      </div>
    </a>
  {% endfor %}
</div>

{:toc}

---

## Getting Started

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in ipsum aliquam purus ullamcorper suscipit a et urna. Donec at enim non velit mollis feugiat. Sed arcu purus, condimentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in ipsum aliquam purus ullamcorper suscipit a et urna. Donec at enim non velit mollis feugiat. Sed arcu purus, condimentum.

### Intro

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in ipsum aliquam purus ullamcorper suscipit a et urna. Donec at enim non velit mollis feugiat. Sed arcu purus, condimentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in ipsum aliquam purus ullamcorper suscipit a et urna. Donec at enim non velit mollis feugiat. Sed arcu purus, condimentum.

---

## Questions

Questions? Suggestions? Spot a typo? Email us at [docs-feedback@segment.com](mailto:docs-feedback@segment.com)!
