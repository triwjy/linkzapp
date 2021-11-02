class CreateLinkapps < ActiveRecord::Migration[6.1]
  def change
    create_table :linkapps do |t|
      t.string :name
      t.string :hyperlink

      t.timestamps
    end
  end
end
