class User < ApplicationRecord
    validates :nickname, :email, :password, presence: true
end
