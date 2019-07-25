namespace :nav do
  desc 'Updates _data/sidenav.yml based on the current available docs'
  task :update do
    p 'Updating _data/sidenav.yml based on current docs...gco '

    docs = FileList.new('./guides/**/*.md')
    nav = []
    sections = {}

    # Build out the top-level categories
    docs.map do |file_list|
      path = file_list.to_s
                      .split('/')
                      .reject { |p| p == '.'}
      
      name = path[0]

      section = sections[name] || { "sectiontitle": name.capitalize, "subsections": {} }
      
      if path.length == 4
        subsection = path[1].gsub("-", " ").capitalize
        section[:subsections][path[1]] = { sectiontitle: subsection, subsections: {} }
      end


      sections[name] = section
    end

    p sections
    
    puts({sections: nav})
  end
end

namespace :catalog do
  desc 'Updates _data/catalog.yml based on the current catalog available in the Platform API'
  task :update do
    p 'Updating _data/catalog.yml based on current Segment Catalog...'
  end
end
