class UsersController < ApplicationController
  layout :set_layout
  def show
    @playerSearch = Player.new
    @user = User.find(params[:id])
    authorize! :read, @user

    respond_to do |format|
      format.html { render :show}
      format.json { render json: @user}
    end
  end

  def profile
    @user = User.find(params[:user_id])
  end

  def avatar_selection
    cs = ChampionsService.new
    avatars = cs.get_champions

    respond_to do |format|
      format.json { render json: { avatars: avatars } }
    end
  end

  def update
    @user = User.find(params[:id])

    respond_to do |format|
      if @user.update(user_params)
        format.json { render json: @user, notice: 'User has been updated'}
      else
        format.json { render json: @user.errors, status: :unprocessable_entity}
      end
    end
  end

  def set_layout
    current_user ? 'member' : 'non_member'
  end

  private

  def user_params
    params.require(:user).permit(:username, :avatar, :email)
  end
end
