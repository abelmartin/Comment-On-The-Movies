require 'rubygems' if RUBY_VERSION < '1.9'
require 'sinatra/base'
require 'haml'
#require File.dirname(__FILE__) + 'my_api_key.rb'
require 'my_api_key'

class CotM < Sinatra::Base

  get '/' do
    @api_key = API_KEY
    haml :index
  end

  get '/proxy' do
    "blah"
  end

  # Adding declarations for static content, our style sheet and backbone app 

  set :public, File.dirname(__FILE__) + '/public'
end

# Run This App
CotM.run!
