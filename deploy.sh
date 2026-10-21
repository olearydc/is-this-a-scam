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
git archive HEAD index.html sw.js manifest.webmanifest icon-180.png icon-192.png icon-512.png leaflet.html leaflet-qr.png fonts ocr \
  | $SSH $HOST "rm -rf $DIR/new && mkdir -p $DIR/new && tar -x -C $DIR/new && chmod -R a+rX $DIR/new \
      && cp -a $DIR/new/. $DIR/site/ && rm -rf $DIR/new"
# nginx.conf is mounted as a single file, so overwrite it in place (a new file would not be seen).
git show HEAD:nginx.conf | $SSH $HOST "cat > $DIR/nginx.conf \
  && C=\$(docker ps -q | xargs docker inspect --format '{{.Id}} {{range .Mounts}}{{.Source}} {{end}}' | grep /home/deploy/$DIR/site | cut -d' ' -f1) \
  && docker exec \$C nginx -t && docker exec \$C nginx -s reload"
echo "Published: https://isthisascam.selfdestruct.online/"
