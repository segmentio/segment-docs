---
title: The Functions Editing Environment
---


Segment Functions create reusable code that can be run in your Segment workspace either as sources to format incoming events, or as destinations, to handle specific event types.

When you create a function, write code for it, and save it, the function appears in the Catalog in your workspace _only_. You can then deploy that function in your workspace just as you would a conventional source or destination.

> note ""
> Access to Functions is controlled by specific [access management roles](#functions-permissions). You may need additional access to create and deploy functions.


## Creating functions

Only [Functions admins](#functions-permissions) can create or edit functions.

1. From your workspace, go to the Catalog and click the [Functions tab](https://app.segment.com/goto-my-workspace/functions/catalog){:target="_blank"}.
2. Click **Create function**.
3. Select the type of function you want to build, and click **Build**.

   When you click **Build**, a code editor appears. Different template code is available depending on which type of function you created.
4. Use the editor to write the code for your function, configure settings, and test the function's behavior.
5. Once you finish writing your function, click **Configure** to give it a name.
6. Click **Create Function** to save your work and make this function available in your workspace.

After you click **Create Function**, the function appears on the [Functions catalog page](https://app.segment.com/goto-my-workspace/functions/catalog/){:target="_blank"} in your workspace.


## Editing a function

If you are a **Workspace Owner** or **Functions Admin**, you can manage your function from the [Functions catalog page](https://app.segment.com/goto-my-workspace/functions/catalog/){:target="_blank"}.

If you're editing an existing function, you can **Save** changes without changing the behavior of existing instances of the function.

You can also choose to **Save & Deploy** to push changes to all, or specific functions in your workspace that are already deployed. You might need additional permissions to deploy these changes.

## Deploying source functions

> note ""
> You must be a **Workspace Owner** or **Source Admin** to connect an instance of your function in your workspace.

1. From the [Functions tab](https://app.segment.com/goto-my-workspace/functions/catalog){:target="_blank"}, locate the source function you want to deploy.
2. Click **Connect Source** and follow the prompts to configure the source. (You can access these settings later by navigating to the Source Settings page for your source function.)
3. Locate the webhook URL for the source, either on the **Overview** or **Settings → Endpoint** page.
4. Copy this URL and paste it into the upstream tool or service.


## Deploying destination functions

If you're editing an existing function, you can **Save** changes without changing the behavior of your deployed function. You can also choose to **Save & Deploy** to push changes to all, or specific functions in your workspace that are already deployed.

When you deploy your destination function in your workspace, you fill out the settings on the destination configuration page, similar to how you would configure a normal destination.

## Functions Versioning

With Functions Versioning, you can access a complete change history for each source or destination function. View version history and creation details, then use a unified or split display to compare code and restore previous versions of a function.

### View and compare version history

To view the version history of a function:
1. Navigate to **Connections > Catalog > Functions**.
2. Select your source or destination function.
3. Select **Edit Function**, then click **Version history**.

Select previous versions to compare code using a *unified* or *split* view. With the split view, Segment displays the latest version on the left and the version you've selected on the right.

> success ""
> Unified and split compare screens are read-only. While you can copy code, you can't make changes directly from these screens.

#### `LATEST` and `DEPLOYED` versions

 In the Version History panel, Segment displays `LATEST` and `DEPLOYED` labels that represent a function version state. You'll see the `LATEST` version at the top.

Segment labels a version as the `LATEST` when:
- You save a change to the function source code, but don't deploy the function at the same time.
- You [restore a previous version](#restore-a-previous-version) from your function's version history.

The `DEPLOYED` version is the function version that's currently deployed.

### Restore a previous version

To restore a previous function version:

1. Select the function you want to restore.
2. Click **Restore this version**.
  - Segment creates a duplicate of the selected version and labels it as the `LATEST` version.
3. Click **Restore** on the confirmation screen.
4. To deploy the restored version, click **Save and Deploy** on the Source Code screen.

### Use Versioning with Segment's Public API

You can use Functions Versioning with Segment's [Public API](https://docs.segmentapis.com/tag/Functions){:target="_blank"} to retrieve version history records and source code, as well as to restore previous versions.

Here are some Public API use case examples:

**Get Version history**: Use the `/versions` endpoint to retrieve a list of version records and metadata of a certain page size. You can also use this endpoint to get version source code for a given version ID.

**Restore a previous version**: Use the `/restore` endpoint to restore a previous function version. This creates a new version with the same source as the version you are restoring.

**Create or update versions**: Create or update a function to add a version record and save the source code.

**Deploy a function**: Use the Public API to deploy a function. After you deploy, Segment marks the function version as `DEPLOYED`. Learn more about function version states [here](#latest-and-deployed-versions).

View Segment's [Public API](https://docs.segmentapis.com/tag/Functions){:target="_blank"} docs for more information on how to use Functions Versioning with the Public API.

## Functions permissions

{% include content/functions/perms.md%}

## ️Settings and secrets

{% include content/functions/settings.md %}

## Runtime and dependencies

{% include content/functions/runtime.md %}
