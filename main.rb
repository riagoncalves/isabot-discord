# frozen_string_literal: true

require 'discordrb'
require 'yaml'
puts 'All dependencies loaded'

CONFIG = YAML.load_file('config/config.yaml')
puts 'Config loaded from file'

isa = Discordrb::Commands::CommandBot.new(token: CONFIG['token'],
                                          client_id: CONFIG['client_id'],
                                          prefix: CONFIG['prefix'])

puts "This bot's invite URL is #{isa.invite_url}."
puts 'Click on it to invite it to your server.'

isa.message(content: 'Ping!') do |event|
  event.respond 'Pong!'
end

isa.run