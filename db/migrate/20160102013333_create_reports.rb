class CreateReports < ActiveRecord::Migration
  def change
    create_table :reports do |t|
      t.integer :player_id
      t.integer :user_id
      t.text :message
      t.integer :rating
      t.integer :helpful

      t.timestamps null: false
    end
  end
end
