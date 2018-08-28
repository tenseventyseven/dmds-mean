#!/bin/sh

cd /opt/dmds-mean/photos

# Add jpg extension if missing
for f in *; do
	ext=`echo $f | awk -F . '{print $NF}'`
	if [ "$ext" != "JPG" -a "$ext" != "jpg" -a "$ext" != "thumbnails" ]; then
		# Add file extension
		mv "$f" "${f}.jpg"
	fi
done

# Create thumbnail versions of ID photos
for f in *.jpg *.JPG; do
	# if thumbnail doesn't already exist
	if [ ! -f thumbnails/$f ]; then
		convert $f -resize 300x300\> thumbnails/$f
	fi
done

# Fix permissions to dave:dave
chown -R dave:dave *
