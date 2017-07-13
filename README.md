# Sonification of NYC Motor Vehicle Collision Data

Data disassociation is the state of information numbness caused by the deluge by figures and statistics in our daily lives. This web app attempts to remedy said disassociation by giving sound to the lived experiences behind a spreadsheet.

Specifically, it is a sonification of the Motor Vehicle Collision data available on [NYC’s OpenData portal](https://opendata.cityofnewyork.us/) for a single day.

The web application plays a collision sound for each collision event in the 24-hour period, compressed into roughly 3 minutes. Sounds are randomly selected per event, so each playback is unique. The sounds are gathered from dashcam and security footage of collisions, but are not specific to the collisions they represent.

Sounds are spatialized as though the listener were in the center of Manhattan and all of NYC was within hearing distance.

The project is built using the Web Audio API stereo panner, D3, Python (Pandas) for some minimal data scrubbing and a bit of math to spatialize the data.

Unfortunately, while some features of the Web Audio API enjoy broad support amongst browsers, the stereo panner does not, so for now this remains a desktop Chrome & Firefox only experience.

The Web Audio API features a very thorough [PannerNode](https://developer.mozilla.org/en-US/docs/Web/API/PannerNode) that can reliably spatialize 3D positioning, but it was a bit heavy for the needs of this project. It's still a great resource for others looking to spatialize sounds, though.

The project was originally made for an exhibition at [Anyway's Here's the Thing in Brooklyn](http://anywaysnyc.com/), as part of Parsons' Sounds & Instrument's course with Jesse Harding (2017). The original installation output sounds from two computers to four speakers while the clock display was projected. It has since been modified to work with headphones and a single website.
