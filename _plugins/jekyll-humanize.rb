module Jekyll

  module Humanize
    ##
    # This is a port of the Django app `humanize` which adds a "human touch"
    # to data. Given that Jekyll produces static sites, some of the original
    # methods do not make logical sense (e.g. naturaltime).
    #
    # Source code can be viewed here:
    # https://github.com/django/django
    #
    # Copyright (c) Django Software Foundation and individual contributors.
    # All rights reserved.

    ####################
    #  PUBLIC METHODS  #
    ####################

    def ordinal(value, flag=nil)
      ##
      # Converts an integer to its ordinal as a string. 1 is '1st', 2 is '2nd',
      # 3 is '3rd', etc. Works for any integer.
      #
      # Usage:
      # {{ somenum }} >>> 3
      # {{ somenum | ordinal }} >>> '3rd'
      # {{ somenum | ordinal: "super" }} >>> '3<sup>rd</sup>'

      begin
        value = value.to_i
        flag.to_s.downcase!
      rescue Exception => e
        puts "#{e.class} #{e}"
        return value
      end

      suffix = ""
      suffixes = ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"]
      unless [11, 12, 13].include? value % 100 then
        suffix = suffixes[value % 10]
      else
        suffix = suffixes[0]
      end

      unless flag and flag == "super"
        return "#{value}%s" % suffix
      else
        return "#{value}<sup>%s</sup>" % suffix
      end

    end

    #####################
    #  PRIVATE METHODS  #
    #####################

    private
    def time(input)
      case input
      when Time
        input
      when String
        Time.parse(input)
      else
        Jekyll.logger.error "Invalid Date:", "'#{input}' not valid datetime."
        exit(1)
      end
    end

  end

end

Liquid::Template.register_filter(Jekyll::Humanize)
