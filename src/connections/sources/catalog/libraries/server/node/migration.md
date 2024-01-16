---
title: Analytics for Node.js Migration Guide
repo: analytics-next
strat: node-js
---

If you're using the [classic version of Analytics Node.js](/docs/connections/sources/catalog/libraries/server/node/classic) (named `analytics-node` on npm), [upgrade to the latest version of Analytics Node.js](/connections/sources/catalog/libraries/server/node/) (named `@segment/analytics-node` on npm). 

1. Change the named imports.

    <br> Before:
    ```javascript  
    import Analytics from 'analytics-node'
    ```

    After:
    ```javascript
    import { Analytics } from '@segment/analytics-node'
    ```
2. Change instantiation to have an object as the first argument.

    <br> Before:
    ```javascript  
    var analytics = new Analytics('YOUR_WRITE_KEY');
    ```

    After:
    ```javascript
    const analytics = new Analytics({ writeKey: '<YOUR_WRITE_KEY>' })
    ```
3. Change flushing to [graceful shutdown](/docs/connections/sources/catalog/libraries/server/node/#graceful-shutdown). 

     <br> Before:
    ```javascript  
    await analytics.flush(function(err, batch) {
        console.log('Flushed, and now this program can exit!');
    });
    ```

    After:
    ```javascript
    await analytics.closeAndFlush()
    ```

### Key differences between the classic and updated version     

* The callback call signature changed. 

    <br>Before:
    ```javascript  
    (err, batch) => void
    ```

    After:
    ```javascript
    (err, ctx) => void
    ```

* The `enable` setting (for disabling analytics during tests) changed to `disable`. `enable: false` changed to `disable: true`.

#### Removals
The updated Analytics Node.js removed these configuration options:
- `errorHandler` (see the docs on [error handling](/docs/connections/sources/catalog/libraries/server/node//#error-handling) for more information)

The updated Analytics Node.js library removed undocumented behavior around `track` properties 

Before:
    
```javascript  
analytics.track({
 ...
 event: 'Ultimate Played',
 myProp: 'abc'
})
```

After:

```javascript
analytics.track({
 ...
 event: 'Ultimate Played',
 properties:  {
   myProp: 'abc'
 }
})
```
