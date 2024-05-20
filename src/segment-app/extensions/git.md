---
title: Git Sync Extension
---

Segment's Git extension lets you manage versioning by syncing changes you make in Sources and Destinations from your Segment Workspace to a Git repository.

> info ""
> Extensions, including Git sync, is currently in public beta and is governed by Segment's [First Access and Beta Preview Terms](https://www.twilio.com/en-us/legal/tos){:target="_blank"}.

## Set up Git sync

Follow these steps to set up Git sync:

1. In your Segment Workspace, navigate to **Settings > Extensions**.
2. Click **Set up Git sync**.
3. On the **Configure service credentials** page, select a service and protocol, add your SSH private key or GitHub token, then click **Next**.

## Working with Git syncs

The Git sync extension syncs [Connections](/docs/connections/)([Sources](/docs/connections/sources/) and [Destinations](/docs/connections/destinations/)) from Segment to your Git repository. 

After you set up the Git sync extension for the first time, Segment performs an initial sync that sends source and destination information in your Segment Workspace to the Git repository you connected. 

You can run syncs at any time by clicking **Full resync** on the Git sync page. To disable Git sync from the Git sync page, switch the **Enabled** toggle to off.