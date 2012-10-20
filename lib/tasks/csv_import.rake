require 'rake'

namespace :import_data do
	desc "Import data from csv file using Postgres Copy"
  task :copy_import => :environment do
  	Dir["#{Rails.root}/test/data/*"].each do |f|
  		csv_file = File.basename(f, '.csv')
  		path = Rails.env.development? ? f : "#{Rails.root}/test/data/#{csv_file}.csv"
  		ActiveRecord::Base.connection.execute("COPY beers(brewery, beer, type) FROM '#{path}' USING DELIMITERS ','")
  		puts "[At #{Time.now.utc}: Finished importing CSV]"
		end
  end
end