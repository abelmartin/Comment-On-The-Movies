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
  #@current_month = Date.today.month
  dd = Date.today

  @weeks = []
  curr_monday = dd.beginning_of_week
  curr_sunday = dd.end_of_week

  aa = Array.new

  while curr_monday.year > dd.year - 2
    # Ruby get's upset without the parens in this case.
    #label = "#{curr_monday.strftime('%B %Y')}: #{curr_monday.month}/#{curr_monday.day} to #{curr_sunday.month}/#{curr_sunday.day}"
    label = "#{curr_monday.year}: #{curr_monday.strftime('%B')} #{curr_monday.day} to #{curr_sunday.strftime('%B')} #{curr_sunday.day}"
    @weeks.push( {:label => label, :value => "#{curr_monday}--#{curr_sunday}"} )

    curr_monday = curr_monday.advance :weeks => -1
    curr_sunday = curr_sunday.advance :weeks => -1
  end

  puts "First Week: #{@weeks.first}"
  puts "Last Week: #{@weeks.last}"

  haml :index
end

get '/proxy' do
  API_KEY = ENV['API_KEY']
  # We take the value from our select control in the param string
  # We'll construct the date range based on that

  # The NYT Movie API won't return an entire month's worth of data.
  # Core URL
  api_url = "http://api.nytimes.com/svc/movies/v2/reviews/search.json?"

  week = params[:week].gsub /--/, ';' 

  api_url += "&opening-date=#{week}"

  # Default Sort by openning day
  api_url += "&order=by-opening-date"

  # The API from 'my_api_key.rb'
  api_url += "&api-key=#{API_KEY}"
   
  puts api_url

  Net::HTTP.get URI.parse(api_url)
end

# Adding declarations for static content.  This includes our stylesheet and backbone app .js files
set :public, File.dirname(__FILE__) + '/public'
