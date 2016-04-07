class ChangeDefaultAvatar < ActiveRecord::Migration
  def change
    change_column_default(:users, :avatar, 'https://s3-us-west-2.amazonaws.com/ggreported/default.png')
  end
end
