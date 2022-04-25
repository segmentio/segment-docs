---
title: Email Template Editor
layout: engage
engage: true
---
Use Twilio Engage to build email templates with a *what you see is what you get* (WYSIWYG) visual editor. Use drag and drop tools to design the template layout and include user profile traits to personalize the message for each recipient.

You can navigate to the visual editor from the **Select Editor** screen:
- When you build a new email template or edit an existing one.
- From a Send Email step in a Journey.

From the **Select Editor** screen, select **Visual Editor** and click **Build Email**.

The visual editor consists of a [left sidebar](#left-sidebar) with design modules and an [email canvas](#email-canvas).

## Left sidebar

The left sidebar contains the following tools:
- [Content](#add-content-modules)
- [Blocks](#add-blank-columns-or-predefined-content-blocks)
- [Body](#email-body-attributes)
- [Images](#add-an-image)
- [Uploads](#upload-an-image)

Click and drag the tools you want to use from the left sidebar in the email canvas.

## Email canvas
Use the canvas to organize and preview the email template for both desktop and mobile. Drag and drop content modules from the sidebar into the canvas and arrange the layout as desired.

Select content in the canvas and return to the left sidebar to set properties for the selected content.

## Design for desktop or mobile
Navigate between desktop or mobile to design the email template for both formats. Toggle between desktop or mobile in the left sidebar or use the buttons in the bottom right corner of the email canvas.

> info ""
> Mobile view doesn't contain all design options that are available for desktop. For example, upload image capabilities are only available when you edit for desktop. However, content that you add for desktop will also display for mobile devices by default. See [content modules](#add-content-modules) for more on content that's only available to edit for desktop.

### Responsive design
Use responsive design settings in the sidebar to hide specific content for either desktop or mobile.


## Add content modules
Select from the following content modules:

| Module                   |        | Description  |
|--------------------------|--------|-------|
| Columns                  |        | Adds columns to the email body. After you place a column in the email canvas, use the left sidebar to set column and row properties, as well as responsive design settings. <br><br> Columns allow you to organize the email layout by adding sections to drop other content modules in, such as buttons or images.  |
| Button                    |       | Use this tool to add a button to the canvas, then edit button properties in the sidebar: <br><br> **Action**: Use the Action Type dropdown menu to select the action that occurs when the button is clicked. Learn more about [link actions](#link-actions). <br> Action properties can only be set when you edit for desktop. <br><br> **Button Options**: Select button text and background color along with the width and alignment. <br><br> **Spacing**: Set spacing and border attributes for the button. <br><br> **General**: Adjust the container padding to determine the amount of space between the button and column border. <br><br> **Responsive Design**: Hide the selected button for desktop and mobile.  |
| Divider                   |        | The divider separates columns, rows, or content in the email with a visible divider line. |
| Heading                   |         | Adds heading text to the email. Set text properties, add [actionable links](#link-actions), and personalize the text with [merge tags](#personalize-with-merge-tags). |
| HTML                      |         | Use this tool to add HTML to the email body. Note that you can only add HTML when you edit for desktop. |
|Image        |                       | Adds an image. You can format [image properties](#add-an-image) and [add a link](#link-actions). Image uploads are only available when you edit for desktop. |
|Menu                       |         | Adds a responsive menu to the email. After you add a menu to the canvas, edit the following properties: <br><br> **Menu Items** (desktop only)<br>To add menu options: <br>1. Click **Add New Item**. <br>2. Enter the menu text. <br>3. Select the [action type](#link-actions) that occurs when you click on the menu option. <br><br> **Styles**: Menu style for font, layout, padding, and more. <br><br> **General**: Properties for the menu container padding. <br><br> **Responsive Design**: Hide the selected menu for desktop or mobile. |
| Text                      |          |  Adds a text section to the email. Set text properties and include actionable links. Add [merge tags](#personalize-with-merge-tags) to personalize the email with user profile traits. |


## Add blank columns or predefined content blocks
Use the Blocks tool to add both blank columns and pre-existing content blocks to the email. Drag empty column blocks in the canvas to organize the layout, then drag and drop [content tools](#add-content-modules) inside the column blocks.

Predefined content blocks allow you to add content such as:
- Unsubscribe blocks
- Heading blocks
- Image blocks
- Saved blocks

## Email body attributes
Use the body tool to apply general style and link attributes to the entire email canvas.

Email body attributes include:
- Text and background color
- Content width and alignment
- Font family
- Link color and underline

> info ""
> To modify style attributes for specific content in the email, select a content block in the canvas and edit attributes in the left sidebar.

## Add an image
Use the images tool to add images to your email. Scroll through available images in the left sidebar or use the search tool.

Select and drag and image into the canvas, then return to the sidebar to set image properties:

| Image Property         |        | Description  |
|--------------------------|--------|-------|
| Image                  |        | Upload a new image, add an image url, and adjust the image width. You can also add alternate text to display with the image.   |
| Action                 |        | Use the image link drop-down menu to select [link actions](#link-actions) that occur when a recipient clicks on an image.   |
| General                |        | Adjust container padding, which determines the amount of space between the image and column border.   |
| Responsive Design      |        | Hide selected images for an email viewed on either desktop or mobile.   |

## Upload an image
Use the Uploads tool to upload an image for the email template. Click **Upload Image** to select an image stored locally or drag and drop images in the sidebar dropzone.

## Link actions
Use the **Action Type** drop down menu in the sidebar to select the action that occurs when a recipient clicks on the link, button, or image in the email template.

Select from the following link actions:

- **Open Website**: Directs you to a website. Enter a URL and choose to open the website in the same tab or a new one.
- **Send Email**: Sends an email based on the email recipient, subject, and body you enter.
- **Call Phone Number**: Makes a phone call to the number you enter.
- **Send SMS**: Sends an SMS message to the phone number you enter.

## Add unsubscribe links
It's always best practice to include an unsubscribe link in the emails you build.

Add an unsubscribe link as a button:
1. Select the button in the email canvas and navigate to Action settings in the left sidebar.
2. Set Action Type to **Open Website**.
3. Click **Special Links > Unsubscribe**.

Add an unsubscribe link to text:
1. Select the text that you want to convert to an unsubscribe link.
2. Click the link icon in the text toolbar.
3. In the Insert/Edit link window, set Action Type to **Open Website**.
4. Click **Special Links > Unsubscribe**, then click **Save**.

You can alternatively add a [predefined unsubscribe](#add-blank-columns-or-predefined-content-blocks) link content block.

## Personalize with merge tags
Add merge tags in the visual editor to personalize your message with user profile traits.

1. Select any heading or body text in the email canvas. From the text toolbar, click **Merge Tags**.
2. Select the profile traits to include from the drop down menu.
3. Based on cursor placement, profile traits are added to the email from merge tags.

## Save the template

After you design the email, click **Create Email Template**.
