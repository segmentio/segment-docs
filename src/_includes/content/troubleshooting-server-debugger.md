### No events in my debugger

1. Double check that you've followed all the steps in the [Quickstart](quickstart/).

2. Make sure that you're calling a Segment API method once the library is successfully installed—[`identify`](#identify), [`track`](#track), etc.

3. Make sure your application isn't shutting down before the `Analytics.Client` local queue events are pushed to Segment. You can manually call `Analytics.Client.Flush()` to ensure the queue is fully processed before shutdown.
