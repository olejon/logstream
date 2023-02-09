## LogStream

A visually pleasing way to view log entries in "real time". It's not meant to be a way to look through logs, but to show new log entries in a nice way. It's not suitable for logs where new entries are added more often than about every 5-10 seconds, depending on how JSON keys you serve.

LogStream is inspired by Google's Material Design, and adapts to different screen sizes.

* Personally I use it fullscreen on a retired iPad to visualize logs that show the usage of some apps
* You can of course show logs from various log sources in one instance of LogStream, like both a Webapp and its API, since LogStream reads whatever it gets from a JSON file served as JSONP (see more below)

### Demo

* [Click here to see a demo](https://www.olejon.net/code/logstream/app/?stream=https%3A%2F%2Fwww.olejon.net%2Fcode%2Flogstream%2Fstream%2F&interval=10)

The demo checks a JSON file for changes every 10 seconds (the interval can be configured). The data is only for the demo. In a real life scenario it's unlikely there'll be new data every 10 seconds. 

**Note:** So, logically the animation is only shown when there's new data.

### How to set up

LogStream is very easy to set up.

#### On the server side

The server must serve a URL with JSON output in this format:
```
{
	"stream":
	{
		"time":"2018-01-01 12:00:00",
		"first key":"first value",
		"second key":"second value",
		"third key":"third value"
	}
}
```

**Notes:**
* You must serve the output as [JSONP](https://www.w3schools.com/js/js_json_jsonp.asp)
* [Click here](https://www.olejon.net/code/logstream/stream/code.txt) here to view the server side PHP code used for the demo

The only **required JSON key** is `time`. You can use whatever format you like, but it should at least include seconds. The time is compared to the previous time, and if it has changed, the new data is shown.

---

#### Geolocation

If you want the IP address information shown in the demo, all you have to do is include a key called `ip` with a valid IP address as value.

**Note:** My server uses a simple API that only supports IPv4 addresses. You can always change [these JavaScript lines](https://github.com/olejon/logstream/blob/703fd14ce8b8a0f137c42e1d1fb53988c4a01014/logstream/js/main.js#L187-L191) to use something better!

---

#### On the client side

It is easiest to run LogStream directly from my server to always run the latest version. All you have to do is go to this URL:
```
https://www.olejon.net/code/logstream/app/?stream={URL}&interval={INTEGER}
```

As you can see, you must provide two query parameters:

1. `stream` URL encoded URL to your JSON output
2. `interval` How often to check for new data, in seconds

Example:
```
https://www.olejon.net/code/logstream/app/?stream=https%3A%2F%2Fwww.olejon.net%2Fcode%2Flogstream%2Fstream%2F&interval=8
```

This is the URL to the demo, so the demo gets its JSON data from `https://www.olejon.net/code/logstream/stream/?callback=JSONP`.

---

#### Full screen mode

If LogStream is added to the home screen, both desktop or mobile, if using Chrome/Chromium or Safari (mobile only), they will add a shortcut so LogStream is showed as if it was a native app.

---

#### Privacy

Nothing is logged.
