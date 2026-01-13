title: Collab Travel CRM id: 695cddba47257c593da2bd68
Collab Travel CRM is the modern workspace for travel advisors, helping agencies manage clients, bookings, and workflows in one unified platform.

This destination allows you to sync your Segment data directly into Collab CRM, enabling you to:

Create and update contact profiles from your website or app.
Log activity and behavioral events to the client timeline.
Trigger automation workflows based on user actions.
Getting Started
From the Segment web app, click Catalog, then click Destinations.
Search for Collab Travel CRM in the Catalog, select it, and choose which of your sources to connect the destination to.
Navigate to your Collab CRM dashboard and go to Settings > Integrations > Segment.
Generate a Shared Secret in the "Destination" tab.
In Segment, enter this Shared Secret into the "API Key" connection setting.
Enable the Destination.
Supported Methods
Collab Travel CRM supports the following Segment methods:

Identify
Send Identify calls to create or update Contacts in Collab.

Check the Mappings tab in the Segment Destination settings to configure how user traits are mapped to Collab Contact fields.

Example Payload:

{
  "type": "identify",
  "userId": "123456",
  "traits": {
    "firstName": "Grace",
    "lastName": "Hopper",
    "email": "grace@example.com",
    "phone": "+1234567890"
  }
}
Track
Send Track calls to log events to the Contact's activity timeline.

Example Payload:

{
  "type": "track",
  "event": "Trip Booked",
  "userId": "123456",
  "properties": {
    "destination": "Paris",
    "revenue": 5000
  }
}
Settings
Setting	Description
API Key	Your Collab Shared Secret. You can generate this in your Collab Dashboard under Settings > Integrations > Segment. Collab supports this via x-api-key or Authorization: Bearer headers.
FAQ
Where can I find my API Key? Log in to your Collab workspace, go to Settings > Integrations, select Segment, and look for the "Shared Secret" in the Destination Configuration tab.

What happens if a user doesn't exist? Collab will attempt to create a new Lead/Contact if the email address in the identify call does not match an existing record.
