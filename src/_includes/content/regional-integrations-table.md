{% assign sources = site.data.catalog.regional-supported.sources %}
{% assign destinations = site.data.catalog.regional-supported.destinations %}
{% assign warehouses = site.data.catalog.regional-supported.warehouses %}

<input class="table-search" type="text" id="filterInput" onkeyup="searchFilter()"
  placeholder="Search for an integration..">
<div class="button-container" id="btnContainer">
  <a href="#" id="all" class="button button-link active">All</a>
  <a href="#" id="source" class="button button-link">Sources</a>
  <a href="#" id="destination" class="button button-link">Destinations</a>
  <a href="#" id="warehouse" class="button button-link">Warehouses</a>
</div>


<table id="settingsTable">
  <thead>
    <tr>
      <th>Integration</th>
      <th>US Workspace</th>
      <th>EU workspace w/ US Endpoint</th>
      <th>EU workspace w/ EU Endpoint</th>
    </tr>
  </thead>
  <tbody>
    <tr class="settingRow source ">
      <td colspan="4" style="font-weight: bold; background-color:fafbff;font-size: 10px; text-transform: uppercase;"
        id="settingRow">
        Sources</td>
    </tr>
    {% for source in sources %}
    <tr class="settingRow source" id="settingRow">
      <td><a href="/docs/{{source.url}}">{{source.display_name}}</a></td>
      <td>{% if source.regions contains "us" %}<img class="inline" src="/docs/images/supported.svg" />{% else %}<img
          alt="" class="inline" src="/docs/images/unsupported.svg" />{% endif %}</td>
      <td>{% if source.regions contains "eu" and source.endpoints contains "us" %}<img class="inline"
          src="/docs/images/supported.svg" />{% else %}<img alt="" class="inline"
          src="/docs/images/unsupported.svg" />{% endif %}</td>
      <td> {% if source.regions contains "eu" and source.endpoints contains "eu" %}<img class="inline"
          src="/docs/images/supported.svg" />{% else %}<img alt="" class="inline"
          src="/docs/images/unsupported.svg" />{% endif %}</td>
    </tr>
    {% endfor %}
    <tr class="settingRow destination">
      <td colspan="4" style="font-weight: bold; background-color:fafbff;font-size: 10px; text-transform: uppercase;"
        id="settingRow">
        Destinations</td>
    </tr>
    {% for destination in destinations %}
    <tr class="settingRow destination" id="settingRow">
      <td><a href="/docs/{{destination.url}}">{{destination.display_name}}</a></td>
      <td>{% if destination.regions contains "us" %}<img class="inline"
          src="/docs/images/supported.svg" />{% else %}<img alt="" class="inline"
          src="/docs/images/unsupported.svg" />{% endif %}</td>
      <td>{% if destination.regions contains "eu" and destination.endpoints contains "us" %}<img class="inline"
          src="/docs/images/supported.svg" />{% else %}<img alt="" class="inline"
          src="/docs/images/unsupported.svg" />{% endif %}</td>
      <td> {% if destination.regions contains "eu" and destination.endpoints contains "eu" %}<img class="inline"
          src="/docs/images/supported.svg" />{% else %}<img alt="" class="inline"
          src="/docs/images/unsupported.svg" />{% endif %}</td>
    </tr>
    {% endfor %}
    <tr class="settingRow warehouse">
      <td colspan="4" style="font-weight: bold; background-color:fafbff;font-size: 10px; text-transform: uppercase;"
        id="settingRow">
        Warehouses</td>
    </tr>
    {% for warehouse in warehouses %}
    <tr class="settingRow warehouse" id="settingRow">
      <td><a href="/docs/{{warehouse.url}}">{{warehouse.display_name}}</a></td>
      <td>{% if warehouse.regions contains "us" %}<img class="inline" src="/docs/images/supported.svg" />{% else %}<img
          alt="" class="inline" src="/docs/images/unsupported.svg" />{% endif %}</td>
      <td>{% if warehouse.regions contains "eu" and warehouse.endpoints contains "us" %}<img class="inline"
          src="/docs/images/supported.svg" />{% else %}<img alt="" class="inline"
          src="/docs/images/unsupported.svg" />{% endif %}</td>
      <td> {% if warehouse.regions contains "eu" and warehouse.endpoints contains "eu" %}<img class="inline"
          src="/docs/images/supported.svg" />{% else %}<img alt="" class="inline"
          src="/docs/images/unsupported.svg" />{% endif %}</td>
    </tr>
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
