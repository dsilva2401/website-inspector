echo "Installing phantomjs"
chmod +x install_phantomjs.sh
sudo ./install_phantomjs.sh

echo "Installing npm dependencies.."
npm install

echo "Installing bower dependencies"
bower install
