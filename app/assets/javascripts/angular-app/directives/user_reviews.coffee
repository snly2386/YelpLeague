app = angular.module('yelpleague')
app.directive 'userReviews', ['ReportsService', (ReportsService) ->
    scope: false
    link: (scope, element, attrs) ->
      scope.$on('userFound', (event, data)->
        scope.user = data
      )

      scope.setEditedReview = (review) ->
        scope.editedReview = review
        console.log review


      scope.updateReview = () ->
        if scope.editReviewForm.$valid
          ReportsService.update(scope.editedReview, (data)->
            $('#edit-review-modal').modal('hide')
            scope.$emit('updateReviewNotice', "Review Successfully Updated")
          )
        else
          scope.$emit('updateReviewError', 'Please fill in all required fields')

    templateUrl: 'reviews.html'
 ]
