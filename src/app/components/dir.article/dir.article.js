angular.module("yjDm")
.directive("dirArticle", function() {
    "use strict";

    var directive = {
        restrict: "E",
        replace: true,
        scope: {
          article: "="
        },
        bindToController: true,
        controller: "DirArticleController as vm",
        templateUrl: "app/components/dir.article/dir.article.html"
    };

    return directive;
});
