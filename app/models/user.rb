class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :reports
  validates_presence_of :email, :username
  acts_as_voter

  def report_count
    reports ? reports.count : 0
  end

  def bookmarks
    find_voted_items
  end
end
