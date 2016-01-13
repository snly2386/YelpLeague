class UsersController < ApplicationController
  layout 'member'
  def show
    @playerSearch = Player.new
    @user = User.find(params[:id])

    respond_to do |format|
      format.html { render :show}
      format.json { render json: @user}
    end
  end

  def avatar_selection
    cs = ChampionsService.new
    avatars = cs.get_champions

    respond_to do |format|
      format.json { render json: { avatars: avatars } }
    end
  end
end
