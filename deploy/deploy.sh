set -ex

if [ `id -u` -ne 0 ]; then
     sudo $0
    exit 0
fi

apt-get -y update
apt-get -y install nginx
cp /tmp/deploy/nginx.conf /etc/nginx/nginx.conf
rm /usr/share/nginx/html/*
cp -r /tmp/build/* /usr/share/nginx/html/
rm -rf /tmp/deploy
rm -rf /tmp/build
