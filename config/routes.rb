Rails.application.routes.draw do
  devise_for :users, skip: :all
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get 'login', to: 'user#login'
  get 'logout', to: 'user#logout'
  get 'index', to: 'user#index'
  get 'show/:id', to: 'user#show'
  post 'create', to: 'user#create'
  put 'update/:id', to: 'user#update'
  delete 'delete/:id', to: 'user#delete'
end
