class Player < ActiveRecord::Base
  has_many :reports, dependent: :destroy
  validates_presence_of :name, :region
  acts_as_votable

  scope :most_recent, -> { order(created_at: :desc).limit(6) }

  def last_review
    reports.last if reports
  end

  def report_count
    reports.count
  end

  def reported_by_user(userId)
    reports.map(&:user_id).include?(userId)
  end

  def average_rating
    if reports.any?
      ratings = reports.map(&:rating)
      ratings.reduce(:+) / ratings.size.to_f
      # ratings.inject(0.0){|sum, value| (sum + rating).to_f } / ratings.size
    end
  end

  def bookmarks
    votes_for
  end

  def bookmark(user)
    liked_by(user)
  end

  def unbookmark(user)
    unliked_by(user)
  end

  def bookmarked(user)
    user.voted_up_on?(self)
  end

  def self.most_recent_with_bookmark_data(user)
    most_recent.reduce([]) do |arr, player|
      arr.push({player: player, bookmarked: player.bookmarked(user), average_rating: player.average_rating })
      arr
    end
  end

  def self.most_recent_serialized
    most_recent.reduce([]) do |arr, player|
      arr.push({player: player, average_rating: player.average_rating })
      arr
    end
  end
end
