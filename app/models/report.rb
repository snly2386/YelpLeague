class Report < ActiveRecord::Base
  belongs_to :user
  belongs_to :player
  validates_presence_of :message, :rating, :user_id, :player_id
  validates_uniqueness_of :user_id

  def user_report_count
    user.report_count
  end
end
