class AddDefaultValueToUserAvatar < ActiveRecord::Migration
  def change
    change_column :users, :avatar, :string, :default => "default_avatar.jpg"
  end
end
