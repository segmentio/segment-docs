---
title: "How do I set up a Segment for dev, prod, and testing environments?"
---
"I want to set up Segment for multiple environments (Development, Production, Testing, etc.) should I create multiple workspaces or multiple sources?"

We recommend that instead of setting up separate workspaces for different environments (local/dev/prod), you set up one workspace and make each of these environments a _different source_. 

We bill per workspace, and on our Team or Business plans you can create as many sources as you need. Each Segment source will have its own Write Key, so you can easily keep things separate.

For each source, you also get to choose which integrations you want it to send data to.
