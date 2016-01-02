class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string :name
      t.string :avatar
      t.string :division
      t.string :tier
      t.string :region
      t.string :display_name

      t.timestamps null: false
    end
  end
end
