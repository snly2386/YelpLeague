(->
  app = angular.module("yelpleague")

  app.factory "ReportsService", [
    "$http"
    "$resource"

    ($http, $resource) ->

      $resource("/players/:player_id/reports/:id.json"
        { player_id: '@player_id', id: '@id' }
       update:
         method: "PUT"
      )
  ]
)()
