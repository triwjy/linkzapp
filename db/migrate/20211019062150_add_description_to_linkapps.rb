class AddDescriptionToLinkapps < ActiveRecord::Migration[6.1]
  def change
    add_column :linkapps, :description, :string
  end
end
