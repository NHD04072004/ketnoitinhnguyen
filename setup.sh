sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu jammy stable"
sudo apt update
apt-cache policy docker-ce
sudo apt install docker-ce

# Install docker compose
sudo curl -L "https://github.com/docker/compose/releases/download/2.28.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

curl -sL https://deb.nodesource.com/setup_18.x | sudo bash -
npm install -g @budibase/cli