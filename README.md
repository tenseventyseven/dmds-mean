# Project Title

DMDs admin/checkin program using the MEAN stack.  Written in early 2017.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

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

Alternatively, using systemd to run on startup
```
# cp /opt/dmds-mean/scripts/dmds-mean.service /usr/lib/systemd/system
# systemctl enable dmds-mean.service
# systemctl start dmds-mean.service
```
