require "erb"

module Jekyll
  module FAQ
    class FAQ < Liquid::Block
      def render(context)
        environment = context.environments.first
        environment['faq'] = {} # reset each time
        super
          template = ERB.new <<-EOF
<div class="accordion" data-accordion-group>
  <% environment['faq'].each_with_index do |(key, value), index| %>
    <div class="accordion__item" data-accordion data-class-active="accordion--active">
      <div class="accordion__heading" data-ref="accordion[trigger]">
        <%= key.split("|")[0] %>
        <div class="accordion__icon">
          <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.87 4.17s.01 0 0 0l-3.5-4A.498.498 0 004 0c-.15 0-.28.07-.37.17l-3.5 4A.495.495 0 00.5 5h7a.495.495 0 00.37-.83z" fill="#8F95B2"/>
          </svg>
        </div>
      </div>
      <div class="accordion__body" data-ref="accordion[body]">
        <%= value %>

        <% if key.split("|")[1] %>
          <a class="accordion__link" href="<%= key.split("|")[1] %>">Read more</a>
        <% end %>
      </div>
    </div>
  <% end %>
</div>
EOF
        template.result(binding)
      end
    end

    class FAQItem < Liquid::Block
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
        environment['faq'] ||= {}
        environment['faq'][@toggle] = converter.convert(render_block(context))
      end
    end
  end
end

Liquid::Template.register_tag("faqitem", Jekyll::FAQ::FAQItem)
Liquid::Template.register_tag("faq", Jekyll::FAQ::FAQ)
