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
          <svg width="10" height="6" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.36.27l-.72.7L5 5.39 9.36.97l-.72-.7L5 3.97z" fill-rule="nonzero"/>
          </svg>
        </div>
      </div>
      <div class="accordion__body" data-ref="accordion[body]">
        <%= value %>

        <a class="accordion__link" href="<%= key.split("|")[1] %>">Read more</a>
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
