class PlayersController < ApplicationController

  before_action :get_player, only: :show

  def new
    @player = Player.new
  end

  def create
    params["player"]["name"] = params["player"]["name"].downcase
    params["player"]["name"].gsub!(/\s+/, "")
    @player = Player.find_or_initialize_by(player_params)
    ps = player_service_request(@player.name, @player.region)
    if @missing
      @player.errors.add(:base, @missing)
    elsif @failure
      @player.errors.add(:base, @failure)
    end
    respond_to do |format|
      if @success && @player.save
        @player.update(ps)
        format.html { redirect_to @player }
        format.json { render :show, status: :created, location: @player}
      else
        format.html { render template: "landing/index" }
        format.json { render json: @player.errors, status: :unprocessable_entity }
      end
    end
  end

  def show
    @player = Player.find(params[:id])
    @user = current_user
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @player.reported_by_user(current_user) }
    end
  end

  def player_service_request(name, region)
    ps = PlayerService.new(name, region)
    if ps.success
      @success = true
      ps.get_player()
    elsif ps.missing
      @missing = "This player does not exist."
    elsif ps.failure
      @failure = "Riot API is fucked."
    end
  end

  private

  def player_params
    params.require(:player).permit(:name, :region, :display_name, :avatar)
  end

  def get_player
    @player = Player.find(params[:id])
  end
end
