require 'rubygems' if RUBY_VERSION < '1.9'
require 'sinatra'
require 'haml'
require 'net/http'
require 'date'

# You want your API key in a proxy call of some sort so it's not publicly visible.
# I'm placing my actaul API key in a seperate file OUTSIDE of source control.
# I'm conditionally adding this line to keep Heroku happy.
# In Heroku, you define values like api_keys as environment variables.
require './my_api_key' if ENV['API_KEY'].nil?

# Our Sinatra backend: 
get '/' do
  @current_month = Date.today.month
  haml :index
end

get '/proxy' do
  API_KEY = ENV['API_KEY']
  # We take the value from our select control in the param string
  # We'll construct the date range based on that

  # Let's create a default value just incase we attempt to call 
  # the API without the param we're expecting.
  
  default_date = "#{Date.today.year}-#{"%02d" % Date.today.month}"
   
  year_month = params[:year_month] || default_date
  puts year_month

  # The start of the month is ALWAYS 01
  start_date = "#{year_month}-01"

  # End of the month requires a little massaging
  ymArray = year_month.split("-")
  year = ymArray[0].to_i
  month = ymArray[1].to_i

  # Ruby has a ton of neat little quirks.  Here's an easy way to get the last day of a month
  end_date = Date.new(year, month, -1)

  # Core URL
  api_url = "http://api.nytimes.com/svc/movies/v2/reviews/search.json?"

  # Your params
  api_url += "&opening-date=#{start_date};#{end_date}"

  # Default Sort by openning day
  api_url += "&order=by-opening-date"

  # The API from 'my_api_key.rb'
  #api_url += "&api-key=#{API_KEY}"
  api_url += "&api-key=#{API_KEY}"
   
  puts api_url

  Net::HTTP.get URI.parse(api_url)

end

# Adding declarations for static content.  This includes our stylesheet and backbone app .js files
set :public, File.dirname(__FILE__) + '/public'
