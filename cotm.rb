require 'rubygems' if RUBY_VERSION < '1.9'
require 'sinatra/base'
require 'haml'
require 'net/http'
require 'uri'

# You want your API key in a proxy call of some sort so it's not publicly visible.
# I'm placing my actaul API key in a seperate file OUTSIDE of source control.
require './my_api_key'

class CotM < Sinatra::Base

  get '/' do
    haml :index
  end

  get '/proxy' do
    # Core URL
    api_url = "http://api.nytimes.com/svc/movies/v2/reviews/search.json?"

    # Your params
    api_url += "&opening-date=2011-05-06"

    # The API from 'my_api_key.rb'
    api_url += "&api-key=#{API_KEY}"
    
    puts api_url

    Net::HTTP.get URI.parse(api_url)

  end

  # Adding declarations for static content, our style sheet and backbone app 

  set :public, File.dirname(__FILE__) + '/public'
end

# Run This App
CotM.run!
