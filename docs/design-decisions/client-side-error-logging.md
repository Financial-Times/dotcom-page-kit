# Design Decisions: Client-Side Error Logging

Page Kit does not provide any client-side error logging capability. This is a major change from the existing FT.com toolset.

Since the Next team started the rebuild of FT.com in 2014 we've used [Sentry] to capture and log both server and client-side errors for each application. It has been integrated with both [`n-express`] and [`n-ui`] so our applications get error logs by default.

However, for some time the value of this has been questioned, in particular the client-side logs are so numerous and noisy that they are ignored by the team. The Sentry client inadvertently captures errors thrown by ads and browser extensions which vastly outnumber any issues caused by code written by the team. There have been several attempts to filter the logs with varying rates of success.

Although the development team wants a tool to capture client-side errors it is apparent that the current implementation is of limited use.

Therefore we have chosen not to implement the Sentry client as part of Page Kit at this time as we believe a proper solution requires discussion and research which is out of scope for this project.

[An issue has been created][issue] for discussing this topic further.

[Sentry]: https://sentry.io/
[`n-express`]: https://github.com/Financial-Times/n-express/blob/cdba330203de8bdee77833b810dcd8b7cb68a648/main.js#L54
[`n-ui`]: https://github.com/Financial-Times/n-ui/blob/a84d0d39ff1796ab9261fc3588d71dd07c543fe5/browser/bundles/o-errors/index.js
[issue]: https://github.com/Financial-Times/next/issues/315

## Decision owners

- Matt Hinchliffe
- Samuel Parkinson
- Adam Braimbridge
