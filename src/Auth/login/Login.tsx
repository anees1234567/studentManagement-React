import { Button, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { CustomFormField } from "../../uitilities/CustomComponents/Customformfields";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { login } from "./services";
import { useNotification } from "../../notification/context";
import { setItem, storageKey } from "../../uitilities/storage/storage";

function LoginForm() {
  const {
    control,
    handleSubmit,
  } = useForm<{ email: string; password: string }>();
  const navigateTo=useNavigate()
  const {showNotification}=useNotification()
  const {mutate:authenticate,isLoading,data}=useMutation(login,{
   onSuccess: (data) => {
  console.log("Login Response:", data);
  const accessToken = data?.response?.accessToken;
  const refreshToken = data?.response?.refreshToken;
  if (!accessToken || !refreshToken) {
    console.error("Tokens missing in response!", data);
    return;
  }
  setItem(storageKey.TOKEN, accessToken);
  setItem(storageKey.REFRESH_TOKEN, refreshToken);

  navigateTo("/students");
  showNotification("Login successful", "success");
}
,
    onError:()=>{
      showNotification("login Failed","error")
    }
  })

  const onSubmit = (data:{email:string,password:string}) => {
    authenticate(data)
  };

  return (
    <div className="flex items-center justify-center  bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Login
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username */}
          <div>
            <CustomFormField
              control={control}
              element="input"
              name="email"
              fieldProps={{ label: "email" ,fullWidth:true}}
              rules={{ required: "email is required" }}
            />
        
          </div>

          {/* Password */}
          <div>
            <CustomFormField
              control={control}
              element="input"
              name="password"
              fieldProps={{ label: "Password", type: "password" }}
              rules={{ required: "Password is required" }}
            />
          </div>

          {/* Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="!bg-blue-500 !text-white !rounded-lg !py-2 hover:!bg-blue-600 transition"
            endIcon={isLoading && < CircularProgress size={20} color="inherit"/>}
          >
            Sign In
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2 my-6 text-gray-400">
          <span className="h-px w-full bg-gray-300"></span>
          <span className="text-sm">OR</span>
          <span className="h-px w-full bg-gray-300"></span>
        </div>

        {/* Signup link */}
        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Button variant="text" onClick={()=>navigateTo("/signup")}>Sign up</Button>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
