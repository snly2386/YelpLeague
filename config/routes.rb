Rails.application.routes.draw do
  root 'landing#index'
  get '/riot' => 'landing#riot'
  devise_for :users, controllers: { sessions: 'users/sessions', :omniauth_callbacks => "users/omniauth_callbacks" }
  resources :users, only: [:show, :update] do
    get '/reports' => "reports#by_user"
    get '/profile' => "users#profile"
  end
  resources :players, only: [:show, :create, :index] do
    post '/bookmark' => 'players#bookmark'
    post '/unbookmark' => 'players#unbookmark'
    get '/positive_negative_report_data' => 'reports#positive_negative_data'
    resources :reports, only: [:create, :index, :update, :destroy]
  end

  resources :reports, only: :index do
    post '/upvote' => 'reports#upvote'
    post '/downvote' => 'reports#downvote'
  end

  get '/avatars' => "users#avatar_selection"

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
