require 'curb'
require 'dotenv'
Dotenv.load
class PlayerService
  def initialize(name, region)
    @name = name
    @region = region
    @player_obj = Curl.get("https://#{region}.api.pvp.net/api/lol/#{region}/v1.4/summoner/by-name/#{name}?api_key=#{ENV['API_KEY']}") do |http|
      http.on_success { @success = true }
      http.on_missing { @missing = true }
      http.on_failure { @failure = true }
    end
    puts "HIHI #{@player_obj.body_str}"
  end

  def get_player
    player_obj = JSON.parse(@player_obj.body_str)[@name]
    { display_name: player_obj['name'], icon: player_obj['profileIconId'], level: player_obj['summonerLevel'] }
  end

  def success
    @success
  end

  def missing
    @missing
  end

  def failure
    @failure
  end
end
