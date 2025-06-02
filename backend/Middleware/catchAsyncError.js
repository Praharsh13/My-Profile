export const catchAsyncErrors=(functions)=>{
    return (req,res,next)=>{
        Promise.resolve(functions(req,res,next))
        .catch(next);
    }
}

//This is currying where we first passing the route function ,
// returning the new function having middleware then resolve the promise 
//if promise is resolve , we get no error and if not then it will catch the error 
//no need to use try catch block each time