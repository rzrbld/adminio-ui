#!/usr/bin/env sh
set -eu

envsubst < /usr/share/nginx/html/env.template > /usr/share/nginx/html/env.js
echo "Angular env:"
cat /usr/share/nginx/html/env.js

envsubst \
    '${NGX_ROOT_PATH}' \
    < /etc/nginx/conf.d/default.template \
    > /etc/nginx/conf.d/default.conf
echo "NGINX Conf:"
cat /etc/nginx/conf.d/default.conf

if [[ $NGX_ROOT_PATH != "/" ]]; then

  sed --in-place \
    's~<base href="/">~<base href="'$NGX_ROOT_PATH'/">~' \
    /usr/share/nginx/html/index.html

  sed --in-place \
    's~root~alias~' \
    /etc/nginx/conf.d/default.conf
fi
echo "index.html base check:"
cat /usr/share/nginx/html/index.html

exec "$@"
