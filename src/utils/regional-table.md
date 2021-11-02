---
title: Regional Segment Integrations
---
{% assign source = site.data.regional.regions %}


<input class="table-search" type="text" id="filterInput" onkeyup="searchFilter()" placeholder="Search for an integration..">
<div class="button-container" id="btnContainer">
  <a href="#" id="all" class="button button-link active">All</a>
  {% for category in source %}
  <a href="#" id="{{category.category | slugify}}" class="button button-link">{{category.category | capitalize}}</a>
  {% endfor %}
</div>


<table id="settingsTable">
  <thead>
    <tr>
      <th>Integration</th>
      <th>Slug</th>
      <th>US West Support</th>
      <th>EU West</th>
    </tr>
  </thead>
  <tbody>
    {% for category in source %}
    <tr class="settingRow {{category.category | slugify }}">
      <td colspan="4" style="font-weight: bold; background-color:fafbff;font-size: 10px; text-transform: uppercase;" id="settingRow">
        {{category.category}}</td>
    </tr>
    {% for integration in category.integrations %}
    <tr
      class="settingRow {{category.category | slugify}}" id="settingRow">
      <td>{{integration.name}}</td>
      <td><code>{{integration.slug}}</code></td>
      <td>{{integration.us_west}}</td>
      <td>{{integration.eu_west}}</td>
    </tr>
    {% endfor %}
    {% endfor %}
  </tbody>
</table>

<script>

function searchFilter() {
    var input, filter, table, tr, td, i, txtValue;

    input = document.getElementById("filterInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("settingsTable");
    tr = document.getElementsByClassName("settingRow");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none"
        }
      }
    }
  }
</script>