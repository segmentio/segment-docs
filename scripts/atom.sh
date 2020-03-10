#!/bin/bash
# script to set up atom on mac heavily relying on brew

which -s brew
if [[ $? != 0 ]] ; then
    # Install Homebrew
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
else
    echo " ✔ Brew already installed"
    echo " Updating Brew"
    brew update
fi

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
    apm install language-markdown markdown-preview-plus minimap sort-selected-elements wordcount markdown-table-editor markdown-toc
  fi
else
    echo " ✔ Atom already installed"
    # install atom packages which make markdown easy
    echo "Installing useful Atom packages"
    apm install language-markdown markdown-preview-plus minimap sort-selected-elements wordcount markdown-table-editor markdown-toc
fi
