import app from "./server";
import {PORT} from "./config/env";

app.listen(PORT, ()=>{
    console.log(`IFFA HUB Running on PORT : ${PORT}`);
})