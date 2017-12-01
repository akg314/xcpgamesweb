#xcpgameweb
## How to spin up a new micro instance running xcp.cards API and static files of choice

### 1. Set up a micro instance:
a. Configure instance settings in Google Cloud Console:
- Zone: "us-west"
- Machine type: "micro"
- Boot disk: Debian GNU
- Firewall: allow both http/https
- Networking (under firewall) --> click network interfaces --> External IP: choose one
Press create!
b. SSH into the instance
- defaults to inherit project-wide ssh key shared with google cloud console
- ssh using the corresponding private key to the username found in the project-wide public key

### 2. Configure Box
a. Update debian operating system
```sudo apt-get update
sudo dd if=/dev/zero of=/var/swap bs=2048 count=524288
sudo chmod 600 /var/swap
sudo mkswap /var/swap
sudo swapon /var/swap
sudo apt upgrade
```
b. Install latest version of go
i. Download go package, unzip, and move to GOROOT directory
```wget https://storage.googleapis.com/golang/go1.9.2.linux-amd64.tar.gz
sudo tar -xvf go1.9.2.linux-amd64.tar.gz
sudo mv go /usr/local
```
ii. Edit ~/.profile so go is accessible in path. 
Add this line to the end:
`export PATH=$PATH:/usr/local/go/bin:/home/snoopy/go/bin`

c. Install git, sqlite3, gcc
```
sudo apt-get install git
sudo apt-get install sqlite3
sudo apt-get install sqlite3
sudo apt-get install gcc
sudo apt-get install dtach
```
### 3. Set up xcpcards server
a. Cache git credentials and clone xcpcards server repo
```git config --global credential.helper cache
git config --global credential.helper 'cache timeout=3600000'
git clone https://github.com/alexmat/xcpcards.git
```

b. Follow README.md for the server to set it up
After `go get -d ./...`, run `rm -rf ~/xcpcards`
i. Clone collection databases into ~/go/src/github.com/alexmat
```
git clone https://github.com/alexmat/sogdb.git
git clone https://github.com/alexmat/aordb.git
```
**Before creating databases, initialize data folder**
```
mkdir data
touch data/aorcards.db
touch data/sogcards.db
```
ii. Verify that server works on 8080
c. Get things ready to run server as root
```sudo -s
cd
vim .bashrc
```
Add to the end of the file:
```
export PATH=$PATH:/usr/local/go/bin:/home/snoopy/go/bin
export GOROOT=/home/snoopy/go
```
Then:
```
source .bashrc
go env
```
to check if it worked.
### 4. Start server in background with dtach and serve static files

### 5. Enable https
a. Install certbot
`sudo apt-get install certbot`
`sudo certbot certonly`
Then walk through the interactive prompts (choose to keep server running)

### 6. Run xcpcards server with paths to keys

