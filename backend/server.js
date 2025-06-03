import app from "./app.js"
import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name:process.env.CLOUNDINARY_CLOUDNAME|| "dvhbtlw5w",
    api_key:process.env.CLOUNDINARY_API_KEY ||"354938339995314",
    api_secret:process.env.CLOUNDINARY_API_SECRET||"LP5Umbgog4bMI3jeBLGugRmZpv4"
})

//this to run the server
const PORT= process.env.PORT || 8080

app.listen(PORT,'0.0.0.0',()=>{
    console.log(`Server is running at port ${PORT}`);
})