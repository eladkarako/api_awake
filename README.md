Trying to implement a combined solution to prevent screen dimming/turning-off, 
mostly on mobile but also for desktop devices, 
for both Chrome and Firefox.


<hr/>

For Firefox the solution does not seems to be working too well, 
the 'method1' way uses a background playing video (works in Chrome, used to work in Firefox as well when screen was full for not anymore for some reason).

'method2' and 'method3' uses 'wakelock' API as provided in https://developer.mozilla.org/en-US/docs/Archive/B2G_OS/API/Navigator/requestWakeLock and https://w3c.github.io/wake-lock/#examples


debugging was quick difficult to managed until I've came across a https://developer.mozilla.org/en-US/docs/Tools/WebIDE/Troubleshooting
which is the proper way to debug an Android device (still uses some kind ADB in the background..).