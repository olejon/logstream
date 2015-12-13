## LogStream

A visually pleasing way to view log entries in "real time". It's not meant to be a way to look through logs, but to show new log entries in a nice way. It's not suitable for logs where new entries are added more often than about every five seconds.

LogStream is inspired by Google's Material Design, and adapts to different screen sizes.

Personally I use it fullscreen on a retired iPad to visualize logs that show the usage of my apps.

### Demo

* [Click here to see a demo](https://www.olejon.net/code/logstream/?page=demo) (*you may have to disable/whitelist any AdBlock extension for the geolocation to work*)

The demo checks a JSON file for changes every six seconds (the interval can be configured). The data is only for the demo. In a real life scenario there won't necessarily be new data every six seconds. The animation is only shown when there's new data.

### How to set up

LogStream is very easy to set up.

#### On the server side

The server must serve a URL with JSON output in this format:

<pre><code>{
	"stream":
	{
		"time":"2014-01-01 12:00:00",
		"first key":"first value",
		"second key":"second value",
		"third key":"third value"
	}
}</code></pre>

**Note:** You must serve the output as [JSONP](https://en.wikipedia.org/wiki/JSONP). [Click here](https://gist.github.com/olejon/637e329309edb8a1c8d4) here to view the server side PHP code used for the demo.

The only required key is `time`. You can use whatever format you like, but it should at least include seconds. The time is compared to the previous time, and if it has changed, the new data is shown.

---

If you want the fancy IP address information shown in the demo, all you have to do is include a key called `ip` with a valid IP address as value.

---

#### On the client side

LogStream can be run directly from the cloud (also called my server). All you have to do is go to this URL:

<pre><code>https://www.olejon.net/code/logstream/app/?stream={URL}&interval={integer}</code></pre>

As you can see, you must provide two arguments:

1. `stream` URL encoded URL to the JSON output. *Do not include `callback` argument for JSONP*
2. `interval` How often to refresh, in seconds

Example:

<pre><code>https://www.olejon.net/code/logstream/app/?stream=https%3A%2F%2Fwww.olejon.net%2Fcode%2Flogstream%2Fstream%2F&interval=6</code></pre>

This is the URL to the demo, so the demo gets its JSON data from `https://www.olejon.net/code/logstream/stream/`. 
