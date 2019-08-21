---
title: "Segment Glossary"
description: "Glossary of terms used in the Segment documentation"
hide_toc: true
feedback: false
---

{% for entry in site.data.glossary %}### **{{ entry[0] }}**
{{ entry[1] | markdownify | strip_html | strip }}
{% endfor %}
