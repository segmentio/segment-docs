The first step is to make sure {{ page.title }} supports the source type and connection mode you've chosen to implement. You can learn more about what dictates [the connection modes we support here](https://segment.com/docs/destinations/#connection-modes).


<!-- TODO: populate from catalog API -->
<table>
  <tr>
    <th></th>
    <th>Web</th>
    <th>Mobile</th>
    <th>Server</th>
  </tr>
  <tr>
    <td>📱 Device-based</td>
    <td>{{#device-web integration}} ✅ {{/device-web}}</td>
    <td>{{#device-mobile integration}} ✅ {{/device-mobile}}</td>
    <td>{{#device-server integration}} {{/device-server}}</td>
  </tr>
  <tr>
    <td>☁️  Cloud-based</td>
    <td>{{#cloud-web integration}} ✅ {{/cloud-web}}</td>
    <td>{{#cloud-mobile integration}} ✅ {{/cloud-mobile}}</td>
    <td>{{#cloud-server integration}} ✅ {{/cloud-server}}</td>
  </tr>
</table>
