class LandingController < ApplicationController
  def index
    @player = Player.new
  end
end
