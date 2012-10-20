class BreweryController < ApplicationController
  def index
  	# require 'json'
  	# require 'open-uri'
  	# @result = JSON.parse(open("http://api.brewerydb.com/v2/brewery/qIqpZc/beers/?key=7c7a3e4d800c8745829f95c338570201").read)

  	@breweries = Brewery.all
  end

  def show
  end
end
