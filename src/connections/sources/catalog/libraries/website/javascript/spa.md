---
title: 'Single Page Apps with Analytics.js'
hidden: true
strat: ajs
---

Analytics.js can work with your single-page applications built with technologies such as React or Vue.

## Integrating with your build tooling

If you have a single-page application and plan to use Segment a lot, you might need to add [a Segment server analytics library](/docs/connections/sources/catalog/#server) to your build system.  You can do this using Segment's `analytics-node` package instead of using the Analytics.js javascript code snippet. The Analytics-Node package works like any standard node-js dependency.

First add the package as a dependency:

```sh
$ npm install analytics-node
```

or, if you are using `yarn`:

```sh
$ yarn add analytics-node
```

Once installed, you can import `analytics-node` and instrument your events the same way you would with Analytics.js.  The example implementation below is in React:

```js
import Analytics from 'analytics-node'

const analytics = new Analytics("YOUR WRITE KEY")

class ShoppingCartButton {
    onPurchase = () => {
        analytics.Track("Item Purchased", {
            itemId: "abc"
        })
    }

    render() {
        return <button onClick={this.onPurchase}>Buy Item</button>
    }

}
```

