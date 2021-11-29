import  jwt  from "jsonwebtoken"

const generateToken = (payload) =>{
    return jwt.sign(payload,"secret",{expiresIn: "48h"})
};

const validateToken = (token) =>{
    if(token)
    {
        const verification = jwt.verify(token,"secret", (err,data) => {
            if(err)
            {
                return {
                    error: err,
                }
            }
            if(data)
            {
                return{
                    data: data,
                }
            }
        });
        return verification;
    }
}

export {generateToken, validateToken};