
import {useState} from 'react'
import { useForm } from "react-hook-form"
import Switcher from "../components/SwitcherTheme";



export default function SignIn(){
    

    const [showPassword, setShowPassword] = useState(false);   
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    

  
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const {
      register,
      setValue,
      handleSubmit,
      formState: { errors },
    } = useForm();

       const onSubmit = handleSubmit((data) => console.log(data));

    // const onSubmit = handleSubmit((data) => sigIn({ variables: data}));

    // if (loading) return 'Submitting...';
    // if (error) return `Submission error! ${error.message}`;

    return(
        <div>
        <Box 
        component="form"
        sx={{  '& .MuiTextField-root': { m: 1, width: '25ch' }, }}
        >
        <form>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            {...register("password", { required: "password Address is required" })}
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && <p role="alert">{errors.mail.message}</p>}

          
           </FormControl>  
           <Button type="submit">Enviar</Button>
        </form>
       
       </Box>
       <Switcher/>
       </div>
    )
}