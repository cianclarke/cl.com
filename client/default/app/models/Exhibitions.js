// Controller class named 'Country', not 'Countries'. class = description of an instance of..
app.models.Exhibitions = Ext.regModel('app.models.Exhibtiions', {
  fields: ['name', 'medium', 'size', 'image', 'category', 'images', 'lat', 'longitude'],
  proxy: {
    type: 'fhact',
    reader: 'json',
    id: 'getExhibitions',
    source: 'localRemote'
  }
});

app.stores.exhibitions = new Ext.data.Store({
  model: 'app.models.Exhibtiions',
  //autoLoad: true,
/*
  data: [
         {
           name: 'RHA',
           medium: 'Royal Hibernian Academy, Dublin, 2009',
           images: ['images/RHA1.jpg', 'images/RHA2.jpg', 'images/RHA3.jpg', 'images/RHA4.jpg', 'images/RHA5.jpg', 'images/RHA6.jpg', 'images/RHA7.jpg'],
           image: 'images/RHA1.jpg',
           lat: '53.337201',
           long: '-6.254546'
           
         },
         {
           name: 'Jocasta',
           medium: 'Centre Culturel Irlandais, Paris, 2009', 
           images: ['images/jocasta1.jpg', 'images/jocasta2.jpg', 'images/jocasta3.jpg', 'images/jocasta4.jpg', 'images/jocasta5.jpg'],
           image: 'images/jocasta1.jpg',
           lat: '48.844644',
           long: '2.345877'
         },
         {
           name: 'Arken',
           medium: 'Arken Museum of Modern Art, Copenhagen, 2003',
           images: ['images/arken1.jpg', 'images/arken2.jpg', 'images/arken3.jpg', 'images/arken4.jpg', 'images/arken5.jpg'],
           image: 'images/arken1.jpg',
           lat: '55.608782',
           long: '12.387916'
         },
         {
           name: 'Hapax',
           medium: 'National Gallery of Ireland - "Hapax", 2002',
           images: ['images/hapax1.jpg', 'images/hapax2.jpg'],
           image: 'images/hapax1.jpg',
           lat: '53.341384',
           long: '-6.252115'
         },
         {
           name: 'DHG',
           medium: 'Douglas Hyde Gallery, Trinity College Dublin, 1992',
           images: ['images/douglashyde1.jpg', 'images/douglashyde2.jpg'],
           image: 'images/douglashyde1.jpg',
           lat: '53.343484',
           long: '-6.257436'
         },
         {
           name: 'Fenderesky',
           medium: 'Fenderesky, Belfast, 1990',
           images: ['images/fenderesky1.jpg', 'images/fenderesky2.jpg'],
           image: 'images/fenderesky1.jpg',
           lat: '54.602211',
           long: '-5.931513'
         },
  ]*/

});