require './cotm'
require 'capybara'
require 'capybara/dsl'
require 'test/unit'

class TestCOTM < Test::Unit::TestCase
  include Capybara::DSL
  # Capybara.default_driver = :selenium # <-- use Selenium driver

  def setup
    Capybara.app = Sinatra::Application.new
  end

  def test_page_loads
    visit '/'
    assert page.has_content?('Comment on the Movies'), "Our page load test has failed."
  end
end
