<tr>
  <td markdown="span">`timestamp`</td>
  <td markdown="span">*optional*</td>
  <td markdown="span">Date</td>
  <td markdown="span">Timestamp when the message itself took place, defaulted to the current time by the Segment Tracking API
    <p>It is an [ISO-8601](http://en.wikipedia.org/wiki/ISO_8601) date string</p>
    <p>If the event just happened, leave it out and we'll use the server's time. If you're importing data from the past, make sure you to provide a `timestamp`.See the [Timestamps fields docs](/docs/connections/spec/common#timestamps) for more detail.</p></td>
</tr>
