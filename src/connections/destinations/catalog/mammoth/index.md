---
rewrite: true
title: Mammoth Destination
id: 5cd3f02701645a0001cf49a0
---
[Mammoth](https://mammoth.io/integrations/segment/?utm_source=segmentio&utm_medium=docs&utm_campaign=partners) provides self-serve analytics for analysts, businesses, and developers who can use Mammoth's data warehousing, data discovery & data preparation abilities to arrive at insights.

Mammoth allows you to blend your data from Segment with other sources of data such as databases and files. Using Mammoth, you can build multiple data pipelines, which are constructed by applying transforms through a no coding interface. Mammoth also allows for the visual discovery of the data and easy exports to databases such as MySQL, Elasticsearch, and PostgreSQL.

This destination is maintained by [Mammoth](https://mammoth.io). For any issues with Mammoth Destination, [contact the Mammoth Support team](mailto:support@mammoth.io).

{% include content/beta-note.md %}


## Getting Started

{% include content/connection-modes.md %}

There are three steps to get started using Mammoth with Segment. First, [register for an account with Mammoth](https://mammoth.io/register/choose/starter).

1. Create a webhook dataset in Mammoth, and copy the API key.
2. Connect Segment to Mammoth.
3. Use the *Extract from JSON* task to flatten data.


### 1. Create a webhook dataset on Mammoth.

Mammoth Segment destination requires that you have a dataset on Mammoth's side. There are multiple types of datasets you can add. You should add a webhook type of dataset in Mammoth for your Segment integration.


1. Log in to [app.mammoth.io](https://app.mammoth.io).
2. First, create a new "webhooks" dataset.
   If you already have a dataset, click the green button in the data library, then click the **Webhooks** option.
   If you don't have any datasets in your account yet, the data library shows a button to add a webhook dataset on the data library itself. Click that.
3. The add dataset dialog opens. Make sure the option selected is *Webhooks*.
4. Give your dataset a name, and click **Done**. A new dataset appears in the data library.

   ![](images/A8mLIPZ.png)

   The dataset you created shows an API KEY which you need to connect to Segment.

   ![](images/JsTuMCy.png)

5. Click the new dataset you created in the previous step.
6. From the preview panel, click **copy** to copy the API key to your clipboard.


### 2. Connect Segment and Mammoth.


1. In the Segment App, select **Add Destination**. Search for and select Mammoth.
2. Paste the API KEY you copied in the previous step into the settings UI.

### 3. Use the Extract from JSON task to flatten data

Once you are configured according to the previous steps, data flows into Mammoth. Mammoth stores all the data received from Segment in this dataset. You can use the "Extract from JSON" task to flatten the data into rows and columns. Once you have the data in a flat format, you can use Mammoth to set up any number of pipelines you need.

1. When Mammoth receives new data the `REFRESH` button appears in the preview panel. Click it to add that data to the dataset from the staging area.
2. Select the dataset and click **Open**.
   The default View on the dataset appears. Look for one column of data called **JSON**.
4. Now we want to flatten the JSON data. Open the *ADD TASK* menu and click **Extract from JSON**.
5. Use the *Extract from JSON* task as needed to flatten the data. *Extract from JSON* task automatically suggests the correct options, and all you need to do is hit *Apply*. You can read more about the [Extract from JSON task here](https://mammoth.io/docs/content/feature_guide/tasks/json.extract.html).
6. You may need to apply the *Extract from JSON* task multiple times if the data is nested.

Mammoth automatically refreshes the data about once an hour. You can also click **REFRESH** at any time to sync data immediately.


### Hints and Tips

Tasks you create with Mammoth do not modify your original data from Segment. You can reuse the original data and set up multiple task pipelines by creating multiple views on the same dataset.

You may also want to use the *Apply filter* task along with *Extract from JSON* task to flatten only certain types of data.

Once you have converted the JSON data into a row vs. column format, you can

- Use the *EXPLORE* menu and explore the data in any of the columns.
- Use other tasks provided by the *ADD TASK* menu to arrive at insights and automate reports.
- Export the data to another system from Mammoth.

Mammoth recommends that you use the *Save as Dataset* task in the *ADD TASK* menu to save your flattened data as a new dataset. Using this method, you separate your JSON extractions from your analysis & reporting.




## Page

If you're not familiar with the Segment Specs, take a look to understand what the [Page method](/docs/connections/spec/page/) does. An example call would look like:

```
analytics.page()
```

Page calls will be sent to the webhook dataset you created earlier. You can filter this data into a different view after you have set up JSON extract pipelines.


## Screen

If you're not familiar with the Segment Specs, take a look to understand what the [Screen method](/docs/connections/spec/screen/) does. An example call would look like:

```
[[SEGAnalytics sharedAnalytics] screen:@ "Home"];
```

Screen calls will be sent to the webhook dataset you created earlier. You can filter this data into a different view after you have set up JSON extract pipelines.


## Identify

If you're not familiar with the Segment Specs, take a look to understand what the [Identify method](/docs/connections/spec/identify/) does. An example call would look like:

```
analytics.identify('userId123', {
  email: 'john.doe@example.com'
});
```

Identify calls will be sent to the webhook dataset you created earlier. You can filter this data into a different view after you have set up JSON extract pipelines.


## Track

If you're not familiar with the Segment Specs, take a look to understand what the [Track method](/docs/connections/spec/track/) does. An example call would look like:

```
analytics.track('Clicked Login Button')
```

Track calls will be sent to the webhook dataset you created earlier. You can filter this data into a different view after you have set up JSON extract pipelines.
