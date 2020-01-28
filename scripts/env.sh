#!/bin/bash
# script to set up environment on mac heavily relying on brew

which -s brew
if [[ $? != 0 ]] ; then
    # Install Homebrew
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
else
    echo " ✔ Brew already installed"
    brew update -s
fi

# install the stuff you need to edit the docs
which -s git
if [[ $? != 0 ]] ; then
    # Install Homebrew
    brew install git
    echo " ✔ Git installed"
else
    echo " ✔ Git already installed"
fi

brew install bash-completion
echo " ✔ Bash completion installed. Paste the following anywhere in your .bash_profile to activate"
echo "[[ -r \"/usr/local/etc/profile.d/bash_completion.sh\" ]] && . \"/usr/local/etc/profile.d/bash_completion.sh\""

which -s atom
if [[ $? != 0 ]] ; then
  brew cask install atom
else
    echo " ✔ Atom already installed"
fi

# install atom packages which make markdown easy
echo "Installing useful Atom packages"
apm install language-markdown markdown-preview-plus minimap sort-selected-elements wordcount markdown-table-editor markdown-toc

# install stuff you need to run the docs locally

which -s xcode-select
if [[ $? != 0 ]] ; then
  xcode-select --install
else
  echo " ✔ Xcode command line tools already installed"
fi

which -s ruby
if [[ $? != 0 ]] ; then
  brew install ruby
else
    echo " ✔ Ruby already installed"
fi

which -s node
if [[ $? != 0 ]] ; then
  brew install node
else
    echo " ✔ NodeJS already installed"
fi

which -s yarn
if [[ $? != 0 ]] ; then
  brew install yarn
else
    echo " ✔ Yarn already installed"
fi

which -s gem
if [[ $? != 0 ]] ; then # check if gem is installed
  version=$(gem --version) # version check
  echo "Found a version of Gem installed. Checking version."
  if [[ $version < 2.5.0 ]] ; then
      echo "Gem version outdated, please install using \`sudo gem update --system\`"
    else
    " ✔ Gem version $version already installed"
  fi
else
  gem update --system # try updating, without sudo
  echo "Attempting to install Gem."
  version=$(gem --version)  # version check
  if [[ $version < 2.5.0 ]] ; then
      echo "Gem version outdated, please install using \`sudo gem update --system\`"
    else
      " ✔ Gem version $version already installed"
  fi
fi

which -s bundler
if [[ $? != 0 ]] ; then
  gem install bundler:2.1.2 --user-install
  echo " ✔ Bundler installed"
else
    echo " ✔ Bundler already installed"
fi
