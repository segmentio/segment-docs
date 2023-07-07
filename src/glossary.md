---
title: "Segment Glossary"
description: "Glossary of terms used in the Segment documentation"
hide_toc: true
hide-feedback: false
layout: page
---
<span id="doc-content" />

{% for entry in site.data.glossary %}### **{{ term }}**
{{ definition | markdownify }}
{% endfor %}
