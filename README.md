## LogStream

A visually pleasing way to show log entries in real time. It's not meant to be a way to look through logs, but to show new log entries in a nice way. It is not suitable for logs where new entries are added more often than about every five seconds.

Personally I use it fullscreen on a retired iPad to visualize logs that shows the usage of my apps.

### Demo

* [Click here to see a demo](http://www.olejon.net/code/logstream/app/?stream=http%3A%2F%2Fwww.olejon.net%2Fcode%2Flogstream%2Fstream%2F&interval=6&timer=true)

The demo checks a JSON file for changes every six seconds. The data is random. In a real life scenario there won't necessarily be new data every six seconds. The animation is only shown when there's new data.

### How to set up

LogStreamer is very easy to set up.

#### On the server side

The server must serve a URL with JSON output in this format:

```
{
	"stream":
	{
		"time":"2014-01-01 12:00:00",
		"first key":"first value",
		"second key":"second value",
		"third key":"third value"
	}
}
```

**Note:** You must serve the output as [JSONP](http://en.wikipedia.org/wiki/JSONP). [Click](http://www.olejon.net/code/logstream/stream/php.txt) here to view the server side PHP code used for the demo.

The only required key is `time`. You can use whatever format you like, but it should at least include seconds. The time is compared to the previous time, and if it has changed, the new data is shown.

If you want the fancy IP address information shown in the demo, all you have to do is include a key called `ip` with a valid IP address as value.

#### On the client side

LogStreamer can be run directly from the cloud (also called my server). All you have to do is go to this URL:

`http://www.olejon.net/code/logstream/app/?stream={URL}&interval={integer}&timer={boolean}`

As you can see, you must provide three arguments:

```
stream = URL encoded URL to the JSON output (do not include "callback" argument for JSONP)
interval = How often to refresh in seconds
timer = Set to "true" to show the timer, "false" otherwise
```

Example:

`http://www.olejon.net/code/logstream/app/?stream=http%3A%2F%2Fwww.olejon.net%2Fcode%2Flogstream%2Fstream%2F&interval=6&timer=true`

This is the URL to the demo, so the demo gets its JSON data from `http://www.olejon.net/code/logstream/stream/`. 