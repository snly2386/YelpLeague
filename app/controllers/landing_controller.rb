class LandingController < ApplicationController
  before_action :set_theme
  def index
    @player = Player.new
  end

  private

  def set_theme
    @theme = "home"
  end
end
