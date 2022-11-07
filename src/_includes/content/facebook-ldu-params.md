### Data Processing Destination Setting

You can change the **Use Limited Data Use** destination setting to enable or disable Limited Data Use. This must be enabled (set to “on”) if you want to send data processing parameters as part of the the Limited Data Use feature.

### Data Processing Initialization Parameters

The Data Processing parameters you set are the Data Processing Options Segment uses when sending data to Facebook. By default, Segment uses the following Data Processing Parameters:

| **Data Processing Parameter**       | **Default Value** | **What it means**                               |
| ----------------------------------- | ----------------- | ----------------------------------------------- |
| **Data Processing Options**         | `["LDU"]`         | Use Facebook's Limited Data Use processing      |
| **Data Processing Options Country** | `0`               | Use Facebook's geolocation to determine country |
| **Data Processing Options State**   | `0`               | Use Facebook's geolocation to determine state   |
