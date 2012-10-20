VtBrewTour::Application.routes.draw do
  get "beer/index"

  get "beer/show"

  resources :brewery, :only => [:index, :show]

  root :to => 'brewery#index'

end
