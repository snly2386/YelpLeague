class AddTwitterToUser < ActiveRecord::Migration
  def change
    add_column :users, :twitter, :boolean
  end
end
