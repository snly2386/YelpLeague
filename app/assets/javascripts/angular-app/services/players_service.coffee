(->
  app = angular.module("yelpleague")

  app.factory "PlayersService", [
    "$http"
    "$resource"

    ($http, $resource) ->

      $resource("/players/:id.json"
        { id: '@id' }
      )

  ]
)()
