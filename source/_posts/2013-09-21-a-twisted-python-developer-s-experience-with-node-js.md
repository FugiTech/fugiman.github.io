---
published: true
layout: post
title: "A Twisted-Python developer's experience with Node.JS"
date: "2013-09-21 16:57"
categories: programming node twisted
---

## The Story

Last weekend I was flown out to San Francisco to compete in the [University Hacker Olympics hosted by SignalFire](http://events.signalfire.com/). Around 100 university students split in to teams of 2-5 students and worked with engineers from various companies on projects of their choosing. After 26 hours we presented our products to a panel of judges who would select the winning team. While there was a prize, I was just there to have a good time and meet some awesome people. Needless to say, I had a great time.

## My Team

I got to work with some splendid folk from the [Samsung Accelerator](http://samsungaccelerator.com/). Our project idea was a website and android app to track ping pong matches between office employees and a leaderboard for each office. As [Jason](http://samsungaccelerator.com/jason_yau/) had given a talk on Node.JS earlier, we decided to build the backend with Node as a learning exercise. It'd be a simple REST api for the app, with data storage handled by MongoDB, and live updating of the website through Socket.IO. All very simple and straight-forward.

## The Good

Node has an amazing community, and an easy to use package manager. We quickly got started using [Express](https://npmjs.org/package/express) to make our REST api easy to build and our static content even easier. [Mongoose](https://npmjs.org/package/mongoose) made our database persistance equally easy, and [Socket.IO](https://npmjs.org/package/socket.io) was... well actually not great. Regardless, if we needed something done there was a package to help us get there.

## The Bad

Node, like Twisted, is an event based asyncronous framework. To achieve this it uses callbacks like so:

```javascript
doSomething(function(error, result) {
	if(error) {
    	// Handle the error
    } else {
        // Handle the result
    }
})
```

This works fine when one level deep, but what if your callback has to call another asyncronous function with a callback? What if _that_ also has a callback? Your code starts flowing to the right faster than it flows down, and you enter callback hell.

To prevent this, there are a number of libraries that tranform the callback syntax into a chainable sequence. Jason, our Node guru, recommended [Q](https://npmjs.org/package/q). Q introduces promises which, like Twisted's deferreds, allow easily chaining callbacks and error handlers. For example:

```javascript
doSomethingAndReturnAPromise()
.then(function(result) {
	// Do something with the result and return another promise
})
.then(function(result) {
	// Do something with the result of the last callback
})
.catch(function(error) {
	// Uh-oh, one of our three functions broke!
})
```

While they aren't exactly like deferreds, they serve a similar purpose and work rather well. Problem solved, right?

## The Ugly

Not quite. While Q provides promises, no library returns them natively. Which means that every one of those lovely libraries provided by the caring community has to be wrapped in promises manually if you want to avoid callback hell. This negates a substantial portion of the benefit gained by having the libraries in the first place.

## Conclusion

I'm really glad I actually tried Node. I'd been fairly set in my ways as a user of Twisted, and saw no need to switch. Now that I've tried it, I realize that many of my arguments were just plain wrong. For instance, developing in javascript isn't as terrible as I thought it would be since the most frustrating bits are actually messing with the DOM, and there are good libraries to make it easier to write good javascript. While maturity of the event loop is also a concern, it's rather abstract and not something I'm qualified to argue.

What I can say for certain is that the lack of deferreds as a core component of node has led to a critical flow control problem. For now, I'll be sticking with Twisted and it's beautiful inlineCallbacks.