require 'rubygems' if RUBY_VERSION < '1.9'
require 'sinatra/base'
require 'haml'

# You want your API key in a proxy call of some sort so it's not publicly visible.
# I'm placing my actaul API key in a seperate file OUTSIDE of source control.
load 'my_api_key.rb'

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
