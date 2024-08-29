---
title: Release Notes Test
hide_toc: true
---

<button class="button button-fill filter-button" onclick="javascript:hideCards(ga)">GA</button>
<button class="button button-fill filter-button" onclick="javascript:hideCards(beta)">Beta</button>
<button class="button button-fill filter-button" onclick="javascript:showCards()">Reset filter</button>

{% assign notes = site.data.release-notes.notes %}
{% for note in notes %}
<section class="release-note-card {{ note.release-stage | slugify }}">
<div class="release-note-card--box">
  <span class="release-note-card--note-header" id="{{ note.title | slugify }}">{{ note.title }}</span><br>
  <div class="release-note-card--badges">
    <span class="badge badge--purple {{ note.release-stage | slugify }}">{{ note.release-stage }}</span>
    {% assign plans = note.plan %}
      {% for plan in plans %}
      <span class="badge badge {{ plan | slugify }}">{{ plan }}</span>
      {% endfor %}
    {% assign product-area = note.product-area %}
      {% for item in product-area %}
      <span class="badge badge--success {{ item | slugify }}">{{ item }}</span>
      {% endfor %}
  </div>
<div class="release-note-card--content">
  <main>
    <p>{{ note.description | markdownify }}</p>
    <p class="release-note-card--date">Released {{ note.date }}</p> <a class="button button-fill release-note-card--read-more" href="{{ note.read-more }}">Read more</a>
  </main>
</div>
</div>
</section>
{% endfor %}

<script type="text/javascript">
var ga = "ga"
var beta = "beta"
var pilot = "pilot"
 function hideCards(className) {
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    if (!section.classList.contains(className)) {
      section.classList.add("release-note-card--hidden");
      }
    });
  }

  function showCards() {
  var sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    if (section.classList.contains('release-note-card--hidden')) {
      section.classList.remove('release-note-card--hidden');
      }
    });
  }
</script>
