import React, { useState } from "react";
import type { UserForm } from "../models/FormData";
import type { FormErrors } from "./FormErrors";
import { Alert, Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";

export default function UserForm() {
  const [formData, setFormData] = useState<UserForm>({
    name: "",
    cellphone: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState<boolean>(false);

  const botonRegistrar = (e: any) => {
    e.preventDefault();
    if (errors.name || errors.email || errors.password) {
      console.log("Errores en el formulario:", errors);
      return;
    } else {
      setAlert(true);

      setTimeout(() => {
        setAlert(false);
      }, 5000);
    }
  };

  const obtenerInformacion = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const obtenerErrores = (e: any) => {
    e.preventDefault();
    const errores: any = {};

    if (!formData.name.trim()) {
      errores.name = "El nombre es obligatorio.";
    }

    if (!formData.email.trim()) {
      errores.email = "El email es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errores.email = "El email no es válido.";
    }

    if (!formData.password.trim()) {
      errores.password = "La contraseña es obligatoria.";
    }

    setErrors(errores);
  };

  return (
    <div className="container">
      <form className="formulario" onSubmit={botonRegistrar}>
        <h2>Registro de Usuario</h2>

        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Juan Pérez"
          className={errors.name ? "error" : ""}
          value={formData?.name}
          onChange={obtenerInformacion}
          onBlur={obtenerErrores}
          required
        />
        <span className="error-text">{errors.name}</span>

        <label htmlFor="cellphone">Celular:</label>
        <input
          type="text"
          id="cellphone"
          name="cellphone"
          placeholder="3123456789"
          value={formData?.cellphone}
          onChange={obtenerInformacion}
          onBlur={obtenerErrores}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="juanperez@"
          className={errors.email ? "error" : ""}
          value={formData?.email}
          onChange={obtenerInformacion}
          onBlur={obtenerErrores}
          required
        />
        <span className="error-text">{errors.email}</span>

        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="********"
          className={errors.password ? "error" : ""}
          value={formData?.password}
          onChange={obtenerInformacion}
          onBlur={obtenerErrores}
          required
        />
        <span className="error-text">{errors.password}</span>

        <div className="botones">
          <button type="button" className="cancelar">
            Cancelar
          </button>
          <button type="submit" className="registrar">
            Registrar
          </button>
        </div>

        <p className="nota">Completa todos los campos para registrarte</p>

        {alert && (
          <React.Fragment>
            <Alert severity="success">
              'El usuario {formData.name} se ha registrado con exito'
            </Alert>

            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={formData?.name} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={formData?.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: "text.primary", display: "inline" }}
                      >
                        {formData?.email}
                      </Typography>
                      <br />
                      {formData?.cellphone ? `Celular: ${formData.cellphone}` : "Celular no proporcionado"}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </React.Fragment>
        )}
      
      </form>
    </div>
  );
}
