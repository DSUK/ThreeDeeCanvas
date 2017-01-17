Rails.application.routes.draw do
  root 'canvas#index'.freeze
  resources :canvas
  resources :polygons
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
