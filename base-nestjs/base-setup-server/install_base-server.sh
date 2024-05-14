source ./config.sh

sudo apt-get update -y
sudo apt-get dist-upgrade -y

# Setup swap
# Systems with less than 2 GB RAM - 2 times the amount of RAM.
# Systems with 2 to 8 GB RAM - the same size as the amount of RAM.
# Systems with more than 8 GB RAM - at least 4 GB of Swap.
echo "Start setup swap"
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
if [ -e /etc/fstab ]; then
    # Write content to file /etc/fstab
    echo "/swapfile swap swap defaults 0 0" | sudo tee -a /etc/fstab
else
    echo "File /etc/fstab not found!"
fi
sudo swapon --show
sudo free -h
echo "Done setup swap"

# Hanlde ssh key
echo "Handle ssh-key"
ssh-keygen -t rsa -b 4096 -C "$EMAIL_HANDLE_SSH" -f ~/.ssh/id_rsa -N ""
cat ~/.ssh/id_rsa.pub
echo "Done handle ssh-key"

# Install nodejs & npm
echo "Install nodejs & npm"
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
sudo npm install -g n
sudo n stable
node -v
npm -v
echo "Done install nodejs & npm"

# Install mysql
echo "Install mysql"
sudo apt install -y mysql-server
#sudo mysql_secure_installation
sudo mysql <<EOF
CREATE USER '$DB_USER'@'%' IDENTIFIED WITH mysql_native_password BY '$DB_PASSWORD';
GRANT ALL PRIVILEGES ON *.* TO '$DB_USER'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
CREATE DATABASE $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
EOF
sudo touch /home/ubuntu/backup.sh
sudo mkdir /home/ubuntu/backup
contentFileBackup="
mysqldump -u $DB_USER -p'$DB_PASSWORD' ${DB_NAME} | gzip>/home/ubuntu/backup/$DB_NAME_\$(date +\"%y%m%d_%H%M%S\").sql.gz
find /home/ubuntu/backup -mtime +13 -type f -delete
"
echo "$contentFileBackup" | sudo tee /home/ubuntu/backup.sh
sudo chmod +x /home/ubuntu/backup.sh
(crontab -l ; echo "29 11 * * * /bin/bash /home/ubuntu/backup.sh") | crontab -
echo "Done install mysql"

# Install redis
echo "Install redis"
sudo apt install -y redis
sudo systemctl start redis-server
redis-server --version
echo "Done redis"

# Install mongodb
echo "Install mongodb"
sudo apt-get purge mongodb-org*
sudo rm -r /var/log/mongodb
sudo rm -r /var/lib/mongodb
sudo apt-get install gnupg
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl daemon-reload
sudo systemctl enable mongod
sudo systemctl restart mongod
mongo --version
echo "Done install mongodb"

# Install nginx
echo "Install nginx"
sudo apt-get install -y nginx 
sudo apt-get install -y apache2-utils
htpasswd -c -b /etc/nginx/.htpasswd develop 123456
sudo touch /etc/nginx/conf.d/api.conf
sudo touch /etc/nginx/conf.d/web.conf

configBe="
server {
    server_name $DOMAIN_BE;  
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
"
configFe="
server {
    server_name $DOMAIN_FE;
    # gzip
    gzip on;
    gzip_comp_level 6;
    gzip_vary on;
    gzip_types text/plain text/css application/json application/x-javascript application/javascript text/xml application/xml application/rss+xml text/javascript image/svg+xml application/vnd.ms-fontobject application/x-font-ttf font/opentype;
    root /var/www/html/task-manager-frontend/build;
    index index.html;
    location  ~ ^/(.*)$ {
       auth_basic \"Restricted Content\";
       #auth_basic_user_file /etc/nginx/.htpasswd;
       try_files \$uri /\$1/index.html /index.html;
       auth_basic_user_file /etc/nginx/conf.d/.htpasswd;
    }
}
"
echo "$configBe" | sudo tee /etc/nginx/conf.d/api.conf
echo "$configFe" | sudo tee /etc/nginx/conf.d/web.conf
sudo nginx -t
sudo nginx -s reload
echo "Done install nginx"

# Install pm2
echo "Install pm2"
sudo npm install -g pm2
echo "Done install pm2"

