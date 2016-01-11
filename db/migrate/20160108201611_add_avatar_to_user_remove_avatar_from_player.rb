class AddAvatarToUserRemoveAvatarFromPlayer < ActiveRecord::Migration
  def change
    add_column    :users, :avatar, :string
    remove_column :players, :avatar, :string
  end
end
