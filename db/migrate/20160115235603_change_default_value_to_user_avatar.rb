class ChangeDefaultValueToUserAvatar < ActiveRecord::Migration
  def change
    change_column :users, :avatar, :string, default: "https://s3-us-west-2.amazonaws.com/dynamicowlwendy/default_avatar.jpg"
  end
end
