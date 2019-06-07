This is what I've used to generate the sources
<pre>
---------------------------
trying 3 seconds video with information ahead
ffmpeg -hide_banner -strict experimental -y -t 3 -f lavfi  -i color=c=green:s=320x180  -r 25 -movflags "+faststart"  -an -pix_fmt yuv420p -level "3.0" -c:v libx264    -tune stillimage -profile:v "baseline"  video_h264_3seconds_faststart.mp4
ffmpeg -hide_banner -strict experimental -y -t 3 -f lavfi  -i color=c=green:s=320x180  -r 25 -movflags "+faststart"  -an -pix_fmt yuv420p -level "3.0" -c:v libvpx-vp9                                         video_vp9_3seconds_faststart.webm 
ffmpeg -hide_banner -strict experimental -y -t 3 -f lavfi  -i color=c=green:s=320x180  -r 25 -movflags "+faststart"  -an -pix_fmt yuv420p -level "3.0" -c:v libvpx                                             video_vp8_3seconds_faststart.webm 
ffmpeg -hide_banner -strict experimental -y -t 3 -f lavfi  -i color=c=green:s=320x180  -r 25 -movflags "+faststart"  -an -pix_fmt yuv420p -level "3.0" -c:v libtheora                                          video_ogv_3seconds_faststart.ogv      
</pre>

for base64 I've used https://github.com/eladkarako/ConsoleBase64/tree/master/NodeJS (simply dump all in the folder and run <code>_start_all.cmd</code>.