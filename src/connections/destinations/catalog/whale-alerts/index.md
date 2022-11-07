---
title: Whalr Destination
id: 55283a150a20f4e22f0fb37e
---
This destination is maintained by Whalr.

## About Whalr

Right now, your sales team is in the dark.  If you're a typical site on the Web, you don't know who's in the sales funnel or what they're doing, and you're just waiting for a call from people who have already decided to buy.  That's not sales; that's customer service.

Whalr puts you back in control.  You can see who is using your system, you know what they are doing, and you know what you need to do to get them to buy.  Whalr gives you identity, contextual, and behavioral intelligence about your customers.  What does that mean?

1. Identity -- When your customers give you their email address, Whalr unlocks a wealth of information which you can use to focus and tailor your marketing, even from gmail addresses.  Studies show that you can increase your qualified leads by 300% or more, so you have more going into the lead funnel, and more relevant marketing going to the customer.

2. Contextual -- Now you can see what each customer is doing in the sales funnel, helping you adjust your buyer-specific strategy and tactics. This is not generic analytics; it is specific information about each potential buyer. Discover unexpected, concealed, or hidden relationships and get notified when actions happen, such as a champion moves to another company, or a VP signs up to your service.

3. Behavioral -- Now the real magic happens, as you take the identity and contextual information and learn to predict new customer behavior.  By looking at winning patterns you can surface maturing opportunities and contact the right customers at the right time to crush your sales quota.

## Getting Started

If you haven't already, you'll need to sign up at whalr.com.  You'll receive your Whalr member ID and password to log in to the Whalr member console where you will find key information that you will need to turn on the Whalr destination.

After you have deployed Segment's [analytics.js](/docs/connections/sources/catalog/libraries/website/javascript/quickstart/) script to your web site, Segment will begin sending PAGE events to Whalr.  However, at this stage there is no information on users or potential leads and sales targets being sent to Whalr, so intelligence is not yet actionable.

This is an introduction to how Segment and Whalr work together and how to get Whalr to produce actionable intelligence.

### Identity intelligence

The first step is to send Whalr your customer's email addresses using the Segment IDENTIFY call.  You should send this the first time a lead is identified with an email address, and  every time a user logs in after that.  This is sent as a JSON message in the standard Segment format, and the minimum information required is:

	{
	  "type" : "identify",

	  "userId" : [however you identify your customer],

	  "traits" : {
			    "email" : [email address]
				  }
	}

As Segment notes, using the email address as a unique identifier is not a good idea because emails change, people have multiple email addresses, etc.  However, if that's how you're set up, Whalr supports it, you just need to supply the email address twice: once as the userID and once as the email address.

Using just this information, Whalr can either feed identity intelligence directly into your Salesforce system, email it to you, or you can retrieve it from our API.  With just an email address you'll learn the user's location, company, title, size of the company, and a hundred other metrics to help you segment your audience and focus on important leads.

In addition, studies show a negative correlation between the number fields and the number of signups -- that is, the more information you ask for, the fewer people sign up.  By only asking for an email address you may see a 300% increase in the number of SQLs and with Whalr you get more data, and more reliable data, about the customer!  It's a win-win-win situation: It's easier for the customer to signup, you get more customers, and the customer gets more targeted attention!

### Contextual Intelligence

As noted above, by default Segment sends a PAGE event every time a customer visits a page.   You can also create custom messages using the TRACK method.   You can track any event you are interested in, such as signing up to a newsletter or responding to a campaign.  For example, you might add the following JavaScript code to an email signup form on your website:

	analytics.track("email signup")

Segment adds a host of information, such as userId, IP address, location, browser type, UTM tracking codes, etc. Whalr then adds its own contextual information, such as how often a person visits, how big the company he works for is, etc.  The more detail Whalr has, the better our machine learning algorithms can learn the contextual clues that reflect buying behaviour, and notify you which customers are exhibiting this behavior.  Whalr analyzes profiles, events, engagement (by individuals and groups), and many other metrics to predict which customers will buy based on matching their behavior to past buying behaviors observed. Just as Netflix can recommend a movie with 90% confidence, Whalr can tell you a customer will convert with 90% probability. Stop wasting your time trying to chase every contact, or ignoring valuable contacts just because they signed up with a gmail address!  Whalr isn't analytics, it's customer-specific, and it empowers your sales team to do what they do best--sell!

For maximum effectiveness you need to map out all interactions that could indicate a lead has converted and generate PAGE, TRACK or SCREEN calls (for mobile apps) across all systems which the user interacts with.  Segment gives you lots of tools, SDKs and webhooks to make this process as seamless as possible, and you can do this incrementally while still reaping the benefits of Whalr.  Our experience is that when clients start this process, they really start to think of the end-to-end customer experience, which is a very valuable exercise in itself.

### Behavioral intelligence

Once Whalr has enough information to move beyond the out-of-box intelligence, our customer insight team will analyze your data to discover new patterns and metrics to look for.  By fine-tuning these variables, we can demonstrably increase the conversion rate.

## Contact Whalr
[Contact us](mailto:customersuccess@whalr.com) if you need additional support.
