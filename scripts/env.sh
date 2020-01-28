#!/bin/bash
# script to set up environment on mac

which -s brew
if [[ $? != 0 ]] ; then
    # Install Homebrew
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
else
    echo "Brew already installed"
    brew update
fi

# install the stuff you need to edit the docs

brew install git
brew install bash-completion
brew cask install atom

# install atom packages which make markdown easy
apm install language-markdown markdown-preview-plus minimap sort-selected-elements wordcount markdown-table-editor markdown-toc

# install stuff you need to run the docs locally

xcode-select --install

brew install ruby
brew install node
brew install yarn

gem update --system

version=$(gem --version)
echo $version
if [[ $version < 2.5.0 ]] ; then
    echo "version outdated, please install using sudo"
else
    echo "gem version $version already installed"
fi

gem install bundler:2.1.2 --user-install
