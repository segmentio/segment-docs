---
title: Documentation
layout: content
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in ipsum aliquam purus ullamcorper suscipit a et urna. Donec at enim non velit mollis feugiat. Sed arcu purus, condimentum.

<div class="l-block-grid-collection">
  {% for section in site.data.sections %}
    <a class="block-grid-item" href="#">
      <div class="logo">
        <img src="/assets/icons/home/{{ section.icon }}" />
      </div>
      <div class="content">
        <h3 class="title">{{ section.name }}</h3>
        <p class="description">{{ section.description }}</p>
      </div>
    </a>
  {% endfor %}
</div>

---

## Getting Started

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in ipsum aliquam purus ullamcorper suscipit a et urna. Donec at enim non velit mollis feugiat. Sed arcu purus, condimentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in ipsum aliquam purus ullamcorper suscipit a et urna. Donec at enim non velit mollis feugiat. Sed arcu purus, condimentum.

### Intro

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in ipsum aliquam purus ullamcorper suscipit a et urna. Donec at enim non velit mollis feugiat. Sed arcu purus, condimentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in ipsum aliquam purus ullamcorper suscipit a et urna. Donec at enim non velit mollis feugiat. Sed arcu purus, condimentum.

---

## Questions

Questions? Suggestions? Spot a typo? Email us at [docs-feedback@segment.com](mailto:docs-feedback@segment.com)!
