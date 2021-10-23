class User < ApplicationRecord
<<<<<<< HEAD
  acts_as_token_authenticatable
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
=======
    validates :nickname, :email, :password, presence: true
>>>>>>> 9bba58abceec332e7274946a8ebff9bd0b6e7108
end
