source "https://rubygems.org"

gem "jekyll", "~> 3.8.6"
gem "minima", "~> 2.0"


# If you have any plugins, put them here!
group :jekyll_plugins do
  gem 'jekyll-sitemap'
  gem 'jekyll-redirect-from'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
install_if -> { RUBY_PLATFORM =~ %r!mingw|mswin|java! } do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.0", :install_if => Gem.win_platform?
