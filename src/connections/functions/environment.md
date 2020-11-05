---
title: The Functions editing environment
---


Segment Functions create reusable code that can be run in your Segment workspace either as sources to format incoming events, or as destinations, to handle specific event types.

When you create a function, write code for it, and save it, the function appears in the Catalog in your workspace _only_. You can then deploy that function in your workspace just as you would a conventional source or destination.

> note ""
> Access to Functions is controlled by specific [access management roles](#functions-permissions). You may need additional access to create, and deploy functions.


## Creating functions

Only [Functions admins](#functions-permissions) can create or edit functions.

1. From your workspace, go to the Catalog and click the [Functions tab](https://app.segment.com/goto-my-workspace/functions/catalog).
2. Click **New Function**.
3. Select the type of function you want to build, and click **Build**.

   When you click **Build**, a code editor appears. Different template code is available depending on which type of function you created.
4. Use the editor to write the code for your function, configure settings, and test the function's behavior.
5. Once you finish writing your function, click **Configure** to give it a name.
6. Click **Create Function** to save your work and make this function available in your workspace.

After you click **Create Function**, the function appears on the [Functions catalog page](https://app.segment.com/goto-my-workspace/functions/catalog/) in your workspace.


## Editing a function

If you are a **Workspace Owner** or **Functions Admin**, you can manage your function from the [Functions catalog page](https://app.segment.com/goto-my-workspace/functions/catalog/).

![Editing or deleting a destination function](images/function-sidesheet-dest.gif)

If you're editing an existing function, you can **Save** changes without changing the behavior of existing instances of the function.

You can also choose to **Save & Deploy** to push changes to all, or specific functions in your workspace that are already deployed. You might need additional permissions to deploy these changes.

## Deploying source functions

> note ""
> You must be a **Workspace Owner** or **Source Admin** to connect an instance of your function in your workspace.

1. From the [Functions tab](https://app.segment.com/goto-my-workspace/functions/catalog), locate the source function you want to deploy.
2. Click **Connect Source** and follow the prompts to configure the source. (You can access these settings later by navigating to the Source Settings page for your source function.)
3. Locate the webhook URL for the source, either on the **Overview** or **Settings → Endpoint** page.
4. Copy this URL and paste it into the upstream tool or service.


## Deploying destination functions

If you're editing an existing function, you can **Save** changes without changing the behavior of your deployed function. You can also choose to **Save & Deploy** to push changes to all, or specific functions in your workspace that are already deployed.

When you deploy your destination function in your workspace, you fill out the settings on the destination configuration page, similar to how you would configure a normal destination.



## Functions permissions

{% include content/functions/perms.md%}

## ️Settings and Secrets

{% include content/functions/settings.md %}

## Runtime and Dependencies

{% include content/functions/runtime.md %}
