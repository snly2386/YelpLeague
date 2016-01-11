(->
  app = angular.module("yelpleague")

  app.factory "UsersService", [
    "$http"
    "$resource"

    ($http, $resource) ->

      $resource("/users/:id.json"
        { id: '@id' }
      )

  ]
)()
