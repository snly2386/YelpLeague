require 'curb'
require 'dotenv'
Dotenv.load
class ChampionsService
  def initialize
    @api = ENV['API_KEY']
  end

  def get_champions
    @response = Rails.cache.fetch("champions", :expires_in => 2.weeks) do
      response = Curl::Easy.perform("https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=image&api_key=#{@api}").body_str
      jsonResponse = JSON.parse response
      @champions = jsonResponse['data'].reduce([]) do |arr, champion|
        arr << champion[1]["image"]["full"]
      end
      @champions
    end
    @response
  end
end
