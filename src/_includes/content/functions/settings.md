<!-- usually placed under a heading called "Settings and Secrets" -->

Settings allow you to pass configurable variables to your function, which is the best way to pass sensitive information such as security tokens. For example, you might use `settings` as placeholders to use information such as an API endpoint and API key. This way, you can use the same code with different settings for different purposes. When you deploy a function in your workspace, you are prompted to fill out these settings to configure the function.

First, add a setting in **Settings** tab in the code editor:

![A screenshot of the functions settings tab](/docs/connections/functions/images/settings-tab-empty.png){:width="500"}

Click **Add Setting** to add your new setting.

![A screenshot of the "Add Setting" section of the functions settings tab, with apiKey settings included](/docs/connections/functions/images/add-setting-dialog.png)

You can configure the details about this setting, which change how it's displayed to anyone using your function:

- **Label** - Name of the setting, which users see when configuring the function.
- **Name** - Auto-generated name of the setting to use in function's source code.
- **Type** - Type of the setting's value.
- **Description** - Optional description, which appears below the setting name.
- **Required** - Enable this to ensure that the setting cannot be saved without a value.
- **Encrypted** - Enable to encrypt the value of this setting. Use this setting for sensitive data, like API keys.

As you change the values, a preview to the right updates to show how your setting will look and work.

Click **Add Setting** to save the new setting.

Once you save a setting, it appears in the **Settings** tab for the function. You can edit or delete settings from this tab.

![A screenshot of the functions settings tab, showing the apiKey setting](/docs/connections/functions/images/settings-tab-non-empty.png){:width="500"}
