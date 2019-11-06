require 'jekyll'
require 'nokogiri'

Jekyll::Hooks.register [:pages, :documents], :pre_render do |post|
  doc = Nokogiri::HTML.fragment(post.content)

  # Stop if we could't parse with HTML
  return content unless doc

  doc.css('td').each do |td|
    td.set_attribute('markdown', 'span')
  end

  post.content = doc.to_s
end
