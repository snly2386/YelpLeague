angular.module('yelpleague').factory 'BookmarkService', [
  '$http'
  ($http) ->
    {
      bookmark: (id) ->
        $http.post '/players/' + id + '/bookmark.json'
      unbookmark: (id) ->
        $http.post '/players/' + id + '/unbookmark.json'
    }
]