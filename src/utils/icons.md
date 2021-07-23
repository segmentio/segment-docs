---
title: Icons
hidden: true
layout: page
---

<div>
{% for section in site.data.icons.sections %}
  <div class="flex flex--wrap waffle waffle--large">
    {% for icon in section.section_icons %}
      <div class="flex__column flex__column--1 flex flex--stack flex--middle">
        {% if section.section_title == "main" %}
          <div class="icon">{% include icons/{{ icon }}.svg %}</div>
        {% else %}
          <div class="icon">{% include icons/{{ section.section_title}}/{{ icon }}.svg %}</div>
        {% endif %}
        <p style="font-size: 8px; line-height: 14px; margin-top: 5px;">{{ icon }}</p>
      </div>
    {% endfor %}
  </div>
{% endfor %}
</div>