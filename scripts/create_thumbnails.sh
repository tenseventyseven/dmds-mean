#!/bin/sh

# Create thumbnail versions of ID photos
cd /opt/dmds-mean/photos
for f in *.jpg; do
	# if thumbnail doesn't already exist
	if [ ! -f thumbnails/$f ]; then
		convert $f -resize 300x300\> thumbnails/$f
	fi
done
