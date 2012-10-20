class BreweryController < ApplicationController
  def index
  	require 'json'
  	require 'open-uri'
  	@result = JSON.parse(open("http://api.brewerydb.com/v2/brewery/qIqpZc/beers/?key=75c487072c38fac9621fac0f4db26ca1").read)

  	@breweries = Brewery.all
  end

  def show
  end
end
