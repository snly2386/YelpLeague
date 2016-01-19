angular.module('yelpleague').factory 'UpvoteService', [
  '$http'
  ($http) ->
    {
      upvote: (id) ->
        $http.post '/reports/' + id + '/upvote.json'
      downvote: (id) ->
        $http.post '/reports/' + id + '/downvote.json'
    }
]