class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  # You should configure your model like this:
  # devise :omniauthable, omniauth_providers: [:twitter]

  def facebook
    # if current_user
    #   current_user.add_omniauth(request.env['omniauth.auth'])
    #   redirect_to current_user
    # else
    @user = User.from_omniauth(request.env["omniauth.auth"])

    if @user && @user.persisted?
      puts "OLD USER"
      session[:fuck] = @user
      sign_in_and_redirect @user
      set_flash_message(:notice, :success, :kind => "Facebook") if is_navigational_format?
    else
      puts "NEW USER"
      session["devise.facebook_data"] = request.env["omniauth.auth"]
      redirect_to new_user_registration_url
    end
  end

  def twitter
    # if current_user
    #   current_user.add_omniauth(request.env["omniauth.auth"])
    #   redirect_to current_user
    # else

    @user = User.from_omniauth(request.env["omniauth.auth"])

    if @user
      session[:fuck] = @user
      sign_in_and_redirect @user
      set_flash_message(:notice, :success, :kind => "Twitter") if is_navigational_format?
    else
      session["devise.twitter_data"] = request.env["omniauth.auth"]
      redirect_to root_path
    end
  end

  def failure
    redirect_to root_path
  end

  # More info at:
  # https://github.com/plataformatec/devise#omniauth

  # GET|POST /resource/auth/twitter
  # def passthru
  #   super
  # end

  # GET|POST /users/auth/twitter/callback
  # def failure
  #   super
  # end

  # protected

  # The path used when OmniAuth fails
  # def after_omniauth_failure_path_for(scope)
  #   super(scope)
  # end
end
