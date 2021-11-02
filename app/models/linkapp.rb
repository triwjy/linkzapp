class Linkapp < ApplicationRecord
  validates :name, uniqueness: true, presence: true
  validates :hyperlink, presence: true

  has_one_attached :preview
end
