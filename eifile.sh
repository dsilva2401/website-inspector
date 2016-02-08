echo -e "Installing phantomjs\n"
chmod +x install_phantomjs.sh
sudo ./install_phantomjs.sh

echo -e "Installing npm dependencies..\n"
npm install

echo -e "Installing bower dependencies\n"
bower install
