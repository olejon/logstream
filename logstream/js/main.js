/*

Copyright 2018 Ole Jon Bjørkum

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see http://www.gnu.org/licenses/.

*/

$(window).on('load', function()
{
	$.ajaxSetup({ cache: false, timeout: 10000 });

	var args = window.location.search.slice(1).split('&');

	config = {};

	for(var i = 0; i < args.length; i++)
	{
		var arg = args[i].split('=');
		config[arg[0]] = arg[1];
	}

	var error = $('div#error > div:first-child');

	if(typeof config.stream == 'undefined' || typeof config.interval == 'undefined')
	{
		error.html('Query parameters missing').parent().show();
		return;
	}

	config['stream'] = decodeURIComponent(config.stream);

	if(!config.stream.match(/^https?:\/\//))
	{
		error.html('URL query parameter must be a valid URL').parent().show();
		return;
	}
	else if(!config.interval.length || isNaN(config.interval) || parseInt(config.interval) < 4)
	{
		error.html('Interval query parameter must be integer > 3').parent().show();
		return;
	}

	config['interval'] = parseInt(config.interval);

	event_transitionend = (Modernizr.prefixed('transition') == 'WebkitTransition') ? 'webkitTransitionEnd' : 'transitionend';

	stream_timeout = null;
	stream_is_updating = false;
	stream_last_time = 0;

	setFabPosition();

	$(window).on('resize', function()
	{
		setFabPosition();
	});

	$(document).on('click', 'a#fab', function(event)
	{
		event.preventDefault();
		playPauseStream();
	});

	getStream();
});

/* Functions */

function getStream()
{
	if(stream_is_updating) return;

	stream_is_updating = true;

	clearTimeout(stream_timeout);

	stream_timeout = setTimeout(function()
	{
		getStream();
	}, config.interval * 1000);

	var card = $('div#card');
	var fab = $('a#fab');

	var separator = (config.stream.match(/\?[^\/]+/)) ? '&' : '?';

	$.getJSON(config.stream+separator+'callback=?', function(data)
	{
		stream_is_updating = false;

		if(typeof data.stream == 'undefined' || typeof data.stream.time == 'undefined')
		{
			alert('ERROR: Could not get stream, or time missing. See the wiki.');
			return;
		}

		var stream = data.stream;

		if(stream.time == stream_last_time) return;

		var html = '<div>'+stream.time+'</div><div>';
		var ip = null;

		for(var key in stream)
		{
			if(key == 'time') continue;

			var value = stream[key];
			var append = '';

			if(key == 'ip' && value.match(/^\d+\.\d+\.\d+\.\d+$/) || key == 'ip' && value.match(/^[\w:]+$/))
			{
				ip = value;
				append = '<div id="ip"><div><div>Location: <span id="location"></span></div><div>Continent: <span id="continent"></span></div></div><div></div></div>';
			}

			html += '<div><h1>'+key.toUpperCase()+'</h1><p>'+value+'</p>'+append+'</div>';
		}

		html += '</div>';

		if(stream_last_time == 0)
		{
			card.html(html).css('visibility', 'visible').addClass('slidein').one(event_transitionend, function()
			{
				getGeoIp(ip);
				fab.addClass('pop');
			});
		}
		else
		{
			card.removeClass('slidein').addClass('slideout').one(event_transitionend, function()
			{
				card.removeClass('slideout');

				setTimeout(function()
				{
					card.html(html).addClass('slidein').one(event_transitionend, function()
					{
						getGeoIp(ip);
						fab.addClass('pop');
					});
				}, 25);
			});
		}

		stream_last_time = stream.time;
	});
}

function playPauseStream()
{
	var fab = $('a#fab');

	if(fab.hasClass('play'))
	{
		fab.removeClass('play').addClass('pause');
		getStream();
	}
	else
	{
		fab.removeClass('pause').addClass('play');
		clearTimeout(stream_timeout);
	}
}

function getGeoIp(ip)
{
	if(ip == null) return;

	var div = $('div#ip');

	div.removeClass('fadein');

	$.getJSON('https://www.olejon.net/code/logstream/api/1/geoip/?ip='+ip+'&callback=?', function(data)
	{
		var continent_name = (typeof data.continent_name == 'undefined' || data.continent_name == 'NA') ? 'Unknown' : data.continent_name;
		var country_code = (typeof data.country_code == 'undefined' || data.country_code == 'NA') ? 'Unknown' : data.country_code.toLowerCase();
		var country_name = (typeof data.country_name == 'undefined' || data.country_name == 'NA') ? 'Unknown' : data.country_name;

		$('span#location').html(country_name);
		$('span#continent').html(continent_name);
		$('div#ip > div:last-child').css('background-image', 'url("https://www.geonames.org/flags/x/'+country_code+'.gif")');

		div.addClass('fadein');
	});
}

function setFabPosition()
{
	var fab = $('a#fab');
	var window_width = $(window).width();

	fab.css('right', '');

	if(window_width >= 1024)
	{
		var card_width = $('div#card').outerWidth();
		var fab_radius = fab.outerWidth() / 2;
		var position = (window_width - card_width) / 4 - fab_radius;

		fab.css('right', position+'px');
	}
}
