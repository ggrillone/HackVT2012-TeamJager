VtBrewTour::Application.routes.draw do
  resources :brewery, :only => [:index, :show]

  root :to => 'brewery#index'

end
