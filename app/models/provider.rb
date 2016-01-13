class Provider < ActiveRecord::Base
  belongs_to :user

  def twitter
    name == "twitter"
  end

  def facebook
    name == "facebook"
  end
end
