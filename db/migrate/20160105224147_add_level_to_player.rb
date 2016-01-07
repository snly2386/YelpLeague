class AddLevelToPlayer < ActiveRecord::Migration
  def change
    add_column :players, :level, :string
  end
end
