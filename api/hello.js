require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function ( req, res ) {
    try {
        console.log(req.body)
        const { email, password } = req.body

        if ( !email ) {
            const response = { "Status":"Failure","Details": "Email address not provided"}
            return res.status(400).json(response)
        }

        if ( !password ) {
            const response = { "Status": "Failure", "Details": "Password not provided"}
            return res.status(400).json(response)
        }

        const reponse = await supabase.auth.api.createUser({
            email,
            email_confirm: false
        })
        
        

        console.log(reponse)
        
        
    } catch ( error ){
        console.log(error)
        const response = {"Status":"Failure", "Details":error}
        return res.status(400).json(response)      
    }
}