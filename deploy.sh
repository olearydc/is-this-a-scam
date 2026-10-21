#!/bin/sh
# Publishes the committed version of the site to the Coolify server.
# The nginx container (a Docker Compose service in Coolify) serves these files,
# so the change is live straight away. Run from the repo folder:  sh deploy.sh
set -e
KEY="$HOME/.ssh/self_destruct_hetzner"
HOST="deploy@159.195.243.30"
DIR="sites/is-this-a-scam"
SSH="ssh -i $KEY -o IdentitiesOnly=yes -o BatchMode=yes"

node tests/run-tests.js | tail -1
git archive HEAD index.html sw.js manifest.webmanifest icon-180.png icon-192.png icon-512.png leaflet.html leaflet-qr.png stats.html fonts ocr \
  | $SSH $HOST "rm -rf $DIR/new && mkdir -p $DIR/new && tar -x -C $DIR/new && chmod -R a+rX $DIR/new \
      && cp -a $DIR/new/. $DIR/site/ && rm -rf $DIR/new"
# Usage counter: the tally folder, the script that turns it into stats.json, and its 10-minute schedule.
git show HEAD:tools/stats.py | $SSH $HOST "cat > $DIR/stats.py && chmod +x $DIR/stats.py && mkdir -p $DIR/counts && chmod 777 $DIR/counts \
  && (crontab -l 2>/dev/null | grep -v 'is-this-a-scam/stats.py'; echo '*/10 * * * * /usr/bin/python3 /home/deploy/$DIR/stats.py') | crontab - \
  && /usr/bin/python3 $DIR/stats.py"
# Known scam websites: the script that builds site/scamlinks/ (generated on the server, never committed;
# the copy step above only adds files to site/, so it is not deleted) and its 6-hour schedule.
git show HEAD:tools/scamlinks.py | $SSH $HOST "cat > $DIR/scamlinks.py && chmod +x $DIR/scamlinks.py \
  && (crontab -l 2>/dev/null | grep -v 'is-this-a-scam/scamlinks.py'; echo '17 */6 * * * /usr/bin/python3 /home/deploy/$DIR/scamlinks.py') | crontab - \
  && /usr/bin/python3 $DIR/scamlinks.py"
# nginx.conf is mounted as a single file, so overwrite it in place (a new file would not be seen).
# The counter needs the counts folder mounted in the container; the old config is restored if the test fails,
# so a bad config never reaches a restart.
git show HEAD:nginx.conf | $SSH $HOST "
  C=\$(docker ps -q | xargs docker inspect --format '{{.Id}} {{range .Mounts}}{{.Source}} {{end}}' | grep /home/deploy/$DIR/site | cut -d' ' -f1)
  [ -n \"\$C\" ] || { echo 'nginx container not found'; exit 1; }
  docker exec \$C test -d /var/log/counts || { echo 'Add the counts volume to the compose file in Coolify first (see PROJECT-NOTES.md)'; exit 1; }
  cp $DIR/nginx.conf $DIR/nginx.conf.bak && cat > $DIR/nginx.conf
  if docker exec \$C nginx -t; then docker exec \$C nginx -s reload; else cat $DIR/nginx.conf.bak > $DIR/nginx.conf; echo 'nginx config test failed; old config restored'; exit 1; fi"
echo "Published: https://isthisascam.selfdestruct.online/"
