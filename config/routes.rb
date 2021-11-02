Rails.application.routes.draw do
  root 'pages#index'

  namespace :api do
    namespace :v1 do
      resources :linkapps, only: %i[create index show update destroy]
    end
  end

  get '*path', to: 'pages#index', via: :all, format: false
end
