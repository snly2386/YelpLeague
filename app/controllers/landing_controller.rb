class LandingController < ApplicationController
  before_action :set_theme
  layout :set_layout
  def index
    @player = Player.new
  end

  def riot
    render file: "riot.txt", layout: false, content_type: 'text/plain'
  end

  private

  def set_theme
    @theme = "home"
  end

  def set_layout
    current_user ? 'member_without_search' : 'non_member'
  end
end
