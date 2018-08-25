# DMDs admin/checkin

DMDs admin/checkin program using the MEAN stack.  Written in early 2017.

## Prerequisites

```
MongoDB
Node.js
npm
grive (for automated backup to Google Drive)
```

### Installing

Install to `/opt`
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

To run server:
```
# cd /opt/dmds-mean
# node server.js
```

To use `systemd` to run on startup copy `scripts/dmds-mean.service` to `/usr/lib/systemd/system` then run:
```
# systemctl enable dmds-mean.service
# systemctl start dmds-mean.service
```

## Miscellanous

### ID photos

For each new student ID, remember to take their photo and save it as `photos/[student ID].jpg`

### ID thumbnails

Run `scripts/create_thumbnails.sh` to generate 300x300 px thumbnails for faster ID photo loading.

### Automated backups

Copy entries in `scripts/crontab` for automated daily backups of database and application data.

### Repair MongoDB

If database isn't shutdown cleanly, run `scripts/monogdb_repair.sh` as `root` to repair.
