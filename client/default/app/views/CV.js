app.views.CV = Ext.extend(Ext.Panel, {
  title: 'CV',
  scroll: 'vertical',
  iconCls: 'user',
  cls: 'home',
  items: [
  {
    xtype: 'toolbar',
    title: 'CURRICULUM VITAE'
  },
  {
    html: 'Ciar&aacute;n Lennon was born in Dublin in 1947. He lives and works in Dublin. <br />',
    cls: 'p'
  },
  {
    xtype: 'toolbar',
    title: 'Solo Exhibitions'
  },
  {
    html:  '<ul style="list-style: none; padding-left: 0px; margin-left: 0px;">' +
    '<li>The National Gallery of Ireland, 2002</li>' +
    '<li>The Irish Museum of Modern Art, 1995</li>' +
    '<li>The Douglas Hyde Gallery, Dublin, 1993</li>' +
    '<li>The Chester Beatty Library, Dublin, 2003</li>' +
    '<li>The Ulster Museum, Belfast, 1995</li>' +
    '<li>Orchard Gallery, Derry, 1980</li>' +
    '<li>Annely Juda Fine Art, London, 1989</li>' +
    '<li>The Gallerie Wienberger, Copenhagen, 1999</li>' +
    '<li>The Galerie Lahumier, Paris, 1996</li>' +
    '<li>The Arken Museum of Contemporary Art, Copenhagen, 2004</li>' +
    '<li>Royal Hibernian Academy, Dublin, 2009</li>' +
    '<li>Centre Culturel Irlandais, Paris, 2010</li>'+
    '</ul>' ,
    cls: 'p'
  },
  {
    xtype: 'toolbar',
    title: 'Collections'
  },
  {
      html: '<ul style="list-style: none; padding-left: 0px; margin-left: 0px;">'+
    '<li>Ulster Museum</li>'+
    '<li>Irish Museum of Modern Art</li>'+
    '<li>Hugh Lane Municipal Gallery, Dublin</li>'+
    '<li>Trinity College Dublin</li>'+
    '<li>Kamarsky Collection, New York</li>'+
    '<li>The Fogg Museum of Fine Art, Harvard</li>'+
    '<li>Mr. &amp; Mrs. C.Z. Jones and M. Douglas, New York</li>'+
    '<li>Ms. R. Stella, Paris, France</li>'+
    '<li>Scott Tallon Walker, Architects, Dublin, Ireland</li>'+
    '<li>Dr. Ronald Tallon, Architect, Dublin, Ireland</li>'+
    '</ul>',
    cls: 'p'
  }
  ]
  
  
});