# DMDs admin/checkin

DMDs admin/checkin program using the MEAN stack.  Written in early 2017.

### Prerequisites

```
MongoDB
Node.js
npm
```

### Installing

Install to /opt
```
# cd /opt
# git clone https://github.com/tenseventyseven/dmds-mean.git
# cd dmds-mean
# mkdir backups
# mkdir photos
# npm install -g bower
# npm install
# bower install
```

## Deployment

To run server
```
# cd /opt/dmds-mean
# node server.js
```

Using systemd to run on startup
```
# cp /opt/dmds-mean/scripts/dmds-mean.service /usr/lib/systemd/system
# systemctl enable dmds-mean.service
# systemctl start dmds-mean.service
```
