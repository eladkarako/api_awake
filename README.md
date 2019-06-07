<h1>WakeLock, a.k.a <strong>Awake</strong> API</h1>

a combined <br/>
https://github.com/richtr/NoSleep.js <br/>
https://developer.mozilla.org/en-US/docs/Archive/B2G_OS/API/Navigator/requestWakeLock <br/>
and https://w3c.github.io/wake-lock/#examples

<code>NoSleep.js</code> uses a <code>VIDEO</code> playing in the background, <br/>
I've encoded better resources with their meta-data placed in the head of the stream, <br/>
optimized and explicitly set for 25 frames/second. <br/>
for some reason it isn't working on newer versions of Firefox (Android) anymore, is does work for Chrome (Android).

maybe the reason is something in the page structure since https://github.com/eladkarako/emdr (which also switches into full-screen mode) which uses the original NoSleep works sometimes... 

there are two (one since becase obsolete) ways of 'requesting' a wakelock,
non-seems to be working, but at least they are all organised in a way that I could add/remove either, <br/>
in-case one will work..

debugged with https://developer.mozilla.org/en-US/docs/Tools/WebIDE/Troubleshooting
although not very useful since screen is staying ON while debugging.. :|
