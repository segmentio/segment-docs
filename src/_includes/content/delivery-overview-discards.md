<input class="table-search" type="text" id="filterInput" onkeyup="searchFilter()"
  placeholder="Search for an error code..">
<div class="button-container" id="btnContainer">
  <a href="#" id="all" class="button button-link active">All</a>
  <a href="#" id="failed-ingest" class="button button-link">Failed on Ingest</a>
  <a href="#" id="filtered-source" class="button button-link">Filtered at Source</a>
  <a href="#" id="filtered-destination" class="button button-link">Filtered at Destination</a>
  <a href="#" id="failed-delivery" class="button button-link">Failed Delivery</a>
</div>

<table id="settingsTable">
  <thead>
    <tr>
      <th>Discard reason</th>
      <th>Error code</th>
      <th>What happened?</th>
      <th>Remedy</th>
    </tr>
  </thead>
  <tbody>
    <tr class="settingRow failed-ingest">
      <td colspan="4" style="font-weight: bold; background-color:fafbff;font-size: 10px; text-transform: uppercase;"
        id="settingRow">
        Failed on Ingest</td>
    </tr>
    <tr class="settingRow failed-ingest" id="settingRow">
      <td>Empty batch result</td>
      <td><samp>empty_batch_result</samp></td>
      <td>No messages found for batch result. After processing messages within batch, no messages returned</td>
      <td>Reach out to friends@segment.com for assistance </td>
    </tr>
    <tr class="settingRow failed-ingest" id="settingRow">
      <td>Consent Categories field must be booleans for "Segment Consent Preference Updated" event</td>
      <td><samp style="font-size:0.75em">consent_category preferences_fields_should_be_bool</samp></td>
      <td>No messages found for batch result. After processing messages within batch, no messages returned</td>
      <td>Reach out to friends@segment.com for assistance </td>
    </tr>
    <tr class="settingRow filtered-source">
      <td colspan="4" style="font-weight: bold; background-color:fafbff;font-size: 10px; text-transform: uppercase;"
        id="settingRow">
        Filtered at Source</td>
    </tr>
    <tr class="settingRow filtered-source" id="settingRow">
      <td>Common schema violation</td>
      <td><samp>common_schema_violation</samp></td>
      <td>Event violated common JSON schema of Tracking Plan</td>
      <td> Check event payload against the connected Tracking Plan Common JSON Schema </td>
    </tr>
    <tr class="settingRow filtered-destination">
      <td colspan="4" style="font-weight: bold; background-color:fafbff;font-size: 10px; text-transform: uppercase;"
        id="settingRow">
        Filtered at Destination</td>
    </tr>
    <tr class="settingRow filtered-destination" id="settingRow">
      <td>FilteredByRules</td>
      <td><samp>FILTERED_BY_RULES</samp></td>
      <td>Event matched a <a href="/docs/guides/filtering-data/#destination-filters">Destination Filter rule</a></td>
      <td> Change the Destination Filter to be more specific if this error is not what you expected</td>
    </tr>
    <tr class="settingRow failed-delivery">
      <td colspan="4" style="font-weight: bold; background-color:fafbff;font-size: 10px; text-transform: uppercase;"
        id="settingRow">
        Failed Delivery</td>
    </tr>
    <tr class="settingRow failed-delivery" id="settingRow">
      <td>Invalid Settings</td>
      <td><samp>INVALID_SETTINGS</samp></td>
      <td>Event is missing some required settings as configured for that event type</td>
      <td>One or more settings was <a href="/docs/connections/integration_error_codes/#:~:text=errors.discarded.INVALID_SETTINGS,for%20more%20details.">incorrectly configured</a> in Segment. Please review your Segment settings and make any necessary updates</td>
    </tr>
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