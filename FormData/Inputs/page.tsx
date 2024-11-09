import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  InputLabel,
  FormControl,
  Select,
  Checkbox,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import EyeOff from "./assets/eye_closed.svg";
import Eye from "./assets/eye.svg";
import Image from "next/image";
import React, { useRef } from "react";
import { CircleOutlined } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const GenericField = ({ field, form, ...props }: any) => (
  <TextField fullWidth {...field} {...props} variant="outlined" />
);

export const GenericSelectField = ({ field, form, ...props }: any) => (
  <FormControl fullWidth>
    <InputLabel id="demo-multiple-name-label">{props.label}</InputLabel>
    <Select
      fullWidth
      labelId="demo-multiple-name-label"
      id="demo-multiple-name"
      input={<OutlinedInput {...field} {...props} />}
    >
      {props.options.map((name: any) => (
        <MenuItem key={name} value={name}>
          {name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

/* Condição para funcionar -> a div acima deve ter o id "select", o tamanho do input é calculado a partir da div de cima */
export const MultipleSelectCheckmarks = ({ field, form, ...props }: any) => {
  const [maxRenderLength, setMaxRenderLength] = React.useState(0);

  const updateDivSize = () => {
    // Obtém o tamanho da div com o ID "select" após o componente ser montado
    const selectContainer = document.getElementById("select");
    if (selectContainer) {
      const containerWidth = selectContainer.offsetWidth;
      // Defina maxRenderLength com base no tamanho da div
      setMaxRenderLength(containerWidth);
    }
  };

  React.useEffect(() => {
    updateDivSize();
    window.addEventListener("resize", updateDivSize);
    return () => {
      // Limpe o ouvinte de redimensionamento ao desmontar o componente
      window.removeEventListener("resize", updateDivSize);
    };
  }, []);

  return (
    <div>
      <FormControl fullWidth sx={{ maxWidth: `${maxRenderLength}px` }}>
        <InputLabel id="demo-multiple-checkbox-label">{props.label}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          input={<OutlinedInput {...field} {...props} />}
          renderValue={(selected: any) => selected.join(", ")}
        >
          {props.options.map((name: any) => (
            <MenuItem
              key={name}
              value={name}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              {name}
              <Checkbox
                icon={<CircleOutlined></CircleOutlined>}
                checkedIcon={<CheckCircleIcon></CheckCircleIcon>}
                checked={field.value.indexOf(name) !== -1}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export const PasswordField = ({ field, form, ...props }: any) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { type, props2 } = props;
  return (
    <TextField
      fullWidth
      type={showPassword ? "text" : "password"}
      {...field}
      {...props2}
      label="Password"
      variant="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword((show) => !show)}
              sx={{ marginRight: "10%" }}
            >
              {showPassword ? (
                <Image src={EyeOff} alt=""></Image>
              ) : (
                <Image src={Eye} alt=""></Image>
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export const CodeField = (props: any) => {
  const inputRef = useRef(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length >= 1) {
      // Encontre o próximo campo com base no atributo "name"
      const currentFieldName = props.field.name;
      const currentFieldNumber = parseInt(currentFieldName.replace("code", ""));
      const nextFieldName = `code${currentFieldNumber + 1}`;
      const nextField = document.querySelector(
        `input[name="${nextFieldName}"]`
      ) as HTMLInputElement;

      if (nextField) {
        nextField.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Backspace" &&
      (e.target as HTMLInputElement).value.length === 0
    ) {
      // Se a tecla "Backspace" for pressionada e o campo atual estiver vazio, volte para o campo anterior
      const currentFieldName = props.field.name;
      const currentFieldNumber = parseInt(currentFieldName.replace("code", ""));
      if (currentFieldNumber > 1) {
        const prevFieldName = `code${currentFieldNumber - 1}`;
        const prevField = document.querySelector(
          `input[name="${prevFieldName}"]`
        ) as HTMLInputElement;

        if (prevField) {
          prevField.focus();
        }
      }
    }
  };

  return (
    <OutlinedInput
      sx={{
        minWidth: "52px",
        width: "90%",
        maxWidth: "82px",
        minHeight: "52px",
        height: "90%",
        maxHeight: "82px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "2rem",
        fontWeight: "bold",
        paddingLeft: "15%",
      }}
      inputProps={{ maxLength: 1, name: props.field.name }}
      {...props.field}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      ref={inputRef}
    />
  );
};
