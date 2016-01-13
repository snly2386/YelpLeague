class AddFieldsToProvider < ActiveRecord::Migration
  def change
    add_column :providers, :email, :string
    add_column :providers, :username, :string
  end
end
