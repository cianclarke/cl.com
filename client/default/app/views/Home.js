app.views.Home = Ext.extend(Ext.Panel, {
  title: 'About',
  scroll: 'vertical',
  cls: 'home',
  items: [
    {
      xtype: 'toolbar',
      title: 'About'
    },
    {
      html: 'As a child, Ciar&aacute;n was intrigued by his discovery that while we can see others and be seen by them, we can never see ourselves - even though we have a firm sense of our own presence and what we look like.<br /><br />' +
      'This feeling of unseen presence lies at the heart of his abstract paintings and drawings, yet they contain no overtly figurative elements. It is only perceptible by the inner eye: but, because he refuses to make any representational reference, Lennon impels the viewer to concentrate on the rich subtleties of sensory perception. His work is full of paradoxes.<br /> <br />' +
      '',
      cls: 'p'
    },
    {
      html: '<img src="http://www.ciaranlennon.com/images/lenses/300.jpg" alt=""/><br />' + 
      'IRIS\'<br /> Acrylic paint on brass, steel, copper.<br /> 74" X 39.5" each, 145" overall. 2008-2009.',
      cls: 'image'
    }
  ]
});