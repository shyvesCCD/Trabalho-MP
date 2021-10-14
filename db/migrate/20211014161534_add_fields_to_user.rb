class AddFieldsToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :name, :string
    add_column :users, :authentication_token, :string, limit: 25
    add_index :users, :authentication_token, unique: true
  end
end
