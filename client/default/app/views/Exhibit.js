app.views.Exhibit = Ext.extend(Ext.Panel, {

  title: 'Image Details',
  cls: 'imageDetails',
  scroll: 'vertical',
  initComponent: function(){
    var me = this,
    container = this.attachedTo,
    title = this.title || '',
    record = this.record,
    images = record.images,
    lat = record.lat || "53.337201",
    long = record.longitude || "-6.254546";
    
    
    
    var imagePanels = [];
    
    for (var i=0; i<images.length; i++){
      var image = new Ext.Panel({
        html: '<img style="max-width: 100%; max-height: 100%; height: auto;" src="http://www.ciaranlennon.com/' + images[i] + '" alt="Exhibition Image">',
      });  
      imagePanels.push(image);
    }
    
    var carousel = new Ext.Carousel({
      items: imagePanels, 
      height: 262
    });
    
    var panel = new Ext.Panel({
      height: 66,
      tpl: '' +
      '<span class="name">{name}</span><br />'+
      '{medium}<br />'+
      '{size}<br />'
    });
    panel.update(record);
    
    var map = new Ext.Map({
        height: 200,
        mapOptions : {
          center : new google.maps.LatLng(lat, long),  //nearby San Fran
          zoom : 16,
        }
     });
    
    
    this.items = [
      {
        layout: 'vbox',
        defaults: {
           width: '100%'
         },
         items: [carousel, panel]
      },
      map
    ];
    
    this.dockedItems = [
      {
        xtype: 'toolbar',
        title: title,
        dock: 'top',
        items: [
                  {
                    xtype: 'button',
                    text: 'Back',
                    ui: 'back',
                    handler: function(){
                      container.setActiveItem(0, {type: 'slide', direction: 'right'});
                      map.destroy();
                      me.destroy();
                    }
                  }
                ]
      },         
    ];
    
    app.views.Image.superclass.initComponent.call(this);
  }
  
});