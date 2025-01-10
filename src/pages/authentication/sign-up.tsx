import { auth } from "@api/index";
import GeneralAlert from "@components/alerts/GeneralAlert/GeneralAlert";
import { signupSchema } from "@utils/validations/auth";
import Cookies from "js-cookie";
import { useState } from "react";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import type { FC } from "react";
import { Eye, EyeOff } from "lucide-react";

const SignUpPage: FC = function () {
  const [alert, setAlert] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Limpiar la alerta previa
    setAlert(null);

    const form = event.target as HTMLFormElement;
    const fullName = (form.querySelector("#fullName") as HTMLInputElement)
      .value;
    const companyName = (form.querySelector("#companyName") as HTMLInputElement)
      .value;
    const email = (form.querySelector("#email") as HTMLInputElement).value;
    const password = (form.querySelector("#password") as HTMLInputElement)
      .value;
    const confirmPassword = (
      form.querySelector("#confirmPassword") as HTMLInputElement
    ).value;

    try {
      const validatedData = signupSchema.parse({
        fullName,
        companyName,
        email,
        password,
        confirmPassword,
      });

      const { user, token } = await auth.signup(validatedData);

      Cookies.set("azteliAuthToken", token, {
        path: "/",
      });

      setAlert({
        type: "success",
        message: "¡Registro exitoso!",
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error: any) {
      const emailError = `Key (email)=(${1}) already exists.`;

      // Si hay un error de validación de Zod
      if (error instanceof z.ZodError) {
        const validationError =
          error.errors[0]?.message || "Error de validación";
        setAlert({
          type: "error",
          message: validationError,
        });
      } else if (error.message === emailError) {
        // Si el error del servidor coincide con el mensaje de email duplicado
        setAlert({
          type: "error",
          message: `Parece que ya tienes una cuenta. ¿Olvidaste tu contraseña?`,
        });
      } else {
        // Manejar otros errores del servidor
        setAlert({
          type: "error",
          message: "Error al registrarse. Por favor, inténtalo de nuevo.",
        });
      }
    }
  };

  const handleCloseAlert = () => {
    setAlert(null);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 lg:h-screen lg:gap-y-12">
      {alert && (
        <GeneralAlert
          type={alert.type}
          message={alert.message}
          onClose={handleCloseAlert}
        />
      )}
      <div className="my-6 flex items-center gap-x-1 lg:my-0">
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
          AZTELI
        </span>
      </div>
      <Card
        horizontal
        className="w-full md:max-w-screen-sm md:[&>*]:w-full md:[&>*]:p-16"
      >
        <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-3xl">
          Registrarse
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col gap-y-3">
            <Label htmlFor="fullName">Nombre Completo</Label>
            <TextInput
              id="fullName"
              name="fullName"
              placeholder="¿Cómo te llamas?"
              type="text"
            />
          </div>
          <div className="mb-4 flex flex-col gap-y-3">
            <Label htmlFor="companyName">Nombre de la Empresa</Label>
            <TextInput
              id="companyName"
              name="companyName"
              placeholder="¿Cómo se llama tu empresa?"
              type="text"
            />
          </div>
          <div className="mb-4 flex flex-col gap-y-3">
            <Label htmlFor="email">Correo Electrónico</Label>
            <TextInput
              id="email"
              name="email"
              placeholder="tucorreo@ejemplo.com"
              type="email"
            />
          </div>
          <div className="mb-6 flex flex-col gap-y-3 relative">
            <Label htmlFor="password">Contraseña</Label>
            <TextInput
              id="password"
              name="password"
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
            />
            <button
              type="button"
              className="absolute right-3 top-11 text-gray-500 dark:text-gray-400"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="mb-6 flex flex-col gap-y-3 relative">
            <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
            <TextInput
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
              type={showConfirmPassword ? "text" : "password"}
            />
            <button
              type="button"
              className="absolute right-3 top-11 text-gray-500 dark:text-gray-400"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="mb-6 flex items-center gap-x-3">
            <Checkbox id="acceptTerms" name="acceptTerms" />
            <Label htmlFor="acceptTerms">
              Acepto los&nbsp;
              <Link
                to="/terminos"
                className="text-primary-600 dark:text-primary-300 hover:underline"
              >
                términos y condiciones
              </Link>
            </Label>
          </div>
          <div className="mb-6">
            <Button type="submit" className="w-full lg:w-auto">
              Registrarse
            </Button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            ¿Ya tienes una cuenta?&nbsp;
            <Link
              to="/authentication/sign-in"
              className="text-primary-600 dark:text-primary-300 hover:underline"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default SignUpPage;
