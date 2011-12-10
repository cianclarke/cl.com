app.views.Viewport = Ext.extend(Ext.Panel, {
    fullscreen: true,
    layout: 'card',
    initComponent: function() {
        //put instances of cards into app.views namespace
        Ext.apply(app.views, {
          home: new app.views.Home(),
          //countries: new app.views.Countries(),
          recent: new app.views.Recent()
        });
        //put instances of cards into viewport
        Ext.apply(this, {
            items: [
//                {
//                  html: '<h1>Ci&aacute;ran Lennon</h1>',
//                  height: 14
//                },
                new Ext.TabPanel({
                  cardSwitchAnimation: 'slide',
                  layout: 'fit',
                  tabBar: new Ext.TabBar({
                    dock: 'top',
                    layout: {
                        pack: 'center'
                    },
                  }),
                  items: [
                    app.views.recent,
                    app.views.home
                  ]
                }),
                
            ]
        });
        app.views.Viewport.superclass.initComponent.apply(this, arguments);
    }
});