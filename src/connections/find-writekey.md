---
title: Locate your Write Key
---

The write key is a unique identifier for each Source. It lets Segment know which Source is sending the data, and which destinations should receive that data.

To find a  write key, you first need to create a non-Cloud Source such as a website, server, or mobile source. ([Cloud-sources](/docs/connections/sources/abou![Uploading Screenshot 2023-11-13 at 10.34.20 AM.png…]()
t-cloud-sources/) do not have write keys, as they use a token or key from your account with that service.)

Then, in the Source, go to "Settings', and then go to "API Keys".

![Screenshot showing the Settings page of a web source, with the API Keys tab selected.](images/find_writekey.png)

Now you can add the Source's write key in your app, and begin sending us data.

### How to locate the source by Write Key
To find the source for a write key within your workspace, first navigate to the <b>Connections</b> on the left panel of your workspace. Then on the top right of the screen and select the magnifying glass icon to search your workspace. 
<img width="1771" alt="Screenshot 2023-11-13 at 10 41 44 AM" src="https://github.com/segmentio/segment-docs/assets/52050659/2a0d0e03-0f90-4a29-a150-44cd2f7f3ace">

Type your write key into the search bar. If the write key exisits in the workspace, it will show up under the search bar with a link to the source. 
<img width="640" alt="Screenshot 2023-11-13 at 10 43 55 AM" src="https://github.com/segmentio/segment-docs/assets/52050659/f73849dd-c66e-4ade-82ea-4266c8790711">

<b> Please note this function is only available to locate the write key. Using this search to find source ID or destination will not work using this process. </b>
