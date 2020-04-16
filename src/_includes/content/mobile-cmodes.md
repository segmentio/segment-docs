### About mobile connection modes:

Segment defaults to using cloud-based connection mode ("cloud-mode") for any destination connected to a mobile source, because this can help decrease the size of your final app package. When you use cloud-mode, Segment sends messages to the Segment servers, and then translates and forwards that data on to the downstream tools. This way, you only package the Segment mobile library with your app.

However, many destination tools that specifically deal with mobile interactions require that you use a device-based connection mode ("device-mode") so that they can collect information directly on the mobile device. If you plan to use destinations that require device-mode, you must package the Segment-integration version of that tool's SDK along with the Segment source library in your app. The Segment-integration SDK allows you to still collect the data with Segment, but also enables any device-based features, and still saves you space.

When you package Segment and the Segment-integration SDKs, you must use a dependency manager (TODO: such as?) to ensure that all SDKs are compatible and all of their dependencies are included. Segment does not support bundling mobile SDKs without a dependency manager.
