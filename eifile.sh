echo "Installing phantomjs"
chmod +x install_phantomjs.sh
./install_phantomjs

echo "Installing npm dependencies.."
npm install

echo "Installing bower dependencies"
bower install
