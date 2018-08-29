#!/bin/sh

cd /opt/dmds-mean/photos

# Create thumbnail versions of ID photos
for f in *; do
	if [ -f $f ]; then
		# if thumbnail doesn't already exist
		if [ ! -f thumbnails/$f ]; then
			convert $f -resize 300x300\> thumbnails/$f
		fi
	fi
done

# Fix permissions to dave:dave
chown -R dave:dave *
