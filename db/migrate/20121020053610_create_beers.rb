class CreateBeers < ActiveRecord::Migration
  def change
    create_table :beers do |t|
      t.string :brewery
      t.string :beer
      t.string :type
    end
  end
end
