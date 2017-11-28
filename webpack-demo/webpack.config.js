module.exports = {
    entry : __dirname +'/main.js',
    output : {
        path : __dirname +'/public',
        filename : 'app.bundle.js'
    },
    module:{
        rules: [
            {
                test: /\.css$/,
                use: [
                    {   loader:'style-loader'},
                    {
                        loader:'css-loader',
                        // option  :{
                        //     modules : true
                        // }
                    }
                ]
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader'
            }

        ]
    }
}