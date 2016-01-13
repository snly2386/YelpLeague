class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable

  devise :omniauthable, :omniauth_providers => [:facebook, :twitter]

  has_many :reports
  has_many :providers
  validates_presence_of :email, unless: :twitter?
  validates_presence_of :username
  acts_as_voter

  def email_required
    false
  end

  def twitter
    providers.map(&:twitter).include?(true)
  end

  def report_count
    reports ? reports.count : 0
  end

  def bookmarks
    find_voted_items
  end

  def self.from_omniauth(auth)
    user = joins(:providers).where(providers: { name: auth.provider, uid: auth.uid }).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
      user.username = auth.info.name
      user.avatar = auth.info.image
      user.providers.build(name: auth.provider, uid: auth.uid, username: auth.info.name, email: auth.info.email || '', image: auth.info.image)
    end
    user.providers.select{|p| p.name == auth.provider && p.uid == auth.uid}.first.user_id = user.id
    user
  end

  def add_omniauth(auth)
    providers.create(name: auth.provider, uid: auth.uid, username: auth.info.name, email: auth.info.email || '', image: auth.info.image)
  end
end
