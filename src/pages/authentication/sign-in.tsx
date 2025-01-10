import { auth } from "@api/index";
import GeneralAlert from "@components/alerts/GeneralAlert/GeneralAlert";
import { loginSchema } from "@utils/validations/auth";
import Cookies from "js-cookie";
import { useState } from "react";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import type { FC } from "react";
import { Eye, EyeOff } from "lucide-react";

const SignInPage: FC = function () {
  const [alert, setAlert] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Limpiar la alerta previa
    setAlert(null);

    const form = event.target as HTMLFormElement;
    const email = (form.querySelector("#email") as HTMLInputElement).value;
    const password = (form.querySelector("#password") as HTMLInputElement)
      .value;

    try {
      const validatedData = loginSchema.parse({ email, password });

      const { token } = await auth.login(validatedData);

      setAlert({
        type: "success",
        message: "¡Inicio de sesión exitoso!",
      });

      Cookies.set("azteliAuthToken", token);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError =
          error.errors[0]?.message || "Error de validación";

        setAlert({
          type: "error",
          message: validationError,
        });
      } else {
        setAlert({
          type: "error",
          message: "Error al iniciar sesión. Por favor, inténtalo de nuevo.",
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
          Iniciar sesión
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col gap-y-3">
            <Label htmlFor="email">correo electrónico</Label>
            <TextInput
              id="email"
              name="email"
              placeholder="correo@empresa.com"
              type="email"
            />
          </div>
          <div className="mb-6 flex flex-col gap-y-3 relative">
            <Label htmlFor="password">contraseña</Label>
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
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <Checkbox id="rememberMe" name="rememberMe" />
              <Label htmlFor="rememberMe">Recuérdame</Label>
            </div>
            <Link
              to="/forgot-password"
              className="w-1/2 text-right text-sm text-primary-600 dark:text-primary-300"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <div className="mb-6">
            <Button type="submit" className="w-full lg:w-auto">
              Iniciar sesión en tu cuenta
            </Button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            ¿No estás registrado?&nbsp;
            <Link
              to="/authentication/sign-up"
              className="text-primary-600 dark:text-primary-300"
            >
              Crea una cuenta
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default SignInPage;
