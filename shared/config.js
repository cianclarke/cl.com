var countries = [
    {name:"Afghanistan", data:"93"},
    {name:"Albania", data:"355"},
    {name:"Algeria", data:"213"},
    {name:"American Samoa", data:"684"},
    {name:"Andorra", data:"33"},
    {name:"Anguilla", data:"264"},
    {name:"Antigua", data:"268"},
    {name:"Argentina", data:"54"},
    {name:"Armenia", data:"374"},
    {name:"Aruba", data:"297"},
    {name:"Australia", data:"61"},
    {name:"Austria", data:"43"},
    {name:"Azerbaijan", data:"994"},
    {name:"Bahamas", data:"242"},
    {name:"Bahrain", data:"973"},
    {name:"Bangladesh", data:"880"},
    {name:"Barbados", data:"1 246 "},
    {name:"Belarus", data:"375"},
    {name:"Belgium", data:"32"},
    {name:"Belize", data:"501"},
    {name:"Benin", data:"229"},
    {name:"Bermuda", data:"441"},
    {name:"Bhutan", data:"975"},
    {name:"Bolivia", data:"591"},
    {name:"Bonaire", data:"599"},
    {name:"Bosnia and Herzegovina", data:"387"},
    {name:"Botswana", data:"267"},
    {name:"Brazil", data:"55"},
    {name:"Brunei", data:"673"},
    {name:"Bulgaria", data:"359"},
    {name:"Burkina Faso", data:"226"},
    {name:"Burma", data:"95"},
    {name:"Burundi", data:"257"},
    {name:"Cambodia", data:"855"},
    {name:"Cameroon", data:"237"},
    {name:"Canada", data:"1 250 "},
    {name:"Canary Islands", data:"34"},
    {name:"Cape Verde Islands", data:"238"},
    {name:"Caroline Islands", data:"680"},
    {name:"Cayman Islands", data:"345"},
    {name:"Chad", data:"235"},
    {name:"Chile", data:"56"},
    {name:"China PRC", data:"86"},
    {name:"Colombia", data:"57"},
    {name:"Comoros", data:"269"},
    {name:"Cook Islands", data:"682"},
    {name:"Costa Rica", data:"506"},
    {name:"Croatia", data:"385"},
    {name:"Cuba (Guantanamo Bay)", data:"53"},
    {name:"Curacao", data:"599"},
    {name:"Cyprus", data:"357"},
    {name:"Czech Republic", data:"420"},
    {name:"Democratic Republic of Congo", data:"242"},
    {name:"Denmark", data:"45"},
    {name:"Djibouti", data:"253"},
    {name:"Dominica", data:"599"},
    {name:"Dominican Republic", data:"809"},
    {name:"Ecuador", data:"593"},
    {name:"Egypt", data:"20"},
    {name:"El Salvador", data:"503"},
    {name:"England", data:"44"},
    {name:"Equatorial Guinea", data:"240"},
    {name:"Eritrea", data:"291"},
    {name:"Estonia", data:"372"},
    {name:"Ethiopia", data:"251"},
    {name:"Falkland Islands", data:"500"},
    {name:"Faroe Islands", data:"298"},
    {name:"Fiji", data:"679"},
    {name:"Finland", data:"358"},
    {name:"France", data:"33"},
    {name:"French Guiana", data:"594"},
    {name:"French Polynesia", data:"689"},
    {name:"Gabon", data:"241"},
    {name:"Gambia", data:"220"},
    {name:"Georgia", data:"995"},
    {name:"Germany", data:"49"},
    {name:"Ghana", data:"233"},
    {name:"Gibraltar", data:"350"},
    {name:"Great Britain", data:"44"},
    {name:"Greece", data:"30"},
    {name:"Greenland", data:"299"},
    {name:"Grenada", data:"599"},
    {name:"Guadeloupe", data:"590"},
    {name:"Guam", data:"671"},
    {name:"Guatemala", data:"502"},
    {name:"Guinea Republic", data:"224"},
    {name:"Guinea-Bissau", data:"245"},
    {name:"Guyana", data:"592"},
    {name:"Haiti", data:"509"},
    {name:"Holland", data:"31"},
    {name:"Honduras", data:"504"},
    {name:"Hong Kong", data:"852"},
    {name:"Hungary", data:"36"},
    {name:"Iceland", data:"354"},
    {name:"India", data:"91"},
    {name:"Indonesia", data:"62"},
    {name:"Iran", data:"98"},
    {name:"Iraq", data:"964"},
    {name:"Ireland", data:"353"},
    {name:"Israel", data:"972"},
    {name:"Italy", data:"39"},
    {name:"Ivory Coast", data:"225"},
    {name:"Jamaica", data:"876"},
    {name:"Japan", data:"81"},
    {name:"Jordan", data:"962"},
    {name:"Kampuchea", data:"855"},
    {name:"Kazakhstan", data:"7"},
    {name:"Kenya", data:"254"},
    {name:"Kingdom of Cambodia", data:"855"},
    {name:"Kiribati", data:"686"},
    {name:"Korea", data:"82"},
    {name:"Kuwait", data:"965"},
    {name:"Kyrgyzstan", data:"996"},
    {name:"Laos", data:"856"},
    {name:"Latvia", data:"371"},
    {name:"Lebanon", data:"961"},
    {name:"Lesotho", data:"266"},
    {name:"Liberia", data:"231"},
    {name:"Liechtenstein", data:"41"},
    {name:"Lithuania", data:"370"},
    {name:"Luxembourg", data:"352"},
    {name:"Macau", data:"853"},
    {name:"Macedonia, Republic of", data:"389"},
    {name:"Madagascar", data:"261"},
    {name:"Malawi", data:"265"},
    {name:"Malaysia", data:"60"},
    {name:"Maldives", data:"960"},
    {name:"Mali", data:"223"},
    {name:"Malta", data:"356"},
    {name:"Marshall Islands", data:"692"},
    {name:"Martinique", data:"596"},
    {name:"Mauritania", data:"222"},
    {name:"Mauritius", data:"230"},
    {name:"Mexico", data:"52"},
    {name:"Micronesia", data:"691"},
    {name:"Monaco", data:"33"},
    {name:"Mongolia", data:"976"},
    {name:"Montenegro (Yugoslavia)", data:"382"},
    {name:"Montserrat", data:"664"},
    {name:"Morocco", data:"212"},
    {name:"Mozambique", data:"258"},
    {name:"Myanmar", data:"95"},
    {name:"Namibia", data:"264"},
    {name:"Nauru,Republic Of", data:"674"},
    {name:"Nepal", data:"977"},
    {name:"Netherlands", data:"31"},
    {name:"Netherlands Antilles", data:"599"},
    {name:"Nevis", data:"869"},
    {name:"New Caledonia", data:"687"},
    {name:"New Zealand", data:"64"},
    {name:"Nicaragua", data:"505"},
    {name:"Niger", data:"227"},
    {name:"Nigeria", data:"234"},
    {name:"Niue", data:"683"},
    {name:"North Korea", data:"850"},
    {name:"Northern Marianas", data:"1 670 "},
    {name:"Norway", data:"47"},
    {name:"Oman", data:"968"},
    {name:"Pakistan", data:"92"},
    {name:"Palau", data:"680"},
    {name:"Panama", data:"507"},
    {name:"Papua New Guinea", data:"675"},
    {name:"Paraguay", data:"595"},
    {name:"Peru", data:"51"},
    {name:"Philippines", data:"63"},
    {name:"Poland", data:"48"},
    {name:"Portugal", data:"351"},
    {name:"Puerto Rico", data:"1 787 "},
    {name:"Qatar", data:"974"},
    {name:"Reunion,Island Of", data:"262"},
    {name:"Romania", data:"40"},
    {name:"Russia", data:"7"},
    {name:"Rwanda", data:"250"},
    {name:"Saipan", data:"670"},
    {name:"Sao Tome and Principe", data:"239"},
    {name:"San Marino", data:"39"},
    {name:"Saudi Arabia", data:"966"},
    {name:"Senegal", data:"221"},
    {name:"Serbia (Yugoslavia)", data:"381"},
    {name:"Seychelles", data:"248"},
    {name:"Sierra Leone", data:"232"},
    {name:"Singapore", data:"65"},
    {name:"Slovakia", data:"421"},
    {name:"Slovenia", data:"386"},
    {name:"Solomon Islands", data:"677"},
    {name:"Somalia", data:"252"},
    {name:"South Africa", data:"27"},
    {name:"South Korea", data:"82"},
    {name:"Spain", data:"34"},
    {name:"Sri Lanka", data:"94"},
    {name:"St. Kitts", data:"869"},
    {name:"St. Lucia", data:"758"},
    {name:"St. Vincent", data:"784"},
    {name:"Sudan", data:"249"},
    {name:"Suriname", data:"597"},
    {name:"Swaziland", data:"268"},
    {name:"Sweden", data:"46"},
    {name:"Switzerland", data:"41"},
    {name:"Syria", data:"963"},
    {name:"Tahiti", data:"689"},
    {name:"Taiwan", data:"886"},
    {name:"Tajikistan", data:"7"},
    {name:"Tanzania", data:"255"},
    {name:"Thailand", data:"66"},
    {name:"Togo", data:"228"},
    {name:"Tonga", data:"676"},
    {name:"Trinidad and Tobago", data:"868"},
    {name:"Tunisia", data:"216"},
    {name:"Turkey", data:"90"},
    {name:"Turkmenistan", data:"993"},
    {name:"Turks and Caicos Islands", data:"649"},
    {name:"Tuvalu", data:"688"},
    {name:"Uganda", data:"256"},
    {name:"Ukraine", data:"380"},
    {name:"United Arab Emirates", data:"971"},
    {name:"United Kingdom", data:"44"},
    {name:"United States", data:"1"},
    {name:"Uruguay", data:"598"},
    {name:"Uzbekistan", data:"7"},
    {name:"Vanuatu", data:"678"},
    {name:"Venezuela", data:"58"},
    {name:"Vietnam", data:"84"},
    {name:"Virgin Islands (British)", data:"284"},
    {name:"Virgin Islands (US)", data:"1 340 "},
    {name:"Western Samoa", data:"685"},
    {name:"Yemen", data:"967"},
    {name:"Yugoslavia", data:"381"},
    {name:"Zaire", data:"243"},
    {name:"Zambia", data:"260"},
    {name:"Zimbabwe", data:"263"}
];