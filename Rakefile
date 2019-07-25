require 'yaml'

namespace :nav do
  desc 'Updates _data/sidenav.yml based on the current available docs'
  task :update do
    p 'Updating _data/sidenav.yml based on current docs...'

    docs = FileList.new('./**/*.md').exclude("./vendor/**/*.md", './*.md', "./_*/**/*.md")
    nav = []
    sections = {}

    # sections[:demo] = { sectiontitle: "demo", section: [{ path: "/", title: "lol" }, { sectiontitle: "Getting started", section: [] }] }
    docs.map do |file_list|
      paths = file_list.to_s
                      .split('/')
                      .reject { |p| p == '.'}
      

      if paths.size == 0 || paths.size > 4
        # Not a valid path or some deep-nested directory structure we don't support
        next
      end
    
      root = paths[0]
      k = root.to_sym
      sections[k] ||= { section_title: root.capitalize, section: [{ path: "/#{root}", title: "Index"}] }

      if paths.size == 3
        path = nil
        path_title = nil

        if paths.last == "index.md"
          path = paths[0..3].join("/").gsub("/index.md", "")
          path_title = "Index"
        else
          path = paths[0..3].join("/").gsub(".md", "")
          path_title = path.split("/").last.gsub("-", " ").capitalize
        end

        sections[k][:section] << { section: [{ path: "/#{path}", title: path_title }]}
      end

      if paths.size == 4
        path = paths[0...4].join("/")
        title = paths[2].gsub("-", " ").capitalize
        subtitle = paths[3].gsub("-", " ").capitalize
        subsection = nil

        if !subsection = sections[k][:section].select { |x| x[:section_title] == title }.first
          subsection = { section_title: title, section: [] }
          sections[k][:section] <<  subsection
        end

        if path.split("/").last == "index.md"
          path = path.gsub("/index.md", "")
          subsection[:section] << { path: path, title: "Index" }
        else
          path = path.gsub(".md", "")
          title = paths[3].gsub(".md", "").capitalize
          subsection[:section] << { path: path, title: title }
        end
      end
    end

    nav = { nav: sections.values }

    File.open("./_data/sidenav.yml","w") do |file|
      file.write nav.to_yaml({ indention: 4 })
    end 
  end
end

namespace :catalog do
  desc 'Updates _data/catalog.yml based on the current catalog available in the Platform API'
  task :update do
    p 'Updating _data/catalog.yml based on current Segment Catalog...'
  end
end
