#xcpgameweb
# build a production server

# Set up a micro instance:

# Use this is running out of room
sudo dd if=/dev/zero of=/var/swap bs=2048 count=524288
sudo chmod 600 /var/swap
sudo mkswap /var/swap
sudo swapon /var/swap
sudo apt upgrade

# dependencies

Need to install git and sqlite3
