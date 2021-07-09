---
title: Actions Mapping
---
{% assign configMap = site.data.actions.amplitude.config %}

<style>
  tr.no-map td {
    opacity: 0.5;
  }

  tr.show {
    display: table-row;
  }

  .settingRow {
    display: none;
  }

  .table-search {
    width: 100%;
    border: 0px;
    border-bottom: 1px solid rgb(128, 128, 128);
    font-family: "SF Pro Text", BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    color: #474d66;
    font-size: 12px;
    height: 30px;
    margin-bottom: 15px;
  }

  .table-search:focus-visible {
    outline: none
  }

  .button-container {
    display: flex;
    justify-content: space-around;
  }

  .button-link {
    padding: 4px 10px;
  }

  .active {
    background-color: #eee;
  }

  .cmode {
    background-color: #edeff5;
    font-size: 11px;
    padding: 0px 6px;
    border-radius: 4px;
    height: 16px;
    font-weight: 600;
    text-transform: uppercase;
    color: rgb(71, 77, 102);
    opacity: 0.65;
  }

</style>

## Amplitude settings mapping

<input class="table-search" type="text" id="filterInput" onkeyup="searchFilter()" placeholder="Search for setting..">
<div class="button-container" id="btnContainer">
  <a href="#" id="all" class="button button-link active">All</a>
  <a href="#" id="true" class="button button-link" >Configurable</a>
  <a href="#" id="false" class="button button-link" >Not Configurable</a>
  <a href="#" id="cloud" class="button button-link">Cloud-mode</a>
  <a href="#" id="device" class="button button-link" >Device-mode</a>
</div>

<table id="settingsTable">
  <thead>
    <tr>
      <th>Amplitude 1.0 Destination Setting</th>
      <!-- <th>Configurable in Amplitude (Actions)?</th> -->
      <th>Details</th>
    </tr>
  </thead>
  <tbody>
    {% for category in configMap %}
    <tr>
      <td colspan="3" style="font-weight: bold; background-color:fafbff;font-size: 10px; text-transform: uppercase;">
        {{category.category}}</td>
    </tr>
    {% for setting in category.settings%}
    <tr
      class="settingRow {%unless setting.configurable%}no-map{%endunless%} {{setting.configurable}} {% for mode in setting.connection_mode %}{{mode}} {%endfor%}"
      id="settingRow">
      <td>{{setting.name}} <br /> {% for mode in setting.connection_mode %}<span
          class="cmode">{{mode | capitalize}}-mode</span> {% endfor %}</td>
      <!-- <td>{{setting.configurable}}</td> -->
      <td>{% if setting.location %}{{setting.location}} <br /> <br /> {% endif %}{{setting.notes}}</td>
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
  clickFilter("all")

  var links = document.getElementsByClassName("button-link");


  document.querySelectorAll('.button-link').forEach(item => {
    let v = item.getAttribute('id');
    item.addEventListener('click', (event => {
      event.preventDefault();
      clickFilter(v);
    }))
  })

  
  function clickFilter(c) {
    var x, i;
    x = document.getElementsByClassName("settingRow");
    if (c == "all") c = "";
    for (i = 0; i < x.length; i++) {
      w3RemoveClass(x[i], "show");
      if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
    }
  }

  // Show filtered elements
  function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) == -1) {
        element.className += " " + arr2[i];
      }
    }
  }

  // Hide elements that are not selected
  function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      while (arr1.indexOf(arr2[i]) > -1) {
        arr1.splice(arr1.indexOf(arr2[i]), 1);
      }
    }
    element.className = arr1.join(" ");
  }

  var btnContainer = document.getElementById("btnContainer");
  var btns = document.getElementsByClassName("button-link");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
  }

</script>
