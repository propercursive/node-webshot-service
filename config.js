module.exports = {
  port: 8080,
  post_url: /\w{8}$/,
  bucket: process.env.BUCKET,
  allowed: process.env.ALLOWED || 'http://localhost:3000',
  file_type: '.png',
  width: 1200,
  height: 630,
  accepted_values: [
    'Lorem ipsum',
    'Et qui fugiat',
    'cupidatat',
    20,
    10
  ],
  options: {
    siteType: 'html',
    screenSize: {
      width: 1200,
      height: 630
    },
    shotSize: {
      width: 1200,
      height: 630
    },
    customCSS: '* { box-sizing: border-box; } div { display: block; }'
  },
  html: function(params) {
    return '<div>Lorem ipsum Sint dolore qui amet laborum.' + params[0] + 'Lorem ipsum Consectetur ut occaecat.' + params[1] + 'Lorem ipsum Esse ad sunt dolor eiusmod.' + params[2] + 'Lorem ipsum Fugiat culpa qui nostrud mollit nulla.' + params[3] + '</div>';
  }
};
