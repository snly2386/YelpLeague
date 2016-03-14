angular.module('yelpleague').factory 'ReportsDataService', [
  '$http'
  ($http) ->
    {
      get: (id) ->
        $http.get '/players/' + id + '/positive_negative_report_data.json'
    }
]
