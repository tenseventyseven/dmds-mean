#!/bin/sh

# Run this as root if MongoDB doesn't shut down properly
systemctl stop dmds-mean
/usr/bin/mongod --dbpath /var/lib/mongodb/ --repair
chown -R mongodb: /var/{log,lib}/mongodb/
systemctl start dmds-mean
