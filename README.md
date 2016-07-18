# hyperaudio-lite

hyperaudio-lite - lightweight JavaScript for presenting hypertranscripts

## Usage

(This is a complete rewrite from the original.  It should be a drop-in replacement, except for the CSS.)

Given:

- an HTML5 media element,
- a transcript container element,
- elements with `data-m` attributes specifying a media time value in milliseconds (e.g. `data-m="10000"` for 10 seconds in),
- a CSS `.unread` style,
- `hyperaudio-lite.js` included via a `<script>` tag,
- calling `hyperaudiolite.init('transcript-element-id', 'media-element-id');` after the transcript and media elements are on the page,

then, this JavaScript will:

- add the `.unread` class to every element with a `data-m` attribute;
- as the media file plays, remove the `.unread` class on any elements before the current time, and apply a `.read` class;
- listen for any clicks within the transcript container, and set the media file time to the time of the element being clicked on.

That's it.  No scrolling, no excerpting, no media fragments, no restrictions on what elements work.  Works on any elements, as long as they have `data-m` attributes.

(There's some initialization code that assumes groups of elements with `data-m` attributes are ultimately wrapped in `<p>`, `<figure>`, or `<ul>` elements, but it's for a future potential optimization and doesn't currently do anything.)

This has been tested and works reliably on media files lasting tens of minutes and transcripts with thousands of words.  This code is currently in production use.

The minimum serviceable HTML looks like this:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>HA - Lite</title>
  <style>
    .unread { color: gray; }
  </style>
  <script src="hyperaudio-lite.js"></script>
</head>
<body>

<audio id="interview" src="http://hyperaud.io/lab/halite/interview.mp3" type="audio/mpeg" controls></audio>

<div id="transcript">
<p><span data-m="20">Hi </a><a data-m="400">and </a><a data-m="520">welcome </a><a data-m="840">to </a><a data-m="940">INSIGHT </a><a data-m="1260">intercom </a><a data-m="1690">today </span><span data-m="1880">I'm </a><a data-m="2010">joined </a><a data-m="2260">by </a><a data-m="2420">Sam </a><a data-m="2680">Mills </a><a data-m="2900">You </a><a data-m="3030">look </a><a data-m="3340">who </span><span data-m="3480">is </a><a data-m="3870">a </a><a data-m="4200">writer </a><a data-m="4700">and </a><a data-m="4980">founder </a><a data-m="5300">of </a><a data-m="5470">user </span><span data-m="5750">on </a><a data-m="5950">board </a><a data-m="6360">. </a><a data-m="7020">Thanks </a><a data-m="7180">so </a><a data-m="7250">much </a><a data-m="7400">for </a><a data-m="7590">joining </span><span data-m="7920">us </a><a data-m="8270">. </span></p>

<ul>
<li><span data-m="8390">It </a><a data-m="8490">is </a><a data-m="8660">an </a><a data-m="8790">absolute </a><a data-m="9210">pleasure </span></li>
<li><span data-m="9510">to </a><a data-m="9580">be </a><a data-m="9720">here </a><a data-m="10800">. </a><a data-m="11280">So </a><a data-m="11630">I </a><a data-m="11700">believe </a><a data-m="12310">most </span></li>
<li><span data-m="12540">of </a><a data-m="12600">our </a><a data-m="12670">readers </a><a data-m="12980">be </a><a data-m="13100">pretty </a><a data-m="13290">familiar </a><a data-m="13790">a </span></li>
<li><span data-m="13870">lot </a><a data-m="14040">of </a><a data-m="14120">your </a><a data-m="14250">work </a><a data-m="14740">. </span></li>
</ul>

<p><span data-m="15040">You've </a><a data-m="15410">done </span><span data-m="15580">a </a><a data-m="15670">lot </a><a data-m="15870">of </a><a data-m="15970">Tara </a><a data-m="16230">downs </a><a data-m="16500">of </a><a data-m="16620">money </span><span data-m="16880">money </a><a data-m="17180">money </a><a data-m="17500">popular </a><a data-m="18090">products </a><a data-m="19240">spending </a><a data-m="19710">exactly </a><a data-m="20190">had </span><span data-m="20420">a </a><a data-m="21600">on </a><a data-m="21800">board </a><a data-m="22040">new </a><a data-m="22250">users </a><a data-m="24090">basically </a><a data-m="24490">achieve </span><span data-m="24840">their </a><a data-m="24940">business </a><a data-m="25300">goals </a><a data-m="26330">to </a><a data-m="26490">get </a><a data-m="26640">straight </a><a data-m="27130">into </span><span data-m="27400">it </a><a data-m="27580">. </span></p>
</div>

<script>
hyperaudiolite.init('transcript', 'interview');
</script>

</body>
</html>
```

There is absolutely no polyfilling or browser feature testing being done.  `querySelectorAll`, `addEventListener` and HTML5 audio/video are probably the things to check for if you care about those sorts of things.

I've successfully used JoshData's `Aligner.java` to generate transcript timings using CMU Sphinx: https://github.com/JoshData/cmusphinx-alignment-example

## Future work

- Adding optional playback controls
- Adding auto-scrolling through Velocity.js
- Adding media fragments support
- Adding an example where a large transcript gets remotely loaded via JavaScript
- Adding an example with full browser feature detection and polyfilling
- Adding a detailed walkthrough of using `Aligner.java`

## A note on testing

Seeking within media files requires an HTTP server that supports range requests.  If you're testing with `python -m SimpleHTTPServer`, it will fail intermittently.  https://github.com/smgoller/rangehttpserver supports range requests and can be used instead.

## Alternatives

There isn't anything else that's this flexible out-of-the-box, but here are some other things out there:

* The original [hyperaudio-lite](https://github.com/hyperaudio/hyperaudio-lite) this was forked from, which requires very specific elements to be used, and was undocumented at the time of my fork (see [this commit in my tree](https://github.com/vitorio/hyperaudio-lite/tree/0467ef6ed8de57a1a3067cb808e2c96c757a76af) for a documented, working version).
* [hyperaud.io](http://hyperaud.io/) allows you to upload media, create, and publish hypertranscripts, with the assumption that media is available for others to reuse and remix.  Its [hyperaudio.js](https://github.com/hyperaudio/hyperaudio-pad) assumes transcripts and media content served from an API server in an undocumented JSON format, and assumes integrated editing, remixing, and playback functionality, without providing a simple way to construct a lightweight viewer.  Many of the third-party hypertranscript examples hosted use older or different sources, but you might be able to repurpose the main Hyperaudio Pad JS.
* [Trint](https://trint.com) is a commercial service which allows private uploading and editing of media content with a very nice transcript alignment editor and integrated machine transcription.
* http://johndyer.name/html5-audio-karoke-a-javascript-audio-text-aligner/
* https://www.codepunker.com/blog/sync-audio-with-text-using-javascript
* https://github.com/westonruter/html5-audio-read-along
* http://stackoverflow.com/questions/10743683/synchronize-and-highlight-html-text-to-audio
* http://happyworm.com/blog/2010/12/05/drumbeat-demo-html5-audio-text-sync/
* https://gist.github.com/maboa/5396358
  * https://gist.github.com/maboa/5387390
  * http://happyworm.com/blog/2011/05/04/further-experimentation-with-hyper-audio/
  * https://github.com/maboa/hyperaudiopad/blob/master/js/popcorn.transcript.js
* https://gist.github.com/maboa/5397195

## Public domain

hyperaudio-lite - lightweight JavaScript for presenting hypertranscripts

Written in 2016 by [Vitorio Miliano](http://vitor.io/).

To the extent possible under law, the author has dedicated all copyright and related and neighboring rights to this software to the public domain worldwide.  This software is distributed without any warranty.

You should have received a copy of the CC0 Public Domain Dedication along with this software.  If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
