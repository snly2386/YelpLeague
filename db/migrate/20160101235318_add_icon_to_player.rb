class AddIconToPlayer < ActiveRecord::Migration
  def change
    add_column :players, :icon, :string
  end
end
