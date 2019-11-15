The first step is to make sure {{ integration.name }} supports the source type and connection mode you've chosen to implement. You can learn more about what dictates [the connection modes we support here](/docs/destinations/#connection-modes).

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
