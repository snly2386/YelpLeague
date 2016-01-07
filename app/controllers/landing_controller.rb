class LandingController < ApplicationController
  before_action :set_theme
  layout :set_layout
  def index
    @player = Player.new
  end

  private

  def set_theme
    @theme = "home"
  end

  def set_layout
    current_user ? 'member' : 'non_member'
  end
end
