---
title: Analytics.js 2.0 (Beta)
strat: ajs
hidden: true
---
> warning "Analytics.js 2.0 is recommended for use in staging"
> Analytics.js 2.0 was built with backwards compatibility in mind. However, Segment recommends thorough testing in a Staging environment before you upgrade your production source.

Analytics.js is Segment's most popular library source. This new major version has been re-engineered to be more performant and provide greater extensibility. It is fully backwards compatible with the previous version of Analytics.js.

## Benefits of Analytics.js 2.0

The Analytics.js 2.0 Beta provides two key benefits over the previous version.

### Performance

Analytics.js 2.0 provides a reduction in page load time, which improves overall site performance. Its package size is **~70%** smaller than the previous Analytics.js.

> info ""
> There are many factors that impact page load time, including page weight, network conditions, and hosting locations.

### Developer experience

Analytics.js 2.0 introduces new ways for developers to augment events throughout the event timeline. This enables teams to support:

- New privacy and consent controls before an event occurs
- Enriching events with additional customer or page context in-flight using middleware
- Collecting better metrics related to deliverability *after* a message is sent

## Start using Analytics.js 2.0

Analytics.js is released as a Public Beta, on an opt-in basis, *per source*. The updated code is delivered through your existing snippet, so there's no need to update code on your site.

To opt in:

1. Navigate to the **Settings** tab of the javascript source you want to enable.
2. Enable the Analytics 2.0 toggle.

Once enabled, after 5 minutes or less, the updated code is delivered.

## Disable Analytics.js 2.0

To revert back to the previous version of Analytics.js, disable the Analytics 2.0 toggle on any source you've enabled it.

## Open source libraries

Analytics.js 2.0 includes the following open source components:

**uuid v2.0.0** ([https://github.com/lukeed/uuid](https://github.com/lukeed/uuid))
Copyright Luke Edwards <[luke.edwards05@gmail.com](mailto:luke.edwards05@gmail.com)> ([lukeed.com](https://lukeed.com/))
License: MIT License, available here: [https://github.com/lukeed/uuid/blob/master/license](https://github.com/lukeed/uuid/blob/master/license)

**component-url v0.2.1** ([https://github.com/component/url](https://github.com/component/url))
Copyright (c) 2014 Component 
License: MIT License, available here: [https://github.com/component/url/blob/master/Readme.md](https://github.com/component/url/blob/master/Readme.md)

**dset v2.0.1** ([https://github.com/lukeed/dset](https://github.com/lukeed/dset))
Copyright (c) Luke Edwards <[luke.edwards05@gmail.com](mailto:luke.edwards05@gmail.com)> ([lukeed.com](https://lukeed.com/))
License: MIT License, available here: [https://github.com/lukeed/dset/blob/master/license](https://github.com/lukeed/dset/blob/master/license)

**js-cookie v2.2.1**
Copyright (c) 2018 Copyright 2018 Klaus Hartl, Fagner Brack, GitHub Contributors
 	License: MIT License, available here: [https://github.com/js-cookie/js-cookie/blob/master/LICENSE](https://github.com/js-cookie/js-cookie/blob/master/LICENSE)

**md5 v2.3.0** ([https://github.com/pvorb/node-md5](https://github.com/pvorb/node-md5))
Copyright (c) 2011-2012, Paul Vorbach.
Copyright (c) 2009, Jeff Mott.
License: BSD-3-Clause “New” or “Revised” License, available at: 
[https://github.com/pvorb/node-md5/blob/master/LICENSE](https://github.com/pvorb/node-md5/blob/master/LICENSE)

**unfetch v4.1.0** ([https://github.com/developit/unfetch](https://github.com/developit/unfetch))
Copyright (c) 2017 Jason Miller
License: MIT License, available at: [https://github.com/developit/unfetch/blob/master/LICENSE.md](https://github.com/developit/unfetch/blob/master/LICENSE.md)