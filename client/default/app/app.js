Ext.regApplication({
    name: 'app',
    launch: function() {
        this.views.viewport = new this.views.Viewport();
    }
});


$fh.ready( {}, 
    function () {
      // When app comes to forescreen on iOS, reload all stores from server
      document.addEventListener("resume", function(){
      app.stores.recent.load();
      app.stores.dailies.load();
      app.stores.exhibitions.load();
      }, false);
      
      $fh.ori({
        act: "listen"
      }, function (a) {
        setTimeout(function () {
          app.views.viewport.setOrientation(Ext.getOrientation(), window.innerWidth, window.innerHeight - 1);
          app.views.viewport.setOrientation(Ext.getOrientation(), window.innerWidth, window.innerHeight);
          app.views.viewport.setOrientation(Ext.getOrientation(), window.innerWidth, window.innerHeight + 1);
          window.scrollTo(0, 0);
          app.views.viewport.doComponentLayout();
        }, 100)
      });
});