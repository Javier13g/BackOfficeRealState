import * as React from "react";

const Logo: React.FC = () => {
  return (
    <svg
      width="360"
      height="220"
      viewBox="0 0 360 220"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Techo con relieve */}
      <path
        d="M70 130 L180 50 L290 130 L275 130 L180 65 L85 130 Z"
        fill="#2c3e50"
      />

      {/* Cuerpo de la casa */}
      <rect
        x="100"
        y="130"
        width="160"
        height="60"
        fill="#ecf0f1"
        stroke="#2c3e50"
        strokeWidth="3"
      />

      {/* Puerta */}
      <rect
        x="165"
        y="150"
        width="30"
        height="40"
        fill="#bdc3c7"
        stroke="#2c3e50"
        strokeWidth="2"
      />

      {/* Ventana */}
      <rect
        x="120"
        y="140"
        width="25"
        height="20"
        fill="#3498db"
        stroke="#2c3e50"
        strokeWidth="2"
      />
      <line
        x1="132.5"
        y1="140"
        x2="132.5"
        y2="160"
        stroke="#2c3e50"
        strokeWidth="1"
      />
      <line
        x1="120"
        y1="150"
        x2="145"
        y2="150"
        stroke="#2c3e50"
        strokeWidth="1"
      />

      {/* Letrero EN VENTA */}
      <rect
        x="15"
        y="30"
        width="90"
        height="26"
        rx="4"
        fill="#e74c3c"
        stroke="#2c3e50"
        strokeWidth="1.5"
      />
      <text
        x="60"
        y="47"
        fontFamily="Verdana, sans-serif"
        fontSize="12"
        fill="#fff"
        textAnchor="middle"
        fontWeight="bold"
      >
        EN VENTA
      </text>
      <line
        x1="60"
        y1="30"
        x2="60"
        y2="15"
        stroke="#2c3e50"
        strokeWidth="2"
      />

      {/* Nombre de empresa */}
      <text
        x="180"
        y="215"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="28"
        fill="#2c3e50"
        fontWeight="bold"
      >
        CasasFácil
      </text>
    </svg>
  );
};

export default Logo;