class Player < ActiveRecord::Base
  has_many :reports
  validates_presence_of :name, :region


  def reported_by_user(userId)
    reports.map(&:user_id).include?(userId)
  end
end
