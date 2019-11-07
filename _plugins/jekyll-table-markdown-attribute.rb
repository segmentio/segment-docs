Jekyll::Hooks.register [:pages, :documents], :pre_render do |post|
  post.content = post.content.gsub('<td>', '<td markdown="span">')
end
