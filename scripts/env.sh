#!/bin/bash
# script to set up environment on mac heavily relying on brew

which -s brew
if [[ $? != 0 ]] ; then
    # Install Homebrew
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
else
    echo " ✔ Brew already installed"
    echo " Updating Brew"
    brew update
fi

# install the stuff you need to edit the docs
# yes, I realize you have to have git to get this usually,
# but there's a possible world in which we send someone this script
# to configure their env before they get the repo set up
which -s git
if [[ $? != 0 ]] ; then
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
  open -a Atom
  which -s atom
  if [[ $? != 0 ]] ; then
      echo " Atom installed, but command shell not installed. Please click Atom > Install Shell Commands from in the Atom application."
  else
    # install atom packages which make markdown easy
    echo "Installing useful Atom packages"
    apm install language-markdown markdown-preview-plus minimap atom-slugify sort-selected-elements wordcount markdown-table-editor markdown-toc
  fi
else
    echo " ✔ Atom already installed"
    # install atom packages which make markdown easy
    echo "Installing useful Atom packages"
    apm install language-markdown markdown-preview-plus minimap atom-slugify sort-selected-elements wordcount markdown-table-editor markdown-toc
fi


# install stuff you need to run the docs locally

which -s xcode-select
if [[ $? != 0 ]] ; then
  xcode-select --install
else
  echo " ✔ Xcode command line tools already installed"
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

brew install ruby

which -s bundler
if [[ $? != 0 ]] ; then
  gem install -n /usr/local/bin bundler:2.1.2
  gem install bundler:2.1.2 --user-install
  echo " ✔ Bundler installed"
else
    echo " ✔ Bundler already installed"
fi

echo " Updating your Gem installation. Please enter your password to sudo."
sudo gem update --system -n /usr/local/bin
echo "Gem version " $(gem --version) "installed"

# can't get this working because comparing version strings is complicated.
# which -s gem
# if [[ $? != 0 ]] ; then # check if gem is installed
#   version=$(gem --version) # version check
#   echo "Found a version of Gem installed. Checking version."
#   if [[ $version < 2.5.0 ]] ; then
#       echo "Gem version outdated, please install using \`sudo gem update --system\`"
#     else
#     " ✔ Gem version $version already installed"
#   fi
# else
#   gem update --system # try updating, without sudo
#   echo "Attempting to install Gem."
#   version=$(gem --version)  # version check
#   if [[ $version < 2.5.0 ]] ; then
#       echo "Gem version outdated, please install using \`sudo gem update --system\`"
#     else
#       " ✔ Gem version $version already installed"
#   fi
# fi
