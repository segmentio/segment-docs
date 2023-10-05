{% assign sources = site.data.catalog.sources.items | where: "hidden", "false" %}

<input class="table-search" type="text" id="sourceFilterInput" onkeyup="searchFilterSources()"
  placeholder="Search for an source..">

<table id="sourceSettingsTable">
  <thead>
    <tr>
      <th>Integration</th>
      <th>US Workspace</th>
      <th>EU workspace</th>
    </tr>
  </thead>
  <tbody>
    <tr class="sourceSettingRow source">
      <td colspan="4" style="font-weight: bold; background-color:fafbff;font-size: 10px; text-transform: uppercase;"
        id="sourceSettingRow">
        Sources</td>
    </tr>
    {% for source in sources %}
    <tr class="sourceSettingRow source" id="sourceSettingRow">
      <td><a href="/docs/{{source.url}}">{{source.display_name}}</a></td>
      <td>{% if source.regions contains "us" %}<img class="inline" src="/docs/images/supported.svg" />{% else %}<img
          alt="" class="inline" src="/docs/images/unsupported.svg" />{% endif %}</td>
      <td> {% if source.regions contains "eu" %}<img class="inline"
          src="/docs/images/supported.svg" />{% else %}<img alt="" class="inline"
          src="/docs/images/unsupported.svg" />{% endif %}</td>
    </tr>
    {% endfor %}
  </tbody>
</table>

<script>
  function searchFilterSources() {
    var input, filter, table, tr, td, i, txtValue;

    input = document.getElementById("sourceFilterInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("sourceSettingsTable");
    tr = document.getElementsByClassName("sourceSettingRow");
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
