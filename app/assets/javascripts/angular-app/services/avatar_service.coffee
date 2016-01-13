angular.module('yelpleague').factory 'AvatarService', [
  '$http'
  ($http) ->
    {
      get_all: () ->
        $http.get '/avatars.json'
    }
]