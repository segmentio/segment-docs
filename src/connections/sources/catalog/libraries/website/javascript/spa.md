---
title: 'Single Page Apps with Analytics.js'
hidden: true
strat: ajs
---

Analytics.js can work with your single-page applications built with technologies such as React or Vue.  

## Integrating with your build tooling

If you have a single-page application and plan to heavily use Analytics.js, you might need to add Analytics.js to your build system.  You can do this using Segment's `analytics-node` package instead of the Analytics.js snippet. This package works like any standard node-js dependency.

First add `analytics-node` as a dependency:

```shell
$ npm install analytics-node 
```

or, if you are using yarn:

```shell
$ yarn add analytics-node
```

Once installed, you can import `analytics-node` and instrument your events like you would with Analytics.js.  The example implementation below is in React:

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
