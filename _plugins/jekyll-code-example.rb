require "erb"

module Jekyll
  module CodeExample
    class CodeExample < Liquid::Block
      def render(context)
        environment = context.environments.first
        environment['codeexample'] = {} # reset each time
        super
          template = ERB.new <<-EOF
<div class="code-example" data-code-example>
  <div class="code-example__nav flex" data-ref="code-example[nav]">
    <% environment['codeexample'].each_with_index do |(key, _), index| %>
      <div class="code-example__nav-item flex__column flex__column--shrink" data-class-active="code-example__nav-item--active">
        <a href="#" class="code-example__nav-link"><%= key %></a>
      </div>
    <% end %>
  </div>

  <div class="code-example__body" data-ref="code-example[body]">
    <% environment['codeexample'].each do |_, value| %>
      <div class="code-example__tab" data-class-active="code-example__tab--active"><%= value %></div>
    <% end %>
  </div>
</div>
EOF
        template.result(binding)
      end
    end

    class CodeExampleTab < Liquid::Block
      alias_method :render_block, :render

      def initialize(tag_name, markup, tokens)
        super
        if markup == ""
          raise SyntaxError.new("No toggle name given in #{tag_name} tag")
        end
        @toggle = markup.strip
      end

      def render(context)
        site = context.registers[:site]
        converter = site.find_converter_instance(::Jekyll::Converters::Markdown)
        environment = context.environments.first
        environment['codeexample'] ||= {}
        environment['codeexample'][@toggle] = converter.convert(render_block(context))
      end
    end
  end
end

Liquid::Template.register_tag("codeexampletab", Jekyll::CodeExample::CodeExampleTab)
Liquid::Template.register_tag("codeexample", Jekyll::CodeExample::CodeExample)
