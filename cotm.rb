require 'rubygems' if RUBY_VERSION < '1.9'
require 'sinatra'
require 'haml'
require 'net/http'
require 'date'
require 'active_support/all'

# You want your API key in a proxy call of some sort so it's not publicly visible.
# I'm placing my actaul API key in a seperate file OUTSIDE of source control.
# I'm conditionally adding this line to keep Heroku happy.
# In Heroku, you define values like api_keys as environment variables.
require './my_api_key' if ENV['API_KEY'].nil?

# Our Sinatra backend: 
get '/' do
  haml :index
end

get '/proxy' do
  API_KEY = ENV['API_KEY']
  # Most of our searches will start with this prefix.
  api_url = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/'

  case params['action']
    when 'box_office'
      api_url += "box_office.json"
    when 'current'
      api_url += "in_theaters.json"
    when 'opening'
      api_url += "opening.json"
    when 'upcoming'
      api_url += "upcoming.json"
    when 'search'
      # Searching the API happens on a different URL.
      if params['query']
        api_url = "api.rottentomatoes.com/api/public/v1.0/movies.json"
      else
        api_url = nil
      end
    else
      api_url = nil
  end

  if api_url
    api_url += "?apikey=#{API_KEY}&limit=50"

    # We only need to add the 
    api_url += "&q=#{params['query']}" if params['action'] == 'search'

    puts "We're calling the api with this url: #{api_url}"
    Net::HTTP.get URI.parse(api_url)
  end 

end

# Adding declarations for static content.  
# This includes our stylesheet and backbone app .js files
set :public_folder, File.dirname(__FILE__) + '/public'
