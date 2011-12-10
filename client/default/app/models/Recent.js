// Controller class named 'Country', not 'Countries'. class = description of an instance of..
app.models.Recent = Ext.regModel('app.models.Recent', {
  fields: ['title', 'description', 'image'],
  /*proxy: {
    type: 'fhact',
    reader: 'json',
    id: 'getMoreCountries',
    source: 'localRemote'
  }*/
});

app.stores.recent = new Ext.data.Store({
  model: 'app.models.Recent',
  getGroupString: function(record){
    return record.get('category');
  },
  data: [
         {
           name: '11011 for S&iacute;ol',
           medium: 'Acrylic paint on aluminium',
           size: '89" X 85" 2011',
           image: 'images/392.jpg',
           category: 'aluminiums'
           
         },
         {
           name: '7811',
           medium: 'Acrylic paint on aluminium', 
           size: '99" X 72" Aug 2011',
           image: 'images/391.jpg',
           category: 'aluminiums'

         },
         {
           name: 'RVR',
           medium: 'Acrylic paint on aluminium',
           size: '89" X 49"',
           image: 'images/393.jpg',
           category: 'aluminiums'

         },
         {
           name: 'Line of Modigliani',
           medium: 'Solid aluminium and acrylic medium',
           size: '20" X 15", 2011',
           image: 'images/385.jpg',
           category: 'aluminiums'

         },
         {
           name: 'Solo',
           medium: 'Aluminium block and acrylic medium',
           size: '19" x 15", 6-6-2011',
           image: 'images/384.jpg',
           category: 'aluminiums'

         },
         
  ]
});