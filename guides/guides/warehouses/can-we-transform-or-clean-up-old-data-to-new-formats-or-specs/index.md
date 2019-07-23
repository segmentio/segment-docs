---
title: "Can we transform or clean up old data to new formats or specs?"
---

This is a common question if the data you’re collecting has evolved over time. For example, if you used to track the event `Signup` but now track `Signed Up`, you’d probably like to merge those two tables to make querying simple and understandable.

We don’t currently have a good way to let you define versions or transformations of the data as your data collection spec changes. Some customers have used [Redshift Views](http://docs.aws.amazon.com/redshift/latest/dg/r_CREATE_VIEW.html) to combine different events. In the meantime, we’re looking into ways we can let you do this simply within our interface – [open to suggestions](/contact) as to how you’d prefer we do it!
