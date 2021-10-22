class UserController < ApplicationController

    def index
        user = User.all
        render json: user, status: 200
    end
    
    def create
        user = User.new(user_params)
        user.save!
        render json: user, status: 201

    rescue StandardError
        head(:unprocessable_entity)
    end

    def show
        user = User.find(params[:id])
        render json: user, status: 200
    end  
    
    def update
        user = User.find(params[:id])
        user.update!(user_params)
        render json: user, status: 200

    rescue StandardError
        head(:unprocessable_entity)
    end
    
    def delete
        user = User.find(params[:id])
        user.destroy!
        render json: user, status: 200
    rescue
        head(:bad_request)
    end    
    
    private

    def user_params
        params.require(:user).permit(:nickname, :email, :password)
    end    
end
