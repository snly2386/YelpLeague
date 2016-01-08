class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable

  devise :omniauthable, :omniauth_providers => [:facebook]

  has_many :reports
  validates_presence_of :email, :username
  acts_as_voter

  def report_count
    reports ? reports.count : 0
  end

  def bookmarks
    find_voted_items
  end

  def self.from_omniauth(auth)
    puts "AUTH SHIT HERE: #{auth}"
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
      user.username = auth.info.name
    # user.name = auth.info.name   # assuming the user model has a name
    # user.image = auth.info.image # assuming the user model has an image
    end
  end
end
