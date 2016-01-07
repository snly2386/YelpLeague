module LandingHelper
  def regions
    ['na', 'euw', 'eune', 'kr', 'br', 'oce', 'lan', 'las', 'ru', 'tr']
  end

  def format_date(date)
    date.strftime("%b %Y")
  end
end
