<hr/>

{{#if integration.platforms.server }}
{{#unless hide-personas-partial}}

{{>personas}}

{{/unless}}
{{/if}}


{{#if integration.components }}
{{#unless rewrite}}

## Supported Sources and Connection Modes

<table>
  <tr>
    <th></th>
    <th>Web</th>
    <th>Mobile</th>
    <th>Server</th>
  </tr>
  <tr>
    <td>📱 Device-mode</td>
    <td>{{#device-web integration}} ✅ {{/device-web}}</td>
    <td>{{#device-mobile integration}} ✅ {{/device-mobile}}</td>
    <td>{{#device-server integration}} {{/device-server}}</td>
  </tr>
  <tr>
    <td>☁️  Cloud-mode</td>
    <td>{{#cloud-web integration}} ✅ {{/cloud-web}}</td>
    <td>{{#cloud-mobile integration}} ✅ {{/cloud-mobile}}</td>
    <td>{{#cloud-server integration}} ✅ {{/cloud-server}}</td>
  </tr>
</table>

To learn more about about Connection Modes and what dictates which we support, [see here](/docs/destinations/#connection-modes).

{{/unless}}
{{/if}}

{{#if integration.browserUnbundlingSupported}}
{{#if integration.browserUnbundlingPublic}}
We offer optional **Cloud-mode** connections for **Web** data with {{ integration.name }}. As a reminder, this removes the {{ integration.name }} javascript library from your site, which might improving performance. {{#if integration.browserUnbundlingChangelog}} However, there are a few differences between the Cloud- and Device-mode to keep in mind before enabling it in the Segment app. When you enable **Cloud-mode** here's what happens:

{{ integration.browserUnbundlingIntegrationChangelog }}
{{ integration.browserUnbundlingChangelog }}
{{/if}}
{{/if}}
{{/if}}

{{#has-mobile integration}}
{{#has-server integration}}
Segment offers an *optional* **Device-mode** for **Mobile** data with {{ @root.integration.name }}. If you'd like to use features that require client-based functionality, follow the steps above to package the {{ @root.integration.name }} SDK with Segment's.
{{else}}
This destination *requires* **Device-mode** for **Mobile** data. Follow the steps above packaged the {{ @root.integration.name }} SDK with Segment's.
{{/has-server}}
{{/has-mobile}}

## Settings

Segment lets you change these destination settings via your Segment dashboard without having to touch any code.

{{#each integration.options}}
{{#is hidden false}}
{{#if label}}
{{#isnt label "Unused"}}
### {{label}}
{{{description}}}
{{/isnt}}
{{/if}}
{{/is}}
{{/each}}
