## LogStream

A visually pleasing way to view log entries in "real time". It's not meant to be a way to look through logs, but to show new log entries in a nice way. It's not suitable for logs where new entries are added more often than about every five seconds.

LogStream is inspired by Google's Material Design, and adapts to different screen sizes.

Personally I use it fullscreen on a retired iPad to visualize logs that show the usage of some apps.

### Demo

* [Click here to see a demo](https://www.olejon.net/code/logstream/?page=demo)

The demo checks a JSON file for changes every 8 seconds (the interval can be configured). The data is only for the demo. In a real life scenario there won't necessarily be new data every six seconds. 

The animation is only shown when there's new data.

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

**Note:** You must serve the output as [JSONP](https://en.wikipedia.org/wiki/JSONP). [Click here](https://gist.github.com/olejon/637e329309edb8a1c8d4) here to view the server side PHP code used for the demo.

The only required key is `time`. You can use whatever format you like, but it should at least include seconds. The time is compared to the previous time, and if it has changed, the new data is shown.

---

#### Geolocation

If you want the IP address information shown in the demo, all you have to do is include a key called `ip` with a valid IP address as value.

**Note:** Current script on my server uses an API that only supports IPv4 addresses. [Direct link the JavaScript code to use another API](https://github.com/olejon/logstream/blob/703fd14ce8b8a0f137c42e1d1fb53988c4a01014/logstream/js/main.js#L187).

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

If LogStream is added to the home screen, desktop or mobile, at least if using Chrome/Chromium or Safari, they will add a shortcut so LogStream is showed as if it was a native app.

---

#### Privacy

Nothing is logged.
