Rails.application.routes.draw do
  scope 'user' do
    get 'login', to: 'user#login'
    get 'logout', to: 'user#logout'
    get 'index', to: 'user#index'
    get 'show/:id', to: 'user#show'
    post 'create', to: 'user#create'
    put 'update/:id', to: 'user#update'
    delete 'delete/:id', to: 'user#delete'
  end
end
