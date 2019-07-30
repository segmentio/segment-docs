require 'yaml'

SIDENAV_INDEX_DEFAULT_TITLE = 'Overview'
SIDENAV_FILE_BLACKLIST = [
  './vendor/**/*.md', 
  './connections/**/*.md', 
  './*.md', 
  './_*/**/*.md'
]


namespace :nav do
  desc 'Updates _data/sidenav.yml based on the current available docs'
  task :update do
    p 'Updating _data/sidenav.yml based on current docs...'

    docs = FileList.new('./**/*.md').exclude(SIDENAV_FILE_BLACKLIST)
    sections = Hash.new()

    docs.map do |file_list|
      paths = file_list.to_s
                      .split('/')
                      .reject { |p| p == '.'}
      

      if paths.size == 0 || paths.size > 3
        # Not a valid path or some deep-nested directory structure we don't support
        next
      end
    
      root = paths[0]
      k = root


      path = nil
      path_title = nil
      path = paths[0..paths.size].join("/").gsub(".md", "")


      begin
        f = YAML.load_file("./#{path}.md")
        path_title = f["title"]
      rescue
        path_title = path.split("/").last.gsub("-", " ").capitalize
      end

      sections[k] ||= { 'section_title' => root.capitalize, 'section' => [{ 'path' => "/#{root}", 'title' => SIDENAV_INDEX_DEFAULT_TITLE}] }

      # Skip the index e.g overview page for each section since we are setting it above
      next if paths.last == "index.md"

      if paths.size == 3
        subsection_title = nil
        begin
          f = YAML.load_file("./#{paths[0]}/#{paths[1]}/index.md")
          subsection_title = f["title"]
        rescue
          subsection_title = paths[1].gsub("-", " ").capitalize
        end

        if !subsection = sections[k]['section'].select { |x| x['section_title'] == subsection_title }.first
          # new sub-section found
          subsection = { 'section_title' => subsection_title, 'section' => [] }
          sections[k]['section'] <<  subsection
        end

        subsection['section'] << { 'path' => "/#{path}", 'title' => path_title }
      else
        sections[k]['section'] << { 'path' => "/#{path}", 'title' => path_title }
      end
    end


    main_sections = {}
    legal_sections = {}
    api_sections = {}
    partners_sections = {}

    sections.each do |k, v|
      if k == 'legal'
        legal_sections[k] = v
      elsif k == 'api'
        api_sections[k] = v
      elsif k == 'partners'
        partners_sections[k] = v
      else
        main_sections[k] = v
      end
    end

    main_nav = { 'sections' => main_sections.values }
    legal_nav = { 'sections' => legal_sections.values }
    partners_nav = { 'sections' => partners_sections.values }

    # Main sidenav
    File.open("./_data/sidenav/default.yml","w") do |file|
      file.write main_nav.to_yaml({ indention: 4, separator: '' })
    end 

    # Legal sidenav
    File.open("./_data/sidenav/legal.yml","w") do |file|
      file.write legal_nav.to_yaml({ indention: 4, separator: '' })
    end

    # Partners sidenav
    File.open("./_data/sidenav/partners.yml","w") do |file|
      file.write partners_nav.to_yaml({ indention: 4, separator: '' })
    end
  end
end

namespace :catalog do
  desc 'Updates _data/catalog.yml based on the current catalog available in the Platform API'
  task :update do
    p 'Updating _data/catalog.yml based on current Segment Catalog...'
  end
end
