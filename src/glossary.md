---
title: "Segment Glossary"
description: "Glossary of terms used in the Segment documentation"
hide_toc: true
hide-feedback: false
layout: page
---
<span id="doc-content" />

{% assign dictionary = site.data.glossary | sort_natural: "term" %}

{% for item in dictionary %}
  <h3>{{ item.term }}</h3>
  {{ item.definition }}
{% endfor %}
