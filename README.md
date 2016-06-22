# hyperaudio-lite
Hyperaudio Lite - a Hypertranscript Viewer

Lightweight JavaScript for viewing Hypertranscripts

## Usage

This viewer assumes you have a transcript container element containing `<p>` elements containing words wrapped in `<a data-m="12345">` elements.  The `data-m` value there is a start time within the media file in milliseconds, which is typically what you get from processing services, even though JavaScript and HTML5 work in seconds for this.

This viewer also assumes you have CSS defining an `active` class for your `p` and `a` elements, which unintuitively defines what those elements look like before their words have been reached in the media (e.g. if the transcript is greyed out normally, and only becomes visible once the words are being said or have already been said, the grey color is your `active` class).

Given those things, you include `hyperaudio-lite.js`, you init it after your transcript has loaded with the names of your transcript and media elements, and as the media plays, the transcript will update.  The minimum serviceable HTML looks like this:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>HA - Lite</title>
  <style>
    a { cursor: pointer; } 
    .active ~ a, p.active ~ p a { color: gray; };
  </style>
  <script src="hyperaudio-lite.js"></script>
</head>
<body>

<audio id="interview" src="http://hyperaud.io/lab/halite/interview.mp3" type="audio/mpeg" controls></audio>

<div id="transcript">
<p><a data-m="20">Hi </a><a data-m="400">and </a><a data-m="520">welcome </a><a data-m="840">to </a><a data-m="940">INSIGHT </a><a data-m="1260">intercom </a><a data-m="1690">today </a><a 
data-m="1880">I'm </a><a data-m="2010">joined </a><a data-m="2260">by </a><a data-m="2420">Sam </a><a data-m="2680">Mills </a><a data-m="2900">You </a><a data-m="3030">look </a><a data-m="3340">who 
</a><a data-m="3480">is </a><a data-m="3870">a </a><a data-m="4200">writer </a><a data-m="4700">and </a><a data-m="4980">founder </a><a data-m="5300">of </a><a data-m="5470">user </a><a 
data-m="5750">on </a><a data-m="5950">board </a><a data-m="6360">. </a><a data-m="7020">Thanks </a><a data-m="7180">so </a><a data-m="7250">much </a><a data-m="7400">for </a><a data-m="7590">joining 
</a><a data-m="7920">us </a><a data-m="8270">. </a></p>
<p><a data-m="8390">It </a><a data-m="8490">is </a><a data-m="8660">an </a><a data-m="8790">absolute </a><a data-m="9210">pleasure </a><a 
data-m="9510">to </a><a data-m="9580">be </a><a data-m="9720">here </a><a data-m="10800">. </a><a data-m="11280">So </a><a data-m="11630">I </a><a data-m="11700">believe </a><a data-m="12310">most 
</a><a data-m="12540">of </a><a data-m="12600">our </a><a data-m="12670">readers </a><a data-m="12980">be </a><a data-m="13100">pretty </a><a data-m="13290">familiar </a><a data-m="13790">a </a><a 
data-m="13870">lot </a><a data-m="14040">of </a><a data-m="14120">your </a><a data-m="14250">work </a><a data-m="14740">. </a></p>
<p><a data-m="15040">You've </a><a data-m="15410">done </a><a 
data-m="15580">a </a><a data-m="15670">lot </a><a data-m="15870">of </a><a data-m="15970">Tara </a><a data-m="16230">downs </a><a data-m="16500">of </a><a data-m="16620">money </a><a 
data-m="16880">money </a><a data-m="17180">money </a><a data-m="17500">popular </a><a data-m="18090">products </a><a data-m="19240">spending </a><a data-m="19710">exactly </a><a data-m="20190">had 
</a><a data-m="20420">a </a><a data-m="21600">on </a><a data-m="21800">board </a><a data-m="22040">new </a><a data-m="22250">users </a><a data-m="24090">basically </a><a data-m="24490">achieve </a><a 
data-m="24840">their </a><a data-m="24940">business </a><a data-m="25300">goals </a><a data-m="26330">to </a><a data-m="26490">get </a><a data-m="26640">straight </a><a data-m="27130">into </a><a 
data-m="27400">it </a><a data-m="27580">. </a></p>
</div>

<script>
hyperaudiolite.init('transcript', 'interview');
</script>

</body>
</html>
```

The `index.html` included in the repo is more complicated:
* There's `remy-polyfill-classList.js`, I guess in case you're a browser without classList support but with HTML5 audio, from https://github.com/remy/polyfills, licensed MIT.
* There's `velocity-min.js`, to support auto-scrolling the transcript, from https://github.com/julianshapiro/velocity, licensed MIT.
* And there's `reqwest.js`, to load a hypertranscript over XMLHTTPRequest, replacing code originally included in `hyperaudio-lite.js`, but which didn't seem in the spirit of "light", from https://github.com/ded/reqwest, licensed MIT.

## Changes in this repo

* Made Velocity optional
* Replaced the XMLHTTPRequest transcript loader with an external library
* Swapped the query string start/duration parameters for fragment start/end parameters, which allow a static hyperaudio transcript to be hosted on an object store
  * Specify `#start=X`, where X is a value in seconds, to skip to a portion of the media
  * Specify `#start=X&end=Y`, where X and Y are values in seconds, to excerpt a portion of the media
* Fixed an issue when the media file file was longer than the transcript

## A note on testing

Seeking within media files requires an HTTP server that supports range requests.  If you're testing with `python -m SimpleHTTPServer`, it will fail intermittently.  https://github.com/smgoller/rangehttpserver supports range requests and can be used instead.

## Alternatives

There isn't anything out-of-the-box, but I have concerns about the performance of this code with large transcripts, so you might consider rolling your own using Popcorn.js or another alternative:

* The main [hyperaud.io](http://hyperaud.io/) site has had email problems resulting in no way to create new accounts or recover old ones for quite some time, now.  Its [hyperaudio.js](https://github.com/hyperaudio/hyperaudio-pad) assumes transcripts and media content served from an API server in an undocumented JSON format, and assumes integrated editing, remixing, and playback functionality, without providing a simple way to construct a lightweight viewer.  Many of the third-party hypertranscript examples hosted use older or different sources, but you might be able to repurpose the main Hyperaudio Pad JS.
* http://johndyer.name/html5-audio-karoke-a-javascript-audio-text-aligner/
* https://www.codepunker.com/blog/sync-audio-with-text-using-javascript
* https://github.com/westonruter/html5-audio-read-along
* http://stackoverflow.com/questions/10743683/synchronize-and-highlight-html-text-to-audio
* http://happyworm.com/blog/2010/12/05/drumbeat-demo-html5-audio-text-sync/
* https://gist.github.com/maboa/5396358
  * http://happyworm.com/blog/2011/05/04/further-experimentation-with-hyper-audio/
  * https://github.com/maboa/hyperaudiopad/blob/master/js/popcorn.transcript.js