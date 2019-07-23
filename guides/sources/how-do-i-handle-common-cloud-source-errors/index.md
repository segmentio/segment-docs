---
title: "How do I handle common cloud source errors?"
---

The most common reasons why sources will have trouble is due to authentication or permission issues. When the issue is authentication-related, you'll see a connection error in your source run pane that tells you that access was denied. In these cases, we'll quit the process early and not make any further attempts on any collections.

When you successfully authenticate but your user lacks requisite permissions (for example, if you use an agent login instead of an administrator for Zendesk), we will make an effort to pull each collection and report errors on a per-collection basis that let you know why your source runs are failing. This is because sometimes permission based denials are scoped to specific resources from the upstream tool.

We try to make the errors that are surfaced directly in the UI clear enough to negate the need for a document like this, so if it's not clear what to do to remediate the errors from the UI, please [contact support](https://segment.com/help/contact/) and let them know.

Sometimes, when the sync job fails due to an unhandled error or is mysteriously hanging for too long, we'll kill the job and report a failure with instructions to contact support. When this happens, our support and engineering teams have already been notified of the failure and have the complete set of logs to set about debugging and remediating the issue, but please don't hesitate to get in touch so they can keep you in the loop!
